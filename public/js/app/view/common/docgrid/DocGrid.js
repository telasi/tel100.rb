Ext.define('Telasi.view.common.docgrid.DocGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'docgrid',

    requires:[
        'Telasi.view.common.docgrid.DocViewModel'
    ],

    viewModel: { type: 'documents' },
    bind: '{documents}',

//  texts
    text_attachmentField:   '',
    text_actionField:       'მოქმედება',
    text_TypeField:         'ტიპი',
    text_DocNumberField:    'დოკუმენტის #',
    text_InnerNumberField:  'შიდა დოკუმენტის #',
    text_DeadlineField:     'ვადა',
    text_AuthorsField:      'ავტორები',
    text_AnswersField:      'პასურები',
    text_RecieversField:    'ადრესატები',
    text_SubjectField:      'თემა',
//  texts

    title: this.text_SearchHeader,

    defaults: {
        flex: 1,
        sortable: true,
        hideable: true
    },

    margins: '0 0 5 5',
    loadMask: true,

    bbar: [{
        xtype: 'pagingtoolbar',
        pageSize: 10,
        displayInfo: true,
    }],

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
                {                                   text: this.text_attachmentField,  flex: 1 },
                {                                   text: this.text_actionField,      flex: 1 },
                { dataIndex: 'doctype',             text: this.text_TypeField,           flex: 1 },
                { dataIndex: 'original_number',     text: this.text_DocNumberField,    flex: 1 },
                { dataIndex: 'docnumber',           text: this.text_InnerNumberField,  flex: 1 },
                { dataIndex: 'due_date',            text: this.text_DeadlineField,    flex: 1 },
                { dataIndex: 'fullname',            text: this.text_AuthorsField,     flex: 1 },
                {                                   text: this.text_AnswersField,     flex: 1 },
                {                                   text: this.text_RecieversField,   flex: 1 },
                { dataIndex: 'subject',             text: this.text_SubjectField,     flex: 1 },
            ],
        });

        this.callParent();
    }
    
});