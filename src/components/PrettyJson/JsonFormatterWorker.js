import formatJson from './formatJson';

onmessage = function (event) {
  const { value, copyClassName, copyIconAsHtml } = event.data;

  const formattedJson = formatJson(JSON.parse(value), copyClassName, copyIconAsHtml);

  setTimeout(() => {
    postMessage(formattedJson);
  }, 300);
};
