require 'sinatra'
require 'data_mapper'
require 'json'

enable :sessions

# DataMapper.setup(:default, ENV['HEROKU_POSTGRESQL_COPPER_URL'] || "sqlite://#{Dir.pwd}/ruined.db")



class Item
  # include DataMapper::Resource
  property :id, 						Serial
  property :name, 						String, 	:required => true
  property :joeQuality, 				Float
  property :joeFans, 					Float
  property :davidQuality, 				Float
  property :davidFans,	 				Float
  property :tagQuality, 				Float
  property :tagFans, 					Float
  property :averageQuality,				Float,		:required => true
  property :averageFanAwfulness,		Float,		:required => true
  property :finalQuality, 				Float,		:required => true
  property :levelOfTragedy,				Float,		:required => true
  property :degreeOfRuin,				Float,		:required => true 	
  property :created_at, 				DateTime,	:required => true
end

# DataMapper.finalize.auto_upgrade!

json = File.read('db/seed.json')
@items = JSON.parse(json)


get '/' do
	@items = Item.all
	erb :index
end

get '/data' do
	Item.all.to_json
end