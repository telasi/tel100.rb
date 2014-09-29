var Tel100 = {

  historyBack: function(evt) {
    evt.preventDefault();
    try {
      window.history.back();
    } catch(e) {
      console.log(e);
      var $this = $(this);
      var href = $this && typeof $this.attr === 'function' && $this.attr('href')
      if (href) { window.location = href; }
    }
  }

};
