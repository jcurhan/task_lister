Rails.application.routes.draw do
  root 'boards#index'
  get 'boards/search'

  resources :boards do
    resources :lists do
      resources :tasks
    end
  end
end
