import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

const key = "99f0919805ff4536b2a85fc57a7d21f9";
export let status = ""
// base header including the key for requests
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: key,
        "content-type": "application/mp4",
    },
    adapter: fetchAdapter
});

// extract a basic transcription from a video given the link
export function sendBasicTranscriptionRequest(videoLink)
{
    return new Promise((resolve,reject) => {
        assembly
        .post("/transcript", {
            audio_url: videoLink,
            auto_chapters: true
        })
        .then((res) => 
            {
                 console.log(res);
                 return res.data;
            }
        )
        .then((data) =>{
            status = data.status
    
            receiveBasicTranscriptionRequest(data.id).then((res) => {
                resolve(res)
            })
        }
        )
        .catch((err) => console.log(err));
    })
    
}

function receiveBasicTranscriptionRequest(requestId)
{
    return new Promise((resolve,reject) => {
        const timeout = setInterval(() => {
            console.log("loading...")
            assembly
            .get(`/transcript/${requestId}`)
            .then((res) => {
                console.log(res)
                if(res.data.status === "completed"){
                    clearInterval(timeout);
                    resolve({status:"Completed", data:res.data.chapters})
                }
                status = res.data.status
            })
    //.then micorosft post
            .catch((err) => console.log(err));
        }, 15000)
    })

}