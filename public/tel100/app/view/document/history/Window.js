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
                          columns: [{
                              xtype: 'gridcolumn',
                              renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return helpers.document.status.motionStatusIcon(value, record);
                              },
                              draggable: false,
                              resizable: false,
                              width: 32,
                              sortable: false,
                              dataIndex: 'status',
                              hideable: false,
                              text: ''
                            }, {
                              xtype: 'gridcolumn',
                              renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return helpers.document.status.motionReceiverName(value, record);
                              },
                              draggable: false,
                              width: 200,
                              sortable: false,
                              dataIndex: 'receiverName',
                              hideable: false,
                              bind: {
                                text: '{i18n.document.motion.receiver}'
                              }
                            }, {
                              xtype: 'gridcolumn',
                              renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return record.get('send_type_name');
                              },
                              defaultWidth: 150,
                              sortable: false,
                              dataIndex: 'send_type_id',
                              hideable: false,
                              bind: {
                                text: '{i18n.document.motion.send_type}'
                              },
                              editor: {
                                xtype: 'combobox',
                                editable: false,
                                displayField: 'name',
                                valueField: 'id',
                                bind: {
                                  store: '{responseTypes}'
                                }
                              }
                            }, {
                              xtype: 'gridcolumn',
                              draggable: false,
                              width: 200,
                              sortable: false,
                              dataIndex: 'motion_text',
                              hideable: false,
                              bind: {
                                text: '{i18n.document.motion.motion_text}'
                              },
                              editor: {
                                xtype: 'textfield'
                              }
                            }, {
                              xtype: 'gridcolumn',
                              draggable: false,
                              width: 100,
                              sortable: false,
                              dataIndex: 'due_date',
                              formatter: 'date("d/m/Y")',
                              hideable: false,
                              bind: {
                                text: '{i18n.document.motion.due_date}'
                              },
                              editor: {
                                xtype: 'datefield',
                                format: 'd/m/Y'
                              }
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