let boxes = document.querySelectorAll(".box");
console.log(boxes);
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container ");
let msg = document.querySelector("#msg");


let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8], 
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach( (box)=>{
    box.addEventListener('click',()=>{
    console.log("box was clicked");
   
    count++;
      console.log(count);
   
    if(turn0){
    box.innerText="O";
    turn0=false;
    }else{
        box.innerText="X";
        turn0=true;
    }
    box.disabled = true;
    checkWinner();
    drawGame();
    });
});

const enableBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";

    }
};

const disableBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) =>{
 msg.innerText  = `Congratulations , Winner is ${winner}`;
 msgContainer.classList.remove("hide");
 disableBoxes();
};


const checkWinner = () =>{
    for(pattern of winPatterns){
        console.log(pattern[0],pattern[1],pattern[2])
        console.log(boxes[pattern[0]].innerText,
                    boxes[pattern[1]].innerText,
                    boxes[pattern[2]].innerText);


    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

   if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
    if( pos1Val === pos2Val &&  pos2Val === pos3Val){
        console.log("Winner",pos1Val);
        showWinner(pos1Val);
    }
   }

    }
};

const resetGame = () =>{
turn0 = true;
enableBoxes();
msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

const drawGame = () =>{
    if(!checkWinner || count === 9){
        console.log("Game is draw");
         msg.innerText  = 'Game is Draw ! Please try again';


    }
};