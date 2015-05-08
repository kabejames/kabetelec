//<![CDATA[
        window.onload=function(){

		
		(function () {



function mediaOptions(audio, video, remoteAudio) {
    return {
        media: {
                constraints: {
                        audio: audio,
                        video: video,
                },
                render: {
                        remote: {
                                audio: remoteAudio
                        }
                        
                        
                }
        }
    };
}

function createUA(host) {
    var config = {
    
    
    uri: '6004@' + host,
    wsServers: 'ws://'+ host +':8088/ws',
    authorizationUser: '6004',
    password: 'AVISE',
    stunServers: 'stun:stun.l.google.com:19302',
    hackIpInContact: true,
    traceSip: true
    
   
};
    var userAgent = new SIP.UA(config);
    return userAgent;
}


function makeCall(userAgent, audio, video, remoteAudio) {
    var options = mediaOptions(audio, video, remoteAudio);
    // makes the call
    var session = userAgent.invite('sip:6007@52.11.145.221', options);
    return session;
}

function setUpAudioInterface(userAgent, remoteAudioId, buttonId) {
    // true if the button should initiate a call,
    // false if the button should end a call
    var onCall = false;
    var session;
    var remoteAudio = document.getElementById(remoteAudioId);
    var button = document.getElementById(buttonId);

    //
    // The button either makes a call, creating a session and binding a listener
    // for the "bye" request, or it hangs up a current call.
    button.addEventListener('click', function () {
        // Was on a call, so the button press means we are hanging up
        if (onCall) {
            onCall = false;
            button.firstChild.nodeValue = 'Click To Call Us';
	    button.style.background='#00FF00';
            session.bye();
            session = null;
        }
        // Was not on a call, so the button press means we are ringing someone
        else {
            onCall = true;
            button.firstChild.nodeValue = 'Click To Hang Up';
            button.style.background='#FF0000';
            session = makeCall(userAgent, true, false, remoteAudio);
            
            
            
            session.on('bye', function () {
                onCall = false;
                button.firstChild.nodeValue = 'Click To Call Us';
	        button.style.background='#00FF00';
                session = null;
            });
          
                   
        }
    });
}

 var webrtcUA = createUA('52.11.145.221');
     setUpAudioInterface(webrtcUA, 'localAudio', 'callButton');
 


 })();

 }//]]>