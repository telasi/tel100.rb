Ext.define('Telasi.view.document.list.DocumentViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.documents',
	requires: [
		'Telasi.model.document.Base'
	],
	stores:{
		documents: {
		model: 'Telasi.model.document.Base',
			proxy: {
				type: 'ajax',
				reader: {
					type: 'json',
					typeProperty: 'mtype'
				},
				url: '/api/docs/documents'
			},
			autoLoad: true,
		}
	}
});
