class Reporting::ReportingController < ApiController
    before_action :check_permissions
    before_filter :set_user

    #def current_user
    #  @_curr_user ||= (Sys::User.find(session[:user_id]) rescue nil) if session[:user_id]
    #end
    #helper_method :current_user

	layout "application"
    def report_tree
        user_operations = Sys::UserRole.where(user: effective_user).map{ |ur| ur.role.name }
        filtered_reporting_tree = ReportingTree.deep_dup
        filtered = filtered_reporting_tree[:children].reject{ |x| !user_operations.include?(x[:operation]) }.map{ |x| x.merge!({:name => ( params[:api_locale] =='ka' ? x[:name_ka] : x[:name_ru] )}) }
        render json: filtered.to_json
    end

    def report
        redirect_to url_for(:action => params[:id].to_sym) 
    end

    def gnerc_report
        @rel = Document::Base
        .select("document_base.docnumber, document_base.docdate, document_base.created_at as cr").all
    end

    def resolution_by_user
    	@rel = Document::Motion
    					.joins(:document)
    					.select("document_motion.*, document_base.docnumber, document_base.docdate, document_base.created_at as cr")
    					.where('MOTION_TEXT is not null')
    	if request.post?
			@rel = @rel.where('document_motion.SENDER_USER_ID = ?', params[:user]) if params[:out].present?
			@rel = @rel.where('document_motion.RECEIVER_USER_ID = ?', params[:user]) if params[:in].present?
			@rel = @rel.where("document_motion.created_at >= ?", Date.strptime(params['date1'], '%d/%m/%Y')) if params['date1'].present?
			@rel = @rel.where("document_motion.created_at <= ?", Date.strptime(params['date2'], '%d/%m/%Y')) if params['date2'].present?
	   	end
    	@user = params[:user]
    end

    def rus_doc_attach
        @rel = Document::User.where(user: effective_user, is_shown: 1)
        @uploadlist = Sys::UploadFile.where(user: effective_user).select(:document_id)
        @doctypes = Document::Type.select(:id, :name_ka).as_json
        @doctypes.insert(0, { id: 0, name_ka: ''} )
        @rel = @rel.where.not(document_id: @uploadlist)
        @rel = @rel.joins(:document)

        if request.post?
           if params[:file].present?
             Document::File.upload(params) 
             Sys::UploadFile.new(document_id: params[:document_id], user_id: effective_user.id).save
             parent_motion = Document::Motion.where(document_id: params[:document_id], receiver_user_id: effective_user.id).first
             motion_params = { document_id: params[:document_id],
                            parent_id: parent_motion.id,
                            receiver_user_id: HR_RUS_ATTACH_DOC_RECEIVER_USER,
                            receiver_id: HR_RUS_ATTACH_DOC_RECEIVER,
                            receiver_type: 'HR::Employee',
                            receiver_role: 'assignee' }
             motion = Document::Motion.create_draft!(effective_user, motion_params)
             motion.send_draft!(effective_user)
           end
           @rel = @rel.where('document_base.direction = ?', params[:direction]) if params[:direction].present?
           @rel = @rel.where('document_base.type_id = ?', params[:type_id]) if params[:type_id].present?
           @rel = @rel.where('document_base.docnumber = ?', params[:number]) if params[:number].present?
           @rel = @rel.where('document_base.docyear = ?', params[:docyear]) if params[:docyear].present?
           @rel = @rel.where("document_base.created_at >= ?", Date.strptime(params['date1'], '%d/%m/%Y')) if params['date1'].present?
           @rel = @rel.where("document_base.created_at <= ?", Date.strptime(params['date2'], '%d/%m/%Y')) if params['date2'].present?
        end

        #@rel = @rel.paginate(per_page: params[:limit], page: params[:page])
    end

    def attached_docs
        @rel = Sys::UploadFile.all
        @rel = @rel.joins(:document)

        if request.post?
           @rel = @rel.where('document_base.docnumber = ?', params[:number]) if params[:number].present?
           @rel = @rel.where('document_base.docyear = ?', params[:docyear]) if params[:docyear].present?
           @rel = @rel.where("document_base.created_at >= ?", Date.strptime(params['date1'], '%d/%m/%Y')) if params['date1'].present?
           @rel = @rel.where("document_base.created_at <= ?", Date.strptime(params['date2'], '%d/%m/%Y')) if params['date2'].present?
        end

        #@rel = @rel.paginate(per_page: params[:limit], page: params[:page])
    end

    def doc_attach
      if params[:docyear].present? and params[:docnumber].present?
        @document = Document::Base.where(docyear: params[:docyear].strip, docnumber: params[:docnumber].strip).first
      end
      if request.post?
        if params[:file].present?
          Document::File.upload(params) 
          @document = Document::Base.find(params[:document_id])
        end

        redirect_to reporting_doc_attach_url(docyear: @document.docyear, docnumber: @document.docnumber)
      end
    end

    private 

    def set_user
        params[:api_username] ||= session[:api_username]
        params[:api_password] ||= session[:api_password]
        params[:api_locale]   ||= session[:api_locale]

        session[:api_username] = params[:api_username]
        session[:api_password] = params[:api_password]
        session[:api_locale]   = params[:api_locale]
    end

    def check_permissions
        user_operations = Sys::UserRole.where(user: effective_user).map{ |ur| ur.role.name }
        ReportingTree[:children].each do |leaf|
            if leaf.respond_to?(:operation)
                return true if user_operations.include?(leaf[:operation])
            end
        end
        return false
    end
end