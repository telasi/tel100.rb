# -*- encoding : utf-8 -*-
require 'rails_helper'
include Document::Role
include Document::Status
include Document::ResponseTypeDirection

RSpec.describe 'Document, Motions, and Users' do
  before(:example) do
    create_default_schema
    @dimitri = Sys::User.find_by_username('dimitri')
    @shalva = Sys::User.find_by_username('shalva')
    @nino = Sys::User.find_by_username('nino')
    @temo = Sys::User.find_by_username('temo')
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
      expect(motion.status).to eq(DRAFT)
    end

    it 'should have single document::user' do
      expect(@doc.users.count).to eq(1)
      du = @doc.users.first
      expect(du.user).to eq(@dimitri)
      expect(du.due_date?).to eq(false)
      expect(du.new?).to eq(false)
      expect(du.changed?).to eq(false)
      expect(du.sent?).to eq(false)
      expect(du.shown?).to eq(true)
      expect(du.as_owner).to eq(DOC_NONE)
      expect(du.as_sender).to eq(DOC_NONE)
    end
  end

  context 'Adding single receiver' do
    before(:example) do
      Document::Motion.create_draft!(@dimitri, {
        document_id: @doc.id,
        receiver_type: 'HR::Employee',
        receiver_id: @shalva.employee.id,
        receiver_role: ROLE_ASSIGNEE
      })
      @doc.reload
    end

    context 'ckecking motions and document users' do
      it 'should have two motions' do
        expect(@doc.motions.size).to eq(2)
        m2 = @doc.motions.last
        expect(m2.receiver_user).to eq(@shalva)
        expect(m2.sender_user).to eq(@dimitri)
        expect(m2.status).to eq(DRAFT)
      end

      it 'should have two document::user' do
        expect(@doc.users.count).to eq(2)
        du2 = @doc.users.last
        expect(du2.user).to eq(@shalva)
        expect(du2.shown?).to eq(false)
        expect(du2.due_date?).to eq(false)
        expect(du2.new?).to eq(true)
        expect(du2.changed?).to eq(true)
        expect(du2.sent?).to eq(false)
        expect(du2.shown?).to eq(false)
        expect(du2.as_owner).to eq(DOC_NONE)
        expect(du2.as_sender).to eq(DOC_NONE)
        expect(du2.as_assignee).to eq(DOC_NONE)
      end
    end

    context 'send document' do
      before(:example) do
        @doc.send_draft!(@dimitri)
        @doc.reload
      end

      it 'testing document properties' do
        expect(@doc.status).to eq(CURRENT)
        expect(@doc.docnumber).not_to be_blank
        expect(@doc.docdate).not_to be_blank
        expect(@doc.docyear).not_to be_blank
        expect(@doc.sent_at).not_to be_blank
        expect(@doc.received_at).not_to be_blank
      end

      it 'both motions should be current' do
        expect(@doc.motions.size).to eq(2)
        m1 = @doc.motions.first
        m2 = @doc.motions.last
        expect(m1.status).to eq(CURRENT)
        expect(m2.status).to eq(CURRENT)
      end

      it 'both users should have ' do
        expect(@doc.users.size).to eq(2)
        du1 = @doc.users.first
        du2 = @doc.users.last
        expect(du1.as_owner).to eq(DOC_CURRENT)
        expect(du1.as_sender).to eq(DOC_CURRENT)
        expect(du2.as_assignee).to eq(DOC_CURRENT)
      end

      context 'assignee closes the task' do
        before(:example) do
          m2 = @doc.motions.last
          m2.add_comment(@shalva, { response_type: RESP_COMPLETE, text: 'done' })
          @doc.reload
        end

        it 'testing document properties' do
          expect(@doc.status).to eq(CURRENT)
        end

        it 'testing motions' do
          m1 = @doc.motions.first
          m2 = @doc.motions.last
          expect(m1.status).to eq(CURRENT)
          expect(m2.status).to eq(COMPLETED)
          expect(m2.completed_at).not_to be_blank
        end

        it 'testing assignee\'s document user' do
          du2 = @doc.users.last
          expect(du2.as_assignee).to eq(DOC_COMPLETED)
          expect(du2.is_completed).to eq(1)
        end

        context 'owner closes the task' do
          before(:example) do
            m1 = @doc.motions.first
            m1.add_comment(@dimitri, { response_type: RESP_COMPLETE, text: 'completed' })
            @doc.reload
          end

          it 'testing document properties' do
            expect(@doc.status).to eq(COMPLETED)
          end

          it 'testing motions' do
            m1 = @doc.motions.first
            m2 = @doc.motions.last
            expect(m1.status).to eq(COMPLETED)
            expect(m2.status).to eq(COMPLETED)
            expect(m1.completed_at).not_to be_blank
          end

          it 'testing owner\'s document user' do
            du1 = @doc.users.first
            expect(du1.as_sender).to eq(DOC_COMPLETED)
            expect(du1.as_owner).to eq(DOC_COMPLETED)
            expect(du1.is_completed).to eq(1)
          end
        end
      end
    end
  end

  context 'Adding single author' do
    before(:example) do
      Document::Motion.create_draft!(@dimitri, {
        document_id: @doc.id,
        receiver_type: 'HR::Employee',
        receiver_id: @shalva.employee.id,
        receiver_role: ROLE_AUTHOR
      })
      @doc.reload
    end

    it 'doc owner should be changed' do
      expect(@doc.owner_user).to eq(@shalva)
    end

    it 'should have two motions' do
      expect(@doc.motions.size).to eq(2)
      m2 = @doc.motions.last
      expect(m2.receiver_user).to eq(@shalva)
      expect(m2.sender_user).to eq(@dimitri)
      expect(m2.status).to eq(DRAFT)
    end

    it 'should have two document::user' do
      expect(@doc.users.count).to eq(2)
      du2 = @doc.users.last
      expect(du2.user).to eq(@shalva)
      expect(du2.shown?).to eq(false)
      expect(du2.due_date?).to eq(false)
      expect(du2.new?).to eq(true)
      expect(du2.changed?).to eq(true)
      expect(du2.sent?).to eq(false)
      expect(du2.shown?).to eq(false)
      expect(du2.as_owner).to eq(DOC_NONE)
      expect(du2.as_sender).to eq(DOC_NONE)
      expect(du2.as_assignee).to eq(DOC_NONE)
    end

    context 'send document' do
      before(:example) do
        @doc.send_draft!(@dimitri)
        @doc.reload
      end

      it 'both motions should be current' do
        expect(@doc.motions.size).to eq(2)
        m1 = @doc.motions.first
        m2 = @doc.motions.last
        expect(m1.status).to eq(CURRENT)
        expect(m2.status).to eq(CURRENT)
      end

      it 'both users should have task as current' do
        expect(@doc.users.size).to eq(2)
        du1 = @doc.users.first
        du2 = @doc.users.last
        expect(du1.as_owner).to eq(DOC_NONE)
        expect(du1.as_sender).to eq(DOC_CURRENT)
        expect(du2.as_owner).to eq(DOC_CURRENT)
        expect(du2.as_sender).to eq(DOC_NONE)
      end

      context 'closing document by sender' do
        before(:example) do
          m1 = @doc.motions.first
          m1.add_comment(@dimitri, { response_type: RESP_COMPLETE, text: 'done' })
          @doc.reload
        end

        it 'document should be still current' do
          expect(@doc.status).to eq(CURRENT)
        end

        it 'motions' do
          m1 = @doc.motions.first
          m2 = @doc.motions.last
          expect(m1.status).to eq(COMPLETED)
          expect(m2.status).to eq(CURRENT)
        end

        it 'document users' do
          du1 = @doc.users.first
          du2 = @doc.users.last
          expect(du1.as_owner).to  eq(DOC_NONE)
          expect(du1.as_sender).to eq(DOC_COMPLETED)
          expect(du2.as_owner).to  eq(DOC_CURRENT)
          expect(du2.as_author).to  eq(DOC_CURRENT)
          expect(du2.as_sender).to eq(DOC_NONE)
        end

        context 'closing document by author (owner)' do
          before(:example) do
            m2 = @doc.motions.last
            m2.add_comment(@shalva, { response_type: RESP_COMPLETE, text: 'done' })
            @doc.reload
          end

          it 'doc should be completed' do
            expect(@doc.status).to eq(COMPLETED)
          end

          it 'motions' do
            m1 = @doc.motions.first
            m2 = @doc.motions.last
            expect(m1.status).to eq(COMPLETED)
            expect(m2.status).to eq(COMPLETED)
          end

          it 'document users' do
            du1 = @doc.users.first
            du2 = @doc.users.last
            expect(du1.as_owner).to  eq(DOC_NONE)
            expect(du1.as_sender).to eq(DOC_COMPLETED)
            expect(du2.as_owner).to  eq(DOC_COMPLETED)
            expect(du2.as_author).to eq(DOC_COMPLETED)
            expect(du2.as_sender).to eq(DOC_NONE)
          end
        end
      end
    end
  end
end
