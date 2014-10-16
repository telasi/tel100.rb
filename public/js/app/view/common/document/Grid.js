Ext.define('Telasi.view.common.document.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'docgrid',
    controller: 'documentgrid',

    requires:[
        'Telasi.view.common.document.ViewModel',
        'Telasi.controller.common.document.GridController'
    ],

    viewModel: { type: 'documents' },
    bind: '{documents}',

//  texts
    text_attachmentField:   '',
    text_actionField:       'მოქმედება',
    text_TypeField:         'ტიპი',
    text_DocNumberField:    'გარე დოკუმენტის #',
    text_DocDateField:      'დოკუმენტის თარიღი',
    text_InnerNumberField:  'დოკუმენტის #',
    text_DeadlineField:     'ვადა',
    text_AuthorsField:      'ავტორები',
    text_AnswersField:      'პასურები',
    text_RecieversField:    'ადრესატები',
    text_SubjectField:      'თემა',

//  pager
    text_beforePageText:    'გვერდი',
    text_afterPageText:     '{0}-დან',
    text_displayMsg:        'ნაჩვენებია {0}-დან {1}-მდე. სულ {2}',
//  texts

    title: this.text_SearchHeader,

    defaults: {
        sortable: true,
        hideable: true
    },

    margins: '0 0 5 5',
    loadMask: true,

    viewConfig: {
        listeners: {
            refresh: function(dataview) {
                Ext.each(dataview.panel.columns, function(column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                })
            }
        }
    },

    initComponent: function(){
        Ext.apply(this,
        {
            columns: [
                { dataIndex: 'docnumber',           text: this.text_InnerNumberField,  width: 120, locked: true},
                { dataIndex: 'docdate',             text: this.text_DocDateField,      width: 170, xtype: 'datecolumn', format: Ext.Date.defaultFormat, locked: true },
                { dataIndex: 'doctype',             text: this.text_TypeField,         width: 120, },
                { dataIndex: 'original_number',     text: this.text_DocNumberField,    width: 150, },
                { dataIndex: 'subject',             text: this.text_SubjectField,      width: 250, },
                { dataIndex: 'due_date',            text: this.text_DeadlineField,     width: 170, xtype: 'datecolumn', format: Ext.Date.defaultFormat},
                { dataIndex: 'fullname',            text: this.text_AuthorsField,      width: 200, },
                {                                   text: this.text_actionField,       width: 120, },
                {                                   text: this.text_AnswersField,      width: 120, },
                {                                   text: this.text_RecieversField,    width: 200, },
                {                                   text: this.text_attachmentField,   width: 50, },
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