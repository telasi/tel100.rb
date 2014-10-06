# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe HR::Organization do
  before(:example) do
    @org = HR::Organization.create(name_ka: 'სს თელასი', name_ru: 'ОО Теласи')
  end

  subject{ @org.reload }

  it 'should be created' do
    expect(@org).not_to be_blank
    expect(@org.name_ka).to eq('სს თელასი')
    expect(@org.active?).to eq(true)
  end
end
