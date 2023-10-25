class Header extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
        this.innerHTML = `
        <div id="sky">
        <!-- All the buoys in the header.js file-->
        <svg class="overlay waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(48, 178, 206, 0.72)" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(48, 178, 206, 0.72)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(48, 178, 206, 0.72)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(48, 178, 206, 0.72)" />
            </g>
        </svg>

        <div class="flex-container buoy">
            <div>
                <div class = "rectangle"> 
                    <a href="index.html">HOME</a> 
                </div>
                <img src="./assets/buoy.svg" height="100px"/>
            </div>
            <div>
                <div class = "rectangle"> 
                    <a href="about.html">ABOUT</a> 
                </div>
                <img src="./assets/buoy.svg" height="100px"/>
            </div>
            <div>
                <div class = "rectangle"> 
                    <a href="https://uah.acm.org/">Back to ACM</a> 
                </div>
                <img src="./assets/buoy.svg" height="100px"/>
            </div>
        </div>
    </div>
        `;
      }
    }
  
  
customElements.define('header-component', Header);