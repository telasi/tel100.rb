# -*- encoding : utf-8 -*-
require 'rails_helper'
include Document::Role
include Document::Status
include Document::Operation

RSpec.describe Document::Role do
  specify('neural comment') { expect(Document::Comment.eval_operation(ROLE_OWNER, DRAFT, DRAFT)).to eq(OPER_COMMENT) }
  specify('neural comment') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, COMPLETED, COMPLETED)).to eq(OPER_COMMENT) }

  specify('complete document') { expect(Document::Comment.eval_operation(ROLE_OWNER, DRAFT, COMPLETED)).to eq(OPER_DOC_COMPLETE) }
  specify('cancel document') { expect(Document::Comment.eval_operation(ROLE_OWNER, DRAFT, CANCELED)).to eq(OPER_DOC_CANCEL) }
  specify('uncomplete document') { expect(Document::Comment.eval_operation(ROLE_OWNER, COMPLETED, DRAFT)).to eq(OPER_DOC_UNCOMPLETE) }
  specify('uncancel document') { expect(Document::Comment.eval_operation(ROLE_OWNER, CANCELED, DRAFT)).to eq(OPER_DOC_UNCANCEL) }

  specify('complete') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, DRAFT, COMPLETED)).to eq(OPER_COMPLETE) }
  specify('cancel') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, DRAFT, CANCELED)).to eq(OPER_CANCEL) }
  specify('uncomplete') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, COMPLETED, DRAFT)).to eq(OPER_UNCOMPLETE) }
  specify('uncancel') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, CANCELED, DRAFT)).to eq(OPER_UNCANCEL) }

  specify('sign') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, DRAFT, COMPLETED)).to eq(OPER_SIGN) }
  specify('reject') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, DRAFT, CANCELED)).to eq(OPER_REJECT) }
  specify('unsign') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, COMPLETED, DRAFT)).to eq(OPER_UNSIGN) }
  specify('unreject') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, CANCELED, DRAFT)).to eq(OPER_UNREJECT) }
end
