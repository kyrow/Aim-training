const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
const timeEl = document.querySelector('#time')
let time = 0
let score = 0
const colors = ['#A1F898', '#F8F598', '#F8A998', '#98F7F8', '#BB98F8', '#F498F8', '#FC8BA0']


startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++

		event.target.remove()
		createCircles()

	}
})


function startGame() {
	setInterval(decreaseTime, 1000)
	createCircles()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h2>Ваш счет:<span class="primary"> ${score} </span></h2>`
}

function createCircles() {
	const circle = document.createElement('div')

	const size = getRandomNumb(10, 80)
	const { width, height } = board.getBoundingClientRect()
	const x = getRandomNumb(0, width - size)
	const y = getRandomNumb(0, height - size)
	const color = getColor()


	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	circle.style.background = color
	board.append(circle)

}

function getRandomNumb(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function getColor() {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}