export async function getFolderContent(token, folderName){
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${folderName}:/children`, {
        headers:{
            "Authorization": token,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36"
        },
        method:"GET",
        body:null
    });
    const data = await response.json()
    let lastRecording = data.value[data.value.length - 1]
    let downloadUrl = lastRecording['@microsoft.graph.downloadUrl'];
    console.log(downloadUrl)
    return(downloadUrl)
}

