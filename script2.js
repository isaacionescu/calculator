const box = document.querySelector('.displaybox')

let valueA = 0;
let valueAstr = "";

let valueB = 0;
let valueBstr = "";

let valueC = 0;

let op = "";


let rawVal = "";

let fullStr = "";
let operatorsArr = ['+', '-', '*', '/'];

// state management
let state1 = true;
// state1  = currently a number is being typed (digit and/or period)
// !state2 = currently an operator is being typed (+ - * / = or Clear)

let virgin = true; // checks to see this is the first time user is typing a number

let counter = 0;

let resetBothBC = false; // keeps track of each time we reset B and C back to 0;

class App {
	constructor () {
		this.addEventListeners()
	}

	addEventListeners() {
		document.body.addEventListener("click", event => {
			this.determineButton()
		})

		document.body.addEventListener("mouseover", event => {
			this.highlight()
		})

		document.body.addEventListener("mouseout", event => {
			this.unhighlight()
		})
	}

	determineButton() {
		if(event.target.matches('.square')) {
			let whichButton = event.target.closest('.square')
			rawVal = whichButton.dataset.id;
			console.log(`========== Raw value: "${rawVal}"`)
			let numberifiedVal = parseInt(rawVal)
			let stringifiedVal = numberifiedVal.toString()
			let isNumber = stringifiedVal !== "NaN";


			// IF IT'S A DOT
			if (rawVal == ".") {
				state1 = true;

				// checks if the string already has a period - if yes, ignore it
				fullStr = fullStr.includes('.') ? fullStr : fullStr + rawVal;
				box.innerText = fullStr;
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				// console.log(`You typed a dot.`)
				console.log(`// Total fullStr: "${fullStr}"`)
			}


			// IF IT'S A DIGIT
			else if (isNumber) {
				state1 = true;
				console.log(`// counter:     ${counter}`)
				console.log(`// state1:      ${state1}`)
				console.log(`// virgin?      ${virgin}`)


				if(virgin) {
					valueAstr+= rawVal 
					// console.log(`Value A string: ${valueAstr}`)
					valueA = parseFloat(valueAstr)
				}  else if(!virgin) {
					valueBstr+= rawVal
					valueB = parseFloat(valueBstr)
					// console.log(`Value B string: ${valueBstr}`)
					valueC = eval(`${valueA}${op}${valueB}`)
				}


				fullStr+= rawVal;

				box.innerText = fullStr;
				console.log(`Value A:        ${valueA}`)
				console.log(`Value B:        ${valueB}`)
				console.log(`Operator:       ${op}`)
				console.log(`Value C:        ${valueC}`)
				// console.log(`Last character in fullStr: ${fullStr.slice(-1)}`)
				// console.log(`// You typed a digit.`)
				console.log(`//// Total fullStr: "${fullStr}"`)
				
			}


			// IF IT'S AN OPERATOR
			else if (operatorsArr.includes(rawVal)) {
				state1 = false;


				// checks if last character is already an operator, and prevents multiple operators
				if(operatorsArr.includes(fullStr.slice(-1))) {
					// console.log(`Last character IS an operator!`)
					fullStr = fullStr.slice(0, -1);
					fullStr+= rawVal;

				} else {
					// console.log(`Last character is NOT operator!`)
					counter+= 1;
					virgin = false;
					fullStr+= rawVal;
				}
				op = fullStr.slice(-1)

				if(counter > 1) {
					valueA = valueC;
					valueBstr = "";
					valueB = 0;
				}


				console.log(`// counter:     ${counter}`)
				console.log(`// state1:      ${state1}`)
				console.log(`// virgin?      ${virgin}`)
				// console.log(`// isNumber?    ${isNumber}`)
				console.log(`fullStr:       "${fullStr}"`)
				console.log(`Last prev character:  ${fullStr.slice(-2, -1)}`)


				// box.innerText = firstTimeTypingOp ? fullStr : fullStr;
				console.log(`Value A:  ${valueA}`)
				console.log(`Operator: ${op}`)
				console.log(`Value B:  ${valueB}`)
				console.log(`Value C:  ${valueB}`)
				// console.log(`// You typed an operator.`)
				console.log(`//// Total fullStr: "${fullStr}"`)	
				// console.log(`// New final result: ${valueB}`)
			}

			// IF IT'S EQUAL
			else if(rawVal == "=") {
				state1 = false;
				fullStr = (
						operatorsArr.includes(fullStr.slice(-1)) ?
						fullStr.slice(0, -1) : fullStr
					)
				console.log(`// state1: ${state1}`)
				console.log(`// You typed an equal`)

				box.innerText = valueC;
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`Value C: ${valueC}`)
				console.log(`// Total fullStr: "${fullStr}"`)
			}

			// IF IT'S CLEAR
			else if(rawVal == "c") {
				state1 = false;
				console.log(`// state1: ${state1}`)
				console.log(`// You typed CLEAR`)


				valueA = 0;
				valueB = 0;
				valueC = 0;
				valueAstr = "";
				valueBstr = "";
				fullStr = "";
				virgin = true;
				counter = 0;
				box.innerText = "Type again :)";

				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`Value C: ${valueC}`)
				console.log(`// Total fullStr: ${fullStr}`)
			}
		}
	}

	highlight() {
		const button = event.target.closest('.square')
		if(event.target.matches('.square')) {
			button.classList.add('highlight')
		} 
	}

	unhighlight() {
		const button = event.target.closest('.square')
		if(event.target.matches('.square')) {
			button.classList.remove('highlight')
		}
	}
}

new App()

// console.log      (eval("2+"));  /// throws error
// console.log  (parseInt("2+"));  /// 2
// console.log(parseFloat("2+"));  /// 2

