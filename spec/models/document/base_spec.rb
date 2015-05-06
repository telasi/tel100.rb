# -*- encoding : utf-8 -*-
require 'rails_helper'
include Document::Role
include Document::Status

RSpec.describe 'Document, Motions, and Users' do
  before(:example) do
    create_default_schema
    @dimitri = Sys::User.find_by_username('dimitri')
    @doc = Document::Base.create_draft!(@dimitri)
    @doc.update_draft!(@dimitri, { subject: 'test', body: 'test body' })
    @doc.reload
  end

  context 'Draft document properties' do
    it 'should have certain properties' do
      expect(@doc.docnumber).to be_nil
      expect(@doc.status).to eq(DRAFT)
      expect(@doc.subject).to eq('test')
      expect(@doc.body).to eq('test body')
    end

    it 'should have single motion' do
      expect(@doc.motions.count).to eq(1)
      motion = @doc.motions.first
      expect(motion.sender_user).to eq(@dimitri)
      expect(motion.receiver_user).to eq(@dimitri)
      expect(motion.new?).to eq(false)
      expect(motion.parent).to be_nil
      expect(motion.receiver_role).to eq(ROLE_SENDER)
    end

    it 'should have single document-user' do
      expect(@doc.users.count).to eq(1)
      du = @doc.users.first
      expect(du.user).to eq(@dimitri)
      expect(du.due_date?).to eq(false)
      expect(du.new?).to eq(false)
      expect(du.changed?).to eq(false)
      expect(du.sent?).to eq(false)
      expect(du.shown?).to eq(true)
      expect(du.as_owner).to eq(DOC_CURRENT)
      # expect(du.as_sender).to eq(DOC_CURRENT)
    end
  end
end

# RSpec.describe Document::Base do
#   before(:example) do
#     create_default_schema
#   end

#   it 'should create empty draft' do
#     dimitri = Sys::User.find_by_username('dimitri')
#     doc = Document::Base.create_draft!(dimitri)
#     # testing document
#     expect(doc.id).not_to be_nil
#     expect(doc.docnumber).to be_nil
#     expect(doc.status).to eq(Document::Status::DRAFT)
#     expect(doc.direction).to eq('inner')
#     expect(doc.sender_user).to eq(dimitri)
#     expect(doc.sender.user).to eq(dimitri)
#     expect(doc.owner_user).to eq(dimitri)
#     expect(doc.owner.user).to eq(dimitri)
#     expect(doc.created_at).not_to be_nil
#     expect(doc.updated_at).not_to be_nil
#     expect(doc.sent_at).to be_nil
#     expect(doc.received_at).to be_nil
#     expect(doc.completed_at).to be_nil
#     expect(doc.type).not_to be_nil
#     expect(doc.motions.length).to eq(0)
#     # testing who receives this document
#     doc_users = Document::User.where(document: doc)
#     expect(doc_users.count).to eq(1)
#     doc_user = doc_users.first
#     expect(doc_user.user).to eq(dimitri)
#     expect(doc_user.owner?).to eq(true)
#     expect(doc_user.signee?).to eq(false)
#     expect(doc_user.assignee?).to eq(false)
#     expect(doc_user.author?).to eq(false)
#     expect(doc_user.as_owner).to eq(Document::User::DOC_CURRENT)
#     expect(doc_user.as_signee).to eq(Document::User::DOC_NONE)
#     expect(doc_user.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(doc_user.as_author).to eq(Document::User::DOC_NONE)
#     expect(doc_user.new?).to eq(false)
#     expect(doc_user.changed?).to eq(false)
#     expect(doc_user.shown?).to eq(true)
#     expect(doc_user.sent?).to eq(false)
#     expect(doc_user.received?).to eq(false)
#     expect(doc_user.forwarded?).to eq(false)
#     # checking mydocs
#     expect(Document::User.mydocs(dimitri).count).to eq(1)
#   end

#   it 'should update draft' do
#     dimitri = Sys::User.find_by_username('dimitri')
#     doc = Document::Base.create_draft!(dimitri)
#     doc.update_draft!(dimitri, {
#       subject: 'test subject',
#       docdate: Date.today,
#       body: 'some body'
#     })
#     doc.reload
#     expect(doc.status).to eq(Document::Status::DRAFT)
#     expect(doc.subject).to eq('test subject')
#     expect(doc.docdate).to eq(Date.today)
#     expect(doc.docyear).to eq(Date.today.year)
#     expect(doc.body).to eq('some body')
#   end

