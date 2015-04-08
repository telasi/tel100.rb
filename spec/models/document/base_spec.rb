# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe Document::Base do
  before(:example) do
    create_default_schema
  end

  it 'should create empty draft' do
    dimitri = Sys::User.find_by_username('dimitri')
    doc = Document::Base.create_draft!(dimitri)
    # testing document
    expect(doc.id).not_to be_nil
    expect(doc.docnumber).to be_nil
    expect(doc.status).to eq(Document::Status::DRAFT)
    expect(doc.direction).to eq('inner')
    expect(doc.sender_user).to eq(dimitri)
    expect(doc.sender.user).to eq(dimitri)
    expect(doc.owner_user).to eq(dimitri)
    expect(doc.owner.user).to eq(dimitri)
    expect(doc.created_at).not_to be_nil
    expect(doc.updated_at).not_to be_nil
    expect(doc.sent_at).to be_nil
    expect(doc.received_at).to be_nil
    expect(doc.completed_at).to be_nil
    expect(doc.type).not_to be_nil
    # testing who receives this document
    doc_users = Document::User.where(document: doc)
    expect(doc_users.count).to eq(1)
    doc_user = doc_users.first
    expect(doc_user.user).to eq(dimitri)
    expect(doc_user.owner?).to eq(true)
    expect(doc_user.signee?).to eq(false)
    expect(doc_user.assignee?).to eq(false)
    expect(doc_user.author?).to eq(false)
    expect(doc_user.as_owner).to eq(Document::User::DOC_CURRENT)
    expect(doc_user.as_signee).to eq(Document::User::DOC_NONE)
    expect(doc_user.as_assignee).to eq(Document::User::DOC_NONE)
    expect(doc_user.as_author).to eq(Document::User::DOC_NONE)
    expect(doc_user.new?).to eq(false)
    expect(doc_user.changed?).to eq(false)
    expect(doc_user.shown?).to eq(true)
    expect(doc_user.sent?).to eq(false)
    expect(doc_user.received?).to eq(false)
    expect(doc_user.forwarded?).to eq(false)
    # checking mydocs
    expect(Document::User.mydocs(dimitri).count).to eq(1)
  end

  it 'should update draft' do
    dimitri = Sys::User.find_by_username('dimitri')
    doc = Document::Base.create_draft!(dimitri)
    doc.update_draft!(dimitri, {
      subject: 'test subject',
      docdate: Date.today
    })
    doc.reload
    expect(doc.status).to eq(Document::Status::DRAFT)
    expect(doc.subject).to eq('test subject')
    expect(doc.docdate).to eq(Date.today)
    expect(doc.docyear).to eq(Date.today.year)
  end

  it 'can add receivers' do
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    doc = Document::Base.create_draft!(dimitri)
    Document::Motion.create_draft!(dimitri, {
      document_id: doc.id,
      receiver_type: 'HR::Employee',
      receiver_id: shalva.employee.id,
      receiver_role: 'assignee'
    })
    doc.reload
    expect(doc.motions.count).to eq(1)
    motion = doc.motions.first
    expect(motion.sender_user).to eq(dimitri)
    expect(motion.receiver_user).to eq(shalva)
    expect(motion.receiver).to eq(shalva.employee)
    expect(motion.parent_id).to be_nil
    expect(motion.status).to eq(Document::Status::DRAFT)
    expect(motion.ordering).to eq(Document::Motion::ORDERING_ASIGNEE)
    expect(motion.created_at).not_to be_nil
    expect(motion.updated_at).not_to be_nil
    expect(motion.sent_at).to be_nil
    expect(motion.received_at).to be_nil
    expect(motion.completed_at).to be_nil
    expect(Document::User.where(document: doc).count).to eq(1)
    expect(motion.send_type).not_to be_nil
    expect(motion.send_type.role).to eq('assignee')
    expect(motion.send_type.send?).to eq(true)
  end

  it 'can be manipulated' do
    # 1. Sending document
    #
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    nino    = Sys::User.find_by_username('nino')
    doc = Document::Base.create_draft!(dimitri)
    doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body' })
    motion1 = Document::Motion.create_draft!(dimitri, {
      document_id: doc.id,
      receiver_type: 'HR::Employee',
      receiver_id: shalva.employee.id,
      receiver_role: 'assignee'
    })
    doc.reload
    doc.send_draft!(dimitri)
    # document properties
    expect(doc.status).to eq(Document::Status::CURRENT)
    expect(doc.sent_at).not_to be_nil
    expect(doc.received_at).not_to be_nil
    expect(doc.completed_at).to be_nil
    # check motion
    expect(Document::Motion.where(document: doc).count).to eq(1)
    motion1.reload
    expect(motion1.status).to eq(Document::Status::CURRENT)
    expect(motion1.sender_user).to eq(dimitri)
    expect(motion1.receiver_user).to eq(shalva)
    expect(motion1.sent_at).not_to be_nil
    expect(motion1.received_at).not_to be_nil
    expect(motion1.completed_at).to be_nil
    # check document users
    expect(Document::User.where(document: doc).count).to eq(2)
    u1 = Document::User.where(document: doc, user: dimitri).first
    expect(u1.user).to eq(dimitri)
    expect(u1.new?).to eq(false)
    expect(u1.changed?).to eq(false)
    expect(u1.shown?).to eq(true)
    expect(u1.sent?).to eq(true)
    expect(u1.received?).to eq(false)
    expect(u1.forwarded?).to eq(false)
    expect(u1.current?).to eq(true)
    expect(u1.canceled?).to eq(false)
    expect(u1.completed?).to eq(false)
    expect(u1.as_owner).to eq(Document::User::DOC_CURRENT)
    expect(u1.as_signee).to eq(Document::User::DOC_NONE)
    expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
    expect(u1.as_author).to eq(Document::User::DOC_NONE)
    u2 = Document::User.where(document: doc, user: shalva).first
    expect(u2.user).to eq(shalva)
    expect(u2.new?).to eq(true)
    expect(u2.changed?).to eq(true)
    expect(u2.shown?).to eq(true)
    expect(u2.sent?).to eq(false)
    expect(u2.received?).to eq(true)
    expect(u2.forwarded?).to eq(false)
    expect(u2.current?).to eq(true)
    expect(u2.canceled?).to eq(false)
    expect(u2.completed?).to eq(false)
    expect(u2.as_owner).to eq(Document::User::DOC_NONE)
    expect(u2.as_signee).to eq(Document::User::DOC_NONE)
    expect(u2.as_assignee).to eq(Document::User::DOC_CURRENT)
    expect(u2.as_author).to eq(Document::User::DOC_NONE)

    # 2. Receiver forwards task
    motion2 = Document::Motion.create_draft!(shalva, {
      document_id: doc.id,
      parent_id: motion1.id,
      receiver_type: 'HR::Employee',
      receiver_id: nino.employee.id,
      receiver_role: 'assignee'
    })
    expect(Document::User.where(document: doc).count).to eq(2)
    motion1.send_draft_motions!(shalva) # sending to nino
    expect(Document::User.where(document: doc).count).to eq(3)
    expect(Document::Motion.where(document: doc).count).to eq(2)
    motion1.reload ; motion2.reload
    motion3 = Document::Motion.where(document: doc, receiver_user: nino).first
    u1 = Document::User.where(document: doc, user: dimitri).first
    u2 = Document::User.where(document: doc, user: shalva).first
    u3 = Document::User.where(document: doc, user: nino).first
    expect(motion2.parent).to eq(motion1)
    expect(motion3.status).to eq(Document::Status::CURRENT)
    expect(u2.forwarded?).to eq(true)
    expect(u1.shown?).to eq(true)
    expect(u2.shown?).to eq(true)
    expect(u3.shown?).to eq(true)

    # 3. Receiver replies
    #
    Document::User.where(document: doc, user: shalva).first.read!
    motion1.add_comment(shalva, { response_type: Document::ResponseType::RESP_COMPLETE, text: 'i agree' })
    # check motion
    motion1.reload
    expect(motion1.status).to eq(Document::Status::COMPLETED)
    expect(motion1.receiver_user).to eq(shalva)
    expect(motion1.sent_at).not_to be_nil
    expect(motion1.received_at).not_to be_nil
    expect(motion1.completed_at).not_to be_nil
    expect(motion1.response_type).not_to be_nil
    expect(motion1.response_type.positive?).to eq(true)
    expect(motion1.response_text).to eq('i agree')
    # check document users
    expect(Document::User.where(document: doc).count).to eq(3)
    u1 = Document::User.where(document: doc, user: dimitri).first
    expect(u1.user).to eq(dimitri)
    expect(u1.new?).to eq(false)
    expect(u1.changed?).to eq(true)
    expect(u1.sent?).to eq(true)
    expect(u1.received?).to eq(false)
    expect(u1.forwarded?).to eq(false)
    expect(u1.current?).to eq(true)
    expect(u1.canceled?).to eq(false)
    expect(u1.completed?).to eq(false)
    expect(u1.as_owner).to eq(Document::User::DOC_CURRENT)
    expect(u1.as_signee).to eq(Document::User::DOC_NONE)
    expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
    expect(u1.as_author).to eq(Document::User::DOC_NONE)
    u2 = Document::User.where(document: doc, user: shalva).first
    expect(u2.user).to eq(shalva)
    expect(u2.new?).to eq(false)
    expect(u2.changed?).to eq(false)
    expect(u2.sent?).to eq(false)
    expect(u2.received?).to eq(true)
    expect(u2.forwarded?).to eq(true)
    expect(u2.current?).to eq(false)
    expect(u2.canceled?).to eq(false)
    expect(u2.completed?).to eq(true)
    expect(u2.as_owner).to eq(Document::User::DOC_NONE)
    expect(u2.as_signee).to eq(Document::User::DOC_NONE)
    expect(u2.as_assignee).to eq(Document::User::DOC_COMPLETE)
    expect(u2.as_author).to eq(Document::User::DOC_NONE)

    # 4. Sender complete
    #
    doc.reload
    doc.add_comment(dimitri, { response_type: Document::ResponseType::RESP_COMPLETE, text: 'document is closed' })
    expect(Document::User.where(document: doc).count).to eq(3)
    u1 = Document::User.where(document: doc, user: dimitri).first
    expect(u1.user).to eq(dimitri)
    expect(u1.new?).to eq(false)
    expect(u1.changed?).to eq(false)
    expect(u1.sent?).to eq(true)
    expect(u1.received?).to eq(false)
    expect(u1.forwarded?).to eq(false)
    expect(u1.current?).to eq(false)
    expect(u1.canceled?).to eq(false)
    expect(u1.completed?).to eq(true)
    expect(u1.as_owner).to eq(Document::User::DOC_COMPLETE)
    expect(u1.as_signee).to eq(Document::User::DOC_NONE)
    expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
    expect(u1.as_author).to eq(Document::User::DOC_NONE)
    u2 = Document::User.where(document: doc, user: shalva).first
    expect(u2.user).to eq(shalva)
    expect(u2.new?).to eq(false)
    expect(u2.changed?).to eq(true)
    expect(u2.sent?).to eq(false)
    expect(u2.received?).to eq(true)
    expect(u2.forwarded?).to eq(true)
    expect(u2.current?).to eq(false)
    expect(u2.canceled?).to eq(false)
    expect(u2.completed?).to eq(true)
    expect(u2.as_owner).to eq(Document::User::DOC_NONE)
    expect(u2.as_signee).to eq(Document::User::DOC_NONE)
    expect(u2.as_assignee).to eq(Document::User::DOC_COMPLETE)
    expect(u2.as_author).to eq(Document::User::DOC_NONE)
  end
end
