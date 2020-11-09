// todo: integrate key library
@tag("pause-menu");
namespace`hud`(
    class PauseMenu extends WebComponent {
        constructor() {
            super();
        }

        async onConnected() {
            await super.onConnected();
            this.pauseState = false;
            window.addEventListener("keydown", e => {
                if (e.key === 'Escape') {
                    if (!this.pauseState) this.pause();
                    else this.resume();
                }
            });
        }
        pause() {
            this.style.display = 'block';
            this.pauseState = true;
        }
        async resume() {
            this.style.display = 'none';
            this.pauseState = false;
        }
    }
);
