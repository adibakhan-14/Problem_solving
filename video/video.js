//I have used singleton design pattern to write the functionalities of video player

const video = document.querySelector('#video');
const videoControls = document.querySelector('#video-controls');
const progressBar = document.querySelector('#progress-bar');
const seek = document.querySelector('#seek');
const seekTooltip = document.querySelector('#seek-tooltip');

//To hide the default video controls we need to provide our own interface
//create video element and include our interface code
const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
    video.controls = false;
    videoControls.classList.remove('hidden');
}
const playButton = document.querySelector('#play');
const forwardButton = document.querySelector('#forward');
const rewindButton = document.querySelector('#rewind');
const timeElapsed = document.querySelector('#time-elapsed');
const duration = document.querySelector('#duration');

// togglePlay toggles the playback state of the video.
// If the video playback is paused or ended, the video is played otherwise, the video is paused

function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}

playButton.addEventListener('click', togglePlay);
const playbackIcons = document.querySelectorAll('.playback-icons use');

// updatePlayButton updates the playback icon and tooltip depending on the playback state
function updatePlayButton() {
    playbackIcons.forEach(icon => icon.classList.toggle('hidden'));

}
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);

function updatePlayButton() {
    playbackIcons.forEach(icon => icon.classList.toggle('hidden'));

    if (video.paused) {
        playButton.setAttribute('data-title', 'Play')
    } else {
        playButton.setAttribute('data-title', 'Pause')
    }
}
// formatTime takes a time length in seconds and returns the time in minutes and seconds

function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

    return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};
//rewind functionalities

function rewindPlayButton() {
    video.currentTime -= 5;
}

rewindButton.addEventListener('click', rewindPlayButton);
//forward functionalities

function forwardPlayButton() {
    video.currentTime += 5;
}
forwardButton.addEventListener('click', forwardPlayButton);

// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}
video.addEventListener('loadedmetadata', initializeVideo);
// updateTimeElapsed indicates how far through the video
// the current playback is
function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}
video.addEventListener('timeupdate', updateTimeElapsed);

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress() {
    seek.value = Math.floor(video.currentTime);
    progressBar.value = Math.floor(video.currentTime);
}
video.addEventListener('timeupdate', updateProgress);
// updateSeekTooltip uses the position of the mouse on the progress bar to
// roughly work out what point in the video the user will skip to if
// the progress bar is clicked at that point
function updateSeekTooltip(event) {
    const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
    seek.setAttribute('data-seek', skipTo)
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = video.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

seek.addEventListener('mousemove', updateSeekTooltip);
// skipAhead jumps to a different point in the video when
// the progress bar is clicked
function skipAhead(event) {
    const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
}
seek.addEventListener('input', skipAhead);