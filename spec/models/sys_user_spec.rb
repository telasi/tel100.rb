# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe Sys::User, type: :model do
  before(:example) do
    @user = Sys::User.register(username: 'dimakura', password: 'dima123', first_name: 'Dimitri', last_name: 'Kurashvili', person_id: '3015')
  end

  subject{ @user }

  it 'should be registered' do
    expect(@user).not_to be_blank
    expect(@user.first_name).to eq('Dimitri')
    expect(@user.last_name).to eq('Kurashvili')
    expect(@user.password_hash.length).to eq(60)
  end

  it 'should authenticate' do
    user = Sys::User.authenticate('dimakura', 'dima123')
    expect(user).not_to be_blank
  end

  it 'should not authenticate on incorrect password' do
    user = Sys::User.authenticate('dimakura', 'incorrect')
    expect(user).to be_blank
  end
end
