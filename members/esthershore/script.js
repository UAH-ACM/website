function redirect(url) {
    window.location.href = url;
}

function refresh() {
    window.location.reload();
}

let i = 0;
let text = "click to pop...";
let speed = 100;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("info").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function makeButtons(num) {
    for (let i = 1; i <= num; i++) {
        let bubble = document.createElement("button");
        bubble.textContent = "pop";
        bubble.setAttribute("class", "bubble-button");
        bubble.setAttribute("id", "bubble-button" + i);
        let container = document.getElementById("bubble-container");
        container.append(bubble);
        bubble.onclick = () => pop(i);
    }
}

let nums = [];
for (let n = 1; n <= 88; n++) {
    nums.push(n);
}

let popCount = 0;
function pop(i) {
    nums = nums.filter(num => num != i);
    if (popCount < 88) {
        popCount++;
        document.getElementById("counter").innerHTML = "pops: " + popCount;
    }
    if (popCount == 88) {
        document.getElementById("info").innerHTML = "Congrats, you popped all the bubbles!"
    }
    let popped = document.getElementById("bubble-button" + i);
    popped.style.color = "#D3E0DD";
    popped.style.background = "#2C3333";
    popped.disabled = true;
}


function randomPop() {
    if (popCount < 88) {
        let bubbleNum = nums[Math.floor(Math.random()*nums.length)];
        pop(bubbleNum);
        nums = nums.filter(num => num != bubbleNum);
    }
}

window.addEventListener("load", () => {
    makeButtons(88);
});

window.addEventListener("keypress", (event) => {
    if(event.key == "Enter"){
        document.getElementById("refresh-button").click();
    }
    else if(event.key == ' '){
        document.getElementById("toggle").click();
    }
});
