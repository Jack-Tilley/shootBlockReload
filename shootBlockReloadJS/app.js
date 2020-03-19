class Player{
    constructor(name){
        this.name = name;
        this.score = 0;
        this.action = 0;
        this.ammo = 0;
        this.dead = false;
        this.ready = false;
    }

    set_action(action_type){
        if (action_type === 1){
            if (this.ammo >= 1){
                this.ammo -= 1;
                this.action = 1;
            } else {
                this.action = 0;
            }

        } else if (action_type === 2){
            this.action = 2;

        } else if (action_type === 3){
            this.ammo += 1;
            this.action = 3;

        } else {
            this.action = 0;
        }
    }

    get_action(){
        return this.action;
    }


}

class Game{
    constructor(p1,p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.gameOver = false;
        this.ready = false;
    }

    play(){
        this.writePlayerInfo();
        // console.log("GOT ACTIONS")
        // if !this.gameOver()
        if(!this.gameOver){
            this
            this.check_moves()
            this.is_dead();

            this.writePlayerInfo();

        }
    }
        
    

    check_moves(){
        var narration = document.getElementById("narration");
        narration.innerText = "player 1 has chosen: " + this.p1.action;
        narration.innerText = "player 2 has chosen: " + this.p2.action;
        
        if (this.p1.action == 1 && this.p2.action == 1){
            narration.innerText = "Both players bullets hit"
        } else if(this.p1.action == 1 && this.p2.action == 2){
            narration.innerText = "Player 2 has blocked player 1s shot";
        } else if(this.p1.action == 2 && this.p2.action == 1) {
            narration.innerText = "Player 1 has blocked player 2s shot";
        }else if(this.p1.action == 2 && this.p2.action == 2) {
            narration.innerText = "Both players shielded";
        }else if(this.p1.action == 1 && this.p2.action == 3) {
            this.p2.dead = true;
            narration.innerText = "Player 1 has eliminated player 2";
        }else if(this.p1.action == 3 && this.p2.action == 1) {
            this.p1.dead = true;
            narration.innerText = "Player 2 has eliminated player 1";
        }else if(this.p1.action == 3 && this.p2.action == 3) {
            narration.innerText = "Both players have reloaded";
        }else if(this.p1.action == 3 && this.p2.action == 2) {
            narration.innerText = "Player 1 has reloaded while player 2 blocks";
        }else if(this.p1.action == 2 && this.p2.action == 3) {
            narration.innerText = "Player 2 has reloaded while player 1 blocks";
        } else {
            if(this.p1.action == 1 && this.p2.action == 0){
                this.p2.dead = true;
                narration.innerText = "Player 1 shot player 2 while they floundered";
            } else if(this.p1.action == 0 && this.p2.action == 1){
                this.p1.dead = true;
                narration.innerText = "Player 2 shot player 1 while they floundered";
            } else{
                narration.innerText = "Nothing interesting happened";
            }
        }


    }

    is_dead(){
        if(this.p1.dead || this.p2.dead){
            // this.gameOver = true;
            // console.log("game over")
            if (this.p1.dead){
                this.p2.score += 1;
            } else {
                this.p1.score += 1;
            }
            this.updateScore();
            this.p1.ammo = 0;
            this.p1.action = 0;
            this.p2.ammo = 0;
            this.p2.action = 0;
            check1 = 0;
            check2 = 0;
            this.p1.dead = false;
            this.p2.dead = false;
            this.p1.ready = false;
            this.p2.ready = false;
        } 

    }

    writePlayerInfo(){
        // console.log("writing info");
        const p1Old = document.getElementById('player1Info').firstChild;
        const p1New = document.createElement('div');
        p1New.innerHTML = `
            <h4>${this.p1.name}</h4>
            <p>Ammo: ${this.p1.ammo}</p>
            <p>Last Action: ${this.p1.action}</p>
            <p id="ready1" >Ready: ${this.p1.ready}</p>

        `;
        p1Old.parentNode.replaceChild(p1New,p1Old);

        const p2Old = document.getElementById('player2Info').firstChild;
        const p2New = document.createElement('div');
        p2New.innerHTML = `
            <h4>${this.p2.name}</h4>
            <p>Ammo: ${this.p2.ammo}</p>
            <p>Last Action: ${this.p2.action}</p>
            <p id="ready2" >Ready: ${this.p2.ready}</p>
        `;
        p2Old.parentNode.replaceChild(p2New,p2Old);

    }

