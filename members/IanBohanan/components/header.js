class Header extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
        this.innerHTML = `
        <div class="flex-container">
          <div class="overlay buoy">
              <div class = "rectangle"> 
                  <a href="index.html">HOME</a> 
              </div>
              <img src="./assets/buoy.svg" height="100px"/>
          </div>
          <div class="overlay buoy">
              <div class = "rectangle"> 
                  <a href="about.html">ABOUT</a> 
              </div>
              <img src="./assets/buoy.svg" height="100px"/>
          </div>
        </div>
        `;
      }
    }
  
  
customElements.define('header-component', Header);