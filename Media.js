const notas = [];

const inputNota = document.getElementById("nota");
const btnAdicionar = document.getElementById("btn-adicionar");
const btnCalcular = document.getElementById("btn-calcular");
const btnLimpar = document.getElementById("btn-limpar");
const listaNotas = document.getElementById("lista-notas");
const resultado = document.getElementById("resultado");

function calcularMedia(lista) {
  const soma = lista.reduce((total, nota) => total + nota, 0);
  return soma / lista.length;
}

function mostrarNotas() {
  listaNotas.innerHTML = "";

  notas.forEach(function (nota, indice) {
    const item = document.createElement("li");
    item.textContent = nota;

    const remover = document.createElement("button");
    remover.textContent = "×";
    remover.setAttribute("aria-label", "Remover nota " + nota);
    remover.addEventListener("click", function () {
      notas.splice(indice, 1);
      mostrarNotas();
    });

    item.appendChild(remover);
    listaNotas.appendChild(item);
  });
}

function adicionarNota() {
  const valor = inputNota.value.trim();
  const nota = Number(valor);

  if (valor === "" || isNaN(nota) || nota < 0 || nota > 20) {
    resultado.textContent = "Introduz uma nota entre 0 e 20.";
    resultado.className = "erro";
    return;
  }

  notas.push(nota);
  inputNota.value = "";
  inputNota.focus();
  resultado.textContent = "";
  resultado.className = "";
  mostrarNotas();
}

function mostrarMedia() {
  if (notas.length === 0) {
    resultado.textContent = "Adiciona pelo menos uma nota.";
    resultado.className = "erro";
    return;
  }

  const media = calcularMedia(notas);

  if (media >= 9.5) {
    resultado.textContent = "Média: " + media.toFixed(2) + " · Aprovado ✅";
    resultado.className = "aprovado";
  } else {
    resultado.textContent = "Média: " + media.toFixed(2) + " · Reprovado ❌";
    resultado.className = "reprovado";
  }
}

function limpar() {
  notas.length = 0;
  mostrarNotas();
  resultado.textContent = "";
  resultado.className = "";
  inputNota.focus();
}

btnAdicionar.addEventListener("click", adicionarNota);
btnCalcular.addEventListener("click", mostrarMedia);
btnLimpar.addEventListener("click", limpar);

inputNota.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarNota();
  }
});