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
			xtype: 'container',
			width: '100%',
			layout: {
				type: 'vbox',
				aligh: 'stretch'
			},
			// defaults: {
			// 	layout: 'hbox',
			// 	xtype:'container'
			// },
			items:[
				{
					xtype:'panel',
					layout: 'hbox',
					items: [
						{
							html: 'a',
							flex: 1
						},
						{
							html: 'b',
							flex: 10
						}
					]
				}
			],
			region: 'north'
		}
	],

	initComponent: function(){
		this.callParent();
	}

	
});