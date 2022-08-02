const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(landscape) {
    this.landscape = landscape;
  }

  instructions() {
    let instruct = prompt("Would you like to see the instructions? (y/n) ");
    if (instruct === "y") {
      console.log("You are * and your hat is ^.");
      console.log("Avoid the holes (O) and find your hat!");
      console.log("Don't go out of bounds or you may lose!");
      console.log("Use the u, d, l, and r keys to navigate the field.");
      console.log("u = up, d = down, l = left, r = right");
      console.log("Good luck!");
    }
    if (instruct === "n") {
      console.log("Good luck!");
    }
  }

  navigateField() {
    this.print(this.landscape);
    let navigate = prompt("Which way? ");
    let x = 0;
    let y = 0;
    let current = this.landscape[y][x];
    while (current !== hat) {
      //Navigation logic
      if (navigate === "u") {
        y--;
      } else if (navigate === "d") {
        y++;
      } else if (navigate === "l") {
        x--;
      } else if (navigate === "r") {
        x++;
      } else {
        console.log("Out of bounds. You lose!");
        break;
      }
      //Lose/Win conditions
      if (this.landscape[y][x] === hole) {
        console.log("You fell in a hole! Game over.");
        break;
      } else if (this.landscape[y][x] === hat) {
        console.log("You found your hat! You win!");
        break;
      } else {
        this.landscape[y][x] = pathCharacter;
        this.print();
        navigate = prompt("Which way? ");
      }
      //Out of bounds condition
      if (this.landscape[y] === undefined) {
        console.log("Out of bounds. You lose!");
        break;
      } else if (y < 0 || x < 0) {
        console.log("Out of bounds. You lose!");
        break;
      }
    }
  }

  static generateField(width, height, percentage) {
    // === New Field Logic ===
    // Where the new field will be stored
    let newField = [];

    for (let i = 0; i < height; i++) {
      let newRow = [];
      for (let j = 0; j < height; j++) {
        newRow.push(fieldCharacter);
      }
      newField.push(newRow);
    }

    // === Add special characters ===
    // Random elements
    const randomHeight = Math.floor(Math.random() * height);
    const randomWidth = Math.floor(Math.random() * width);
    // Add holes
    let numOfHoles = 0;
    const holePercentage = Math.floor(((width + height) / 100) * percentage);
    while (numOfHoles < holePercentage) {
      const randomHeight = Math.floor(Math.random() * height);
      const randomWidth = Math.floor(Math.random() * width);
      newField[randomHeight][randomWidth] = hole;
      numOfHoles++;
    }
    // Add hat
    newField[randomHeight][randomWidth] = hat;
    
    // Add initial Path
    newField[0][0] = pathCharacter;

    return newField
  } // End generateField()

  print() {
    for (let i in this.landscape) {
      console.log(this.landscape[i].join(""));
    }
  }

 randomStart () {
  this.landscape[0][0] = fieldCharacter;
  
  this.print(this.landscape);
    
  const randomX = Math.floor(Math.random() * this.landscape.length)
  const randomY = Math.floor(Math.random() * this.landscape.length)

  let y = randomY;
  
  let x = randomX;
  
  let current = this.landscape[x][y];

  let navigate = prompt("Which way? ");
  while (current !== hat) {
    //Navigation logic
    if (navigate === "u") {
      y--;
    } else if (navigate === "d") {
      y++;
    } else if (navigate === "l") {
      x--;
    } else if (navigate === "r") {
      x++;
    } else {
      console.log("Out of bounds. You lose!");
      break;
    }
    //Lose/Win conditions
    if (this.landscape[y][x] === hole) {
      console.log("You fell in a hole! Game over.");
      break;
    } else if (this.landscape[y][x] === hat) {
      console.log("You found your hat! You win!");
      break;
    } else {
      this.landscape[y][x] = pathCharacter;
      this.print();
      navigate = prompt("Which way? ");
    }
    //Out of bounds condition
    if (this.landscape[y] === undefined) {
      console.log("Out of bounds. You lose!");
      break;
    } else if (y < 0 || x < 0) {
      console.log("Out of bounds. You lose!");
      break;
    }
  }

 } // End randomStart property

} // End Field Class

const mySecondField = new Field(Field.generateField(15, 15, 70))

//console.log(mySecondField.instructions());

//console.log(mySecondField.randomStart());

console.log(mySecondField.navigateField())
