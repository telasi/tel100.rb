Ext.define('Telasi.view.document.Search', {
  extend: 'Ext.panel.Panel',
  xtype: 'documentSearch',

  requires:[
    'Telasi.model.document.BaseTexts'
  ],

  //  texts
  text_SearchHeader: 'ძებნა',
  text_FilterButton: 'ფილტრი',
  //  texts

  initComponent: function(){
    Ext.apply(this, { 
      defaults: {
          padding: 5,
      },
      items: [{
        xtype: 'fieldset',
        collapsible: true,
        collapsed: true,
        title: this.text_FilterButton,
        items: [{
          xtype: 'form',
          border: false,
          layout: 'column',
          buttonAlign: 'center',

          defaults: {
            layout: 'form',
            border: false,
            xtype: 'container',
            style: 'width: 50%',
          },

          items: [{
              items: [{
                        xtype: 'textfield',
                        name: 'docnumber',
                        fieldLabel: Telasi.model.document.BaseTexts.text_IDField,
                        emptyText: Telasi.model.document.BaseTexts.text_IDField,
                      }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Telasi.model.document.BaseTexts.text_DocDateField,
                        layout: 'hbox',
                        defauts: {
                          flex: 1
                        },
                        items: [{
                                  xtype: 'datefield',
                                  name: 'from_docdate',
                                }, {
                                  xtype: 'datefield',
                                  name: 'to_docdate',
                                }],
                      }, {
                          xtype: 'combo',
                          name: 'typeId',
                          fieldLabel: Telasi.model.document.BaseTexts.text_TypeField,
                          store: Ext.create('Telasi.store.document.Type',{
                            listeners: {
                              load: function(store){
                                var rec = { id: '', order_by: '', name_ka: '\u00a0', name_ru: '\u00a0', name_en: '\u00a0' };
                                store.insert(0,rec);
                              }
                            }
                          }),
                          displayField: 'name',
                          valueField: 'id',
                          editable: false,
                          allowBlank: true,
                          bind: '{doc.typeId}'
                      }]
                },{
              items: [{
                          xtype: 'textfield',
                          name: 'docnumber',
                          fieldLabel: Telasi.model.document.BaseTexts.text_DocNumberField,
                          emptyText: Telasi.model.document.BaseTexts.text_DocNumberField,
                      },{
                        xtype: 'textfield',
                        name: 'subject',
                        fieldLabel: Telasi.model.document.BaseTexts.text_SubjectField,
                        emptyText: Telasi.model.document.BaseTexts.text_SubjectField,
                      }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Telasi.model.document.BaseTexts.text_DeadlineField,
                        layout: 'hbox',
                        defauts: {
                          flex: 1
                        },
                        items: [{
                                  xtype: 'datefield',
                                  name: 'from_dueDate',
                                }, {
                                  xtype: 'datefield',
                                  name: 'to_dueDate',
                                }],
                      }]
                },
            ],

          buttons: [{
            text: this.text_FilterButton,
            handler: "onDocumentGridFilter",
            width: '100%'
          }]

        }],
      }],
    });

    this.callParent();
  }
});
