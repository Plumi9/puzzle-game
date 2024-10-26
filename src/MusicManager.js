export class MusicManager {
    constructor(){
        this.currentTrack = null;
    }

    playTrack(track) {
        // If there is already music playing, stop it
        if (this.currentTrack) {
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
        }

        // Play the new track
        this.currentTrack = track;
        this.currentTrack.loop = true;
        this.currentTrack.volume = 0.02;  // Set the volume level as needed
        this.currentTrack.play().catch(error => {
            console.error("Error playing audio:", error);
        });
    }

    stopTrack() {
        if (this.currentTrack) {
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
            this.currentTrack = null;
        }
    }
}