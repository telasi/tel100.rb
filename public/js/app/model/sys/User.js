Ext.define('Telasi.model.sys.User', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'id', type: 'int' },
    { name: 'username', type: 'string' },
    { name: 'person_id', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'email_confirmed', type: 'boolean' },
    { name: 'mobile', type: 'string' },
    { name: 'mobile_confirmed', type: 'boolean' },
  ],
});
