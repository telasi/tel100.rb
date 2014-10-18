Ext.define('Telasi.view.document.DocumentView',{
	extend: 'Ext.panel.Panel',
    xtype: 'documentview',

	// requires:[
 //        'Telasi.view.document.DocumentViewModel',
 //    ],

	// bind: {
	// 	data: {
	// 		bindTo: '{currentDocument}',
	// 		deep:true
	// 	},
	// 	title: '{currentDocument.data.doctype}',
	// },

	bind: {
		title: '{currentDocument.doctype} - {currentDocument.docnumber}'
	},

	layout: 'border',

	items:[
		{
			// tbar: [
			// 	{ 
			// 		text: '<i class="fa fa-print">',
			// 	},
			// 	{ 
			// 		text: '<i class="fa fa-print">',
			// 	}
			// ],
			xtype: 'form',
			width: '100%',

			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 100,
				msgTarget: 'side'
			},

			// defaults: {
			// 	layout: 'hbox',
			// 	xtype:'container'
			// },
			items:[
				{ xtype: 'displayfield', fieldLabel: 'თემა', bind: '{currentDocument.subject}'},
				{ xtype: 'displayfield', fieldLabel: 'ავტორი', bind: '{currentDocument.author_fullname}'},
				{ xtype: 'displayfield', fieldLabel: 'გამგზავნი', bind: '{currentDocument.sender_fullname}'},
				{ xtype: 'displayfield', fieldLabel: 'მფლობელი', bind: '{currentDocument.owner_fullname}'},
				{ xtype: 'displayfield', fieldLabel: 'ადრესატი', bind: '{currentDocument.fullname}'},
			],
			region: 'north'
		},
		{
			xtype: 'panel',
			// html: 'Document text',
			bind: {
				html: '{currentDocument.body}',
			},
			border: 1,
			region: 'center'
		}
	],

	initComponent: function(){
		this.callParent();
	}

	
});