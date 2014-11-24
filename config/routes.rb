# -*- encoding : utf-8 -*-
Rails.application.routes.draw do
  namespace 'admin' do
    get '/', controller: 'base', action: 'index', as: 'home'
    scope 'hr', controller: 'hr' do
      scope 'employees' do
        get '/', action: 'employees', as: 'employees'
        get '/show/:id', action: 'employee', as: 'employee'
      end
      scope 'organization' do
        get '/(:parent_id)', action: 'organization', as: 'organization'
      end
      get '/structure', action: 'structure', as: 'structure'
    end
    scope 'users', controller: 'users' do
      get '/', action: 'index', as: 'users'
      get '/show/:id', action: 'show', as: 'user'
      match '/new', action: 'new', as: 'new_user', via: ['get', 'post']
      match '/edit/:id', action: 'edit', as: 'edit_user', via: ['get', 'post']
      delete '/delete/:id', action: 'destroy', as: 'delete_user'
    end
    scope 'document' do
      scope 'types', controller: 'doctypes' do
        get '/', action: 'index', as: 'doctypes'
        get '/show/:id', action: 'show', as: 'doctype'
        match '/new', action: 'new', as: 'new_doctype', via: ['get', 'post']
        match '/edit/:id', action: 'edit', as: 'edit_doctype', via: ['get', 'post']
        delete '/delete/:id', action: 'destroy', as: 'delete_doctype'
      end
    end
  end

  namespace 'api' do
    scope 'user', controller: 'user' do
      post '/login', action: 'login'
    end
    scope '/hr', controller: 'hr' do
      get '/structure', action: 'structure'
    end
    scope 'docs', controller: 'docs' do
      get '/', action: 'index'
      get '/types', action: 'types'
      get '/show/:id', action: 'show'
      get '/motions', action: 'motions'
      get '/comments', action: 'comments'
      post '/create', action: 'create'
      post '/add_comment', action: 'add_comment'
    end
  end

  root controller: 'site', action: 'index'
end
