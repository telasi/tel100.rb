# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe Document::Base do
  before(:example) do
    create_default_schema
  end

  it 'a user sends to single receiver' do
    dimitri = Sys::User.find_by_username('dimitri')
    shalva  = Sys::User.find_by_username('shalva')
    doc = Document::Base.new_document({
      sender: { user: dimitri },
      receiver: { user: shalva, text: 'გამიშვით შვებულებაში' },
      subject: 'test document',
      body: 'test document\'s body',
    })
    doc.reload

    expect(doc.subject).to eq('test document')
    expect(doc.body).to eq('test document\'s body')
    expect(doc.docdate).to eq(Date.today)
    expect(doc.docyear).to eq(Date.today.year)

    expect(doc.sender_user).to eq(dimitri)
    expect(doc.sender).to eq(dimitri.employee)
    expect(doc.owner_user).to eq(dimitri)
    expect(doc.owner).to eq(dimitri.employee)
    expect(doc.author_user).to be_blank
    expect(doc.author).to be_blank

    expect(doc.motions.size).to eq(1)
    motion = doc.motions.first
    expect(motion.sender).to eq(dimitri.employee)
    expect(motion.sender_user).to eq(dimitri)
    expect(motion.receiver).to eq(shalva.employee)
    expect(motion.receiver_user).to eq(shalva)
    expect(motion.sender_read?).to eq(true)
    expect(motion.receiver_read?).to eq(false)
    expect(motion.motion_text).to eq('გამიშვით შვებულებაში')
    expect(motion.response_text).to be_blank
  end

end
