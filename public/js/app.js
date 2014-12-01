// declare global object

window.Telasi = {
  statuses: {
    canceled: -2,
    not_sent: -1,
    draft: 0,
    current: 1,
    completed: 2
  },

  errorDialog: function(err) {
    Ext.MessageBox.show({
      title: 'შეცდომა',
      msg: err,
      buttons: Ext.MessageBox.OK,
      icon: Ext.window.MessageBox.ERROR
    });
  }
};

// setting default format

Ext.Date.defaultFormat = 'd/m/Y';

// starting application

Ext.application({
  name: 'Telasi',
  paths  : { 'Telasi' : '/js/app' },

  globals: {
  	locale: 'ka'
  },

  controllers: [
    'Main'
  ]
});
