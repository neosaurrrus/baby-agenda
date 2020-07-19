Rails.application.routes.draw do
  root 'activities#index'
  resources :activities
  
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
