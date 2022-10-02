function redirect(url) {
    window.location.href = url;
}

function refresh() {
    window.location.reload();
}

function makeButtons(num) {
    for (let i = 1; i <= num; i++) {
        bubble = document.createElement("button");
        bubble.textContent = "pop";
        bubble.setAttribute("class", "bubble-button");
        bubble.setAttribute("id", "bubble-button" + i);
        let container = document.getElementById("bubble-container");
        container.append(bubble);
        bubble.onclick = () => pop(i);
    }
}

let popCount = 0;
function pop(i) {
    popCount++;
    document.getElementById("info").innerHTML = "pops: " + popCount;
    let popped = document.getElementById("bubble-button" + i);
    popped.style.color = "#D3E0DD";
    popped.style.background = "#2C3333";
    popped.disabled = true;
    if (popCount == 88) {
        alert("Congrats, you popped all the bubbles!");
    }
}
