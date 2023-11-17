const buttonEl = document.querySelectorAll('.button:not(.equal-sign)');
const screenBarEl = document.querySelector('.calculator-screen');
const equivalentEl = document.querySelector('.equal-sign');


const state = {
    flag: false,
    screenValue: 0,
    clickValue: '',
    resultNum: 0,
    operator: ''
}

const resetAll = () => {
    state.screenValue = 0;
    state.clickValue = '';
    state.resultNum = 0;
    operator = '';
}

const changeFlagAcButton = () => {
    state.flag = !state.flag;
    console.log(state.flag);
    resetAll();
    isPowerOn();
}

const isPowerOn = () => {
    if (state.flag === false) {
        screenBarEl.value = '';
        return;
    } 
    screenBarEl.value = '0';
    return true;
}

const displayNumber = () => {
    screenBarEl.value = state.resultNum;
    state.screenValue = '';
}

const displayDeleteValue = () => {
    if (state.screenValue.length === 0 && state.clickValue === 'DEL') {
        screenBarEl.value = '0';
    } else {
        screenBarEl.value = state.screenValue;
    }
}

const deleteButton = () => {
    if (state.screenValue !== '0') {
    const screenValue = state.screenValue;
    const newScreenValue = screenValue.substring(0, screenValue.length-1);
    state.screenValue = newScreenValue;
    displayDeleteValue();
    } else {
        screenBarEl.value = '0';
    }
}

const sum = () => {
    state.operator = '+';
    state.resultNum += +state.screenValue;
    displayNumber();
}

const subtraction = () => {
    state.operator = '-';
    const valueAzNum = +state.screenValue;
    if (state.resultNum === 0) {
        state.resultNum = valueAzNum;
    } else if (state.resultNum != valueAzNum) {
        state.resultNum -= valueAzNum;
    }
    displayNumber();
}

const multiplication = () => {
    state.operator = '*';
    if (state.resultNum === 0) {
        state.resultNum = state.screenValue;
    } else {
        state.resultNum *= +state.screenValue;
    }
    displayNumber();
}

const division = () => {
    state.operator = '/';
    if (state.resultNum === 0) {
        state.resultNum = +state.screenValue;
        screenBarEl.value = state.resultNum;
    } else {
        state.resultNum /= +state.screenValue;
        screenBarEl.value = state.resultNum;
    }
    state.screenValue = '';
}

buttonEl.forEach(button => {
    button.addEventListener('click', event => {
        const valueEl = event.target.value;
        state.clickValue = valueEl;
        if (valueEl === 'AC') {
            changeFlagAcButton();
        }
        if (!isPowerOn()) {
            return;
        }
        switch(valueEl) {
            case 'AC':
                state.screenValue = '';
                break;
            case 'DEL':
                deleteButton();
                break;
            case '+':
                sum();
                break;
            case '-':
                subtraction();
                break;
            case '*':
                multiplication();
                break;
            case '/':
                division();
                break;
            default:
                state.screenValue += valueEl;
                screenBarEl.value = state.screenValue;
                break;
        }
    })
});

const clickHandler = () => {

    if (state.clickValue === 'AC') {
        changeFlagAcButton();
    }
    if (!isPowerOn()) {
        return;
    }
    switch(state.operator) {
        case '+':
            sum();
            break;
        case '-':
            subtraction();
            break;
        case '*':
            multiplication();
            break;
        case '/':
            division();
            break;
    }
    resetAll();
    state.screenValue = screenBarEl.value;
}

equivalentEl.addEventListener('click', clickHandler);