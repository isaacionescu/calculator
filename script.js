const formInput = document.querySelector('form')
// console.log(formInput.value)

let test = document.querySelector('.test')


let curVal = 0;
let newVal = 0;
let newValStr = "";

class App {
	constructor() {
		this.addEventListeners()
	}

	addEventListeners() {
		document.body.addEventListener("click", event => {
			this.determineButton()
		})

		// document.body.addEventListener("mouseover", event => {
		// 	this.highlight()
		// })

		// document.body.addEventListener("mouseout", event => {
		// 	this.unhighlight()
		// })
	}

	determineButton() {
		if(event.target.matches('.sq')) {
			const whichButton = event.target.closest('.sq')

			const whatIsIt = whichButton.dataset.id;
			if(typeof whatIsIt )

			newVal = whichButton.dataset.id;
			console.log(newVal)
			test.innerHTML = newVal;
		}
	}


}

new App();