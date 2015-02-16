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
    scope 'vacation', controller: 'vacation' do
      get '/types', action: 'types'
      post '/create', action: 'create'
    end
    scope 'folder', controller: 'folder' do
      get '/', action: 'index'
      get '/standard', action: 'standard'
      post '/', action: 'create'
      delete '/:id', action: 'delete'
      post '/order', action: 'order'
      get '/document', action: 'document_index'
      post '/document/', action: 'document_create'
      delete '/document', action: 'document_delete'
    end
    # scope 'docs', controller: 'docs' do
    #   get '/', action: 'index'
    #   get '/show/:id', action: 'show'
    #   get '/motions', action: 'motions'
    #   get '/sender_motions', action: 'sender_motions'
    #   get '/comments', action: 'comments'
    #   post '/create', action: 'create'
    #   post '/add_comment', action: 'add_comment'
    # end
    namespace 'sys' do
      scope 'users', controller: 'users' do
        get '/', action: 'index'
      end
    end

    namespace 'documents' do
      scope 'base', controller: 'base' do
        get    '/', action: 'index'
        get    '/:id', action: 'show'
        post   '/create_draft', action: 'create_draft'
        put    '/update_draft', action: 'update_draft'
        delete '/delete_draft', action: 'delete_draft'
        post   '/send_draft',   action: 'send_draft'
      end
      scope 'motion', controller: 'motion' do
        get    '/',                   action: 'index'
        get    '/tree',               action: 'tree'
        post   '/create_draft',       action: 'create_draft'
        put    '/update_draft',       action: 'update_draft'
        delete '/delete_draft',       action: 'delete_draft'
        post   '/send_draft_motions', action: 'send_draft_motions'
      end
      scope 'types', controller: 'types' do
        get    '/',    action: 'index'
        get    '/:id', action: 'show'
        post   '/',   action: 'create'
        put    '/:id', action: 'update'
        delete '/:id', action: 'destroy'
      end
    end
  end

  root controller: 'site', action: 'index'
end
