const dragArea = document.querySelector(".drag-area");
const dragText = document.querySelector(".header");

let button = document.querySelector(".button");
let input = document.querySelector("input");

let file;

button.onclick = () => {
    input.click();
};

// when browse
input.addEventListener("change", function() {
    file = this.files[0];
    dragArea.classList.add("active");
    displayFile();
});

// when file is inside the drag area
dragArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dragText.textContent = "Release to Upload";
    dragArea.classList.add("active");
//    console.log("File is inside the drag area");
});

// when file leaves the drag area
dragArea.addEventListener("dragleave", () => {
    dragText.textContent = "Drag & Drop";
    dragArea.classList.remove("active");
//    console.log("File left the drag area");
});

// when the file is dropped in the drag area
dragArea.addEventListener("drop", (event) => {
    event.preventDefault();

    file = event.dataTransfer.files[0];
//    console.log(file);
    displayFile();
});

function displayFile() {
    let fileType = file.type;
//    console.log(fileType);

    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]

    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
//            console.log(fileURL);
            let imgTag = `<img src="${fileURL}" alt="">`;
            dragArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);
    } else {
        alert("This file is not an image");
        dragArea.classList.remove("active");
    }
//    console.log("The file is dropped in drag area");
}

//const dropArea = document.getElementById("drop-area");
//const inputFile = document.getElementById("input-file");
//const imageView = document.getElementById("img-view");
//
//inputFile.addEventListener("change", uploadImage);
//
//function uploadImage() {
//    let imgLink = URL.createObjectURL(inputFile.files[0]);
//    imageView.style.backgroundImage = `url(${imgLink})`;
//
//    // Front the image.
//    imageView.textContent = "";
//
//    imageView.style.border = 0;
//}
//
//dropArea.addEventListener("dragover", function(e) {
//    e.preventDefault();
//});
//dropArea.addEventListener("drop", function(e) {
//    e.preventDefault();
//    inputFile.files = e.dataTransfer.files;
//    uploadImage();
//});
