const color1 = "#264653", color2 = "#e76f51", color3 = "#f4a261";
const arrSize = 100;
const algorithms = [selectionSort, bubbleSort, mergeSort, quickSort];

window.addEventListener("load", () => {
    const display = document.querySelector(".display");
    const canvas = document.querySelector("#graphics");
    const runButton = document.querySelector("#run-button");
    const algorithmButtons = document.querySelectorAll(".algorithms > div");

    let arr = generateArray();
    let alg = algorithms[0];
    algorithmButtons[0].classList.add("selected");
    resizeCanvas(canvas, display);
    displayArray(canvas, arr);

    runButton.addEventListener("click", function() {
        alg(arr, canvas);
    });

    document.querySelector("#list-button").addEventListener("click", () => {
        arr = generateArray();
        displayArray(canvas, arr);
        runButton.innerHTML = "Sort";
    });

    algorithmButtons.forEach((e, i) => {
        e.addEventListener("click", () => {
            alg = algorithms[i];
            algorithmButtons.forEach(e => {
                e.classList.remove("selected");
            });
            e.classList.add("selected");
        });
    });
});

function generateArray() {
    let arr = [];
    for (i = 0; i < arrSize; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}

function resizeCanvas(canvas, display) {
    canvas.width = display.clientWidth;
    canvas.height = display.clientHeight;
}

function displayArray(canvas, arr, s1=-1, s2=-1) {
    const c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = color1;
    arr.forEach((e, i) => {
        let x = i * canvas.width / arrSize;
        let y = canvas.height - (e * canvas.height / 100);
        let w = canvas.width / arrSize;
        let h = e * canvas.height / 100;
        c.fillRect(x, y, w, h);
    });
    if (s1 !== -1) {
        c.fillStyle = color2;
        let x = s1 * canvas.width / arrSize;
        let y = canvas.height - (arr[s1] * canvas.height / 100);
        let w = canvas.width / arrSize;
        let h = arr[s1] * canvas.height / 100;
        c.fillRect(x, y, w, h);
    }
    if (s2 !== -1) {
        c.fillStyle = color2;
        let x = s2 * canvas.width / arrSize;
        let y = canvas.height - (arr[s2] * canvas.height / 100);
        let w = canvas.width / arrSize;
        let h = arr[s2] * canvas.height / 100;
        c.fillRect(x, y, w, h);
    }
}

function selectionSort(arr, canvas) {
    for (let i = 0; i < arrSize; i++) {
        setTimeout(displayArray.bind(this, canvas, arr.slice()), 100 * i);
        let min = i;
        for (let j = i + 1; j < arrSize; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            setTimeout(displayArray.bind(this, canvas, arr.slice(), min, i),
                100 * i);
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
}

function bubbleSort() {
}

function mergeSort() {
}

function quickSort() {
}

