const description = document.createElement('div');
description.className = 'about';
description.innerHTML = '<p>Клавиатура создана в ОС Windows.</p><p>Способы переключения языка:</p><ol><li>Комбинация левых клавиш физической клавиатуры "ShiftLeft" + "AltLeft".</li><li>Кнопка "Win" виртуальной клавиатуры.</li></ol>';
document.body.append(description);


const inputArea = document.createElement('textarea');
const keyboardBody = document.createElement('div');
inputArea.classList.add('keyboard__input');
keyboardBody.classList.add('keyboard__keys');
document.body.appendChild(inputArea);
document.body.appendChild(keyboardBody);

const englishKeys = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
  'ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ShiftRight',
  'Ctrl', 'Win', 'AltLeft', 'Space', 'AltRight', 'Ctrl', '←', '↓', '→', 'Clear',
];

const englishUpperKeys = [
  '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete',
  'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
  'ShiftLeft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'ShiftRight',
  'Ctrl', 'Win', 'AltLeft', 'Space', 'AltRight', 'Ctrl', '←', '↓', '→', 'Clear',
];

const russianKeys = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'ShiftLeft', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'ShiftRight',
  'Ctrl', 'Win', 'AltLeft', 'Space', 'AltRight', 'Ctrl', '←', '↓', '→', 'Clear',
];

const russianUpperKeys = [
  'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete',
  'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
  'ShiftLeft', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'ShiftRight',
  'Ctrl', 'Win', 'AltLeft', 'Space', 'AltRight', 'Ctrl', '←', '↓', '→', 'Clear',
];

const keyboardLayouts = [
  [englishKeys, englishUpperKeys],
  [russianKeys, russianUpperKeys],
];


const createAndAddKeys = (element) => {
  element.forEach((item) => {
    if (item === 'Backspace' || item === 'Enter' || item === 'ShiftLeft' || item === 'ShiftRight' || item === 'CapsLock') {
      const button = document.createElement('button');
      button.textContent = `${item}`;
      button.classList.add('keyboard__key', 'keyboard__key-long', 'keyboard__special');
      keyboardBody.appendChild(button);
    } else if (item === 'Space') {
      const button = document.createElement('button');
      button.textContent = `${item}`;
      button.classList.add('keyboard__key', 'keyboard__special', 'keyboard__key-long-long');
      keyboardBody.appendChild(button);
    } else if (item === 'Delete' || item === 'Tab' || item === 'Ctrl' || item === 'AltLeft' || item === 'Win' || item === 'AltRight' || item === 'Clear') {
      const button = document.createElement('button');
      button.textContent = `${item}`;
      button.classList.add('keyboard__key', 'keyboard__special');
      keyboardBody.appendChild(button);
    } else {
      const button = document.createElement('button');
      button.textContent = `${item}`;
      button.setAttribute('name', 'simple-character');
      button.classList.add('keyboard__key');
      keyboardBody.appendChild(button);
    }
  });
};


let language = 0;
let caps = 0;

createAndAddKeys(keyboardLayouts[language][caps]);

const buttons = document.querySelectorAll('.keyboard__key');

const changeRegister = (element) => {
  buttons.forEach((item, index) => {
    item.innerHTML = element[index];
  });
};

const addActiveButton = () => {
  inputArea.focus();
  keyboardLayouts[language][caps].forEach((item, index) => {


    // eslint-disable-next-line no-restricted-globals
    if (event.key === item || event.code === item) {
      buttons[index].classList.add('keyboard__key-select');
    }
  });
};

const changeLanguage = () => {
  language === 0 ? language = 1 : language = 0;
  changeRegister(keyboardLayouts[language][caps]);

  localStorage.setItem('language', language);
  changeRegister(keyboardLayouts[language][caps]);
};

let currentPos;

