const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

// Read the source file
const code = fs.readFileSync('../app.js', 'utf8');

// Prepare a sandbox that mimics a minimal DOM environment
const sandbox = {
  capturedInnerHTML: '',
  document: {
    createElement: (tag) => {
      const el = { innerHTML: '' };
      if (tag === 'div') el.remove = () => {};
      return el;
    },
    body: {
      appendChild: function (el) {
        sandbox.capturedInnerHTML = el.innerHTML;
      }
    }
  }
};

// Run the script in the sandbox – this defines startPomodoroTimer on sandbox
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

// Invoke the function with a malicious title
sandbox.startPomodoroTimer(10, '<script>alert(1)</script>');

// Assert that the title was escaped, not injected raw
assert(!sandbox.capturedInnerHTML.includes('<script>'), 'Raw <script> tag should not appear');
assert(sandbox.capturedInnerHTML.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'Escaped script tag expected');
