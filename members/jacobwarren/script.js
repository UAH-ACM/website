const append = "_";
window.onload = function(){
    const go = document.querySelector('#go');
    go.addEventListener('click', goClick);

    function goClick() {

        const go = document.createElement("button");
        document.querySelector('#go-container').appendChild(go);
        go.id = "go";
        go.innerText = "Go";
        
        go.addEventListener('click', goClick);
    }
}