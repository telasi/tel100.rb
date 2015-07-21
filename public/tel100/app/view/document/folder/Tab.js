Ext.define('Tel100.view.document.folder.Tab', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.documentfoldertab',

  controller: 'documentfoldertab',
  viewModel: {
    type: 'documentfoldertab'
  },

  header: false,
  activeTab: 0,
  defaultListenerScope: true,

  items: [{
    xtype: 'panel',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },

    bind: {
      title: '{i18n.document.folder.ui.folders}'
    },

    items: [{
      xtype: 'gridpanel',
      border: false,
      itemId: 'standardFolders',
      enableColumnHide: false,
      enableColumnMove: false,
      enableColumnResize: false,
      hideHeaders: true,
      sortableColumns: false,
      bind: {
        store: '{standardfolders}'
      },
      columns: [{
        xtype: 'gridcolumn',
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
          var s;
          if(record.data.parent_id){
            s = '<span style="float: left; margin-left: 20px;">' + record.data.icon + ' ' + value + '</span>';
          } else {
            s = record.data.icon + ' ' + value;
          }

          return s + '<span style="float:right;">' + record.data.count + '</span>';
        },
        sortable: false,
        dataIndex: 'name',
        flex: 1,
        bind: {
          text: '{i18n.document.folder.categories.a}'
        }
      }],
      selModel: {
        selType: 'rowmodel',
        allowDeselect: true,
        mode: 'SINGLE'
      },
      listeners: {
        itemclick: {
          fn: 'onStandardGridpanelSelect',
          scope: 'controller'
        }
      },
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
          xtype: 'button',
          text: '<i class="fa fa-refresh"></i>',
          listeners: {
            click: {
              fn: 'onRefreshFolderButtonClick',
              scope: 'controller'
            }
          }
        }, {
          xtype: 'tbfill'
        }, {
          xtype: 'tbseparator'
        }, {
          xtype: 'button',
          text: '<span class="text-muted"><i class="fa fa-cog"></i></span>',
          listeners: {
            click: 'onSetupFoldersButtonClick'
          }
        }]
      }]
    }, {
      xtype: 'gridpanel',
      flex: 1,
      border: false,
      itemId: 'customFolders',
      header: false,
      title: 'TEST',
      store: 'CustomFolders',
      columns: [{
        xtype: 'gridcolumn',
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
          var s = ( record.get('folder_type') === 0 ? '<span style="float:right;">' + record.data.count + '</span>' : "");
          return helpers.api.folders.folderDecoration(record.get('folder_type'), record.get('name')) + s;
        },
        enableColumnHide: false,
        sortable: false,
        dataIndex: 'name',
        hideable: false,
        tdCls: 'foldercls',
        flex: 1,
        bind: {
          text: '{i18n.document.folder.categories.b}'
        }
      }],
      listeners: {
        afterrender: {
          fn: 'onGridpanelAfterRender',
          scope: 'controller'
        },
        select: {
          fn: 'onCustomFoldersSelect',
          scope: 'controller'
        },
        beforerender: {
          fn: 'onCustomFoldersBeforeRender',
          scope: 'controller'
        }
      }
    }, {
      xtype: 'gridpanel',
      border: false,
      hidden: true,
      collapsible: true,
      hideHeaders: true,
      bind: {
        title: '{i18n.vacation.ui.grid_title}',
        store: '{substitudeStore}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'name',
          flex: 1
        }
      ],
      listeners: {
        cellclick: {
          fn: 'onGridpanelCellClick',
          scope: 'controller'
        }
      }
    }]
  }, {
    xtype: 'documentfoldersearch',
    bind: {
      title: '{i18n.document.search.ui.search}'
    }
  }],

  listeners: {
    afterrender: 'onTabpanelAfterRender',
    documentgridrefresh: {
      fn: 'onDocumentGridRefresh',
      scope: 'controller'
    }
  },

  onSetupFoldersButtonClick: function(button, e, eOpts) {
    var configwindow = Ext.create('Tel100.view.document.folder.Config');
    configwindow.show();
  },

  onTabpanelAfterRender: function(component, eOpts) {
    /* var bar = component.tabBar;
      bar.insert(2,[
           {
               xtype: 'component',
               flex: 1
           },
          {
              xtype: 'button',
              text: '<i class="fa fa-cog"></i>',
            handler: function(button){
              var configwindow = Ext.create('Tel100.view.document.folder.Config');
              configwindow.show();
            }
          }
      ]);
      */
  },

  refresh: function() {
    this.getController().foldersRefresh();
  },

  standardFolderWasLoaded: false,

  onStandardFoldersLoaded: function(store, records, successful, eOpts) {
    if (!this.standardFolderWasLoaded) {
      this.standardFolderWasLoaded = true;
      var selection = records.filter(function(x) { return x.id === 7; })[0];
      var grid = this.down('gridpanel');
      grid.setSelection(selection);
      this.getController().onStandardGridpanelSelect(grid, selection);
    }
  },
});
