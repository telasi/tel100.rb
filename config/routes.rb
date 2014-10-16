# -*- encoding : utf-8 -*-
Rails.application.routes.draw do
  scope 'api', controller: 'api' do
    post '/login', action: 'login'
  end

  scope 'document', controller: 'document' do
  	root controller: 'document', action: 'index', as: 'get_documents'
  end

  root controller: 'site', action: 'index'
end
