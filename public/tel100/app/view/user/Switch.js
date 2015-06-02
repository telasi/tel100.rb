Ext.define('Tel100.view.user.switch.Dialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.userswitchdialog',

  controller: 'userswitchdialog',
  viewModel: {
    type: 'userswitchdialog'
  },

  width: 500,
  height: 300,
  layout: 'fit',
  padding: 5,
  bind: {
    title: '{i18n.user.ui.switch}'
  },

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    padding: 3,
    items: [{
      xtype: 'textfield',
      flex: 1,
      enableKeyEvents: true,
      emptyText: 'search by username...',
      listeners: {
        keyup: function(field) {
          var grid = field.up('userswitchdialog').down('grid');
          var filters = grid.store.getFilters();
          if (field.value) {
            field.nameFilter = filters.add({
              id            : 'nameFilter',
              property      : 'username',
              value         : field.value,
              anyMatch      : true,
              caseSensitive : false
            });
          } else {
            filters.remove(field.nameFilter);
            field.nameFilter = null;
          }
        },
        buffer: 500
      }
    }]
  }],

  items: [{
    xtype: 'grid',
    border: false,
    hideHeaders: true,
    columns: [{
      sortable: false,
      hideable: false,
      flex: 1,
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return [
          '<code>' + record.get('username') + '</code> ',
          record.get('full_name')
        ].join('');
      }
    }],

    bind: {
      store: '{users}'
    },

    features: [{
      ftype: 'grouping',
      groupByText: 'role',
      groupHeaderTpl: Ext.create('Ext.XTemplate', '{name:this.formatName}', {
        formatName: function(name) {
          return i18n.user.roles[name];
        }
      })
    }],

    listeners: {
      'itemdblclick': 'onSwitchSelected'
    }
  }]
});

Ext.define('Tel100.view.user.switch.DialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.userswitchdialog',

  stores: {
    users: {
      autoLoad: true,
      model: 'Tel100.model.User',
      fields: [ 'id', 'role', 'email', 'mobile', 'phone', 'username', 'first_name', 'last_name' ],
      groupField: 'role',
      proxy: {
        type: 'ajax',
        url: '/api/user/related',
        reader: {
          type: 'json'
        }
      }
    }
  }
});

Ext.define('Tel100.view.user.switch.DialogViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.userswitchdialog',

  onSwitchSelected: function(grid, record, item, index, e, eOpts) {
    grid.up('userswitchdialog').fireEvent('switchuser', record);
  }
});
