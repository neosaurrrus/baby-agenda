Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  get 'users/current_user'
  root 'activities#index'
  resources :activities
  resources :users
  

  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
