'use strict';

const yaml = require('js-yaml');
const _ = require('lodash');

// CloudFormation functions
const functionNames = [
  'And',
  'Base64',
  'Cidr',
  'Condition',
  'Equals',
  'FindInMap',
  'GetAtt',
  'GetAZs',
  'If',
  'ImportValue',
  'Join',
  'Not',
  'Or',
  'Ref',
  'Select',
  'Split',
  'Sub',
];

const yamlType = (name, kind) => {
  const functionName = ['Ref', 'Condition'].includes(name) ? name : `Fn::${name}`;
  return new yaml.Type(`!${name}`, {
    kind,
    construct: (data) => {
      if (name === 'GetAtt') {
        // special GetAtt dot syntax
        if (typeof data === 'string') {
          const [first, ...tail] = data.split('.');
          data = [first, tail.join('.')];
        }
      }
      return { [functionName]: data };
    },
  });
};

/**
 * handleMergeTag implements the tag processing for the custom `!merge` tag that we
 * are introducing to allow transparent merging of objects and arrays in the framework.
 *
 * When the provided data is a list of objects, the objects are shallowly merged: the
 * objects are flattened together like `Object.assign({}, ...data)`. Unlike `Object.assign`,
 * if there are key collisions in the provided list of objects, this will throw an exception
 * rather than overwriting the duplicated keys.
 *
 * When the provided data is a list of arrays, the arrays are flattened and returned as
 * a single array with all of the combined elements. There is no removal of duplicate
 * items from the list.
 *
 * @param {Array} data
 * @returns the merged result.
 */
const handleMergeTag = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('!merge needs a sequence of values to merge');
  }

  if (data.every((item) => Array.isArray(item))) {
    return _.flatten(data);
  }

  if (data.every((item) => typeof item === 'object' && !Array.isArray(item))) {
    const keys = {};

    data.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        if (keys[key] !== undefined) {
          throw new Error(
            `duplicate key \`${key}\` in !merge[${index}]; first seen in !merge[${keys[key]}]`
          );
        }
        keys[key] = index;
      });
    });

    return Object.assign({}, ...data);
  }

  throw new Error('!merge needs a sequence of arrays or objects to merge');
};

const createSchema = () => {
  const types = _.flatten(
    functionNames.map((functionName) =>
      ['mapping', 'scalar', 'sequence'].map((kind) => yamlType(functionName, kind))
    )
  );

  types.push(
    new yaml.Type('!merge', {
      kind: 'sequence',
      construct: handleMergeTag,
    })
  );

  return yaml.DEFAULT_SCHEMA.extend(types);
};

module.exports = createSchema();
