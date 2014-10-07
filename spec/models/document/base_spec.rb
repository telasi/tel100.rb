# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe Document::Base do
  before(:example) do
    create_default_schema
  end

  it 'a user sends to single receiver' do
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    nino    = Sys::User.find_by_username('nino')

    doc = Document::Base.new_document(dimitri, {
      subject: 'სატესტო დოკუმენტი',
      body: 'სატესტო დოკუმენტის აღწერილობა',
      motions: [
        { receiver_id: shalva.employee.id, receiver_type: 'HR::Employee', motion_text: 'შალვა, გთხოვთ გამიშვით შვებულებაში' },
        { receiver_id: nino.employee.id,   receiver_type: 'HR::Employee', motion_text: 'ნინო, გთხოვთ გამიშვით შვებულებაში' },
      ]
    })

    doc.reload

    expect(doc.subject).to eq('სატესტო დოკუმენტი')
    expect(doc.body).to eq('სატესტო დოკუმენტის აღწერილობა')
    expect(doc.docdate).to eq(Date.today)
    expect(doc.docyear).to eq(Date.today.year)
    expect(doc.sender_user).to eq(dimitri)
    expect(doc.sender).to eq(dimitri.employee)
    expect(doc.owner_user).to eq(dimitri)
    expect(doc.owner).to eq(dimitri.employee)
    expect(doc.author_user).to be_blank
    expect(doc.author).to be_blank

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
  end

end
