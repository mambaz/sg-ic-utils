const chai = require('chai');
const { generateDummySGICs, validateSGIC } = require('../index');

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
