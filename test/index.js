const chai = require('chai');
const { generateDummySGICs, validateSGIC, maskString } = require('../index');

const expect = chai.expect;

describe('SG IC Utils Module', () => {
  describe('generateDummySGICs', () => {
    it('should generate a single SGIC', () => {
      const result = generateDummySGICs(1);
      expect(result).to.be.a("string");
      expect(validateSGIC(result)).to.be.true;
    });

    it('should generate multiple SGICs', () => {
      const count = 5;
      const result = generateDummySGICs(count);
      expect(result).to.be.an('array').with.lengthOf(count);
      result.forEach((sgic) => {
        expect(validateSGIC(sgic)).to.be.true;
      });
    });
  });

  describe('validateSGIC', () => {
    it('should validate a valid SGIC', () => {
      const validSGIC = generateDummySGICs();
      const result = validateSGIC(validSGIC);
      expect(result).to.be.true;
    });

    it('should not validate an invalid SGIC', () => {
      const invalidSGIC = 'InvalidSGIC123';
      const result = validateSGIC(invalidSGIC);
      expect(result).to.be.false;
    });
  });
});

describe('maskString', () => {
  it('should mask characters within the specified range', () => {
    const inputString = 'F1234567M';

    // Test with default range [4]
    const resultDefault = maskString(inputString);
    expect(resultDefault).to.equal('*****567M');

    // Test with custom range [2, 6]
    const resultCustom = maskString(inputString, [2, 6]);
    expect(resultCustom).to.equal('F1****67M');
  });

  it('should handle empty string gracefully', () => {
    const result = maskString('');
    expect(result).to.equal('');
  });

  it('should handle negative visibleRange gracefully', () => {
    const inputString = 'F1234567M';

    // Test with negative visibleRange
    const result = maskString(inputString, [-2]);
    expect(result).to.equal('F1*******');
  });

  it('should handle visibleRange exceeding string length gracefully', () => {
    const inputString = 'F1234567M';

    // Test with visibleRange exceeding string length
    const result = maskString(inputString, [0, 20]);
    expect(result).to.equal('*********');
  });
});
