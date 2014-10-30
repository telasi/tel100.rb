Ext.define('Telasi.model.document.Motion', {
  extend: 'Telasi.model.Base',
  requires: [
    'Telasi.model.Base'
  ],

  fields: [
    { name: 'id', type: 'int' },
    {
      name: 'documentId',
      type: 'int',
      reference: {
        type: 'document.Base',
        role: 'document',
        inverse: 'motions',
        association: 'motions'
      }
    },
    { name: 'motion_text' },
    { name: 'response_text' },
    {
      name: 'receiverId',
      type: 'int'
    },
  ]
});
