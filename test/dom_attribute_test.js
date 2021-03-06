"use strict";

var React = require("react");
var ReactDom = require("react-dom");

var Helper = require("./helper");

var jsdom = require("jsdom");

global.document = jsdom.jsdom("");
global.window = document.defaultView;
global.navigator = window.navigator;

var Doc = React.createClass({
  render: function () {
    return (
      <div>
        <blockquote
            title='CodeRepos'
            cite='http://coderepos.org/'>
          <p title='paragraph' id='paragraph'>
            <br id='pSib' />
            <input name='foo' id='bar' className='input-1' />
            <input name='bar' id='foo' className='input-2' />
            <img name='hoge' id='fuga' className='img-1' />
            <img name='fuga' id='hoge' className='img-2' />
            <br id='nSib' />
            Share your codes!
            <input htmlFor='foo' />
          </p>
          <cite className='cite site'>
            <a title='CodeRepos' href='http://coderepos.org/'>CodeRepos</a>
          </cite>
        </blockquote>
      </div>
    );
  }
});

var div = document.createElement("div");
document.body.appendChild(div);
var output = ReactDom.render(<Doc />, div);

var assertEvaluatesToNodeSet = Helper.assertEvaluatesToNodeSet.bind(null, output);

var assertEvaluatesToValue = Helper.assertEvaluatesToValue.bind(null, output);

