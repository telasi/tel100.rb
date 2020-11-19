var FAYE_ADDRESS = "http://1.1.2.65:9292/faye";

var events = {};

var callback = function(data){
	events[data.type]();
};

var subscribe = function(username) {
  if(typeof Faye !== "undefined"){
	  var client = new Faye.Client(FAYE_ADDRESS);
	  var private_subscription = client.subscribe('/messages/private/' + username, function(data){
	 	events[data.type]();
	  });
  };
};

var addEvent = function(notif_event){
	events[notif_event.type] = notif_event.callback;
};

var getEvents = function(){
	return events;
};

module.exports = {
  subscribe: subscribe,
  addEvent : addEvent,
  getEvents: getEvents
};