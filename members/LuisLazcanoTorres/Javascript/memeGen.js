var png = ".png";
let MAX = 12;
let num;
var img = document.createElement("img");

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

num = getRandomInt(MAX);
console.log (num);

img.setAttribute("src", "assets/" + num + ".png")

mem = document.getElementById("memeID");

document.body.appendChild(img);
document.querySelector(".memeClass").appendChild(img);
document.getElementById("memeID").appendChild(img);