# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe HR::Employee do
  before(:example) do
    @org = HR::Organization.create(name_ka: 'სს თელასი', name_ru: 'ОО Теласи')
    @empl = HR::Employee.create(first_name_ka: 'დიმიტრი', last_name_ka: 'ყურაშვილი', person_id: 3015, organization: @org)
  end

  subject{ @empl.reload }

  it 'should be created' do
    expect(@empl).not_to be_blank
    expect(@empl.first_name_ka).to eq('დიმიტრი')
    expect(@empl.last_name_ka).to eq('ყურაშვილი')
    expect(@empl.active?).to eq(true)
  end
end
