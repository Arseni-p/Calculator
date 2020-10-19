'use strict';

let output = document.querySelector('.calc__output');
let memoryItem = output.querySelector('.memory-part');
let mainItem = output.querySelector('.current-part');

let calculButtons = document.querySelector('.calc__buttons--wrap')

let numbers = calculButtons.querySelectorAll('.calc__number');
let symbals = calculButtons.querySelectorAll('.func__symbal');
let backspace = calculButtons.querySelector('.backspace');
let powBtn = calculButtons.querySelector('.pow');
let sqrtBtn = calculButtons.querySelector('.sqrt');
let plusminus = calculButtons.querySelector('.plusminus');
let result = calculButtons.querySelector('.btn__equal')

let currentNumb = '';//исходное текущего значения числа 1
let currentNumbSec = '';//исходное текущего значения числа 2
let firstValue = 0;//исходное число 1
let secondValue = 0;//исходное число 2
let operation;//переменная операции

let noNumbers = true;//условия для объявление чисел 1 и 2
let dotValue = false;//условия для дроби 1го числа
let dotValueSec = false;//условия для дроби 2го числа
let sqrtValue = false;//условия для квадратного корня 1го числа
let sqrtValueSec = false;//условия для квадратного корня 1го числа
let powValue = false;//условия для возведения в степень
let plmValue = false;//условие для +/- 1го числа
let plmValueSec = false;//условие для +/- 2го числа
let calcUpdate = true;//условие для обнуления при продолжающимся вычислении


//FUNCTIONS=================================================
//Определение первого числа ------------------------------------
let firstValueFunc = function(btn) {
  if (noNumbers) {
    currentNumb +=btn.textContent;
    mainItem.innerHTML = currentNumb;
    memoryItem.innerHTML = '';
    
    operation = '';
    dotValueSec = false;
  } 
}

//Определение второго числа ------------------------------------
let secondValueFunc = function(btnSec) {
  currentNumbSec +=btnSec.textContent;
  mainItem.innerHTML = currentNumbSec;
  
  calcUpdate = false;
}

//Определение операции ------------------------------------
let operationValue = function(symbalBtn, firstValue) {
  currentNumb = '';
  currentNumbSec = '';
  if (symbalBtn.classList.contains('division')) {
    memoryItem.innerHTML = firstValue + ' / ';
    return operation = 'division'
  }

  if (symbalBtn.classList.contains('multiplication')) {
    memoryItem.innerHTML = firstValue + ' * ';
    return operation = 'multi'
  } 

  if (symbalBtn.classList.contains('minus')) {
    memoryItem.innerHTML = firstValue + ' - ';
    return operation = 'minus'
  }

  if (symbalBtn.classList.contains('plus')) {
    memoryItem.innerHTML = firstValue + ' + ';
    return operation = 'plus';
  }

  if (symbalBtn.classList.contains('pow')) {
    memoryItem.innerHTML = firstValue + '<sup>n</sup>';
    return operation = 'pow';
  }
};

//Определение вычисления операции ------------------------------------
let calcOper = function(firstValue, secondValue, operation) {
  if (operation === 'division') {
    memoryItem.innerHTML = firstValue + ' / ' + secondValue;
    mainItem.innerHTML = ((parseFloat(firstValue)*10) / (parseFloat(secondValue)*10));  }

  if (operation === 'multi') {
    memoryItem.innerHTML = firstValue + ' * ' + secondValue;
    mainItem.innerHTML = (parseFloat(firstValue)*10 * parseFloat(secondValue)*10)/100;
  }

  if (operation === 'minus') {
    memoryItem.innerHTML = firstValue + ' - ' + secondValue;
    mainItem.innerHTML = (parseFloat(firstValue)*10 - parseFloat(secondValue)*10)/10;
  }
  if (operation === 'plus') {
    memoryItem.innerHTML = firstValue + ' + ' + secondValue;
    mainItem.innerHTML = (parseFloat(firstValue)*10 + parseFloat(secondValue)*10)/10;
  }

  if (operation === 'pow') {
    memoryItem.innerHTML = firstValue + ' <sup>' + secondValue + '</sup>';
    mainItem.innerHTML = Math.pow(parseFloat(firstValue), parseInt(secondValue));  }
  
  return resetBtn();
}

//Присовение +/- ------------------------------------
let calcPlusmins = function() {
  if (noNumbers) {
    currentNumb *=-1;
    mainItem.innerHTML = currentNumb;
  }

  if (!noNumbers && firstValue) {
    currentNumbSec *=-1;
    mainItem.innerHTML = currentNumbSec;
  }
}


