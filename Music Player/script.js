const songImage = document.getElementById('song-img');
const songName = document.getElementById('title');
const songInfo = document.getElementById('info');
const play = document.getElementById('play');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const bar = document.getElementById('progress-bar');

const songs = [
    { title: 'Khoobsurat', src: 'khoobsurat.mp3', info: 'Stree 2', img: 'khoobsurat.jpg' },
    { title: 'Assi Sajna', src: 'AssiSajna.mp3', info: 'Jasleen Royal', img: 'Assi.jpg' },
    { title: 'Aayi Nai', src: 'Aayi-nai.mp3', info: 'Stree 2', img: 'Aayi-nai.jpg' },
    { title: 'Fear Of Love', src: 'Fear-of-love.mp3', info: 'Jassie Gill, Shraddha Patray', img: 'love.jpeg' },
    { title: 'Cery Cery Lady', src: 'cery.mp3', info: 'Modern Talking', img: 'cery.jpg' }
];

let songIndex = 0;

function loadSong(song) {
    audio.src = song.src;
    songName.innerText = song.title;
    songInfo.innerHTML = song.info;
    songImage.src = song.img;
}

function playSong() {
    audio.play();
    playPause.classList.remove("fa-play");
    playPause.classList.add("fa-pause");
}

function pauseSong() {
    audio.pause();
    playPause.classList.remove("fa-pause");
    playPause.classList.add("fa-play");
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

// Update the slider as the song plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    bar.value = progress;
});

// Seek in the audio when the slider is moved
bar.addEventListener('input', () => {
    const seekTime = (bar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});


audio.addEventListener('ended', () => {
    nextSong(); 
});

playPause.addEventListener('click', togglePlay);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);

loadSong(songs[songIndex]);
