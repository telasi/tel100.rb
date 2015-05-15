Ext.define('Tel100.view.user.switch.Dialog', {
  extend: 'Ext.window.Window',
  alias: 'widget.userswitchdialog',

  // controller: 'userswitchdialog',
  viewModel: {
    type: 'userswitchdialog'
  },

  width: 500,
  height: 300,
  layout: 'fit',
  bind: {
    title: '<i class="fa fa-user"></i> {i18n.user.switch}'
  },
  items: [{
    xtype: 'grid',
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
  }]
});

Ext.define('Tel100.view.user.switch.DialogViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.userswitchdialog',

  stores: {
    users: {
      autoLoad: true,
      model: 'Tel100.model.User',
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
