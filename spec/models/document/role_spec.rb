# -*- encoding : utf-8 -*-
require 'rails_helper'
include Document::Role

RSpec.describe Document::Role do
  specify('OWNER = OWNER') { expect(Document::Role.compare(ROLE_OWNER, ROLE_OWNER)).to eq(0) }
  specify('CREATOR = CREATOR') { expect(Document::Role.compare(ROLE_CREATOR, ROLE_CREATOR)).to eq(0) }

  specify('OWNER > CREATOR') { expect(Document::Role.compare(ROLE_OWNER, ROLE_CREATOR)).to eq(1) }
  specify('CREATOR < OWNER') { expect(Document::Role.compare(ROLE_CREATOR, ROLE_OWNER)).to eq(-1) }

  specify('CREATOR > AUTHOR') { expect(Document::Role.compare(ROLE_CREATOR, ROLE_AUTHOR)).to eq(1) }
  specify('AUTHOR > SIGNEE') { expect(Document::Role.compare(ROLE_AUTHOR, ROLE_SIGNEE)).to eq(1) }
  specify('SIGNEE > ASSIGNEE') { expect(Document::Role.compare(ROLE_SIGNEE, ROLE_ASSIGNEE)).to eq(1) }
end
