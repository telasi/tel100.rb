# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe Document::Base do
  before(:example) do
    create_default_schema
  end

  it 'document numbering' do
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    date    = Date.new(2014, 10, 5)
    type    = Document::Type.first

    doc1 = Document::Base.sending_document(dimitri, {
      subject: 'test1',
      body: 'test body 1',
      type_id: type.id,
      docdate: date,
      status: Document::Status::SENT,
      motions: [
        { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'test text 1' }
      ]
    }).reload
    doc2 = Document::Base.sending_document(dimitri, {
      subject: 'test2',
      body: 'test body 2',
      type_id: type.id,
      docdate: date,
      status: Document::Status::SENT,
      motions: [
        { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'test text 2' }
      ]
    }).reload
    doc3 = Document::Base.sending_document(dimitri, {
      subject: 'test3',
      body: 'test body 3',
      type_id: type.id,
      docdate: date,
      status: Document::Status::SENT,
      motions: [
        { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'test text 3' },
      ]
    }).reload

    expect(doc1.docnumber).to eq('1005/001')
    expect(doc2.docnumber).to eq('1005/002')
    expect(doc3.docnumber).to eq('1005/003')
  end

  it 'sending document' do
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    nino    = Sys::User.find_by_username('nino')
    date    = Date.new(2014, 10, 1)
    type    = Document::Type.first

    doc = Document::Base.sending_document(dimitri, {
      subject: 'სატესტო დოკუმენტი',
      body: 'სატესტო დოკუმენტის აღწერილობა',
      type_id: type.id,
      docdate: date,
      page_count: 10,
      additions_count: 5,
      status: Document::Status::SENT,
      motions: [
        { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'შალვა, გთხოვთ გამიშვით შვებულებაში', due_date: date + 3.days },
        { receiver_id: nino.employee.id,   receiver_type: 'HR::Employee', motion_text: 'ნინო, გთხოვთ გამიშვით შვებულებაში', due_date: date + 5.days },
      ]
    }).reload

    expect(doc.subject).to eq('სატესტო დოკუმენტი')
    expect(doc.body).to eq('სატესტო დოკუმენტის აღწერილობა')
    expect(doc.docdate).to eq(date)
    expect(doc.docyear).to eq(date.year)
    expect(doc.docnumber).to eq("#{date.strftime('%m%d')}/001")
    expect(doc.sender_user).to eq(dimitri)
    expect(doc.sender).to eq(dimitri.employee)
    expect(doc.owner_user).to eq(dimitri)
    expect(doc.owner).to eq(dimitri.employee)
    expect(doc.type.id).to eq(type.id)
    expect(doc.type.name).to eq('წერილი')
    expect(doc.page_count).to eq(10)
    expect(doc.additions_count).to eq(5)
    expect(doc.due_date).to eq(date + 5.days)
    expect(doc.alarm_date).to eq(date + 3.days)
    expect(doc.status).to eq(Document::Status::SENT)

    # check motions
    expect(doc.motions.size).to eq(2)
    motion1 = doc.motions.first
    motion2 = doc.motions.last

    expect(motion1.sender).to eq(dimitri.employee)
    expect(motion1.sender_user).to eq(dimitri)
    expect(motion1.receiver).to eq(shalva.employee)
    expect(motion1.receiver_user).to eq(shalva)
    expect(motion1.motion_text).to eq('შალვა, გთხოვთ გამიშვით შვებულებაში')
    expect(motion1.response_text).to be_blank
    expect(motion1.due_date).to eq(date + 3.days)
    expect(motion1.status).to eq(Document::Status::SENT)
    expect(motion1.ordering).to eq(Document::Motion::MAX)

    expect(motion2.sender).to eq(dimitri.employee)
    expect(motion2.sender_user).to eq(dimitri)
    expect(motion2.receiver).to eq(nino.employee)
    expect(motion2.receiver_user).to eq(nino)
    expect(motion2.motion_text).to eq('ნინო, გთხოვთ გამიშვით შვებულებაში')
    expect(motion2.response_text).to be_blank
    expect(motion2.due_date).to eq(date + 5.days)
    expect(motion2.status).to eq(Document::Status::SENT)
    expect(motion2.ordering).to eq(Document::Motion::MAX)
  end

  it 'sending document to an employee without registered user' do
    dimitri = Sys::User.find_by_username('dimitri')
    empl1 = HR::Employee.where(person_id: 5555).first
    type = Document::Type.first
    date = Date.today
    doc = Document::Base.sending_document(dimitri, {
      subject: 'სატესტო დოკუმენტი',
      body: 'სატესტო დოკუმენტის აღწერილობა',
      type_id: type.id,
      docdate: date,
      page_count: 10,
      additions_count: 5,
      status: Document::Status::SENT,
      motions: [
        { receiver_id: empl1.id, receiver_type: 'HR::Employee', motion_text: 'text 1', due_date: date + 10.days },
      ]
    }).reload

    expect(doc.subject).to eq('სატესტო დოკუმენტი')
    expect(doc.status).to eq(Document::Status::NOT_SENT)
    expect(doc.motions.size).to eq(1)
    m1 = doc.motions.first
    expect(m1.status).to eq(Document::Status::NOT_SENT)
  end

  it 'sending and responding to document' do
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    nino    = Sys::User.find_by_username('nino')
    date    = Date.new(2014, 10, 1)
    type    = Document::Type.first

    # Step 1: sending document

    doc = Document::Base.sending_document(dimitri, {
      subject: 'subject',
      body: 'body text',
      type_id: type.id,
      docdate: date,
      page_count: 10,
      additions_count: 5,
      status: Document::Status::SENT,
      motions: [
        { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', receiver_role: Document::Motion::ROLE_SIGNEE, ordering: 1, motion_text: 'text 1', due_date: date + 3.days },
        { receiver_id: nino.employee.id,   receiver_type: 'HR::Employee', receiver_role: Document::Motion::ROLE_ASSIGNEE, ordering: 2, motion_text: 'text 2', due_date: date + 5.days },
      ]
    }).reload

    expect(doc.status).to eq(Document::Status::SENT)
    motions = doc.motions
    expect(doc.motions.size).to eq(2)
    m1 = doc.motions.first
    m2 = doc.motions.last

    # motions

    expect(m1.receiver_role).to eq(Document::Motion::ROLE_SIGNEE)
    expect(m1.ordering).to eq(1)
    expect(m1.status).to eq(Document::Status::PROCESS)

    expect(m2.receiver_role).to eq(Document::Motion::ROLE_ASSIGNEE)
    expect(m2.ordering).to eq(2)
    expect(m2.status).to eq(Document::Status::NONE)

    # document_users

    expect(dimitri.documents.size).to eq(1)
    expect(dimitri.documents.first.is_read).to eq(1)
    expect(dimitri.documents.first.status).to eq(Document::Status::SENT)

    expect(shalva.documents.size).to eq(1)
    expect(shalva.documents.first.is_read).to eq(0)
    expect(shalva.documents.first.status).to eq(Document::Status::SENT)

    expect(nino.documents.size).to eq(0)

    # Step 2: shalva signs document

    doc.respond(shalva, { status: Document::Status::COMPLETED, response_text: 'resp-1' })

    # motions
    m1.reload ; m2.reload
    shalva.reload ; nino.reload

    expect(m1.status).to eq(Document::Status::SIGNED)
    expect(m1.response_text).to eq('resp-1')
    expect(shalva.documents.size).to eq(1)
    expect(shalva.documents.first.is_read).to eq(1)
    expect(shalva.documents.first.status).to eq(Document::Status::COMPLETED)

    expect(m2.status).to eq(Document::Status::SENT)
    expect(nino.documents.size).to eq(1)
    expect(nino.documents.first.is_read).to eq(0)
    expect(nino.documents.first.status).to eq(Document::Status::SENT)

    # Step 3: nino completes the task

    doc.respond(nino, { status: Document::Status::COMPLETED, respond: 'resp-2' })
    m1.reload ; m2.reload
    shalva.reload ; nino.reload

    expect(m2.status).to eq(Document::Status::COMPLETED)
    expect(nino.documents.size).to eq(1)
    expect(nino.documents.first.is_read).to eq(1)
    expect(nino.documents.first.status).to eq(Document::Status::COMPLETED)
  end
end
