Ext.define('Telasi.view.common.hr.form.HRtree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.HRtree',

    xtype: 'heterogeneous-tree',

    // store: 'Telasi.HR.store.HRData',
    // store: Ext.create('Telasi.HR.store.HRData'),
    // store: Ext.create('Telasi.HR.store.HRData', {
    //     listeners: {
    //         'load': function (store, records, success) {
                
    //         },
    //         'beforeload': function (store, options) {
    //             alert('asdas');
    //                              // store.up('treepanel').setLoading();
    //             // this.ownerTree.getEl().mask("Loading", 'x-mask-loading');
    //         }
    //     }
    // }),
    rootVisible: false,
    animate: true,
    frame: true,
    height: 600,
    reserveScrollbar: true,
    hideHeaders: true,
    loadMask: true,
    columns: [{
        xtype: 'treecolumn',
        text: 'Name',
        dataIndex: 'title',
        flex: 1,
        sortable: false
    }],

    // selModel: {
    //     allowDeselect: true,
    //     // listeners: {
    //     //     selectionchange: function(selModel, selection) {
    //     //         // Go up from the view to the owning TreePanel
    //     //         var panel = selModel.view.up('');
    //     //         panel.onSelectionChange.apply(panel, arguments);
    //     //     }
    //     // },
    //     // onKeyEnter: function() {
    //     //     // Go up from the view to the owning TreePanel
    //     //     var panel = this.view.up('');
    //     //     panel.down('#new-name').focus();
    //     // }
    // },

    tbar: [{
        labelWidth: 50,
        xtype: 'textfield',
        fieldLabel: 'Filter',
        // itemId: 'search_string',
        // enableKeyEvents: true,
        triggerCls: 'x-form-clear-trigger',
        onTriggerClick: function() {
            var store = this.up('treepanel').store;

            this.reset();
            store.clearFilter();
            this.focus();
        },
        listeners: {
            change: function() {
                var tree = this.up('treepanel'),
                    v,
                    matches = 0;

                try {
                    v = new RegExp(this.getValue(), 'i');
                    tree.store.filter({
                        filterFn: function(node) {
                            var children = node.childNodes,
                                len = children && children.length,

                                // Visibility of leaf nodes is whether they pass the test.
                                // Visibility of branch nodes depends on them having visible children.
                                visible = node.isLeaf() ? v.test(node.get('title')) : false,
                                i;

                            // We're visible if one of our child nodes is visible.
                            // No loop body here. We are looping only while the visible flag remains false.
                            // Child nodes are filtered before parents, so we can check them here.
                            // As soon as we find a visible child, this branch node must be visible.
                            for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                            if (visible && node.isLeaf()) {
                                matches++;
                            }
                            return visible;
                        },
                        id: 'titleFilter'
                    });
                    // tree.down('#matches').setValue(matches);
                } catch (e) {
                    this.markInvalid('Invalid regular expression');
                }
            },
            buffer: 250
        }
    }, 
    {xtype: 'tbfill'},
    {
        icon: null,
        glyph: 'xf065@FontAwesome',
        xtype: 'button',
        itemId: 'expand-button',
        handler: function(button) {
            this.up('treepanel').expandAll();
        }
    },
    {
        icon: null,
        glyph: 'xf066@FontAwesome',
        xtype: 'button',
        itemId: 'collapse-button',
        handler: function(button) {
            this.up('treepanel').collapseAll();
        }
    }
    ],

    initComponent: function(){
        var me = this;

        this.store = Ext.create('Telasi.store.hr.HRData'
        , {
             listeners: {
                            'load': function (store, records, success) {
                                me.setLoading(false);
                        },
                            'beforeload': function (store, options) {
                                me.setLoading(true);
                        }
            }
        });

        this.callParent();
        this.on('render', this.LoadStore, this);
        // this.store.on('beforeload', me.onStoreBeforeLoad, me);
    },

    LoadStore: function(){
        this.setLoading(true);
        // this.getStore().load();
    },

    // onStoreBeforeLoad: function(that){
    //     alert('asds');
    //     that.setLoading('Loading...');
    // }

    // onSelectionChange: function(selModel, selection) {
    //     var button = this.down('#add-button'),
    //         selectedNode;

    //     if (selection.length) {
    //         selectedNode = selection[0];
    //         if (selectedNode instanceof KitchenSink.model.tree.Territory) {
    //             this.addClass = KitchenSink.model.tree.Country;
    //             button.setText('Add Country');
    //             button.enable();
    //         } else if (selectedNode instanceof KitchenSink.model.tree.Country) {
    //             this.addClass = KitchenSink.model.tree.City;
    //             button.setText('Add City');
    //             button.enable();
    //         } else {
    //             button.disable();
    //         }
    //     } else {
    //         this.addClass = KitchenSink.model.tree.Territory;
    //         button.setText('Add Territory');
    //         button.enable();
    //     }
    // },

    // getActionTip: function(value, meta, rec, rowIdx, colIdx, store, view) {
    //     var dataType;
    //     switch (Ext.ClassManager.getName(rec)) {
    //         case "KitchenSink.model.tree.Territory":
    //             dataType = 'territory';
    //             break;
    //         case "KitchenSink.model.tree.Country":
    //             dataType = 'country';
    //             break;
    //         case "KitchenSink.model.tree.City":
    //             dataType = 'city';
    //     }
    //     return 'Click for info on ' + dataType;
    // },

    // onDrillAction: function(view, rowIndex, colIndex, row, event, rec) {
    //     var dataType;
    //     switch (Ext.ClassManager.getName(rec)) {
    //         case "KitchenSink.model.tree.Territory":
    //             dataType = 'territory';
    //             break;
    //         case "KitchenSink.model.tree.Country":
    //             dataType = 'country';
    //             break;
    //         case "KitchenSink.model.tree.City":
    //             dataType = 'city';
    //     }
    //     Ext.Msg.alert('Action', 'Drill into ' + dataType + ' details');
    // }
});
