# -*- encoding : utf-8 -*-
class Document::Comment < ActiveRecord::Base
  include Document::Role
  include Document::Status
  include Document::Operation

  self.table_name  = 'document_comment'
  self.sequence_name = 'doccomment_seq'
  self.set_integer_columns :status, :old_status
  belongs_to :document, class_name: 'Document::Base'
  belongs_to :user, class_name: 'Sys::Base'

  SIGNEE_OPERATIONS = [ OPER_SIGN, OPER_UNSIGN, OPER_REJECT, OPER_UNREJECT ]
  ASSIGNEE_OPERATIONS = [ OPER_COMPLETE, OPER_UNCOMPLETE, OPER_CANCEL, OPER_UNCANCEL ]
  OWNER_OPERATIONS = [ OPER_DOC_COMPLETE, OPER_DOC_UNCOMPLETE, OPER_DOC_CANCEL, OPER_DOC_UNCANCEL ]

  def self.eval_operation(role, old_status, new_status)
    return OPER_COMMENT if old_status == new_status
    operations = ( if [ ROLE_OWNER ].include?(role) then OWNER_OPERATIONS
      elsif [ ROLE_AUTHOR, ROLE_SIGNEE ].include?(role) then SIGNEE_OPERATIONS
      else ASSIGNEE_OPERATIONS
    end )
    index = ( if new_status == COMPLETED then 0 # complete/sign
      elsif new_status == CANCELED then 2       # cancel/reject
      elsif old_status == COMPLETED then 1      # uncomplete
      elsif old_status == CANCELED then 3       # uncancel
    end )
    operations[index]
  end
end
