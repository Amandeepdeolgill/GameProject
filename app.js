let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGame = document.querySelector(".new-btn");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msgContainer");

let turnX = true;

let winPtrns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = () => {
    turnX = true; 
    enableBox();
    msgContainer.classList.add("hide");
}

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

//An event listener to each box.
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){ //Turn of X.
        box.innerText = "X";
        turnX = false;
        } else { //turn of O.
            box.innerText = "O";
            turnX= true;
        }
        box.disabled = true;
        checkWinner();
        checkDraw();
    })
});

const showTryAgain = () => {
    msg.innerText = `It's a draw! Try again.🔄`;
    msgContainer.classList.remove("hide");
}

const showWinner = (winner) => {
    msg.innerText = `Bravo! player ${winner} is the Winner 🏆.`;
    msgContainer.classList.remove("hide");
}

//To check the winner.
let checkWinner = () => {
    for(let pattern of winPtrns){
    let firstIndex = boxes[pattern[0]].innerText;
    let secondIndex = boxes[pattern[1]].innerText;
    let thirdIndex =  boxes[pattern[2]].innerText;
    if(firstIndex!=""&& secondIndex!= "" && thirdIndex != ""){
        if(firstIndex ==secondIndex && secondIndex == thirdIndex){
          console.log("winner",firstIndex);
          showWinner(firstIndex);
          disableBox();
        }
    } 
    };
}


//To check if game is draw.
let checkDraw = () => {
    let draw = true;

    for (let pattern of winPtrns) {
        let firstIndex = boxes[pattern[0]].innerText;
        let secondIndex = boxes[pattern[1]].innerText;
        let thirdIndex = boxes[pattern[2]].innerText;

        if (firstIndex === "" || secondIndex === "" || thirdIndex === "") {
            draw = false;
            break;
        }
    }

    if (draw) {
        console.log("draw");
        showTryAgain();
    }
}
checkDraw();


//Event listeners To reset the game and start the new game
newGame.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

