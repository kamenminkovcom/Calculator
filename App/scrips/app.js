let App = (function () {

    const constants = {
        inputEnvironment: '.js-input-screen',
        outputEnvironment: '.js-output-screen',
        modeMenu: '.js-mode-menu',
        clickTaker: '.js-click-taker',
        advancedSection: '.js-advanced-section'
    };

    let state = {
        hasResult: false,
        modeMenu: false
    };

    function App() {
        this.calculator = new Calculator();
        this.engine = new Engine();
        this.utils = new Utils();
    }

    App.prototype.resetState = resetState;
    App.prototype.continueNextOperation = continueNextOperation;
    App.prototype.enableCalc = enableCalc;
    App.prototype.disableCalc = disableCalc;
    App.prototype.bindEventListeners = bindEventListeners;

    let app = new App();
    app.bindEventListeners();

    function resetState() {
        if (!state.hasResult) {
            return;
        }

        this.utils.reset(constants.inputEnvironment, constants.outputEnvironment);
        state.hasResult = false;
    }

    function continueNextOperation() {
        if (!state.hasResult) {
            return;
        }

        let result = app.utils.returnCalcResult(constants.outputEnvironment);
        this.utils.reset(constants.inputEnvironment, constants.outputEnvironment);
        state.hasResult = false;
        $(constants.inputEnvironment).text(result);
    }

    function enableCalc() {
        this.utils.hide(constants.modeMenu);
        this.utils.hide(constants.clickTaker);
        state.modeMenu = false;
    }

    function disableCalc() {
        this.utils.show(constants.modeMenu);
        this.utils.show(constants.clickTaker);
        state.modeMenu = true;
    }

    function bindEventListeners() {
        $('.js-key-default').on('click', event => {
            this.resetState();
            this.calculator.write(constants.inputEnvironment, event.target);
        });

        $('.js-backspace').on('click', () => {
            this.resetState();
            let expression = $(constants.inputEnvironment).text();
            this.calculator.removeSymbol(constants.inputEnvironment, expression);
        });

        $('.js-key-operator').on('click', event => {
            this.continueNextOperation();
            let expression = $(constants.inputEnvironment).text();
            let isValid = Validator.validateInput(expression);
            if (isValid) {
                this.calculator.write(constants.inputEnvironment, event.target);
            }
        });

        $('.js-negate').on('click',  () => {
            this.continueNextOperation();
            let expression = $(constants.inputEnvironment).text();
            if (!Validator.validateInput(expression)) {
                return;
            }
            expression = this.calculator.negate(expression);
            $(constants.inputEnvironment).text(expression);

        });

        $('.js-percent-key').on('click', () => {
            this.continueNextOperation();
            let expression = $(constants.inputEnvironment).text();
            if (!Validator.validateInput(expression)) {
                return;
            }
            expression = this.calculator.percentage(expression);
            $(constants.inputEnvironment).text(expression);
        });

        $('.js-square-root-key').on('click', () => {
            this.continueNextOperation();
            let expression = $(constants.inputEnvironment).text();
            if (!Validator.validateInput(expression)) {
                return;
            }
            expression = this.calculator.squareRoot(expression);
            $(constants.inputEnvironment).text(expression);
        });

        $('.js-equals-operator').on('click', () => {
            this.resetState();
            let expression = $(constants.inputEnvironment).text();
            if (!Validator.validateInput(expression)) {
                return;
            }
            expression = this.engine.parseInput(expression);
            let result = this.engine.evaluate(expression);
            this.calculator.showOutput(constants.outputEnvironment, result);
            state.hasResult = true;
        });

        $(constants.clickTaker).on('click', () => {
            this.enableCalc();
        });

        $('.js-hambureger-menu').on('click', () => {
            this.disableCalc();
        });

        $('.js-memory-start').on('click', () => {
            let expression = $(constants.inputEnvironment).text();
            if (!Validator.validateInput(expression)) {
                return;
            }
            let value = this.utils.returnValueForMemory(constants.inputEnvironment, constants.outputEnvironment, state.hasResult);
            this.calculator.memoryStart(value);
        });

        $('.js-memory-plus').on('click', () => {
            let expression = $(constants.inputEnvironment).text();
            if (!Validator.validateInput(expression)) {
                return;
            }
            if (this.calculator.memory === null) {
                this.calculator.memory = 0;
            }
            let value = this.utils.returnValueForMemory(constants.inputEnvironment, constants.outputEnvironment, state.hasResult);
            this.calculator.memoryIncrease(value);
        });

        $('.js-memory-minus').on('click', () => {
            let expression = $(constants.inputEnvironment).text();
            if (!Validator.validateInput(expression)) {
                return;
            }
            if (this.calculator.memory === null) {
                this.calculator.memory = 0;
            }
            let value = this.utils.returnValueForMemory(constants.inputEnvironment, constants.outputEnvironment, state.hasResult);
            this.calculator.memoryDecrease(value);
        });

        $('.js-memory-clear').on('click', () => {
            this.calculator.memoryClear();
        });

        $('.js-memory-recall').on('click', () => {
            if (this.calculator.memory === null) {
                return;
            }
            let inputArray = this.utils.returnInputArrayType(constants.inputEnvironment);
            let result = this.calculator.memoryRecall(inputArray, this.calculator.memory);
            $(constants.inputEnvironment).text(result);
        });

        $('.js-advanced-mode-btn').on('click', () => {
            this.utils.show(constants.advancedSection);
            this.enableCalc();
        });

        $('.js-standard-mode-btn').on('click', () => {
            this.utils.hide(constants.advancedSection);
            this.enableCalc();
        });

        $('.js-key-clear-all').on('click', () => {
            this.resetState();
            this.utils.reset(constants.inputEnvironment, constants.outputEnvironment);
        });

        $('.js-key-clear-last-entity').on('click', () => {
            this.resetState();
            let inputArray = this.utils.returnInputArrayType(constants.inputEnvironment);
            let lastSymbol = this.utils.returnLastEntity(inputArray);
            let resultInput = this.calculator.removeLastEntity(inputArray, lastSymbol);
            $(constants.inputEnvironment).text(resultInput);
        });
    }
})();