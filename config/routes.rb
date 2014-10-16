# -*- encoding : utf-8 -*-
Rails.application.routes.draw do
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
