# TODO: to run:
# gem install sinatra instagram rerun
# ruby instagram_friend_manager_app.rb
#
# use rerun for reload on file changes:
# $ rerun instagram_friend_manager_app.rb

require "sinatra"
require "sinatra/config_file"
require "instagram"

config_file 'config.yml'

enable :sessions

CALLBACK_URL = settings.callback_url

Instagram.configure do |config|
  config.client_id = settings.client_id
  config.client_secret = settings.client_secret
  # For secured endpoints only
  #config.client_ips = '<Comma separated list of IPs>'
end

get "/" do
  redirect "/oauth/connect"
end

get "/oauth/connect" do
  redirect Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
end

get "/oauth/callback" do
  content_type :json
  response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
  session[:access_token] = response.access_token
  {:status => 200}.to_json
end

get "/users/self" do
  content_type :json
  client = Instagram.client(:access_token => session[:access_token])
  client.user.to_json
end

get "/users/:user_id/follows" do
  content_type :json
  client = Instagram.client(:access_token => session[:access_token])
  client.user_follows.to_json
end

get "/limits" do
  # content_type :json
  client = Instagram.client(:access_token => session[:access_token])
  response = client.utils_raw_response

  limit = response.headers[:x_ratelimit_limit]
  # {:limit => limit}.to_json
  limit
end