# -*- encoding : utf-8 -*-
class Admin::Api::BaseController < AdminApiController
  layout 'admin'
  
  def index
    render json: { success: false, error: error, object: object }
  end

  def login
    if request.post?
      @user = Sys::User.authenticate(params[:email], params[:password])
      if @user.present? && current_user.admin?
        session[:user_id] = @user.id
        render json: { success: true, error: nil, object: nil }
      else
        render json: { success: false, error: nil, object: nil }
      end
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to admin_login_url
  end

  def restart 
    Dir.chdir './tmp' do
     system 'touch restart.txt'
    end
    redirect_to admin_home_url
  end
end
