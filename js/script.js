// select elements
const inputElement = document.querySelector(".input");
const outputOperationElement = document.getElementById(".operation .value");
const outputResultElement = document.querySelector(".result .value");

// calculator mode switcher
const scientificMode = document.querySelector(".scientific");
const normalMode = document.querySelector(".normal");

// variables and costants
const OPERATIONS = ["+", "-", "*", "/"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL(";
const CUBE = "CUBE(";

let data = {
	operatin: [],
	formula: [],
};
let ans = 0;

// calculator buttons
let calculator_buttons = [
	{
		name: "rad",
		symbol: "Rad",
		formula: false,
		type: "key",
	},
	{
		name: "deg",
		symbol: "Deg",
		formula: false,
		type: "key",
	},
	{
		name: "cube",
		symbol: "x³",
		formula: CUBE,
		type: "math_function",
	},

	{
		name: "cube-root",
		symbol: "∛",
		formula: "Math.cbrt",
		type: "math_function",
	},

	{
		name: "ln2",
		symbol: "ln2",
		formula: "Math.log",
		type: "math_function",
	},
	{
		name: "ln10",
		symbol: "ln10",
		formula: "Math.log",
		type: "math_function",
	},

	{
		name: "factorial",
		symbol: "×!",
		formula: FACTORIAL,
		type: "math_function",
	},

	{
		name: "square-root",
		symbol: "√",
		formula: "Math.sqrt",
		type: "math_function",
	},

	{
		name: "pi",
		symbol: "π",
		formula: "Math.PI",
		type: "number",
	},

	{
		name: "cos",
		symbol: "cos",
		formula: "trigo(Math.cos,",
		type: "trigo_function",
	},
	{
		name: "sin",
		symbol: "sin",
		formula: "trigo(Math.sin,",
		type: "trigo_function",
	},
	{
		name: "tan",
		symbol: "tan",
		formula: "trigo(Math.tan,",
		type: "trigo_function",
	},

	{
		name: "square",
		symbol: "x²",
		formula: POWER,
		type: "math_function",
	},
	{
		name: "log",
		symbol: "log",
		formula: "Math.log10",
		type: "math_function",
	},

	{
		name: "ln",
		symbol: "ln",
		formula: "Math.log",
		type: "math_function",
	},
	{
		name: "acos",
		symbol: "acos",
		formula: "inv_trigo(Math.acos,",
		type: "trigo_function",
	},
	{
		name: "asin",
		symbol: "asin",
		formula: "inv_trigo(Math.asin,",
		type: "trigo_function",
	},
	{
		name: "atan",
		symbol: "atan",
		formula: "inv_trigo(Math.atan,",
		type: "trigo_function",
	},
	{
		name: "power",
		symbol: "x<span>y</span>",
		formula: POWER,
		type: "math_function",
	},
	{
		name: "e",
		symbol: "e",
		formula: "Math.E",
		type: "number",
	},
	{
		name: "open-parenthesis",
		symbol: "(",
		formula: "(",
		type: "number",
	},
	{
		name: "close-parenthesis",
		symbol: ")",
		formula: ")",
		type: "number",
	},
	{
		name: "exp",
		symbol: "exp",
		formula: "Math.exp",
		type: "math_function",
	},
	{
		name: "ANS",
		symbol: "ANS",
		formula: "ans",
		type: "number",
	},
	{
		name: "7",
		symbol: 7,
		formula: 7,
		type: "number",
	},
	{
		name: "8",
		symbol: 8,
		formula: 8,
		type: "number",
	},
	{
		name: "9",
		symbol: 9,
		formula: 9,
		type: "number",
	},
	{
		name: "delete",
		symbol: "⌫",
		formula: false,
		type: "key",
	},

	{
		name: "clear",
		symbol: "C",
		formula: false,
		type: "key",
	},

	{
		name: "4",
		symbol: 4,
		formula: 4,
		type: "number",
	},
	{
		name: "5",
		symbol: 5,
		formula: 5,
		type: "number",
	},
	{
		name: "6",
		symbol: 6,
		formula: 6,
		type: "number",
	},
	{
		name: "multiplication",
		symbol: "×",
		formula: "*",
		type: "operator",
	},

	{
		name: "division",
		symbol: "÷",
		formula: "/",
		type: "operator",
	},

	{
		name: "1",
		symbol: 1,
		formula: 1,
		type: "number",
	},
	{
		name: "2",
		symbol: 2,
		formula: 2,
		type: "number",
	},
	{
		name: "3",
		symbol: 3,
		formula: 3,
		type: "number",
	},
	{
		name: "addition",
		symbol: "+",
		formula: "+",
		type: "operator",
	},
	{
		name: "subtraction",
		symbol: "–",
		formula: "-",
		type: "operator",
	},

	{
		name: "0",
		symbol: 0,
		formula: 0,
		type: "number",
	},
	{
		name: "comma",
		symbol: ".",
		formula: ".",
		type: "number",
	},

	{
		name: "percent",
		symbol: "%",
		formula: "/100",
		type: "number",
	},
	{
		name: "calculate",
		symbol: "=",
		formula: "=",
		type: "calculate",
	},
];

// create calculator buttons
function createCalculatorBtns() {
	let btnPerRow = 6;
	let addedBtns = 0;

	calculator_buttons.forEach((button) => {
		if (button.name == "ANS") {
			btnPerRow = 5;
			addedBtns++;
			const lastRow = document.querySelector(".row:last-child");
			lastRow.style.marginBottom = "16px";
			const allRow = document.querySelectorAll(".row");

			allRow.forEach((row) => {
				row.classList.add("advance-keys");
			});
		}

		if (addedBtns % btnPerRow == 0) {
			inputElement.innerHTML += `<div class="row"></div>`;
		}

		const row = document.querySelector(".row:last-child");

		row.innerHTML += `<button id="${button.name}">
							${button.symbol}
						</button>`;

		addedBtns++;
	});
}
createCalculatorBtns();

// RADIAN OR DEGREE
let RADIAN = true;
const radBtn = document.getElementById("rad");
const degBtn = document.getElementById("deg");

radBtn.classList.add("active-angle");

function angleToggler() {
	radBtn.classList.toggle("active-angle");
	degBtn.classList.toggle("active-angle");
}

// calculator buttons event litner
inputElement.addEventListener("click", (e) => {
	const targetBtn = e.target;

	calculator_buttons.forEach((button) => {
		if (button.name == targetBtn.id) calculator(button);
	});
});

// the main calculator button
function calculator(button) {
	if (button.type == "operator") {
		data.operatin.push(button.symbol);
		data.formula.push(button.formula);
	} else if (button.type == "number") {
		data.operatin.push(button.symbol);
		data.formula.push(button.formula);
	}

	updateOutputOperation(data.operatin.join());
}

// update output opeartion on ui
function updateOutputOperation(operation) {
	outputOperationElement.innerHTML = operation;
}

// update output result on ui
function updateOutputResult(result) {
	outputResultElement.innerHTML = result;
}
