# -*- encoding : utf-8 -*-
class Admin::RolesController < AdminController
  def index
    generate_report_roles

    @title = 'როლები'
    @roles = Sys::Role.all
  end

  def generate_report_roles
    report_roles = ReportingTree.deep_find(:operation)
    report_roles.each do |role|
      Sys::Role.new(name: role, category: 1).save if Sys::Role.where(name: role).empty?
    end
  end

  def show
    @role = Sys::Role.find(params[:id])
    @title = @role.name
    @users = @role.related_users
  end

  def new
    @title = 'ახალი როლი'
    if request.post?
      @role = Sys::Role.new(role_params)
      @role.save!
      redirect_to admin_role_url(id: @role.id) if @role.present?
    else
      @role = Sys::Role.new
    end
  end

  def edit
    @title = 'როლის შეცვლა'
    @role = Sys::Role.find(params[:id])
    if request.post?
      if @role.update_attributes!(role_params)
        redirect_to admin_roles_url(id: @role.id)
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
    role = Sys::Role.find(params[:id])
    role.destroy
    redirect_to admin_roles_url
  end

  def generate_relations
    user = Sys::User.find(params[:id])
    Sys::UserRelation.generate(user)
    redirect_to admin_user_url(user), notice: 'მომხმარებლის კავშირები გენერირებულია'
  end

  def relation
    @title = 'კავშირის დამატება'
    @role = Sys::Role.find(params[:id])
    if request.post?
      @relation = Sys::UserRole.new(params.require(:sys_userrole).permit(:user_id))
      @relation.role = @role
      @relation.save
      redirect_to admin_role_url(@role), notice: 'მომხმარებლის კავშირი დამატებულია'
    else
      @relation = Sys::UserRole.new
    end
  end

  def role_destroy_relation
    rel = Sys::UserRole.where(user_id: params[:user_id], role_id: params[:role_id]).first
    rel.destroy
    redirect_to admin_role_url(params[:role_id]), notice: 'მომხმარებლის კავშირი წაშლილია'
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

  def role_params; params.require(:sys_role).permit(:name) end
end
