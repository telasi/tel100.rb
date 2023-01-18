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
  self.primary_key = 'id'
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

  def self.check(employee, params)
    unless HR::Vacation::Calendar.allowed_to_go(employee, Date.strptime(params[:from_date], "%Y-%m-%dT%H:%M:%S"), Date.strptime(params[:to_date], "%Y-%m-%dT%H:%M:%S") )
      raise Sys::MyException.new(I18n.t('models.vacation.not_allowed_to_go'), { error_code: 1 }) 
    end
  end

  def self.create!(user, params)
    vac_params = params.permit(:vacation, :from_date, :to_date, :vacation_type, :substitude, :substitude_type)
    check(user.person_id, params)

    vac = HR::Vacation::Base.new(vac_params)
    vac.confirmed = 1
    vac.employee_id = user.employee.id
    vac.person_id = user.employee.person_id
    vac.sub_person_id = HR::Employee.find(params[:substitude]).person_id if params[:substitude].present?
    vac.save

    create_document(vac, user, params)
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

  def self.create_document(vacation, user, params)
      Document::Base.transaction do
          sender = whose_user(user)
          docparams = {
            sender_user: user, sender: sender,
            owner_user: user, owner: sender,
            direction: 'inner', status: Document::Status::CURRENT,
            type: Document::Type.find(2),
            docdate: Date.today,
            sent_at: Time.now,
            actual_sender: user,
            docnumber: Document::Base.docnumber_eval(Document::Type.find(2), Date.today),
            subject: "შვებულება: #{user.to_s}"
          }
          document = Document::Base.create!(docparams)
          document.save!
          # fill body
          document.text = Document::Text.new(document: document)
          document.text.body = generate_body(vacation, user)
          document.text.save!
          # create initial document user object
          # owner motion
          motionparams = { document: document, is_new: 0, ordering: 0,
            sender_user: user, sender: sender, actual_sender: user,
            receiver_user: user, receiver: sender, receiver_role: Document::Role::ROLE_SENDER, 
            status: Document::Status::SENT,
            created_at: Time.now, sent_at: Time.now, received_at: Time.now}
          Document::Motion.create!(motionparams)
          docuser = Document::User.upsert!(document, user, ROLE_OWNER, { is_new: 0, status: Document::Status::CURRENT })
          docuser.calculate!

          send_type = Document::ResponseType.send_types.where(role: ROLE_SIGNEE).order(:ordering).first

          motionParams = { 
          document: document,
          parent: nil, 
          status: Document::Status::SENT,
          sender_user: user,
          sender: sender,
          receiver_user: nil,
          receiver: nil,
          receiver_role: ROLE_SIGNEE,
          receiver_type: 'HR::Employee',
          ordering: 1,
          send_type: send_type,
          is_new: true
        }

        ordering = 0

        if params[:head_of_group].present?
          ordering += 1
          parent = add_motion_user(motionParams, params[:head_of_group].to_i, nil, ordering) 
        end
        if params[:head_of_division].present?
          ordering += 1
          parent = add_motion_user(motionParams, params[:head_of_division].to_i, parent, ordering) 
        end
        if params[:head_of_department].present?
          ordering += 1
          parent = add_motion_user(motionParams, params[:head_of_department].to_i, parent, ordering) 
        end
        if params[:director].present?
          ordering += 1
          parent = add_motion_user(motionParams, params[:director].to_i, parent, ordering) 
        end
        if params[:head_of_hr].present?
          ordering += 1
          parent = add_motion_user(motionParams, params[:head_of_hr].to_i, parent, ordering) 
        end
      end
  end

  def self.add_motion_user(mparam, signee, parent, ordering)
    mparam[:receiver_id] = signee
    receiver_user, receiver = who_eval('receiver', mparam)
    mparam[:receiver_user] = receiver_user
    mparam[:receiver] = receiver
    mparam[:ordering] = ordering
    # mparam[:parent] = parent
    mparam[:receiver_type] = 'HR::Employee'
    if ordering == 1
      mparam[:status] = Document::Status::CURRENT
    else
      mparam[:status] = Document::Status::SENT
    end
    motion = Document::Motion.create!( mparam ) 
    motion.save!
    docuser = Document::User.upsert!(motion.document, motion.receiver_user, motion.receiver_role, { status: motion.status })
    docuser.calculate! if docuser

    motion
  end

  private

  def self.generate_body(vacation, user)
    format = '%d.%m.%Y'
    %Q{<html>
      <p><b>#{vacation.type.name_ka}</b></p>

      <p>სახელი, გვარი: <b>#{user.employee.first_name_ka} #{user.employee.last_name_ka}</b></p>
      
      <p>თანამდებობა: <b>#{user.employee.organization.name_ka}</b></p>
      
      <p>ვადა: <b>#{vacation.from_date.strftime(format)}-დან #{vacation.to_date.strftime(format)} ჩათვლით</b></p>

      <br>
      
      <p><b>#{vacation.type.name_ru}</b></p>
      
      <p>ФИО: <b>#{user.employee.first_name_ru} #{user.employee.last_name_ru}</b></p>
      
      <p>Должность: <b>#{user.employee.organization.name_ru}</b></p>
      
      <p>Срок:  <b>с #{vacation.from_date.strftime(format)} - по #{vacation.to_date.strftime(format)}</b></p>
    }
  end

  def correct_dates
    errors.add(:to_date, 'Error in dates') if to_date < from_date
  end

  def date_not_intersect
    errors.add(:to_date, 'Date intersection') if HR::Vacation::Base.where("employee_id = ? and to_date > ? and from_date < ?", self.employee_id, self.from_date, self.to_date ).first
  end
end