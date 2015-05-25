Ext.define('Tel100.view.document.motions.ResultPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.documentmotionsresultpanel',

  controller: 'documentmotionsresultpanel',
  viewModel: {
    type: 'documentmotionsresultpanel'
  },
  autoScroll: true,

  layout: {
    type: 'vbox',
    align: 'stretch',
    padding: 5
  },

  bind: {
    title: '{i18n.document.motion.resultPaneTitle}'
  },

  items: [{
    xtype: 'combobox',
    tpl: '<tpl for="."><div class="x-boundlist-item">{html_text}</div></tpl>',
    itemId: 'in-motions',
    editable: false,
    autoSelect: false,
    valueField: 'id',
    bind: {
      fieldLabel: '{i18n.document.comment.motion}',
      value: '{motionId}',
      store: '{motions}',
      selection: '{selection}'
    }
  }, {
    xtype: 'checkboxfield',
    flex: 0,
    itemId: 'is-complete',
    bind: {
      hidden: '{hideComplete}',
      fieldLabel: '{i18n.document.comment.complete}',
      value: '{isResult}'
    }
  }, {
    xtype: 'combobox',
    tpl: '<tpl for="."><div class="x-boundlist-item">{html_name}</div></tpl>',
    flex: 0,
    itemId: 'result-types',
    editable: false,
    autoSelect: false,
    displayField: 'name',
    valueField: 'id',
    bind: {
      hidden: '{hideResult}',
      fieldLabel: '{i18n.document.comment.result}',
      value: '{categoryId}',
      store: '{responseTypes}'
    }
  }, {
    xtype: 'textareafield',
    flex: 0,
    itemId: 'comment-text',
    bind: {
      fieldLabel: '{i18n.document.comment.text}',
      value: '{text}'
    }
  }, {
    xtype: 'button',
    margin: 8,
    width: 728,
    bind: {
      text: '{saveLabel}'
    },
    listeners: {
      click: 'onSaveClick'
    }
  }, {
    xtype: 'documentrelationanswer',
    flex: 1
  }],

  resetForm: function() {
    var motionsCombo = this.down('#in-motions');
    var typeCombo = this.down('#result-types');
    var completeCheck = this.down('#is-complete');
    var textField = this.down('#comment-text');
    // motionsCombo.select(motionsCombo.getStore().getAt(0));
    motionsCombo.getStore().load();
    typeCombo.select(typeCombo.getStore().getAt(0));
    textField.setValue('');
    completeCheck.setValue(false);
  }
});