#   it 'can add receivers' do
#     dimitri = Sys::User.find_by_username('dimitri')
#     shalva  = Sys::User.find_by_username('shalva')
#     doc = Document::Base.create_draft!(dimitri)
#     Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: shalva.employee.id,
#       receiver_role: 'assignee'
#     })
#     doc.reload
#     expect(doc.motions.count).to eq(1)
#     motion = doc.motions.first
#     expect(motion.sender_user).to eq(dimitri)
#     expect(motion.receiver_user).to eq(shalva)
#     expect(motion.receiver).to eq(shalva.employee)
#     expect(motion.parent_id).to be_nil
#     expect(motion.status).to eq(Document::Status::DRAFT)
#     expect(motion.ordering).to eq(Document::Motion::ORDERING_ASIGNEE)
#     expect(motion.created_at).not_to be_nil
#     expect(motion.updated_at).not_to be_nil
#     expect(motion.sent_at).to be_nil
#     expect(motion.received_at).to be_nil
#     expect(motion.completed_at).to be_nil
#     expect(motion.new?).to eq(true)
#     expect(Document::User.where(document: doc).count).to eq(1)
#     expect(motion.send_type).not_to be_nil
#     expect(motion.send_type.role).to eq('assignee')
#     expect(motion.send_type.send?).to eq(true)
#   end

#   it 'can be manipulated' do
#     # 1. Sending document
#     #
#     dimitri = Sys::User.find_by_username('dimitri')
#     shalva  = Sys::User.find_by_username('shalva')
#     nino    = Sys::User.find_by_username('nino')
#     doc = Document::Base.create_draft!(dimitri)
#     doc_due_date = Date.today + 10
#     motion_due_date = Date.today + 5
#     doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body', due_date: doc_due_date })
#     motion1 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: shalva.employee.id,
#       receiver_role: 'assignee',
#       due_date: motion_due_date
#     })
#     doc.reload
#     doc.send_draft!(dimitri)
#     # document properties
#     expect(doc.status).to eq(Document::Status::CURRENT)
#     expect(doc.sent_at).not_to be_nil
#     expect(doc.received_at).not_to be_nil
#     expect(doc.completed_at).to be_nil
#     # check motion
#     expect(Document::Motion.where(document: doc).count).to eq(1)
#     motion1.reload
#     expect(motion1.status).to eq(Document::Status::CURRENT)
#     expect(motion1.sender_user).to eq(dimitri)
#     expect(motion1.receiver_user).to eq(shalva)
#     expect(motion1.sent_at).not_to be_nil
#     expect(motion1.received_at).not_to be_nil
#     expect(motion1.completed_at).to be_nil
#     expect(motion1.due_date).to eq(motion_due_date)
#     expect(motion1.new?).to eq(true)
#     # check document users
#     expect(Document::User.where(document: doc).count).to eq(2)
#     u1 = Document::User.where(document: doc, user: dimitri).first
#     expect(u1.user).to eq(dimitri)
#     expect(u1.new?).to eq(false)
#     expect(u1.changed?).to eq(false)
#     expect(u1.shown?).to eq(true)
#     expect(u1.sent?).to eq(true)
#     expect(u1.received?).to eq(false)
#     expect(u1.forwarded?).to eq(false)
#     expect(u1.current?).to eq(true)
#     expect(u1.canceled?).to eq(false)
#     expect(u1.completed?).to eq(false)
#     expect(u1.as_owner).to eq(Document::User::DOC_CURRENT)
#     expect(u1.as_signee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_author).to eq(Document::User::DOC_NONE)
#     # expect(u1.due_date).to eq(doc_due_date)
#     u2 = Document::User.where(document: doc, user: shalva).first
#     expect(u2.user).to eq(shalva)
#     expect(u2.new?).to eq(true)
#     expect(u2.changed?).to eq(true)
#     expect(u2.shown?).to eq(true)
#     expect(u2.sent?).to eq(false)
#     expect(u2.received?).to eq(true)
#     expect(u2.forwarded?).to eq(false)
#     expect(u2.current?).to eq(true)
#     expect(u2.canceled?).to eq(false)
#     expect(u2.completed?).to eq(false)
#     expect(u2.as_owner).to eq(Document::User::DOC_NONE)
#     expect(u2.as_signee).to eq(Document::User::DOC_NONE)
#     expect(u2.as_assignee).to eq(Document::User::DOC_CURRENT)
#     expect(u2.as_author).to eq(Document::User::DOC_NONE)

