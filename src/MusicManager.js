export class MusicManager {
    constructor(){
        this.currentTrack = null;
        this.volume = 0.02;
    }

    playTrack(track, volume) {
        // If there is already music playing, stop it
        if (this.currentTrack) {
            this.currentTrack.pause();
            this.currentTrack.currentTime = 0;
        }

        // Set volume
        this.volume = volume ?? 0.02;

        // Play the new track
        this.currentTrack = track;
        this.currentTrack.loop = true;
        this.currentTrack.volume = this.volume;
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