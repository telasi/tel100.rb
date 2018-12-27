# -*- encoding : utf-8 -*-
class Admin::UsersController < AdminController
  def index
    @title = 'მომხმარებლები'
    @passive_title = 'გაუქმებული მომხმარებლები'
    @users = Sys::User.active.order('username')
    @passive = Sys::User.where('is_active = 0').order('username')
  end

  def show
    @user = Sys::User.find(params[:id])
    @title = @user.full_name
  end

  def new
    @title = 'ახალი მომხმარებელი'
    if request.post?
      @user = Sys::User.new(user_params)
      redirect_to admin_user_url(id: @user.id) if @user.create_user
    else
      @user = Sys::User.new
    end
  end

  def edit
    @title = 'მომხმარებლის შეცვლა'
    @user = Sys::User.find(params[:id])
    if request.post?
      if @user.update_user(user_params)
        empl = @user.employee
        empl.update_attributes(user_id: @user.id) if empl
        redirect_to admin_user_url(id: @user.id)
      end
    end
  end

  def change_password
    @title = 'პაროლის შეცვლა'
    @user = Sys::User.find(params[:id])
    if request.post?
      redirect_to admin_user_url(id: @user.id) if @user.update_user(user_params)
    end
  end

  def destroy
    user = Sys::User.find(params[:id])
    user.destroy
    redirect_to admin_users_url
  end

  def generate_relations
    user = Sys::User.find(params[:id])
    Sys::UserRelation.generate(user)
    redirect_to admin_user_url(user), notice: 'მომხმარებლის კავშირები გენერირებულია'
  end

  def relation
    @title = 'კავშირის დამატება'
    @user = Sys::User.find(params[:id])
    if request.post?
      @relation = Sys::UserRelation.new(params.require(:sys_userrelation).permit(:role, :related_id))
      @relation.user = @user
      @relation.save
      redirect_to admin_user_url(@user), notice: 'მომხმარებლის კავშირი დამატებულია'
    else
      @relation = Sys::UserRelation.new
    end
  end

  def destroy_relation
    rel = Sys::UserRelation.find([params[:user_id], params[:related_id], params[:role]])
    rel.destroy
    redirect_to admin_user_url(params[:user_id]), notice: 'მომხმარებლის კავშირი წაშლილია'
  end

  def sync_eflow_users
    Sys::User.all.each do |user|
      user.sync_with_eflow
    end
    redirect_to admin_users_url, notice: 'სინქრონიზაცია დასრულებულია'
  end

  def eflow_motions
    @title = 'მოძრაობები'
    @user = Sys::User.find(params[:id])
    @motions = @user.eflow_motions.order('motion_id DESC').paginate(page: params[:page], per_page: 10)
  end

  private

  def user_params; params.require(:sys_user).permit(:username, :virtual_password, :email, :mobile, :phone, :employee_id, :is_active, :is_admin, :is_director, :first_name_ka, :last_name_ka, :first_name_ru, :last_name_ru) end
end
