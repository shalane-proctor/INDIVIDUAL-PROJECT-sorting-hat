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
  <div id="opener">
    <h1>Welcome to Hogwarts!</h1>
    <h5>Thestral dirigible plums, Viktor Krum hexed memory charm Animagus Invisibility Cloak three-headed Dog. Half-Blood Prince Invisibility Cloak cauldron cakes, hiya Harry! Grindlewald pig’s tail Sorcerer's Stone biting teacup. Side-along dragon-scale suits Filch 20 points, Mr. Potter.</h5>
  </div>
  <h6>Enter First Year's Name</h6>

  <form onsubmit="return false;">
    <div class="input-group mb-3">
      <div id="formName">Student:</div>
      <input id="name" type="text" class="form-control" placeholder="Student Name" required>
      <button id="sort" class="btn btn-outline-secondary" type="submit" id="button-addon2">Sort!<i class="fa-solid fa-hat-wizard"></i></button>
  </div>
  </form>

  <div id="filterBtnContainer">
  <button id="all type="button" class="btn btn-secondary"">All</button>
  <button id="hufflepuff" type="button" class="btn btn-warning">Hufflepuff</button>
  <button id="gryffindor" type="button" class="btn btn-danger">Gryffindor</button>
  <button id="ravenclaw" type="button" class="btn btn-primary">Ravenclaw</button>
  <button id="slytherin" type="button" class="btn btn-success">Slytherin</button>
  <button id="voldemortsArmy" type="button" class="btn btn-dark">Voldemort's Army</button>
  </div>

<div id="allCards"> 

  <div id="studentsContainer" class:"allStudents">
  <h3>First Year's <i class="fa-solid fa-broom"></i></h3>
    <div id="studentCards" class="card-container allStudents"></div>
  </div>

  <div id="armyContainer">
  <h3>Voldemorts Army <i class="fa-solid fa-skull-crossbones"></i></h3>
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
        <button id="expel--${student.id}" class="btn btn-primary">EXPEL</button>
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
    domString += `<div id="black" class="card" style="width: 250px;">
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
  let addId = () => {
    students.forEach((item, index) => {
      item.id = index + 1;
    });
  };
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
    addId();
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
    if (e.target.id.includes("expel")) {
      const [method, expelId] = e.target.id.split("--");
      console.log(expelId);
      const idOfStudent = students.findIndex(
        (nameOfExpelled) => nameOfExpelled.id === parseInt(expelId)
      );
      army.push(students.splice(idOfStudent, 1)[0]);
      cardsOnDom(students);
      expelOnDom(army);
      console.log(army);
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
