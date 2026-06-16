const assert = require('assert');
const servicesCategory = require('../../services/servicesCategory');

describe('Category Service', () => {
  it('should export allCategory as a function', () => {
    assert.strictEqual(typeof servicesCategory.allCategory, 'function');
  });

  it('should export oneCategory as a function', () => {
    assert.strictEqual(typeof servicesCategory.oneCategory, 'function');
  });

  it('should export createCategory as a function', () => {
    assert.strictEqual(typeof servicesCategory.createCategory, 'function');
  });

  it('should export updateCategory as a function', () => {
    assert.strictEqual(typeof servicesCategory.updateCategory, 'function');
  });

  it('should export deleteCategory as a function', () => {
    assert.strictEqual(typeof servicesCategory.deleteCategory, 'function');
  });

  it('all functions should be different references', () => {
    const funcs = [servicesCategory.allCategory, servicesCategory.oneCategory,
      servicesCategory.createCategory, servicesCategory.updateCategory,
      servicesCategory.deleteCategory];
    const unique = new Set(funcs);
    assert.strictEqual(unique.size, funcs.length, 'Each function should be unique');
  });
});
