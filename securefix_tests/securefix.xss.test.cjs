const assert = require('assert').strict;
// Minimal DOM mock
global.document = {
  body: { appendChild(){ } },
  getElementById(id) {
    return id === 'ai-chat-history' ? list : null;
  },
  createElement(tag) {
    const el = {
      tagName: tag.toUpperCase(),
      className: '',
      innerHTML: '',
      children: [],
      appendChild(child) { this.children.push(child); },
      scrollTop: 0,
      scrollHeight: 0,
    };
    return el;
  },
};
// Mock list element used by addAIChatMessage
const list = {
  children: [],
  appendChild(child) { this.lastChild = child; },
  scrollTop: 0,
  scrollHeight: 123,
};
// Load the vulnerable module (relative path may need adjustment)
const { addAIChatMessage } = require('../app.js');
// Invoke with malicious user text
addAIChatMessage('<script>alert(1)</script>', 'bot reply');
// After the call, the last added user container should have escaped content
assert.ok(list.lastChild, 'User container should be appended');
const userHTML = list.lastChild.innerHTML;
assert.ok(!userHTML.includes('<script>alert(1)</script>'), 'Raw script tag must not appear');
assert.ok(userHTML.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'Script tag must be escaped');
console.log('XSS regression test passed');