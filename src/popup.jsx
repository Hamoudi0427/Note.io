import React, {useState,useEffect} from "react";
import {getFolderContent} from "../MicrosoftTeams-Service";
import {sendBasicTranscriptionRequest, originalStatus} from "../assemblyAI-Service";
import { render } from "react-dom";
import { downloadMP3, test } from "../YouTube-Service";
import generatePDF from "../pdfStuff";
const options = {
    "Microsoft Teams" : "https://students.wlu.ca/services-and-spaces/tech-services/assets/images/microsoft-team-2019.png",
    "Google Meets": "https://www.logo.wine/a/logo/Google_Meet/Google_Meet-Logo.wine.svg",
    "YouTube":"https://i.ibb.co/dg74vqR/My-project.png"
}

const Popup = () => {


    const [selectedOption, setSelectedOption] = useState("Microsoft Teams");
    const [status, setStatus] = useState("")
    const [buttonState,setButtonState] = useState("Get Notes")
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState("");


    useEffect(()=>{
        console.log(status)
    },[status])

    useEffect(() => {
        document.getElementById("information-input").value = "";

        if(selectedOption === "YouTube"){
            chrome.storage.local.get(['videoID'], function(result) {
                document.getElementById("information-input").value = result.videoID
              });
        }    
    },[selectedOption])

    function handleSelectOption(e){
        setSelectedOption(e.target.value)
        console.log(e.target.value)
    }


    const handleGetNotes = async(e) => {

        if(e.currentTarget.value === "Get Notes"){
            let info = document.getElementById("information-input").value;
            console.log(info)
            if(selectedOption === "Microsoft Teams"){
                chrome.storage.local.get(['AuthToken'], async function(result) {
                    const recordingUrl = await getFolderContent(result.AuthToken, info); //Recordings
                    setStatus("Getting Notes...")

                    sendBasicTranscriptionRequest(recordingUrl).then(async(res) => {
                        console.log(res)
                        async function postPDF(){
                            const response = await fetch(`https://graph.microsoft.com/v1.0/drives/b!zGNCP0fN0EWFOHj70yChvMVny11h3iFArey4vjIrNrXLMj4TjSckR7SKTLFVUlGM/items/01LDLST7A6OYUU5XWQ2RGYJIHBSA7LAERE:/${fileName}.pdf:/content`,{
                                headers:{
                                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
                                    "Authorization":result.AuthToken
                                    
                                },
                                method:"PUT",
                                body: (generatePDF(res.data,title,"Microsoft Teams",fileName))
                            });
                            const data = await response.json()
                            console.log(data)
                        }

                        await postPDF()
                        setStatus("Complete")
                    })
                });
            }else if(selectedOption === "YouTube"){
                const recordingUrl  = await test(info)
                console.log(recordingUrl)
                setStatus("Getting Notes...")
                sendBasicTranscriptionRequest(recordingUrl).then((res) => {
                    setStatus(res.status)
                    setButtonState("Download")
                    generatePDF(res.data,title,"YouTube",fileName)

                })
            }
        }

    }
    return(
        <div style={{width:"400px", height:'400px', backgroundColor:"#FDF8C7", position:'relative'}}>
           { status.includes("Notes") && <div style={{ zIndex:"1000",backgroundColor:"rgba(0,0,0,0.5)",position:"absolute", height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center", color:"white", fontSize:"20px"}}>{status}</div>}
            <div id="title" style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', borderBottom:"3px solid #CCCCDD"}}><h1>Note.io</h1></div>

            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD", display:"flex", alignItems:"center"}}>
                <div style={{display:"flex", alignItems:'center', gap:"20px", marginLeft:'2%'}}><input style={{zIndex:"100"}} defaultChecked={true} onChange={(e)=>{handleSelectOption(e)}} type="radio" value="Microsoft Teams" name="platform"/><label for="Microsoft Teams"><h3>Microsoft Teams</h3></label></div>

            </div>
            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD", zIndex:"-1", display:"flex", alignItems:"center"}} >
            <div style={{display:"flex", alignItems:'center', gap:"20px", marginLeft:'2%'}}><input style={{zIndex:"100"}} onChange={(e)=>{handleSelectOption(e)}} type="radio" value="Google Meets" name="platform"/><label for="GoogleMeets"><h3>Google Meets</h3></label></div>

            </div>
            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD" ,zIndex:"-1", display:"flex", alignItems:"center"}}>
            <div style={{display:"flex", alignItems:'center', gap:"20px", marginLeft:'2%'}}><input style={{zIndex:"100"}} onChange={(e)=>{handleSelectOption(e)}} type="radio" value="YouTube" name="platform"/><label for="YouTube"><h3>YouTube</h3></label></div>

            </div>
            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD",zIndex:"-1"}}></div>
            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD",zIndex:"-1"}}></div>
            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD",zIndex:"-1"}}></div>
            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD",zIndex:"-1"}}></div>
            <div style={{width:'100%', height:'9%', borderBottom:"3px solid #CCCCDD",zIndex:"-1"}}></div>
            <div style={{width:'10%', height:'100%', borderRight:"3px solid #D0A090", position:'absolute', left:"0", top:"0"}}></div>
            <img style={{height:"120%",position:'absolute', top:"-30%", right:"-40%"}} src="https://i.ibb.co/GWMLb1b/My-project.png"/>

            <div style={{ position:'absolute', width:'100%', height:'80%', top:"20%", left:"0"}}>

            <div style={{height:"25%",width:"100%" ,display:'flex', justifyContent:'space-between', alignItems:'center', paddingRight:"5%"}}>
                <div id="options-container" style={{ height:'100%', display:'flex', gap:'5%', flexDirection:'column', justifyContent:'space-evenly'}}>
                </div>

                <div style={{height:'100%',width:"20%", display:"flex", alignItems:'center',marginRight:"12%", justifyContent:'center'}} id="image-container">
                    <img style={{height:`${selectedOption === "YouTube" ? "110%" : "80%"}`, opacity:"0.8"}} src={options[selectedOption]}/>
                </div>
            </div>
            </div>

            <div style={{display:'flex', flexDirection:"column",alignItems:'center', height:'20%',position:'absolute', bottom:"24%", width:"100%"}}>
                <input onChange={(e)=>{setTitle(e.target.value)}} placeholder="Note's Title" style={{margin:"10px"}} /> 
                <input onChange={(e)=>{setFileName(e.target.value)}} placeholder="File Name" style={{margin:"10px"}}  /> 
                <input style={{zIndex:"110",margin:"10px"}} id="information-input" onChange={(e) => {}} placeholder={`${selectedOption === "YouTube" ? "Video ID" : "Source File Name"}`}/>

                <button style={{zIndex:"110", margin:"10px"}} onClick={(e)=>{
                    handleGetNotes(e)
                }} value={buttonState}>{buttonState}</button>
            </div>
        </div>
    )
}

render(<Popup/>, document.getElementById("react-target"))