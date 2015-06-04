Ext.define('Tel100.view.Main', {
  extend: 'Ext.container.Viewport',
  alias: 'widget.main',

  controller: 'main',
  viewModel: {
    type: 'main'
  },

  itemId: 'main-viewport',

  layout: {
    type: 'card',
    deferredRender: true
  },

  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    items: [{
      xtype: 'panel',
      html: '<img src="/images/tel100_withmargin.png" height="100" width="289"></img>'
    }, {
      xtype: 'userloginpanel',
      itemId: 'login',
      listeners: {
        loggedin: 'onLoggedin'
      }
    }, {
      xtype: 'workarealocaleselector',
      margin: 8
    }]
  }, {
    xtype: 'workareapanel',
    itemId: 'workarea'
  }],

  listeners: {
    beforerender: 'onBeforeRender'
  }
});
