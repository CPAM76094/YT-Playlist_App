require('dotenv').config();

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players_list = ["ytpl-playerAM76"];

function getPlaylistData(playerName) {
    var apiKey = process.env.API_KEY;
    var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
    var data = {
        'playlistId': $('#' + playerName).data('pl'),
        'key': apiKey
    };
    

}


// generate playlist items once main player has loaded
function onPlayerReady(event) {
      //setTimeout(overlay.classList.toggle('is-active'), 40000); 
      getPlaylistData(event.target.name);     
}


function onYouTubeIframeAPIReady() {
  
    for (item in players_list) {
        players_list[item] = new YT.Player(players_list[item], {
            playerVars: {
                listType: 'playlist',
                list: $('#' + players_list[item]).data('pl'),
                autoplay: 1,
                playsinline: 1, 
                rel: 0, 
                loop: 1, 
                autopause: 0, 
                modestbranding: 1, 
                enablejsapi: 1, 
                showinfo: 1,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerStateChange(event) {
    var currentIndex = event.target.getPlaylistIndex();
    if(currentIndex) { console.log("Dernier clip :"+currentIndex+"/"+event.target.getPlaylist().length);}
    //console.log(currentIndex);
  }

