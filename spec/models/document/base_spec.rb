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
end
