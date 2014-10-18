Ext.define('Telasi.view.common.document.GridController', {
     extend: 'Ext.app.ViewController',
     alias: 'controller.documentgrid',

     control: {
     	'#': {
     		celldblclick: 'cellDblClick'
     	}
     },

     cellDblClick: function(table, td, cellIndex, record, tr, rowIndex, e, eOpts){
     	// this.getViewModel().set('currentDocument', record);
     	this.fireEvent('centalgriddblclick', table, td, cellIndex, record, tr, rowIndex, e, eOpts);
     },

     init: function() {
        this.lookupReference('pagingtoolbar')
           .setStore(this.getStore('documents'));
        }
});