Ext.define('Telasi.view.common.docgrid.DocViewModel',{
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.documents',

	requires: [
		'Telasi.view.common.docgrid.DocModel'
	],

	stores:{
		documents: {
			model: 'Telasi.view.common.docgrid.DocModel',
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