/*
 * File: app/view/document/folder/Tab.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Tel100.view.document.folder.Tab', {
  extend: 'Ext.tab.Panel',
  alias: 'widget.documentfoldertab',

  requires: [
    'Tel100.view.document.folder.TabViewModel',
    'Tel100.view.document.folder.TabViewController',
    'Tel100.view.document.folder.Search',
    'Ext.tab.Tab',
    'Ext.grid.Panel',
    'Ext.grid.column.Column',
    'Ext.grid.View',
    'Ext.selection.RowModel',
    'Ext.toolbar.Toolbar',
    'Ext.toolbar.Fill',
    'Ext.toolbar.Separator',
    'Ext.form.Panel'
  ],

  controller: 'documentfoldertab',
  viewModel: {
    type: 'documentfoldertab'
  },
  header: false,
  activeTab: 0,
  defaultListenerScope: true,

  items: [
    {
      xtype: 'panel',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      bind: {
        title: '{i18n.document.folder.ui.folders}'
      },
      items: [
        {
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
          columns: [
            {
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
            }
          ],
          selModel: {
            selType: 'rowmodel',
            allowDeselect: true,
            mode: 'SINGLE'
          },
          listeners: {
            select: {
              fn: 'onStandardGridpanelSelect',
              scope: 'controller'
            }
          },
          dockedItems: [
            {
              xtype: 'toolbar',
              dock: 'top',
              items: [
                {
                  xtype: 'button',
                  text: '<i class="fa fa-refresh"></i>',
                  listeners: {
                    click: {
                      fn: 'onRefreshFolderButtonClick',
                      scope: 'controller'
                    }
                  }
                },
                {
                  xtype: 'tbfill'
                },
                {
                  xtype: 'button',
                  enableToggle: true,
                  text: '<span class="text-muted"><i class="fa fa-check"></i></span>'
                },
                {
                  xtype: 'tbseparator'
                },
                {
                  xtype: 'button',
                  text: '<span class="text-muted"><i class="fa fa-cog"></i></span>',
                  listeners: {
                    click: 'onSetupFoldersButtonClick'
                  }
                }
              ]
            }
          ]
        },
        {
          xtype: 'gridpanel',
          flex: 1,
          border: false,
          itemId: 'customFolders',
          header: false,
          title: 'TEST',
          store: 'CustomFolders',
          columns: [
            {
              xtype: 'gridcolumn',
              enableColumnHide: false,
              sortable: false,
              dataIndex: 'name',
              hideable: false,
              tdCls: 'foldercls',
              flex: 1,
              bind: {
                text: '{i18n.document.folder.categories.b}'
              }
            }
          ],
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
        },
        {
          xtype: 'gridpanel',
          border: false,
          collapsible: true,
          title: 'Substitude',
          hideHeaders: true,
          bind: {
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
        }
      ]
    },
    {
      xtype: 'documentfoldersearch',
      bind: {
        title: '{i18n.document.search.ui.search}'
      }
    }
  ],
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
  }

});