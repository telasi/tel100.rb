Ext.define('Telasi.view.document.Search', {
  extend: 'Ext.panel.Panel',
  xtype: 'documentSearch',
  // layout: 'column',
  // defauls: {
  //     bodyPadding: 15,
  //     padding: 5,
  // },

  // height: 20,

  requires:[
    'Telasi.model.document.BaseTexts'
  ],

  //  texts
  text_SearchHeader: 'ძებნა',
  text_FilterButton: 'ფილტრი',
  //  texts

  buttonAlign: 'center',

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
          columnWidth: 0.3,
          xtype: 'textfield',
          name: 'from_docnumber',
          fieldLabel: Telasi.model.document.BaseTexts.text_InnerNumberField,
          emptyText: Telasi.model.document.BaseTexts.text_InnerNumberField,
        }, {
          columnWidth: 0.3,
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
            columnWidth: 0.3,
            xtype: 'datefield',
            name: 'doctype',
            fieldLabel: Telasi.model.document.BaseTexts.text_DocDateField,
            emptyText: Telasi.model.document.BaseTexts.text_DocDateField,
          }, {
            columnWidth: 0.3,
            xtype: 'datefield',
            name: 'doctype',
            fieldLabel: Telasi.model.document.BaseTexts.text_DocDateField,
            emptyText: Telasi.model.document.BaseTexts.text_DocDateField,
          }, {
            xtype: 'button',
            text: this.text_FilterButton
          }
        ],
      }],
    });

    this.callParent();
  }
});
