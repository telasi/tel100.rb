Ext.define('Tel100.view.document.comment.Panel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentcommentpanel',

  viewModel: {
    type: 'documentcommentpanel'
  },
  layout: 'fit',
  defaultListenerScope: true,

  bind: {
    title: '{i18n.document.comment.panelTitle} ({commentCount})'
  },

  tools: [{
    xtype: 'tool',
    type: 'refresh',
    listeners: {
      click: 'onToolClick'
    }
  }],

  items: [{
    xtype: 'gridpanel',
    hideHeaders: true,
    bind: {
      store: '{comments}'
    },
    columns: [{
      xtype: 'gridcolumn',
      renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var partyLink = helpers.party.partyLink;

        var text = record.get('text');
        if (text) {
          text = '<p class="text-muted" style="white-space:normal;margin: 4px 0;">' + text + '</p>'
        }

        var sender = ' <strong>' + partyLink(record.get('user_id'), 'Sys::User', record.get('user')) + '</strong>';
        if (record.get('actual_user_id')) {
          var actualUser = partyLink(record.get('actual_user_id'), 'Sys::User', record.get('actual_user'));
          sender += ' (' + actualUser + ')';
        }

        return [
          '<p style="margin:0;">', statusIcon(), sender,
          ', <span class="text-muted">', Ext.Date.format(record.get('created_at'),'d/m/Y H:i'), '</span></p>',
          text
        ].join('');

        function statusIcon() {
          var new_status = record.get('status');
          var old_status = record.get('old_status');
          if (new_status === old_status) {
            return '<i class="fa fa-comment text-muted"></i>';
          } else if (new_status > old_status) {
            return '<i class="fa fa-check"></i>';
          } else {
            return '<i class="fa fa-times"></i>';
          }
        }
      },
      flex: 1,
      sortable: false,
      hidable: false
    }],
    viewConfig: {
      getRowClass: function(record, rowIndex, rowParams, store) {
        var new_status = record.get('status');
        var old_status = record.get('old_status');
        if (new_status === old_status) {
          return '';
        } else if (new_status > old_status) {
          return 'text-success';
        } else {
          return 'text-danger';
        }
      }
    }
  }],

  onToolClick: function(tool, e, owner, eOpts) {
    this.refresh();
  },

  refresh: function(callback) {
    this.down('gridpanel').getStore().load({
      scope: this,
      callback: callback
    });
  },

  onStoreLoad: function(store, records, successful, eOpts) {
    var vm = this.getViewModel();
    vm.set('commentCount', store.count());
  }
});

Ext.define('Tel100.view.document.comment.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.documentcommentpanel',

  data: {
    commentCount: 0
  },

  stores: {
    comments: {
      autoLoad: true,
      model: 'Tel100.model.document.Comment',
      proxy: {
        type: 'ajax',
        extraParams: {
          document_id: '{document.id}'
        },
        url: '/api/documents/comments',
        reader: {
          type: 'json'
        }
      },
      listeners: {
        load: 'onStoreLoad'
      }
    }
  }
});
