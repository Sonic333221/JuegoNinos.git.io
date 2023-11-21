const moves = document.getElementById("moves");
const container = document.querySelector(".container");
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");

let movesCount, imagesArr = [];
let currentElement = null;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

const random = () => Math.floor(Math.random() * 8) + 1;

const randomImage = () => {
    while (imagesArr.length < 8) {
        let randomVal = random();
        if (!imagesArr.includes(randomVal)) {
            imagesArr.push(randomVal);
        }
    }
    imagesArr.push(9);
}

const gridGenerator = () => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let div = document.createElement("div");
            div.setAttribute("data-position", `${i}_${j}`);
            div.addEventListener("click", selectImage);
            div.classList.add("image-container");
            div.innerHTML = `<img src="Imagenes/imagen${imagesArr[count]}.jpg" class="image ${imagesArr[count] === 9 ? "target" : ""}" data-index="${imagesArr[count]}"/>`;
            count += 1;
            container.appendChild(div);
        }
    }
}

const selectimage = (d) =>{
    d.preventDefault();

    currentElement = d.target;

    let targetElement = document.querySelector(".target");
    let currentparent = currentElement.parentElement;
    let targetparent = targetElement.parentElement;

    const [row1,col1] = getCoords(currentparent);
    const [row2,col2] = getCoords(targetElement);

    if(checkAdjacent(row1,row2,col1,col2)){
        currentElement.remove();
        targetElement.remove();

        let currentindex = parseInt(currentElement.getAttribute("data-index"));
        let targetindex = parseInt(targetElement.getAttribute("data-index"));

        currentElement.setAttribute("data-index",targetIndex);
        targetElement.setAttribute("data-index",currentindex);

        currentparent.appendChild(targetElement);
        targetparent.appendChild(currentElement);

        let currentArrIndex = imagesArr.indexOf(currentindex);
        let targetArrIndex = imagesArr.indexOf(targetindex);
        [imagesArr[currentArrIndex],imagesArr[targetArrIndex]] = [imagesArr[targetArrIndex],imagesArr[currentArrIndex]];

        if(imagesArr.join("")=="123456789"){
            setTimeout(()=>{
                coverScreen.classList.remove("hide");
                container.classList.add("hide");
                result.innerText=`total moves ${movesCount}`;
                startButton.innerText = "restartgame";
            },1000)
        }
    }

    movesCount +=1;
    movesCount.innerText=`moves ${movesCount}`;
}

const selectImage = (e) => {
    const clickedImage = e.target;
    const [clickedRow, clickedCol] = clickedImage.parentElement.getAttribute("data-position").split("_");

    if (!currentElement) {
        currentElement = clickedImage;
        currentElement.style.border = "2px solid red";
    } else {
        const [currentRow, currentCol] = currentElement.parentElement.getAttribute("data-position").split("_");

        if (checkAdjacent(parseInt(currentRow), parseInt(clickedRow), parseInt(currentCol), parseInt(clickedCol))) {
            swapImages(currentElement, clickedImage);
            currentElement.style.border = "none";
            currentElement = null;

            movesCount++;
            moves.innerText = `moves: ${movesCount}`;

            if (checkWinCondition()) {
                result.innerText = "¡Felicidades! Has resuelto el rompecabezas.";
                result.style.color = "green";
            }
        }
    }
}

const checkAdjacent = (row1, row2, col1, col2) => {
    if (row1 === row2) {
        if (col2 === col1 - 1 || col2 === col1 + 1) {
            return true;
        }
    } else if (col1 === col2) {
        if (row2 === row1 - 1 || row2 === row1 + 1) {
            return true;
        }
    }
    return false;
}

const swapImages = (image1, image2) => {
    const tempIndex = image1.dataset.index;
    image1.dataset.index = image2.dataset.index;
    image2.dataset.index = tempIndex;
    image1.src = `Imagenes/imagen${image1.dataset.index}.jpg`;
    image2.src = `Imagenes/imagen${image2.dataset.index}.jpg`;
}

const checkWinCondition = () => {
    const images = Array.from(container.querySelectorAll(".image"));
    const indexes = images.map(image => image.dataset.index);
    return indexes.every((index, i) => index === i.toString());
}

startButton.addEventListener("click", () => {
    const imageContainers = container.querySelectorAll(".image-container");
    imageContainers.forEach(container => container.remove());
    imagesArr = [];
    randomImage();
    gridGenerator();
    movesCount = 0;
    moves.innerText = `moves: ${movesCount}`;
    result.innerText = "";
});

// Llama a randomImage() para cargar las imágenes aleatorias al principio
randomImage();

window.onload = () => {
    coverScreen.classList.remove("hide");
    container.classList.add("hide");
}