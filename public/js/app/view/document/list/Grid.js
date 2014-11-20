Ext.define('Telasi.view.document.list.Grid', {
  extend: 'Ext.grid.Panel',
  xtype: 'docgrid',
  controller: 'documentgrid',
  requires: [
    'Telasi.model.document.BaseTexts',
    'Telasi.view.document.list.ViewModel',
    'Telasi.view.document.list.GridController',
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
        text: 'შესრულება',
        width: 100,
        dataIndex: 'statuses_html',
        locked: true
      }, {
        dataIndex: 'docnumber',
        text: Telasi.model.document.BaseTexts.text_DocNumberField,
        width: 75,
        locked: true,
        renderer: Telasi.documentUtils.gridTextRenderer
      }, {
        width: 120,
        dataIndex: 'my_status',
        text: 'ჩემი სტატუსი',
        renderer: Telasi.documentUtils.gridMyStatusRenderer,
        locked: true
      }, {
        xtype: 'datecolumn',
        dataIndex: 'docdate',
        text: Telasi.model.document.BaseTexts.text_DocDateField2,
        width: 100, xtype: 'datecolumn',
        renderer: Telasi.documentUtils.gridDateRenderer,
      }, {
        width: 120,
        dataIndex: 'status',
        text: 'დოკ. სტატუსი',
        renderer: Telasi.documentUtils.gridStatusRenderer,
      }, {
        width: 100,
        dataIndex: 'type_id',
        text: Telasi.model.document.BaseTexts.text_TypeField,
        renderer: Telasi.documentUtils.gridTypeRenderer
      }, {
        width: 100,
        dataIndex: 'direction',
        text: Telasi.model.document.BaseTexts.text_DirectionField,
        renderer: Telasi.documentUtils.gridDirectionRenderer,
      }, {
        dataIndex: 'subject',
        text: Telasi.model.document.BaseTexts.text_SubjectField,
        renderer: Telasi.documentUtils.gridSubjectRenderer,
        width: 200,
      },  {
        xtype: 'datecolumn',
        dataIndex: 'due_date',
        text: Telasi.model.document.BaseTexts.text_DeadlineField,
        renderer: Telasi.documentUtils.gridDateRenderer,
        width: 100,
      }, {
        xtype: 'datecolumn',
        dataIndex: 'alarm_date',
        text: Telasi.model.document.BaseTexts.text_AlarmField,
        renderer: Telasi.documentUtils.gridDateRenderer,
        width: 100,
      }, {
        dataIndex: 'original_number',
        text: Telasi.model.document.BaseTexts.text_OriginalNumberField,
        renderer: Telasi.documentUtils.gridTextRenderer,
        width: 100,
      }, {
        dataIndex: 'original_date',
        text: Telasi.model.document.BaseTexts.text_OriginalDateField,
        renderer: Telasi.documentUtils.gridDateRenderer,
        width: 100,
      },{
        xtype: 'numbercolumn',
        dataIndex: 'page_count',
        text: Telasi.model.document.BaseTexts.text_PagecountField,
        renderer: Telasi.documentUtils.gridTextRenderer,
        width: 100,
        format: '0',
      }, {
        xtype: 'numbercolumn',
        dataIndex: 'additions_count',
        text: Telasi.model.document.BaseTexts.text_AttachmentsField,
        renderer: Telasi.documentUtils.gridTextRenderer,
        width: 100,
        format: '0',
      }],
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
