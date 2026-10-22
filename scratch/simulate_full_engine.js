const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scripts = [...html.matchAll(/<script(?:\s+type="text\/javascript"|\s+defer)?\s*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
const engineCode = scripts[1];

const allIds = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const mockElements = {};
allIds.forEach(id => {
  mockElements[id] = {
    id,
    tagName: 'DIV',
    classList: {
      _classes: new Set(),
      add: function(...cls) { cls.forEach(c => this._classes.add(c)); },
      remove: function(...cls) { cls.forEach(c => this._classes.delete(c)); },
      contains: function(c) { return this._classes.has(c); },
      toggle: function(c) { if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c); }
    },
    style: {},
    innerHTML: '',
    textContent: '',
    value: '',
    checked: false,
    disabled: false,
    children: [],
    appendChild: function(ch) { this.children.push(ch); },
    setAttribute: function() {},
    getAttribute: function() { return ''; },
    focus: function() {},
    scrollIntoView: function() {},
    addEventListener: function() {},
    querySelector: function(sel) {
      return {
        classList: {
          add: () => {},
          remove: () => {},
          contains: () => false
        }
      };
    },
    querySelectorAll: function() { return []; }
  };
});

const vm = require('vm');
const context = {
  console: console,
  window: {
    scrollTo: () => {},
    addEventListener: () => {},
    location: { href: 'http://localhost:5000' }
  },
  history: {
    pushState: () => {}
  },
  document: {
    getElementById: (id) => mockElements[id] || null,
    querySelectorAll: () => [],
    querySelector: () => null,
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      classList: { add: () => {}, remove: () => {} },
      style: {},
      innerHTML: '',
      textContent: '',
      appendChild: () => {},
      setAttribute: () => {},
      addEventListener: () => {}
    }),
    createDocumentFragment: () => ({
      children: [],
      appendChild: function(c) { this.children.push(c); }
    }),
    body: { classList: { add: () => {}, remove: () => {} } }
  },
  localStorage: {
    _data: {},
    getItem: function(k) { return this._data[k] || null; },
    setItem: function(k, v) { this._data[k] = v; },
    removeItem: function(k) { delete this._data[k]; }
  },
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  Date: Date,
  Math: Math,
  Number: Number,
  String: String,
  Array: Array,
  Object: Object,
  Map: Map,
  Set: Set,
  JSON: JSON,
  RegExp: RegExp
};

vm.createContext(context);
vm.runInContext(engineCode, context);
console.log('Engine loaded successfully!');

const testsToTest = ['FR_FULL_MOCK', 'AFM_FULL_MOCK', 'AUDIT_FULL_MOCK', 'CEL_FULL_MOCK', 'ALL', 'REAL_PAPER_1', 'REAL_PAPER_2', 'REAL_PAPER_3', 'REAL_PAPER_4', 'REAL_PAPER_5', 'REAL_PAPER_6', 1, 2, 3, 4, 5, 6];

testsToTest.forEach(key => {
  try {
    context.openPreTestInstructions(key);
    context.launchCbtExam();
    console.log(`[SUCCESS] ${key}: Qs=${context.currentTestQuestions.length}, Title="${context.document.getElementById('cbtExamTitle').textContent.substring(0, 40)}"`);
  } catch (err) {
    console.error(`[CRASH] ${key}:`, err);
  }
});
