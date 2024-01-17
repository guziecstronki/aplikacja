let isPressed = false
const pressed = e => {
    if(isPressed) document.querySelector(`div[data-key="${e.key}"]`)?.classList.add('pressed')
    else document.querySelector(`div[data-key="${e.key}"]`)?.classList.remove('pressed')
}


window.addEventListener('keydown', e => {isPressed = true; pressed(e)})

window.addEventListener('keyup', e => {isPressed = false; pressed(e)})

const timeDisplay = document.querySelector('.clock p')
let time
const clook = () => {
    time = new Date
    timeDisplay.textContent = `${time.getHours()} : ${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
    setTimeout(clook, 1000)
}
clook()

const bateryDisplay = document.querySelector('.batery-display')
const bateryDisplayValue = document.querySelector('.batery p')
let bateryValue = bateryDisplayValue.textContent.replace('%', '')

const batery = () => {
    if(bateryValue == 0) return
    --bateryValue
    bateryDisplay.style.setProperty('--percents', `${bateryValue}%`)
    if(bateryValue <= 70) bateryDisplay.style.setProperty('--color', `#5acc4f`)
    if(bateryValue <= 50) bateryDisplay.style.setProperty('--color', `#c4de1d`)
    if(bateryValue <= 30) bateryDisplay.style.setProperty('--color', `#dea11d`)
    if(bateryValue <= 15) bateryDisplay.style.setProperty('--color', `#de1d1d`)
    
    bateryDisplayValue.textContent = `${bateryValue}%`
}

setInterval(batery, 2000)

const buttonStart = document.querySelector('.start')
const menu = document.querySelector('.menu')
const displayConsole = document.querySelector('.display')
const game = document.querySelector('.game')
const start = () => {
    displayConsole.classList.remove('off')
    setTimeout(() => {
        menu.style.display = 'flex'
    }, 1000)
    setTimeout(() => {
        game.style.display = 'block'
    }, 2000)
}
buttonStart.addEventListener('click', start)

const progressBar = document.querySelector('.progressBar')
const startButton = document.createElement('button')
console.log(startButton);
let value = 0
const biggerValue = () => {
    value++
}
const progress = () => {
    biggerValue()
    progressBar.style.setProperty('--percents', `${value}%`)
    if(value <= 95){
        setTimeout(progress, 10)
    }else if(value < 100){
        setTimeout(progress, 1000)
    }else if(value == 100){
        setTimeout(() => {
            progressBar.style.display = 'none'; 
            displayConsole.append(startButton); startButton.textContent = 'start'; 
            startButton.classList.add('startButton')
    },3000)
    }
}


const slider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.slider-container');
let currentIndex = 0;

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % 5;
    updateSlider();
}

const updateSlider = () => {
    const translateValue = -currentIndex * 100;
    slider.style.transform = `translateX(${translateValue}%)`;
}



let nextSlideInterval
game.addEventListener('dblclick', () => {
    console.log('witaj');
    displayConsole.classList.add('off')
    menu.style.display = 'none'
    game.style.display = 'none'
    progressBar.style.display = 'block'
    setTimeout(progress, 10)
    nextSlideInterval = setInterval(nextSlide, 1000);
    sliderContainer.style.display = 'block'

})

startButton.addEventListener('click', function() {
    sliderContainer.style.display = 'none'
    this.remove()
    const addCanvas = document.createElement('canvas')
    addCanvas.setAttribute('id', 'canvas')
    displayConsole.appendChild(addCanvas)
    const script = document.createElement('script');
    script.src = 'JS/scrtipt.js';
    script.async = true;
    document.head.appendChild(script);
    displayConsole.classList.remove('off')
    displayConsole.style.background = "url('/img/tlo.jpg')"
})

