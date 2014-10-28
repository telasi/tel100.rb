Ext.define('Telasi.view.document.list.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'docgrid',
  controller: 'documentgrid',

  requires:[
    'Telasi.view.common.document.DocumentsViewModel',
    'Telasi.view.document.list.GridController',
    'Telasi.model.document.BaseTexts'
  ],

  viewModel: { type: 'documents' },
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
      columns: [
        { dataIndex: 'id',                  text: Telasi.model.document.BaseTexts.text_IDField,           width: 120, locked: true},              
        { dataIndex: 'docdate',             text: Telasi.model.document.BaseTexts.text_DocDateField,      width: 170, xtype: 'datecolumn', format: Ext.Date.defaultFormat, locked: true },
        { dataIndex: 'typeId',              text: Telasi.model.document.BaseTexts.text_TypeField,         width: 120, },
        { dataIndex: 'docnumber',           text: Telasi.model.document.BaseTexts.text_DocNumberField,    width: 150, },
        { dataIndex: 'subject',             text: Telasi.model.document.BaseTexts.text_SubjectField,      width: 250, },
        { dataIndex: 'dueDate',             text: Telasi.model.document.BaseTexts.text_DeadlineField,     width: 170, xtype: 'datecolumn', format: Ext.Date.defaultFormat},
        { dataIndex: 'author_fullname',     text: Telasi.model.document.BaseTexts.text_AuthorsField,      width: 200, },
        {                                   text: Telasi.model.document.BaseTexts.text_actionField,       width: 120, },
        {                                   text: Telasi.model.document.BaseTexts.text_AnswersField,      width: 120, },
        {                                   text: Telasi.model.document.BaseTexts.text_RecieversField,    width: 200, },
        {                                   text: Telasi.model.document.BaseTexts.text_attachmentField,   width: 50, },
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
