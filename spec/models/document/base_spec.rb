# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe Document::Base do
  before(:example) do
    create_default_schema
  end

  it 'should create empty draft with single receiver' do
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
    expect(doc_user.role).to eq(Document::Role::ROLE_OWNER)
    expect(doc_user.status).to eq(Document::Status::DRAFT)
    expect(doc_user.new?).to eq(false)
    expect(doc_user.changed?).to eq(false)
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
  end

  it 'can be manipulated' do
    # 1. Sending document
    #
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    doc = Document::Base.create_draft!(dimitri)
    doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body' })
    Document::Motion.create_draft!(dimitri, {
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
    motion = Document::Motion.where(document: doc).first
    expect(motion.status).to eq(Document::Status::CURRENT)
    expect(motion.sent_at).not_to be_nil
    expect(motion.received_at).not_to be_nil
    expect(motion.completed_at).to be_nil
    # check document users
    expect(Document::User.where(document: doc).count).to eq(2)
    u1 = Document::User.where(document: doc).first
    u2 = Document::User.where(document: doc).last
    expect(u1.user).to eq(dimitri)
    expect(u1.new?).to eq(false)
    expect(u1.changed?).to eq(false)
    expect(u1.forwarded?).to eq(false)
    expect(u1.status).to eq(Document::Status::CURRENT)
    expect(u2.user).to eq(shalva)
    expect(u2.new?).to eq(true)
    expect(u2.changed?).to eq(true)
    expect(u2.forwarded?).to eq(false)
    expect(u2.status).to eq(Document::Status::CURRENT)

    # 2. Receiver replies
    cat = Document::ResponseType.where(category: Document::ResponseType::COMPLETE).first
    motion.add_comment(shalva, { category_id: cat.id, text: 'i agree' })
    # check motion
    expect(Document::Motion.where(document: doc).count).to eq(1)
    motion = Document::Motion.where(document: doc).first
    expect(motion.status).to eq(Document::Status::COMPLETED)
    expect(motion.sent_at).not_to be_nil
    expect(motion.received_at).not_to be_nil
    expect(motion.completed_at).not_to be_nil
    expect(motion.response_type).to eq(cat)
    expect(motion.response_text).to eq('i agree')
    # check document users
    expect(Document::User.where(document: doc).count).to eq(2)
    u1 = Document::User.where(document: doc).first
    u2 = Document::User.where(document: doc).last
    expect(u1.user).to eq(dimitri)
    expect(u1.status).to eq(Document::Status::CURRENT)
    expect(u2.user).to eq(shalva)
    expect(u2.new?).to eq(false)
    expect(u2.changed?).to eq(false)
    expect(u2.forwarded?).to eq(false)
    expect(u2.status).to eq(Document::Status::COMPLETED)
  end
end
