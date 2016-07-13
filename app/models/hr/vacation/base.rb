# -*- encoding : utf-8 -*-
class HR::Vacation::Base < ActiveRecord::Base

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
  belongs_to :employee, class_name: 'HR::Employee', foreign_key: 'employee_id'
  belongs_to :sub_employee, class_name: 'HR::Employee', foreign_key: 'substitude'

  validate :correct_dates
  validate :date_not_intersect

  def to_hash
    sub_empl = sub_employee.id if self.substitude
    full_name = sub_employee.full_name if self.substitude
    {
      vacation: self.id,
      vac_text: self.type.name,
      sub_id:   sub_empl,
      sub_name: full_name
    }
  end

  def self.create!(user, params)
    vac = HR::Vacation::Base.new(params.permit(:vacation, :from_date, :to_date, :vacation_type, :substitude, :substitude_type))
    vac.confirmed = 1
    vac.employee_id = user.employee.id
    vac.person_id = user.employee.person_id
    vac.sub_person_id = HR::Employee.find(params[:substitude]).person_id if params[:substitude].present?
    vac.save
    vac
  end

  def self.confirmed; HR::Vacation::Base.where(confirmed: 1) end
  def self.current; HR::Vacation::Base.where("from_date <= sysdate and to_date + 1 >= sysdate") end

  def self.substitude_for_employee(user)
  	HR::Vacation::Base.confirmed.current.where("employeeid = ?", user.employee.id).first if ( user && user.employee )
  end

  def self.employees_i_substitude(user)
    HR::Vacation::Base.confirmed.current.where("substitude = ? and substitude_type <> 1", user.employee.id)
  end

  def self.create_document(user, params)
      @vac = HR::Vacation::Base.new(params.permit(:vacation, :from_date, :to_date, :vacation_type, :substitude, :substitude_type))
      @vac.confirmed = 1
      @vac.employee_id = current_user.employee.id
      @vac.person_id = current_user.employee.id
      @vac.employee_id = current_user.employee.id
      if @vac.save
=begin
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
=end
    end
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

  private

  def correct_dates
    errors.add(:to_date, 'Error in dates') if to_date < from_date
  end

  def date_not_intersect
    errors.add(:to_date, 'Date intersection') if HR::Vacation::Base.where("employee_id = ? and to_date > ? and from_date < ?", self.employee_id, self.from_date, self.to_date ).first
  end
end