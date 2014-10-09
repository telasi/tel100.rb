Ext.application({
  name   : 'Telasi',
  width  : '100%',
  height : '100%',

  launch : function() {
    Ext.create('Ext.Panel', {
      renderTo     : Ext.getBody(),
      bodyPadding  : 5,
      title        : 'სათაური',
      html         : 'გამარჯობა, დიმიტრი'
    });
  }
});
