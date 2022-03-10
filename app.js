const main = document.querySelector("main");
const body = document.querySelector("body");
const root = document.documentElement;

let clicked = [];

let currentCard;

let colRow;

let found = [];

const playEffectOne = () => {
  let audio = new Audio("assets/song/effect-1.mp3");
  audio.volume = 0.1;
  audio.play();
};

const playEffectTwo = () => {
  let audio = new Audio("assets/song/effect-1.mp3");
  audio.volume = 0.1;
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 800);
};

const playEffectThree = () => {
  let audio = new Audio("assets/song/effect-3.mp3");
  audio.volume = 0.1;
  audio.play();
};

const createGrid = (col, row) => {
  root.style.setProperty("--col", col);
  root.style.setProperty("--row", row);

  if ((col * row) % 2 != 0) {
    colRow = col * row - 1;
  } else {
    colRow = col * row;
  }

  let title = document.createElement("h1");
  title.textContent = "Jeu de mémoire";

  let myGrid = document.createElement("div");
  myGrid.classList.add("grid-container");

  let imgArray = [];
  let cpt = 0;
  let secondImgArray = [];

  for (let i = 0; i < colRow; i++) {
    let imgNb;

    if (cpt < colRow / 2) {
      do {
        imgNb = Math.floor(Math.random() * 25 + 1);
      } while (imgArray.includes(imgNb));

      imgArray.push(imgNb);
    } else {
      do {
        imgNb = imgArray[Math.floor(Math.random() * (colRow / 2))];
      } while (secondImgArray.includes(imgNb));
      secondImgArray.push(imgNb);
    }
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

  main.appendChild(title);
  main.appendChild(myGrid);
  body.appendChild(pikaContainer);
  pikaContainer.appendChild(pikaRun);

  startTimer();
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

const startTimer = () => {
  let timer = document.querySelector(".timer");
  let min = 0;
  let second = 0;
  function formatTime(time) {
    if (time < 10) {
      return `0${time}`;
    } else return time;
  }
  setInterval(() => {
    second += 1;
    if (second == 60) {
      second = 0;
      min += 1;
      timer.textContent = `${formatTime(min)}:${formatTime(second)}`;
    } else {
      timer.textContent = `${formatTime(min)}:${formatTime(second)}`;
    }
  }, 1000);
};

const showImg = (i, target) => {
  target.childNodes[0].style.transform = "scale(1) rotate(360deg)";
  setTimeout(() => {
    target.innerHTML = `<img src='assets/img/${i + 1}.png'/>`;
  }, 1000);
};
const hideImg = (target) => {
  target.childNodes[0].style.transform = "scale(0) rotate(-360deg)";
  setTimeout(() => {
    target.innerHTML = `<img src='assets/img/pokeball.gif'/>`;
    target.childNodes[0].style.transform = "scale(1) rotate(0)";
  }, 1000);
};

const checkImg = (id, target) => {
  showImg(id, target);
  setTimeout(() => {
    if (clicked.length == 0 && !found.includes(id) && currentCard != target) {
      currentCard = target;
      playEffectTwo();
      clicked.push(id);
    } else if (
      clicked[0] != id &&
      !found.includes(id) &&
      currentCard != target
    ) {
      playEffectThree();
      clicked = [];
      setTimeout(() => {
        hideImg(currentCard);
        hideImg(target);
      }, 1200);
    } else if (
      clicked[0] == id &&
      !found.includes(id) &&
      currentCard != target
    ) {
      clicked = [];
      found.push(id);
      playEffectOne();
      successAlert();
    }
  }, 700);
};

window.addEventListener("load", () => {
  let colChoice = prompt("Nombre de colonnes ?");
  let rowChoice = prompt("Nombre de lignes ?");

  createGrid(parseInt(colChoice), parseInt(rowChoice));
});
