const dropArea = document.querySelector("#dropinner");
const guide = document.querySelector("#guide");
const displayer = document.querySelector("#displayer");

let button = document.querySelector("#button");
let input = document.querySelector("input");
let file;

button.onclick = () => {
    input.click();
};

// When browsing.
input.addEventListener("change", function() {
    file = this.files[0];
    dragArea.classList.add("active");
    displayFile();
});

// When file is inside the drag area.
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();

    guide.textContent = "Release to show";
    dropArea.classList.add("active");
});

// When file leaves the drag area.
dropArea.addEventListener("dragleave", () => {
    guide.textContent = "Drag here";
    dropArea.classList.remove("active");
});

// When the file is dropped in the drag area.
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();

    file = event.dataTransfer.files[0];
    displayFile();
});


function displayFile() {
    let fileType = file.type;

    /* Caution: How to include all image extensions? */
    let validExtensions = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
    ]

    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            displayer.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        alert("This file is not an image!");
        dropArea.classList.remove("active");
    }

    /* Revert text "Release to show" -> "Drag here" */
    guide.textContent = "Drag here";
    dropArea.classList.remove("active")
}