#     # 2. Receiver forwards task
#     motion2 = Document::Motion.create_draft!(shalva, {
#       document_id: doc.id,
#       parent_id: motion1.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: nino.employee.id,
#       receiver_role: 'assignee'
#     })
#     expect(Document::User.where(document: doc).count).to eq(2)
#     motion1.send_draft_motions!(shalva) # sending to nino
#     expect(Document::User.where(document: doc).count).to eq(3)
#     expect(Document::Motion.where(document: doc).count).to eq(2)
#     motion1.reload ; motion2.reload
#     # motion3 = Document::Motion.where(document: doc, receiver_user: nino).first
#     u1 = Document::User.where(document: doc, user: dimitri).first
#     u2 = Document::User.where(document: doc, user: shalva).first
#     u3 = Document::User.where(document: doc, user: nino).first
#     expect(motion2.parent).to eq(motion1)
#     expect(motion2.status).to eq(Document::Status::CURRENT)
#     expect(u2.forwarded?).to eq(true)
#     expect(u1.shown?).to eq(true)
#     expect(u2.shown?).to eq(true)
#     expect(u3.shown?).to eq(true)
#     expect(motion1.due_is_over?).to eq(false)
#     expect(motion2.due_is_over?).to eq(false)

#     # 3. Receiver replies
#     #
#     Document::User.where(document: doc, user: shalva).first.read!
#     motion1.add_comment(shalva, { response_type: Document::ResponseType::RESP_COMPLETE, text: 'i agree' })
#     # check motion
#     motion1.reload
#     expect(motion1.status).to eq(Document::Status::COMPLETED)
#     expect(motion1.receiver_user).to eq(shalva)
#     expect(motion1.sent_at).not_to be_nil
#     expect(motion1.received_at).not_to be_nil
#     expect(motion1.completed_at).not_to be_nil
#     expect(motion1.response_type).not_to be_nil
#     expect(motion1.response_type.positive?).to eq(true)
#     expect(motion1.response_text).to eq('i agree')
#     expect(motion1.new?).to eq(false)
#     # check document users
#     expect(Document::User.where(document: doc).count).to eq(3)
#     expect(doc.motions.count).to eq(2)
#     u1 = Document::User.where(document: doc, user: dimitri).first
#     expect(u1.user).to eq(dimitri)
#     expect(u1.new?).to eq(false)
#     expect(u1.changed?).to eq(true)
#     expect(u1.sent?).to eq(true)
#     expect(u1.received?).to eq(false)
#     expect(u1.forwarded?).to eq(false)
#     expect(u1.current?).to eq(true)
#     expect(u1.canceled?).to eq(false)
#     expect(u1.completed?).to eq(false)
#     expect(u1.as_owner).to eq(Document::User::DOC_CURRENT)
#     expect(u1.as_signee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_author).to eq(Document::User::DOC_NONE)
#     u2 = Document::User.where(document: doc, user: shalva).first
#     expect(u2.user).to eq(shalva)
#     expect(u2.new?).to eq(false)
#     expect(u2.changed?).to eq(false)
#     expect(u2.sent?).to eq(false)
#     expect(u2.received?).to eq(true)
#     expect(u2.forwarded?).to eq(true)
#     expect(u2.current?).to eq(false)
#     expect(u2.canceled?).to eq(false)
#     expect(u2.completed?).to eq(true)
#     expect(u2.as_owner).to eq(Document::User::DOC_NONE)
#     expect(u2.as_signee).to eq(Document::User::DOC_NONE)
#     expect(u2.as_assignee).to eq(Document::User::DOC_COMPLETED)
#     expect(u2.as_author).to eq(Document::User::DOC_NONE)

