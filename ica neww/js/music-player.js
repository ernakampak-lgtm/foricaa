/* ==========================================================================
   SPOTIFY-STYLE DIRECT MP3 CYBER MUSIC PLAYER ENGINE
   ========================================================================== */

const PLAYLIST = [
    {
        title: "About You",
        artist: "The 1975",
        src: "Music/YTDown.com_YouTube_The-1975-About-You-Official_Media_tGv7CUutzqU_009_128k.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop"
    },
    {
        title: "Consume",
        artist: "Chase Atlantic (feat. Goon Des Garçons)",
        src: "Music/YTDown.com_YouTube_Chase-Atlantic-Consume-feat-Goon-Des-Gar_Media_oCdXuomafSU_009_128k.mp3",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop"
    },
    {
        title: "Love Story (Slowed & Reverb)",
        artist: "Indila",
        src: "Music/YTDown.com_YouTube_Indila-Love-Story-Slowed-Reverb_Media_sL8-vrfTR7k_009_128k.mp3",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audioPlayer = new Audio();

function initAudioEngine() {
    audioPlayer.src = PLAYLIST[currentTrackIndex].src;
    audioPlayer.preload = "metadata";

    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', playNextTrack);
    audioPlayer.addEventListener('loadedmetadata', () => {
        const timeDurationEl = document.getElementById('music-time-duration');
        if (timeDurationEl && audioPlayer.duration) {
            timeDurationEl.textContent = formatTime(audioPlayer.duration);
        }
    });

    updateUIWithTrack(PLAYLIST[currentTrackIndex]);
}

function setPlayStateUI(playing) {
    const playIcon = document.getElementById('music-play-icon');
    const pauseIcon = document.getElementById('music-pause-icon');
    const vinyl = document.getElementById('music-track-cover');
    const eqBars = document.querySelectorAll('.eq-bar');

    if (playing) {
        if (playIcon) playIcon.classList.add('hidden');
        if (pauseIcon) pauseIcon.classList.remove('hidden');
        if (vinyl) vinyl.classList.add('playing');
        eqBars.forEach(bar => bar.classList.add('playing'));
    } else {
        if (playIcon) playIcon.classList.remove('hidden');
        if (pauseIcon) pauseIcon.classList.add('hidden');
        if (vinyl) vinyl.classList.remove('playing');
        eqBars.forEach(bar => bar.classList.remove('playing'));
    }
}

function updateUIWithTrack(track) {
    const titleEl = document.getElementById('music-track-title');
    const artistEl = document.getElementById('music-track-artist');
    const coverEl = document.getElementById('music-track-cover');

    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (coverEl) coverEl.src = track.cover;

    // Highlight active track button
    const trackBtns = document.querySelectorAll('.track-select-btn');
    trackBtns.forEach((btn, idx) => {
        if (idx === currentTrackIndex) {
            btn.classList.add('bg-cyan-950/80', 'border-cyan-500/40', 'text-slate-200');
            btn.classList.remove('bg-slate-900/80', 'border-blue-900/40', 'text-slate-400');
        } else {
            btn.classList.remove('bg-cyan-950/80', 'border-cyan-500/40', 'text-slate-200');
            btn.classList.add('bg-slate-900/80', 'border-blue-900/40', 'text-slate-400');
        }
    });
}

function loadTrack(index, shouldPlay = true) {
    currentTrackIndex = index;
    const track = PLAYLIST[currentTrackIndex];
    audioPlayer.src = track.src;
    updateUIWithTrack(track);

    if (shouldPlay) {
        audioPlayer.play().then(() => {
            isPlaying = true;
            setPlayStateUI(true);
        }).catch(err => {
            console.warn('Audio play prevented:', err);
        });
    } else {
        isPlaying = false;
        setPlayStateUI(false);
    }
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        setPlayStateUI(false);
    } else {
        audioPlayer.play().then(() => {
            isPlaying = true;
            setPlayStateUI(true);
        }).catch(err => {
            console.warn('Audio play error:', err);
        });
    }
}

function playNextTrack() {
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    loadTrack(nextIdx, true);
}

function playPrevTrack() {
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(prevIdx, true);
}

function updateProgress() {
    const currentTime = audioPlayer.currentTime || 0;
    const duration = audioPlayer.duration || 0;

    const timeCurrentEl = document.getElementById('music-time-current');
    const timeDurationEl = document.getElementById('music-time-duration');
    const progressBar = document.getElementById('music-progress-bar');

    if (timeCurrentEl) timeCurrentEl.textContent = formatTime(currentTime);
    if (timeDurationEl && duration > 0) timeDurationEl.textContent = formatTime(duration);

    if (progressBar && duration > 0) {
        const pct = (currentTime / duration) * 100;
        progressBar.style.width = `${pct}%`;
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    initAudioEngine();

    const playBtn = document.getElementById('music-btn-play');
    const nextBtn = document.getElementById('music-btn-prev');
    const prevBtn = document.getElementById('music-btn-next');
    const progressContainer = document.getElementById('music-progress-container');
    const volumeBtn = document.getElementById('music-btn-volume');

    playBtn?.addEventListener('click', togglePlay);
    nextBtn?.addEventListener('click', playNextTrack);
    prevBtn?.addEventListener('click', playPrevTrack);

    // Track selection click
    const trackBtns = document.querySelectorAll('.track-select-btn');
    trackBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const trackIdx = parseInt(btn.getAttribute('data-track-index'), 10);
            if (!isNaN(trackIdx)) {
                loadTrack(trackIdx, true);
            }
        });
    });

    // Progress bar seeking
    progressContainer?.addEventListener('click', (e) => {
        if (!audioPlayer.duration) return;
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const seekTime = (clickX / width) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    // Mute / Unmute Toggle
    let isMuted = false;
    volumeBtn?.addEventListener('click', () => {
        if (isMuted) {
            audioPlayer.muted = false;
            isMuted = false;
            volumeBtn.classList.remove('text-red-400');
            volumeBtn.classList.add('text-slate-300');
        } else {
            audioPlayer.muted = true;
            isMuted = true;
            volumeBtn.classList.add('text-red-400');
            volumeBtn.classList.remove('text-slate-300');
        }
    });
});
