# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Personalize
  include Document::Direction
  include Document::Status
  include Document::Role
  include Document::Who

  require 'gnerc/sender'

  self.table_name  = 'document_base'
  self.sequence_name = 'docbase_seq'
  self.set_integer_columns :status

  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  belongs_to :actual_sender, class_name: 'Sys::User', foreign_key: 'actual_sender_id'
  personalize 'sender'
  personalize 'owner'
  belongs_to :type, class_name: 'Document::Type', foreign_key: 'type_id'
  has_one :text, class_name: 'Document::Text', foreign_key: 'document_id'
  has_one :gnerc, class_name: 'Document::Gnerc', foreign_key: 'document_id'
  has_many :motions, class_name: 'Document::Motion', foreign_key: 'document_id'
  has_many :comments, class_name: 'Document::Comment', foreign_key: 'document_id'
  has_many :users, class_name: 'Document::User', foreign_key: 'document_id'
  has_many :files, class_name: 'Document::File', foreign_key: 'document_id'
  before_save :on_before_save

  def body; self.text.body if self.text.present? end
  def motions_waiting; self.motions_total - self.motions_completed - self.motions_canceled end
  def draft?; self.status == DRAFT end
  def sender_name; (self.sender_user || self.sender).to_s end
  def is_reply?; Document::Relation.where(base_id: self.id).any? end

  def margins
    self.type.margins(self.direction)
  end

  def is_editable?(user); 
    # return false if ( self.status == COMPLETED || self.status == CANCELED)
    return false if self.status == CANCELED
    return false if ( self.author_motions.where(status: COMPLETED).any? && ( author?(user) || sender?(user)) )
    return false if ( self.sender_motions.where('status IN (?)', [COMPLETED, CANCELED]).any? && sender?(user) )
    
    assignee_has_read = self.assignee_motions.where('receiver_user_id <> ? and parent_id IS NULL', AUTO_SIGNEE).
                                              where('status IN (?)', [CURRENT, COMPLETED, CANCELED]).any?
    canc_in_direction = ( self.direction == Document::Direction::IN && owner?(user) )
    return false if ( assignee_has_read && ( not canc_in_direction ) )

    return false if self.signee_motions.where(receiver_user: user, status: COMPLETED).any?
    author?(user) || owner?(user) || signee?(user) || sender?(user)
  end

  def has_history?; Document::Change.where(document: self).any? end

  def self.docnumber_eval(type, date)
    # last_doc = Document::Base.where('docdate=? AND docnumber IS NOT NULL', date).order('docnumber DESC').first
    # last_number = '1'
    # last_number = ( last_doc.docnumber.split('/').last.to_i + 1 ).to_s if last_doc.present?
    # "#{date.strftime('%m%d')}/#{last_number.rjust(3,'0')}"
    key = "#{date.strftime('%y%m%d')}"
    next_number = $redis.incr(key)
    "#{date.strftime('%m%d')}/#{next_number.to_s.rjust(3,'0')}"
  end

  def self.create_draft!(sender_user)
    raise 'sender not defined' if sender_user.blank?
    sender = whose_user(sender_user)
    docparams = { sender_user: sender_user, sender: sender,
      owner_user: sender_user, owner: sender,
      actual_sender: nil, # it's not sent yet
      direction: INNER, status: DRAFT,
      #type: Document::Type.order('order_by').first 
    }
    Document::Base.transaction do
      doc = Document::Base.create!(docparams)
      motionparams = { document_id: doc.id, is_new: 0, ordering: 0,
        sender_user: sender_user, sender: sender, actual_sender: nil, # it's not sent yet
        receiver_user: sender_user, receiver: sender, receiver_role: ROLE_SENDER, status: DRAFT,
        created_at: Time.now, sent_at: Time.now, received_at: Time.now}
      Document::Motion.create!(motionparams)
      Document::User.create!(document_id: doc.id, user_id: sender_user.id, is_new: 0, is_changed: 0).calculate!
      return doc
    end
  end

  def update_draft!(user, params)
    raise I18n.t('models.document_base.errors.user_not_defined') unless user.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    Document::Base.transaction do
      if params.key?(:body)
        text = self.text || Document::Text.new(document: self)
        text.body = params[:body]
        text.save!
      end
      if params.respond_to?(:permit)
        params = params.permit(:subject,:docnumber,:docnumber2,:type_id,:docdate,:due_date,:page_count,:additions,:direction,:original_number,:original_date)
      else
        params = params.dup.except(:body)
      end

      self.update_attributes(params)
      self.save!
    end
  end

  def delete_draft!(user)
    raise I18n.t('models.document_base.errors.user_not_defined') unless user.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    Document::Base.transaction do
      self.motions.destroy_all
      self.comments.destroy_all
      Document::Relation.where(base_id: self.id).destroy_all
      self.text.destroy if self.text
      self.gnerc.destroy if self.gnerc
      Document::User.where(document_id: self.id).destroy_all
      Document::Sms.where(base_id: self.id).destroy_all
      Document::Sms.where(answer_id: self.id).destroy_all
      self.destroy
    end
  end

  def send_draft!(user)
    raise I18n.t('models.document_base.errors.type_is_null') unless self.type_id.present?
    raise I18n.t('models.document_base.errors.not_a_draft') unless self.draft?
    raise I18n.t('models.document_base.errors.empty_subject') unless self.subject.present?
    raise I18n.t('models.document_base.errors.no_motions') unless self.motions.any?

    if self.direction == INNER and not self.inner?
      raise I18n.t('models.document_base.errors.inner_has_outer_parties')
    elsif self.direction != INNER and self.inner?
      raise I18n.t('models.document_base.errors.outer_doesnot_have_outer_parties')
    end

    if self.direction == INNER and not self.type.inner?
      raise I18n.t('models.document_base.errors.inner_not_allowed')
    elsif self.direction == OUT and not self.type.out?
      raise I18n.t('models.document_base.errors.outer_not_allowed')
    elsif self.direction == IN and not self.type.in?
      raise I18n.t('models.document_base.errors.in_not_allowed')
    end

    if GNERC_TYPES.include?(self.type_id)
      raise I18n.t('models.document_base.errors.no_due_date') if self.due_date.blank? && !self.is_reply?
      raise I18n.t('models.document_base.errors.no_file') unless self.gnerc.present?
      if self.type_id == GNERC_TYPE4 and not self.is_reply?
        raise I18n.t('models.document_base.errors.gnerctype_is_null') unless self.gnerc.type_id.present?
      end

      if self.direction == IN 
        motion = self.motions.where(receiver_type: 'HR::Party', receiver_role: 'author').first
        if motion.present?
          customer = motion.receiver.customer 
          customer = BS::Customer.where(accnumb: "#{customer}").first
          raise Sys::MyException.new(I18n.t('models.document_base.errors.no_author'), { error_code: 1, party_id: motion.receiver.id }) if customer.blank?

          #raise Sys::MyException.new(I18n.t('models.document_base.errors.no_phone'), { error_code: 1, party_id: motion.receiver.id }) unless HR::Party.correct_mobile?(motion.receiver.phones)
        #else
        #  motion = self.motions.where(receiver_type: 'BS::Customer', receiver_role: 'author').first
        #  if motion.present?
        #    customer = motion.receiver 
        #    raise I18n.t('models.document_base.errors.no_phone_in_bs') if customer.fax.nil?
        #  end
        end
      end

      # check if reply and has GNERC type relation
      if self.is_reply?
        reply = false
        
        sourcedocs = Document::Relation.where(base: self)
        sourcedocs.each do |source|
          related = Document::Base.find(source.related_id)
          if GNERC_TYPES.include?(related.type_id)
            reply = related
          end
        end

        raise I18n.t('models.document_base.errors.no_gnerc_original') unless reply.present?
      end

      #check if reply and file present or sms
      if self.is_reply?

        if self.gnerc.status == 0
          raise I18n.t('models.document_base.errors.no_file') unless self.gnerc.file.present?  
        else
          sms = Document::Sms.where(answer: self, active: 1).first
          raise I18n.t('models.document_base.errors.no_file_or_sms') if ( self.gnerc.file.blank? and sms.blank? )
        end

      else # not reply
        raise I18n.t('models.document_base.errors.no_file') unless self.gnerc.file.present?
      end

      if self.is_reply? and self.author_motions.blank?
        raise I18n.t('models.document_base.errors.no_author')
      end
    else
      if self.gnerc.present?
        self.gnerc.delete
        self.save!
      end
    end

    Document::Base.transaction do
      self.status = CURRENT
      self.docdate = Date.today if self.docdate.blank?
      self.sent_at = self.received_at = Time.now
      self.actual_sender = user
      self.save!

      self.motions.order('ordering ASC, id ASC').each { |motion| motion.send_draft!(user)}
      check_auto_assignees!(user)
      check_auto_signees!(user)

      self.users.each { |user| user.calculate! }
      if self.docnumber.blank?
        self.docnumber = Document::Base.docnumber_eval(self.type, self.docdate)
        self.save!
      end

      send_to_gnerc
    end

  end

  # Checks auto-assignees for agreement type.
  def check_auto_assignees_exception!(user)
    return unless AUTO_ASSIGNEE_EXCEPTION_DOCTYPES.include?(self.type_id)
    unless self.motions.where(receiver_user_id: AUTO_ASSIGNEE_EXCEPTION).any?
      send_type = Document::ResponseType.find(AUTO_ASSIGNEE_EXCEPTION_RESPONSE_TYPE)
      motion = Document::Motion.create!(document: self, parent: nil, is_new: 1, ordering: Document::Motion::ORDERING_AUTO_ASIGNEE_EXCEPTION,
        send_type: send_type, sender_user: user, receiver_user_id: AUTO_ASSIGNEE_EXCEPTION, receiver_role: ROLE_ASSIGNEE, status: SENT,
        sent_at: Time.now, received_at: Time.now)
      if motion.should_be_current?
        motion.update_attributes!(status: CURRENT)
      end
      docuser = Document::User.create!(document: self, user_id: AUTO_ASSIGNEE_EXCEPTION, is_new: 1, is_changed: 1)
    end
  end

  # Checks auto-assignees to receive the document.
  def check_auto_assignees!(user)
    # exception for agreement document type
    check_auto_assignees_exception!(user)

    # ignore inner documents
    return if self.direction == INNER
    # calculate auto assingees
    receiver_ids = self.motions.where(status: CURRENT, receiver_type: 'HR::Employee').to_a.map{ |motion| motion.receiver_user }.flatten.map{|user| user.id}.uniq
    auto_assignee_ids = Sys::UserRelation.where(role: ROLE_AUTO_ASSIGNEE).where('USER_ID IN (?)', receiver_ids).to_a.map{ |rel| rel.related_id }.uniq
    # process each auto-assignee
    send_type_direction = Document::ResponseTypeDirection::SEND
    send_type = Document::ResponseType.where(direction: send_type_direction, role: ROLE_AUTO_ASSIGNEE).first
    auto_assignee_ids.each do |auto_assignee_id|
      unless self.motions.where(receiver_user_id: auto_assignee_id).any?
        motion = Document::Motion.create!(document: self, parent: nil, is_new: 1, ordering: Document::Motion::ORDERING_AUTO_ASIGNEE,
          send_type: send_type, sender_user: user, receiver_user_id: auto_assignee_id, receiver_role: ROLE_ASSIGNEE, status: SENT,
          sent_at: Time.now, received_at: Time.now)
        if motion.should_be_current?
          motion.update_attributes!(status: CURRENT)
        end
        docuser = Document::User.create!(document: self, user_id: auto_assignee_id, is_new: 1, is_changed: 1)
      end
    end
  end

  # Check auto-signees to receive the document.
  def check_auto_signees!(user)
    return unless AUTO_SIGNEE_DOCTYPES.include?(self.type_id)
    unless self.motions.where(receiver_user_id: AUTO_SIGNEE).any?
      send_type = Document::ResponseType.find(AUTO_SIGNEE_RESPONSE_TYPE)
      motion = Document::Motion.create!(document: self, parent: nil, is_new: 1, ordering: Document::Motion::ORDERING_AUTO_SIGNEE,
        send_type: send_type, sender_user: user, receiver_user_id: AUTO_SIGNEE, receiver_role: ROLE_SIGNEE, status: SENT,
        sent_at: Time.now, received_at: Time.now)
      if motion.should_be_current?
        motion.update_attributes!(status: CURRENT)
      end
      docuser = Document::User.create!(document: self, user_id: AUTO_SIGNEE, is_new: 1, is_changed: 1)
    end
  end

  def send_draft_motions!(user)
    raise I18n.t('models.document_base.errors.no_privilege_to_send') unless user == self.owner_user
    Document::Base.transaction do
      self.motions.where(status: DRAFT, parent_id: nil).each do |motion|
        motion.send_draft!(user)
      end
    end
  end

  def can_change_status?(user)
    return true if owner?(user)
    return false unless sender?(user)

    signed_statuses = [COMPLETED,CANCELED]
    signed_motions = self.motions.where(receiver_role: ROLE_AUTHOR).where('status IN (?)',signed_statuses)
    signed_motions.empty?
  end

  def add_comment(user, params, actual_user = nil)
    is_owner = self.owner_user == user
    is_sender = self.sender_user == user
    if is_owner or is_sender
      status_updated = add_document_comment(user, params, actual_user)
      if not is_owner or status_updated
        motion = self.motions.where(receiver_user: user, parent_id: nil).first
        if motion.present? and not motion.cannot_add_comment?
          motion.add_comment(user, params, actual_user)
        end
      end
    else
      raise 'cannot add comment here'
    end
  end

  def authors;
    motions = self.author_motions
    if motions.any?
      motions.map{ |m| ( m.receiver || m.receiver_user ) }
    else
      [ self.owner || self.owner_user ]
    end
  end

  def signees
    self.signee_motions.map{ |m| m.receiver }
  end

  def assignees
    self.assignee_motions.map{ |m| m.receiver }
  end

  def author_motions
    self.motions.where(receiver_role: ROLE_AUTHOR)
  end

  def signee_motions
    self.motions.where(receiver_role: ROLE_SIGNEE)
  end

  def assignee_motions
    self.motions.where(receiver_role: ROLE_ASSIGNEE)
  end

  def sender_motions
    self.motions.where(receiver_role: ROLE_SENDER)
  end

  def author?(user)
    self.owner_user == user
  end

  def owner?(user)
    self.owner_user == user
  end

  def sender?(user)
    self.sender_user == user
  end

  def signee?(user)
    self.signee_motions.where(receiver_user: user).any?
  end

  def inner?
    self.motions.each do |motion|
      return false unless motion.inner?
    end
    return true
  end

  def modify(params, user)
    motions = JSON.parse(params[:motions])
    should_reset_signees = false

    #check if docnumber already exists
    if params[:docnumber2] && self.docnumber2 != params[:docnumber2]
      year = Time.now.year
      year = params[:docdate].to_date.year if params[:docdate].present?
      raise I18n.t('models.document_base.errors.docnumber2_exists') if Document::Base.where(docnumber2: params[:docnumber2], docyear: year).any?
    end

    oldtext = ''
    oldtext = self.text.body if self.text

    #check if changes were made
    dirty = false
    dirty = oldtext != params[:body] if params[:body].present?
    dirty = self.subject != params[:subject] if params[:subject].present?
    dirty ||= Document::FileTemp.where(document: self).where('state in (?)', [Document::Change::STATE_TEMP, Document::Change::STATE_DELETED]).any?
    
    # reset signees if text and files are dirty
    # if assignees are dirty is checked below
    should_reset_signees = dirty 

    dirty = self.docnumber2 != params[:docnumber2] if params[:docnumber2].present?
    dirty = self.docdate != params[:docdate] if params[:docdate].present?
    dirty ||= !motions.empty?
    return if not dirty

    Document::Base.transaction do
      change = Document::Change.new(document_id: params[:id], user: user, created_at: Time.now)
      change.subject = self.subject
      change.docnumber2 = self.docnumber2
      change.docdate = self.docdate
      change.save!

      self.subject = params[:subject] if params[:subject].present?
      self.docnumber2 = params[:docnumber2] if params[:docnumber2].present?
      self.docdate = params[:docdate] if params[:docdate].present?
      self.save!
      
      # Save text to history
      histext = Document::History::Text.new(document: self)
      histext.body = oldtext
      histext.change_no = change.id
      histext.save!

      # new text
      if params[:body].present?
        text = self.text || Document::Text.new(document: self)
        text.body = params[:body]
        text.save!
      end

      if self.gnerc.present? && self.gnerc.file.present?
        gnerc_store_name = self.gnerc.file.store_name if self.gnerc.file.present?
      end

      # Save files to history
      Document::File.where(document: self).map do |f|
        hisfile = Document::History::File.new(document: self, original_name: f.original_name, store_name: f.store_name, change_no: change.id)
        hisfile.save!
        next if ( self.gnerc.present? && self.gnerc.file.present? && (self.gnerc.file_id == f.id) ) # dont delete if gnerc file
        f.delete
      end
      # Save new files
      Document::FileTemp.where(document: self).map do |f|
        if f.state == Document::Change::STATE_TEMP || f.state == Document::Change::STATE_CURRENT
          newfile = Document::File.new(document: self, original_name: f.original_name, store_name: f.store_name)
          newfile.save!

          if f.store_name == gnerc_store_name
            self.gnerc.file_id = newfile.id
            self.gnerc.save!
          end
        end
        f.delete
      end
      # motions

      # save all motions to history table
      self.assignee_motions.map do |m|
        hismotion = Document::History::Motion.new(m.attributes.merge({id: nil}))
        hismotion.change_no = change.id
        hismotion.old_id = m.id
        hismotion.save!
      end

      self.signee_motions.map do |m|
        hismotion = Document::History::Motion.new(m.attributes.merge({id: nil}))
        hismotion.change_no = change.id
        hismotion.old_id = m.id
        hismotion.save!
      end

      self.author_motions.map do |m|
        hismotion = Document::History::Motion.new(m.attributes.merge({id: nil}))
        hismotion.change_no = change.id
        hismotion.old_id = m.id
        hismotion.save!
      end

      # process motions
      motions.each do |m|
        if m["deleted"]
          motion = Document::Motion.find(m["id"])
          motion.delete

          # update document_user for deleted
          if m["receiver_type"] == 'hr.Employee'
            emp = HR::Employee.find(m["receiver_id"])
            receiver_user = emp.user if emp
            docuser = self.users.where(user: receiver_user).first
            docuser.delete if docuser.present?
          end
        end
        if m["temp"]
          motion_params = {
            document_id:    params[:id],
            parent_id:      nil,
            receiver_role:  m["receiver_role"],
            receiver_id:    m["receiver_id"],
            receiver_type:  m["receiver_type"],
            ordering:       m["ordering"],
            send_type_id:   m["send_type_id"],
            due_date:       m["due_date"]
          }

          if m["receiver_role"] == 'author'

            receiver_user, receiver = Document::Base.who_eval('receiver', motion_params)
            self.owner = receiver
            self.owner_user = receiver_user
            self.save!
          end

          motion = Document::Motion.create_draft!(user, motion_params)
          motion.send_draft!(user)
        end

        should_reset_signees = true if m["receiver_role"] == 'assignee'
      end

      reset_signees if ( should_reset_signees && user.id != AUTO_SIGNEE )

      motions_to_process = self.motions.where('status IN (?) AND receiver_role IN (?)', [SENT, CURRENT], [ROLE_SIGNEE, ROLE_AUTHOR]).order(:ordering)
      if motions_to_process.count > 0
        ordering = motions_to_process.minimum('ordering')
        motions_to_process = motions_to_process.where(ordering: ordering)
        motions_to_process.each do |motion_to_process|
          docuser = Document::User.upsert!(motion_to_process.document, motion_to_process.receiver_user, motion_to_process.receiver_role, { status: CURRENT })
          motion_to_process.status = CURRENT
          motion_to_process.received_at = Time.now
          motion_to_process.save!
          docuser.calculate! if docuser.present?
        end

        motions_to_process = self.motions.where('ordering > ? AND receiver_role IN (?)', ordering, [ROLE_SIGNEE, ROLE_AUTHOR])
        motions_to_process.each do |motion_to_process|
          docuser = Document::User.upsert!(motion_to_process.document, motion_to_process.receiver_user, motion_to_process.receiver_role, { status: SENT })
          motion_to_process.status = SENT
          motion_to_process.received_at = Time.now
          motion_to_process.save!
          docuser.calculate! if docuser.present?
        end
      end

    end

  end

  def clone!(user)
    sender = user.employee
    docparams = { sender_user: user, sender: sender,
      owner_user: user, owner: sender,
      actual_sender:    nil, # it's not sent yet
      direction:        self.direction, 
      status:           DRAFT,
      subject:          self.subject,
      type_id:          self.type_id,
      page_count:       self.page_count,
      original_number:  self.original_number,
      original_date:    self.original_date }

    author_motions = self.author_motions
    assignee_motions = self.assignee_motions.where(sender_user: self.sender_user).where('receiver_user_id IS NOT NULL and receiver_id IS NOT NULL')
    signee_motions = self.signee_motions

    Document::Base.transaction do
      doc = Document::Base.create!(docparams)

      if self.text.present?
        text = Document::Text.new(document: doc)
        text.body = self.text.body
        text.save!
      end

      # create sender motion
      motionparams = { document_id: doc.id, is_new: 0, ordering: 0,
          sender_user: user, sender: sender, actual_sender: nil, # it's not sent yet
          receiver_user: user, receiver: sender, receiver_role: ROLE_SENDER, status: DRAFT,
          created_at: Time.now, sent_at: Time.now, received_at: Time.now}
      Document::Motion.create!(motionparams)
      Document::User.create!(document_id: doc.id, user_id: user.id, is_new: 0, is_changed: 0).calculate!

      copy_motions(author_motions, doc, user, ROLE_AUTHOR)
      copy_motions(assignee_motions, doc, user, ROLE_ASSIGNEE)
      copy_motions(signee_motions, doc, user, ROLE_SIGNEE)

      # copy files
      self.files.map do |file|
        f = file.clone(doc)
      end

      return doc
    end
  end

  def create_reply!(user)
    sender = user.employee
    author_motion = self.author_motions.first

    case self.direction
      when Document::Direction::INNER then 
        direction = Document::Direction::INNER
        receiver_user = self.owner_user
        receiver      = self.owner
      when Document::Direction::IN then 
        direction = Document::Direction::OUT
        receiver = author_motion.receiver if author_motion.present?
      when Document::Direction::OUT then 
        direction = Document::Direction::IN
    end

    Document::Base.transaction do
      newdoc = Document::Base.create_draft!(user)
      newdoc.update_draft!(user, { subject: "Re: #{self.subject}", direction: direction, type: self.type })

      rel = Document::Relation.create(base: newdoc, related: self)

      #create assignee

      motionparams = { document: newdoc, is_new: 1, ordering: Document::Motion::ORDERING_ASIGNEE,
            sender_user: user, sender: sender, actual_sender: nil, 
            receiver_user: receiver_user, receiver: receiver, receiver_role: ROLE_ASSIGNEE, status: DRAFT,
            created_at: Time.now, sent_at: Time.now, received_at: Time.now}
      Document::Motion.create!(motionparams)

      Document::Gnerc.create!(newdoc) if ( GNERC_TYPES.include?(self.type_id) and direction == Document::Direction::OUT )
      Document::Sms.reset_sms!(newdoc, '1', user) if ( GNERC_TYPES.include?(self.type_id) and direction == Document::Direction::OUT )

      return newdoc
    end
  end

  def fix_owner!
    owner_motion = self.motions.where(receiver_role: ROLE_AUTHOR).where('receiver_user_id IS NOT NULL').order('id ASC').first
    owner_user = owner_motion ? owner_motion.receiver_user : self.sender_user
    owner = owner_motion ? owner_motion.receiver : self.sender
    self.owner = owner
    self.owner_user = owner_user
    self.save!
  end

  def send_to_gnerc
    return unless GNERC_TYPES.include?(self.type_id)
    return unless self.direction == IN
    return if self.status == DRAFT
    return if self.is_reply?

    Gnerc::Sender.appeal(self)
  end

  private

  def on_before_save
    self.docyear = self.docdate.year if self.docdate
  end

  def add_document_comment(user, params, effective_user)
    raise 'status not supported' if [ DRAFT, SENT, NOT_SENT, NOT_RECEIVED ].include?(self.status)
    # calculate new status
    new_status = self.status
    type = Document::ResponseType.find(params[:response_type_id]) if params[:response_type_id].present?
    if type.blank? and params[:response_type].present?
      type = Document::ResponseType.where(role: ROLE_OWNER, direction: params[:response_type]).order(:ordering).first
    end
    if type and type.positive?
      new_status = COMPLETED
    elsif type and type.negative?
      new_status = CANCELED
    end
    # adding comment
    Document::Comment.transaction do
      # S1: create comment
      text = params[:text] if params[:text].present?
      Document::Comment.create!(document: self, motion: nil,
        user: user, actual_user: effective_user, role: ROLE_OWNER,
        status: new_status, old_status: self.status, text: text)
      # S2: update document itself
      status_updated = false
      if self.status != new_status
        raise 'cannot change status' if self.status == CANCELED
        raise 'you cannot change status' unless can_change_status?(user)
        self.completed_at = Time.now
        self.status = new_status
        self.save!
        status_updated = true
      end
      # S3: document_user updates
      docuser = Document::User.upsert!(self, user, ROLE_OWNER, { status: new_status, is_new: 0 })
      # docuser.make_others_unread!
      docuser.calculate! if docuser.present?

      # S3-new: make others unread on the top level
      notify_users = Document::Motion.where(document: self, parent_id: nil).where('receiver_user_id NOT IN (?)', user.id).map{|x| x.receiver_user}
      notify_users.each do |notifyuser|
        notify_du = Document::User.where(document: self, user: notifyuser).first
        notify_du.update_attributes!(is_changed: 1)
      end

      # S4: if document was canceled mark current motions as not received
      if self.status == CANCELED and status_updated
        self.update_attributes!(status: CANCELED)
        # self.motions.where('status IN (?)', [ SENT, CURRENT ]).each do |motion|
        self.motions.where('status IN (?)', [ SENT ]).each do |motion|
          motion.update_attributes!(status: NOT_RECEIVED)
          docuser = self.users.where(user: motion.receiver_user).first
          docuser.calculate! if docuser.present?
        end
      end

      ####
      return status_updated
    end
  end

  def reset_signees
    signees_to_process = self.signee_motions.where('status IN (?)', [ COMPLETED, CANCELED ])

    max_author_ordering = self.author_motions.where(status: COMPLETED).maximum('ordering')
    if max_author_ordering
      signees_to_process = signees_to_process.where('ordering > ?', max_author_ordering)
    end

    signees_to_process.map do |smotion|
      smotion.status = CURRENT
      smotion.resp_type_id = nil
      smotion.save

      receiver_du = smotion.document.users.where(user: smotion.receiver_user).first
      receiver_du.is_new = 1
      receiver_du.calculate! if receiver_du.present?
    end
  end

  def copy_motions(motions, doc, user, role)
    motions.map do |motion|
      next if motion.receiver_user && ( motion.receiver_user.id == user.id )
      ordering = motion.ordering if role == ROLE_SIGNEE
      motionparams = { document_id:        doc.id, 
                       receiver_id:        motion.receiver_id, 
                       receiver_type:      motion.receiver_type, 
                       receiver_role:      role,
                       motion_text:        motion.motion_text,
                       send_type_id:       motion.send_type_id,
                       ordering:           ordering
                     }
      Document::Motion.create_draft!(user, motionparams)
    end
  end
end
