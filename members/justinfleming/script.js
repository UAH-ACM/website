let gameBegun = false;
let defualtPos = "0px";
let defualtObstaclePos = "0px";
let defaultLevelPos = "0px";
let jumping = false;
let superJumping = false;
let timeoutActive = false;
let timesFailed = 0;
let timesPressed = 0;
let id = 0;
let keyDown = false;

function StopTimeouts(allTimeouts) 
{
    if (allTimeouts) 
    {
        let _id = window.setTimeout(function() {}, 0);

        while (_id--) 
        {
            window.clearTimeout(_id);
        }
    }
    else 
    {
        window.clearTimeout(id);
    }

}

function ResetGame() 
{
    let elementRules = document.styleSheets[0].cssRules;
    timesFailed++;
    StopTimeouts(true);

    elementRules[4].style.left = defualtObstaclePos;
    elementRules[5].style.left = defualtObstaclePos;
    elementRules[0].style.top = defaultPos;
    elementRules[2].style.left = defaultLevelPos;
    elementRules[3].style.left = defaultLevelPos;
    gameBegun = false;
    jumping = false;
    timeoutActive = false;
    superJumping = false;
}

function BeginGame() 
{
    let elementRules = document.styleSheets[0].cssRules;

    if (timesFailed == 5) 
    {
        NewLevel(elementRules[7].style.left, 7);
    }

    gameBegun = true;
    defaultLevelPos = elementRules[2].style.left;
    NewLevel(elementRules[2].style.left, 2);
    setTimeout(function () 
    {
        MoveObstacle(elementRules[4].style.left, "obstacle", 4);
    }, 3000);
    setTimeout(function () 
    {
        MoveObstacle(elementRules[5].style.left, "death", 5);
    }, 8000);
    setTimeout(function () 
    {
        NewLevel(elementRules[3].style.left, 3);
    }, 15000);
}

function NewLevel(tempPos, level) 
{
    let elementStyle = document.styleSheets[0].cssRules[level].style;
    if (tempPos != "-150px") 
    {
        setTimeout(function () 
        {
            elementStyle.left = (parseInt(tempPos.substring(0, tempPos.length - 2)) - 5) + "px";
            NewLevel(elementStyle.left, level);
        }, 10);
    }
    else 
    {
        if (level == 3) 
        {
            ResetGame();
        }
        elementStyle.left = defaultLevelPos;
    }
}

function MoveObstacle(tempMargin, className, ruleId) 
{
    let elementStyle = document.styleSheets[0].cssRules[ruleId].style;
    if (tempMargin != "-150px") 
    {
        setTimeout(function () 
        {
            elementStyle.left = (parseInt(tempMargin.substring(0, tempMargin.length - 2)) - 5) + "px";
            MoveObstacle(elementStyle.left, className, ruleId);
            const rect1 = document.getElementsByClassName(className)[0].getBoundingClientRect();
            const rect2 = document.getElementsByClassName("word")[0].getBoundingClientRect();
            if ((rect1.left < rect2.right && rect1.right > rect2.left) && ((rect1.top <= rect2.top && (rect1.bottom > rect2.top + 10)) || (rect1.top >= rect2.top && rect1.top < (rect2.bottom - 10)))) ResetGame();
        }, 15);
    }
}

function SuperJump(tempMargin, index, jumpSize) 
{
    let elementStyle = document.styleSheets[0].cssRules[0].style;
    if (index == 0) 
    {
        StopTimeouts(false);
        elementStyle.top = defaultPos;
        tempMargin = defaultPos;
        console.log(elementStyle.top);
        setTimeout(function () 
        {
            elementStyle.top = (parseInt(tempMargin.substring(0, tempMargin.length - 2)) - 5) + "px";
            index++;
            SuperJump(elementStyle.top, index, jumpSize);
        }, 100);
        return;
    }
    if (index < (jumpSize / 2)) 
    {
        setTimeout(function () 
        {
            elementStyle.top = (parseInt(tempMargin.substring(0, tempMargin.length - 2)) - 5) + "px";
            index++;
            SuperJump(elementStyle.top, index, jumpSize);

        }, 15);
    }
    else if (index < jumpSize)
    {
        setTimeout(function () 
        {
            elementStyle.top = (parseInt(tempMargin.substring(0, tempMargin.length - 2)) + 5) + "px";
            index++;
            SuperJump(elementStyle.top, index, jumpSize);

        }, 15 * Math.round(document.getElementsByClassName("word")[0].textContent.length / 10.0));
    }
    else if (index == jumpSize) 
    {
        superJumping = false;
        jumping = false;
    }
}



function Jump(tempMargin, index)
{
    let elementStyle = document.styleSheets[0].cssRules[0].style;
    if (index < 10) 
    {
        id = setTimeout(function () 
        {
            elementStyle.top = (parseInt(tempMargin.substring(0, tempMargin.length - 2)) - 5) + "px";
            index++;
            Jump(elementStyle.top, index);

        }, 75);
    }
    else if (index < 20)
    {
        id = setTimeout(function () 
        {
            elementStyle.top = (parseInt(tempMargin.substring(0, tempMargin.length - 2)) + 5) + "px";
            index++;
            Jump(elementStyle.top, index);

        }, 75 * Math.round(document.getElementsByClassName("word")[0].textContent.length / 10.0));
    }
    else if (index == 20) 
    {
        jumping = false;
    }
}

window.addEventListener("keydown", (event) => 
{
    if (event.key == event.shiftKey && keydown == false) 
    {
        keydown = true;

        let elementRules = document.styleSheets[0].cssRules;
        let tempMargin = elementRules[0].style.top;  
        
        timesPressed++;
        if (gameBegun == false) 
        {
            elementRules[6].style.left = "-2000px";
            defaultPos = elementRules[0].style.top;
            defualtObstaclePos = elementRules[4].style.left;
            BeginGame();
        }
        else if (jumping == false) 
        {
            jumping = true;
            Jump(tempMargin, 0);
        }
        else if (timesPressed > 25 && superJumping == false) 
        {
            superJumping = true;
            jumping = true;
            timesPressed = 0;
            SuperJump(tempMargin, 0, 80);
        }

        if (timeoutActive == false) 
        {
            timeoutActive = true;
            setTimeout(function () 
            {
                timeoutActive = false;
                console.log(timesPressed);
                timesPressed = 0;
            }, 3000);
        }
   
    }
});

window.addEventListener("keyup", (event) => 
{
    keydown = false;
});