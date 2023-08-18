// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var url = 'http://updates.html5rocks.com';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}



let overlay = document.getElementsByClassName('loading-overlay')[0];
//overlay.classList.toggle('is-active');


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players_list = ["ytpl-playerAM76"];

function getPlaylistData(playerName) {
    var apiKey = 'AIzaSyAE5ys6wCOxsBCqQ376izGfylErr9vZDBI';
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
                modestbranding: 0, 
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

