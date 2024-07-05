const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const playlistElement = document.getElementById('playlist');
let isPlaying = false;
let currentTrackIndex = 0;

const playlist = [
    { title: 'Song 1', url: 'song1.mp3' },
    { title: 'Song 2', url: 'song2.mp3' },
    { title: 'Song 3', url: 'song3.mp3' }
];

function loadTrack(index) {
    audioPlayer.src = playlist[index].url;
    currentTrackIndex = index;
    updatePlaylistUI();
}

function playPauseTrack() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseButton.textContent = '▶';
    } else {
        audioPlayer.play();
        playPauseButton.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = '⏸';
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.textContent = '⏸';
}

function updateVolume() {
    audioPlayer.volume = volumeControl.value / 100;
}

function updatePlaylistUI() {
    playlistElement.innerHTML = '';
    playlist.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.title;
        li.classList.add('track');
        if (index === currentTrackIndex) {
            li.style.fontWeight = 'bold';
        }
        playlistElement.appendChild(li);
    });
}

playPauseButton.addEventListener('click', playPauseTrack);
prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);
volumeControl.addEventListener('input', updateVolume);

loadTrack(currentTrackIndex);
updatePlaylistUI();
