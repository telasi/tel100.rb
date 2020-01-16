# -*- encoding : utf-8 -*-
class Document::Gnerc < ActiveRecord::Base
  include Document::Status

  STEP_DRAFT = 0
  STEP_SIGNEE = 1
  STEP_SENT = 2
  STEP_ANSWER_COMPLETED = 3
  STEP_ANSWER = 4
  STEP_ANSWER_SENT = 5

  self.table_name  = 'document_gnerc'
  self.set_integer_columns :status, :mediate, :step

  belongs_to :document, class_name: 'Document::Base'
  belongs_to :file, class_name: 'Document::File'

  before_destroy :destroy_sms

  def send_status
    document = self.document
    return 0 if self.step == STEP_DRAFT
    return 0 if self.step == STEP_ANSWER_COMPLETED

    if self.step == STEP_SIGNEE || self.step == STEP_ANSWER
      current_stage = document.direction == 'in' ?  1 : 2
      if document.direction == 'out'
        # find source document
        sourcedocs = Document::Relation.where(base: document)
        sourcedocs.each do |source|
          related = Document::Base.find(source.related_id)
          if GNERC_TYPES.include?(related.type_id) && related.direction == 'in'
            document = related
            break
          end
        end
      end
      service = "Docflow#{DOCFLOW_TO_GNERC_MAP[document.type_id]}"
      clazz = "Gnerc::#{service}".constantize
      clazz.connection
      doc = clazz.where(docid: document.id).first
      return -1 unless doc
      queue = Gnerc::SendQueue.where(service: service, service_id: doc.id, stage: current_stage).first
      if queue.blank?
        return 0
      else
        if current_stage == 1
          queue.sent_at.blank? ? 1 : 2
        else
          queue.sent_at.blank? ? 3 : 4
        end      
      end
    end
  end

  def correct_mobile
    self.customer_phone.present? && ( not self.customer_phone.upcase.include?('OFF') ) && Mobile.correct_mobile?(self.customer_phone)
  end

  def self.upload(params)
    f = Document::File.create_file(params[:file], params[:document_id])
    f.save!

    document = Document::Base.find(params[:document_id])

    gnerc = Document::Gnerc.where(document: document).first || Document::Gnerc.new(document: document, status: 1)
    gnerc.file = f
    gnerc.created_at = Time.now
    gnerc.save!
  end

  def full_path
    #File.join(Rails.root, 'public', 'uploads', 'docfiles', self.store_name)
    File.join(FILES_REPOSITORY, self.store_name)
  end

  def delete_file
    FileUtils.rm(self.full_path)
  end

  def self.create!(doc)
    Document::Gnerc.new(document: doc, status: 1).save
  end

  def self.update_gnerc(params)
    document = Document::Base.find(params[:id])
    gnerc = Document::Gnerc.where(document: document).first || Document::Gnerc.new(document: document, status: 1)
    gnerc.update_attributes!(params.permit(:type_id, :status, :mediate, :water_customer, :gas_customer, :gas_provider, :agree_water, :agree_gas))
    gnerc.update_attributes!(type_id: nil) unless document.type_id == GNERC_TYPE4
    gnerc.save!
  end

  def self.send_sms(params)
    document = Document::Base.find(params[:id])
    gnerc = Document::Gnerc.where(document: document).first || Document::Gnerc.new(document: document)
  end

  def self.add_customer(params)
    document = Document::Base.find(params[:id])
    gnerc = Document::Gnerc.where(document: document).first || Document::Gnerc.new(document: document, status: 1)
    customer_user, customer = Document::Motion.who_eval('customer', params)
    
    gnerc.customer_type = customer.class.name
    gnerc.customer_id = customer.id
    case customer.class.name
      when 'BS::Customer'
        gnerc.customer_accnumb = customer.accnumb
        gnerc.customer_name = customer.name
        gnerc.customer_phone = customer.fax.delete(' ') if !customer.fax.nil?
        gnerc.customer_taxid = customer.taxid
      when 'HR::Party'
        gnerc.customer_accnumb = customer.customer
        gnerc.customer_name = customer.name_ka.strip if !customer.name_ka.nil?
        gnerc.customer_phone = customer.phones.delete(' ') if !customer.phones.nil?
        gnerc.customer_email = customer.email.strip if !customer.email.nil?
        gnerc.customer_taxid = customer.identity
    end
    gnerc.save
  end

  private

  def destroy_sms
  end

end
