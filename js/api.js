let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('api-player', {
        height: '293',
        width: '384',
        videoId: 'nWryvhC41Oo',
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log(event);
    load();
}

function onStateChange(event) {
}

function switchVideo(id) {
    player.cueVideoById(id, 0);
}