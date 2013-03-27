# Gemfile
require "rubygems"
require "bundler/setup"
require "sinatra"
require "data_mapper"
require "json"
require "sqlite3"
require "dm-sqlite-adapter"
require './ruined'
 
run Sinatra::Application