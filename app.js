const main = document.querySelector("main");
const root = document.documentElement;

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
        imgNb = Math.floor(Math.random() * 25);
      } while (imgArray.includes(imgNb));

      imgArray.push(imgNb);
    } else {
      do {
        imgNb = imgArray[Math.floor(Math.random() * ((col * row) / 2))];
      } while (secondImgArray.includes(imgNb));
      secondImgArray.push(imgNb);
    }

    cpt += 1;

    let newDiv = document.createElement("div");
    newDiv.classList.add("grid-item");
    newDiv.innerHTML = `<img src='assets/img/pokeball.gif' data-img='${imgNb}'/>`;
    newDiv.addEventListener("click", () => {
      showImg(imgNb, newDiv);
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

const showImg = (i, target) => {
  target.innerHTML = `<img src='assets/img/${i + 1}.png'/>`;
};

window.addEventListener("load", () => {
  let colChoice = prompt("Nombre de colonnes ?");
  let rowChoice = prompt("Nombre de lignes ?");

  createGrid(parseInt(colChoice), parseInt(rowChoice));
});
