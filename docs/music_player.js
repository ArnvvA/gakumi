document.addEventListener("DOMContentLoaded", function() {
    // List of songs
    const songs = [
        { title: "Her's - Harvey", file: "songs/Her's - Harvey.mp3", image: "images/harvey.jfif" },
        { title: "The Look - Metronomy", file: "songs/Metronomy - The Look.mp3", image: "images/the_look.jfif" },
        { title: "Lovers Rock - TV Girl", file: "songs/Lovers Rock - TV Girl.mp3", image: "images/lovers_rock.jfif" },
        { title: "Like Real People Do - Hozier", file: "songs/Hozier - Like Real People Do.mp3", image: "images/like_real_people_do.jfif"},
        { title: "seeing your name makes me happy - burbank", file: "songs/burbank - seeing your name makes me happy.mp3", image: "images/"},
        { title: "dream a little dream of me", file: "songs/Dream A Little Dream of Me.mp3", image: "images/"},
        { title: "Jigsaw Falling Into Place - Radiohead", file: "songs/Jigsaw Falling Into Place - Radiohead.mp3", image: "images/"},
        { title: "kirari futari - Mamerico", file: "songs/kirari futari.mp3", image: "images/"},
        { title: "Kiss Me - Sixpence None The Richer", file: "songs/Kiss Me.mp3", image: "images/"},
        { title: "Kouya wo Aruke", file: "songs/Kouyao Aruke.mp3", image: "images/"},
        { title: "Ma Meilleure Ennemie - Stomme - Stromae", file: "songs/Ma Meilleure Ennemie.mp3", image: "images/"},
        { title: "No. 1 Party Anthem - Arctic Monkeys", file: "songs/No. 1 Party Anthem.mp3", image: "images/"},
        { title: "", file: "songs/.mp3", image: "images/"},
        { title: "", file: "songs/.mp3", image: "images/"},
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