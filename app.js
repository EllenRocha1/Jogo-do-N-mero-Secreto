// Variáveis globais
let listaDeSorteados = [];  // Array para armazenar números já sorteados
let tentativas = 1;  
let numeroAleatorio;  
let botaoSet = document.querySelector('.container__botaoSet');  // Seleciona o botão principal do jogo

// Sons 
const sons = {
    acerto: new Audio("Sons/winner-bell-game-show-91932.mp3"), 
    erro: new Audio("Sons/error-126627.mp3"),  
    newGame: new Audio("Sons/collect-points-190037.mp3"), 
    perdeu: new Audio('Sons/videogame-death-sound-43894.mp3')
};

// Função para criar um número aleatório dentro de um intervalo definido pelo usuário
function criarNumeroAleatorio(min, max) {
    console.log(min, max);
    let numeroGerado = Math.floor(Math.random() * (max - min + 1) + min); 
    console.log(numeroGerado);
    if (listaDeSorteados.includes(numeroGerado)) {  // Verifica se o número já foi sorteado
        return criarNumeroAleatorio(min, max);  // Chama recursivamente até gerar um número único
    } else {
        listaDeSorteados.push(numeroGerado);  // Adiciona o número gerado à lista de sorteados
        numeroAleatorio = numeroGerado; 
        return numeroGerado;  
    }
}

// Função para exibir texto no HTML
function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);  
    campo.innerHTML = texto;  
}

// Função para exibir texto inicial quando o jogo começa
function exibirTextoInicial() {
    exibirTexto('h1', 'Jogo do <span class="container__texto-azul">número secreto</span>');  // Título do jogo
    exibirTexto('p', 'Escolha um número entre <input type="number" id="minNumber" placeholder="Número Mínimo"> e <input type="number" id="maxNumber" placeholder="Número Máximo">');  // Instruções para o jogador
}

// Função para limpar o campo de chute
function limparCampo() {
    document.getElementById('chute').value = '';  
}

// Função para iniciar um novo jogo
function novoJogo() {
    botaoSet.style.display = 'block'; // volta a mostrar o botão set do jogo
    sons.newGame.play();  
    exibirTextoInicial();  
    limparCampo();
    document.getElementById('reiniciar').disabled = true;
    document.getElementById('Chutar').disabled = true;
    tentativas = 1;  // Reinicia o contador de tentativas
    numeroAleatorio = criarNumeroAleatorio();  // Gera um novo número aleatório para o jogo
    
    if (numeroAleatorio === null) {
        exibirTexto('p', 'Por favor, insira valores válidos e tente novamente.');  
        return;
    }
}

// Função para verificar o chute do jogador
function verificarChute() {
    botaoSet.style.display = 'none';  // Esconde o botão set do jogo
    let chute = parseInt(document.getElementById('chute').value);  // Obtém o valor do chute do jogador e converte para inteiro

    if (tentativas <= 3) {  // Verifica se ainda há tentativas disponíveis
       if (chute === numeroAleatorio) {  
            sons.acerto.play();  
            let mensagemTentativas = tentativas === 1 ? 'tentativa' : 'tentativas';  
            exibirTexto('h1', 'Você ganhou!');  
            exibirTexto('p', `Parabéns! Você acertou em ${tentativas} ${mensagemTentativas}`);  
            document.getElementById('reiniciar').removeAttribute('disabled');  // Habilita o botão de reiniciar jogo
            botaoSet.style.backgroundColor = "#d32b2b";  // Muda a cor de fundo do botão set
        } else if (chute < numeroAleatorio) {
            if (tentativas < 3){
                sons.erro.play(); 
            }
            exibirTexto('p', 'O número é maior, tente novamente!');  
        } else if (chute > numeroAleatorio) {
            if (tentativas < 3){
                sons.erro.play(); 
            } 
            exibirTexto('p', 'O número é menor, tente novamente!');  
        }
        tentativas += 1;  // Incrementa o número de tentativas
        limparCampo();  
    }

    if (tentativas > 3) {  
        exibirTexto('h1', 'Você perdeu!');  
        exibirTexto('p', `O número secreto era ${numeroAleatorio}. Clique em novo jogo.`);  // Informa qual era o número secreto
        sons.perdeu.play();
        document.getElementById('reiniciar').removeAttribute('disabled');  // Habilita o botão de reiniciar jogo
        botaoSet.style.backgroundColor = "#d32b2b";  // Muda a cor de fundo do botão set
    }
}

exibirTextoInicial();  

// Função para iniciar o jogo com base nos valores mínimo e máximo escolhidos
function iniciarJogo() {   
    let min = parseInt(document.getElementById('minNumber').value);  
    let max = parseInt(document.getElementById('maxNumber').value);  

    if (isNaN(min) || isNaN(max)) {  // Verifica se os valores de entrada são válidos
        botaoSet.style.backgroundColor = "#d32b2b";  // Muda a cor de fundo do botão set para vermelho 
        exibirTexto('p', 'Por favor, insira valores válidos nos campo de número mínimo e máximo.');  
        return;
    }
    botaoSet.style.backgroundColor = "#1875E8";  // Define a cor de fundo padrão do botão set para azul
    criarNumeroAleatorio(min, max);  
    document.getElementById('Chutar').removeAttribute('disabled');  // Habilita o botão Chutar
}

