function limparFormularioIMC() {
    document.getElementById('nome').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    resultado.className = 'alert mt-3';
    resultado.style.display = 'none';
}


document.addEventListener("DOMContentLoaded", function () {
    const nomeInput = document.getElementById('nome');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');

    nomeInput.addEventListener('input', function () {
        this.value = this.value
            .replace(/-/g, '')
            .replace(/[^A-Za-zÀ-ÿ\s]/g, ''); 
    });

    pesoInput.addEventListener('input', function () {
        this.value = this.value
            .replace(/-/g, '')
    });

    alturaInput.addEventListener('input', function () {
        this.value = this.value
            .replace(/-/g, '')
    });
});

function calcularIMC() {
    const nome = document.getElementById('nome').value.trim();
    const peso = parseFloat(document.getElementById('peso').value);
    let altura = parseFloat(document.getElementById('altura').value);
    
    if (altura > 3) {
        altura = altura / 100;
    }
    const resultado = document.getElementById('resultado');

    if (nome && peso && altura) {
        const imc = peso / (altura * altura);
        let classificacao = '';

        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
        } else if (imc < 24.99) {
            classificacao = 'Peso normal';
        } else if (imc < 29.99) {
            classificacao = 'Acima do Peso(Sobrepeso)';
        } else if (imc < 35) {
            classificacao = 'Obesidade Grau I';
        } else if (imc < 40) {
            classificacao = 'Obesidade Grau II';
        } else {
            classificacao = 'Obesidade Grau III';
        }
        
        resultado.innerHTML = `
            <h3>Resultado para ${nome}:</h3>
            <p>Seu IMC é: ${imc.toFixed(2)}</p>
            <p>Status: ${classificacao}</p>
        `;
        resultado.style.backgroundColor = '#e8f5e9';
        resultado.classList.remove('d-none');
        resultado.classList.add('d-block');
    } else {
        resultado.innerHTML = 'Por favor, preencha todos os campos corretamente.';
        resultado.classList.remove('d-none');
        resultado.classList.add('d-block');
        resultado.style.backgroundColor = '#ffebee';
        resultado.style.color = '#c62828';
    }
}


function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('cep').value = ("");
    document.getElementById('logradouro').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('estado').value=("");
    document.getElementById('pais').value=("");
}

cep = document.getElementById('cep')

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('logradouro').value = "Carregando...";
            document.getElementById('bairro').value= "Carregando...";
            document.getElementById('cidade').value= "Carregando...";
            document.getElementById('estado').value= "Carregando...";
            document.getElementById('pais').value="Brasil";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);

        } 
        else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
    else {
        limpa_formulário_cep();
    }
};

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('logradouro').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('estado').value = conteudo.uf;
        document.getElementById('pais').value = "Brasil";
    } else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formMatricula");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Matrícula realizada com sucesso!");

        form.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('matriculaModalCenter'));
        modal.hide();
    });
});