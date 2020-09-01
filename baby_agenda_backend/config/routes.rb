Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy' 
  root 'activities#index'
  resources :activities
  resources :users
  resources :sessions
  resources :items
  

  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
