import formatJson from './formatJson';

onmessage = function onmessage(event) {
  var _event$data = event.data,
      value = _event$data.value,
      copyClassName = _event$data.copyClassName,
      copyIconAsHtml = _event$data.copyIconAsHtml;
  var formattedJson = formatJson(JSON.parse(value), copyClassName, copyIconAsHtml);
  setTimeout(function () {
    postMessage(formattedJson);
  }, 300);
};