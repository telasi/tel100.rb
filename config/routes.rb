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
      match '/change_password/:id', action: 'change_password', as: 'change_password', via: ['get', 'post']
      match '/relation/:id', action: 'relation', as: 'relate_user', via: ['get', 'post']
      delete '/relation/:user_id/:related_id/:role', action: 'destroy_relation', as: 'destroy_related_user'
      delete '/delete/:id', action: 'destroy', as: 'delete_user'
      post '/generate_relations/:id', action: 'generate_relations', as: 'generate_user_relations'
      post '/sync_eflow', action: 'sync_eflow_users', as: 'sync_eflow_users'
      get '/eflow_motions/:id', action: 'eflow_motions', as: 'eflow_user_motions'
    end
    scope 'document' do
      scope 'types', controller: 'doctypes' do
        get '/', action: 'index', as: 'doctypes'
        get '/show/:id', action: 'show', as: 'doctype'
        match '/new', action: 'new', as: 'new_doctype', via: ['get', 'post']
        match '/edit/:id', action: 'edit', as: 'edit_doctype', via: ['get', 'post']
        delete '/delete/:id', action: 'destroy', as: 'delete_doctype'
      end
      scope 'response_types', controller: 'response_types' do
        get '/', action: 'index', as: 'response_types'
        get '/show/:id', action: 'show', as: 'response_type'
        match '/new', action: 'new', as: 'new_response_type', via: ['get', 'post']
        match '/edit/:id', action: 'edit', as: 'edit_response_type', via: ['get', 'post']
        delete '/delete/:id', action: 'destroy', as: 'delete_response_type'
      end
    end
  end

  namespace 'api' do
    scope 'user', controller: 'user' do
      post '/login', action: 'login'
      put '/update', action: 'update'
      get '/related', action: 'related'
    end
    scope '/hr', controller: 'hr' do
      get '/structure', action: 'structure'
      get '/party/list', action: 'partylist'
      post '/party/create', action: 'partycreate'
    end
    scope '/bs', controller: 'bs' do
      get '/list', action: 'list'
    end
    scope '/party', controller: 'party' do
      get '/favourites', action: 'favourites'
      post '/favourites', action: 'favourites_create'
      delete '/favourites/:id', action: 'favourites_delete'
      get '/info', action: 'info'
    end
    scope 'vacation', controller: 'vacation' do
      get '/types', action: 'types'
      post '/create', action: 'create'
      get '/substitudes', action: 'substitudes'
      get '/list', action: 'list'
    end
    scope 'folder', controller: 'folder' do
      get '/', action: 'index'
      get '/standard', action: 'standard'
      post '/', action: 'create'
      post '/order', action: 'order'
      get '/document', action: 'document_index'
      post '/document/', action: 'document_create'
      delete '/document/', action: 'document_delete'
      post '/search', action: 'search'
      delete '/:id', action: 'delete'
    end
    namespace 'sys' do
      scope 'users', controller: 'users' do
        get '/', action: 'index'
      end
    end
    namespace 'documents' do
      scope 'base', controller: 'base' do
        get    '/', action: 'index'
        get    '/search',       action: 'search'
        get    '/:id',          action: 'show'
        post   '/create_draft', action: 'create_draft'
        put    '/update_draft', action: 'update_draft'
        delete '/delete_draft', action: 'delete_draft'
        post   '/send_draft',   action: 'send_draft'
        post   '/reply',        action: 'reply'
        post   '/edit',         action: 'edit'
      end
      scope 'motion', controller: 'motion' do
        get    '/',                   action: 'index'
        get    '/tree',               action: 'tree'
        get    '/signatures',         action: 'signatures'
        get    '/assignees',          action: 'assignees'
        get    '/assignees_out',      action: 'assignees_out'
        post   '/create_draft',       action: 'create_draft'
        put    '/update_draft',       action: 'update_draft'
        delete '/delete_draft',       action: 'delete_draft'
        post   '/send_draft_motions', action: 'send_draft_motions'
        get    '/:id',                action: 'show'
      end
      scope 'types', controller: 'types' do
        get    '/',    action: 'index'
        get    '/:id', action: 'show'
        post   '/',   action: 'create'
        put    '/:id', action: 'update'
        delete '/:id', action: 'destroy'
      end
      scope 'response_types', controller: 'response_types' do
        get '/', action: 'index'
      end
      scope 'comments', controller: 'comments' do
        get  '/', action: 'index'
        post '/create', action: 'create'
        post '/sign', action: 'sign'
        post '/author', action: 'author'
      end
      scope 'files', controller: 'files' do
        get    '/',         action: 'index'
        get    '/download', action: 'download'
        post   '/upload',   action: 'upload'
        delete '/delete',   action: 'destroy'
      end
      scope 'filestemp', controller: 'files' do
        get   '/prepare/:id',  action: 'prepare'
        get   '/purge/:id',    action: 'purge'
        get    '/',            action: 'indextemp'
        get    '/download',    action: 'downloadtemp'
        post   '/upload',      action: 'uploadtemp'
        delete '/delete',      action: 'destroytemp'
      end
      scope 'relations', controller: 'relations' do
        get    '/',         action: 'index'
        post   '/create',   action: 'create'
        delete '/delete',   action: 'delete'
        get    '/answer',      action: 'answer'
      end
      scope 'print', controller: 'print' do
        get '/card/:id', action: 'card'
        get '/document/:id', action: 'print'
        get '/sign/:id', action: 'sign'
      end
    end
    scope 'sap', controller: 'sap' do
      get '/sync', action: 'sync'
      get '/hrupdate', action: 'hrupdate'
    end
  end

  root controller: 'site', action: 'index'
end
