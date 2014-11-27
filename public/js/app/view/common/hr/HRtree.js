Ext.define('Telasi.view.common.hr.HRtree', {
  extend: 'Ext.tree.Panel',
  alias: 'widget.HRtree',
  rootVisible: false,
  animate: true,
  reserveScrollbar: true,
  hideHeaders: true,
  loadMask: true,
  bodyCls: 'x-tree-noicon',
  requires: [ 'Telasi.store.hr.HRData', 'Telasi.view.hr.Utils' ],
  store: 'HRData',

  columns: [ {
    xtype: 'treecolumn',
    text: 'Name',
    dataIndex: 'name',
    flex: 1,
    sortable: false,
    renderer: function(value, metaInfo) {
      return window.Telasi.hrUtils.renderStructure( metaInfo.record );
    },
  }],

  selModel: {
    allowDeselect: true,
    listeners: {
      selectionchange: function(selModel, selection) {
        selModel.view.up('').fireEvent('hrtreeselectionchanged', selModel, selection)
      }
    },
  },

  tbar: [{
    labelWidth: 50,
    xtype: 'textfield',
    fieldLabel: 'ფილტრი',
    triggerCls: 'x-form-clear-trigger',
    onTriggerClick: function() {
      var store = this.up('treepanel').store;
      this.reset();
      store.clearFilter();
      this.focus();
    },
    listeners: {
      change: function() {
        var tree = this.up('treepanel')
          , v
          , matches = 0
          ;

        try {
          v = new RegExp(this.getValue(), 'i');
          tree.store.filter({
            filterFn: function(node) {
              var children = node.childNodes
                , len = children && children.length
                // Visibility of leaf nodes is whether they pass the test.
                // Visibility of branch nodes depends on them having visible children.
                , visible = node.isLeaf() ? v.test(node.get('title')) : false
                , i
                ;

              // We're visible if one of our child nodes is visible.
              // No loop body here. We are looping only while the visible flag remains false.
              // Child nodes are filtered before parents, so we can check them here.
              // As soon as we find a visible child, this branch node must be visible.
              for (i = 0; i < len && !(visible = children[i].get('visible')); i++);
              if (visible && node.isLeaf()) { matches++; }
              return visible;
            },
            id: 'titleFilter'
          });
        } catch (e) {
          this.markInvalid('Invalid regular expression');
        }
      },
      buffer: 250
    }
  }, {
    xtype: 'tbfill'
  }, {
    icon: null,
    glyph: 'xf065@FontAwesome',
    xtype: 'button',
    itemId: 'expand-button',
    handler: function(button) {
      this.up('treepanel').expandAll();
    }
  }, {
    icon: null,
    glyph: 'xf066@FontAwesome',
    xtype: 'button',
    itemId: 'collapse-button',
    handler: function(button) {
      this.up('treepanel').collapseAll();
    }
  }],
});
