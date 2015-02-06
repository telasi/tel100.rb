/*
 * File: app/model/document/Motion.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.model.document.Motion', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.field.Date'
  ],

  fields: [
    {
      name: 'receiver'
    },
    {
      name: 'receiver_user'
    },
    {
      calculate: function(data) {
        var receiver = data.receiver;
        if (receiver) {
          return receiver.name || ( receiver.first_name + ' ' + receiver.last_name );
        }
      },
      name: 'receiverName'
    },
    {
      name: 'sender'
    },
    {
      name: 'sender_user'
    },
    {
      calculate: function(data) {
        var sender = data.sender;
        if (sender) {
          return sender.name || ( sender.first_name + ' ' + sender.last_name );
        }
      },
      name: 'senderName'
    },
    {
      type: 'date',
      name: 'due_date'
    },
    {
      type: 'date',
      name: 'created_at'
    },
    {
      type: 'date',
      name: 'updated_at'
    }
  ]
});