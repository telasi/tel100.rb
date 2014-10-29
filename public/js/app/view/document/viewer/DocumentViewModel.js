Ext.define('Telasi.view.document.viewer.DocumentViewModel',{
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.documents',

	requires: [
		'Telasi.model.document.Base'
	],

	stores:{
		document: {
			model: 'Telasi.model.document.Base',
		    proxy: {
		        type: 'ajax',
		        reader: {
		            type: 'json',
		            typeProperty: 'mtype'
		        },
		        url: '/document'
		    },
		    autoLoad: true,
		}
	}
});