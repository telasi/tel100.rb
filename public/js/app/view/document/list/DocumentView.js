Ext.define('Telasi.view.document.list.DocumentView', {
	extend: 'Ext.panel.Panel',
  xtype: 'documentview',
	bind: {
		title: '{currentDocument.doctype} - {currentDocument.docnumber}'
	},
	layout: 'border',
	items: [{
		xtype: 'form',
		width: '100%',
		fieldDefaults: {
			labelAlign: 'right',
			labelWidth: 100,
			msgTarget: 'side'
		},
		items: [
			{ xtype: 'displayfield', fieldLabel: 'თემა', bind: '{currentDocument.subject}'},
			{ xtype: 'displayfield', fieldLabel: 'ავტორი', bind: '{currentDocument.author_fullname}'},
			{ xtype: 'displayfield', fieldLabel: 'გამგზავნი', bind: '{currentDocument.sender_fullname}'},
			{ xtype: 'displayfield', fieldLabel: 'მფლობელი', bind: '{currentDocument.owner_fullname}'},
			{ xtype: 'displayfield', fieldLabel: 'ადრესატი', bind: '{currentDocument.fullname}'},
		],
		region: 'north'
	}, {
		xtype: 'panel',
		bind: {
			html: '{currentDocument.body}',
		},
		border: 1,
		region: 'center'
	}],
});
