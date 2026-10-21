/* =====================================================
   PEGANDO ELEMENTOS DO HTML
===================================================== */

const nome = document.getElementById("nome");

const peso = document.getElementById("peso");

const altura = document.getElementById("altura");

const btnCalcular = document.getElementById("btnCalcular");

const btnLimpar = document.getElementById("btnLimpar");

const resultado = document.getElementById("resultado");

const listaPessoas = document.getElementById("listaPessoas");

const totalPessoas = document.getElementById("totalPessoas");

const campoPesquisa = document.getElementById("campoPesquisa");

const btnPesquisar = document.getElementById("btnPesquisar");

const resultadoPesquisa = document.getElementById("resultadoPesquisa");

const mediaImc = document.getElementById("mediaImc");

const maiorImc = document.getElementById("maiorImc");

const menorImc = document.getElementById("menorImc");

const btnTema = document.getElementById("btnTema");

/* =====================================================
   ARRAY
===================================================== */

const pessoas = [];

/* =====================================================
   BOTÃO CALCULAR
===================================================== */

btnCalcular.addEventListener("click", function () {
  /* PEGANDO OS VALORES */

  const nomePessoa = nome.value.trim();

  const pesoPessoa = Number(peso.value);

  const alturaPessoa = Number(altura.value);

  /* VALIDAÇÃO */

  if (nomePessoa === "" || pesoPessoa <= 0 || alturaPessoa <= 0) {
    resultado.innerHTML = `
            <p>
                Preencha todos os campos corretamente.
            </p>
        `;

    return;
  }

  /* CONVERTENDO CM PARA METROS */

  const alturaMetros = alturaPessoa / 100;

  /* CALCULANDO IMC */

  const imc = pesoPessoa / (alturaMetros * alturaMetros);

  /* DEIXANDO COM 2 CASAS */

  const imcFormatado = imc.toFixed(2);

  /* CLASSIFICAÇÃO */

  let classificacao;

  let classeImc;

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";

    classeImc = "abaixo";
  } else if (imc < 25) {
    classificacao = "Peso adequado";

    classeImc = "adequado";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";

    classeImc = "sobrepeso";
  } else {
    classificacao = "Obesidade";

    classeImc = "obesidade";
  }

  /* MOSTRANDO RESULTADO */

  resultado.innerHTML = `

        <h3>
            IMC: ${imcFormatado}
        </h3>

        <p class="${classeImc}">
            ${classificacao}
        </p>

    `;

  /* GUARDANDO A PESSOA */

  pessoas.push({
    nome: nomePessoa,

    peso: pesoPessoa,

    altura: alturaMetros,

    imc: Number(imcFormatado),

    classificacao: classificacao,

    classeImc: classeImc,
  });

  /* ATUALIZANDO A LISTA */

  mostrarPessoas();

  /* LIMPANDO CAMPOS */

  nome.value = "";

  peso.value = "";

  altura.value = "";

  /* VOLTANDO PARA O NOME */

  nome.focus();
});

/* =====================================================
   MOSTRAR PESSOAS
===================================================== */

function mostrarPessoas() {
  /* LIMPA A LISTA DA TELA */

  listaPessoas.innerHTML = "";

  /* SE NÃO TIVER NINGUÉM */

  if (pessoas.length === 0) {
    listaPessoas.innerHTML = `

            <div class="vazio">

                Nenhuma pessoa cadastrada ainda.

            </div>

        `;
  }

  /* PERCORRENDO O ARRAY */

  pessoas.forEach(function (pessoa, index) {
    listaPessoas.innerHTML += `

            <div class="pessoa">

                <div class="pessoa-topo">

                    <div>

                        <h3>
                            ${pessoa.nome}
                        </h3>

                        <p class="pessoa-info">

                            Peso:
                            ${pessoa.peso} kg

                            |

                            Altura:
                            ${pessoa.altura.toFixed(2)} m

                        </p>

                    </div>


                    <button
                        class="excluir"
                        onclick="excluirPessoa(${index})"
                    >
                        Excluir
                    </button>

                </div>


                <div class="imc">

                    IMC:
                    ${pessoa.imc.toFixed(2)}

                </div>


                <p class="${pessoa.classeImc}">

                    ${pessoa.classificacao}

                </p>

            </div>

        `;
  });

  /* ATUALIZA CONTADOR */

  totalPessoas.textContent = pessoas.length;

  /* ATUALIZA ESTATÍSTICAS */

  atualizarEstatisticas();
}

