document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("background-music");
    var startAudioButton = document.getElementById("startAudioButton");

    if (audio && startAudioButton) {
        // Check if the audio has been paused or ended
        if (audio.paused || audio.ended) {
            startAudioButton.addEventListener("click", function() {
                // Play the audio
                audio.play().then(function() {
                    console.log("Audio played successfully.");
                }).catch(function(error) {
                    console.error("Error playing audio:", error);
                });
            });
        }
    } else {
        console.error("Audio element or start button not found.");
    }
});


