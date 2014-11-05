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

    doc1 = Document::Base.sending_document(dimitri, {
      subject: 'test1', body: 'test body 1', type_id: 1, docdate: date,
      motions: [ {receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'test text 1' }, ]
    }).reload
    doc2 = Document::Base.sending_document(dimitri, {
      subject: 'test2', body: 'test body 2', type_id: 1, docdate: date,
      motions: [ { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'test text 2' }, ]
    }).reload
    doc3 = Document::Base.sending_document(dimitri, {
      subject: 'test3', body: 'test body 3', type_id: 1, docdate: date,
      motions: [ { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'test text 3' }, ]
    }).reload

    expect(doc1.docnumber).to eq('1005/001')
    expect(doc2.docnumber).to eq('1005/002')
    expect(doc3.docnumber).to eq('1005/003')
  end

  it 'document sent to a single receiver' do
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    nino    = Sys::User.find_by_username('nino')
    date    = Date.new(2014, 10, 1)

    doc = Document::Base.sending_document(dimitri, {
      subject: 'სატესტო დოკუმენტი',
      body: 'სატესტო დოკუმენტის აღწერილობა',
      type_id: 1, docdate: date,
      page_count: 10, additions_count: 5,
      motions: [
        { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'შალვა, გთხოვთ გამიშვით შვებულებაში', due_date: date + 3.days },
        { receiver_id: "P#{nino.employee.id}", motion_text: 'ნინო, გთხოვთ გამიშვით შვებულებაში', due_date: date + 5.days },
      ],
      authors: [
        { author_id: shalva.employee.id, author_type: 'HR::Employee', note: 'შალვა არის ავტორი' }
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
    expect(doc.author_user).to be_blank
    expect(doc.author).to be_blank
    expect(doc.type.id).to eq(1)
    expect(doc.type.name).to eq('წერილი')
    expect(doc.page_count).to eq(10)
    expect(doc.additions_count).to eq(5)
    expect(doc.due_date).to eq(date + 5.days)
    expect(doc.alarm_date).to eq(date + 3.days)

    # check motions
    expect(doc.motions.size).to eq(2)
    motion1 = doc.motions.first
    motion2 = doc.motions.last
    
    expect(motion1.sender).to eq(dimitri.employee)
    expect(motion1.sender_user).to eq(dimitri)
    expect(motion2.sender).to eq(dimitri.employee)
    expect(motion2.sender_user).to eq(dimitri)

    expect(motion1.receiver).to eq(shalva.employee)
    expect(motion1.receiver_user).to eq(shalva)
    expect(motion2.receiver).to eq(nino.employee)
    expect(motion2.receiver_user).to eq(nino)

    expect(motion1.sender_read?).to eq(true)
    expect(motion1.receiver_read?).to eq(false)
    expect(motion2.sender_read?).to eq(true)
    expect(motion2.receiver_read?).to eq(false)

    expect(motion1.motion_text).to eq('შალვა, გთხოვთ გამიშვით შვებულებაში')
    expect(motion1.response_text).to be_blank
    expect(motion2.motion_text).to eq('ნინო, გთხოვთ გამიშვით შვებულებაში')
    expect(motion2.response_text).to be_blank

    expect(motion1.due_date).to eq(date + 3.days)
    expect(motion2.due_date).to eq(date + 5.days)

    # check authors
    expect(doc.authors.size).to eq(1)
    author1 = doc.authors.first

    expect(author1.author).to eq(shalva.employee)
    expect(author1.author_user).to eq(shalva)
    expect(author1.note).to eq('შალვა არის ავტორი')
  end
end
