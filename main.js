// ****** DATA ******** //
let students = [{ name: "", house: "", expel: Boolean }];
let houses = ["Slytherin", "Hufflepuff", "Ravenclaw", "Gryffindor"];

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
  

<div>
  <h6>Enter First Year's Name</h6>
    <div class="input-group mb-3">
      <div>Student:</div>
      <input id="name" type="text" class="form-control" placeholder="Student Name" aria-label="Student Name" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Sort!</button>
  </div>
</div>

  <div id="filterBtnContainer">
  <button id="all">All</button>
  <button id="hufflepuff">Hufflepuff</button>
  <button id="gryffindor">Gryffindor</button>
  <button id="ravenclaw">Ravenclaw</button>
  <button id="slytherin">Slytherin</button>
  </div>

  <div id="studentsContainer">
  <h3>First Year's</h3>
    <div id="studentCards" class="card-container></div>
  </div>

  <div id="armyContainer">
  <h3>Voldemorts Army</h3>
  </div>
    <div id="armyCards" class="card-container"></div>
  </div>`;
  renderToDom("#source", domString);
};

// card //
const cardsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${student.name}</h5>
    <h4 class="card-text">${student.house}</h4>
    <button id="expel--${student.name}" class="btn btn-primary">EXPEL</button>
  </div>
</div>`;
  }
  renderToDom("#studentCards", domString);
};

const expelOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
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
  const form = document.querySelector("input");
  form.addEventListener("click", (e) => {
    e.preventDefault();
    const newStudent = {
      name: document.querySelector("#name").value,
    };
    source();
    students.push(newStudent);
    // form.reset();
  });
};
// filter //
// buttons on card //
source();
cardsOnDom(students);
eventListeners();
