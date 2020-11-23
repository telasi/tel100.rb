Ext.define('Tel100.view.hr.tree.Panel', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.hrtreepanel',
  controller: 'hrtreepanel',

  viewModel: {
    type: 'hrtreepanel'
  },

  bodyCls: 'x-tree-noicon',
  autoLoad: true,
  enableColumnHide: false,
  hideHeaders: true,
  rowLines: true,
  lines: false,
  rootVisible: false,
  useArrows: true,

  bind: {
    title: '{i18n.hr.tree.title}',
    store: '{structure}'
  },

  viewConfig: {},

  columns: [{
    xtype: 'treecolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      if (record.toHtml) {
        return record.toHtml();
      } else {
        return '<i class="fa fa-bolt"></i> ' + i18n.application.telasi;
      }
    },
    dataIndex: 'name',
    flex: 1
  }],

  listeners: {
    beforeload: 'onTreepanelBeforeLoad',
    load: 'onTreepanelLoad',
    afterrender: 'onTreepanelAfterRender',
    startsearch: 'onTreepanelStartsearch',
    beforeactivate: 'onFocus'
  },

  tools: [{
    xtype: 'tool',
    type: 'refresh',
    listeners: {
      click: 'onRefresh'
    }
  }],

  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      xtype: 'textfield',
      itemId: 'searchField',
      fieldLabel: 'Label',
      hideLabel: true,
      listeners: {
        change: 'onSearchFieldChange',
        specialkey: 'onSearchFieldSpecialkey'
      }
    }, {
      xtype: 'button',
      text: '<i class="fa fa-search"></i>',
      listeners: {
        click: 'onSearchButtonClick'
      }
    }, {
      xtype: 'button',
      disabled: true,
      itemId: 'nextbutton',
      text: '<i class="fa fa-forward"></i>',
      listeners: {
        click: 'onNextSearchButtonClick'
      }
    }]
  }],

  refresh: function() {
    this.getStore('structure').load();
  }
});

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

  onFocus: function(){
    this.checkVersion();
  },

  checkVersion: function(){
    helpers.api.party.getStructureVersion({
      success: function(data) {
        var version = data.version;
        if(version != helpers.party.getHrVersion()){
          this.getView().refresh();
        }
      }.bind(this)
    })
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

Ext.define('Tell100.view.hr.tree.hrreader',{
  extend: 'Ext.data.reader.Json',
  alias: 'reader.hrreader',
  readRecords: function(data){
    helpers.party.setHrVersion(data.version);
    return this.callParent([data]);
  }
});

Ext.define('Tel100.view.hr.tree.PanelViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.hrtreepanel',

  stores: {
    structure: {
      type: 'tree',
      autoLoad: false,
      root: { },

      proxy: {
        type: 'ajax',
        url: '/api/hr/structure',
        reader: {
          type: 'hrreader',
          // type: 'json',
          typeProperty: 'ext_type',
        }
      },

      fields: [ 'name' ]
    }
  }
});
