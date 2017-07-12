let Engine = (function () {

    const operatorPrecedences = {
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
    };

    function Engine() {

    }

    Engine.prototype.evaluate = reversePolishNotation;
    Engine.prototype.parseInput = shuntingYardAlgorithm;



    function reversePolishNotation(arr) {
        let stack = [];
        for (let i = 0; i < arr.length; i++) {
            let currentOperand = parseFloat(arr[i]);

            //If current element is not a number currentOperand will be NAN
            //In this case the else statement will be executed

            if (currentOperand || currentOperand === 0) {
                stack.push(currentOperand);
            } else {
                let firstOperand = stack.pop();
                let secondOperand = stack.pop();
                let currentResult = evaluateSimpleOperation(firstOperand, secondOperand, arr[i]);
                stack.push(currentResult);
            }
        }
        return stack[0];
    }

    function evaluateSimpleOperation(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '*':
                return secondOperand * firstOperand;
            case '/':
                return secondOperand / firstOperand;
            case '+':
                return secondOperand + firstOperand;
            case '-':
                return secondOperand - firstOperand;
        }
    }

    function shuntingYardAlgorithm(input) {
        input = input.trim().split(/\s+/);
        let outputQueue = [];
        let operatorStack = [];

        for (let i = 0; i < input.length; i++) {
            let currentOperand = parseFloat(input[i]);

            //If current element is not a number currentOperand will be NAN
            //In this case the else statement will be executed

            if (currentOperand || currentOperand === 0) {
                outputQueue.push(currentOperand);
            } else {
                let stackLength = operatorStack.length;

                if (!stackLength) {
                    operatorStack.push(input[i]);
                } else {
                    let currentOperator = input[i];
                    let lastOperator = operatorStack[stackLength - 1];
                    while (operatorPrecedences[currentOperator] <= operatorPrecedences[lastOperator]) {
                        outputQueue.push(lastOperator);
                        operatorStack.pop();
                        stackLength = operatorStack.length;
                        lastOperator = operatorStack[stackLength - 1];
                    }
                    operatorStack.push(currentOperator);
                }
            }
        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return outputQueue;
    }

    return Engine;

})();