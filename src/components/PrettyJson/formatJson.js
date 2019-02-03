import stringifyObject from 'stringify-object';

const formatJson = function (value, copyClassName, copyIconAsHtml) {
  const pretty = stringifyObject(value, {
    indent: '  ',
    singleQuotes: false,
    transform: (obj, prop, originalResult) => {
      const type = typeof obj[prop];

      switch (type) {
        case 'string':
        case 'number':
          return `<span class="tnw-copy ${copyClassName}">${originalResult}${copyIconAsHtml}</span>`;
        default:
          return originalResult;
      }
    }
  });

  return pretty;
};

export default formatJson;
