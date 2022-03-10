const main = document.querySelector("main");
const root = document.documentElement;

let clicked = [];

let currentCard;

const sleep = (timeMs) => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};

const createGrid = (col, row) => {
  root.style.setProperty("--col", col);
  root.style.setProperty("--row", row);

  let title = document.createElement("h1");
  title.textContent = "Jeu de mémoire";

  let myGrid = document.createElement("div");
  myGrid.classList.add("grid-container");

  let imgArray = [];
  let cpt = 0;
  let secondImgArray = [];

  for (let i = 0; i < col * row; i++) {
    let imgNb;

    if (cpt < (col * row) / 2) {
      do {
        imgNb = Math.floor(Math.random() * 25 + 1);
      } while (imgArray.includes(imgNb));

      imgArray.push(imgNb);
    } else {
      do {
        imgNb = imgArray[Math.floor(Math.random() * ((col * row) / 2))];
      } while (secondImgArray.includes(imgNb));
      secondImgArray.push(imgNb);
    }
    console.log(imgNb);
    cpt += 1;

    let newDiv = document.createElement("div");
    newDiv.classList.add("grid-item");
    newDiv.innerHTML = `<img src='assets/img/pokeball.gif' data-img='${imgNb}'/>`;
    newDiv.addEventListener("click", () => {
      checkImg(imgNb, newDiv);
    });
    myGrid.appendChild(newDiv);
  }

  let pikaContainer = document.createElement("div");
  pikaContainer.className = "loader-container";

  let pikaRun = document.createElement("img");
  pikaRun.src = "assets/img/pika_run.gif";
  pikaRun.className = "pika";

  main.appendChild(pikaContainer);
  pikaContainer.appendChild(pikaRun);
  main.appendChild(title);
  main.appendChild(myGrid);
};

const successAlert = () => {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: "success",
    title: "Bien joué !",
  });
};

const showImg = (i, target) => {
  target.innerHTML = `<img src='assets/img/${i + 1}.png'/>`;
};
const hideImg = (target) => {
  target.innerHTML = `<img src='assets/img/pokeball.gif'/>`;
};

const checkImg = (id, target) => {
  showImg(id, target);
  if (clicked.length == 0) {
    currentCard = target;
    clicked.push(id);
  } else if (clicked[0] != id) {
    setTimeout(() => {
      clicked = [];
      hideImg(currentCard);
      hideImg(target);
    }, 1200);
  } else if (clicked[0] == id) {
    clicked = [];
    successAlert();
  }
  console.log(clicked);
};

window.addEventListener("load", () => {
  let colChoice = prompt("Nombre de colonnes ?");
  let rowChoice = prompt("Nombre de lignes ?");

  createGrid(parseInt(colChoice), parseInt(rowChoice));
});
