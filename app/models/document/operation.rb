# -*- encoding : utf-8 -*-
module Document::Operation
  OPER_COMMENT  = 'comment'

  # signee operations
  OPER_SIGN     = 'sign'
  OPER_UNSIGN   = 'unsign'
  OPER_REJECT   = 'reject'
  OPER_UNREJECT = 'unreject'

  # assignee operations
  OPER_COMPLETE   = 'complete'
  OPER_UNCOMPLETE = 'uncomplete'
  OPER_CANCEL     = 'cancel'
  OPER_UNCANCEL   = 'uncancel'

  # owner operations
  OPER_DOC_COMPLETE   = 'doc-complete'
  OPER_DOC_UNCOMPLETE = 'doc-uncomplete'
  OPER_DOC_CANCEL     = 'doc-cancel'
  OPER_DOC_UNCANCEL   = 'doc-uncancel'
end
