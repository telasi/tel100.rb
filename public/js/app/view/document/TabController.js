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
    var viewer = new Ext.create('Telasi.view.document.DocumentView', {
      viewModel: {
        data: {
          currentDocument: record
        }
      },
      closable: true,
    });
    this.openTab( viewer );
  },

  openTab: function(component) {
    var tabcontrol = this.getView();
    tabcontrol.add(component);
    tabcontrol.setActiveTab(component);
  },

  onDocumentGridFilter: function(){
    var gridstore = this.getView().down('docgrid').getStore();
    var filter = [];
    this.getView().down('');

    gridstore.filter([{ property: 'docnumber', value: '1' },
                      { property: 'doctype', value: 'letter' },
                     ]);
  }
});
