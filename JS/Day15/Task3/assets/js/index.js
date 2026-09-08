const button = document.getElementById("btn");
 const details = document.getElementById("details");

 button.addEventListener("click", function () {

 details.classList.toggle("show");

 if (details.classList.contains("show")) {
   button.textContent = "Hide Details";
    } else {
        button.textContent = "Show Details";
            }

    });