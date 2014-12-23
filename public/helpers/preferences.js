var preferenceStore;

var getStore = function() {
  if (!preferenceStore) {
    preferenceStore = new Ext.util.LocalStorage({
      id: 'preferences'
    });
  }
  return preferenceStore;
};

var getValue = function(key, defValue) {
  var store = getStore();
  var value = store.getItem(key);
  if (!value && typeof defValue !== 'undefined') {
    value = defValue;
  }
  return value;
};

var setValue = function(key, value) {
  var store = getStore();
  store.setItem(key, value);
};

module.exports = {
  getValue: getValue,
  setValue: setValue
};
