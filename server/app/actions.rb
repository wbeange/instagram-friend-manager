# TODO - break this up into a nice app file structure

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
  halt 401, 'please authenticate' if session[:access_token] == nil || session[:user_id] == nil
end

# init ruby instagram api
before do
  Instagram.configure do |config|
    config.client_id = settings.client_id
    config.client_secret = settings.client_secret
    config.scope = 'relationships'
    config.redirect_uri = settings.callback_url
    # config.sign_requests = true
  end

  @client = Instagram.client(:access_token => session[:access_token])
end

# init redis caching layer
before do
  @redis = Redis.new(:url => settings.redis_url)
end

#
# helpers
#

helpers do
  def user_redis_key(user_id)
    redis_key("_user_#{user_id}")
  end

  def user_recent_media_redis_key(user_id, page_number, page_size)
    redis_key("_user_recent_media_#{user_id}_#{page_number}_#{page_size}")
  end

  def media_likes_redis_key(media_id)
    redis_key("_media_likes_#{media_id}")
  end

  def media_comments_redis_key(media_id)
    redis_key("_media_comments_#{media_id}")
  end

  def redis_key(val=nil)
    # generate redis key off request path
    if val
      "ifm#{val}"
    else
      "ifm#{request.path_info.gsub('/', '_')}"
    end
  end

  def get_user(user_id)
    redis_key = user_redis_key(user_id)
    user = @redis.get(redis_key)

    if !user
      begin
        user = @client.user(user_id).to_json
        @redis.setex(redis_key, (60*60), user)
      rescue Instagram::BadRequest => e
        halt 403, 'private instagram account' and return
      end
    end

    user = JSON.parse(user)

    user
  end

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
    user_id = options[:user_id]
    page_size = options.has_key?(:page_size) ? options.page_size : 25
    page_number = options.has_key?(:page_number) ? options.page_number : 1
    results_count = options.has_key?(:results_count) ? options.results_count : 25

    # TODO - interesting media to look available
    # media.likes
    # media.comments
    # media.users_in_photo
    # media.tags

    # get the users most recent instagram posts
    # TODO - ability to dig further

    medias = get_medias(user_id, page_number, page_size)

    # get users who have liked your photos

    media_likes_data = get_media_likes(medias)

    # get users who have commented on your photos

    media_comments_data = get_media_comments(medias)

    # run top friends algorithm

    user_id_scores_hash = get_user_scores(media_likes_data, media_comments_data)

    # build return data

    results = build_top_fan_results(media_likes_data, media_comments_data, user_id_scores_hash, results_count)

    results
  end

  private

  # get the user's posted photos
  def get_medias(user_id, page_number, page_size)
    redis_key = user_recent_media_redis_key(user_id, page_number, page_size)
    medias = @redis.get(redis_key)

    if !medias
      medias = @client.user_recent_media({:count => page_size}).to_json
      @redis.setex(redis_key, (60*5), medias)
    end

    medias = JSON.parse(medias)

    medias
  end

  # get all users that have liked a photo
  def media_likes(media_id)
    redis_key = media_likes_redis_key(media_id)
    results = @redis.get(redis_key)

    if !results
      results = []

      response = @client.media_likes(media_id)
      results = results + response

      while response.pagination && response.pagination.next_cursor && users.count < settings.media_likes_max
        response = @client.media_likes(media_id, {:cursor => response.pagination.next_cursor})
        results = results + response
      end

      results = results.to_json

      @redis.setex(redis_key, (60*60), results)
    end

    results = JSON.parse(results)

    results
  end

  # get all comments on a photo
  def media_comments(media_id)
    redis_key = media_comments_redis_key(media_id)
    results = @redis.get(redis_key)

    if !results
      results = []

      response = @client.media_comments(media_id)
      results = results + response

      while response.pagination && response.pagination.next_cursor && users.count < settings.media_likes_max
        response = @client.media_comments(media_id, {:cursor => response.pagination.next_cursor})
        results = results + response
      end

      results = results.to_json

      @redis.setex(redis_key, (60*60), results)
    end

    results = JSON.parse(results)

    results
  end

  def get_media_likes(medias)
    user_id_media_ids_hash = {}

    medias.each do |media|
      media_id = media['id']

      users = media_likes(media_id)
      users.each do |user|
        user_id_media_ids_hash[user['id']] ||= []
        user_id_media_ids_hash[user['id']].push(media_id)
      end
    end

    user_id_media_ids_hash
  end

  def get_media_comments(medias)
    user_id_media_ids_hash = {}

    medias.each do |media|
      media_id = media['id']

      comments = media_comments(media_id)
      comments.each do |comment|
        user_id = comment['from']['id']

        user_id_media_ids_hash[user_id] ||= []
        user_id_media_ids_hash[user_id].push(media_id)
      end
    end

    user_id_media_ids_hash
  end

  # TODO - define my algorithm for calculating a top fan
  def get_user_scores(media_likes_data, media_comments_data)
    score_weight_like = 1
    score_weight_comment = 2

    user_id_scores_hash = {}

    media_likes_data.each do |user_id, media_ids|
      user_id_scores_hash[user_id] ||= 0
      user_id_scores_hash[user_id] += ( media_ids.count * score_weight_like )
    end

    media_comments_data.each do |user_id, media_ids|
      user_id_scores_hash[user_id] ||= 0
      user_id_scores_hash[user_id] += ( media_ids.count * score_weight_comment )
    end

    user_id_scores_hash
  end

  def build_top_fan_results(media_likes_data, media_comments_data, user_id_scores_hash, results_count)

    # find highest scores

    data = user_id_scores_hash.map {|user_id, score| [user_id, score]}

    data_sorted = data.sort do |a, b|
      if a[1] > b[1]
        -1
      elsif a[1] < b[1]
        1
      else
        0
      end
    end

    # build the results

    results = data_sorted[0..results_count-1].map do |item|
      user_id = item[0]

      user = get_user(user_id)

      result = {
        :user => user,
        :media_likes => media_likes_data[user_id],
        :media_comments => media_comments_data[user_id]
      }

      result
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
  session[:user_id] = nil
end

get "/oauth/callback" do
  response = Instagram.get_access_token(params[:code])
  session[:access_token] = response.access_token
  session[:user_id] = response.user.id

  # redirect back to the client
  # send user id to automatically start a client session
  redirect settings.client_url + "/#/login?self=#{response.user.id}"
end

get "/limits" do
  response = @client.utils_raw_response

  data = {
    :remaining => response['X-Ratelimit-Remaining'],
    :limit => response['X-Ratelimit-Limit']
  }

  content_type :json
  data.to_json
end

#
# instagram api proxies
#

get "/users/:id" do
  user_id = params[:id]

  # TODO - how to handle 'self' from client but cache by user_id in order to avoid clashes?
  user_id = session[:user_id] if user_id == 'self'

  json get_user(user_id)
end

get "/users/:id/follows" do
  json user_follows
end

get "/users/:id/followed_by" do
  json user_followed_by
end

get "/users/:id/relationship" do
  user_id = params[:id]
  json @client.user_relationship(user_id)
end

get "/number_one_fan" do
  options = {:user_id => session[:user_id]}
  json calculate_top_fans(options)
end

# Note: Instagram stopped follow/unfollow actions to the public

# post "/users/follow" do
#   # @client.follow_user("#{params[:id]}")
# end

# delete "/users/unfollow" do
#   @client.unfollow_user("#{params[:id]}")
# end
