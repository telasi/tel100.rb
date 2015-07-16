Ext.define('Ext.view.NavigationModel.Override', { 
  override: 'Ext.view.NavigationModel', 
  onContainerMouseDown: function(view, mousedownEvent) { 
    var el = Ext.fly(mousedownEvent.target), isField = el.hasCls('x-form-field') || el.hasCls('x-field'); 
    if (isField) { 
      return true 
    }; 
    mousedownEvent.preventDefault(); 
  } 
});