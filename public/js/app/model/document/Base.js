Ext.define('Telasi.model.document.Base', {
  extend: 'Telasi.model.Base',
  requires: [
    'Telasi.model.Base',
    'Telasi.model.document.Motion'
  ],

  fields: [
    { name: 'id', type: 'int' },
    { name: 'language' },
    { name: 'typeId', type: 'int' },
    { name: 'pageCount', type: 'int' },
    { name: 'additionsCount', type: 'int' },
    { name: 'direction' },
    { name: 'subject' },
    { name: 'body', mapping: 'text.body' },
    { name: 'docnumber' },
    { name: 'docdate', type: 'date' },
    { name: 'due_date', type: 'date' },
    { name: 'original_date', type: 'date' },
    { name: 'original_number' },
    { name: 'alarm_date', type: 'date' },
    { name: 'status' },
    { name: 'senderUserId', type: 'int' },
    { name: 'senderId', type: 'int' },
    { name: 'senderType' },
    { name: 'ownerUserId', type: 'int' },
    { name: 'ownerId', type: 'int' },
    { name: 'ownerType' },
  ],

  proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            typeProperty: 'mtype'
        },
        url: 'api/docs/documents/show/'
  },

  idProperty: 'id'

});
