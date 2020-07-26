Rails.application.routes.draw do
  root 'activities#index'
  resources :activities
  resources :users
  get 'current_user' => "sessions#current_user"
  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
