// https://codereview.stackexchange.com/questions/213760/window-innerwidth-workaround-for-when-it-returns-the-wrong-value
const binarySearch = dim => function bin(start, end) {
    const guess = Math.floor((start + end) / 2)

    // this checks if we have the correct value, if not it will keep calling itself until there's a match
    if (window.matchMedia(`(${dim}: ${guess}px)`).matches) {
        return guess
    }

    // since it is not a match, then we need to recalibrate the range and call again.
    // for that we check the boolean value using with min-width (height) rule.
    return window.matchMedia(`(min-${dim}: ${guess}px)`).matches
        ? bin(guess, end)
        : bin(start, guess)
}

const getCorrectDimension = (dim = 'width', range = 300) => {
    if (dim !== 'width' && dim !== 'height') {
        throw Error('`getCorrectDimension` accepts "width" or "height" as parameter')
    }

    let prop = 'inner' + dim.charAt(0).toUpperCase() + dim.slice(1)

    // here checks if the window.innerWidth or Height it's the correct one
    if (window.matchMedia(`(${dim}: ${window[prop]}px)`).matches) {
        return window[prop]
    }

    // here, since the value is wrong we use binarySearch to find its correct value
    const start = window[prop] - range >= 0 ? window[prop] - range : 0
    const end = window[prop] + range

    return binarySearch(dim)(start, end)

}

const getMobileDiv = () => {
    var mobile = `            <div id="mobile">
                    <div class="row">
                        <div class="four columns">
                            <div class="left">
                                <div class="leftimage">
                                    <a href="https://www.acm.org"><img src="images/acm-logo-transparent.png" width="100%"
                                            alt="Association for Computing Machinery"></a>
                                </div>
                            </div>
                        </div>
                </div>
    
                <div class="row-bot" id="mobile-site-map" style="display: flex; justify-content: center">
                    <div class="four columns" style="font-size: medium; padding: 2%">
                        <div class="rightimage">                            
                            <a href="index.html">Home</a>
                        </div>
                    </div>
    
                    <div class="four columns" style="font-size: medium; padding: 2%">
                        <div class="rightimage">
                            <a href="aboutus.html">About Us</a>
                        </div>
                    </div>
    
                    <div class="four columns" style="font-size: medium; padding: 2%">
                        <div class="rightimage">
                            <a href="membership.html">Membership</a>
                        </div>
                    </div>
    
                    <div class="four columns" style="font-size: medium; padding: 2%">
                        <div class="rightimage">
                            <a href="projects.html">Projects</a>
                        </div>
                    </div>
    
                    <div class="four columns" style="font-size: medium; padding: 2%">
                        <div class="rightimage">
                            <a href="contactus.html">Contact Us</a>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>`;

    return mobile;
}

const getDesktopDiv = () => {
    var desktopDiv = `
                        <div class="row" id="desktop">
                            <div class="four columns">
                                <div class="left">
                                    <div class="leftimage">
                                        <a href="https://www.acm.org"><img src="images/acm-logo-transparent.png" width="100%"
                                                alt="Association for Computing Machinery"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="four columns" style="font-size: medium">
                                <div class="left">
                                    <div class="rightimage">
                                        <a href="index.html">Home</a>
                                        <h1></h1>
                                        <a href="aboutus.html">About Us</a>
                                        <h1></h1>
                                        <a href="membership.html">Membership</a>
                                    </div>
                                </div>
                            </div>
                            <div class="four columns" style="font-size: medium">
                                <div class="right">
                                    <div class="rightimage">
                                        <a href="projects.html">Projects</a>
                                        <h1></h1>
                                        <a href="contactus.html">Contact Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                            `;
    return desktopDiv;
}

const driverCode = () => {
    var mobile = document.getElementById("mobile");
    var desktop = document.getElementById("desktop");
    var site_map = document.getElementById("mobile-site-map");

    if (getCorrectDimension() < 550 && mobile === null && site_map === null) {
        desktop.remove();
        document.getElementById("bar").innerHTML += getMobileDiv();
    }
    else if ((getCorrectDimension() > 550) && (desktop === null) && (mobile != null)) {
        mobile.remove();
        site_map.remove();
        document.getElementById("bar").innerHTML += getDesktopDiv();
    }
}