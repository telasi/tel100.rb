Ext.define("Telasi.component.common.FitWindow", {
    extend: "Ext.Window",
    hMargin: 50,
    vMargin: 50,
    constructor: function(config) {
        function computeSizes() {
            var W = window.innerWidth || document.body.offsetWidth || 0;
            var H = window.innerHeight || document.body.offsetHeight || 0;
            W -= hMargin * 2;
            H -= vMargin * 2;
            return [W, H]
        }

        function resize() {
            var sizes = computeSizes();
            var W = sizes[0];
            var H = sizes[1];
            that.setWidth(W);
            that.setHeight(H);
            that.center()
        }
        var that = this;
        that.callParent(arguments);
        if (that.autoShow) Ext.EventManager.onWindowResize(resize);
        that.on({
            show: function() {
                Ext.EventManager.onWindowResize(resize)
            },
            hide: function() {
                Ext.EventManager.removeResizeListener(resize)
            },
            destroy: function() {
                Ext.EventManager.removeResizeListener(resize)
            }
        });
        config = config || {};
        var hMargin = config.hMargin || this.hMargin;
        var vMargin = config.vMargin || this.vMargin;
        resize()
    }
});