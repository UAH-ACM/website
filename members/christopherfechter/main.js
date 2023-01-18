function validate() {
    var oneletter = document.getElementById("oneletter").value;
    var twoletter = document.getElementById("twoletter").value;
    var threeletter = document.getElementById("threeletter").value;
    var fourletter = document.getElementById("fourletter").value;
    var fiveletter = document.getElementById("fiveletter").value;

    if (oneletter == "S" && twoletter == "U" && threeletter == "S" && fourletter == "S" && fiveletter == "Y") {
        document.getElementById('audio1').play();
        alert("You got it right!");
    }
    else {
        document.getElementById('audio2').play();
        alert("Wrong!");
    }
}
