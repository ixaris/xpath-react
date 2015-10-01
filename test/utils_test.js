/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathUtils = require("../utils");

/* eslint-disable no-unused-vars */
var React = require("react");

var Foo = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },

  render: function () {
    return (
      <div>
        <p>Hello world!</p>
        <button onClick={this.props.onClick}>
          Bar
        </button>
      </div>
    );
  }
});
/* eslint-enable no-unused-vars */

describe("XPathReact", function () {
  describe("Utils", function () {
    describe("render()", function () {
      it("should create a shallow rendering of a component", function () {
        var output = XPathUtils.render(<Foo />);

        Assert.equal(output.props.children[0].props.children, "Hello world!");
      });
    });

    describe("find()", function () {
      it("should return the first element matching the expression", function () {
        var output = XPathUtils.render(<Foo />);

        var p = XPathUtils.find(output, ".//p");

        Assert.equal(p.props.children, "Hello world!");
      });

      it("should return null when no elements match the expression", function () {
        var output = XPathUtils.render(<Foo />);

        var ul = XPathUtils.find(output, ".//ul");

        Assert.equal(ul, null);
      });

      it("should support returning string types", function () {
        var output = XPathUtils.render(<Foo />);

        var buttonText = XPathUtils.find(output, "string(.//p)");

        Assert.equal(buttonText, "Hello world!");
      });

      it("should support returning number types", function () {
        var output = XPathUtils.render(<Foo />);

        var nButtons = XPathUtils.find(output, "count(.//button)");

        Assert.equal(nButtons, 1);
      });

      it("should support returning boolean types", function () {
        var output = XPathUtils.render(<Foo />);

        var hasBarButton = XPathUtils.find(output, "count(.//button[contains(., 'Bar')]) = 1");

        Assert.equal(hasBarButton, true);
      });
    });

    describe("Simulate.<event>()", function () {
      it("should invoke the event handler of an element", function () {
        var wasInvoked = false;

        var onClick = function () {
          wasInvoked = true;
        };

        var output = XPathUtils.render(<Foo onClick={onClick} />);

        var button = XPathUtils.find(output, ".//button");

        XPathUtils.Simulate.click(button);

        Assert.equal(wasInvoked, true);
      });

      it("should throw an error when no event handler is present", function () {
        Assert.throws(function () {
          var output = XPathUtils.render(<Foo />);

          var button = XPathUtils.find(output, ".//button");

          XPathUtils.Simulate.mouseDown(button);
        }, /No event handler for onMouseDown/);
      });
    });
  });
});
