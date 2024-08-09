chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "minify") {
    const minifiedText = minify(message.text);
    sendResponse({ minifiedText });
  }
  return true;
});

function minify(text) {
  // Remove all line breaks and tabs
  let minifiedText = text.replace(/(\r\n|\n|\r|\t)/gm, "");
  
  // Remove spaces before and after brackets, braces, and semicolons
  minifiedText = minifiedText.replace(/\s*([{};:,\(\)\[\]])\s*/g, "$1");
  
  // Collapse multiple spaces into one (or remove entirely if desired)
  minifiedText = minifiedText.replace(/\s\s+/g, ' ');

  // Optional: remove spaces around certain operators (like = or +)
  minifiedText = minifiedText.replace(/\s*([=+\-*\/])\s*/g, "$1");

  return minifiedText.trim();
}

