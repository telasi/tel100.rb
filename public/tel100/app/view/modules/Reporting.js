Ext.define('Tel100.view.modules.Reporting', {
  extend: 'Ext.container.Container',
  alias: 'widget.modulesreporting',
  controller: 'modulesreporting',

  viewModel: {
    type: 'modulesreporting'
  },

  layout: 'border',

  items: [{
            xtype: 'treepanel',
            // autoLoad: true,
            width: 300,
            region: 'west',
            split: true,
            rootVisible: false,
            hideHeaders: true,
            bind: {
              store: '{report_tree}'
            },
            columns: [{
              xtype: 'treecolumn',
              dataIndex: 'name',
              flex: 1
            }],
            listeners: {
              itemdblclick: {
                fn: 'onItemDoubleClick',
                scope: 'controller'
              }
            },
          },{
            xtype: 'panel',
            itemId: 'report_panel',
            region: 'center',
            loader: {}
          }]
});

Ext.define('Tel100.view.modules.ReportingViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.modulesreporting',

  onItemDoubleClick: function(v, record, item, index, e){
    var panel = v.up('modulesreporting').down('#report_panel');
    var operation = record.get('operation');
    if (operation != null) {

      // var url = '<iframe src="192.168.1.32/reporting/' + record.get('operation') + 
      //           '" style="width:100%;height:100%;" id="reporting"></iframe>';

      var oldiframe = v.up('modulesreporting').down('#reporting_iframe');
      if (oldiframe){
        oldiframe.destroy();
      };

      var user = helpers.user.getProxyUser();
      if(!user) { user = helpers.user.getCurrentUser() };
      var extra = Ext.Ajax.getExtraParams();

      dynamicPanel = new Ext.Component({                    
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
                        src: 'http://1.1.2.65/reporting/' + record.get('operation') + 
                              '?api_username=' + extra["api_username"] +
                              '&api_password=' + extra["api_password"] +
                              '&api_locale=' + extra["api_locale"]
                    },
                    height: 600,
                    id: 'reporting_iframe',
                    width: 600
                });

      panel.add(dynamicPanel);
    }
  }
});

Ext.define('Tel100.view.modules.ReportingViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.modulesreporting',

  stores: {
    report_tree: {
      type: 'tree',
      // autoLoad: true,

      proxy: {
        type: 'ajax',
        url: '/reporting/report_tree.json',
        reader: {
          type: 'json',
          typeProperty: 'ext_type'
        }
      },

      fields: [ 'name'],
      root: {
                expanded: true
            }
    }
  }
});

