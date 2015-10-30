require 'rubygems'
require 'bundler/setup'

require 'active_support/all'

# Load Sinatra Framework
require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/contrib/all' # Requires cookies, among other things

require 'pry' if development?

require 'redis'
require 'instagram'

APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))
APP_NAME = APP_ROOT.basename.to_s

# Sinatra configuration
configure do
  set :root, APP_ROOT.to_path
  set :server, :puma

  enable :sessions
  set :session_secret, ENV['SESSION_KEY'] || 'instagramfriendmanager'

  config_file 'config.yml'
end

# Load the routes / actions
require APP_ROOT.join('app', 'actions')
