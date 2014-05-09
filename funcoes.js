var calculadora = {
  valor: "0",
  valor_old: "0",
  operacao: null,
  estado: "inicio"
}

$(document).ready( function() {
    calculadora.display = $(".calculadora_display");
    $(".js-botao").click( function() {
      var texto = $(this).text();
      console.log(texto);
      botaoClicked(texto);
    }).hover(
    function() {
      $(this).addClass("enfase");
      console.log("mouse passou por cimaa!");
    },
    function() {
      $(this).removeClass("enfase");
    });
});

$(document).keypress(teclaPressionada);
$(document).keydown(teclaApertada);

function teclaPressionada () {
  var tecla = String.fromCharCode(event.keyCode);
  if(event.keyCode === 13) {
    console.log("Foi aperdato o enter");
    botaoClicked("=");
  }
  else {
    console.log(tecla);
    botaoClicked(tecla);  
  }
}

function teclaApertada () {
  if (event.keyCode === 8){
    console.log("Foi aperdato o backSpace");
    botaoClicked("apaga");
  }
}

function botaoClear () {
  console.log("Foi chamado o botaoClear.");
  calculadora.valor = "0";
  calculadora.valor_old = "0";
  calculadora.operacao = null;
  calculadora.estado = "inicio";
}

function inverteValor(valor) {
  var num = -Number(valor);
  return num.toString();
}

function botaoInverte() {
  calculadora.valor = inverteValor(calculadora.valor);
}

function doOperation (val1, val2, operacao) {
  switch(operacao) {
    case "X": case "x":
      operacao = "*";
      break;

  }
  return eval(val1+operacao+val2).toString();
}

function botaoOperacao (operacao) {
  console.log(operacao);
  switch(calculadora.estado) {
    case "inicio": case "espera_operacao":
      calculadora.estado = "espera_numero";
      calculadora.operacao = operacao;
      break;
    case "espera_numero":
      calculadora.operacao = operacao;
      break;
    case "espera_igual":
      calculadora.valor = doOperation(calculadora.valor_old, calculadora.valor, calculadora.operacao);
      calculadora.estado = "espera_numero";
      calculadora.operacao = operacao;
  }
}

function botaoIgual () {
  switch(calculadora.estado) {
    case "espera_igual":
      calculadora.valor = doOperation(calculadora.valor_old, calculadora.valor, calculadora.operacao);
      calculadora.estado = "espera_operacao";
      break;
  }
}

function contatena(num, num_adicional) {
  console.log(num);
  console.log(num_adicional);
  if(num_adicional === "." && num.indexOf(".") !== -1) {
    return num;
  }
  if(num === "0" && num_adicional !== ".") {
    return num_adicional;
  }
  return num+num_adicional;
}

function botaoNumero (numero) {
  switch(calculadora.estado) {
    case "inicio": case "espera_operacao":
      calculadora.estado = "espera_operacao";
      calculadora.operacao = null;
      calculadora.valor = contatena(calculadora.valor, numero);
      break;
    case "espera_numero":
      calculadora.valor_old = calculadora.valor;
      calculadora.valor = contatena("0", numero);
      calculadora.estado = "espera_igual";
      break;
    case "espera_igual":
      calculadora.valor = contatena(calculadora.valor, numero);
      break;
  }  
}

function extraiUltimoAlgarismo (valor) {
  if(valor === "0")
    return valor;
  valor = valor.substring(0, valor.length - 1);
  if(valor === "-" || valor === "" || Number(valor) === 0)
    return "0";
  return valor;
}

function botaoApaga() {
  console.log("botaoApaga");
  calculadora.valor = extraiUltimoAlgarismo(calculadora.valor);
}

function botaoClicked(botao) {
  switch(botao) {
    case "C":
      botaoClear();
      break;
    case "/": case "*": case "+": case "-": case "X": case "x":
      botaoOperacao(botao);
      break;
    case "=":
      botaoIgual();
      break;
    case "-1":
    case "+/-":
      botaoInverte();
      break;
    case "apaga":
      botaoApaga();
      break;
    case "0":
    case "1": 
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      botaoNumero(botao);
      break;
    default:
      
  }
  displayValor(calculadora.valor);
  console.log(calculadora);
}

function displayValor(valor) {
  console.log("displayValor!");
  calculadora.display.prop("value",valor);
}