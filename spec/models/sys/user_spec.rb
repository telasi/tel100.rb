# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe Sys::User do
  before(:example) do
    @user = Sys::User.create({
      username: 'DIMAKURA',
      password: 'dima123',
      first_name: 'დიმიტრი',
      last_name: 'ყურაშვილი',
      email: 'DIMAKURA@GMAIL.COM',
      person_id: 3015
    })
  end

  subject{ @user.reload }

  it 'should be registered' do
    expect(subject).not_to be_blank
    expect(subject.first_name).to eq('დიმიტრი')
    expect(subject.last_name).to eq('ყურაშვილი')
    expect(subject.person_id).to eq(3015)
    expect(subject.admin?).to eq(true)
    expect(subject.active?).to eq(true)
    expect(subject.password_hash.length).to eq(60)
    expect(subject.username).to eq('dimakura')
    expect(subject.email).to eq('dimakura@gmail.com')
  end

  it 'should authenticate' do
    user = Sys::User.authenticate('dimakura', 'dima123')
    expect(user).not_to be_blank
  end

  it 'should not authenticate on incorrect password' do
    user = Sys::User.authenticate('dimakura', 'incorrect-password')
    expect(user).to be_blank
  end

  it 'validates mobile' do
    expect(subject.valid?).to be(true)

    # valid mobile
    subject.mobile = '555116776'
    expect(subject.valid?).to be(true)

    # invalid mobile
    subject.mobile = '555'
    expect(subject.valid?).to be(false)
    expect(subject.errors[:mobile]).not_to be_blank
  end

  it 'validates email' do
    expect(subject.valid?).to be(true)

    # valid email
    subject.email = 'dimakura@gmail.com'
    expect(subject.valid?).to be(true)

    # invalid email
    subject.email = 'dimakura@'
    expect(subject.valid?).to be(false)
  end

  it 'validates username' do
    expect(subject.valid?).to be(true)

    # username.length > 3
    subject.username = 'dim'
    expect(subject.valid?).to be(false)
    subject.username = 'dima'
    expect(subject.valid?).to be(true)    

    # username starts with number
    subject.username = '79dim'
    expect(subject.valid?).to be(false)
    subject.username = 'dim79'
    expect(subject.valid?).to be(true)
  end
end
