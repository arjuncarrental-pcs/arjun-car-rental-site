document.addEventListener("DOMContentLoaded", () => {

    const stars = document.querySelector(".stars");

    if(stars){
        setInterval(() => {
            stars.classList.toggle("glow");
        },800);
    }

});
