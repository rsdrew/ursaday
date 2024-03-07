let musicSection = document.getElementById('music');

// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks to be played.
let track_list = [
    {
        name: 'El Oso',
        image: '/assets/images/hyperphagiaCoverArt.jpg',
        path: '/assets/music/el-oso.mp3'
    },
    {
        name: 'Unclear',
        image: '/assets/images/hyperphagiaCoverArt.jpg',
        path: '/assets/music/unclear.mp3'
    },
    {
        name: 'Shout It Aloud',
        image: '/assets/images/hyperphagiaCoverArt.jpg',
        path: '/assets/music/shout-it-aloud.mp3'
    },
    {
        name: 'Thunder',
        image: '/assets/images/hyperphagiaCoverArt.jpg',
        path: '/assets/music/thunder.mp3'
    },
    {
        name: 'Walk Alone',
        image: '/assets/images/hyperphagiaCoverArt.jpg',
        path: '/assets/music/walk-alone.mp3'
    },
    {
        name: 'Push and Pull',
        image: '/assets/images/hyperphagiaCoverArt.jpg',
        path: '/assets/music/push-and-pull.mp3'
    },
    {
        name: 'Have At It',
        image: '/assets/images/haveAtItCoverArt.jpg',
        path: '/assets/music/have-at-it.mp3'
    },
    {
        name: 'Morning Light',
        image: '/assets/images/habitatCoverArt.jpg',
        path: '/assets/music/morning-light.mp3'
    },
    {
        name: 'Stellars Jay',
        image: '/assets/images/habitatCoverArt.jpg',
        path: '/assets/music/stellars-jay.mp3'
    },
    {
        name: 'Embers',
        image: '/assets/images/habitatCoverArt.jpg',
        path: '/assets/music/embers.mp3'
    }
];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update background image of Music section
    musicSection.style.backgroundImage = "url(" + track_list[track_index].image + ")";

    // Update details of the track
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    now_playing.textContent = "Playing " + (track_index + 1) + " of " + track_list.length;

    // Set an interval of 1 second for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    // Move to the next track if the current finishes playing using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
    curr_time.textContent = "0:00";
    total_duration.textContent = "0:00";
    seek_slider.value = 0;
}

function playPauseTrack() {
    // Switch between playing and pausing depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;

    // Replace the pause icon with the play icon.
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    // Replace the play icon with the pause icon.
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack() {
    // Go back to the first track if the current one is the last one in the track list
    if (track_index < track_list.length - 1) {
        track_index += 1;
    }
    else {
        track_index = 0;
    }

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    // Go back to the last track if the current one is the first in the track list
    if (track_index > 0) {
        track_index -= 1;
    }
    else {
        track_index = track_list.length - 1;
    }

    // Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the percentage of the seek slider, and get the relative duration to the track
    let seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek point.
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);