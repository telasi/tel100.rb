Ext.define('Tel100.view.document.folder.TabViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.documentfoldertab',

  refreshDocuments: function(opts) {
    var dg = this.getView().up().down('documentgridpanel');
    var url = '/api/documents/base';
    dg.getController().setStoreConfig({url: url, extraParams: opts});
    dg.refresh();
  },

  onGearClick: function(button) {
    var configwindow = Ext.create('Tel100.view.document.folder.Config');
    configwindow.show();
  },

  foldersRefresh: function() {
    this.getViewModel().getStore('standardfolders').reload();
    Ext.getStore('CustomFolders').reload();
  },

  onStandardGridpanelSelect: function(dataview, record, item, index, e, eOpts) {
    this.refreshDocuments({folderType: 'standard', folderId: record.id});
    this.getView().down('#customFolders').getSelectionModel().deselectAll();
    this.getView().up().getViewModel().set('customfolderselection', null);
    this.getView().fireEvent('folderChosen');
  },

  onRefreshFolderButtonClick: function(button, e, eOpts) {
    this.foldersRefresh();
    this.getView().fireEvent('foldersrefresh');
  },

  onGridpanelAfterRender: function(component, eOpts) {
    component.dropZone = Ext.create('Ext.dd.DropZone', component.el, {
      ddGroup: 'Grid2FolderDDGroup',

      getTargetFromEvent: function(e) {
        return e.getTarget('.foldercls');
      },

      onNodeEnter : function(target, dd, e, data){
        Ext.fly(target).highlight();
      },

      onNodeOver : function(target, dd, e, data){
        var customGrid = Ext.ComponentQuery.query('grid[itemId=customFolders]')[0];
        var view = customGrid.getView();
        var record = view.getRecord(target);

        var proto = Ext.dd.DropZone.prototype;
        return record.get('folder_type') === 0 ? proto.dropAllowed : proto.dropNotAllowed;
      },

      onNodeDrop : function(target, dd, e, data){
        var customGrid = Ext.ComponentQuery.query('grid[itemId=customFolders]')[0];
        var view = customGrid.getView();
        var record = view.getRecord(target);

        var vm = customGrid.up('panel').getViewModel();
        var model = Ext.create('Tel100.model.folder.Document',{
          folder_id: record.id, doc_id: data.records[0].id
        });
        model.save();

        return true;
      }
    });

    // refreshing document on proxy changes

    var ctrl = this;
    var view = this.getView();
    var mainView = view.up('main');
    mainView.on('proxychanged', function() {
      ctrl.foldersRefresh();
    });
  },

  onCustomFoldersSelect: function(rowmodel, record, index, eOpts) {
    if(record.get('folder_type') === 0){
      this.refreshDocuments({folderType: 'custom', folderId: record.id});
    } else {
      var view = this.getView();
      var searchform = view.down('documentfoldersearch');
      searchform.getForm().setValues(Ext.decode(record.get('form')));
      searchform.getController().search();
    }

    this.getView().down('#standardFolders').getSelectionModel().deselectAll();
    this.getView().up().getViewModel().set('customfolderselection', rowmodel.getSelection());
  },

  onCustomFoldersBeforeRender: function(component, eOpts) {
    Ext.getStore('CustomFolders').load();
  },

  onGridpanelCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {

    var me = this;

    if(Ext.ComponentQuery.query('usersubstitudepanel').length === 0){
      helpers.api.substitude.setSubstitude(record.get('id'));
      var dg = this.getView().up().down('documentgridpanel');
      var me = this;

      var toppanel = Ext.create('Tel100.view.user.substitude.Panel',
        { html: i18n.vacation.ui.substitude_mode.title + record.data.name });
      toppanel.down('button').on('click',function(){
        helpers.api.substitude.setSubstitude(null);
        dg.refresh();
        me.foldersRefresh();
      });
      toppanel.show().alignTo(Ext.getBody(), 't-t');
      this.getView().up().down('documentgridpanel').refresh();
      dg.refresh();
      me.foldersRefresh();
    }
  },

  onDocumentGridRefresh: function(tabpanel) {
    this.foldersRefresh();
  }
});
