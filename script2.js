const box = document.querySelector('.displaybox')

let valueA = 0;
let valueB = 0;
let rawVal = "";
let valueStr = "";
let operatorsArr = ['+', '-', '*', '/'];

// state management
let firstTimeTypingOp = true;


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
				valueStr = valueStr.includes('.') ? valueStr : valueStr + rawVal;
				box.innerText = valueStr;
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`// You typed a dot. valueStr: ${valueStr}`)
			}


			// IF IT'S A DIGIT
			else if (isNumber) {
				valueA = valueB;
				valueStr+= rawVal;
				if(!firstTimeTypingOp) {
					valueB = eval(valueStr)
				}

				box.innerText = eval(valueStr);
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`Last character in valueStr: ${valueStr.slice(-1)}`)
				console.log(`// You typed a digit. valueStr: ${valueStr}`)
			}


			// IF IT'S AN OPERATOR
			else if (operatorsArr.includes(rawVal)) {
				console.log(`valueStr: ${valueStr}`)
				console.log(`Last prev character:  ${valueStr.slice(-1)}`)

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
					
				valueB = eval(valueStr.slice(0, -1))
				box.innerText = firstTimeTypingOp ? valueStr : valueB;
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`// You typed an operator. valueStr: ${valueStr}`)
				firstTimeTypingOp = false;		
				// let newFinalResult = parseFloat(`${valueA}${rawVal}${valueB}`)
				console.log(`// New final result: ${valueB}`)
			}

			// IF IT'S EQUAL
			else if(rawVal == "=") {
				valueStr = (
						operatorsArr.includes(valueStr.slice(-1)) ?
						valueStr.slice(0, -1) : valueStr
					)

				valueB = eval(valueStr);
				box.innerText = `${valueB}`
				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`// You typed an equal. valueStr: ${valueStr}`)
			}

			// IF IT'S CLEAR
			else if(rawVal == "c") {
				valueA = 0;
				valueB = 0;
				valueStr = "";
				firstTimeTypingOp = true;
				box.innerText = "Type again :)";

				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`// You typed "clear". valueStr: ${valueStr}`)
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

