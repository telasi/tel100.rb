Ext.define('Telasi.view.common.document.ViewModel',{
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.documents',

	requires: [
		'Telasi.model.document.Base'
	],

	stores:{
		documents: {
			model: 'Telasi.model.document.Base',
			pageSize: 1,
		    proxy: {
		        type: 'ajax',
		        enablePaging: true,
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