//Квадратный корень ------------------------------------
let calcSqrt = function(firstValue, secondValue) {
  if (!sqrtValue && noNumbers) {
    memoryItem.innerHTML = 'sqrt(' + mainItem.textContent + ')';

    currentNumb = Math.sqrt(parseFloat(firstValue));
    mainItem.innerHTML = currentNumb;
    sqrtValue = true;
  }

  if (!sqrtValueSec && !noNumbers && firstValue) {
    memoryItem.innerHTML = 'sqrt(' + secondValue + ')';

    currentNumbSec = Math.sqrt(parseFloat(secondValue));
    mainItem.innerHTML = currentNumbSec;
    sqrtValueSec = true;
  }
}

//Удаление чисел ------------------------------------
let backspaceFunc = function() {
  if (!secondValue) {
    currentNumb = mainItem.textContent.slice(0, -1);
    currentNumbSec = '';
    mainItem.innerHTML = currentNumb;
    firstValue = currentNumb;

    if (firstValue.length == 0) {
      currentNumb = '';
      mainItem.innerHTML = '0';
      firstValue = mainItem.textContent;
    }

    noNumbers = true;
    return firstValue;
  }
  
  if (secondValue && firstValue) {
    currentNumbSec = mainItem.textContent.slice(0, -1);
    mainItem.innerHTML = currentNumbSec;
    secondValue = currentNumbSec;

    if (secondValue.length == 0) {
      currentNumbSec = '';
      mainItem.innerHTML = '0';
      secondValue = mainItem.textContent;
    }

    noNumbers = false;
    return secondValue;
  }
}

//Сброс под ноль ------------------------------------
let resetBtn = function() {
  currentNumb = '';
  currentNumbSec = '';
  firstValue = '0';
  secondValue = '0';
  noNumbers = true;
  dotValue = '';
  dotValueSec = '';
  sqrtValue = false;
  sqrtValueSec = false;
  calcUpdate = true;
}


//BUTTONS=================================================
//Ввод числа ------------------------------------
for (let i = 0; i < numbers.length; i++) {
  let numBtn = numbers[i];
  
  numBtn.addEventListener('click', function() {
    
    if (noNumbers) {
      firstValueFunc(numBtn);
      firstValue = currentNumb;
    } else {
      secondValueFunc(numBtn);
      secondValue = currentNumbSec;
    }
  })
}

//Ввод сброса под ноль ------------------------------------
let reset = document.querySelector('.reset').addEventListener('click', function() {
  memoryItem.innerHTML = ''
  mainItem.innerHTML = '0';
  return resetBtn();
})

//Ввод точки для дробного числа ------------------------------------
let dot = document.querySelector('.dot').addEventListener('click', function() {
  if (!dotValue && noNumbers) {
    dotValue = '.';
    currentNumb +=dotValue;
    mainItem.innerHTML = currentNumb;

    dotValue = true;
  } 
  
  if (!dotValueSec && !noNumbers && firstValue ) {
    dotValueSec = '.';
    currentNumbSec +=dotValueSec;
    mainItem.innerHTML = currentNumbSec;

    dotValueSec = true;
  }
})

//Ввод удаления числа ------------------------------------
backspace.addEventListener('click', function() {
  backspaceFunc()
})

//Ввод вычесления операции ------------------------------------
result.addEventListener('click', function() {
  if (firstValue && secondValue || !firstValue && secondValue) {
    return calcOper(firstValue, secondValue, operation);
  }
})

//Ввод операции ------------------------------------
for (let j = 0; j < symbals.length; j++) {
  let symbalBtn = symbals[j];

  symbalBtn.addEventListener('click', function() {
    if (noNumbers) {
      operationValue(symbalBtn, firstValue);
    }

    if (!calcUpdate && firstValue && secondValue) {
      calcOper(firstValue, secondValue, operation);
      firstValue = mainItem.textContent;
      operationValue(symbalBtn, firstValue);
    }

    noNumbers = false;
  })
}

//Ввод +/- ------------------------------------
plusminus.addEventListener('click', function() {
  if (noNumbers) {
    calcPlusmins();
    firstValue = mainItem.textContent
  }

  if (!noNumbers && firstValue) {
    calcPlusmins();
    secondValue = mainItem.textContent;
  }
})

//Ввод квадратного корня ------------------------------------
sqrtBtn.addEventListener('click', function() {
  if (!sqrtValue && noNumbers) {
    if (firstValue < 0) {
      currentNumb = '';
      firstValue = '';
      return mainItem.innerHTML = '<small>Ошибка!!! Число &#8249; 0</small>'
    } else {
      calcSqrt(firstValue, secondValue);
      firstValue = mainItem.textContent;
    }
  }

  if (!sqrtValueSec && !noNumbers && firstValue) {
    if (secondValue < 0) {
      currentNumbSec = '';
      secondValue = '';
      return mainItem.innerHTML = '<small>Ошибка!!! Число &#8249; 0</small>'
    } else {
      calcSqrt(firstValue, secondValue);
      secondValue = mainItem.textContent;
    }
  }
})