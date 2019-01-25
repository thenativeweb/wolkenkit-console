import stringifyObject from 'stringify-object';

const formatJson = function (value, copyClassName, copyIconAsHtml) {
  const pretty = stringifyObject(value, {
    indent: '  ',
    singleQuotes: false,
    transform: (obj, prop, originalResult) => {
      if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        return `<span class="tnw-copy ${copyClassName}">${originalResult}${copyIconAsHtml}</span>`;
      }

      return originalResult;
    }
  });

  return pretty;
};

onmessage = function (event) {
  const { value, copyClassName, copyIconAsHtml } = event.data;

  const pretty = formatJson(JSON.parse(value), copyClassName, copyIconAsHtml);

  setTimeout(() => {
    postMessage(pretty);
  }, 300);
};
