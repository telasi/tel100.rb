class Reporting::ReportingController < ApiController
	layout "application"
    def report_tree
    end

    def resolution_by_user
    	@rel = Document::Motion
    					.joins(:document)
    					.select("document_motion.*, document_base.docnumber, document_base.docdate, document_base.created_at as cr")
    					.where('MOTION_TEXT is not null')
    	if request.post?
    		debugger
			@rel = @rel.where('document_motion.SENDER_USER_ID = ?', params[:user]) if params[:out].present?
			@all = @rel.where('document_motion.RECEIVER_USER_ID = ?', params[:user]) if params[:in].present?
			@rel = @rel.where("document_motion.created_at >= ?", Date.strptime(params['date1'], '%d/%m/%Y')) if params['date1'].present?
			@rel = @rel.where("document_motion.created_at <= ?", Date.strptime(params['date2'], '%d/%m/%Y')) if params['date2'].present?
	   	end
    	@user = params[:user]
    end
end