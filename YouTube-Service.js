



export const downloadMP3 = async (videoID) => {
    const response = await fetch(`https://api.onlinevideoconverter.pro/api/convert`, {
        headers: {
                "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://onlinevideoconverter.pro/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36"
        },
        method:"POST",
        body: `{\"url\":\"https://www.youtube.com/watch?v=${videoID}\"}`,
    });

    const data = await response.json();
    let downloadableUrls = [];
    data.url.map((url) => {
        if(url.downloadable === true){
            downloadableUrls[downloadableUrls.length] = url.url
        }
    })
    // console.log(downloadableUrls[0])

    downloadableUrls = downloadableUrls.filter((url) => url.downloadable === true);
    console.log(downloadableUrls[0])
    return downloadableUrls[0]

}




export async function test(videoID) {
    const response = await fetch("https://dl.ybm.pw/api/", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "Referer": "https://ybm.pw/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `id=${videoID}&f=mp4&t=4e6a49354d6d4a695957593d`,
        "method": "POST"
      })
    const data = await response.json();
    console.log(data.downloadUrl)
    return data.downloadUrl
}


// downloadMP3("wp45o5i7zhE")
