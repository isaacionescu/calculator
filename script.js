const formInput = document.querySelector('form')
// console.log(formInput.value)
const htmlBox = document.querySelector('.test')
let newValStr = "";
let newVal = 0;
let mainVal = 0;
let mainValCalc = 0;
let newOperator = "";

let stateOk = false;
let state2 = false;

class App {
	constructor() {
		this.addEventListeners()
	}

	addEventListeners() {
		document.body.addEventListener("click", event => {
			this.determineButton()
		})
	}

	determineButton() {
		if(event.target.matches('.sq')) {
			const whichButton = event.target.closest('.sq')
			const rawValue = whichButton.dataset.id;
			console.log(`
========= RAW VALUE: ${rawValue}`)
			// console.log(`Value type:    ${typeof rawValue}`)
			const curatedVal = parseInt(rawValue)
			// console.log(`Curated value: ${curatedVal}`)


			if(curatedVal.toString() != 'NaN' || rawValue == '.') {
				stateOk = true;
				// htmlBox.innerText = newValStr;

				if(newOperator == "") {

					newValStr+= rawValue;
					newVal = `${parseFloat(newValStr)}`
					console.log(`New value string: ${newValStr}`)
					console.log(`New value: ${newVal}`);
					console.log(`Last main value: ${mainVal}`)
				}

				else {
					console.log(`Last operator: ${newOperator}`)
					newValStr+= rawValue;
					newVal = `${parseFloat(newValStr)}`
					console.log(`New value string: ${newValStr}`)
					console.log(`New value:        ${newVal}`)
					console.log(`Last main value: ${mainVal}`)
					state2 = true;
				}

			}


			else if ((rawValue == '+' || '-' || '*' || '/')) {
				// console.log(`//mainVal right now: ${mainVal}`)
				// console.log(`//newVal right now: ${newVal}`)

				if(!stateOk) {console.log('Oops, type a number first!')}

				else {
					if(!state2) {
						mainVal = newVal;
					}

					else if (state2) {
						console.log(`== state2 is true!`);
						mainVal = `${mainVal}${newOperator}${newVal}`
						mainValCalc = eval(mainVal)
					}
					
					newOperator = rawValue;
					newValStr = "";

					console.log(`New operator:  ${newOperator}`)
					console.log(`New value string: ${newValStr}`)
					console.log(`New value: ${newVal}`);
					console.log(`Main value, spelled out: ${mainVal}`)
					// console.log(`Type of Main value: ${typeof mainVal}`)
					console.log(`Main value, calculated:  ${mainValCalc}`)
					// console.log(`Type of Main value calculated: ${typeof mainValCalc}`)
				}
			}
		}
	}


}

new App();