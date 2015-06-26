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
              border: true,
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
              xtype: 'form',
              region: 'center',
              layout: {
                type: 'vbox',
                align: 'stretch'
              },
              bodyPadding: 5,
              items: [{
                  xtype: 'textfield',
                  labelAlign: 'top',
                  region: 'north',
                  baseCls: 'white-panel',
                  border: false,
                  padding: 5,
                  readOnly: true,
                  bind: {
                    fieldLabel: '{i18n.document.base.subject}',
                    value: '{change.subject}'
                  }
                },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items:[{
                    xtype: 'textfield',
                    flex: 1,
                    labelAlign: 'top',
                    region: 'north',
                    baseCls: 'white-panel',
                    border: false,
                    readOnly: true,
                    padding: 5,
                    bind: {
                      fieldLabel: '{i18n.document.base.docnumber2}',
                      value: '{change.docnumber2}'
                    }
                  }, {
                    xtype: 'datefield',
                    format: 'd/m/Y',
                    padding: 5,
                    labelAlign: 'top',
                    readOnly: true,
                    bind: {
                      fieldLabel: '{i18n.document.base.docdate}',
                      value: '{change.docdate}'
                    }
                  }]
                },{
                  xtype: 'label',
                  region: 'north',
                  bodyPadding: 10,
                  bind: {
                    text: '{i18n.document.base.body}'
                  },
                },{
                  xtype: 'container',
                  overflowY: 'scroll',
                  flex: 1,
                  region: 'center',
                  padding: 5,
                  border: true,
                  style: {
                     borderColor: 'lightgrey',
                     borderStyle: 'solid'
                  },
                  bind: {
                    html: '{change.body}'
                  },
                }]
            }, {
                xtype: 'container',
                region: 'east',
                width: 400,
                split: true,
                layout: {
                  type: 'accordion',
                  hideCollapseTool: true
                },
                items: [{ 
                          xtype: 'gridpanel',
                          hideHeaders: true,
                          columns: [
                            {
                              xtype: 'gridcolumn',
                              renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return helpers.document.renderer.renderMotion(record, { as: 'receiver' });
                              },
                              dataIndex: 'name',
                              text: 'name',
                              flex: 1
                            }
                          ],
                          bind: {
                            title: '{i18n.document.motion.signees} ({signeesCount})',
                            store: '{signees}'
                          },
                        },{ 
                          xtype: 'gridpanel',
                          hideHeaders: true,
                          columns: [
                            {
                              xtype: 'gridcolumn',
                              renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return helpers.document.status.motionStatusIcon(value, record);
                              },
                              dataIndex: 'name',
                              text: 'name',
                              flex: 1
                            }
                          ],
                          bind: {
                            title: '{i18n.document.motion.assignees} ({assigneesCount})',
                            store: '{assignees}'
                          },
                        },{
                          xtype: 'gridpanel',
                          hideHeaders: true,
                          columns: [
                            {
                              xtype: 'gridcolumn',
                              dataIndex: 'name',
                              flex: 1
                            }
                          ],
                          bind: {
                            title: '{i18n.document.file.attachments} ({filesCount})',
                            store: '{files}'
                          },
                          listeners: {
                            celldblclick: {
                              fn: 'onGridpanelCellDblClick',
                              scope: 'controller'
                            }
                          }
                        }]
              }
          ]

});