#     # 4. Sender complete
#     #
#     doc.reload
#     doc.add_comment(dimitri, { response_type: Document::ResponseType::RESP_COMPLETE, text: 'document is closed' })
#     expect(Document::User.where(document: doc).count).to eq(3)
#     u1 = Document::User.where(document: doc, user: dimitri).first
#     expect(u1.user).to eq(dimitri)
#     expect(u1.new?).to eq(false)
#     expect(u1.changed?).to eq(false)
#     expect(u1.sent?).to eq(true)
#     expect(u1.received?).to eq(false)
#     expect(u1.forwarded?).to eq(false)
#     expect(u1.current?).to eq(false)
#     expect(u1.canceled?).to eq(false)
#     expect(u1.completed?).to eq(true)
#     expect(u1.as_owner).to eq(Document::User::DOC_COMPLETED)
#     expect(u1.as_signee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_author).to eq(Document::User::DOC_NONE)
#     u2 = Document::User.where(document: doc, user: shalva).first
#     expect(u2.user).to eq(shalva)
#     expect(u2.new?).to eq(false)
#     expect(u2.changed?).to eq(true)
#     expect(u2.sent?).to eq(false)
#     expect(u2.received?).to eq(true)
#     expect(u2.forwarded?).to eq(true)
#     expect(u2.current?).to eq(false)
#     expect(u2.canceled?).to eq(false)
#     expect(u2.completed?).to eq(true)
#     expect(u2.as_owner).to eq(Document::User::DOC_NONE)
#     expect(u2.as_signee).to eq(Document::User::DOC_NONE)
#     expect(u2.as_assignee).to eq(Document::User::DOC_COMPLETED)
#     expect(u2.as_author).to eq(Document::User::DOC_NONE)
#   end

#   it 'send to more then one signee' do
#     # 1. Sending document
#     #
#     dimitri = Sys::User.find_by_username('dimitri')
#     shalva  = Sys::User.find_by_username('shalva')
#     nino    = Sys::User.find_by_username('nino')
#     doc = Document::Base.create_draft!(dimitri)
#     doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body' })
#     motion1 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: shalva.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE
#     })
#     motion2 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: nino.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE
#     })
#     expect(motion1.ordering).to eq(1)
#     expect(motion2.ordering).to eq(2)
#     # sending to the first assignee
#     doc.reload ; doc.send_draft!(dimitri)
#     motion1.reload ; motion2.reload
#     expect(motion1.new?).to eq(true)
#     expect(motion1.status).to eq(Document::Status::CURRENT)
#     expect(motion2.new?).to eq(true)
#     expect(motion2.status).to eq(Document::Status::SENT)
#     u1 = doc.users.where(user: shalva).first
#     u2 = doc.users.where(user: nino).first
#     expect(u1.new?).to eq(true)
#     expect(u1.changed?).to eq(true)
#     expect(u1.shown?).to eq(true)
#     expect(u1.forwarded?).to eq(false)
#     expect(u1.sent?).to eq(false)
#     expect(u1.received?).to eq(true)
#     expect(u1.current?).to eq(true)
#     expect(u1.completed?).to eq(false)
#     expect(u1.canceled?).to eq(false)
#     expect(u1.as_owner).to eq(Document::User::DOC_NONE)
#     expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_signee).to eq(Document::User::DOC_CURRENT)
#     expect(u1.as_author).to eq(Document::User::DOC_NONE)
#     expect(u2.new?).to eq(true)
#     expect(u2.changed?).to eq(true)
#     expect(u2.shown?).to eq(false)
#     expect(u2.forwarded?).to eq(false)
#     expect(u2.sent?).to eq(false)
#     expect(u2.received?).to eq(true)
#     expect(u2.current?).to eq(false)
#     expect(u2.completed?).to eq(false)
#     expect(u2.canceled?).to eq(false)
#     expect(u2.as_owner).to eq(Document::User::DOC_NONE)
#     expect(u2.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(u2.as_signee).to eq(Document::User::DOC_NONE)
#     expect(u2.as_author).to eq(Document::User::DOC_NONE)
#     # complete for the first receiver
#     motion1.add_comment(shalva, {
#       response_type: Document::ResponseType::RESP_COMPLETE,
#       text: 'completing the motion'
#     })
#     u1.read! ; motion1.reload ; motion2.reload ; u1.reload ; u2.reload
#     expect(motion1.status).to eq(Document::User::COMPLETED)
#     expect(motion1.new?).to eq(false)
#     expect(motion2.status).to eq(Document::User::CURRENT)
#     expect(motion2.new?).to eq(true)
#     expect(u1.new?).to eq(false)
#     expect(u1.changed?).to eq(false)
#     expect(u1.shown?).to eq(true)
#     expect(u1.forwarded?).to eq(false)
#     expect(u1.sent?).to eq(false)
#     expect(u1.received?).to eq(true)
#     expect(u1.current?).to eq(false)
#     expect(u1.completed?).to eq(true)
#     expect(u1.canceled?).to eq(false)
#     expect(u1.as_owner).to eq(Document::User::DOC_NONE)
#     expect(u1.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(u1.as_signee).to eq(Document::User::DOC_COMPLETED)
#     expect(u1.as_author).to eq(Document::User::DOC_NONE)

