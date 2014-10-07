# -*- encoding : utf-8 -*-
Rails.application.routes.draw do

  namespace :admin do
    get '/', controller: 'home', action: 'index', as: 'home'
    scope '/users', controller: 'users' do
      get '/', action: 'index', as: 'users'
      get '/show/:id', action: 'show', as: 'user'
      match '/new', action: 'new', as: 'new_user', via: ['get', 'post']
      match '/edit/:id', action: 'edit', as: 'edit_user', via: ['get', 'post']
    end
    scope '/employees', controller: 'employees' do
      get '/', action: 'index', as: 'employees'
      get '/show/:id', action: 'show', as: 'employee'
      post '/sync', action: 'sync', as: 'sync_employees'
    end
  end

  namespace :tel100 do
    scope '/', controller: 'home' do
      get '/', action: 'index', as: 'documents'
      match '/new', action: 'new', as: 'new_document', via: ['get', 'post']
    end
  end

  scope controller: 'site' do
    match '/login', action: 'login', as: 'login', via: ['get','post']
    match '/register', action: 'register', as: 'register', via: ['get', 'post']
    root action: 'index', as: 'home'
  end

  get '/tel100', to: 'site#index'

end
