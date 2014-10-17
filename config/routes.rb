# -*- encoding : utf-8 -*-
Rails.application.routes.draw do
  namespace 'admin' do
    get '/', controller: 'base', action: 'index', as: 'home'
    scope 'hr', controller: 'hr' do
      scope 'employees' do
        get '/', action: 'employees', as: 'employees'
        get '/:id', action: 'employee', as: 'employee'
      end
      scope 'organization' do
        get '/(:parent_id)', action: 'organization', as: 'organization'
      end
    end
    scope 'users', controller: 'users' do
      get '/', action: 'index', as: 'users'
      get '/:id', action: 'show', as: 'user'
    end
  end

  namespace 'api' do
    scope 'user', controller: 'user' do
      post '/login', action: 'login'
    end
  end

  scope 'document', controller: 'document' do
  	root controller: 'document', action: 'index', as: 'get_documents'
  end

  root controller: 'site', action: 'index'
end
