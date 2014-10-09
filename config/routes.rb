# -*- encoding : utf-8 -*-
Rails.application.routes.draw do
  scope 'api', controller: 'api' do
    post '/login', action: 'login'
  end

  root controller: 'site', action: 'index'
end
