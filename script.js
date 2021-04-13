const formInput = document.querySelector('form')
// console.log(formInput.value)
const htmlBox = document.querySelector('.test')
let rawValue = "";
let newValStr = "";
let newOperator = "";

let newVal = 0;
let mainVal = 0;
let mainValCalc = 0;

let appHasStarted = false; // checks for stage 2 of calculation
let weAreAtStage3 = false; // checks for stage 3 of calculation

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
		if(event.target.matches('.square')) {
			const whichButton = event.target.closest('.square')
			rawValue = whichButton.dataset.id;
			console.log(`
			========= RAW VALUE: ${rawValue}`)
			let curatedVal = parseInt(rawValue)


			// IS THE USER TYPING A NUMBER?
			if(curatedVal.toString() != 'NaN') {
				appHasStarted = true;
				// htmlBox.innerText = newValStr;

				// Test to see if the newOperator was already made into an empty string.
				// Aka, test to see if we are at stage 1 or 3 of calculation:
				// 1) number => 2) operator => 3) number


				if(newOperator != "")  {
					console.log(`Last operator: ${newOperator}`)
					weAreAtStage3 = true;
				}

				newValStr+= rawValue;
				newVal = `${parseFloat(newValStr)}`
				
				console.log(`New value string: ${newValStr}`)
				console.log(`New value:        ${newVal}`);
				console.log(`Last main value:  ${mainVal}`)
			}

			if(curatedVal.toString() == 'point') {
					console.log(`This is the curatedVal: ${curatedVal}`)
					console.log(`This is raw value r n: ${rawValue}`)
			}

			// IS USER TYPING AN OPERATOR?
			else if (curatedVal.toString() == '+' || '-' || '*' || '/') {
				// console.log(`//mainVal right now: ${mainVal}`)
				// console.log(`//newVal right now: ${newVal}`)
				if(appHasStarted) {
					if(!weAreAtStage3) {
						mainVal = newVal;
					}

					else if (weAreAtStage3) {
						console.log(`We are at stage 3`);
						mainVal = `${mainVal}${newOperator}${newVal}`
						mainValCalc = eval(mainVal)
					}
					
					newOperator = rawValue;
					newValStr = "";

					console.log(`New operator:  ${newOperator}`)
					console.log(`New value string: ${newValStr}`)
					console.log(`New value: ${newVal}`);
					console.log(`Main value, spelled out: ${mainVal}`)
					console.log(`Main value, calculated:  ${mainValCalc}`)
				} 
				else if (!appHasStarted) {console.log('Oops, type a number first!')}
			}




			// OR IS USER TYPING THE = SIGN?
			// else if (rawValue == '=') {
			// 	// rawValue = "";

			// 	console.log(`Final result: ${mainVal}`)
			// 	mainValCalc = eval(mainVal)
			// 	console.log(`Final result, calc: ${mainValCalc}`)
			// }
		}
	}


}

new App();