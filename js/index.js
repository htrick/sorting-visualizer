const color1 = "#264653", color2 = "#e76f51";
const arrSize = 100, speed = 100;
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

function displayArray(canvas, arr, s1=-1, s2=-1, start=0) {
    const c = canvas.getContext("2d");
    c.clearRect(start * canvas.width / arrSize, 0, arr.length * canvas.width / arrSize, canvas.height);
    c.fillStyle = color1;
    arr.forEach((e, i) => {
        let x = (start + i) * canvas.width / arrSize;
        let y = canvas.height - (e * canvas.height / 100);
        let w = canvas.width / arrSize;
        let h = e * canvas.height / 100;
        c.fillRect(x, y, w, h);
    });
    if (s1 !== -1) {
        c.fillStyle = color2;
        let x = (start + s1) * canvas.width / arrSize;
        let y = canvas.height - (arr[s1] * canvas.height / 100);
        let w = canvas.width / arrSize;
        let h = arr[s1] * canvas.height / 100;
        c.fillRect(x, y, w, h);
    }
    if (s2 !== -1) {
        c.fillStyle = color2;
        let x = (start + s2) * canvas.width / arrSize;
        let y = canvas.height - (arr[s2] * canvas.height / 100);
        let w = canvas.width / arrSize;
        let h = arr[s2] * canvas.height / 100;
        c.fillRect(x, y, w, h);
    }
}

function selectionSort(arr, canvas) {
    let m = 1;
    for (let i = 0; i < arrSize; i++) {
        let min = i;
        for (let j = i + 1; j < arrSize; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            setTimeout(displayArray.bind(this, canvas, arr.slice(), min, i), speed * m++);
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    setTimeout(displayArray.bind(this, canvas, arr.slice()), speed * m++);
}

function bubbleSort(arr, canvas) {
    let m = 1;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arrSize; i++) {
            if (arr[i] > arr[i+1]) {
                setTimeout(displayArray.bind(this, canvas, arr.slice(), i + 1, i), 0.05 * speed * m++);
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    setTimeout(displayArray.bind(this, canvas, arr.slice()), 0.05 * speed * m++);
}

function mergeSort(arr, canvas) {
    let m = 1;

    function mergeRecursive(arr, offset) {
        if (arr.length <= 1) {
            return arr;
        }
        let mid = Math.floor(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);
        return merge(mergeRecursive(left, offset), mergeRecursive(right, offset + left.length), offset);
    }

    function merge(left, right, offset) {
        let result = [], leftIndex = 0, rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                setTimeout(displayArray.bind(this, canvas, result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)),
                    result.length + leftIndex, result.length - 1, offset), 0.4 * speed * m++);
                result.push(left[leftIndex]);
                leftIndex++;
            }
            else {
                setTimeout(displayArray.bind(this, canvas, result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)),
                    result.length + left.length + rightIndex, result.length - 1, offset), 0.4 * speed * m++);
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        setTimeout(displayArray.bind(this, canvas, result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)),
            -1, -1, offset), 0.4 * speed * m++);
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    arr = mergeRecursive(arr, 0);
    setTimeout(displayArray.bind(this, canvas, arr.slice()), speed * m++);
}

function quickSort(arr, canvas) {
}

