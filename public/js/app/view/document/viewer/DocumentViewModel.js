Ext.define('Telasi.view.document.viewer.DocumentViewModel',{
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.document',

	requires: [
		'Telasi.model.document.Base'
	],

	data: {
		DocumentId: 0
	},

	model: 'Telasi.model.document.Base',

});