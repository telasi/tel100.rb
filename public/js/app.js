// declare global object

window.Telasi = {
  statuses: {
    draft: 0,
    sent: 1,
    canceled: -1,
    completed: 2
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
