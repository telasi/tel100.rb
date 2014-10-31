Ext.define('Telasi.view.document.list.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'docgrid',
  controller: 'documentgrid',
  requires:[
    'Telasi.view.document.list.ViewModel',
    'Telasi.view.document.list.GridController',
    'Telasi.model.document.BaseTexts',
    'Telasi.view.document.Utils'
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
  text_beforePageText: 'გვერდი',
  text_afterPageText:  '{0}-დან',
  text_displayMsg:     'ნაჩვენებია {0}-დან {1}-მდე. სულ {2}',
  title: this.text_SearchHeader,
  defaults: {
    sortable: true,
    hideable: true
  },
  margins: '0 0 5 5',
  loadMask: true,
  initComponent: function() {
    Ext.apply(this, {
      columns: [{
        dataIndex: 'docnumber',
        text: Telasi.model.document.BaseTexts.text_DocNumberField,
        width: 100,
        locked: true,
        // renderer: window.Telasi.documentUtils.gridRenderer
      }, {
        dataIndex: 'docdate',
        text: Telasi.model.document.BaseTexts.text_DocDateField2,
        width: 100, xtype: 'datecolumn',
        locked: true,
        // renderer: window.Telasi.documentUtils.gridRenderer
      }, {
        width: 100,
        dataIndex: 'status',
        text: Telasi.model.document.BaseTexts.text_StatusField,
        renderer: window.Telasi.documentUtils.getStatusRendering,
      }, {
        width: 100,
        dataIndex: 'type_id',
        text: Telasi.model.document.BaseTexts.text_TypeField,
        renderer: window.Telasi.documentUtils.getTypeName
      }, {
        width: 100,
        dataIndex: 'direction',
        text: Telasi.model.document.BaseTexts.text_DirectionField,
        renderer: window.Telasi.documentUtils.getDirectionName
      }, {
        dataIndex: 'subject',
        text: Telasi.model.document.BaseTexts.text_SubjectField,
        width: 400,
      }, {
        dataIndex: 'original_number',
        text: Telasi.model.document.BaseTexts.text_OriginalNumberField,
        width: 150,
      }, {
        xtype: 'datecolumn',
        dataIndex: 'due_date',
        text: Telasi.model.document.BaseTexts.text_DeadlineField,
        width: 100,
        format: Ext.Date.defaultFormat
      }, {
        xtype: 'datecolumn',
        dataIndex: 'alarm_date',
        text: Telasi.model.document.BaseTexts.text_AlarmField,
        width: 100,
        format: Ext.Date.defaultFormat
      }, {
        xtype: 'numbercolumn',
        dataIndex: 'page_count',
        text: Telasi.model.document.BaseTexts.text_PagecountField,
        width: 100,
        format: '0',
      }, {
        xtype: 'numbercolumn',
        dataIndex: 'additions_count',
        text: Telasi.model.document.BaseTexts.text_AttachmentsField,
        width: 100,
        format: '0',
      }, /*{
        dataIndex: 'author_fullname',
        text: Telasi.model.document.BaseTexts.text_AuthorsField,
        width: 200,
      },*/
      // { text: Telasi.model.document.BaseTexts.text_actionField,         width: 120, },
      // { text: Telasi.model.document.BaseTexts.text_AnswersField,        width: 120, },
      // { text: Telasi.model.document.BaseTexts.text_RecieversField,      width: 200, },
      // { text: Telasi.model.document.BaseTexts.text_attachmentField,     width: 50, },
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
