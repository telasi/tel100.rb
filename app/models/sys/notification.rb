# -*- encoding : utf-8 -*-
require 'net/http'

class Sys::Notification
	PUBLIC = 'public'
	PRIVATE = 'private'

	MESSAGE_TYPE_NEWS = 'news'
	MESSAGE_TYPE_CHANGES = 'changes'
	MESSAGE_TYPE_HR = 'hr'

	MESSAGE_TYPES = [MESSAGE_TYPE_NEWS, MESSAGE_TYPE_HR]

	attr_accessor :channel
	attr_accessor :type
	attr_accessor :message

	def initialize(channel)
	  self.channel = channel
	end

	def notify(type, message)
		self.type ||= type 
		self.message ||= message
 		message = {:channel => '/messages/private/' + self.channel, :data => formed_message, :ext => {:auth_token => FAYE_TOKEN}}
 		uri = URI.parse(FAYE_SERVER)
 		Net::HTTP.post_form(uri, :message => message.to_json)
 	rescue
	end

	def self.send_news(user, message = nil)
		self.new(user.username).notify(MESSAGE_TYPE_NEWS, message)
	end

	def self.send_changes(user, message = nil)
		self.new(user.username).notify(MESSAGE_TYPE_CHANGES, message)
	end

	private 

	def formed_message
		{ type: self.type, message: self.message}
	end
end