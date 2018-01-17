Ext.define('Tel100.model.Setting', {
  extend: 'Ext.data.Model',

  fields: [
     'notif_mail',
     'notif_sms'
  ],

  proxy: {
    type: 'rest',
    url: '/api/user/settings'
  }
});