Ext.define('Telasi.store.document.Status', {
  extend: 'Ext.data.Store',
  fields: [ 'id', 'name', 'icon', 'class' ],
  data: [{
    id: Telasi.statuses.not_sent,
    name: 'გაუგზავნელი',
    name_sign: 'გაუგზავნელი',
    icon: 'fa-ban',
    class: 'text-muted'
  }, {
    id: Telasi.statuses.canceled,
    name: 'გაუქმებული',
    name_sign: 'ხელმოუწერელი',
    icon: 'fa-times',
    class: 'text-danger'
  }, {
    id: Telasi.statuses.draft,
    name: 'დრაფტი',
    name_sign: 'დრაფტი',
    icon: 'fa-circle-o',
    class: 'text-muted'
  }, {
    id: Telasi.statuses.current,
    name: 'მიმდინარე',
    name_sign: 'ხელმოსაწერი',
    icon: 'fa-clock-o',
    class: 'text-primary'
  }, {
    id: Telasi.statuses.completed,
    name: 'შესრულებული',
    name_sign: 'ხელმოწერილი',
    icon: 'fa-check',
    class: 'text-success'
  }]
}, function() {
  // create status store
  Ext.create('Telasi.store.document.Status', {
    storeId: 'document-statuses',
  });
});
