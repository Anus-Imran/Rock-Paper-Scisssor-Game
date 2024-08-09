const btn = document.querySelector(".btn"); //loginBtn ko access kiya 

btn.addEventListener("click", () => { //login waly btn pr event lgaya
    let user_name = document.getElementById('user_name').value; //jaisy hi login pr click hu to user_name ki value pakar lo
    let password = document.getElementById('psw').value; //sath mai password ki value bhi pakar lo

    const Cpassword = "123"; //correct password ye set kr do

    if (password === Cpassword) { //agr to enter kiya hua psw r cpsw equal hai 
        alert("Welcome " + user_name + "!"); //to alert krwa do Welcome + name
        window.location.href = 'game.html'; //r location de do game ki
    } else {
        alert("Invalid Username or Password"); //agr equal nhi hai to alert krwa do invalid 
    }


});

let playerPoints = document.querySelector(".playerPoints");
let computerPoints = document.querySelector(".computerPoints");
let resetBtn = document.querySelector(".reset-btn");
let rulesBtn = document.querySelector(".rules");
let playerBtns = document.querySelectorAll(".btn");
let playAgain = document.querySelector(".playAgainbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let computerImg = document.querySelector(".computerImage");
let playerImg = document.querySelector(".playerImage");

msgContainer.style.display = "none"; //start mai msgContainer ko display none kr do ! kyunky hmy ye tb display krwana hai jab game start hu ! 

let pPoints = 0; //computer points and player points set to zero 
let cPoints = 0;

playerBtns.forEach((btn) => { // ab hmy player ky jo buttons hai har ek button pr click hny pr ek function chlata hai ! to chunky playerBtns nodelist ki form mai hai ! to hm forEch function use kry gy!  ye function jis btn pr click hu ga us btn ko ander majood variable ko pss kry ga ! r us btn pr ek ebent listner lag jaye ga !
    btn.addEventListener("click", () => {
    //jaisy hi kisi bhi btn pr click hta hai ! to ye ek classe add kr do player img mai !
        playerImg.classList.add("shakePlayer");

        let playerChoice = btn.innerHTML.toLowerCase(); //jis btn pr click hu us btn ky ander majood text ko pakro r lowercase mai kr do 
        playerImg.src = playerChoice + "Player.png"; //playerimg ka src change kr do ! r us ko player choice mai pri value r + player.png sy concatenate kr ky new source ban jaye a to playerimg ka src ab wo kr do 
//chunky hmny apni images ko name hi is trha dya hai ! for example , paper pr click hua ! to paper lowercase mai hu kr playerChoice mai chala jaye ga ! r phr playerChoice + player.png to ye ba jaye ga ! paperPlayer.png . to hum dekh skty hai ky hmari is img ka name yhi hu ga ! to is trha img change hu jaye gi click hny pr
        setTimeout(() => { //ye ek aisa function hota hai jo ky ek callback function r ek time miliseconds mai accept krta hai yaini argument mai ye do cheezein leta hai ! t phr utny khas time ky bdd ye us dunction ko run krta hai !

            const choice = ["stone", "paper", "scissors"]; //computer ki bhi teen choices hu gi un teen choices ko ek array mai store kr lo !
            let arrayNo = Math.floor(Math.random() * 3); //ye do functions ka use hua hai ! Math.floor point ky aagy sari value ko hata dy ga r ek single number return kry ga ! math.random random numbers generate kry ga ! hmny 3 sy multiple kiya hai to is ka matlab hai ky wo 0 , 1 r 2 ky bich mai hi numbers generate kry ga ! 
            let computerChoice = choice[arrayNo]; //ab hmny wo random number choice array ko pss kr dya ! ky choice ky is index pr pri value ko computerChoice mai pss kr do !

            computerImg.src = computerChoice + "Computer.png"; //ab same usi trha jaisy player ki image change ki aisy hi yaha bhi image computer ki change hu jaye gi ! 

            playerImg.classList.remove("shakePlayer"); //ye kam krny ky bdd is class ko playerImg sy hata do !

            let result = getResult(playerChoice, computerChoice); //r playerChoice r computerChoice jo hu gi wo getResult ky function ko pss kr do ! ye function result ko result variable mai store krwaye ga !
            displayResult(result); //phr us result ko hm display krwa dy gy
            updateScores(result); //r us result ky mutabiq score print krwa dy gy

        }, 900); //9milisecond ky bdd ye timeout wala function chly ga ! 
    });
});

let getResult = (player, computer) => { //yaha playerChoice r computerChoice aaye gi ! 
    if (player === computer) { // agr to dono choices equal hai to draw
        return "draw";
    }
    if ((player === "stone" && computer === "scissors") || //game conditions ky mutabiq agr player jeet rha hai  to win
        (player === "paper" && computer === "stone") ||
        (player === "scissors" && computer === "paper")) {
        return "win";
    }
    return "lose";// werna lose return kr do
};

let displayResult = (result) => {
    if (result === "win") { //agr to result win hai ! to print krwa do msg ky you win
        msg.innerHTML = "You Win!";
    } else if (result === "lose") {
        msg.innerHTML = "You Lose!";
    } else {
        msg.innerHTML = "It's a Draw!";
    }
    msgContainer.style.display = "flex"; // r sath mai display none ko ab display flex kr do yaini show hu jaye ga msg !
};

let updateScores = (result) => {
    if (result === "win") {  //agr to result win hai ! yaini player jeeta hai ! to pPoints ko increment kr do ! 
        pPoints++;
        playerPoints.innerHTML = `Player <br><br> ${pPoints}`; //r playerPoints waly div mai player ky bdd do break ky bdd pPoints print krwa do
    } else if (result === "lose") { //agr wo win nhi kr rha to offcourse phr computer win kr rha hu ga r computer ky points increment hu gy! 
        cPoints++;
        computerPoints.innerHTML = `Computer <br><br> ${cPoints}`;
    }


    if (pPoints === 10 || cPoints === 10) { //jaisy hi points 10 hu jaye gy jis ky bhi wo win kr jaye ga !

        if (pPoints === 10) {
            alert("Congratulations, You Win!");
        } else {
            alert("Computer Wins! Better luck next time.");
        }


        ResetGame(); //r jaisy hi alert mai win aaye ga ! game dobara sy reset hu jaye gi !
    }
};

let ResetGame = () => { //reset game mai sb kch dobara sy new kr do ! 
        pPoints = 0;
        cPoints = 0;
        playerPoints.innerHTML = `Player <br><br> ${pPoints}`;
        computerPoints.innerHTML = `Computer <br><br> ${cPoints}`;
        msgContainer.style.display = "none";
        playerImg.src = "stonePlayer.png";
        computerImg.src = "stoneComputer.png";
};

let addResetEventListener = () => { 
    resetBtn.addEventListener("click" , ResetGame); //resetBtn pr eventlistner lgaya hai ! 
}

addResetEventListener(); //r phr us function ko cal kr dya !

rulesBtn.addEventListener("click", () => { //rules Btn hai ye 
    alert("Rules:\n1. Win the game by being the first to reach 10 points! When you score 10 points, you'll be congratulated as the winner, and the game will reset automatically.\n\nWinning Cnditions :\n1. Stone beats Scissors\n2. Scissors beats Paper\n3. Paper beats Stone\nMake your move by clicking one of the buttons!");
});

playAgain.addEventListener("click", ResetGame); //r playAgain pr click hu kr bhi game reset hu jaye gi ! 
