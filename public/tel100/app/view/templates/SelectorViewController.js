Ext.define('Tel100.view.templates.SelectorViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.templateselector',

  onAddParty: function(obj) {
    var grid = this.getView().getComponent('selectedParties');
    grid.getStore().add(obj);
  },

  onRemoveParty: function(obj) {
    var grid = this.getView().getComponent('selectedParties');
    var store = grid.getStore();
    store.remove(obj);
  },

  contextMenu: function(dataview, record, item, index, e) {
    var me = this;
    var favMenu = Ext.create('Ext.menu.Menu', {
        items: [{
          text: i18n.hr.favourites.add_to,
          icon: '/images/add.png',
          handler: function(item){
            var model = Ext.create('Tel100.model.party.Favourites',
                                    { person_id: record.id, person_type: record.get('ext_type') });
            model.save();
            var favpanel = Ext.ComponentQuery.query('partyfavourites')[0];
            var store = favpanel.store;
            store.reload();
          }
        }]
      });

      e.stopEvent();
      favMenu.showAt(e.getXY());
  },

  addFromFavourites: function(record) {
    var obj = Ext.create('Tel100.model.party.Favourites',
                        { id: record.get('person_id'),
                         name: record.get('name'),
                         person_type: record.get('person_type') });
    this.onAddParty(obj);
  },

  onFavouritesBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    var rec = record;
    var favMenu = Ext.create('Ext.menu.Menu', {
      items: [{
        text: i18n.hr.favourites.delete,
        icon: '/images/delete.png',
        handler: function(item){
          var favpanel = Ext.ComponentQuery.query('partyfavourites')[0];
          var store = favpanel.store;
          var selection = favpanel.selection;
          if (selection){
            Ext.Msg.show({
              title: i18n.ui.destroy,
              message: i18n.ui.destroyConfirm,
              buttons: Ext.Msg.YESNO,
              icon: Ext.Msg.QUESTION,
              fn: function(btn) {
                if (btn === 'yes') {
                  store.remove(selection);
                  store.sync();
                  store.reload();
                }
              }
            });
          }
        }
      }]
    });

    e.stopEvent();
    favMenu.showAt(e.getXY());
  },

  onHRStructureBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    if(record.get('ext_type') == 'hr.Employee'){
      this.contextMenu(dataview, record, item, index, e);
    }
  },

  onPartiesBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    this.contextMenu(dataview, record, item, index, e);
  },

  onCustomerBeforeItemContextMenu: function(dataview, record, item, index, e, eOpts) {
    this.contextMenu(dataview, record, item, index, e);
  }

});
