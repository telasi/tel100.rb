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
    var viewer = new Ext.create('Telasi.view.document.viewer.Viewer',{
      closable: true,
      viewModel:{
        links: {
          doc: {
            reference: 'Telasi.model.document.Base',
            id: record.data.id
          }
        }
      }
    });
    this.openTab( viewer );
  },

  openTab: function(component) {
    var tabcontrol = this.getView();
    tabcontrol.add(component);
    tabcontrol.setActiveTab(component);
  },

  removeTab: function(component) {
    var tabcontrol = this.getView();
    tabcontrol.remove(component, true);
  },

});
