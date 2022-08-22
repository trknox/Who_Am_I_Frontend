import { User } from 'src/app/models/users';
import { Score } from './../../models/score';
import { CharacterService } from 'src/app/service/character.service';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HintService } from 'src/app/service/hint.service';
import { Hints } from 'src/app/models/hints';
import { Character } from 'src/app/models/character';
import { ScoreService } from 'src/app/service/score.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-hints',
  templateUrl: './hints.component.html',
  styleUrls: ['./hints.component.css']
})
export class HintsComponent implements OnInit {

  constructor(private userService:UserService, private hintService:HintService, private characterService:CharacterService, private scoreService:ScoreService) { }

  hints: Hints[] = [];
  characters: Character[] = []
  charObject!: Character
  charId: string = ""
  clicked: boolean = false
  hint: string = "" 
  scripture: string = ""
  count: number = -1

  //GUESS
  charName:string = ""
  character!: Character
  guess: string = ""
  correct: boolean = false
  guessClicked: boolean = false
  startedGame: boolean = false
  resetTimer: boolean = false
  seconds: number = 0
  showMessage: boolean = false

  //save score
  userScoreExists: boolean = false
  existingScore: number = 0
  saveScore: Score = {
    userId:"",
    time:0,
  }
  allScores: Score[] = []
  allScoresAsc: Score[] = []
  allUserIds: string[] = []
  allUserNames: string[] = []
  user: User[] = []
  i: string =  ""

  ngOnInit(): void {
    //get list of all characters
    this.characterService.getAllCharacters().subscribe((data:any) =>{
      this.characters = data
    })

    //get score in ascending order
    this.scoreService.getAscScore().subscribe((data:any) => {
      this.allScoresAsc = data

      //get user ids for scores
      for(var i = 0; i < this.allScoresAsc.length; i++){
        this.allUserIds[i] = this.allScoresAsc[i].userId as string
        console.log("ALLLLIDDASCCC " + this.allUserIds[i])
      }

      //get users from ids
      for(var i = 0; i < this.allUserIds.length; i++){
        this.userService.getUserById(this.allUserIds[i]).subscribe((data:any) => {
          this.user[i] = data
          if(this.user[i].id == "7bf57164-ba26-423c-adb6-6cfd8a85133c"){
            this.i = "me"
          }
          console.log("USERNAMME " + this.user[i].username)
        })
      }

      //get usernames from users
      for(var i = 0; i < this.user.length; i++){
        this.allUserNames[i] = this.user[i].username as string
        console.log("USERRRNAMME " + this.allUserNames[i])
      }
    })
    
  }

  startTime!: Date;
  stopTime!: Date;
  active: boolean = false
  get display() { return (this.startTime && this.stopTime) ? +this.stopTime - +this.startTime : 0 }

  secondTimer(){
    setTimeout(() => {
      console.log("Waited For: " + this.seconds + " seconds");
      if(!this.resetTimer && this.active){
        this.secondTimer()
      }else if(!this.active){
        this.seconds = 0
      }
  }, 1000);
    this.seconds += 1
  }

  timer() {
    if (this.active) {
      this.stopTime = new Date()
      setTimeout(()=>{
        this.timer()
      }, 1000)
    }
  }

  start() {
    this.startTime = new Date()
    this.stopTime = this.stopTime
    this.active = true
    this.timer()

    console.log("Starrt" + this.startTime as string)
  }

  stop() {
    this.stopTime = new Date()
    this.active = false
    //location.reload();
  }
  
  startGame(){
    this.clicked = true
    this.generateNewChar()
    setTimeout(() => {
      this.secondTimer()
  }, 1000);

  }

  generateNewChar(){
    //pick random character from list
    this.charObject = this.characters[Math.floor(Math.random() * this.characters.length)]
    //get id from that character
    this.charId = this.charObject.id as string
    this.charName = this.charObject.name as string

    console.log("name: " + this.charObject.name)
    console.log("id: " + this.charId)
  }

  generateHint(){
    if(this.count < this.hints.length - 1){
      this.count = this.count + 1
    }else{
      this.count = 0
    }

    this.hintService.getHintByCharId(this.charId).subscribe((data:any) => {
      this.hints = data
      console.log(this.hints)

      this.hint = this.hints[this.count].hint as string
      this.scripture = this.hints[this.count].scripture as string
      console.log("oedinoidnog " + this.hint)
    })
    
    
  }

  submitGuess(){
    this.guessClicked = true
    console.log("GUESSSS" + this.guess)

    if(this.guess.toLowerCase() == this.charName.toLowerCase()){
      this.correct = true
      this.resetTimer = true
      this.stop()
      //if guess is correct save score to database
      this.saveScore.userId = localStorage.getItem("id") as string
      this.saveScore.time = this.seconds
      console.log("SAVED USER ID " + this.saveScore.userId)
      console.log("SAVED TIME " + this.saveScore.time)

      this.scoreService.getAllScores().subscribe((data:any) =>{
        this.allScores = data

        //check if user is already on scoreboard
        for(var i = 0; i < this.allScores.length; i++){
          if(this.allScores[i].userId == localStorage.getItem("id")){
            this.userScoreExists = true
            this.existingScore = this.allScores[i].time as number
          }
        }

        //if user is on scoreboard compare two scores
        if(this.userScoreExists){
          //save lowest score
          if(this.existingScore > this.seconds-1){
            this.scoreService.updateScore(this.saveScore)
          }
        }else{
          //if user is not on scoreboard add score
          this.scoreService.saveScore(this.saveScore)
        }

        this.resetTimer = false
      })
      
    }else{
      this.correct = false
    }
  }
}


