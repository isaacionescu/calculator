const formInput = document.querySelector('form')
// console.log(formInput.value)

let test = document.querySelector('.test')


let curVal = 0;
let newVal = 0;
let newValStr = "";

let newOperator = "";

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
			const rawValue = whichButton.dataset.id;
			console.log(`Raw value:     ${rawValue}`)
			console.log(`Type of value: ${typeof rawValue}`)

			const curatedVal = parseInt(rawValue)
			console.log(`Curated value: ${curatedVal}`)

			if(curatedVal.toString() != 'NaN' || rawValue == '.') {
				console.log('You are inputting a number')
				newValStr += rawValue;

				test.innerText = newValStr

				newVal = parseFloat(newValStr)
				console.log(`Live number: ${newVal}`)
				// console.log(`Test doubling: ${newVal * 2}`)

			}

			else if ((rawValue == '+' || '-' || '*' || "/")) {
				console.log(`You are typing an operator`)

				newOperator = rawValue
				console.log(newOperator)

				curVal = newVal;
				console.log(`Current value: ${curVal}`)

				newValStr = ""
			}

		}
	}


}

new App();