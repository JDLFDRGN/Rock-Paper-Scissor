let buttons=document.querySelectorAll(".button");
let leftHand=document.querySelector("#player-hand");
let rightHand=document.querySelector("#computer-hand");
let playerScoreDisplay=document.querySelector("#player-score");
let computerScoreDisplay=document.querySelector("#computer-score");
var hour=0;
let playerPick, computerPick, hasBeatenComputer=false, playerHand, computerHand, inMotion=false, playerScore=0, computerScore=0, isUnbeatable=false;
let rock="Images/rock.svg";
let paper="Images/paper.svg";
let scissor="Images/scissor.svg"
buttons.forEach(element => {element.addEventListener("click",theGame)});
function theGame(){
    if(inMotion)return;
    leftHand.src=rock;
    rightHand.src=rock;
    playerPick=this.value;
    computerRandomPick();
    unbeatableMode();
    unbeatableState();
    motion();
    compare();
}
function computerRandomPick(){
    computerPick=Math.floor(Math.random()*3+1);
    if(computerPick===1)computerPick='rock';
    else if(computerPick===2)computerPick='paper';
    else computerPick='scissor';
}
function compare(){
    if(playerPick===computerPick)return;
    if(playerPick==='rock' && computerPick!=='paper')hasBeatenComputer=true;
    else if(playerPick==='paper' && computerPick!=='scissor')hasBeatenComputer=true;
    else if(playerPick==='scissor' && computerPick!=='rock')hasBeatenComputer=true;
}
function motion(){
    inMotion=true;
    leftHand.classList.add("player-motion");
    rightHand.classList.add("computer-motion");
    hand();
}
function hand(){
    if(playerPick==='rock')playerHand=rock;
    else if(playerPick==='paper')playerHand=paper;
    else playerHand=scissor;
    if(computerPick==='rock')computerHand=rock;
    else if(computerPick==='paper')computerHand=paper;
    else computerHand=scissor;
    setTimeout(()=>{
        leftHand.src=playerHand;
        rightHand.src=computerHand;
        inMotion=false;
        scoreBoard();
        reset();
    },1900)
}
function scoreBoard(){
    if(playerPick===computerPick)return;
    if(hasBeatenComputer)playerScore++;
    else computerScore++;
    playerScoreDisplay.innerHTML=playerScore;
    computerScoreDisplay.innerHTML=computerScore;
}
function reset(){
    hasBeatenComputer=false;
    leftHand.classList.remove("player-motion");
    rightHand.classList.remove("computer-motion");
}
function unbeatableMode(){
    time();
    if(hour!=20)return;
    if(playerPick==='rock' && computerPick==='scissor')isUnbeatable=true;
    else if(playerPick==='paper' && computerPick==='rock')isUnbeatable=true;
    else if(playerPick==='scissor' && computerPick==='paper')isUnbeatable=true;
    else isUnbeatable=false;
}
function unbeatableState(){
    while(isUnbeatable===true){
        computerRandomPick();
        unbeatableMode();
    }
}
function time(){
    var time=new Date();
    hour=time.getHours();
}