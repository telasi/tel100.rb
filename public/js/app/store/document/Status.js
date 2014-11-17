Ext.define('Telasi.store.document.Status', {
  extend: 'Ext.data.Store',
  fields: [ 'id', 'name', 'icon', 'class' ],
  data: [{
    id: Telasi.statuses.draft,
    name: 'დრაფტი',
    icon: 'fa-circle-o',
    class: 'text-muted'
  }, {
    id: Telasi.statuses.sent,
    name: 'გაგზავნილი',
    icon: 'fa-send-o',
    class: 'text-primary'
  }, {
    id: Telasi.statuses.canceled,
    name: 'გაუქმებული',
    icon: 'fa-times',
    class: 'text-danger'
  }, {
    id: Telasi.statuses.completed,
    name: 'შესრულებული',
    icon: 'fa-check',
    class: 'text-success'
  }]
}, function() {
  // create status store
  Ext.create('Telasi.store.document.Status', {
    storeId: 'document-statuses',
  });
});
