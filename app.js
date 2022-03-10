const main = document.querySelector('main')
const root = document.documentElement;


const createGrid = (col, row) => {
    root.style.setProperty('--col', col)
    root.style.setProperty('--row', row)


    let title = document.createElement('h1')
    title.textContent = "Jeu de mémoire"
    
    let myGrid = document.createElement('div')
    myGrid.classList.add('grid-container')

    for (let i = 0; i < col * row; i++){
        let newDiv = document.createElement("div")
        newDiv.classList.add("grid-item")
        newDiv.innerHTML = `<img src='assets/img/${i + 1}.png'/>`
        myGrid.appendChild(newDiv)
    }

    let pikaContainer = document.createElement('div')
    pikaContainer.className = "loader-container"

    let pikaRun = document.createElement('img')
    pikaRun.src = "assets/img/pika_run.gif"
    pikaRun.className = "pika"

    main.appendChild(pikaContainer)
    pikaContainer.appendChild(pikaRun)
    main.appendChild(title)
    main.appendChild(myGrid)
}

window.addEventListener('load', () => {
    let colChoice = prompt("Nombre de colonnes ?")
    let rowChoice = prompt("Nombre de lignes ?")

    createGrid(parseInt(colChoice), parseInt(rowChoice))
})
55
