document.getElementById("minifyBtn").addEventListener("click", () => {
  navigator.clipboard.readText().then(text => {
    chrome.runtime.sendMessage({ action: "minify", text }, response => {
      if (response && response.minifiedText) {
        navigator.clipboard.writeText(response.minifiedText).then(() => {
          document.getElementById("status").textContent = "Minification successful!";
        }).catch(err => {
          console.error("Failed to write to clipboard: ", err);
          document.getElementById("status").textContent = "Failed to write to clipboard.";
        });
      } else {
        document.getElementById("status").textContent = "Failed to minify text.";
      }
    });
  }).catch(err => {
    console.error("Failed to read from clipboard: ", err);
    document.getElementById("status").textContent = "Failed to read from clipboard.";
  });
});
