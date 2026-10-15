const test = require('node:test');
const assert = require('node:assert/strict');

// Minimal DOM stub
let capturedHTML = '';
global.document = {
  createElement: (tag) => {
    return {
      tagName: tag.toUpperCase(),
      className: '',
      innerHTML: '',
      set innerHTML(value) { capturedHTML = value; },
      get innerHTML() { return capturedHTML; },
      addEventListener: () => {},
      remove: () => {},
      parentElement: { remove: () => {} }
    };
  },
  body: {
    appendChild: () => {}
  },
  getElementById: () => ({ addEventListener: () => {} })
};

// Require the vulnerable module (it should export showToast)
const { showToast } = require('../app.js');

test('XSS in toast is escaped', async (t) => {
  const malicious = '<script>alert(1)</script>';
  // Call with malicious title and message; other args are harmless
  showToast(malicious, malicious, malicious, 'info', () => {});
  // The raw <script> tag must not appear in the rendered HTML
  assert.ok(!capturedHTML.includes('<script>'), 'Raw <script> tag should be escaped');
  // The escaped version should be present
  assert.ok(capturedHTML.includes('&lt;script&gt;'), 'Escaped <script> should appear');
});