document.addEventListener('click', (event) => {
  const elements = event.target.textContent;
  let start; let end; let textBefore; let
    textAfter;
  switch (elements) {
    case 'Backspace':

      start = inputArea.selectionStart;
      end = inputArea.selectionEnd;
      textBefore = inputArea.value.substring(0, start - 1);
      textAfter = inputArea.value.substring(end);
      inputArea.value = `${textBefore}${textAfter}`;
      inputArea.selectionStart = start - 1;
      inputArea.selectionEnd = inputArea.selectionStart;

      break;

    case 'Delete':
      currentPos = inputArea.selectionStart = inputArea.selectionEnd;

      const textareaValueDel = [];

      inputArea.value.split('').forEach((el, index) => {
        if (index !== currentPos) {
          textareaValueDel.push(el);
        }
      });

      inputArea.value = textareaValueDel.join('');
      inputArea.selectionStart = inputArea.selectionEnd = currentPos;

      break;

    case 'Enter':

      const newRow = '\n';
      start = inputArea.selectionStart;
      end = inputArea.selectionEnd;
      textBefore = inputArea.value.substring(0, start);
      textAfter = inputArea.value.substring(end);
      inputArea.value = `${textBefore}${newRow}${textAfter}`;
      inputArea.selectionStart = start + newRow.length;
      currentPos = inputArea.selectionEnd = inputArea.selectionStart;

      break;

    case 'Space':
      currentPos = inputArea.selectionStart = inputArea.selectionEnd;
      inputArea.setRangeText(' ');
      inputArea.selectionStart = inputArea.selectionEnd = currentPos += 1;

      break;

    case 'CapsLock':

      event.target.classList.toggle('keyboard__key-select');
      caps === 1 ? caps = 0 : caps = 1;
      changeRegister(keyboardLayouts[language][caps]);

      break;

    case 'Win':

      changeLanguage();

      break;

    case 'Tab':
      event.preventDefault();
      inputArea.setRangeText('\t');
      inputArea.selectionStart = inputArea.selectionEnd = currentPos += 1;

      break;

    case 'Clear':

      inputArea.value = '';

      break;
  }

  if (event.target.classList.contains('keyboard__key') && !event.target.classList.contains('keyboard__special')) {
    start = inputArea.selectionStart;
    end = inputArea.selectionEnd;
    textBefore = inputArea.value.substring(0, start);
    textAfter = inputArea.value.substring(end);
    inputArea.value = `${textBefore}${event.target.textContent}${textAfter}`;
    inputArea.selectionStart = start + event.target.textContent.length;
    inputArea.selectionEnd = inputArea.selectionStart;
  }
  inputArea.focus();
});

const simpleCharacter = document.getElementsByName('simple-character');
const pressed = new Set();

document.addEventListener('keydown', (event) => {

  currentPos = inputArea.selectionStart = inputArea.selectionEnd;
  pressed.add(event.key);

  if (pressed.has('Shift')) {
    event.preventDefault();
    simpleCharacter.forEach((item) => {
      item.classList.add('uppercase');
    });
  }

  if (pressed.has('Shift') && pressed.has('Alt')) {
    event.preventDefault();
    changeLanguage();
  }

  if (pressed.has('CapsLock')) {
    caps === 0 ? caps = 1 : caps = 0;
    changeRegister(keyboardLayouts[language][caps]);
  }

  if (pressed.has('Tab')) {
    event.preventDefault();
    inputArea.setRangeText('\t');
    inputArea.selectionStart = inputArea.selectionEnd = currentPos += 1;
  }


  addActiveButton();
});

document.addEventListener('keyup', () => {
  pressed.clear();
  buttons.forEach((button) => {
    if (button.textContent !== 'CapsLock' || caps === 0) {
      button.classList.remove('keyboard__key-select', 'uppercase');
    }
  });
});

window.onload = () => {
  if (localStorage.getItem('language')) {
    language = +localStorage.getItem('language');
  }
  changeRegister(keyboardLayouts[language][caps]);
  inputArea.focus();
};
