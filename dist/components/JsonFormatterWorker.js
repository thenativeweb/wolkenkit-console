import stringifyObject from 'stringify-object';

var formatJson = function formatJson(value, copyClassName, copyIconAsHtml) {
  var pretty = stringifyObject(value, {
    indent: '  ',
    singleQuotes: false,
    transform: function transform(obj, prop, originalResult) {
      if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        return "<span class=\"tnw-copy ".concat(copyClassName, "\">").concat(originalResult).concat(copyIconAsHtml, "</span>");
      }

      return originalResult;
    }
  });
  return pretty;
};

onmessage = function onmessage(event) {
  var _event$data = event.data,
      value = _event$data.value,
      copyClassName = _event$data.copyClassName,
      copyIconAsHtml = _event$data.copyIconAsHtml;
  var pretty = formatJson(JSON.parse(value), copyClassName, copyIconAsHtml);
  setTimeout(function () {
    postMessage(pretty);
  }, 300);
};