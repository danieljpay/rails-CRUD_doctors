Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "dashboard#index"

  namespace :api do
    resources :doctors, only: [:index, :create, :update, :destroy] do
    end
  end

  namespace :api do
    resources :specialties, only: [:index] do 
    end
  end
  
end
