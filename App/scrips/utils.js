let Utils = (function () {

    function Utils() { }

    Utils.prototype.reset = reset;
    Utils.prototype.hide = hide;
    Utils.prototype.show = show;
    Utils.prototype.returnLastEntity = returnLastEntity;
    Utils.prototype.returnValueForMemory = returnValueForMemory;
    Utils.prototype.returnInputArrayType = returnInputArrayType;
    Utils.prototype.returnCalcResult = returnCalcResult;

    function reset(inputEnvironment, outputEnvironment) {
        $(inputEnvironment).text('');
        $(outputEnvironment).text('');
    }

    function hide(selector) {
        $(selector).addClass('hidden');
    }

    function show(selector) {
        $(selector).removeClass('hidden');
    }

    function returnValueForMemory(inputEnvironment, outputEnvironment, state) {
        let expression = $(inputEnvironment).text().trim();
        let value = null;
        if (state) {
            value = parseFloat($(outputEnvironment).text().trim());
        } else {
            value = parseFloat(getLastSymbol(expression));
        }
        return value;
    }

    function returnInputArrayType(inputEnvironment) {
        let expression = returnExpression(inputEnvironment);
        let resultArray = expression.split(/\s+/);
        return resultArray;
    }

    function returnLastEntity(array) {
        return array[array.length - 1];
    }

    function getLastSymbol(expression) {
        let expressionArray = expression.trim().split(/\s+/);
        return expressionArray[expressionArray.length - 1];
    }

    function returnExpression(inputEnvironment) {
        return $(inputEnvironment).text().trim();
    }

    function returnCalcResult(outputEnvironment) {
        return $(outputEnvironment).text().trim();
    }

    return Utils;

})();