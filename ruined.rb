require 'sinatra'
require 'data_mapper'
require 'json'

enable :sessions

helpers do

  def protected!
    unless authorized?
      response['WWW-Authenticate'] = %(Basic realm="Restricted Area")
      throw(:halt, [401, "Not authorized\n"])
    end
  end

  def authorized?
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == ['admin', 'admin']
  end

end

DataMapper.setup(:default, ENV['HEROKU_POSTGRESQL_COPPER_URL'] || "sqlite://#{Dir.pwd}/ruined.db")



class Item
  include DataMapper::Resource
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

DataMapper.finalize
DataMapper.auto_upgrade!

json = File.read('db/seed.json')
@items = JSON.parse(json)

if Item.count == 1
	@items.each do |attr_name, attr_value|
		qualities = Array.new
		awfulnesses = Array.new

		unless attr_value["Tag"]["quality"].nil?
			qualities.push attr_value["Tag"]["quality"];
		end
		unless attr_value["Tag"]["fans"].nil?
			awfulnesses.push attr_value["Tag"]["fans"];
		end
		unless attr_value["David"]["quality"].nil?
			qualities.push attr_value["David"]["quality"];
		end
		unless attr_value["David"]["fans"].nil?
			awfulnesses.push attr_value["David"]["fans"];
		end
		unless attr_value["Joe"]["quality"].nil?
			qualities.push attr_value["Joe"]["quality"];
		end
		unless attr_value["Joe"]["fans"].nil?
			awfulnesses.push attr_value["Joe"]["fans"];
		end

		averageQuality = (qualities.inject{ |sum, el| sum + el }.to_f / qualities.size).round(2)
		averageFanAwfulness = (awfulnesses.inject{ |sum, el| sum + el }.to_f / awfulnesses.size).round(2)
		finalQuality = (averageQuality - averageFanAwfulness).round(2)
		degreeOfRuin = ((finalQuality / averageQuality)*100)
		levelOfTragedy = (averageQuality*5) + ((100-degreeOfRuin)/22)

		item = Item.first_or_create({ 
			:name 						=> 	attr_name,
			:joeQuality 				=>	attr_value["Joe"]["quality"],
			:joeFans					=>	attr_value["Joe"]["fans"],
			:davidQuality 				=>	attr_value["David"]["quality"],
			:davidFans					=>	attr_value["David"]["fans"],
			:tagQuality					=>	attr_value["Tag"]["quality"],
			:tagFans					=>	attr_value["Tag"]["fans"],
			:averageQuality				=>	averageQuality,
			:averageFanAwfulness		=> 	averageFanAwfulness,
			:finalQuality				=>	finalQuality,
			:levelOfTragedy				=>	levelOfTragedy.round(2),
			:degreeOfRuin				=>	(100-degreeOfRuin).round(2),
			:created_at					=> 	Time.now
		})
	end
end


get '/' do
	@items = Item.all
	erb :index
end

get '/data' do
	Item.all.to_json
end

get '/admin' do
  protected!
  "Welcome, authenticated client"
end

