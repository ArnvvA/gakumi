document.addEventListener("DOMContentLoaded", function() {
    // List of songs
    const songs = [
        { title: "Her's - Harvey", file: "songs/Her's - Harvey.mp3", image: "images/harvey.jfif" },
        { title: "The Look - Metronomy", file: "songs/Metronomy - The Look.mp3", image: "images/the_look.jfif" },
        { title: "Lovers Rock - TV Girl", file: "songs/Lovers Rock - TV Girl.mp3", image: "images/lovers_rock.jfif" }
    ];


    // Declare variables outside the event listener
    let currentSongIndex = 0;

    let audioPlayer = document.getElementById("audio-player");
    let audioSource = document.getElementById("audio-source");
    let songTitle = document.getElementById("song-title");
    let songImage = document.getElementById("song-image-img");
    let playPauseButton = document.getElementById("play-pause");
    let progressBar = document.getElementById("progress-bar");
    let valueDisplay = document.getElementById("value-display");

    // Function to update the player with the current song
    function updatePlayer() {
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        audioSource.src = currentSong.file;
        songImage.src = currentSong.image;
        
        audioPlayer.load(); // Reload audio element to apply changes
        progressBar.value = 0; // Reset the progress bar
    }

    // Event listener for the play/pause button
    playPauseButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.style.backgroundImage = "url('assets/pause.png')";
        } else {
            audioPlayer.pause();
            playPauseButton.style.backgroundImage = "url('assets/play.png')";
        }
    });

    // Event listener for previous song button
    document.getElementById("prev").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();
        audioPlayer.play(); // Play the selected song
        playPauseButton.style.backgroundImage = "url('assets/pause.png')";
    });

    // Event listener for next song button
    document.getElementById("next").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();
        audioPlayer.play(); // Play the selected song
        playPauseButton.style.backgroundImage = "url('assets/pause.png')";
    });

    // Event listener to update progress bar as the song plays
    audioPlayer.addEventListener("timeupdate", function() {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progress;
            // valueDisplay.textContent = `Value: ${Math.floor(progress * 100)}%`;
        }
    });

    // Event listener for progress bar input (seek)
    progressBar.addEventListener("input", function() {
        if (audioPlayer.duration) {
            audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration ;
        }
    });

    // Automatically play next song when the current one ends
    audioPlayer.addEventListener("ended", function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer();
    audioPlayer.play();
    playPauseButton.style.backgroundImage = "url('assets/pause.png')";
    });

    updatePlayer(); // Initialize player with first song
});