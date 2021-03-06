"use strict";

var React = require("react");

var Helper = require("./helper");

var Doc = React.createClass({
  render: function () {
    return (
      <html>
        <body>
          <div id='id1'>foo</div>
          <div id='id2'>bar</div>
          <div id='id3'>baz</div>
          <div id='id4'>
            <div id='id4-1'>foo</div>
            <div id='id4-2'>bar</div>
            <div id='id4-3'>baz</div>
          </div>
          <table>
            <tbody>
              <tr id='id5'>
                <td>1</td> <td>2</td>
              </tr>
              <tr id='id6'>
                <td>1</td> <td>2</td>
              </tr>
              <tr id='id7'>
                <td>1</td> <td>2</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr id='id8'>
                <td>1</td> <td>2</td>
              </tr>
              <tr id='id9'>
                <td>1</td> <td>2</td>
              </tr>
              <tr id='id0'>
                <td>1</td> <td>2</td>
              </tr>
            </tbody>
          </table>
          <p id='ppp'>1</p>
        </body>
      </html>
    );
  }
});

var document = Helper.render(<Doc/>);

var assertEvaluatesToNodeSet = Helper.assertEvaluatesToNodeSet.bind(null, document);

var assertEvaluatesToValue = Helper.assertEvaluatesToValue.bind(null, document);

suite("XPathReact", function () {
  suite("misc", function () {
    test("00", function () {
      assertEvaluatesToNodeSet("//div[2]", ["div#id2", "div#id4-2"]);
    });

    test("01", function () {
      assertEvaluatesToNodeSet("/descendant::div[2]", ["div#id2"]);
    });

    test("02", function () {
      assertEvaluatesToNodeSet("(//div)[2]", ["div#id2"]);
    });

    test("03", function () {
      assertEvaluatesToNodeSet("//tr[2]", ["tr#id6", "tr#id9"]);
    });

    test("04", function () {
      assertEvaluatesToNodeSet("/descendant::tr[2]", ["tr#id6"]);
    });

    test("05", function () {
      assertEvaluatesToNodeSet("(//tr)[2]", ["tr#id6"]);
    });

    test("07", function () {
      assertEvaluatesToNodeSet("id('ppp')[true()]", ["p#ppp"]);
    });

    test("08", function () {
      assertEvaluatesToValue("number(id('ppp')[true()])", 1);
    });

    test("09", function () {
      assertEvaluatesToValue("id('ppp')[true()] + 1", 2);
    });
  });
});
