Ext.define('Telasi.model.document.Base', {
  extend: 'Telasi.model.Base',
  requires: [
    'Telasi.model.Base',
    'Telasi.model.document.Motion'
  ],

  fields: [
    { name: 'my_status', type: 'int' },
    { name: 'is_read', type: 'int' },
    { name: 'id', type: 'int' },
    { name: 'language' },
    { name: 'parent_id', type: 'int' },
    { name: 'type_id', type: 'int' },
    { name: 'direction' },
    { name: 'subject' },
    // XXX { name: 'body' },
    { name: 'original_number' },
    { name: 'original_date', type: 'date' },
    { name: 'docnumber' },
    { name: 'docdate', type: 'date' },
    { name: 'docyear', type: 'int' },
    { name: 'page_count', type: 'int' },
    { name: 'additions_count', type: 'int' },
    { name: 'due_date', type: 'date' },
    { name: 'alarm_date', type: 'date' },
    { name: 'status', type: 'int' },
    { name: 'sender_user_id', type: 'int' },
    { name: 'sender_id', type: 'int' },
    { name: 'sender_type' },
    { name: 'owner_user_id', type: 'int' },
    { name: 'owner_id', type: 'int' },
    { name: 'ownerType' },
    { name: 'created_at', type: 'date' },
    { name: 'updated_at', type: 'date' },
    // XXX: experimental
    'statuses'
  ],

  proxy: {
    type: 'rest',
    reader: {
      type: 'json',
      typeProperty: 'mtype'
    },
    url: '/api/docs/show/'
  }
});
