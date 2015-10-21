# Getting Started
# $ bundle install
# $ rerun app.rb
#
# or use bundle
# $ bundle exec ruby app.rb

require "sinatra"
require "sinatra/config_file"
require "sinatra/json"
require "instagram"
require "json"

# allows us to store instagram access token in a cookie
enable :sessions

# config file holds instagram app api settings
config_file 'config.yml'

# enable CORS
before do
   headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
   headers['Access-Control-Allow-Origin'] = settings.client_url
   headers['Access-Control-Allow-Headers'] = 'accept, authorization, origin'
   headers['Access-Control-Allow-Credentials'] = 'true'
end

# ensure authenticated
before do

  # whitelist authentication routes
  pass if request.path_info == "/oauth/connect"
  pass if request.path_info == "/oauth/disconnect"
  pass if request.path_info == "/oauth/callback"

  # tell client to logged in
  halt 401, 'please authenticate' if session[:access_token] == nil
end

before do
  # init ruby instagram api
  Instagram.configure do |config|
    config.client_id = settings.client_id
    config.client_secret = settings.client_secret
    config.scope = 'relationships'
    config.redirect_uri = settings.callback_url
    # config.sign_requests = true
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
  redirect Instagram.authorize_url
end

post "/oauth/disconnect" do
  session[:access_token] = nil
end

get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code])
  session[:access_token] = response.access_token

  # redirect back to the client
  redirect settings.client_url + "/#/login"
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

  response = @client.user_followed_by()
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

# get "/number_one_fan" do
#   media = @client.user_recent_media

#   # results = media.map do |pic|
#   #   {
#   #     "comments" => pic.comments,
#   #     "likes" => pic.likes,
#   #     "users_in_photo" => pic.users_in_photo
#   #   }
#   # end

#   media_ids = media.map { |pic| pic.id }
#   # media_ids = media_ids[0..4]
#   # user_id_likes_count_hash = Hash.new(0)


#   media_ids.each do |media_id|
#     users = @client.media_likes(media_id)
#     # user_ids = users.map { |user| user.id }
#     users.each { |user| user_id_likes_count_hash[user.id] += 1 }
#   end

#   user_id_highest = nil
#   user_id_likes_count_hash.each do |user_id, likes_count|

#     if user_id_highest == nil
#       user_id_highest = {:}
#     end

#   end

#   json user_id_likes_count_hash
# end

# post "/users/follow" do
#   # @client.follow_user("#{params[:id]}")
# end

# delete "/users/unfollow" do
#   @client.unfollow_user("#{params[:id]}")
# end
