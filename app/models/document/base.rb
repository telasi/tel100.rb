# -*- encoding : utf-8 -*-
class Document::Base < ActiveRecord::Base
  include Document::Status
  include Document::Who
  include Document::Personalize

  self.table_name  = 'document_base'
  self.sequence_name = 'docbase_seq'

  belongs_to :parent, class_name: 'Document::Base', foreign_key: 'parent_id'
  personalize 'sender'
  personalize 'owner'
  belongs_to :type, class_name: 'Document::Type', foreign_key: 'type_id'
  has_one :text, class_name: 'Document::Text', foreign_key: 'document_id'
  has_many :motions, class_name: 'Document::Motion', foreign_key: 'document_id'
  has_many :signatures, class_name: 'Document::Signature', foreign_key: 'document_id'

  validates :type, presence: { message: 'აარჩიეთ სახეობა' }
  validates :direction, presence: { message: 'აარჩიეთ მიმართულება' }
  validates :subject, presence: { message: 'ჩაწერეთ სათაური' }
  validates :status, presence: { message: 'მიუთითეთ სტატუსი' }

  def body; self.text.body if self.text.present? end

  def body=(text)
    self.text = Document::Text.new if self.text.blank?
    self.text.body = text
  end

  def self.docnumber_eval(type, status, date)
    if status == Document::Status::SENT
      last_doc = Document::Base.where('docdate=? AND docnumber IS NOT NULL', date).order('id DESC').first
      last_number = '1'
      last_number = ( last_doc.docnumber.split('/').last.to_i + 1 ).to_s if last_doc.present?
      "#{date.strftime('%m%d')}/#{last_number.rjust(3,'0')}"
    end
  end

  def self.sending_document(sender_user, opts = {})
    raise 'sender not defined' if sender_user.blank?
    sender = whose_user(sender_user)
    status = status_eval(opts)
    raise 'not supported status' unless Document::Status::OPEN_STATUSES.include?(status)
    owner_user, owner = who_eval(:owner, opts)
    ( owner_user = sender_user ; owner = sender ) if owner_user.blank?

    subject = opts[:subject] ; body = opts[:body]
    raise 'subject not defined' if subject.blank?
    type = Document::Type.find(opts[:type_id])
    date = Date.eval(opts[:docdate]) || Date.today
    numb = Document::Base.docnumber_eval(type, status, date)
    direction = opts[:direction] || 'inner'
    if direction == 'in'
      original_number = opts[:original_number]
      original_date = Date.eval(opts[:original_date])
    end
    page_count = opts[:page_count] || 0 ; additions_count = opts[:additions_count] || 0

    docparams = { type: type, direction: direction, docnumber: numb, docdate: date, docyear: date.year,
      subject: subject, status: status, sender_user: sender_user, sender: sender, owner_user: owner_user, owner: owner,
      page_count: page_count, additions_count: additions_count,
      original_number: original_number, original_date: original_date,
      due_date: nil, alarm_date: nil
    }
    motionparams = opts[:motions_attributes] || opts[:motions] || []
    signatureparams = opts[:signature_attributes] || opts[:signatures] || []
    raise 'document cannot be sent with empty motions' if (status == Document::Status::SENT and motionparams.select{|x| not x[:_deleted]}.blank?)

    Document::Base.transaction do
      if opts[:id]
        doc = Document::Base.find(opts[:id])
        doc.update_attributes!(docparams)
      else
        doc = Document::Base.create!(docparams)
      end

      # motions
      motionparams.each do |motion_opts|
        id = motion_opts[:id]
        if motion_opts[:_deleted]
          Document::Motion.find(id).destroy
        else
          receiver_user, receiver = who_eval(:receiver, motion_opts)
          motion_text = motion_opts[:motion_text]
          due_date = Date.eval(motion_opts[:due_date])
          if due_date
            doc.due_date = due_date if (doc.due_date.blank? or doc.due_date < due_date)
            doc.alarm_date = due_date if (doc.alarm_date.blank? or doc.alarm_date > due_date)
          end
          params = { document: doc, status: status,
            sender_user: sender_user, sender: sender, sender_is_read: 1,
            receiver_user: receiver_user, receiver: receiver, receiver_is_read: 0,
            motion_text: motion_text, due_date: due_date }
          if id
            Document::Motion.find(id).update_attributes!(params)
          else
            Document::Motion.create!(params)
          end
        end
      end

      # signatures
      previous_group = 0 ; index = 0
      signatureparams.sort{|x,y| x[:sign_group].to_i <=> y[:sign_group].to_i}.each do |sign_opts|
        id = sign_opts[:id]
        if sign_opts[:_deleted]
          Document::Signature.find(id).destroy
        else
          sign_user, sign = who_eval(:signature, sign_opts)
          sign_group = sign_opts[:sign_group] || 1
          sign_role  = sign_opts[:sign_role] || 1
          if previous_group != sign_group
            index += 1
            previous_group = sign_group
          end
          params = { document: doc, signature_user: sign_user, signature: sign, sign_group: index, sign_role: sign_role }
          if id then Document::Signature.find(id).update_attributes!(params)
          else Document::Signature.create!(params) end
        end
      end

      # saving document
      doc.body = body
      doc.text.save!
      doc.save!
      doc
    end
  end
end
