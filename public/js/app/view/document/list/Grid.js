Ext.define('Telasi.view.document.list.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'docgrid',
  controller: 'documentgrid',

  requires:[
    'Telasi.view.document.list.ViewModel',
    'Telasi.view.document.list.GridController',
    'Telasi.model.document.BaseTexts'
  ],

  viewModel: { type: 'list-document-view-model' },
  publishes: ['currentDocument'],
  bind: {
    currentDocument: 'currentDocument',
    store: '{documents}',
  },

  config: {
    currentDocument: null
  },

//  texts
  text_beforePageText: 'გვერდი',
  text_afterPageText:  '{0}-დან',
  text_displayMsg:     'ნაჩვენებია {0}-დან {1}-მდე. სულ {2}',
//  texts

  title: this.text_SearchHeader,

  defaults: {
    sortable: true,
    hideable: true
  },

  margins: '0 0 5 5',
  loadMask: true,

  initComponent: function(){
    Ext.apply(this, {
      columns: [{
        dataIndex: 'docnumber',
        text: Telasi.model.document.BaseTexts.text_DocNumberField,
        width: 100, locked: true
      }, {
        dataIndex: 'docdate',
        text: Telasi.model.document.BaseTexts.text_DocDateField2,
        width: 100, xtype: 'datecolumn',
        locked: true
      },
        {
          width: 100,
          dataIndex: 'type_id',
          text: Telasi.model.document.BaseTexts.text_TypeField,
          renderer: function(value) {
            var store = Ext.data.StoreManager.lookup('documentTypes');
            var type = store.getById(value);
            return type.get('name');
          },
         },
        { dataIndex: 'subject',             text: Telasi.model.document.BaseTexts.text_SubjectField,        width: 250, },
        { dataIndex: 'original_number',     text: Telasi.model.document.BaseTexts.text_OriginalNumberField, width: 150, },
        { dataIndex: 'dueDate',             text: Telasi.model.document.BaseTexts.text_DeadlineField,       width: 170, xtype: 'datecolumn', format: Ext.Date.defaultFormat},
        { dataIndex: 'author_fullname',     text: Telasi.model.document.BaseTexts.text_AuthorsField,        width: 200, },
        {                                   text: Telasi.model.document.BaseTexts.text_actionField,         width: 120, },
        {                                   text: Telasi.model.document.BaseTexts.text_AnswersField,        width: 120, },
        {                                   text: Telasi.model.document.BaseTexts.text_RecieversField,      width: 200, },
        {                                   text: Telasi.model.document.BaseTexts.text_attachmentField,     width: 50, },
      ],
      dockedItems: [{
        xtype: 'pagingtoolbar',
        reference: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        bind: '{documents}',
        beforePageText: this.text_beforePageText,
        afterPageText: this.text_afterPageText,
        displayMsg: this.text_displayMsg,
      }],
    });
    this.callParent();
  }
});
