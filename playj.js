


var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var running = true;
var currentPlayer = 0; 
let symbols = ["X", "O"]; 
var auto=0;
var your_turn = true;
var auto_moving=false;
function getRandomInt() {
    return Math.floor(Math.random() * 9); 
}

function version(){
    const playerCount = localStorage.getItem("players");
    if( playerCount==1){
        auto=1;
        return
    }
    auto=0;
}

function chooseMove(arr){
  
    
    let statesArr = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]]

    
    for (let i = 0; i < statesArr.length; i++) {
        let [index1, index2, index3] = statesArr[i];
        index1--; index2--; index3--; 
        
        
        if (arr[index1] === symbols[auto] && arr[index2] === symbols[auto] && arr[index3] === 0) return index3;
        if (arr[index1] === symbols[auto] && arr[index3] === symbols[auto] && arr[index2] === 0) return index2;
        if (arr[index2] === symbols[auto] && arr[index3] === symbols[auto] && arr[index1] === 0) return index1;
    }

    for (let i = 0; i < statesArr.length; i++) {
        let [index1, index2, index3] = statesArr[i];
        index1--; index2--; index3--;
        if (arr[index1] === symbols[currentPlayer] && arr[index2] === symbols[currentPlayer] && arr[index3] === 0) return index3;
        if (arr[index1] === symbols[currentPlayer] && arr[index3] === symbols[currentPlayer] && arr[index2] === 0) return index2;
        if (arr[index2] === symbols[currentPlayer] && arr[index3] === symbols[currentPlayer] && arr[index1] === 0) return index1;
    }

    
    let availableMoves = arr
    .map((val, i) => (val === 0 ? i : null))
    .filter(i => i !== null); 

    if (availableMoves.length === 0) return -1; 
    let indexx = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return indexx;



}

function states(arr) {
    let statesArr = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    for (let i = 0; i < statesArr.length; i++) {
        let index1 = statesArr[i][0];
        let index2 = statesArr[i][1];
        let index3 = statesArr[i][2]; 
        if (
            arr[index1 - 1] !== 0 && 
            arr[index1 - 1] === arr[index2 - 1] &&
            arr[index1 - 1] === arr[index3 - 1]
        ) {
            return true;
        }
    
    }
    return false;
}

function set(index, cell, symbol) {
    if (arr[index] !== 0) {
        alert("Cell is already taken");
        return;
    }

    if(auto && !your_turn && !auto_moving){
        return;
    }
    
    cell.innerHTML = symbol;
    arr[index] = symbol; 

    if (states(arr)) {
        
        running = false;
        PopUp()
        return;
    }
    if(checkMoves()){
        setTimeout(() => PopUp(), 1000);
        
        running=false;
        return;
    }

    if(!auto){
    currentPlayer = currentPlayer === 0 ? 1 : 0;

    
    document.getElementById("plInfo").innerHTML = `PLAYER: ${symbols[currentPlayer]}`;}
    
}
function checkMoves(){
    for(let i=0;i<arr.length;i++){
        if (arr[i]===0){
            return false
        }

    }
    return true;
   
    
}

function game() {
    version();
    
    let cells = document.getElementsByClassName("cells");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function () {
            if ((running && your_turn && auto) || (running&& !auto)) {
                set(i, cells[i], symbols[currentPlayer]);
                your_turn = false; 

                if (running && auto) {
                    if (checkMoves()) return;
                    setTimeout(function(){
                    auto_moving = true;
                    let index = chooseMove(arr);
                    set(index, cells[index], symbols[auto]);
                    auto_moving = false;
                    your_turn = true;},500)
                }
            }
        });
    }
    

    
    document.getElementById("plInfo").innerHTML = `PLAYER: ${symbols[currentPlayer]}`;
}

game();

document.getElementById("restart").addEventListener("click", function () {
    arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    running = true;
    currentPlayer = 0;
    your_turn = true;
    auto_moving = false;
    document.getElementById("plInfo").innerHTML = `PLAYER: ${symbols[currentPlayer]}`;
    let cells = document.getElementsByClassName("cells");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
});

function PopUp() {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("restart").style.backgroundColor ="rgba(222, 89, 122, 0.47)"
    document.getElementById("restart").style.cursor = "default"
    document.getElementById("menu").style.cursor = "default"
    document.getElementById("menu").style.backgroundColor ="rgba(222, 89, 122, 0.47)"
     
}

function ClosePopUp() {
    document.getElementById("popup").style.display = "none"; 
    document.getElementById("restart").style.backgroundColor ="rgba(222, 89, 122)"
    document.getElementById("menu").style.backgroundColor ="rgba(222, 89, 122)"
    document.getElementById("restart").style.cursor = "pointer"
    document.getElementById("menu").style.cursor = "pointer"
}
document.getElementById("menu").addEventListener("click", function() {
    window.location.href = "xoxo.html";
});