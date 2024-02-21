$(window).bind('beforeunload', function (e) {
    if (1 == 1) {
        return 'abc';
    }
});

$(window).bind('unload', function () {
    csUnregister();
    if (csVoice.enableVoice) {
        reConfigDeviceType();
    }
});

// kết thúc cuộc gọi ra/vào
function csEndCall() {
    console.log("Call is ended");
    document.getElementById('phoneNo').innerHTML = "";
    $('#transferCall').attr('disabled', 'disabled');
    $('#transferCallAcd').attr('disabled', 'disabled');
    recordeStop();
}

// đổ chuông trình duyệt của agent khi gọi ra
function csCallRingingAgent() {
    console.log("Has a new call to agent");
}

// đổ chuông trình duyệt của agent khi gọi vào
// đổ chuông tới khách hàng khi gọi ra
function csCallRinging(phone) {
    console.log("Has a new call to customer: " + phone);
    document.getElementById('phoneNo').innerHTML = phone + ' đang gọi ...';
}

// cuộc gọi vào được agent trả lời
function csAcceptCall() {
    console.log("Call is Accepted");
    document.getElementById('phoneNo').innerHTML = "Đang trả lời";
    $('#transferCall').removeAttr('disabled');
    $('#transferCallAcd').removeAttr('disabled');
    recordeCall();

}

// cuộc gọi ra được khách hàng trả lời
function csCustomerAccept() {
    console.log("csCustomerAccept");
    document.getElementById('phoneNo').innerHTML = "Đang trả lời";
    recordeCall();
}

function csMuteCall() {
    console.log("Call is muted");
}

function csUnMuteCall() {
    console.log("Call is unmuted")
}

function csHoldCall() {
    console.log("Call is holded");
}

function csUnHoldCall() {
    console.log("Call is unholded");
}

function showCalloutInfo(number) {
    console.log("callout to " + number);
}

function showCalloutError(errorCode, sipCode) {
    console.log("callout error " + errorCode + " - " + sipCode);
}

function csShowEnableVoice(enableVoice) {
    if (enableVoice) {
        $('#enable').attr('disabled', 'disabled');
    } else {
        $('#enable').removeAttr('disabled');
    }
}

function csShowDeviceType(type) {
    console.log("csShowDeviceType: " +type);
}

function csShowCallStatus(status) {
    console.log("csShowCallStatus: " + status);
}

function csInitComplete() {
    if (!csVoice.enableVoice) {
        csEnableCall();
    }
    console.log("csInitComplete");
}

function csCurrentCallId(callId) {
    console.log("csCurrentCallId: " + callId);
}

function csInitError(error) {
    console.log("csInitError: " + error);
}

function csListTransferAgent(listTransferAgent) {
    console.log(listTransferAgent);
}
function csTransferCallError(error, tranferedAgentInfo) {
    console.log('Transfer call failed,' + error);
}
function csTransferCallSuccess(tranferedAgentInfo) {
    console.log('transfer call success');
}
function csNewCallTransferRequest(transferCall) {
    console.log('new call transfer');
    console.log(transferCall);
    document.getElementById('phoneNo').innerHTML = transferCall.dropAgentId + ' chuyển cg cho bạn';
    $('#transferResponseOK').removeAttr('disabled');
    $('#transferResponseReject').removeAttr('disabled');
}

function csTransferCallResponse(status) {
    $('#transferResponseOK').attr('disabled', 'disabled');
    $('#transferResponseReject').attr('disabled', 'disabled');
    console.log(status);
}

async function login() {
    const domain = "0898768886";
    const key = "KZY1rJ0nLrx0Zjgd";
    const agentId = "401_201";
    const expired = "2025-07-30 00:00:00";
    const url = "https://3c-capi.mobifone.vn/${domain}/thirdParty/login";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token; // Assuming your token is in the 'token' property of the response
            console.log('Login successful. Token:', token);
            // Store the token securely (e.g., in a cookie or localStorage) for future use
        } else {
            console.error('Login failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

let audioCtx;
let track;
let recorder;
function recordeCall()
{
    navigator.mediaDevices.getUserMedia ({audio: true, video: false}).then(function(stream) {
        //startBtn.setAttribute('disabled', true);
        //stopBtn.removeAttribute('disabled');		
        /**
         * Create a MediaStreamAudioSourceNode Feed the HTMLMediaElement into it
         */
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
        track = stream.getTracks()[0];
        let source = audioCtx.createMediaStreamSource(stream); 
       // recorder = new Recorder(source);
		//recorder.record();
      
        /**
         *Create a biquadfilter
            */
        let biquadFilter = audioCtx.createBiquadFilter();

        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.value = 1000;
        /**
         * biquadFilter.gain.value = range.value; connect the AudioBufferSourceNode to the 
         * gainNode and the gainNode to the destination, so we can play the music and adjust
         * the volume using the mouse cursor
         */
        source.connect(biquadFilter);
        biquadFilter.connect(audioCtx.destination);
    })
    .catch(function(err) {
        console.log('The following gUM error occured: ' + err);
    });
}
function recordeStop()
{
    track.stop();
}