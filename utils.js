"use strict";

var XPathEvaluator = require("./index");
var ReactInternals = require("./lib/ReactInternals");

var ALL_EVENTS = {
  compositionend: "onCompositionEnd",
  compositionstart: "onCompositionStart",
  compositionupdate: "onCompositionUpdate",
  keydown: "onKeyDown",
  keyup: "onKeyUp",
  keypress: "onKeyPress",
  contextmenu: "onContextMenu",
  dblclick: "onDoubleClick",
  doubleclick: "onDoubleClick",
  dragend: "onDragEnd",
  dragenter: "onDragEnter",
  dragexist: "onDragExit",
  dragleave: "onDragLeave",
  dragover: "onDragOver",
  dragstart: "onDragStart",
  mousedown: "onMouseDown",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  mousemove: "onMouseMove",
  mouseout: "onMouseOut",
  mouseover: "onMouseOver",
  mouseup: "onMouseUp",
  touchcancel: "onTouchCancel",
  touchend: "onTouchEnd",
  touchmove: "onTouchMove",
  touchstart: "onTouchStart",
  canplay: "onCanPlay",
  canplaythrough: "onCanPlayThrough",
  durationchange: "onDurationChange",
  loadeddata: "onLoadedData",
  loadedmetadata: "onLoadedMetadata",
  loadstart: "onLoadStart",
  ratechange: "onRateChange",
  timeupdate: "onTimeUpdate",
  volumechange: "onVolumeChange"
};

function handlerNameFromEvent(event) {
  return ALL_EVENTS[event] || "on" + event.charAt(0).toUpperCase() + event.slice(1);
}

var XPathUtils = {

  XPathResult: XPathEvaluator.XPathResult,

  evaluate: function(expression, element, type) {
    return XPathEvaluator.evaluate(expression, element, null, type);
  },

  find: function(element, expression) {
    // check params and swap if necessary, since parameters are in reverse order to evaluate()
    if (typeof element === "string") {
      var tmp = element;
      element = expression;
      expression = tmp;
    }

    var result = XPathEvaluator.evaluate(expression, element, null, XPathEvaluator.XPathResult.ANY_TYPE);

    switch (result.resultType) {
      case XPathEvaluator.XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        var results = [];
        var el;
        while ((el = result.iterateNext())) {
          results.push(el);
        }
        if (results.length > 1) {
          throw "Found multiple results with expression" + expression;
        }
        return results[0];
        
      case XPathEvaluator.XPathResult.STRING_TYPE:
        return result.stringValue;

      case XPathEvaluator.XPathResult.NUMBER_TYPE:
        return result.numberValue;

      case XPathEvaluator.XPathResult.BOOLEAN_TYPE:
        return result.booleanValue;
    }
  },
  
  findAny: function(element, expression) {
    // check params and swap if necessary, since parameters are in reverse order to evaluate()
    if (typeof element === "string") {
      var tmp = element;
      element = expression;
      expression = tmp;
    }

    var result = XPathEvaluator.evaluate(expression, element, null, XPathEvaluator.XPathResult.UNORDERED_NODE_ITERATOR_TYPE);
    
    var results = [];
    var el;
    while ((el = result.iterateNext())) {
      results.push(el);
    }
    return results;
  },

  simulate: function(element, event, eventData) {
    if (typeof element === "string") {
      var tmp = element;
      element = eventData;
      eventData = event;
      event = tmp;
    }

    if (!element) {
      element = eventData;
      eventData = null;
    }
    var eventName = handlerNameFromEvent(event);
    var handler = element.props[eventName];
    handler && handler(eventData);
    return !!handler;
  }

};

module.exports = XPathUtils;
