Ext.define('Tel100.view.document.grid.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentgridpanel',

  setStoreConfig: function(opts, values) {
    var proxy = this.getStore('documents').getProxy();
    proxy.setConfig(opts, values);

    var subst = Ext.ComponentQuery.query('#main-viewport')[0].getViewModel().get('substitude');
    if(subst){
      proxy.setExtraParam('substitude', subst.get('id'));
    } else {
      proxy.setExtraParam('substitude', null);
    }
  },

  moveDocumentToFolder: function(id) {
    debugger;
    var model = Ext.create('Tel100.model.folder.Document',{
          folder_id: id, doc_id: data.records[0].id
        });
        model.save();
  },

  addPagingToolbar: function(component) {
    component.addDocked(new Ext.PagingToolbar({
      displayInfo: true,
      dock: 'bottom',
      afterPageText: ' / {0}',
      beforePageText: i18n.ui.page,
      emptyMsg: i18n.ui.emptyMsg,
      displayMsg : i18n.ui.displayMsg,
      bind: {
        store: '{documents}'
      }
    })
    );
  },

  onGridpanelBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    var document = record;
    var folderMenu = Ext.create('Ext.menu.Menu');
    var CustomFoldersStore = Ext.getStore('CustomFolders');
    CustomFoldersStore.each(function(record,id){
      if(record.get('folder_type') === 0){
        folderMenu.add({
          text: record.get('name'),
          handler: function(item){
            var model = Ext.create('Tel100.model.folder.Document', { folder_id: record.id, doc_id: document.id });
            model.save();
          }
        });
      }
    });

    var gridMenu = Ext.create('Ext.menu.Menu', {
      items: [{
        text: i18n.document.folder.ui.move_to,
        icon: '/images/move.png',
        menu: folderMenu
      }]
    });

    e.stopEvent();
    gridMenu.showAt(e.getXY());
  },

  onGridpanelAfterRender: function(component, eOpts) {
    this.getView().getController().addPagingToolbar(component);
    helpers.party.employeeTips(component);
  }

});
