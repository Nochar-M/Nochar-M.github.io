// Playlist array with song data
const playlist = [
  {
    trackname: "We fight / We love",
    artist: "QTIP",
    song: "songs/wefightwelove.mp3",
    cover: "images/QTIP_RENAISSANCE.png"
  },
  {
    trackname: "Reality",
    artist: "Lost Frequencies",
    song: "songs/reality.mp3",
    cover: "images/reality.jpg"
  },
  {
    trackname: "Fade",
    artist: "Alan Walker",
    song: "songs/fade.mp3",
    cover: "images/fade.jpg"
  }
];

// grab all elements
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const playButton = document.getElementById("playpause");
const tracknameElement = document.getElementById("trackname");
const artistElement = document.getElementById("artist");
const coverElement = document.getElementById("cover");
const audioElement = document.getElementById("song");
const progressBar = document.getElementById("progress");
audioElement.volume = 0.8;
let currentIndex = 0;


// Play / Pause
playButton.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    playIcon.src = "images/play.png";
  } else {
    audioElement.pause();
    playIcon.src = "images/pause.png";
  }
});

// Next song
nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= playlist.length) currentIndex = 0; // Loop back
  loadSong(currentIndex);
});

// Previous button
previousButton.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = playlist.length - 1; // Loop back
  loadSong(currentIndex);
});

// Update progress bar as song plays //
audioElement.addEventListener("timeupdate", () => {
  const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
  progressBar.value = progressPercent || 0;
});

progressBar.addEventListener("input", () => {
  audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
});


// Update the audio player with each song
function loadSong(index) {
  audioElement.src = playlist[index].song;
  tracknameElement.textContent = playlist[index].trackname;
  artistElement.textContent = playlist[index].artist;
  coverElement.src = playlist[index].cover;
  audioElement.play();
}
loadSong(currentIndex);