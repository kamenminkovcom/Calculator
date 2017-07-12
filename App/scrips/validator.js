let Validator = (function () {

    function Validator() { }

    Validator.validateInput = validateInput;

    function validateInput(expression) {
        if (expression.length === 0) {
            return false
        }

        let lastSymbol = expression[expression.length - 1];
        let isDigit = /\d{1}/.test(lastSymbol);

        return isDigit;
    }

    return Validator;

})();