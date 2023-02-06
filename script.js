const billBox = document.querySelector ('.bill-input');
const tipBox = document.querySelector ('.tip-input');
const buttons = document.querySelectorAll('.sect-2 button');
const peopleBox = document.querySelector ('.people-input');
const tipAmountDiv =document.querySelector('.tip-amount').lastElementChild;
const totalAmountDiv =document.querySelector('.total-amount').lastElementChild;
const resetButton=document.querySelector('.reset-button');
const sect1ZeroDiv=document.querySelector('.sect-1').firstElementChild.lastElementChild;
const sect3ZeroDiv=document.querySelector('.sect-3').firstElementChild.lastElementChild;
let buttonsArray=new Array;
let bill;
let selectedTip;
let inputTip;
let tipAmount;
let numberOfPeople;
let totalResult;
let tipResult;

for (let button of buttons) {
        buttonsArray.push(button);
        button.addEventListener ('click', function () {
            clearResultDiv();
            selectedTip=choosingTipButton(button, buttonsArray);
            checkingZeroInput(bill, sect1ZeroDiv, billBox);
            if(checkingInputs (billBox, peopleBox) && checkingZeroInput(bill, sect1ZeroDiv, billBox)) {
                [totalResult,tipResult]=calculator(bill, selectedTip, numberOfPeople);
                displayResultsOnScreen (totalResult, tipResult, tipAmountDiv, totalAmountDiv, resetButton);
            }
        }
    );
}

billBox.addEventListener ('input', function () {
    clearResultDiv();
    bill=getInput(billBox);
    checkingZeroInput(bill, sect1ZeroDiv, billBox);
    if(checkingInputs (billBox, peopleBox) && 
    checkingZeroInput(bill, sect1ZeroDiv, billBox)) {
        choosingTipAmount(selectedTip, inputTip);
        [totalResult,tipResult]=calculator(bill, tipAmount, numberOfPeople);
        displayResultsOnScreen (totalResult, tipResult, tipAmountDiv, totalAmountDiv, resetButton); 
    }
})

tipBox.addEventListener('input', function () {
    clearResultDiv();
    removeAllSelectedButtons(buttons);
    inputTip=getInput(tipBox);
    checkingZeroInput(bill, sect1ZeroDiv, billBox);
    if(checkingInputs && checkingZeroInput) {
        [totalResult,tipResult]=calculator(bill, inputTip, numberOfPeople);
        displayResultsOnScreen (totalResult, tipResult, tipAmountDiv, totalAmountDiv, resetButton); 
    }
})

peopleBox.addEventListener('input', function () {
    clearResultDiv();
    numberOfPeople=getInput(peopleBox);
    checkingZeroInput(numberOfPeople, sect3ZeroDiv, peopleBox);
    if(checkingInputs (billBox, peopleBox) && 
        checkingZeroInput(numberOfPeople, sect3ZeroDiv, peopleBox)) {
        choosingTipAmount(selectedTip, inputTip);
        [totalResult,tipResult]=calculator(bill, tipAmount, numberOfPeople);
        displayResultsOnScreen (totalResult, tipResult, tipAmountDiv, totalAmountDiv, resetButton); 
    }
})

resetButton.addEventListener ('click', function (){
    tipAmountDiv.innerHTML='0.00';
    totalAmountDiv.innerHTML='0.00';
    billBox.value="";
    tipBox.value="";
    peopleBox.value="";
    bill=0;
    numberOfPeople=0;
    sect1ZeroDiv.classList.add('hidden');
    sect3ZeroDiv.classList.add('hidden');
    removeAllSelectedButtons(buttons);
})
function choosingTipButton (button, btnArray) {
    tipBox.value="";
    button.classList.add("selected");
    selectedTip=button.value;
    for(btn of btnArray) {
        if(btn===button) {
        }
        else {
            btn.classList.remove("selected");
        }
    }
    return selectedTip;
}

function removeAllSelectedButtons (btnArray) {
    for(let btn of btnArray) {
        btn.classList.remove("selected");
    }
}
function choosingTipAmount (selectedTip,inputTip) {
    if (selectedTip) {
        tipAmount=selectedTip;
    }
    else if (inputTip) {
        tipAmount=inputTip;
    }
    else {
        tipAmount=0
    }
    return tipAmount;
}

function displayResultsOnScreen (totalResult, tipResult, tipAmountDiv, totalAmountDiv, resetButton) {
    tipAmountDiv.innerHTML=tipResult;
    totalAmountDiv.innerHTML=totalResult;
    resetButton.style.opacity="1";
    resetButton.style.backgroundColor="#26C2AE";
}

function calculator(x, y, z) {
    let totalResult = (x+x*y/100)/z;
    let tipResult = x*y/100/z;
    totalResult=parseFloat(totalResult).toFixed(2);
    tipResult=parseFloat(tipResult).toFixed(2);
    return [totalResult, tipResult];
}

function checkingInputs (xBox, zBox) {
    if(xBox.value.length===0 || zBox.value.length===0) {
        return false;
    } 
    else {
        return true;
    }  
} 

function checkingZeroInput (input, elementName, elementBox) {
    if (input===0 && elementBox.value.length!==0) {
        elementName.classList.remove('hidden');
        return false;
    }  
    else {
        elementName.classList.add('hidden');
        return true;
    } 
}

function getInput (inputBox) {
    amount=Number(inputBox.value);
    return amount;
}

function clearResultDiv() {
    tipAmountDiv.innerHTML='0.00';
    totalAmountDiv.innerHTML='0.00';
}



