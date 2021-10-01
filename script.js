var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



const createArray = (size) => {
    let elements = [];
    for (let i = 0; i < size; ++i) {
        elements.push(i);
    }
    return elements;
}

const shuffleArray = (elements) => {
    let currentIndex = elements.length;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        let tmp = elements[currentIndex];
        elements[currentIndex] = elements[randomIndex];
        elements[randomIndex] = tmp;
    }
    return elements;
}

const getHighestValue = (elements) => {
    let maxValue;
    for (let i = 0; i < elements.length; ++i) {
        if (maxValue == undefined || maxValue < elements[i]) maxValue = elements[i];
    }
    return maxValue;
}



const draw = async (elements) => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    let separationX = innerWidth/elements.length;
    let separationY = innerHeight/getHighestValue(elements);
    for (let i = 0; i < elements.length; ++i) {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(
            i*separationX,
            innerHeight-elements[i]*separationY,
            1.5,
            0, Math.PI*2, true
        );
        ctx.fill();
    }
    return 1;
}





var state = {sorting: false};
var elements;
const start = () => {
    elements = createArray(250);
    elements = shuffleArray(elements);
    draw(elements);
}

var buttons = document.getElementsByClassName("control-button");
for (let i = 0; i < buttons.length; ++i) {
    buttons[i].addEventListener('click', () => {
        switch (buttons[i].innerText) {
            case "SHUFFLE":
                elements = shuffleArray(elements);
                state.sorting = false;
                draw(elements);
                break;
            case "BUBBLE":
                state.sorting = true;
                bubbleSort(state, elements, draw);
                break;
            case "INSERTION":
                state.sorting = true;
                insertionSort(state, elements, draw);
                break;
        }
    });
}





const resizeCanvas = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    start();
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);