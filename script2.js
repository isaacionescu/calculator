const box = document.querySelector('.displaybox')

let valueA = 0;
let valueAstr = "";

let valueB = 0;
let valueBstr = "";


let rawVal = "";

let valueStr = "";
let operatorsArr = ['+', '-', '*', '/'];

// state management
let firstTimeTypingOp = true;
let state1 = true;
// state1  = currently, a number is being typed (digit or period)
// !state2 = currently, an operator is being typed (+ - * / = or Clear)


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
				console.log(`Operator is being typed? ${state1}`)

				// checks if the string already has a period - if yes, ignore it
				valueStr = valueStr.includes('.') ? valueStr : valueStr + rawVal;
				box.innerText = valueStr;
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`You typed a dot.`)
				console.log(`// Total valueStr: ${valueStr}`)
			}


			// IF IT'S A DIGIT
			else if (isNumber) {
				if(!state1) {
					state1 = true;
					valueAstr= "";
				} else if (state1) {
					valueAstr = valueAstr;	
				}

				valueAstr+= rawVal;
				console.log(`valueAstr right now: ${valueAstr}`)

				valueA = parseFloat(valueAstr)

				valueStr+= rawVal;
				if(!firstTimeTypingOp) {
					valueB = eval(valueStr)
				}

				console.log(`Operator is being typed? ${state1}`)

				box.innerText = valueStr;
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`Last character in valueStr: ${valueStr.slice(-1)}`)
				console.log(`// You typed a digit.`)
				console.log(`// Total valueStr: ${valueStr}`)

			}


			// IF IT'S AN OPERATOR
			else if (operatorsArr.includes(rawVal)) {
				console.log(`valueStr: ${valueStr}`)
				console.log(`Last prev character:  ${valueStr.slice(-1)}`)

				state1 = true;
				console.log(`Operator is being typed? ${state1}`)

				// checks if last character of previous string is already an operator
				// and prevents multiple operators being added
				if(operatorsArr.includes(valueStr.slice(-1))) {
					console.log(`Last character IS an operator!`)
					valueStr = valueStr.slice(0, -1);
					valueStr+= rawVal;
					console.log(`valueStr: ${valueStr}`)

				} else {
					console.log(`Last character is NOT operator!`)
					valueStr+= rawVal;
					console.log(`valueStr: ${valueStr}`)
				}
				
				let valueZ = 0;
				valueB = eval(valueStr.slice(0, -1))

				box.innerText = firstTimeTypingOp ? valueStr : valueStr;
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`// You typed an operator.`)
				console.log(`// Total valueStr: ${valueStr}`)
				firstTimeTypingOp = false;		
				state1 = false;

				// let newFinalResult = parseFloat(`${valueA}${rawVal}${valueB}`)
				console.log(`// New final result: ${valueB}`)
			}

			// IF IT'S EQUAL
			else if(rawVal == "=") {
				valueStr = (
						operatorsArr.includes(valueStr.slice(-1)) ?
						valueStr.slice(0, -1) : valueStr
					)
				state1 = false;
				console.log(`Operator is being typed? ${state1}`)



				valueB = eval(valueStr);
				box.innerText = `${valueB}`
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`// You typed an equal.`)
				console.log(`// Total valueStr: ${valueStr}`)
			}

			// IF IT'S CLEAR
			else if(rawVal == "c") {
				state1 = false;
				console.log(`Operator is being typed? ${state1}`)

				valueA = 0;
				valueB = 0;
				valueStr = "";
				firstTimeTypingOp = true;
				box.innerText = "Type again :)";

				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`// You typed "clear".`)
				console.log(`// Total valueStr: ${valueStr}`)
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

