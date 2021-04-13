const box = document.querySelector('.displaybox')

let valueA = 0;
let valueB = 0;
let rawVal = "";
let valueStr = "";

// state management
let alreadyTypedAnOperator = false;


class App {
	constructor () {
		this.addEventListeners()
	}

	addEventListeners() {
		document.body.addEventListener("click", event => {
			this.determineButton()
		})
	}

	determineButton() {
		if(event.target.matches('.square')) {
			let whichButton = event.target.closest('.square')
			rawVal = whichButton.dataset.id;
			console.log(`========== Raw value: ${rawVal}`)
			let numberifiedVal = parseInt(rawVal)
			let stringifiedVal = numberifiedVal.toString()
			let isNumber = stringifiedVal !== "NaN";

			// IF IT'S CLEAR
			if(rawVal == "clear") {
				valueA = 0;
				valueB = 0;
				valueStr = "";
				box.innerText = "Type again :)";
				console.log(`Value A right now: ${valueA}`)
				console.log(`Value B right now: ${valueB}`)
				console.log(`// You typed "clear". 
				valueStr: ${valueStr}`)
			}

			// IF IT'S A DOT
			else if (rawVal == ".") {
				valueStr = valueStr.includes('.') ? valueStr : valueStr + rawVal;
				box.innerText = valueStr
				console.log(`Value A right now: ${valueA}`)
				console.log(`Value B right now: ${valueB}`)
				console.log(`// You typed a dot. 
				valueStr: ${valueStr}`)
			}


			// IF IT'S A NUMBER
			else if (isNumber) {
				valueA = valueB;
				valueStr+= rawVal;

				box.innerText = valueStr
				console.log(`Value A right now: ${valueA}`)
				console.log(`Value B right now: ${valueB}`)
				console.log(`// You typed a digit. 
				valueStr: ${valueStr}`)
			}

			// IF IT'S EQUAL
			else if(rawVal == "=") {
				valueB = eval(valueStr);
				box.innerText = `${valueB}`
				console.log(`Value A right now: ${valueA}`)
				console.log(`Value B right now: ${valueB}`)
				console.log(`// You typed an equal. 
				valueStr: ${valueStr}`)
			}

			// IF IT'S AN OPERATOR
			else if (rawVal == '+' || '-' || '*' || '/') {
				alreadyTypedAnOperator = true;
				valueB = eval(valueStr);
				valueStr+= rawVal;
				// valueStr = `${valueA}${rawVal}${valueB}`

				console.log(`Value A right now: ${valueA}`)
				console.log(`Value B right now: ${valueB}`)
				console.log(`// You typed an operator. 
				valueStr: ${valueStr}`)
			}
		}
	}
}

new App()