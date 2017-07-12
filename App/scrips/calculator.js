let Calculator = (function () {

    function Calculator() {
        this.memory = null;
    }

    Calculator.prototype.write = write;
    Calculator.prototype.removeSymbol = removeSymbol;
    Calculator.prototype.negate = negate;
    Calculator.prototype.showOutput = showOutput;
    Calculator.prototype.percentage = percentage;
    Calculator.prototype.squareRoot = squareRoot;
    Calculator.prototype.memoryStart = memoryStart;
    Calculator.prototype.memoryIncrease = memoryIncrease;
    Calculator.prototype.memoryDecrease = memoryDecrease;
    Calculator.prototype.memoryClear = memoryClear;
    Calculator.prototype.memoryRecall = memoryRecall;
    Calculator.prototype.removeLastEntity = removeLastEntity;

    function write(inputEnvironment, button) {
        $(inputEnvironment).append($(button).data('value'));
    }

    function removeSymbol(inputEnvironment, expression) {
        expression = expression.trim();
        let pattern = /\d+|\./;
        let index = 0;
        if (!pattern.test(expression[expression.length - 1])) {
            index = expression.length - 2;
        } else {
            index = expression.length - 1;
        }

        expression = expression.substring(0, index);
        $(inputEnvironment).text(expression);
    }

    function removeLastEntity(array, lastEntity) {
        let lastAsNumber = parseFloat(lastEntity);
        array.pop();
        if (lastAsNumber || lastAsNumber === 0) {
            return array.join(' ') + ' ';
        }
        return array.join(' ');
    }

    function showOutput(outputEnvironment, output) {
        $(outputEnvironment).text(output);
    }

    function negate(expression) {
        let expressionArray = expression.split(/\s+/);
        let lastNumber = expressionArray[expressionArray.length - 1];
        let negateNumber = parseFloat(lastNumber) * -1;
        expressionArray.pop();
        expressionArray.push(negateNumber);
        return expressionArray.join(' ');
    }

    function squareRoot(expression) {
        expression = expression.trim();
        let arrayExpression = expression.split(/\s+/);
        let lastNumber = arrayExpression[arrayExpression.length - 1];
        lastNumber = Math.sqrt(lastNumber);
        arrayExpression[arrayExpression.length - 1] = lastNumber;
        return arrayExpression.join(' ');
    }

    function percentage(expression) {
        expression = expression.trim();
        let arrayExpression = expression.split(/\s+/);

        let percent = arrayExpression[arrayExpression.length - 1];
        percent = parseFloat(percent);

        if (!percent) {
            return;
        }

        if (arrayExpression.length === 1) {
            return 0;
        }

        let lastNumber = arrayExpression[arrayExpression.length - 3];
        lastNumber = lastNumber * percent / 100;
        arrayExpression[arrayExpression.length - 1] = lastNumber;
        return arrayExpression.join(' ');
    }

    function memoryStart(value) {
        this.memory = value;
    }

    function memoryIncrease(value) {
        this.memory += value;
    }

    function memoryDecrease(value) {
        this.memory -= value;
    }

    function memoryClear() {
        this.memory = null;
    }

    function memoryRecall(array, memoryValue) {
        let lastElement = array[array.length - 1];
        let lastNumber = parseFloat(lastElement);

        if (lastNumber || lastNumber === 0) {
            array[array.length - 1] = memoryValue;
        } else {
            array.push(memoryValue);
        }

        return array.join(' ');
    }

    return Calculator;

})();
