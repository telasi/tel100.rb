# -*- encoding : utf-8 -*-
Rails.application.routes.draw do
  namespace 'admin' do
    scope 'hr', controller: 'hr' do
      get '/', action: 'index', as: 'hr'
      get '/employees/:id', action: 'employee', as: 'employee'
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
