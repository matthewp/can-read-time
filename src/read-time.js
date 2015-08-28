var Component = require("can/component/component");
var Map = require("can/map/map");
var stache = require("can/view/stache/stache");
require("can/map/define/define");
require("./read-time.css!");

var ReadTime = Map.extend({
  define: {
    /**
     * CSS selector for content
     */
    selector: {
      type: "string"
    },
    /**
     * Words per minute
     * Used to calculate the time it will
     * take to read the article
     */
    wpm: {
      type: "number"
    },
    /**
     * The time (in minutes) it will take to read the article
     */
    time: {
      get: function(){
        var wpm = +(this.attr("wpm") || 200);
        var words = this.attr("words");
        return words ?
          Math.ceil(this.attr("words") / wpm) : NaN;
      }
    }
  }
});

Component.extend({
  tag: "read-time",
  template: stache("{{time}}"),
  viewModel: ReadTime,
  events: {
    inserted: "setText",
    "{viewModel} selector": "setText",
    setText: function(){
      var scope = this.scope;
      var selector = scope.attr("selector");
      var text = can.$(selector)[0].textContent;
      scope.attr("words", text.split(" ").length);
    }
  }
});

