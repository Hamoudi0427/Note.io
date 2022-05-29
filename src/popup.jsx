import React, {useState} from "react";
import {getFolderContent} from "../MicrosoftTeams-Service";
import sendBasicTranscriptionRequest from "../assemblyAI-Service";
import { render } from "react-dom";
import { downloadMP3, test } from "../YouTube-Service";
import generatePDF from "../pdfStuff";

const options = {
    "Microsoft Teams" : "https://students.wlu.ca/services-and-spaces/tech-services/assets/images/microsoft-team-2019.png",
    "Google Meets": "https://www.logo.wine/a/logo/Google_Meet/Google_Meet-Logo.wine.svg",
    "YouTube":"https://e7.pngegg.com/pngimages/608/935/png-clipart-push-button-computer-icons-youtube-play-button-play-angle-text.png"
}

const Popup = () => {


    const [selectedOption, setSelectedOption] = useState("Microsoft Teams");



    function handleSelectOption(e){
        setSelectedOption(e.target.value)
        console.log(e.target.value)
    }


    const handleGetNotes = async() => {
        let info = document.getElementById("information-input").value;
        console.log(info)
        if(selectedOption === "Microsoft Teams"){
            chrome.storage.local.get(['AuthToken'], async function(result) {
                const recordingUrl = await getFolderContent(result.AuthToken, info); //Recordings
                sendBasicTranscriptionRequest(recordingUrl)
            });
        }else if(selectedOption === "YouTube"){
            const recordingUrl  = await test(info)
            console.log(recordingUrl)
            sendBasicTranscriptionRequest(recordingUrl);
        }
        // generatePDF();


    }
    return(
        <div style={{width:"400px", height:'400px', backgroundColor:"#FDF8C7", position:'relative'}}>
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
                    <img style={{height:'80%', opacity:"0.8"}} src={options[selectedOption]}/>
                </div>
            </div>
            </div>

            <div style={{display:'flex', flexDirection:"column", justifyContent:'space-between', alignItems:'center', height:'20%',position:'absolute', bottom:"5%", width:"100%"}}>
                <input style={{zIndex:"110"}} id="information-input" onChange={(e) => {}} placeholder="Folder Name"/>

                <button style={{zIndex:"110"}} onClick={()=>{
                    handleGetNotes()
                }}>Get Notes</button>
            </div>
        </div>
    )
}

render(<Popup/>, document.getElementById("react-target"))