// Get the modal (the container for the pop-up)
var modal = document.getElementById("myModal");

// Get the image element inside the modal
var modalImg = document.getElementById("img01");

// Function to open the modal when an image is clicked
function openModal(element) {
    // Show the modal container
    modal.style.display = "block";
    // Set the source of the modal image to the source of the clicked image
    modalImg.src = element.src;
}

// Get the <span> element (the 'X' button) that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
