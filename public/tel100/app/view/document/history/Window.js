Ext.define('Tel100.view.document.history.Window', {
  extend: 'Ext.window.Window',
  alias: 'widget.documenthistory',

  requires: [
    'Tel100.view.document.history.WindowViewController',
    'Tel100.view.document.history.WindowViewModel'
  ],

  controller: 'documenthistory',
  viewModel: {
    type: 'documenthistory'
  },
  layout: 'border',
  modal: true,
  width: '90%',
  height: '90%',

  items: [
            {
              xtype: 'gridpanel',
              region: 'west',
              width: 200,
              resizable: true,
              columns: [{
                xtype: 'templatecolumn',
                flex: 1,
                sortable: false,
                dataIndex: 'document_id',
                hideable: false,
                text: 'ავტორი/თარიღი',
                lockable: false,
                tpl: '<strong>{name}</strong><br><span style="float: right;">{created_at_f}</span>'
              }], 
              bind: {
                store: '{changes}'
              },
              listeners: {
                select: {
                  fn: 'onChangesSelect',
                  scope: 'controller'
                }
              }
            },

            {
              xtype: 'panel',
              region: 'center',
              layout: 'border',
              items: [{
                xtype: 'panel',
                region: 'center',
                bodyPadding: 10,
                bind: {
                  html: '{change.body}'
                },
              },{
                xtype: 'panel',
                region: 'east',
                layout: 'vbox',
                items: [{ 
                          xtype: 'panel',
                          flex: 1
                        },{ 
                          xtype: 'panel',
                          flex: 1
                        }]
              }]
            }
          ]

});