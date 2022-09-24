# -*- encoding : utf-8 -*-
class Document::Sms < ActiveRecord::Base
  self.table_name  = 'document_sms'
  self.sequence_name = 'DOCSMS_SEQ'
  self.set_integer_columns :active

  belongs_to :document, class_name: 'Document::Base', foreign_key: 'base_id'
  belongs_to :answer, class_name: 'Document::Base', foreign_key: 'answer_id'
  belongs_to :user, class_name: 'Sys::User', foreign_key: 'user_id'

  validates :text, length: { maximum: 500 }

  DATE_FORMAT = '%d.%m.%Y'

  def self.generate(is_reply, doc, status)
    if is_reply
        if status == '1'
          smses = Gnerc::SmsTemplates.where(type_id: doc.type_id)
          if smses.present?
            if doc.gnerc.present? and doc.gnerc.type_id.present?
              smses = smses.where(subtype_id: doc.gnerc.type_id)
            end
            if smses.present?
              form_text(smses.first.text, doc)
            else
              "tqveni #{doc.docdate.strftime(DATE_FORMAT)} ganacxadi #{doc.docnumber} dakmayofilebulia"
            end
          else
            "tqveni #{doc.docdate.strftime(DATE_FORMAT)} ganacxadi #{doc.docnumber} dakmayofilebulia"
          end
        else # status == '0'
          "tqvens #{doc.docdate.strftime(DATE_FORMAT)} gancxadebaze #{doc.docnumber} gamogegzavnat sapasuxo cerili"
        end
    else # not reply
      "tqveni #{doc.docdate.strftime(DATE_FORMAT)} ganacxadi #{doc.docnumber}, el. jurnalshi reg.N #{doc.gnerc.gnerc_id} miGebulia"
    end
  end

  def self.get_smsmes(id)
    smsarray = []
    doc = Document::Sms.find(id).document
    smses = Gnerc::SmsTemplates.where(type_id: doc.type_id)
    if smses.present?
      if doc.gnerc.present? and doc.gnerc.type_id.present?
        smses = smses.where(subtype_id: doc.gnerc.type_id)
      end
    end
    smsarray << { description: '', text: form_text("Tqvens #{doc.docdate.strftime(DATE_FORMAT)} gancxadebaze #{doc.docnumber} gamogegzavnat sapasuxo cerili", doc) }
    smses.each{ |x| smsarray << { description: x.description, text: form_text(x.text, doc) } }
    smsarray
  end

  def self.create!(doc, phone)
    text = Document::Sms.generate(false, doc, '0')
    sms = Document::Sms.where(document: doc).first || Document::Sms.new(document: doc, user: doc.sender_user, text: text, active: 1, phone: phone, sent_at: Time.now)
    sms.text = text
    sms.save!
  end

  def self.first_sms!(doc, phone)
    text = Document::Sms.generate(false, doc, '0')
    Document::Sms.new(document: doc, user: doc.sender_user, text: text, active: 1, phone: phone, sent_at: Time.now).save
    Sys::SentMessage.send_sms(phone, text)
  end

  def self.following_sms!(doc)
    Document::Sms.where(answer: doc, active: 1).map do |sms|
      sms.update_attributes!(sent_at: Time.now)
      Sys::SentMessage.send_sms(sms.phone, sms.text) if sms.phone.present?
    end
  end

  def self.send_sms!(doc, text)
    gnerc = Document::Gnerc.where(document: doc).first
    Document::Sms.new(document: doc, user: doc.sender_user, text: text, active: 1, phone: gnerc.customer_phone, sent_at: Time.now).save
    Sys::SentMessage.send_sms(gnerc.customer_phone, text)
  end

  def self.reset_sms!(doc, status, user)
    ids_2_delete = []

    sourcedocs = Document::Relation.where(base: doc)
    sourcedocs.each do |source|
      related = Document::Base.find(source.related_id)
      if GNERC_TYPES.include?(related.type_id) && related.direction == 'in'
        sms = Document::Sms.where(document: related, answer: doc).first
        if doc.gnerc.present? and doc.gnerc.mediate == 1
          text = "Tqveni #date clis ganckhadeba #number pasuxad gatsnobebt, rom mimdinareobs cerilshi mititebuli garemoebebis shescavla. saboloo shedegebis shesaxeb getsnobebat damatebit"
        else
          text = Document::Sms.generate(true, related, status)
        end

        if sms.present?
          sms.update_attributes!(user: user, text: text, active: 1)
        else
          phone = related.gnerc.customer_phone if ( doc.gnerc.present? && doc.gnerc.correct_mobile )
          if phone.blank?
           first_sms = Document::Sms.where(document: related).first
            phone = first_sms.phone if first_sms.present?
          end
          Document::Sms.new(document: related, answer: doc, user: user, text: text, active: 1, phone: phone).save if phone.present?
        end

        ids_2_delete << related.id

        # smses << { related_id: related.id,
        #            send:        true,
        #            text:        Document::Sms.generate(true, related, status) }
      end
    end

    Document::Sms.where(answer: doc).where.not(base_id: ids_2_delete).destroy_all
  end

  def self.form_text(text, doc)
    date = doc.docdate || Time.now.to_date
    text.sub!('#date', date.strftime("%d/%m/%Y"))
    text.sub!('#number', doc.docnumber || '/-------/')
    text
  end
end