/* =====================================================
   EXCLUIR PESSOA
===================================================== */

function excluirPessoa(index) {
  pessoas.splice(index, 1);

  mostrarPessoas();
}

/* =====================================================
   BOTÃO LIMPAR
===================================================== */

btnLimpar.addEventListener("click", function () {
  /* LIMPA OS CAMPOS */

  nome.value = "";

  peso.value = "";

  altura.value = "";

  /* LIMPA O RESULTADO */

  resultado.innerHTML = "";

  /* LIMPA A PESQUISA */

  campoPesquisa.value = "";

  resultadoPesquisa.innerHTML = "";

  /* LIMPA A LISTA */

  pessoas.length = 0;

  /* ATUALIZA A TELA */

  mostrarPessoas();

  /* VOLTA PARA O NOME */

  nome.focus();
});

/* =====================================================
   PESQUISAR PESSOA
===================================================== */

btnPesquisar.addEventListener("click", function () {
  /* PEGANDO O NOME DIGITADO */

  const nomeBuscado = campoPesquisa.value.trim();

  /* VALIDANDO PESQUISA */

  if (nomeBuscado === "") {
    resultadoPesquisa.innerHTML = `

            <p>
                Digite um nome para pesquisar.
            </p>

        `;

    return;
  }

  /* PROCURANDO */

  const resultados = pessoas.filter(function (pessoa) {
    return pessoa.nome.toLowerCase().includes(nomeBuscado.toLowerCase());
  });

  /* SE NÃO ENCONTROU */

  if (resultados.length === 0) {
    resultadoPesquisa.innerHTML = `

            <div class="vazio">

                Nenhuma pessoa encontrada.

            </div>

        `;

    return;
  }

  /* MOSTRANDO RESULTADOS */

  resultadoPesquisa.innerHTML = "";

  resultados.forEach(function (pessoa) {
    resultadoPesquisa.innerHTML += `

            <div class="pessoa">

                <h3>
                    ${pessoa.nome}
                </h3>

                <p>
                    Peso: ${pessoa.peso} kg
                </p>

                <p>
                    Altura: ${pessoa.altura.toFixed(2)} m
                </p>

                <p class="${pessoa.classeImc}">

                    IMC:
                    ${pessoa.imc.toFixed(2)}

                    -

                    ${pessoa.classificacao}

                </p>

            </div>

        `;
  });
});

/* =====================================================
   ESTATÍSTICAS
===================================================== */

function atualizarEstatisticas() {
  /* SE NÃO TEM PESSOAS */

  if (pessoas.length === 0) {
    mediaImc.textContent = "-";

    maiorImc.textContent = "-";

    menorImc.textContent = "-";

    return;
  }

  /* SOMANDO TODOS OS IMCs */

  let soma = 0;

  pessoas.forEach(function (pessoa) {
    soma += pessoa.imc;
  });

  /* MÉDIA */

  const media = soma / pessoas.length;

  mediaImc.textContent = media.toFixed(2);

  /* MAIOR */

  const maior = Math.max(
    ...pessoas.map(function (pessoa) {
      return pessoa.imc;
    }),
  );

  maiorImc.textContent = maior.toFixed(2);

  /* MENOR */

  const menor = Math.min(
    ...pessoas.map(function (pessoa) {
      return pessoa.imc;
    }),
  );

  menorImc.textContent = menor.toFixed(2);
}

/* =====================================================
   MODO ESCURO
===================================================== */

btnTema.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    btnTema.textContent = "☀️ Modo claro";
  } else {
    btnTema.textContent = "🌙 Modo escuro";
  }
});
