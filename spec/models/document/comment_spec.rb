# -*- encoding : utf-8 -*-
require 'rails_helper'
include Document::Role
include Document::Status
include Document::Operation

RSpec.describe Document::Role do
  specify('neural comment') { expect(Document::Comment.eval_operation(ROLE_OWNER, SENT, SENT)).to eq(OPER_COMMENT) }
  specify('neural comment') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, COMPLETED, COMPLETED)).to eq(OPER_COMMENT) }

  specify('complete document') { expect(Document::Comment.eval_operation(ROLE_OWNER, SENT, COMPLETED)).to eq(OPER_DOC_COMPLETE) }
  specify('cancel document') { expect(Document::Comment.eval_operation(ROLE_OWNER, SENT, CANCELED)).to eq(OPER_DOC_CANCEL) }
  specify('uncomplete document') { expect(Document::Comment.eval_operation(ROLE_OWNER, COMPLETED, SENT)).to eq(OPER_DOC_UNCOMPLETE) }
  specify('uncancel document') { expect(Document::Comment.eval_operation(ROLE_OWNER, CANCELED, SENT)).to eq(OPER_DOC_UNCANCEL) }

  specify('complete') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, SENT, COMPLETED)).to eq(OPER_COMPLETE) }
  specify('cancel') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, SENT, CANCELED)).to eq(OPER_CANCEL) }
  specify('uncomplete') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, COMPLETED, SENT)).to eq(OPER_UNCOMPLETE) }
  specify('uncancel') { expect(Document::Comment.eval_operation(ROLE_ASSIGNEE, CANCELED, SENT)).to eq(OPER_UNCANCEL) }

  specify('sign') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, SENT, SIGNED)).to eq(OPER_SIGN) }
  specify('reject') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, SENT, REJECTED)).to eq(OPER_REJECT) }
  specify('unsign') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, SIGNED, SENT)).to eq(OPER_UNSIGN) }
  specify('unreject') { expect(Document::Comment.eval_operation(ROLE_SIGNEE, REJECTED, SENT)).to eq(OPER_UNREJECT) }
end
