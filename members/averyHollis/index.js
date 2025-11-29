// Comment.
// Site code:
let coffeeCount = 0;

window.onload = () => {
    // local data saved in user's browser. 

    /* if (localStorage.getItem("coffeeCount") === null) {
        localStorage.setItem("coffeeCount", 0);
    } else {
        document.getElementById("coffeeCounter").innerText = "Coffees so far: " + coffeeCount; // Init element
    } */

    coffeeCount = localStorage.getItem("coffeeCount")
        ? parseInt(localStorage.getItem("coffeeCount"))
        : (() => {
            localStorage.setItem("coffeeCount", 0);
            return 0;
        })()

        document.getElementById("coffeeCounter").innerText = "Coffees so far: " + coffeeCount; // Init element
}

function incrementCoffee() {
    coffeeCount += 1;
    console.log(coffeeCount);
    document.getElementById("coffeeCounter").innerText = "Coffees so far: " + coffeeCount + "\nThanks!"; //inner HTML would also work

    // alert("Thanks!"); // Popup

    localStorage.setItem("coffeeCount", coffeeCount);
}
















/* 

// JavaSCript refresher. See more info in the pdf of OneMonth resources.
console.log("Hello world!");

var name = "Avery"; // Only use var if you must support old browsers.

const x = 5; // Always use const when val or type should not change.
const y = 6;
let z = x + y; // Only use let when you can't use const.


// What can JS do? Change HTML content
document.getElementById("demo").innerHTML = "<h1>Hellow World!</h1>"

// Change HTML attribute vals
document.getElementById("demo").value = 2;

// Change styles
document.getElementById("demo").style.fontSize = "35px";

document.getElementById("demo").style.display = "none"; // Hide elements
document.getElementById("demo").style.display = "block"; // Show element

// if / else if / else
// switch statement
// ternary operator. (? :)

// Two types of equality: ==, ===
// This is majorly important in JS (for some reason)
// === is strict equality. No type conversions allowed. == does type coercion

// Javascript: case sensitive. lowerCamelCase is common. kebab-case is not possible.
// Bootstrap is a good resource for CSS stuff. Site to check. */