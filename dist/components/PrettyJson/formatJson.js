import _typeof from "@babel/runtime/helpers/typeof";
import stringifyObject from 'stringify-object';

var formatJson = function formatJson(value, copyClassName, copyIconAsHtml) {
  var pretty = stringifyObject(value, {
    indent: '  ',
    singleQuotes: false,
    transform: function transform(obj, prop, originalResult) {
      var type = _typeof(obj[prop]);

      switch (type) {
        case 'string':
        case 'number':
          return "<span class=\"tnw-copy ".concat(copyClassName, "\">").concat(originalResult).concat(copyIconAsHtml, "</span>");

        default:
          return originalResult;
      }
    }
  });
  return pretty;
};

export default formatJson;