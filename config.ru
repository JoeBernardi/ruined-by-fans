# Gemfile
require "rubygems"
require "bundler/setup"
require "sinatra"
require "data_mapper"
require "json"

set :run, false
set :raise_errors, true
 
run Sinatra::Application