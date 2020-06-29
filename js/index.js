window.addEventListener("load", () => {
    document.querySelector("#run-button").addEventListener("click", function() {
        this.classList.add("selected");
        // run
        this.classList.remove("selected");
    });
    document.querySelector("#list-button").addEventListener("click", () => {
        let arr = generateArray(100);
    });
});

function generateArray(size) {
    let arr = [];
    for (i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}
