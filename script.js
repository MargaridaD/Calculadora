'use strict';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

const errorMessage = 'Error';
const notANumber = 'Not a number';

//Determinar dois ultimos caracteres de uma String (se a string tiver menos de 3 letras, devolve a string)
function doisUltimosCaracteres(string) {
  return string.slice(string.length - 2, string.length);
}

//Eliminar ultimo caracter de uma string
function eliminarUltimoCaractere(string) {
  return string.slice(0, display.value.length - 1);
}

//Calcular o resultado da expressão introduzida no visor
function calcularResultado(input) {
  try {
    input = input.replaceAll('÷', '/'); //substituir ÷ por /
    input = input.replaceAll('×', '*'); //substituir × por *
    input = input.replaceAll(',', '.'); //substituir virgulas por pontos
    console.log(`input: ${input}`);

    let aux = doisUltimosCaracteres(input);
    console.log(aux);

    let result;
    if (aux === '/0') {
      result = notANumber;
      return result;
      //FALTA CONSIDERAR RESTANTES CASOS DE DIVISÃO POR ZERO
    } else {
      result = String(eval(input)); //Calcular valor da expressão introduzida
      result = result.replaceAll('.', ','); //substituir pontos por vírgulas
      return result; //Resultado a ser mostrado no visor
    }
  } catch {
    return errorMessage;
  }
}

//Verificar se o numero que esta a ser introduzido já tem separador decimal (virgula)

for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];

  button.addEventListener('click', e => {
    switch (e.target.textContent) {
      case 'C':
        display.value = '0';
        break;
      case '=':
        display.value = calcularResultado(display.value);
        break;

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        let text = doisUltimosCaracteres(display.value);
        if (
          display.value === '0' ||
          display.value === errorMessage ||
          display.value === notANumber
        ) {
          display.value = e.target.textContent;
        } else if (
          text === '÷0' ||
          text === '0' ||
          text === '+0' ||
          text === '-0'
        ) {
          display.value =
            eliminarUltimoCaractere(display.value) + e.target.textContent;
        } else {
          display.value += e.target.textContent;
        }
        break;
      case ',':
        let arrayAux = display.value.replaceAll(',', '.'); //substituir virgulas por pontos
        arrayAux = arrayAux
          .split('+')
          .join('; ')
          .split('-')
          .join('; ')
          .split('×')
          .join('; ')
          .split('*')
          .join('; ')
          .split('÷')
          .join('; ')
          .split('/');
        let arrayDeNumeros = arrayAux[0].split(';');
        console.log(arrayDeNumeros);
        console.log(arrayDeNumeros[arrayDeNumeros.length - 1]);

        if (!arrayDeNumeros[arrayDeNumeros.length - 1].includes('.')) {
          display.value += ',';
          //FALTA CONSIDERAR RESTANTES CASOS EM QUE NUMERO JA TEM VIRGULA
        }
        break;
      default:
        if (display.value !== errorMessage && display.value !== notANumber) {
          if (doisUltimosCaracteres(display.value) === '÷0') {
            display.value = notANumber;
            //FALTA CONSIDERAR RESTANTES CASOS DE DIVISÃO POR ZERO
          } else {
            display.value += e.target.textContent;
          }
        }
    }
  });
}

document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'Escape':
      display.value = 0;
      break;
    case 'Enter':
      display.value = calcularResultado(display.value);
  }
});

// 'use strict';

// const display = document.getElementById('display');
// const buttons = document.querySelectorAll('.button');

// const errorMessage = 'Error';
// const notANumber = 'Not a number';
// let input = '';

// //unico caractere, dois unicos caracteres ou dois ultimos caracteres de uma String
// function doisUltimosCaracteres(string) {
//   return string.slice(string.length - 2, string.length);
// }

// function eliminarUltimoCaractere(string) {
//   return string.slice(0, display.value.length - 1);
// }

// for (let i = 0; i < buttons.length; i++) {
//   let button = buttons[i];

//   button.addEventListener('click', e => {
//     switch (e.target.textContent) {
//       case 'C':
//         display.value = '0';
//         input = '0';
//         break;
//       case '=':
//         try {
//           let aux = doisUltimosCaracteres(input);
//           if (aux === '/0') {
//             display.value = notANumber;
//             //FALTA CONSIDERAR RESTANTES CASOS DE DIVISÃO POR ZERO
//           } else {
//             let result = String(eval(input)); //Calcular valor da expressão introduzida
//             result = result.replaceAll('.', ','); //substituir pontos por vírgulas
//             display.value = result; //mostrar resultado obtido
//           }
//         } catch {
//           display.value = errorMessage;
//         }
//         break;

//       case '0':
//       case '1':
//       case '2':
//       case '3':
//       case '4':
//       case '5':
//       case '6':
//       case '7':
//       case '8':
//       case '9':
//         let text = doisUltimosCaracteres(input);
//         if (
//           display.value === '0' ||
//           display.value === errorMessage ||
//           display.value === notANumber
//         ) {
//           display.value = e.target.textContent;
//           input = e.target.textContent;
//         } else if (
//           text === '/0' ||
//           text === '*0' ||
//           text === '+0' ||
//           text === '-0'
//         ) {
//           display.value =
//             eliminarUltimoCaractere(display.value) + e.target.textContent;
//           input = eliminarUltimoCaractere(input) + e.target.textContent;
//         } else {
//           display.value += e.target.textContent;
//           input += e.target.textContent;
//         }
//         break;
//       case ',':
//         if (input[input.length - 1] !== '.') {
//           input += '.';
//           display.value += ',';
//           //FALTA CONSIDERAR RESTANTES CASOS EM QUE NUMERO JA TEM VIRGULA
//         }
//         break;
//       default:
//         if (display.value !== errorMessage && display.value !== notANumber) {
//           if (doisUltimosCaracteres(input) === '/0') {
//             display.value = notANumber;
//             //FALTA CONSIDERAR RESTANTES CASOS DE DIVISÃO POR ZERO
//           } else if (e.target.id === '*') {
//             input += '*';
//             display.value += e.target.textContent;
//           } else if (e.target.id === '/') {
//             input += '/';
//             display.value += e.target.textContent;
//           } else {
//             input += e.target.textContent;
//             display.value += e.target.textContent;
//           }
//         }
//     }
//   });
// }
