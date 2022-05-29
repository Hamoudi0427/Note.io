console.log("This is the content script")

chrome.runtime.sendMessage({action: "getCurrentTab"}, function(response) {
    console.log(response);
  });
