// ****** DATA ******** //
let students = [];
let houses = ["Slytherin", "Hufflepuff", "Ravenclaw", "Gryffindor"];
let army = [];

// ****** UTILITY FUNCTION ******** //
const renderToDom = (divId, textToRender) => {
  const selectElement = document.querySelector(divId);
  selectElement.innerHTML = textToRender;
};

// ****** HTML ELEMENTS FUNCTION ******** //
// html setup //
const source = () => {
  const domString = `<div id="main">
  <h1>Welcome to Hogwarts!</h1>
  <h5>Thestral dirigible plums, Viktor Krum hexed memory charm Animagus Invisibility Cloak three-headed Dog. Half-Blood Prince Invisibility Cloak cauldron cakes, hiya Harry! Grindlewald pig’s tail Sorcerer's Stone biting teacup. Side-along dragon-scale suits Filch 20 points, Mr. Potter.</h5>
  

  <h6>Enter First Year's Name</h6>
  <form onsubmit="return false;">
    <div class="input-group mb-3">
      <div>Student:</div>
      <input id="name" type="text" class="form-control" placeholder="Student Name" required>
      <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Sort!</button>
  </div>
  </form>

  <div id="filterBtnContainer">
  <button id="all">All</button>
  <button id="hufflepuff">Hufflepuff</button>
  <button id="gryffindor">Gryffindor</button>
  <button id="ravenclaw">Ravenclaw</button>
  <button id="slytherin">Slytherin</button>
  <button id="voldemortsArmy">Voldemort's Army</button>
  </div>

<div id="allCards"> 

  <div id="studentsContainer" class:"allStudents">
  <h3>First Year's</h3>
    <div id="studentCards" class="card-container allStudents"></div>
  </div>

  <div id="armyContainer">
  <h3>Voldemorts Army</h3>
    <div id="armyCards" class="card-container allStudents"></div>
   </div> 
  </div>
</div>`;

  renderToDom("#source", domString);
};

// card //
const cardsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `
<div class="row">
  <div class="col-sm-6">
    <div class="card" style="width: 250px;">
      <div id=${student.color} class="card-body">
        <h5 class="card-title" style="text-align: right;">${student.name}</h5>
        <h4 class="card-text" style="text-align: right;">${student.house}</h4>
        <button id="expel--${student.name}" class="btn btn-primary">EXPEL</button>
        </div>
      </div>
  </div>
</div>`;
  }
  renderToDom("#studentCards", domString);
};

const expelOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 250px;">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <h4 class="card-text">EXPELLED</h4>
  </div>
</div>`;
  }
  renderToDom("#armyCards", domString);
};

// ****** EVENT LISTNERS ******** //
// submit //
const eventListeners = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let sort = houses[Math.floor(Math.random() * houses.length)];
    // let colorSort = () => {
    let color;
    if (sort === "Hufflepuff") {
      color = "yellow";
    } else if (sort === "Ravenclaw") {
      color = "blue";
    } else if (sort === "Slytherin") {
      color = "green";
    } else if (sort === "Gryffindor") {
      color = "red";
    } else {
      color = "black";
    }
    let newStudent = {
      name: document.querySelector("#name").value,
      house: sort,
      color: color,
    };

    students.push(newStudent);
    cardsOnDom(students);
    console.log(newStudent);
    form.reset();
  });

  // filter //
  document
    .querySelector("#filterBtnContainer")
    .addEventListener("click", (e) => {
      if (e.target.id === "all") {
        cardsOnDom(students);
        expelOnDom(army);
      } else if (e.target.id) {
        const houseOfStudent = students.filter(
          (houseName) => houseName.house.toLowerCase() === e.target.id
        );
        console.log(houseOfStudent);
        cardsOnDom(houseOfStudent);
      }
    });

  // buttons on card //
  document.querySelector("#allCards").addEventListener("click", (e) => {
    if (e.target.id) {
      const [expelId] = e.target.id.split("--");
      const nameOfStudent = students.findIndex(
        (nameOfExpelled) => nameOfExpelled.name === expelId
      );
      if (e.target.id.includes("expel")) {
        army.push(students.splice(nameOfStudent, 1)[0]);
        cardsOnDom(students);
        expelOnDom(army);
        console.log(army);
      }
    }
  });
};
// ****** START ******** //
const startApp = () => {
  source();
  cardsOnDom(students);
  expelOnDom(army);
  eventListeners();
};
startApp();
