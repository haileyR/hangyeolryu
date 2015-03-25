Rails.application.routes.draw do
  root 'welcome#index'
  get 'memorymath' => 'welcome#memorymath'
  get 'play2048clone' => 'welcome#play2048clone'
end
