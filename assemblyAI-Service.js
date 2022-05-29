import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

const key = "99f0919805ff4536b2a85fc57a7d21f9";

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
export default function sendBasicTranscriptionRequest(videoLink)
{
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
    .then((data) =>
        receiveBasicTranscriptionRequest(data.id)
    )
    .catch((err) => console.log(err));
}

function receiveBasicTranscriptionRequest(requestId)
{
    const timeout = setInterval(() => {
        console.log("loading...")
        assembly
        .get(`/transcript/${requestId}`)
        .then((res) => {
            console.log(res)
            if(res.data.status === "completed"){
                console.log("Done")
                clearInterval(timeout);
            }
        })
//.then micorosft post
        .catch((err) => console.log(err));
    },30000)
}