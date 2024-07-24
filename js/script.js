document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationTimeEl = document.getElementById('duration-time');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const backgroundContainer = document.getElementById('reproductor');
    const randomBtn = document.getElementById('random');
    const imagenCancion =document.getElementById('imagenCancion');

    let songs = [
        { title: "SAVE YOUR TEARS", artist: "THE WEEKND", src: "audio/song1.mp3", background: "img/Group9.png" },
        { title: "IMAGINE DRAGONS ", artist: "ENEMIES", src: "audio/song2.mp3", background: "img/Group1.png" },
        { title: "VIRGEN ", artist: "ADOLECENTS ORQUESTA", src: "audio/song3.mp3", background: "img/Group2.png" },
        { title: "ESCOMBROS", artist: "SUPREMA CORTE", src: "audio/song4.mp3", background: "img/Group3.png" },
        { title: "CHIHIRO ", artist: "BILLIE BILISH", src: "audio/song5.mp3", background: "img/Group4.png" },
        { title: "YA NO QUEDA NADA ", artist: "ANGELES FIT JIMMY", src: "audio/song6.mp3", background: "img/Group5.png" },
        { title: "LA QUE SE FUE", artist: "FELIPE PELAEZ", src: "audio/song7.mp3", background: "img/Group6.png" },
        { title: "X SIEMPRE AFERRADO ", artist: "NICO PAGA Y SEBASTIAN", src: "audio/song8.mp3", background: "img/Group7.png" },
        { title: "DUSK TILL DAWN", artist: " ZAYN ", src: "audio/song9.mp3", background: "img/Group8.png" }
    ];

    let currentSongIndex = 0;
    let isRandom = false;

    function loadSong(song) {
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        audioPlayer.src = song.src;
        backgroundContainer.style.backgroundImage = `url(${song.background})`;
        imagenCancion.style.backgroundImage = `url(${song.background})`;
        imagenCancion.style.backgroundPosition = 'center';
        imagenCancion.style.backgroundSize = 'cover';
        audioPlayer.load();
    }

    function playSong() {
        audioPlayer.play();
        playBtn.src = 'img/boton-de-pausa.png';
    }

    function pauseSong() {
        audioPlayer.pause();
        playBtn.src = 'img/boton-de-play.png';
    }

    function prevSong() {
        if (isRandom) {
            currentSongIndex = getRandomIndex();
        } else {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        }
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        if (isRandom) {
            currentSongIndex = getRandomIndex();
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        currentTimeEl.textContent = formatTime(currentTime);
        durationTimeEl.textContent = formatTime(duration);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = Math.floor(seconds % 60);
        return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    }

    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    function getRandomIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex);
        return randomIndex;
    }

    playBtn.addEventListener('click', () => {
        const isPlaying = !audioPlayer.paused;
        isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);

    // Manejar el evento loadedmetadata para actualizar la duración
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationTimeEl.textContent = formatTime(audioPlayer.duration);
    });

    // Cargar la canción según el parámetro en la URL
    const songIndex = getQueryParam('song');
    if (songIndex !== null) {
        currentSongIndex = parseInt(songIndex, 10);
    }
    loadSong(songs[currentSongIndex]);

    // Seleccionar el contenedor de la barra de progreso
    const progressContainer = document.getElementById('progress-container');

    // Controlador de eventos para hacer clic en la barra de progreso
    progressContainer.addEventListener('click', (e) => {
        const { offsetWidth } = progressContainer;
        const clickX = e.clientX - progressContainer.getBoundingClientRect().left;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / offsetWidth) * duration;
    });

    // Botón de canción aleatoria
    randomBtn.addEventListener('click', () => {
        isRandom = !isRandom;
        randomBtn.classList.toggle('active', isRandom);
    });
});
