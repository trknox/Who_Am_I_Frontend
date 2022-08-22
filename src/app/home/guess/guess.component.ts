import { Character } from './../../models/character';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { CharacterService } from 'src/app/service/character.service';
import { HintsComponent } from '../hints/hints.component';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent implements OnInit {

  constructor(private charService:CharacterService, private hintsComponent:HintsComponent) { }

  charName:string = ""
  character!: Character
  guess: string = ""
  correct: boolean = false
  clicked: boolean = false
  startGame: boolean = false
  seconds: number = 0
  showMessage: boolean = false

  ngOnInit(): void {
    this.charService.getCharById('abc').subscribe((data:any) =>{
      this.character = data
      console.log(this.character.name)
      this.charName = this.character.name as string
    })
    console.log("st " + this.hintsComponent.startGame)
    this.timer()
  }
  
  timer(){
    setTimeout(() => {
      console.log("Waited For: " + this.seconds + " seconds");
      if(!this.correct){
        //this.timer()
      }
      
  }, 1000);
    this.seconds += 1
  }
  submitGuess(){
    this.clicked = true
    console.log("GUESSSS" + this.guess)

    if(this.guess.toLowerCase() == this.charName.toLowerCase()){
      this.correct = true
    }else{
      this.correct = false
    }
  }
}
