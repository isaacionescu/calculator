const historyBox = document.querySelector('.history-box');
const resultBox = document.querySelector('.result-box');

let valueA = 0;
let valueAstr = "";
let valueB = 0;
let valueBstr = "";
let valueC = 0;

let op = "";
let rawVal = "";
let fullStr = "";
const operatorsArr = ['+', '-', '*', '/'];

// state management
let virgin = true; // checks to see this is the first time user is typing a number
let state1 = true;
// state1  = currently a number is being typed (digit and/or period)
// !state2 = currently an operator is being typed (+ - * / = or Clear)
let counter = 0;

class App {
	constructor () {
		this.addEventListeners()
	}

	addEventListeners() {
		document.body.addEventListener("click", event => {
			this.determineButton()
		})

		document.body.addEventListener("touchstart", event => {
			this.highlight()
		})

		document.body.addEventListener("mouseover", event => {
			this.highlight()
		})

		document.body.addEventListener("touchend", event => {
			this.unhighlight()
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
			let restringifiedVal = numberifiedVal.toString()
			let isNumber = restringifiedVal !== "NaN";


			// IF IT'S A DIGIT OR PERIOD
			if (isNumber || rawVal === ".") {
				// console.log(`// is it digit? ${isNumber}`)
				// console.log(`// is it a dot? ${rawVal == "."}`)
				console.log(`// You are typing a number`)
				state1 = true;
				console.log(`// counter:     ${counter}`)
				console.log(`// state1:      ${state1}`)
				console.log(`// virgin?      ${virgin}`)


				// check if there was already a dot
				if(virgin) {
					// let aTemp = 0;
					if((rawVal == '.') && (valueAstr.slice(-1) == '.')) {
						valueAstr = valueAstr
					} else {
						valueAstr = (valueAstr.length > 8) ? valueAstr : valueAstr + rawVal;
						fullStr = (fullStr.length > 8) ? fullStr : fullStr + rawVal;
					}
					
					// valueA = aTemp
					valueA = parseFloat(valueAstr);
					resultBox.innerText = valueA;
				}  

				else if(!virgin) {
					if((rawVal == '.') && (valueBstr.slice(-1) == '.')) {
						valueBstr = valueBstr
					} else {
						valueBstr+= rawVal
						fullStr+= rawVal;
					}
					valueB = parseFloat(valueBstr)
					resultBox.innerText = valueB;
					let cTemp = eval(`${valueA}${op}${valueB}`);
					console.log(`cTemp: ${cTemp}, type: ${typeof cTemp}`);
					console.log(`cTemp length: ${cTemp.toString().length}`)
					valueC = (cTemp.toString().length > 8) ? cTemp.toFixed(8) : cTemp
				}

				historyBox.innerText = fullStr;
				console.log(`Value A:        ${valueA}`)
				console.log(`Operator:       ${op}`)
				console.log(`Value B:        ${valueB}`)
				console.log(`Value C:        ${valueC}`)
				// console.log(`Last character in fullStr: ${fullStr.slice(-1)}`)
				// console.log(`Value A string: ${valueAstr}`)
				// console.log(`Value B string: ${valueBstr}`)
				console.log(`//// Total fullStr: "${fullStr}"`)
			}


			// IF IT'S AN OPERATOR
			else if (operatorsArr.includes(rawVal)) {
				console.log(`// You typed an operator.`)
				state1 = false;

				// checks if last character is already an operator, and only remembers the last operator typed
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
					resultBox.innerText = valueA;
					valueBstr = "";
					valueB = 0;
				}


				historyBox.innerText = fullStr;
				console.log(`// counter:     ${counter}`)
				console.log(`// state1:      ${state1}`)
				console.log(`// virgin?      ${virgin}`)
				console.log(`fullStr:       "${fullStr}"`)
				console.log(`Last prev character:  ${fullStr.slice(-2, -1)}`)
				console.log(`Value A:  ${valueA}`)
				console.log(`Operator: ${op}`)
				console.log(`Value B:  ${valueB}`)
				console.log(`Value C:  ${valueB}`)
				console.log(`//// Total fullStr: "${fullStr}"`)	
			}

			// IF IT'S EQUAL
			else if(rawVal === "=") {
				console.log(`// You typed an equal`)
				fullStr = (
						operatorsArr.includes(fullStr.slice(-1)) ?
						fullStr.slice(0, -1) : fullStr
					)


				resultBox.innerText = state1 ? valueC : valueA;
				historyBox.innerText = fullStr;

				console.log(`Value A: ${valueA}`)
				console.log(`Value B: ${valueB}`)
				console.log(`Value C: ${valueC}`)
				console.log(`// Total fullStr: "${fullStr}"`)
			}

			// IF IT'S CLEAR
			else if(rawVal === "c") {
				console.log(`// You typed CLEAR`)

				valueA = 0;
				valueB = 0;
				valueC = 0;
				valueAstr = "";
				valueBstr = "";
				fullStr = "";
				virgin = true;
				counter = 0;
				historyBox.innerText = " ";
				resultBox.innerText = " ";
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