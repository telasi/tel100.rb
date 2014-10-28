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
    var me = this;
    var gridstore = this.getView().down('docgrid').getStore();
    var filter = [];
    var form = this.getView().down('form').getForm();
    var filter = [];

    if(form.isValid()) {
      gridstore.clearFilter(true);

      form.getFields().each(function(item) {
        if(item.value != null && item.value != 0 && item.value != ""){
          filter.push({id: item.name, property: item.name, value: item.value });
        }
      });

      gridstore.addFilter(filter);
    }
  },

  onDocumentResetFilter: function(){
    var gridstore = this.getView().down('docgrid').getStore();
    gridstore.clearFilter();
  }

});
