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
# helpers
#

helpers do
  def user_follows
    results = []

    response = @client.user_follows()
    results = results + response

    while response.pagination && response.pagination.next_cursor && results.count < settings.user_follows_max
      response = @client.user_follows({:cursor => response.pagination.next_cursor})
      results = results + response
    end

    results
  end

  def user_followed_by
    results = []

    response = @client.user_followed_by()
    results = results + response

    while response.pagination && response.pagination.next_cursor && results.count < settings.user_followed_by_max
      response = @client.user_followed_by({:cursor => response.pagination.next_cursor})
      results = results + response
    end

    results
  end

  def calculate_top_fans(options = {})
    friends_count = options.has_key?(:friends_count) ? options.friends_count : 5
    media_count = options.has_key?(:media_count) ? options.media_count : 5

    # TODO - interesting media to look available
    # media.likes
    # media.comments
    # media.users_in_photo
    # media.tags

    # get the users most recent instagram posts
    # TODO - ability to dig further
    # TODO - caching b/c lots of API calls made here

    medias = @client.user_recent_media({:count => media_count})

    # get users who have liked your photos

    media_likes_data = get_media_likes(medias)

    # get users who have commented on your photos

    media_comments_data = get_media_comments(medias)

    # TODO - define my algorithm for calculating a top fan

    # find the users that have liked the most photos

    # data = user_id_media_ids_hash.map {|user_id, liked_media_ids| [user_id, liked_media_ids]}

    # data_sorted = data.sort do |a, b|
    #   if a[1].count > b[1].count
    #     -1
    #   elsif a[1].count < b[1].count
    #     1
    #   else
    #     0
    #   end
    # end

    media_comments_data
  end

  private

  # get all users that have liked a photo
  def media_likes(media_id)
    results = []

    response = @client.media_likes(media_id)
    results = results + response

    while response.pagination && response.pagination.next_cursor && users.count < settings.media_likes_max
      response = @client.media_likes(media_id, {:cursor => response.pagination.next_cursor})
      results = results + response
    end

    results
  end

  # get all comments on a photo
  def media_comments(media_id)
    results = []

    response = @client.media_comments(media_id)
    results = results + response

    while response.pagination && response.pagination.next_cursor && users.count < settings.media_likes_max
      response = @client.media_comments(media_id, {:cursor => response.pagination.next_cursor})
      results = results + response
    end

    results
  end

  def get_media_likes(medias)
    user_id_media_ids_hash = {}

    medias.each do |media|
      media_id = media.id

      users = media_likes(media_id)
      users.each do |user|
        user_id_media_ids_hash[user.id] ||= []
        user_id_media_ids_hash[user.id].push(media_id)
      end
    end

    results = user_id_media_ids_hash.map do |user_id, media_ids|
      {:user_id => user_id, :media_likes => media_ids}
    end

    results
  end

  def get_media_comments(medias)
    user_id_media_ids_hash = {}

    medias.each do |media|
      media_id = media.id

      comments = media_comments(media_id)
      comments.each do |comment|
        user_id = comment.from.id

        user_id_media_ids_hash[user_id] ||= []
        user_id_media_ids_hash[user_id].push(media_id)
      end
    end

    results = user_id_media_ids_hash.map do |user_id, media_ids|
      {:user_id => user_id, :media_comments => media_ids}
    end

    results
  end
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
  # send user id to automatically start a client session
  redirect settings.client_url + "/#/login?self=#{response.user.id}"
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
  json user_follows
end

get "/users/:id/followed_by" do
  json user_followed_by
end

get "/users/:id/relationship" do
  json @client.user_relationship("#{params[:id]}")
end

get "/number_one_fan" do
  json calculate_top_fans
end

# Note: Instagram stopped follow/unfollow actions to the public

# post "/users/follow" do
#   # @client.follow_user("#{params[:id]}")
# end

# delete "/users/unfollow" do
#   @client.unfollow_user("#{params[:id]}")
# end
