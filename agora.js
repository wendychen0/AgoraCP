let handlefail=function(err){
    console.log(err);
}

let appId = "4f1087d2fdb141a6a6a8024b164f9ddd";
let globalStream;
var isAudioMuted = false;
var isVideoMuted = false;

let client = AgoraRTC.createClient({
    mode: "live",
    codex: "h264"
})

client.init(appId, ()=>console.log("Client Connected.").handlefail)

function removeMyVideo(){
    globalStream.stop();
}

function removeVideoStream(evt){
    //console.log("Event to remove:", evt);
    let stream = evt.stream;
    stream.stop();
    let remDiv = document.getElementById(stream.getId());
    remDiv.parentNode.removeChild(remDiv);
}

function addVideoStream(streamId){
    console.log()//("Stream to be added is: ", streamId);
    let remoteContainer=document.getElementById("remoteStream");
    let streamDiv = document.createElement("div");
    streamDiv.id = streamId;
    streamDiv.style.height="250px";
    remoteContainer.appendChild(streamDiv);
}

document.getElementById("join").onclick=function(){
    let channelName= getElementById("channelName").value;
    let username = document.getElementById("username").value;

    //console.log(username, channelName);
    client.join(null, channelName, username, ()=>{
        var localStream = AgoraRTC.createStream({
            video: true,
            audio:true
        })
        localStream.init(function() {
            localStream.play("SelfStream");
            console.log(`App id: ${appId}\nChannel id: ${channelName}`)
            client.publish(localStream);
        })
        globalStream = localStream;
    })
    client.on("Stream-added", function (evt){
        console.log("Stream added.")
        client.subscribe(evt.stream, handlefail)
    })
    client.on("stream-subscribed", function(evt){
        console.log("Stream subscribed.");
        let stream= evt.stream;
        addVideoStream(stream.getId());
        stream.play(stream.getId());
    })
    client.on("peer-leave", function (evt){
        console.log("Peer has left");
        removeVideoStream(evt)
    })
}

document.getElementById("video-mute").onclick=function(){
    if(!isVideoMuted){
        globalStream.muteVideo();
        isVideoMuted = true;
    }
    else {
        globalStream.unmuteVideo();
        isVideoMuted = false;
    }
}

document.getElementById("audio-mute").onclick=function(){
    if(!isAudioMuted){
        globalStream.muteAudio();
        isAudioMuted = true;
    }
    else {
        globalStream.unmuteAudio();
        isAudioMuted = false;
    }
}

document.getElementById("leave").onclick=function(){
    client.leave(function(){
        console.log("User left!");
    }, handlefail)
    removeMyVideoStream();
}