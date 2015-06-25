# -*- encoding : utf-8 -*-
class Api::EflowController < ApiController
  before_filter :validate_login

  def motions
    if params[:doc_number].present?
      employee_ids = effective_user.eflow_users.map{ |x| x.employee_id }
      rel = Eflow::Motion.joins('INNER JOIN eflow.docs_documents ON docs_motions.document_id=docs_documents.document_id').where('docs_documents.document_no = ? OR docs_documents.document_no2 = ?', params[:doc_number], params[:doc_number])
      rel = rel.where("docs_motions.target_id IN (?) AND docs_motions.motion_state_id IN (?)", employee_ids, Eflow::MotionStatus::RECEIVER_STATS)
    else
      rel = effective_user.eflow_motions.order("motion_id DESC")
    end
    @motions = rel.paginate(per_page: params[:limit], page: params[:page])
  end
end
