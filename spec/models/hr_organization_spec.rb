# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe HR::Organization, type: :model do
  before(:example) do
    @org = HR::Organization.create(saporg_id: 100, saporg_type: 'O', name_ka: 'სს თელასი', name_ru: 'ОО Теласи')
  end

  subject{ @org }

  it 'should be created' do
    expect(@org).not_to be_blank
    expect(@org.name_ka).to eq('სს თელასი')
  end
end
