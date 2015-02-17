require "sinatra"
require "instagram"

# config_file 'config.yml'

enable :sessions

CALLBACK_URL = "http://localhost:4567/oauth/callback"

Instagram.configure do |config|
  config.client_id = "f1f2ed392b304f8f95ee9ffa345c5015"
  config.client_secret = "51ccdc312efb401bade442161e401abc"
  # For secured endpoints only
  #config.client_ips = '<Comma separated list of IPs>'
end

get "/" do
  '<a href="/oauth/connect">Connect with Instagram</a>'
end

get "/oauth/connect" do
  redirect Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
end

get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
  session[:access_token] = response.access_token
  redirect "/nav"
end

get "/user_recent_media" do
  content_type :json

  client = Instagram.client(:access_token => session[:access_token])
  
  client.user_recent_media.to_json
end

get "/users/:user_id/follows"
  content_type :json

  result = "hello world " + params[:user_id]

  result.to_json
end

get "/limits" do
  content_type :json
  client = Instagram.client(:access_token => session[:access_token])
  response = client.utils_raw_response
  response.to_json
end