#     expect(u2.user).to eq(nino)
#     expect(u2.new?).to eq(true)
#     expect(u2.changed?).to eq(true)
#     expect(u2.shown?).to eq(true)
#     expect(u2.forwarded?).to eq(false)
#     expect(u2.sent?).to eq(false)
#     expect(u2.received?).to eq(true)
#     expect(u2.current?).to eq(true)
#     expect(u2.completed?).to eq(false)
#     expect(u2.canceled?).to eq(false)
#     expect(u2.as_owner).to eq(Document::User::DOC_NONE)
#     expect(u2.as_assignee).to eq(Document::User::DOC_NONE)
#     expect(u2.as_signee).to eq(Document::User::DOC_CURRENT)
#     expect(u2.as_author).to eq(Document::User::DOC_NONE)
#   end

#   it 'should cancel document when not signed' do
#     dimitri = Sys::User.find_by_username('dimitri')
#     shalva  = Sys::User.find_by_username('shalva')
#     nino    = Sys::User.find_by_username('nino')
#     temo    = Sys::User.find_by_username('temo')
#     doc = Document::Base.create_draft!(dimitri)
#     doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body' })
#     motion1 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: shalva.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       ordering: 1
#     })
#     motion2 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: nino.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       ordering: 1
#     })
#     motion3 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: temo.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       ordering: 2
#     })
#     expect(motion1.ordering).to eq(1)
#     expect(motion2.ordering).to eq(1)
#     expect(motion3.ordering).to eq(2)
#     doc.reload ; doc.send_draft!(dimitri)
#     [motion1, motion2, motion3].each {|x| x.reload}
#     expect(motion1.status).to eq(Document::Status::CURRENT)
#     expect(motion2.status).to eq(Document::Status::CURRENT)
#     expect(motion3.status).to eq(Document::Status::SENT)
#     motion1.add_comment(shalva, {
#       response_type: Document::ResponseType::RESP_CANCEL,
#       text: 'not signing'
#     })
#     doc.reload
#     [motion1, motion2, motion3].each {|x| x.reload}
#     expect(motion1.status).to eq(Document::Status::CANCELED)
#     expect(motion2.status).to eq(Document::Status::NOT_RECEIVED)
#     expect(motion3.status).to eq(Document::Status::NOT_RECEIVED)
#     expect(doc.status).to eq(Document::Status::CANCELED)
#     expect {
#       motion2.add_comment(nino, { response_type: Document::ResponseType::RESP_COMPLETE })
#     }.to raise_error(RuntimeError)
#     doc.reload
#     expect {
#       doc.add_comment(dimitri, { response_type: Document::ResponseType::RESP_COMPLETE })
#     }.to raise_error(RuntimeError)
#   end

