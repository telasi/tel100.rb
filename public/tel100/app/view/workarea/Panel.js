Ext.define('Tel100.view.workarea.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.workareapanel',

  controller: 'workareapanel',

  viewModel: {
    type: 'workareapanel'
  },

  border: false,
  layout: 'border',

  items: [{
    xtype: 'container',
    region: 'north',
    padding: 4,
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'segmentedbutton',
      items: [{
        itemId: 'docs',
        text: 'docs'
      }, {
        itemId: 'hr',
        text: 'hr'
      }, {
        itemId: 'admin',
        text: 'admin',
        bind: {
          hidden: '{hideAdmin}'
        }
      }],

      listeners: {
        toggle: 'onToggle'
      }
    }, {
      xtype: 'tbspacer',
      flex: 1
    }, {
      xtype: 'userboxbutton'
    }]
  }, {
    xtype: 'container',
    region: 'center',
    itemId: 'body-layout',
    layout: {
      type: 'card',
      deferredRender: true
    },
    items: [{
      xtype: 'modulesdocuments',
      border: 0,
      itemId: 'docs'
    },
    {
      xtype: 'moduleshr',
      itemId: 'hr'
    },
    {
      xtype: 'modulesadmin',
      itemId: 'admin'
    }]
  }],

  listeners: {
    beforerender: 'onBeforeRender'
  }
});
