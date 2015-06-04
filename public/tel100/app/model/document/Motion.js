Ext.define('Tel100.model.document.Motion', {
  extend: 'Ext.data.Model',
  schema: 'tel100',

  fields: [{
    name: 'receiver'
  }, {
    name: 'receiver_user'
  }, {
    calculate: function(data) {
      var receiver = data.receiver;
      if (receiver) {
        return receiver.name || ( receiver.first_name + ' ' + receiver.last_name );
      }
    },
    name: 'receiverName'
  }, {
    name: 'sender'
  }, {
    name: 'sender_user'
  }, {
    calculate: function(data) {
      var sender = data.sender;
      if (typeof sender === 'string') {
        return sender;
      } else if (sender) {
        return sender.name || ( sender.first_name + ' ' + sender.last_name );
      }
    },
    name: 'senderName'
  }, {
    type: 'date',
    name: 'due_date'
  }, {
    type: 'date',
    name: 'created_at'
  }, {
    type: 'date',
    name: 'sent_at'
  }, {
    type: 'date',
    name: 'received_at'
  }, {
    type: 'date',
    name: 'completed_at'
  }, {
    type: 'date',
    name: 'updated_at'
  }, {
    name: 'status'
  }, {
    calculate: function(data) {
      return helpers.document.status.motionStatusFull(data.status, data);
    },
    name: 'statusFull'
  }, {
    type: 'boolean',
    name: 'deleted'
  }, {
    calculate: function(data){
      return data.deleted;
    },
    name: 'isDeleted'
  }],

  proxy: {
    type: 'rest',
    url: '/api/documents/motion'
  }
});