#   it 'should cancel document when not signed' do
#     dimitri = Sys::User.find_by_username('dimitri')
#     shalva  = Sys::User.find_by_username('shalva')
#     nino    = Sys::User.find_by_username('nino')
#     temo    = Sys::User.find_by_username('temo')
#     doc = Document::Base.create_draft!(dimitri)
#     doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body' })
#     motion1 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: shalva.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE
#     })
#     motion2 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: nino.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE
#     })
#     doc.reload ; doc.send_draft!(dimitri)
#     motion1.reload ; motion2.reload
#     expect(motion1.ordering).to eq(1)
#     expect(motion2.ordering).to eq(2)
#     expect(motion1.status).to eq(Document::Status::CURRENT)
#     expect(motion2.status).to eq(Document::Status::SENT)
#     doc.add_comment(dimitri, { response_type: Document::ResponseType::RESP_CANCEL })
#     doc.reload ; motion1.reload ; motion2.reload
#     expect(motion1.status).to eq(Document::Status::NOT_RECEIVED)
#     expect(motion2.status).to eq(Document::Status::NOT_RECEIVED)
#     expect(doc.status).to eq(Document::Status::CANCELED)
#   end

#   it 'two signees on the same level and one on upper level' do
#     dimitri = Sys::User.find_by_username('dimitri')
#     shalva  = Sys::User.find_by_username('shalva')
#     nino    = Sys::User.find_by_username('nino')
#     temo    = Sys::User.find_by_username('temo')
#     doc = Document::Base.create_draft!(dimitri)
#     doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body' })
#     motion1 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: shalva.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       ordering: 1
#     })
#     motion2 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: nino.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       ordering: 1
#     })
#     motion3 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: temo.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       ordering: 2
#     })
#     doc.reload ; doc.send_draft!(dimitri)
#     motion1.reload ; motion2.reload ; motion3.reload
#     expect(motion1.ordering).to eq(1)
#     expect(motion1.status).to eq(Document::Status::CURRENT)
#     expect(motion2.ordering).to eq(1)
#     expect(motion2.status).to eq(Document::Status::CURRENT)
#     expect(motion3.ordering).to eq(2)
#     expect(motion3.status).to eq(Document::Status::SENT)
#     motion1.add_comment(shalva, { response_type: Document::ResponseType::RESP_COMPLETE })
#     doc.reload ; motion1.reload ; motion2.reload; motion3.reload
#     expect(motion1.status).to eq(Document::Status::COMPLETED)
#     expect(motion2.status).to eq(Document::Status::CURRENT)
#     expect(motion3.status).to eq(Document::Status::SENT)
#     motion2.add_comment(nino, { response_type: Document::ResponseType::RESP_COMPLETE })
#     doc.reload ; motion1.reload ; motion2.reload; motion3.reload
#     expect(motion1.status).to eq(Document::Status::COMPLETED)
#     expect(motion2.status).to eq(Document::Status::COMPLETED)
#     expect(motion3.status).to eq(Document::Status::CURRENT)
#   end

#   it 'testing due dates' do
#     dimitri = Sys::User.find_by_username('dimitri')
#     shalva  = Sys::User.find_by_username('shalva')
#     nino    = Sys::User.find_by_username('nino')

#     dd1 = Date.today + 10
#     dd2 = Date.today + 5

#     doc = Document::Base.create_draft!(dimitri)
#     doc.update_draft!(dimitri, { subject: 'test subject', body: 'test body', due_date: dd1 })

#     motion1 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: shalva.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       due_date: dd2,
#       ordering: 1
#     })
#     motion2 = Document::Motion.create_draft!(dimitri, {
#       document_id: doc.id,
#       receiver_type: 'HR::Employee',
#       receiver_id: nino.employee.id,
#       receiver_role: Document::Role::ROLE_SIGNEE,
#       ordering: 1
#     })

#     doc.reload ; doc.send_draft!(dimitri)
#     motion1.reload ; motion2.reload

#     u1 = Document::User.where(document: doc, user: dimitri).first
#     u2 = Document::User.where(document: doc, user: shalva).first
#     u3 = Document::User.where(document: doc, user: nino).first

#     expect(motion1.effective_due_date).to eq(dd2)
#     expect(motion1.due_is_over?).to eq(false)
#     expect(motion2.effective_due_date).to eq(dd1)
#     expect(motion2.due_is_over?).to eq(false)
#     expect(u1.has_due_date).to eq(0)
#     expect(u1.completed_over_due).to eq(0)
#     expect(u1.current_due_date).to be_nil
#     expect(u2.has_due_date).to eq(1)
#     expect(u2.completed_over_due).to eq(0)
#     expect(u2.current_due_date).to eq(dd2)
#     expect(u3.has_due_date).to eq(1)
#     expect(u3.completed_over_due).to eq(0)
#     expect(u3.current_due_date).to eq(dd1)
#     expect(u1.due_is_over?).to eq(false)
#     expect(u2.due_is_over?).to eq(false)
#     expect(u3.due_is_over?).to eq(false)

