const main = document.querySelector('main')
const root = document.documentElement;


const createGrid = (col, row) => {
    root.style.setProperty('--col', col)
    root.style.setProperty('--row', row)


    let title = document.createElement('h1')
    title.textContent = "La grille"
    
    let myGrid = document.createElement('div')
    myGrid.classList.add('grid-container')

    for (let i = 0; i < col * row; i++){
        let newDiv = document.createElement("div")
        newDiv.classList.add("grid-item")
        myGrid.appendChild(newDiv)
    }

    main.appendChild(title)
    main.appendChild(myGrid)
}

createGrid(7, 4)