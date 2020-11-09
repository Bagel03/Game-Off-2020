
@tag("splash-loader");
namespace `hud` (
    class Splash extends WebComponent {
        constructor() {
            super();
        }

        //Any calls to [.this] is this component, <splash-loader>.
        async onConnected() {
            await super.onConnected(); //onConnected fires when components DOM is ready
            if(Config.SHOW_LOADER){//see <head> tag to disable
                application.addEventListener("showsplash",  e => this.onShow());
                this.addEventListener('transitionend',      e => this.onTransitionEnded(e));
                this.logo = this.querySelector("#logo");
                this.fadeToLogo();
            } else {
				this.fade()
				await wait(700)
				this.classList.add("hidden");
            }
        }

        fade(){
			this.classList.add("fade")
        }

        show(){
        	this.classList.remove("hidden");
        	this.classList.remove("fade")
        }

        onShow(){
        	this.show();
        	this.fade();
        }

        async fadeToLogo(){
            await wait(2000);
            this.classList.add("showing-logo");
            await wait(2000);
            this.classList.remove("showing-logo");
            this.fade();
        }

        onTransitionEnded(e){
            if(e.target == this.logo){return};//don't do anything if fading to logo
            this.classList.add("hidden");
            this.classList.remove("fade")
        }

        onLoadInstanceStylesheet(){
            return false; //no index.css file to load, it's baked into cssStyle() below.
        }











        //*************************************** NEED TO RENDER SPLASH AS FAST AS POSSIBLE **********************************
        //************************* No index.html to load; instead override template() for fastest render ********************
        template (){
        	return `
        		<template>
					<div class='container'>
					  <i class='layer'></i>
					  <i class='layer'></i>
					  <i class='layer'></i>
                      <img id="logo" src="../../../resources/images/game-off-anim.gif" style="height: 115px;">
					</div>
				</template>
        	`
        }


        //************************* No index.css to load; instead override cssStyle() for fastest render ********************
        cssStyle(){
        	return `

        	:host {
				border: 0;
				display: block;
				padding: 10px;
				position: fixed;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				background:black;
				color:
				white;
				opacity: 1;
				z-index: 10000000;
				transition: opacity .7s;
				box-sizing: border-box;
			}

            :host #logo {
                position: absolute;
                /* display: none; */
                opacity: 0;
                top: 50%;
                transform: translate3d(-50%, -50%,0);
                left: 50%;
                margin-left: 16px;
                margin-top: 36px;
                transition:opacity .3s;
            }

            :host.showing-logo #logo {
                position: absolute;
                opacity: 1;
                top: 50%;
                transform: translate3d(-50%, -50%,0);
                left: 50%;
                margin-left: 16px;
                margin-top: 36px;
                transition:opacity .5s;
            }
            :host.showing-logo span {
                opacity:0;
            }

			:host.fade{
				opacity:0;
			}

			:host.hidden{
				visibility:hidden;
				z-index:-100;
			}


			/**
			 * Create the loop delay with
			 * the extra keyframes
			 */
			@-webkit-keyframes moveup {
			  0%, 60%, 100% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			  }
			  25% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(1em);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(1em);
			  }
			}
			@keyframes moveup {
			  0%, 60%, 100% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			  }
			  25% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(1em);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(1em);
			  }
			}
			@-webkit-keyframes movedown {
			  0%, 60%, 100% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			  }
			  25% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(-1em);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(-1em);
			  }
			}
			@keyframes movedown {
			  0%, 60%, 100% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(0);
			  }
			  25% {
			    -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(-1em);
			            transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg) translateZ(-1em);
			  }
			}
			/**
			 * Square layer styles
			 */
			:host .layer {
			  display: block;
			  position: absolute;
			  height: 3em;
			  width: 3em;
			  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.2);
			  -webkit-transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg);
			          transform: rotateX(50deg) rotateY(0deg) rotateZ(45deg);
			}
			:host .layer:nth-of-type(1) {
			  background: #534a47;
			  margin-top: 1.5em;
			  -webkit-animation: movedown 1.8s cubic-bezier(0.39, 0.575, 0.565, 1) 0.9s infinite normal;
			          animation: movedown 1.8s cubic-bezier(0.39, 0.575, 0.565, 1) 0.9s infinite normal;
			}
			:host .layer:nth-of-type(1):before {
			  content: '';
			  position: absolute;
			  width: 85%;
			  height: 85%;
			  background: #37332f;
			}
			:host .layer:nth-of-type(2) {
			  background: #5a96bc;
			  margin-top: 0.75em;
			}
			:host .layer:nth-of-type(3) {
			  background: rgba(255, 255, 255, 0.6);
			  -webkit-animation: moveup 1.8s cubic-bezier(0.39, 0.575, 0.565, 1) infinite normal;
			          animation: moveup 1.8s cubic-bezier(0.39, 0.575, 0.565, 1) infinite normal;
			}

			/* Stage and link styles */

			:host .container {
			    width: auto !important;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -30px;
                width: 100px;
                display: inline-block;
                margin-left: 0;
                transform: translate3d(-50%, -50%, 0);
			}`
        }
    }
);
