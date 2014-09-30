# -*- encoding : utf-8 -*-
Rails.application.routes.draw do

  namespace :admin do
    get '/', controller: 'home', action: 'index', as: 'home'
    scope '/users', controller: 'users' do
      get '/', action: 'index', as: 'users'
      get '/show/:id', action: 'show', as: 'user'
      get '/new', action: 'new', as: 'new_user'
      get '/check_username', action: 'check_username', as: 'check_username'
      post '/register', action: 'register', as: 'register_user'
    end
    scope '/employees', controller: 'employees' do
      get '/', action: 'index', as: 'employees'
      get '/show/:id', action: 'show', as: 'employee'
      get '/info', action: 'info', as: 'employee_info'
    end
  end

  scope controller: 'site' do
    match '/login', action: 'login', as: 'login', via: ['get','post']
    match '/register', action: 'register', as: 'register', via: ['get', 'post']
    root action: 'index', as: 'home'
  end

  get '/tel100', to: 'site#index'

end
