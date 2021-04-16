'use strict';

const { expect } = require('chai');
const cloudformationSchema = require('../cloudformation-schema');

describe('cloudformation-schema', () => {
  it('should contain schema', () => {
    expect(Object.keys(cloudformationSchema)).to.be.eql([
      'implicit',
      'explicit',
      'compiledImplicit',
      'compiledExplicit',
      'compiledTypeMap',
    ]);
  });

  it('should compile AWS Cloudformation short-hand syntax to long Fn:: syntax', () => {
    const importValueTypes = cloudformationSchema.explicit.filter(
      (type) => type.tag === '!ImportValue'
    );
    expect(importValueTypes.pop().construct('MyImportedValue')).to.be.eql({
      'Fn::ImportValue': 'MyImportedValue',
    });
  });

  it('should compile AWS Cloudformation short-hand syntax to normal syntax without Fn:: for Ref', () => {
    const refTypes = cloudformationSchema.explicit.filter((type) => type.tag === '!Ref');
    expect(refTypes.pop().construct('MyRef')).to.be.eql({ Ref: 'MyRef' });
  });

  it('should compile AWS Cloudformation short-hand syntax to normal syntax without Fn:: for Condition', () => {
    const conditionTypes = cloudformationSchema.explicit.filter(
      (type) => type.tag === '!Condition'
    );
    expect(conditionTypes.pop().construct('MyCondition')).to.be.eql({ Condition: 'MyCondition' });
  });

  it('should compile AWS Cloudformation short-hand syntax to dotted syntax for GetAtt', () => {
    const getAttTypes = cloudformationSchema.explicit.filter((type) => type.tag === '!GetAtt');
    expect(getAttTypes.pop().construct('MyResource.Arn')).to.be.eql({
      'Fn::GetAtt': ['MyResource', 'Arn'],
    });
  });

  describe('!merge tag', () => {
    const mergeType = cloudformationSchema.explicit.filter((type) => type.tag === '!merge').pop();

    it('should fail if the input data is a scalar', () => {
      expect(() => mergeType.construct('fail')).to.throw(
        '!merge needs a sequence of values to merge'
      );
    });

    it('should fail if the input data is a mix of arrays and objects', () => {
      expect(() => mergeType.construct([[], {}])).to.throw(
        '!merge needs a sequence of arrays or objects to merge'
      );
    });

    it('should flatten the input array of arrays', () => {
      const merged = mergeType.construct([
        ['a', ['b', 'c']],
        ['d', 'e'],
      ]);
      expect(merged).to.be.eql(['a', ['b', 'c'], 'd', 'e']);
    });

    it('should merge the input array of objects', () => {
      const merged = mergeType.construct([{ a: 'b' }, { c: 'd' }]);
      expect(merged).to.be.eql({ a: 'b', c: 'd' });
    });

    it('should fail if there are key collisions', () => {
      expect(() => mergeType.construct([{ a: 'b' }, { a: 'd' }])).to.throw(
        'duplicate key `a` in !merge[1]; first seen in !merge[0]'
      );
    });

    it('should fail if the input array is not objects/arrays', () => {
      expect(() => mergeType.construct([1, 2])).to.throw(
        '!merge needs a sequence of arrays or objects to merge'
      );
    });
  });
});
