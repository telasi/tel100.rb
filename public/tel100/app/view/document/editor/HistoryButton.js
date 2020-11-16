Ext.define('Tel100.view.document.editor.HistoryButton', {
  extend: 'Ext.button.Split',
  alias: 'widget.historybutton',

  controller: 'historybutton',
  viewModel: {
    type: 'historybutton'
  },

  bind: {
    text: '{buttontext}'
  },

  listeners: {
    click: {
      fn: 'onShowHistoryClick',
      scope: 'controller'
    }
  },

  loadMask : true,

  menu: {
    xtype: 'menu',
    id: 'historyButtonId',
    items: [{
      xtype: 'menuitem',
      id: 'currentId',
      bind: {
        text: '{i18n.document.base.ui.actual_version}'
      },
      listeners: {
        click: 'onCurrent'
      }
    },
    {
      xtype: 'menuseparator'
    }
    ]
  },

  refresh: function() {
    this.getViewModel().getStore('changes').load();
  },

  initComponent: function() {
    this.callParent();

    var view = this;
    view.setLoading(true);
    // var loadingMask = 
  },
});

Ext.define('Tel100.view.document.editor.HistoryButtonViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.historybutton',

  onShowHistoryClick: function(){
    var vm = this.getViewModel();
    var document = vm.get('document');

    var historyWindow = Ext.create('Tel100.view.document.history.Window', {
      title: 'History',
      viewModel: {
        data: {
          document: document
        }
      }
    });
    historyWindow.show();
  },

  formHistoryItemText: function(item){
    return '<span style="color:red;">' + item.name + ' | ' + item.created_at_f + '</span>';
  },

  onCurrent: function(item, e, eOpts) {
    this.getView().setText(i18n.document.base.ui.history);
    this.reloadDoc(null);
  },

  onSwitch: function(item, e, eOpts) {
    var change_no = item.value.id;
    this.getView().setText(this.formHistoryItemText(item.value));
    this.reloadDoc(change_no);
  },

  reloadDoc: function(change_no){
    this.getViewModel().set('change_no', change_no);
    var doc = this.getViewModel().get('document');
    doc.getProxy().setExtraParam('change_no', change_no);
    var view = this.getView().up('documenteditoreditor');
    view.setLoading(true);
    doc.load({callback: function() {
        view.setLoading(false);

        var assigneesPanel = view.down('documentmotionsreceiverspanel');
        var commentsPanel = view.down('documentcommentpanel');
        var treePanel = view.down('documentmotionstree');
        var filesPanel = view.down('documentfilepanel');

        assigneesPanel.getStore().getProxy().setExtraParam('change_no', change_no);
        commentsPanel.getViewModel().getStore('comments').getProxy().setExtraParams({change_no: change_no});
        treePanel.getStore().getProxy().setExtraParam('change_no', change_no);
        filesPanel.getViewModel().getStore('files').getProxy().setExtraParam('change_no', change_no);

        assigneesPanel.refresh();
        commentsPanel.refresh();
        treePanel.refresh();
        filesPanel.refresh();
      }
    });
  },

  onStoreLoad: function(store, records, successful, eOpts){
    var menu = this.getView().getMenu('historyButtonId');
    menu.items.each(function(item){ 
      if(item.id != 'currentId') item.destroy(); 
    });
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var item =  new Ext.menu.Item({
            text: this.formHistoryItemText(record.data),
            value: record.data,
            handler: function(item){
              this.onSwitch(item);
            }.bind(this)
      });
      menu.add(item);
    }
  }
});

Ext.define('Tel100.view.document.editor.HistoryButtonViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.historybutton',

  formulas: {
    buttontext: function(get) {
      var change = get('change_no');
      if(!change) return 'current';
      return '<span style="color:#fcc;">asasa</span>';
    }
  },

  stores: {
    changes: {
      autoLoad: true,
      model: 'Tel100.model.document.Change',
      proxy: {
        type: 'ajax',
        extraParams: {
          id: '{document.id}'
        },
        url: '/api/documents/changes',
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
