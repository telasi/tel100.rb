Ext.define('Telasi.view.document.list.Search', {
  extend: 'Ext.panel.Panel',
  xtype: 'documentSearch',

  controller: 'search',

  requires:[
    'Telasi.model.document.BaseTexts',
    'Telasi.view.document.list.SearchController'
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
                        fieldLabel: Telasi.model.document.BaseTexts.text_DocNumberField,
                        emptyText: Telasi.model.document.BaseTexts.text_DocNumberField,
                      }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: Telasi.model.document.BaseTexts.text_DocDateField,
                        layout: 'hbox',
                        defauts: { flex: 1 },
                        items: [{ xtype: 'datefield', name: 'from_docdate'}, 
                                { xtype: 'datefield', name: 'to_docdate' }],
                      }, {
                          xtype: 'combo',
                          name: 'typeId',
                          fieldLabel: Telasi.model.document.BaseTexts.text_TypeField,
                          store: Ext.create('Telasi.store.document.Type',{
                            listeners: {
                              load: function(store){
                                var rec = { id: '0', order_by: '', name_ka: '\u00a0', name_ru: '\u00a0', name_en: '\u00a0' };
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
                                name: 'original_number',
                                fieldLabel: Telasi.model.document.BaseTexts.text_OriginalNumberField,
                                emptyText: Telasi.model.document.BaseTexts.text_OriginalNumberField,
                            },{
                              xtype: 'textfield',
                              name: 'subject',
                              fieldLabel: Telasi.model.document.BaseTexts.text_SubjectField,
                              emptyText: Telasi.model.document.BaseTexts.text_SubjectField,
                            }, {
                              xtype: 'fieldcontainer',
                              fieldLabel: Telasi.model.document.BaseTexts.text_DeadlineField,
                              layout: 'hbox',
                              defauts: { flex: 1 },
                              items: [{ xtype: 'datefield', name: 'from_dueDate' }, 
                                      { xtype: 'datefield', name: 'to_dueDate' }],
                            }]
                  },
            ],
            dockedItems: [{
              dock: 'right',
              xtype: 'segmentedbutton',
              allowToggle: false,
              items: [{ glyph: 'xf0b0@FontAwesome', width: 200, text: this.text_FilterButton, handler: "onDocumentGridFilter" },
                      { glyph: 'xf00d@FontAwesome', handler: "onDocumentResetFilter" }],
            }]
        }],
      }],
    });

    this.callParent();
  }
});
