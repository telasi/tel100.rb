Ext.define('Tel100.view.document.editor.PrintButton', {
  extend: 'Ext.button.Split',
  alias: 'widget.documenteditorprintbutton',
  defaultListenerScope: true,

  bind: {
    text: '{i18n.ui.print}'
  },

  listeners: {
    beforerender: 'componentAboutToRender',
    click: 'printDocument'
  },

  menu: [{
    xtype: 'menucheckitem',
    bind: {
      text: '{i18n.ui.printParams.subject}'
    },
    itemId: 'subject',
    listeners: {
      checkchange: 'menuCheckChanged'
    }
  }, {
    xtype: 'menucheckitem',
    bind: {
      text: '{i18n.ui.printParams.signature}'
    },
    itemId: 'signature',
    listeners: {
      checkchange: 'menuCheckChanged'
    }
  }, {
    xtype: 'menucheckitem',
    bind: {
      text: '{i18n.ui.printParams.assignees}'
    },
    itemId: 'assignees',
    listeners: {
      checkchange: 'menuCheckChanged'
    }
  }, {
    xtype: 'menucheckitem',
    bind: {
      text: '{i18n.ui.printParams.author}'
    },
    itemId: 'author',
    listeners: {
      checkchange: 'menuCheckChanged'
    }
  }],

  componentAboutToRender: function(menu, eOpts) {
    var buttonIds = ['subject','signature','assignees','author'];
    for (var i = 0; i < buttonIds.length; i++) {
      var buttonId = buttonIds[i];
      var button = this.down('#' + buttonId);
      button.setChecked(helpers.preferences.getValue("print.document." + buttonId, false) === 'true');
    }
  },

  menuCheckChanged: function(item, checked, eOpts) {
    var prefKey = "print.document." + item.itemId;
    helpers.preferences.setValue(prefKey, checked);
  },

  printDocument: function() {
    var params = {};
    var buttonIds = ['subject','signature','assignees','author'];
    for (var i = 0; i < buttonIds.length; i++) {
      var buttonId = buttonIds[i];
      var button = this.down('#' + buttonId);
      params[buttonId] = helpers.preferences.getValue("print.document." + buttonId, false) === 'true';
    }
    this.fireEvent('print', params);
  }
});
