# TODO: to run:
# gem install sinatra instagram rerun
# ruby instagram_friend_manager_app.rb
#
# use rerun for reload on file changes:
# $ rerun instagram_friend_manager_app.rb

require "sinatra"
require "sinatra/config_file"
require "sinatra/json"
require "instagram"
require "json"

enable :sessions

# config file holds instagram app api settings
config_file 'config.yml'

# enable CORDS
before do
   headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
   headers['Access-Control-Allow-Origin'] = 'http://localhost:9001'
   headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
   headers['Access-Control-Allow-Credentials'] = 'true'
end

# ensure authenticated
before do

  # TODO: which need to be passed over?
  pass if request.path_info == "/oauth/connect"
  pass if request.path_info == "/oauth/disconnect"
  pass if request.path_info == "/oauth/callback"

  # ensure logged in
  redirect "/oauth/connect" unless session[:access_token]
end

before do
  # init ruby instagram api
  Instagram.configure do |config|
    config.client_id = settings.client_id
    config.client_secret = settings.client_secret
  end

  @client = Instagram.client(:access_token => session[:access_token])
end

get "/" do
  redirect "/oauth/connect"
end

get "/oauth/connect" do
  redirect Instagram.authorize_url(:redirect_uri => settings.callback_url)
end

# TODO: make this a DELETE request
get "/oauth/disconnect" do
  session[:access_token] = nil
  status 200
end

get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code], :redirect_uri => settings.callback_url)
  session[:access_token] = response.access_token
  {:status => 200, :data => {:code => params[:code]}}.to_json
end

get "/users/self" do
  json @client.user
end

get "/users/:user_id/follows" do
  json @client.user_follows
end

get "/limits" do
  response = @client.utils_raw_response
  limit = response.headers[:x_ratelimit_limit]
  {:limit => limit}.to_json
end
