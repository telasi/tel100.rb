Ext.define('Telasi.store.document.Status', {
  extend: 'Ext.data.Store',
  fields: [ 'id', 'name', 'icon', 'class' ],
  data: [{
    id: Telasi.statuses.not_sent,
    name: 'გაუგზავნელი',
    icon: 'fa-ban',
    class: 'text-muted'
  }, {
    id: Telasi.statuses.canceled,
    name: 'გაუქმებული',
    icon: 'fa-times',
    class: 'text-danger'
  }, {
    id: Telasi.statuses.draft,
    name: 'დრაფტი',
    icon: 'fa-circle-o',
    class: 'text-muted'
  }, {
    id: Telasi.statuses.sent,
    name: 'მიმდინარე',
    icon: 'fa-clock-o',
    class: 'text-primary'
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
