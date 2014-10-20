Ext.define('Telasi.view.document.TabController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentTabController',

  init: function() {
  	this.listen({
			controller:{
				'*': {
					centalgriddblclick: 'gridcellDblClicked'
				}
			}
		})
  },

  gridcellDblClicked: function(table, td, cellIndex, record, tr, rowIndex, e, eOpts){
    var tabcontrol = table.up('documentTab');
    var newTab = new Ext.create('Telasi.view.document.DocumentView', {
      viewModel: {
        data: {
          currentDocument: record
        }
      },
      closable: true,
    });
    tabcontrol.add(newTab);
    tabcontrol.setActiveTab(newTab);
  },
});