suite("XPathReact", function () {
  suite("attribute", function () {
    test("00", function () {
      assertEvaluatesToNodeSet("//blockquote['http://coderepos.org/'=@cite]", ["blockquote"]);
    });

    test("01", function () {
      assertEvaluatesToNodeSet("/descendant::*['CodeRepos'=@title]", ["blockquote", "a"]);
    });

    test("02", function () {
      assertEvaluatesToNodeSet("//*[@class]", ["input", "input", "img", "img", "cite"]);
    });

    test("03", function () {
      assertEvaluatesToNodeSet("/descendant::node()[@title]", ["blockquote", "p", "a"]);
    });

    test("04", function () {
      assertEvaluatesToNodeSet("//div/*[@title]", ["blockquote"]);
    });

    test("05", function () {
      assertEvaluatesToNodeSet("//blockquote/node()[@title]", ["p"]);
    });

    test("06", function () {
      assertEvaluatesToNodeSet("//cite[@class='cite']", []);
    });

    test("07", function () {
      assertEvaluatesToNodeSet("//cite[@class='site']", []);
    });

    test("08", function () {
      assertEvaluatesToNodeSet("//cite[@class='cite site']", ["cite"]);
    });

    test("09", function () {
      assertEvaluatesToNodeSet("//*[@id='paragraph']", ["p"]);
    });

    test("10", function () {
      assertEvaluatesToNodeSet("//div//*[@id='paragraph']", ["p"]);
    });

    test("11", function () {
      assertEvaluatesToNodeSet("//*[@id='bar']", ["input.input-1"]);
    });

    test("12", function () {
      assertEvaluatesToNodeSet("//*[@name='foo']", ["input.input-1"]);
    });

    test("13", function () {
      assertEvaluatesToNodeSet("//*[@id='foo']", ["input.input-2"]);
    });

    test("14", function () {
      assertEvaluatesToNodeSet("//*[@name='bar']", ["input.input-2"]);
    });

    test("15", function () {
      assertEvaluatesToNodeSet("//p/node()[@id='bar']", ["input.input-1"]);
    });

    test("16", function () {
      assertEvaluatesToNodeSet("//p/node()[@name='foo']", ["input.input-1"]);
    });

    test("17", function () {
      assertEvaluatesToNodeSet("//p/node()[@id='foo']", ["input.input-2"]);
    });

    test("18", function () {
      assertEvaluatesToNodeSet("//p/node()[@name='bar']", ["input.input-2"]);
    });

    test("19", function () {
      assertEvaluatesToNodeSet("id('pSib')/following-sibling::*[@id][1]", ["input.input-1"]);
    });

    test("20", function () {
      assertEvaluatesToNodeSet("id('nSib')/preceding-sibling::*[@id][1]", ["img.img-2"]);
    });

    test("21", function () {
      assertEvaluatesToNodeSet("id('pSib')/following-sibling::*[@id='foo']", ["input.input-2"]);
    });

    test("22", function () {
      assertEvaluatesToNodeSet("id('nSib')/preceding-sibling::*[@id='foo']", ["input.input-2"]);
    });

    test("23", function () {
      assertEvaluatesToNodeSet("id('pSib')/following::*[@id='foo']", ["input.input-2"]);
    });

    test("24", function () {
      assertEvaluatesToNodeSet("id('nSib')/preceding::*[@id='foo']", ["input.input-2"]);
    });

    test("25", function () {
      assertEvaluatesToNodeSet("/descendant::*[@id='foo']", ["input.input-2"]);
    });

    test("26", function () {
      assertEvaluatesToNodeSet("/descendant-or-self::*[@id='foo']", ["input.input-2"]);
    });

    test("27", function () {
      assertEvaluatesToNodeSet("id('hoge')/self::*[@id='hoge']", ["img.img-2"]);
    });

    test("28", function () {
      assertEvaluatesToNodeSet("id('foo')/self::*[@id='foo']", ["input.input-2"]);
    });

    test("29", function () {
      assertEvaluatesToNodeSet("id('foo')/parent::*[@id='paragraph']", ["p"]);
    });

    test("30", function () {
      assertEvaluatesToNodeSet("id('foo')/ancestor::*[@id='paragraph']", ["p"]);
    });

    test("31", function () {
      assertEvaluatesToNodeSet("id('foo')/ancestor-or-self::*[@id='paragraph']", ["p"]);
    });

    test("32", function () {
      assertEvaluatesToNodeSet("//*[./@title='CodeRepos']", ["blockquote", "a"]);
    });

    test("33", function () {
      assertEvaluatesToNodeSet("//node()[./@class]", ["input", "input", "img", "img", "cite"]);
    });

    test("34", function () {
      assertEvaluatesToNodeSet("/descendant::node()[./@title]", ["blockquote", "p", "a"]);
    });

    test("35", function () {
      assertEvaluatesToNodeSet("/descendant::blockquote/*[./@title]", ["p"]);
    });

    test("36", function () {
      assertEvaluatesToNodeSet("//blockquote[@*='http://coderepos.org/']", ["blockquote"]);
    });

    test("37", function () {
      assertEvaluatesToNodeSet("//node()[@*='http://coderepos.org/']", ["blockquote", "a"]);
    });

    test("38", function () {
      assertEvaluatesToNodeSet("//*[./@*='http://coderepos.org/']", ["blockquote", "a"]);
    });

    test("39", function () {
      assertEvaluatesToNodeSet("//*[(@href|@cite)='http://coderepos.org/']", ["blockquote", "a"]);
    });

    test("40", function () {
      assertEvaluatesToValue("count(//blockquote/@*) = count(//blockquote/@* | //blockquote/@*)", true);
    });

    test("41", function () {
      assertEvaluatesToNodeSet("//cite[./@class='cite']", []);
    });

    test("42", function () {
      assertEvaluatesToNodeSet("//cite[./@class='site']", []);
    });

    test("43", function () {
      assertEvaluatesToNodeSet("//cite[./@class='cite site']", ["cite"]);
    });

    test("44", function () {
      assertEvaluatesToNodeSet("//*[./@id='paragraph']", ["p"]);
    });

    test("45", function () {
      assertEvaluatesToNodeSet("//blockquote//*[./@id='paragraph']", ["p"]);
    });

    test("46", function () {
      assertEvaluatesToNodeSet("//*[./@id='bar']", ["input.input-1"]);
    });

    test("47", function () {
      assertEvaluatesToNodeSet("//*[./@name='foo']", ["input.input-1"]);
    });

    test("48", function () {
      assertEvaluatesToNodeSet("//*[./@id='foo']", ["input.input-2"]);
    });

    test("49", function () {
      assertEvaluatesToNodeSet("//*[./@name='bar']", ["input.input-2"]);
    });

    test("50", function () {
      assertEvaluatesToNodeSet("//p/node()[./@id='bar']", ["input.input-1"]);
    });

    test("51", function () {
      assertEvaluatesToNodeSet("//p/node()[./@name='foo']", ["input.input-1"]);
    });

    test("52", function () {
      assertEvaluatesToNodeSet("//p/node()[./@id='foo']", ["input.input-2"]);
    });

    test("53", function () {
      assertEvaluatesToNodeSet("//p/node()[./@name='bar']", ["input.input-2"]);
    });

    test("54", function () {
      assertEvaluatesToNodeSet("//node()[./@id='bar']", ["input.input-1"]);
    });

    test("55", function () {
      assertEvaluatesToNodeSet("//node()[./@name='foo']", ["input.input-1"]);
    });

    test("56", function () {
      assertEvaluatesToNodeSet("//node()[./@id='foo']", ["input.input-2"]);
    });

    test("57", function () {
      assertEvaluatesToNodeSet("//node()[./@name='bar']", ["input.input-2"]);
    });

    test("58", function () {
      assertEvaluatesToNodeSet("id('pSib')/following-sibling::*[./@id][1]", ["input.input-1"]);
    });

    test("59", function () {
      assertEvaluatesToNodeSet("id('nSib')/preceding-sibling::*[./@id][1]", ["img.img-2"]);
    });

    test("60", function () {
      assertEvaluatesToNodeSet("id('pSib')/following-sibling::*[./@id='foo']", ["input.input-2"]);
    });

    test("61", function () {
      assertEvaluatesToNodeSet("id('nSib')/preceding-sibling::*[./@id='foo']", ["input.input-2"]);
    });

    test("62", function () {
      assertEvaluatesToNodeSet("id('pSib')/following::*[./@id='foo']", ["input.input-2"]);
    });

    test("63", function () {
      assertEvaluatesToNodeSet("id('nSib')/preceding::*[./@id='foo']", ["input.input-2"]);
    });

    test("64", function () {
      assertEvaluatesToNodeSet("/descendant::*[./@id='foo']", ["input.input-2"]);
    });

    test("65", function () {
      assertEvaluatesToNodeSet("/descendant-or-self::*[./@id='foo']", ["input.input-2"]);
    });

    test("66", function () {
      assertEvaluatesToNodeSet("id('foo')/self::*[./@id='foo']", ["input.input-2"]);
    });

    test("67", function () {
      assertEvaluatesToNodeSet("id('foo')/parent::*[./@id='paragraph']", ["p"]);
    });

    test("68", function () {
      assertEvaluatesToNodeSet("id('foo')/ancestor::*[./@id='paragraph']", ["p"]);
    });

    test("69", function () {
      assertEvaluatesToNodeSet("id('foo')/ancestor-or-self::*[./@id='paragraph']", ["p"]);
    });

    test("70", function () {
      assertEvaluatesToNodeSet("/descendant::node()[@for]", ["input"]);
    });
  });
});
