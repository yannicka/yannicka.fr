// Generated by CoffeeScript 1.7.1
(function() {
  var codes, html, keywords, pre, pres, token, tokenize, tokens, zones, _i, _j, _len, _len1,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  keywords = ['if', 'else', 'switch', 'when', 'loop', 'while', 'do', 'for', 'class', 'use', 'false', 'true', 'and', 'or', 'not', 'in', 'pack', 'extends', 'break', 'continue', 'null', 'as', 'from', 'to', 'by', 'public', 'private', 'protected', 'final', 'const', 'type', 'static', '_'];

  tokenize = function(code) {
    var i, next_el, pt, tok, tokens, _ref, _ref1, _ref2, _ref3;
    code = code.replace(/&lt;/g, '<');
    code = code.replace(/&gt;/g, '>');
    tokens = [];
    pt = 0;
    while (true) {
      if (code[pt].match(/[a-z@_]/)) {
        tok = '';
        while (true) {
          tok += code[pt++];
          if (pt >= code.length || !code[pt].match(/[a-zA-Z0-9_]/)) {
            break;
          }
        }
        pt--;
        if (__indexOf.call(keywords, tok) >= 0) {
          tokens.push({
            value: tok,
            type: 'keyword'
          });
        } else {
          tokens.push({
            value: tok,
            type: 'identifier'
          });
        }
      } else if (code[pt].match(/[A-Z_]/)) {
        tok = '';
        while (true) {
          tok += code[pt++];
          if (pt >= code.length || !code[pt].match(/[a-zA-Z0-9_]/)) {
            break;
          }
        }
        pt--;
        tokens.push({
          value: tok,
          type: 'identifier-class'
        });
      } else if (code[pt].match(/[0-9]/)) {
        tok = '';
        while (true) {
          tok += code[pt++];
          if (pt >= code.length || !code[pt].match(/[0-9\.]/)) {
            break;
          }
        }
        pt--;
        tokens.push({
          value: tok,
          type: 'number'
        });
      } else if (code[pt] === '"') {
        tok = '';
        i = 0;
        while (true) {
          tok += code[pt++];
          i++;
          if (pt >= code.length || code[pt] === '"' || i > 200) {
            break;
          }
        }
        tok += '"';
        tokens.push({
          value: tok,
          type: 'string'
        });
      } else if (code[pt] === '#') {
        tok = '';
        while (true) {
          tok += code[pt++];
          if (pt >= code.length || code[pt].match(/\n/)) {
            break;
          }
        }
        pt--;
        tokens.push({
          value: tok,
          type: 'comment'
        });
      } else if ((_ref = code[pt]) === '+' || _ref === '-' || _ref === '*' || _ref === '/' || _ref === '%' || _ref === '^' || _ref === '=') {
        next_el = code[pt + 1];
        if (next_el === '=' || (code[pt] === next_el && ((_ref1 = code[pt]) === '+' || _ref1 === '-'))) {
          tokens.push({
            value: code[pt] + next_el,
            type: 'op'
          });
          pt++;
        } else {
          tokens.push({
            value: code[pt],
            type: 'op'
          });
        }
      } else if ((_ref2 = code[pt]) === ',' || _ref2 === ';' || _ref2 === '.' || _ref2 === '(' || _ref2 === ')' || _ref2 === '{' || _ref2 === '}' || _ref2 === '[' || _ref2 === ']' || _ref2 === '?' || _ref2 === ':') {
        tokens.push({
          value: code[pt],
          type: 'op'
        });
      } else if ((_ref3 = code[pt]) === '<' || _ref3 === '>') {
        next_el = code[pt + 1];
        if ((code[pt] === '<' && next_el === '>') || code[pt] === next_el || next_el === '=') {
          tokens.push({
            value: code[pt] + next_el,
            type: 'op'
          });
          pt++;
        } else {
          tokens.push({
            value: code[pt],
            type: 'op'
          });
        }
      } else if (code[pt] === ':') {
        next_el = code[pt + 1];
        if (code[pt] === next_el) {
          tokens.push({
            value: code[pt] + next_el,
            type: 'op'
          });
          pt++;
        } else {
          tokens.push({
            value: code[pt],
            type: 'op'
          });
        }
      } else {
        tokens.push({
          value: code[pt],
          type: 'txt'
        });
      }
      pt++;
      if (pt >= code.length) {
        break;
      }
    }
    return tokens;
  };

  pres = document.getElementsByTagName('pre');

  codes = document.getElementsByTagName('code');

  zones = [].concat(Array.prototype.slice.call(pres), Array.prototype.slice.call(codes));

  for (_i = 0, _len = zones.length; _i < _len; _i++) {
    pre = zones[_i];
    tokens = tokenize(pre.innerHTML);
    html = '';
    for (_j = 0, _len1 = tokens.length; _j < _len1; _j++) {
      token = tokens[_j];
      html += (function() {
        switch (token.type) {
          case 'keyword':
            return "<span class=\"sc-keyword\">" + token.value + "</span>";
          case 'op':
            return "<span class=\"sc-op\">" + token.value + "</span>";
          case 'identifier':
            return "<span class=\"sc-identifier\">" + token.value + "</span>";
          case 'number':
            return "<span class=\"sc-number\">" + token.value + "</span>";
          case 'string':
            return "<span class=\"sc-string\">" + token.value + "</span>";
          case 'comment':
            return "<span class=\"sc-comment\">" + token.value + "</span>";
          case 'identifier-class':
            return "<span class=\"sc-identifier-class\">" + token.value + "</span>";
          default:
            return token.value;
        }
      })();
    }
    pre.innerHTML = html;
  }

}).call(this);
