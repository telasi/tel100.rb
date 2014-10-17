Ext.define('Telasi.view.common.center.TabController', {
     extend: 'Ext.app.ViewController',
     alias: 'controller.tabcontroller',

     init: function(){
     	    	this.control({
    		'documenttab': {
    			viewDocument: function(){
    				var tabpanel = Ext.getCmp('documenttab');

			     	tabpanel.add({
			     		title: 'view',
			     		html: 'new view'
			     	});
    			}
    		}
    	})
     }

});