require 'sinatra'
require 'data_mapper'
require 'json'

enable :sessions

DataMapper.setup(:default, ENV['HEROKU_POSTGRESQL_COPPER_URL'] || "sqlite://#{Dir.pwd}/ruined.db")



get '/' do
	#@items = Item.all
	erb :index
end

get '/data' do
	#Item.all.to_json
end