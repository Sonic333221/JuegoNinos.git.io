document.addEventListener("DOMContentLoaded", function() {
    const wordList = document.getElementById("wordList");
    const words = wordList.getElementsByTagName("li");
    const table = document.getElementById("wordSearchTable");
    const cells = table.getElementsByTagName("th");
    let foundWords = 0;

    for (const word of words) {
        word.addEventListener("click", function() {
            if (!word.classList.contains("found")) {
                word.classList.add("found");
                foundWords++;
                if (foundWords === words.length) {
                    alert("Felicitaciones lo hicistes super bien");
                }
            }
        });
    }

    const wordColors = {
        'word-color1': '#FF5733',
        'word-color2': '#FFD700',   
        'word-color3': '#32CD32',    // Color para la tercera palabra
        'word-color4': '#87CEEB',    // Color para la cuarta palabra
        'word-color5': '#FFA07A',    // Color para la quinta palabra
        'word-color6': '#9370DB',    // Color para la sexta palabra
        'word-color7': '#00FFFF',    // Color para la séptima palabra
        'word-color8': '#FF4500',    // Color para la octava palabra
        'word-color9': '#7B68EE',    // Color para la novena palabra
        'word-color10': '#FF1493' 
    };
    
    // Agrega un evento de clic a cada fila de palabras
    document.querySelectorAll('th').forEach(function (wordRow) {
        wordRow.addEventListener('click', function () {
            // Obtiene la clase de la fila de palabras clicada
            const wordClass = wordRow.classList[0];
            
            // Obtiene el color correspondiente de wordColors
            const color = wordColors[wordClass];
            
            // Cambia el color de fondo de la fila de palabras al color asignado
            wordRow.style.backgroundColor = color;
        });
    });

    for (const cell of cells) {
        cell.addEventListener("click", function() {
            if (cell.innerHTML !== "") {
                if (!cell.classList.contains("selected")) {
                    cell.classList.add("selected");
                } else {
                    cell.classList.remove("selected");
                }
            }
        });
    }
});