#     # XXX Timecop.travel Date.today + 6

#     Timecop.travel Date.today + 7 do
#       expect(motion1.due_is_over?).to eq(true)
#       expect(motion2.due_is_over?).to eq(false)
#       expect(u1.due_is_over?).to eq(false)
#       expect(u2.due_is_over?).to eq(true)
#       expect(u3.due_is_over?).to eq(false)
#     end

#     Timecop.travel Date.today + 10 do
#       expect(motion1.due_is_over?).to eq(true)
#       expect(motion2.due_is_over?).to eq(false)
#       expect(u1.due_is_over?).to eq(false)
#       expect(u2.due_is_over?).to eq(true)
#       expect(u3.due_is_over?).to eq(false)
#     end

#     Timecop.travel Date.today + 15 do
#       expect(motion1.due_is_over?).to eq(true)
#       expect(motion2.due_is_over?).to eq(true)
#       expect(u1.due_is_over?).to eq(false)
#       expect(u2.due_is_over?).to eq(true)
#       expect(u3.due_is_over?).to eq(true)
#     end

#     Timecop.travel Date.today + 6 do
#       motion1.add_comment(shalva, { response_type: Document::ResponseType::RESP_COMPLETE })
#       motion1.reload; motion2.reload; u1.reload; u2.reload; u3.reload

#       expect(motion1.due_is_over?).to eq(true)
#       expect(u2.due_date?).to eq(true)
#       expect(u2.completed_over_due).to eq(1)
#       expect(u2.current_due_date).to be_nil
#       expect(u2.due_is_over?).to eql(true)
#       expect(motion2.due_is_over?).to eq(false)
#       expect(u3.due_date?).to eq(true)
#       expect(u3.completed_over_due).to eq(0)
#       expect(u3.current_due_date).to be_present
#       expect(u3.due_is_over?).to eql(false)

#       motion2.add_comment(nino, { response_type: Document::ResponseType::RESP_COMPLETE })
#       motion1.reload; motion2.reload; u1.reload; u2.reload; u3.reload
#       expect(u2.due_date?).to eq(true)
#       expect(u2.completed_over_due).to eq(1)
#       expect(u2.current_due_date).to be_nil
#       expect(u2.due_is_over?).to eql(true)
#       expect(motion2.due_is_over?).to eq(false)
#       expect(u3.due_date?).to eq(true)
#       expect(u3.completed_over_due).to eq(0)
#       expect(u3.current_due_date).to be_nil
#       expect(u3.due_is_over?).to eql(false)
#     end
#   end
# end

# RSpec.describe 'document with different sender and author' do
#   before(:example) do
#     create_default_schema
#     @dimitri = Sys::User.find_by_username('dimitri')
#     @shalva = Sys::User.find_by_username('shalva')
#     @doc = Document::Base.create_draft!(@dimitri)
#     @doc.update_draft!(@dimitri, { subject: 'test subject', body: 'test body' })
#     Document::Motion.create_draft!(@dimitri, { document_id: @doc.id, receiver_type: 'HR::Employee', receiver_id: @shalva.employee.id, receiver_role: 'author' })
#     @doc.send_draft!(@dimitri)
#     @doc.reload
#     @u1 = @doc.users.where(user: @dimitri).first
#     @u2 = @doc.users.where(user: @shalva).first
#     expect(@u1.as_owner).to eq(Document::User::DOC_CURRENT)
#     expect(@u2.as_author).to eq(Document::User::DOC_CURRENT)
#   end

#   it 'when author completes the document, owner has his document competed as well' do
#     expect(@doc.motions.count).to eq(1)
#     m1 = @doc.motions.first
#     m1.add_comment(@shalva, { response_type: Document::ResponseType::RESP_COMPLETE })
#     @u1.reload ; @u2.reload
#     # XXX do we need this?
#     expect(@u1.as_owner).to eq(Document::User::DOC_COMPLETED)
#     expect(@u2.as_author).to eq(Document::User::DOC_COMPLETED)
#   end
# end
