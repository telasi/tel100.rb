# -*- encoding : utf-8 -*-
class HR::Vacation::Vacation < ActiveRecord::Base

  include Document::Role
  include Document::Who

  #SUBSTITUDE_TYPE
  VIEW_NONE = 1
  VIEW_ALL  = 2
  VIEW_NEW  = 3
  
  self.table_name  = 'hr_vacation'
  self.sequence_name = 'hr_vacation_seq'
  self.set_integer_columns :substitude_type, :confirmed
  belongs_to :type, class_name: 'HR::Vacation::Type', foreign_key: 'vacation_type'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'userid'
  belongs_to :sub_user, class_name: 'Sys::User', foreign_key: 'substitude'

  validate :correct_dates
  validate :date_not_intersect

  def self.create_document(user, params)
      @vac = HR::Vacation::Vacation.new(params.permit(:vacation, :from_date, :to_date, :vacation_type, :substitude, :substitude_type))
      @vac.userid = user.id
      if @vac.save
        Document::Base.transaction do
           sender = whose_user(user)
            docparams = {
              sender_user: user, sender: sender,
              owner_user: user, owner: sender,
              direction: 'inner', status: Document::Status::DRAFT,
              type: Document::Type.find(2),
              subject: 'შვებულება'
            }
           document = Document::Base.create!(docparams)
           document.save!
           # fill body
           document.text = Document::Text.new(document: document)
           document.text.body = 'შვებულება'
           document.text.save!
           # create initial document user object
           docuser = Document::User.upsert!(document, user, ROLE_OWNER, { is_new: 0, status: Document::Status::CURRENT })
           docuser.calculate!

           send_type = Document::ResponseType.send_types.where(role: ROLE_SIGNEE).order(:ordering).first

           motionParams = { 
            document: document,
            parent: nil, 
            status: Document::Status::DRAFT,
            sender_user: user,
            sender: sender,
            receiver_user: nil,
            receiver: nil,
            receiver_role: ROLE_SIGNEE,
            receiver_type: 'hr.Employee',
            ordering: 0,
            send_type: send_type,
            is_new: true
          }

          order = 0

          parent = add_motion_user(motionParams, params[:head_of_group].to_i, nil) if params[:head_of_group].present?
          parent = add_motion_user(motionParams, params[:head_of_division].to_i, parent) if params[:head_of_division].present?
          parent = add_motion_user(motionParams, params[:head_of_department].to_i, parent) if params[:head_of_department].present?
          parent = add_motion_user(motionParams, params[:director].to_i, parent) if params[:director].present?
          parent = add_motion_user(motionParams, params[:head_of_hr].to_i, parent) if params[:head_of_hr].present?

        end
    end
  end

  def self.confirmed; HR::Vacation::Vacation.where(confirmed: 1) end

  def correct_dates
  	errors.add(:to_date, 'Error in dates') if to_date < from_date
  end

  def date_not_intersect
  	errors.add(:to_date, 'Date intersection') if HR::Vacation::Vacation.where("userid = ? and to_date > ? and from_date < ?", self.userid, self.from_date, self.to_date ).first
  end

  def self.get_substitudes(user)
  	HR::Vacation::Vacation.confirmed.where("from_date <= sysdate and to_date >= sysdate and substitude = ? and substitude_type <> 1", user.employee.id)
  end

  def self.add_motion_user(mparam, signee, parent)
    mparam[:receiver_id] = signee
    receiver_user, receiver = who_eval('receiver', mparam)
    mparam[:receiver_user] = receiver_user
    mparam[:receiver] = receiver
    mparam[:ordering] = 1
    mparam[:parent] = parent
    mparam[:receiver_type] = 'HR::Employee'
    motion = Document::Motion.create!( mparam ) 
    motion.save!
    docuser = Document::User.upsert!(motion.document, motion.receiver_user, motion.receiver_role, { status: motion.status })
    docuser.calculate! if docuser

    motion
  end
end