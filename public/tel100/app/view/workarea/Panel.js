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
      items: [
        { itemId: 'tel100',     text: 'teldoc' },
        { itemId: 'hr',         text: 'hr'     },
        { itemId: 'eflow',      text: 'eflow'  },
        { itemId: 'reporting',  text: 'reporting'  },
        { itemId: 'admin',      text: 'admin', bind: { hidden: '{hideAdmin}' } }
      ],

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
    items: [
      { xtype: 'modulesdocuments', itemId: 'tel100' },
      { xtype: 'moduleseflow',     itemId: 'eflow' },
      { xtype: 'moduleshr',        itemId: 'hr' },
      { xtype: 'modulesreporting', itemId: 'reporting' },
      { xtype: 'modulesadmin',     itemId: 'admin' }
    ]
  }],

  listeners: {
    beforerender: 'onBeforeRender'
  }
});

Ext.define('Tel100.view.workarea.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.workareapanel',

  setCurrentApplication: function(name, opts) {
    if (opts && opts.toggleButton) {
      var view = this.getView();
      var applicationButton = view.down('#' + name);
      if (!applicationButton) {
        applicationButton = view.down('#tel100');
        name = 'tel100';
      }
      applicationButton.toggle();
    }
    if (opts && opts.switchApplication) {
      var modulesContainer = this.getView().down('#body-layout');
      modulesContainer.setActiveItem(name);
    }
    helpers.preferences.setValue('current-application', name);
  },

  onToggle: function(segmentedbutton, button, isPressed, eOpts) {
    this.setCurrentApplication(button.itemId, { switchApplication: true });
  },

  onBeforeRender: function(component, eOpts) {
    var currApplication = helpers.preferences.getValue('current-application', 'docs');
    this.setCurrentApplication(currApplication, { toggleButton: true, switchApplication: true });
  }
});

Ext.define('Tel100.view.workarea.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.workareapanel',

  formulas: {
    hideAdmin: function(get) {
      var currentUser = get('currentUser');
      return currentUser.get('is_admin') !== 1;
    }
  }
});
