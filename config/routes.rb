# -*- encoding : utf-8 -*-
Rails.application.routes.draw do

  scope controller: 'site' do
    match '/login', action: 'login', as: 'login', via: ['get','post']
    match '/register', action: 'register', as: 'register', via: ['get', 'post']
    root action: 'index', as: 'home'
  end

end
