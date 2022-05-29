console.log("This is the background script")

let token;
 let videoID;

chrome.webRequest.onBeforeSendHeaders.addListener((request)=>{
    try{
        let headers = request.requestHeaders
        headers = headers.filter(property => property.name === "Authorization")
        token = headers[0].value;
        chrome.storage.local.set({AuthToken: token}, function() {
            // console.log('Value is set to ' + token);
          });
    }catch(e){
        console.log(e)
    }
}, 

{urls: ["https://graph.microsoft.com/v1.0/*"]},
["requestHeaders"]

)



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        
    if(request.action === "getCurrentTab"){
        sendResponse(sender.url)


        videoID = sender.url.substring(sender.url.indexOf("v="), sender.url.length)
        videoID = videoID.split("=")[1]
        chrome.storage.local.set({videoID: videoID}, function() {
          });        
        
    }

    }
  );



  chrome.tabs.onActivated.addListener((tabID,selectInfo)=>{
    console.log("tab changed")
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        let title = tabs[0].title
        if(url.includes("youtube")){
            console.log(url)
            videoID = url.substring(url.indexOf("v="), url.length)
            videoID = videoID.split("=")[1]
            chrome.storage.local.set({videoID: videoID}, function() {
              });        
            }
    });


}
);

chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
        if(changeInfo.url){
            videoID = changeInfo.url.substring(changeInfo.url.indexOf("v="), changeInfo.url.length)
            videoID = videoID.split("=")[1]
            chrome.storage.local.set({videoID: videoID}, function() {
              });   
        }
        if(changeInfo.title){
            console.log(changeInfo.title)
        }
        
    }
  );