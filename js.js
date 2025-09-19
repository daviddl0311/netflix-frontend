const btnRight = document.querySelectorAll("#btn-right");
const btnLeft = document.querySelectorAll("#btn-left");
const inicio = document.querySelector("#inicio");
const peliculas = document.querySelector("#peliculas");
const footer = document.querySelector("#footer");
const footerBtn = document.querySelector(".btn-footer");
let desplazamiento = 200;

btnRight.forEach(right => {
    right.addEventListener("click", ()=> {
        const article = right.closest(".movies");
        const slider = article?.querySelector(".peliculas");
    
        slider.scrollBy({left: desplazamiento, behavior: "smooth"});
        actualizarBotones(article);
    })
})

btnLeft.forEach(left => {
    left.addEventListener("click", ()=> {
        const article = left.closest(".movies");
        const slider = article?.querySelector(".peliculas");
        
        slider.scrollBy({left: -desplazamiento, behavior: "smooth"});
        actualizarBotones(article);
    })
})

function actualizarBotones(article) {
    const inicioSlider = article?.querySelector("#ini");
    const finSlider = article?.querySelector("#fin");
    const contentLeft = article?.querySelector(".btnLeft");
    const contentRight = article?.querySelector(".btnRight");
    const btnRight = article?.querySelector("#btn-right");
    const btnLeft = article?.querySelector("#btn-left");

    const observe = new IntersectionObserver((entrie, observer) => {
        entrie.forEach(entry => {
            if(entry.target.id == "fin") {
                btnRight.style.opacity = entry.isIntersecting ? 0 : 1;
                contentRight.classList.toggle("btnRight-disabled", entry.isIntersecting);
                // setTimeout(() => {
                //     btnRight.style.display = entry.isIntersecting ? "none" : "block";
                // }, 350);
            }
            
            if(entry.target.id == "ini") {
                btnLeft.style.opacity = entry.isIntersecting ? 0 : 1 ;
                contentLeft.classList.toggle("btnLeft-disabled", entry.isIntersecting);
                // setTimeout(() => {
                //     btnLeft.style.display = entry.isIntersecting ? "none" : "block";
                // }, 350);
            }
        })  
    }, {
        threshold: .9
    })
        
    observe.observe(inicioSlider);
    observe.observe(finSlider);
}

const observeFooter = new IntersectionObserver(entrie => {
    entrie.forEach(entry => {
        if(entry.target.id == "peliculas") {
            footerBtn.classList.toggle("opacity", true);
        } else if(entry.target.id == "inicio") {
            footerBtn.classList.toggle("opacity", false);
        } else if(entry.target.id == "footer") {
            footerBtn.style.position = entry.isIntersecting ? "sticky" : "fixed";
        }
        
    })
}, {
    threshold: .3
})

observeFooter.observe(peliculas);
observeFooter.observe(inicio);
observeFooter.observe(footer);