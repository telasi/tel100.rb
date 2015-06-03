Ext.define('Tel100.view.hr.tree.PanelViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.hrtreepanel',

  searchAndExpand: function(view, rn, searchString, field, fn) {
    var found = rn.findChildBy(function(child){
      this.counter++;
      if(this.counter <= this.oldcounter) {
        return false;
      }

      var childvalue = child.get(field);
      if(childvalue){
        return (fn(childvalue, searchString));
      }
    }, this, true);

    if(found) {
      this.oldcounter = this.counter;
      view.collapseAll();
      view.expandPath(found.getPath());
      view.getSelectionModel().select(found);
    }
  },

  startSearch: function() {
    var view = this.getView()
      , searchValue = view.down('textfield').getValue().toLowerCase()
      , rn = view.getRootNode();

    this.counter = 0;
    this.oldcounter = 0;
    this.searchAndExpand(view, rn, searchValue, 'full_name', function(cv, sv) { return cv.toLowerCase().indexOf(sv) != -1; });
    this.getView().down('#nextbutton').setDisabled(false);
  },

  onTreepanelBeforeLoad: function(store, operation, eOpts) {
    this.getView().setLoading(true);
  },

  onTreepanelLoad: function(treestore, records, successful, operation, node, eOpts) {
    this.getView().setLoading(false);
  },

  onRefresh: function(tool, e, owner, eOpts) {
    this.getView().refresh();
  },

  onSearchFieldChange: function(field, newValue, oldValue, eOpts) {
    this.counter = 0;
    this.oldcounter = 0;
    this.getView().down('#nextbutton').setDisabled(true);
  },

  onSearchFieldSpecialkey: function(field, e, eOpts) {
    if(e.getKey() == e.ENTER){
      this.startSearch();
    }
  },

  onSearchButtonClick: function(button, e, eOpts) {
    this.startSearch();
  },

  onNextSearchButtonClick: function(button, e, eOpts) {
    var view = this.getView()
      , rn = view.getRootNode()
      , searchValue = view.down('textfield').getValue().toLowerCase();

    this.counter = 0;
    this.oldcounter++;
    this.searchAndExpand(view, rn, searchValue, 'full_name', function(cv, sv) { return cv.toLowerCase().indexOf(sv) != -1; });
  },

  onTreepanelAfterRender: function(component, eOpts) {
    helpers.party.vacationAction(component);
  },

  onTreepanelStartsearch: function(view, sub_id) {
    var rn = view.getRootNode();
    this.counter = 0;
    this.oldcounter = 0;
    this.searchAndExpand(view, rn, sub_id, 'id', function(cv, sv) { return cv == sv; });
  }
});
