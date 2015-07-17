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

# config file holds instagram app api settings
config_file 'config.yml'

# allows us to store instagram access token in a cookie
enable :sessions

# enable CORDS
before do
   headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
   headers['Access-Control-Allow-Origin'] = 'http://localhost:9001'
   headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
   headers['Access-Control-Allow-Credentials'] = 'true'
end

# ensure authenticated
before do

  # whitelist authentication routes
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

#
# controllers
#

#
# authentication with instagram api
#

get "/" do
  redirect "/oauth/connect"
end

get "/oauth/connect" do
  redirect Instagram.authorize_url(:redirect_uri => settings.callback_url, :scope => 'relationships')
end

# TODO: make this a DELETE request
post "/oauth/disconnect" do
  session[:access_token] = nil
  redirect "/oauth/connect"
end

get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code], :redirect_uri => settings.callback_url)
  session[:access_token] = response.access_token
  # {:status => 200, :data => {:code => params[:code]}}.to_json
  redirect "http://localhost:9001/#/followers?code=#{params[:code]}"
end

get "/limits" do
  # response = @client.utils_raw_response
  # limit = response.haders[:x_ratelimit_limit]
  # {:limit => limit}.to_json
  # json @client.utils_raw_response
end

#
# instagram api proxies
#

get "/users/:id" do
  json @client.user("#{params[:id]}")
end

get "/users/:id/follows" do
  users = []

  response = @client.user_follows()
  users = users + response

  while response.pagination && response.pagination.next_cursor && users.count < 1000
    next_cursor = response.pagination.next_cursor
    response = @client.user_follows({:cursor => next_cursor})
    users = users + response
  end

  json users
end

get "/users/:id/followed_by" do
  users = []

  response = @client.user_follows()
  users = users + response

  while response.pagination && response.pagination.next_cursor && users.count < 1000
    next_cursor = response.pagination.next_cursor
    response = @client.user_followed_by({:cursor => next_cursor})
    users = users + response
  end

  json users
end

get "/users/:id/relationship" do
  json @client.user_relationship("#{params[:id]}")
end

post "/users/:id/follow" do
  json @client.follow_user("#{params[:id]}")
end

post "/users/:id/unfollow" do
  json @client.unfollow_user("#{params[:id]}")
end
