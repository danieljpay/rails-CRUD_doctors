Rails.application.routes.draw do
  get 'doctors/index', as: 'doctors'
  get 'doctors/new', as: 'new_doctor'
  post '/doctors/create', as: 'create_doctor'
  get 'doctors/:id/edit', to: 'doctors#edit', as: 'edit_doctor'
  patch 'doctors/:id/update', to: 'doctors#update', as: 'update_doctor'
  delete 'doctors/:id/destroy', to: 'doctors#destroy', as: 'destroy_doctor'

  get 'services/index', as: 'services'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "doctors#index"
end