    clearPlayerInfo(){
        // needs implementation
        // console.log("clearing info");
    }

    selectAction1(event){
        // console.log(1)
        event.preventDefault();
        // console.log(event.target.id);
        const choice = event.target.id;
        if (choice === "shoot"){
            this.p1.set_action(1)
        } else if (choice === "block"){
            this.p1.set_action(2)
        } else if (choice === "reload"){
            this.p1.set_action(3)
        } else {
            this.p1.set_action(0)
        }
        this.p1.ready = true;
    }
    selectAction2(event){
        // console.log(1)
        event.preventDefault();
        
        // console.log(event.target.id);
        const choice = event.target.id;
        if (choice === "shoot"){
            this.p2.set_action(1)
        } else if (choice === "block"){
            this.p2.set_action(2)
        } else if (choice === "reload"){
            this.p2.set_action(3)
        } else {
            this.p2.set_action(0)
        }
        this.p2.ready = true;
    }

    
    selectActions(e){
        e.preventDefault();
        let ret1 = check1;
        let ret2 = check2;
        // console.log(e.target.id);
        const choice = e.target.id;
        if (choice === "shoot1"){
            game.p1.ready = true;
            ret1 = 1;
        } else if (choice === "block1"){
            game.p1.ready = true;
            ret1 = 2;
        } else if (choice === "reload1"){
            game.p1.ready = true;
            ret1 = 3;
        } else if (choice === "shoot2"){
            game.p2.ready = true;
            ret2 = 1;
        } else if (choice === "block2"){
            game.p2.ready = true;
            ret2= 2;
        } else if (choice === "reload2"){
            game.p2.ready = true;
            ret2 = 3;
        } else {
            
            console.log("something strange happened");
            
        }
        check1 = ret1;
        check2 = ret2;
        game.updateReady();
        
    }
    selectReady(e){
        e.preventDefault();
        // console.log(e.target.id);
        ready = !ready;
        game.p1.set_action(check1);
        game.p2.set_action(check2);
        game.play();
        game.p1.ready = false;
        game.p2.ready = false;
        game.updateReady();
        check1 = 0;
        check2 = 0;
        
    }
    selectReset(e){
        e.preventDefault();
        // console.log(e.target.id);
        reset = !reset;
        game.p1.action = 0;
        game.p2.action = 0;
        game.p1.ammo = 0;
        game.p2.ammo = 0;
        game.p1.score = 0;
        game.p2.score = 0;
        game.p1.ready = false;
        game.p2.ready = false;
        game.p1.dead = false;
        game.p2.dead = false;
        let nar = document.getElementById("narration");
        nar.innerText = "Game Reset";
        game.updateScore();
        game.writePlayerInfo();
        
        
    }


    getActions(){
        // console.log("pick a move");
        var shootbutton = document.getElementById("shoot1");
        let sbtn1 = shootbutton.addEventListener("click",this.selectActions);
        var blockbutton = document.getElementById("block1");
        let bbtn1 = blockbutton.addEventListener("click",this.selectActions);
        var reloadbutton = document.getElementById("reload1");
        let rbtn1 = reloadbutton.addEventListener("click",this.selectActions);

        var shootbutton = document.getElementById("shoot2");
        let sbtn2 = shootbutton.addEventListener("click",this.selectActions);
        var blockbutton = document.getElementById("block2");
        let bbtn2 = blockbutton.addEventListener("click",this.selectActions);
        var reloadbutton = document.getElementById("reload2");
        let rbtn2 = reloadbutton.addEventListener("click",this.selectActions);

        var readybutton = document.getElementById("readyBoth");
        let rbtn = readybutton.addEventListener("click",this.selectReady);

        var resetbutton = document.getElementById("reset");
        let resetbtn = resetbutton.addEventListener("click",this.selectReset);
    }

    updateScore(){
        let score = document.getElementById("score");
        score.innerText = " " + this.p1.score + " : " + this.p2.score;
    }

    updateReady(){
        let r1 = document.getElementById("ready1");
        let r2 = document.getElementById("ready2");
        r1.innerText = "Ready: " + this.p1.ready;
        r2.innerText = "Ready: " + this.p2.ready;

    }


}

let pa = new Player('p1');
let pb = new Player('p2');
let game = new Game(pa, pb);
var check1;
var check2;
var ready = false;
var reset = false;
game.writePlayerInfo();
game.getActions();
// console.log("done with that")


//
 //ALLOW PLAYERS TO CLICK READY
//

// game.play();


