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
