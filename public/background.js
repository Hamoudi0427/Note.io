console.log("This is the background script")

let token;

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

