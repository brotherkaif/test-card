// DOMStrings object to make updating easier
const DOMStrings = {
    videoPlayer: 'videoPlayer',
    videoSourceWebm: 'videoSourceWebm',
    videoSourceMP4: 'videoSourceMP4',
    videoSourceOgg: 'videoSourceOgg',
    videoAttributions: 'videoAttributions'
};

// Define constants for DOM manipulation for easier to read code.
const videoPlayer = document.getElementById(DOMStrings.videoPlayer);
const videoSourceWebm = document.getElementById(DOMStrings.videoSourceWebm);
const videoSourceMP4 = document.getElementById(DOMStrings.videoSourceMP4);
const videoSourceOgg = document.getElementById(DOMStrings.videoSourceOgg);
// const videoAttributions = document.getElementById(DOMStrings.videoAttributions);


// An array of all videoIDs. Need to find a way to pull this in from S3 dynamically.
const vidIDPool = [
    '017c7abfc6a9ea766e8b4b6f681bbafa',
    '0931dc79389ef050da0a176a591bbf81',
    '16aadbd9969f7400ce3bf7a3b7f40c28',
    '17a55e73189d2ddcec949d7eeec3f065',
    '25c5668091237aacfc113c539a4c8bf6',
    '25c96dbf1a31f58fd6cfbbb37204cff1',
    '3050bfbeda38260cfc4b66bbddbdee45',
    '3165f26be99a7dc1c62331b05b5df988',
    '51523cc2780239bb444fd90b686159c6',
    '5b13cc59701e10bd197bfa5d2a7f9811',
    '64136415dee06092bc766c903798f867',
    '7248df5b4550cf1a7affe0bfa3c1803e',
    '894dd3a347d12c0fcc7ef09b08ab8764',
    '8d1d6ba5350637b6c331106c2264912b',
    '9925722fa9154b22004fbff564aea790',
    '9b8af96fb88aace1e98a6591bcdcd9d1',
    'a5807f0d6bce5307e2a0eee74d08be8c',
    'af3471cd56bb260be5bcdf739ad05ad8',
    'ea2b1d82b08d2380bf9ec4906ab77bef',
    'f0e4073935025f6a64b66492b42439fc',
    'f7d952ae226c4c3b36a0472c433694b6',
    'fdfdd9edff540e81c306f943a4f635d0'
];

let playlist = [];

// Deep copy from the pool and fill playlist
function fillPlaylist() {
    console.log('[DEBUG] fillPlaylist function called.');
    playlist = vidIDPool.slice();
    console.log('[DEBUG] Playlist filled.');
    console.log('[DEBUG] Playlist = ' + playlist);
}

// A function that will fetch a random vidID from the playlist and returns just the selection.
function fetchVidID() {
    console.log('[DEBUG] fetchVidID function called.');
    console.log('[DEBUG] Playlist currently = ' + playlist);
    console.log('[DEBUG] Running size check...');
    
    // reload playlist if empty.
    if (playlist.length < 2) {
        console.log('[DEBUG] Playlist is empty. Calling fillPlaylist function...');
        fillPlaylist();
    }
    
    console.log('[DEBUG] Playlist is big enough.');
    console.log('[DEBUG] Making a random selection...');
    let randomSelection = Math.floor(Math.random() * playlist.length);
    console.log('[DEBUG] Number chosen: ' + randomSelection);
    console.log('[DEBUG] vidID chosed: ' + playlist[randomSelection]);
    
    console.log('[DEBUG] Returning value...');
    return (playlist.splice(randomSelection, 1))[0];
}

// Picks a random vid from the pool and loads it into the player.
function loadNextVid(vidID) {
    console.log('[DEBUG] playNextVid function called.');
    console.log('[DEBUG] vidID value received: ' + vidID);
    
    console.log('[DEBUG] Setting paths...');
    let pathWebm = 'https://s3.eu-west-2.amazonaws.com/test-card-data/videos/webm/' + vidID + '.webm';
    let pathMP4 = 'https://s3.eu-west-2.amazonaws.com/test-card-data/videos/mp4/' + vidID + '.mp4';
    let pathOgg = 'https://s3.eu-west-2.amazonaws.com/test-card-data/videos/ogv/' + vidID + '.ogv';
    // let pathAttributions = 'https://s3.eu-west-2.amazonaws.com/test-card-data/metadata/vtt/' + vidID + '.vtt';
    
    console.log('[DEBUG] pathWebm = ' + pathWebm);
    console.log('[DEBUG] pathMP4 = ' + pathMP4);
    console.log('[DEBUG] pathOgg = ' + pathOgg);
    
    
    console.log('[DEBUG] Setting sources...');
    // Stop the vid, load the next one, then play.
    videoPlayer.pause();
    videoSourceWebm.setAttribute('src', pathWebm);
    videoSourceMP4.setAttribute('src', pathMP4);
    videoSourceOgg.setAttribute('src', pathOgg);
    // videoAttributions.setAttribute('src', pathAttributions);
    videoPlayer.load();
    console.log('[DEBUG] Done.');
}

const changeVideoButton = document.getElementById("changeVideoButton");
changeVideoButton.addEventListener("click", () => {
    loadNextVid(fetchVidID());
    videoPlayer.play(); 
}, false);

videoPlayer.addEventListener("ended", () => {
    loadNextVid(fetchVidID());
    videoPlayer.play(); 
}, false);

console.log('script loaded');
loadNextVid(fetchVidID());