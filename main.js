const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");

const winConditions=[

                [0,1,2],
                [3,4,5],
                [6,7,8],
                [2,5,8],
                [1,4,7],
                [0,3,6],
                [0,4,8],
                [2,4,6]
];
let options=["","","", "","","","", "",""];
let currentPlayer="X";
let isRunning="False";


initializeGame();




//------------------functions-----------------

function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent=`${currentPlayer}'s turn`;
    isRunning=true;
}

function cellClick(){
    const cellIndex=this.getAttribute("cellIndex");
    if(options[cellIndex]!=""|| !isRunning){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
    
}

function changePlayer(){
    currentPlayer=(currentPlayer=="X") ? "O":"X";
    statusText.textContent=`${currentPlayer}'s turn`;

}
// console.log(winConditions[0]);

function checkWinner(){
    let roundWon=false;

    for (let i=0; i<winConditions.length; i++){
        const condition=winConditions[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];

        if (cellA==""||cellB ==""||cellC==""){
            continue;
        }

        if(cellA==cellB && cellB==cellC){
            roundWon=true;
            break;
        }
        
    }
    if (roundWon){
        statusText.textContent=`${currentPlayer} Wins🙌`;
        isRunning=false;
    }

    else if(!options.includes("")){
        statusText.textContent=`Draw 🤷‍♀️`;
        isRunning=false;
    }

    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer="X";
    options=["","","", "","","","", "",""];
    statusText.textContent=`${currentPlayer}'s turn`
    cells.forEach(cell=>cell.textContent="");
    isRunning=true;
}
