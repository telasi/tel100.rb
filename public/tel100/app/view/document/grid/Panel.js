Ext.define('Tel100.view.document.grid.Panel', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.documentgridpanel',
  controller: 'documentgridpanel',

  viewModel: {
    type: 'documentgridpanel'
  },

  border: false,
  enableColumnHide: false,
  enableColumnMove: false,
  sortableColumns: false,
  defaultListenerScope: true,

  bind: {
    store: '{documents}'
  },

  viewConfig: {
    getRowClass: function(record, rowIndex, rowParams, store) {
      var status = record.get('status');
      var statusClass = helpers.document.status.documentStatusRowClass(status, record);

      var isChanged = record.get('is_changed');
      if (isChanged) {
        statusClass += ' text-unread';
      }

      if (record.get('due_is_over')) {
        statusClass += ' danger';
      } else if (record.get('has_due_date')) {
        statusClass += ' warning';
      }

      return statusClass;
    },

    plugins: [{
      ptype: 'gridviewdragdrop',
      pluginId: 'draganddropplug',
      ddGroup: 'Grid2FolderDDGroup',
      enableDrop: false
    }]
  },

  columns: [{
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      var text = value;
      if(record.get('is_reply')){
        text = ['<i class="fa fa-reply"></i>', value].join(' ');
      }

      return [text, record.get('typeName')].join('<br>');
    },
    width: 100,
    sortable: false,
    dataIndex: 'docnumber',
    hideable: false,
    lockable: false,
    bind: {
      text: '{i18n.document.base.docnumber}'
    }
  }, {
    xtype: 'gridcolumn',
    width: 100,
    sortable: false,
    dataIndex: 'docnumber2',
    hideable: false,
    lockable: false,
    bind: {
      text: '{i18n.document.base.docnumber2}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      if (record.get('as_signee') === 1) {
        return '<strong class="text-danger">' + i18n.document.comment.actions.sign +'</strong>';
      } else if (record.get('as_author') === 1) {
        return '<strong class="text-danger">' + i18n.document.comment.actions.author +'</strong>';
      }
    },
    lockable: false,
    bind: {
      text: '{i18n.document.base.actions}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      var text = [];
      text.push(value); // status
      var dueDate = record.get('current_due_date');
      if (dueDate) {
        text.push('<span class="text-warning"><i class="fa fa-warning"></i> <strong>' +
        Ext.Date.format(new Date(dueDate), 'd/m/Y') + '</strong></span>');
      }
      text.push(record.get('directionName')); // direction
      return text.join('<br>');
    },
    width: 130,
    sortable: false,
    dataIndex: 'statusName',
    hideable: false,
    bind: {
      text: '{i18n.document.base.status}<br>{i18n.document.base.direction}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      // date formatted
      var dateFormatted;
      if (value) {
        dateFormatted = Ext.Date.format(value,"d/m/Y");
      }

      // status value
      var mystat = helpers.document.user.myStatus(record);
      var iconText;
      if (mystat.unread) {
        iconText = '<i class="fa fa-circle text-danger"></i>';
      } else {
        iconText = '<i class="fa ' + mystat.icon + '"></i>';
      }
      var myStatus =  ['<span class="' + mystat.style + '">',
        iconText + ' ', mystat.name, '</span>'].join('');

      // concat both fields
      return [ myStatus, dateFormatted ].join('<br>');
    },
    width: 150,
    sortable: false,
    dataIndex: 'docdate',
    hideable: false,
    bind: {
      text: '{i18n.document.base.my_status}<br>{i18n.document.base.docdate}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return helpers.document.motion.formatReceivers(value, metaData, { prefix: 'assignee' });
    },
    width: 200,
    sortable: false,
    cellWrap: true,
    dataIndex: 'assignees',
    hideable: false,
    bind: {
      text: '{i18n.document.base.assignees}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return helpers.document.motion.formatReceivers(value, metaData, { prefix: 'author' });
    },
    width: 200,
    sortable: false,
    cellWrap: true,
    dataIndex: 'authors',
    hideable: false,
    bind: {
      text: '{i18n.document.base.authors}'
    }
  }, {
    xtype: 'gridcolumn',
    width: 150,
    sortable: false,
    dataIndex: 'subject',
    hideable: false,
    bind: {
      text: '{i18n.document.base.subject}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return helpers.document.motion.formatReceivers(value, metaData, { prefix: 'signee' });
    },
    width: 200,
    sortable: false,
    cellWrap: true,
    dataIndex: 'signees',
    hideable: false,
    bind: {
      text: '{i18n.document.base.signees}'
    }
  }, {
    xtype: 'gridcolumn',
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      return helpers.document.motion.formatResponses(value, metaData);
    },
    width: 200,
    dataIndex: 'incoming',
    bind: {
      text: '{i18n.document.base.response}'
    }
  }, {
    xtype: 'gridcolumn',
    sortable: false,
    dataIndex: 'original_number',
    hideable: false,
    bind: {
      text: '{i18n.document.base.original_number}'
    }
  }, {
    xtype: 'gridcolumn',
    dataIndex: 'original_date',
    formatter: 'date("d/m/Y")',
    hideable: false,
    bind: {
      text: '{i18n.document.base.original_date}'
    }
  }],

  listeners: {
    beforeitemcontextmenu: {
      fn: 'onGridpanelBeforeItemContextMenu',
      scope: 'controller'
    },
    afterrender: {
      fn: 'onGridpanelAfterRender',
      scope: 'controller'
    },
    celldblclick: 'onGridpanelCellDblClick'
  },

  onGridpanelCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var actionIndex = 1; // index of sign column
    if (cellIndex === actionIndex && record.get('as_signee') === 1) {
      this.fireEvent('documentsign', record);
    } else if (cellIndex === actionIndex && record.get('as_author') === 1) {
      this.fireEvent('documentauthor', record);
    } else {
      this.fireEvent('documentopen', record);
    }
  },

  refresh: function(opts) {
    var grid = this;
    var store = grid.getStore();
    store.load(opts);
  }
});
