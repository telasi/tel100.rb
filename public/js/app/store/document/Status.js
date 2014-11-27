Ext.define('Telasi.store.document.Status', {
  extend: 'Ext.data.Store',
  fields: [ 'id', 'name', 'icon', 'class' ],
  data: [{ // გაუქმებული
    id: Telasi.statuses.canceled,
    name: 'გაუქმებული',
    name_sign: 'ხელმოუწერელი',
    name_motion: 'გაუქმებული',
    name_motion_sign: 'ხელმოუწერელი',
    icon: 'fa-times',
    class: 'text-danger'
  }, { // გაუგზავნელი
    id: Telasi.statuses.not_sent,
    name: 'გაუგზავნელი',
    name_sign: 'გაუგზავნელი',
    name_motion: 'გაუგზავნელი',
    name_motion_sign: 'გაუგზავნელი',
    icon: 'fa-ban',
    class: 'text-muted'
  }, { // დრაფტი
    id: Telasi.statuses.draft,
    name: 'დრაფტი',
    name_sign: 'დრაფტი',
    name_motion: 'გასაგზავნი',
    name_motion_sign: 'ხელმოსაწერი',
    icon: 'fa-circle-o',
    class: 'text-muted'
  }, { // მიმდინარე
    id: Telasi.statuses.current,
    name: 'მიმდინარე',
    name_sign: 'ხელმოსაწერი',
    name_motion: 'მიმდინარე',
    name_motion_sign: 'ხელმოსაწერი',
    icon: 'fa-clock-o',
    class: 'text-primary'
  }, { // შესრულებული
    id: Telasi.statuses.completed,
    name: 'შესრულებული',
    name_sign: 'ხელმოწერილი',
    name_motion: 'შესრულებული',
    name_motion_sign: 'ხელმოწერილი',
    icon: 'fa-check',
    class: 'text-success'
  }]
}, function() {
  // create status store
  Ext.create('Telasi.store.document.Status', {
    storeId: 'document-statuses',
  });
});
