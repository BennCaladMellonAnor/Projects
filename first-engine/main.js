//Variaveis do jogo
var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3, velocidade = 6, estadoAtual, record,
estados={
	jogar: 0,
	jogando: 1,
	perdeu: 2
},
chao = {
	y: 550,
	altura: 50,
	cor: '#ffdf70',
	desenha(){
		ctx.fillStyle = this.cor
		ctx.fillRect(0, this.y, LARGURA, this.altura)
	}	 
},
bloco = {
	x: 50,
	y: 0,
	altura: 50,
	largura: 50,
	cor: '#ff4e4e',
	gravidade: 1.6,
	velocidade: 0,
	forcaDoPulo: 23.6,
	qntPulos: 0,
	score: 0,
	atualiza(){
		this.velocidade += this.gravidade
		this.y += this.velocidade

		//Trava o bloco no chão
		//Verificador
		if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu ){
			this.y = chao.y - this.altura
			this.qntPulos = 0
			this.velocidade = 0
		}
	},
	pula(){
		if(this.qntPulos < maxPulos){
			this.velocidade = -this.forcaDoPulo
			this.qntPulos++
		}
	},
	desenha(){
		ctx.fillStyle = this.cor
		ctx.fillRect(this.x, this.y, this.largura, this.altura)
	},
	reset(){
		this.velocidade = 0
		this.y = 0

		if (this.score > record){
			localStorage.setItem('record', this.score)
			record = this.score
		}

		this.score = 0
	},
},

obstaculos = {
	_obs: [],
	cores: ['#ffbc1c',  '#ff1c1c', '#ff85e1', '#52a7ff', '#78ff5d'],
	tempoInsere: 0,
	insere(){
		this._obs.push({
			x: LARGURA,
			// largura: 30 + Math.floor(20 * Math.random()),
			largura: 50,
			altura: 40 + Math.floor(120 * Math.random()),
			cor: this.cores[Math.floor(5 * Math.random())],
		})
		this.tempoInsere = 40 + Math.floor(20 * Math.random())
	},
	atualiza(){
		if (this.tempoInsere == 0){
			this.insere()
		}else{
			this.tempoInsere--
		}
		for (var i = 0, tam = this._obs.length; i < tam; i++){
			var obs = this._obs[i]

			obs.x -= velocidade

			//colisão
			if(bloco.x < obs.x + obs.largura && bloco.x + bloco.largura >= obs.x && bloco.y + bloco.altura >= chao.y - obs.altura){
				estadoAtual = estados.perdeu
			}else if(obs.x == 0){
				bloco.score++
			}else if (obs.x <= -obs.largura){
				this._obs.splice(i, 1)
				tam--
				i--
			}
		}
	},
	limpa(){
		this._obs = []
	},
	desenha(){
		for (var i = 0, tam = this._obs.length; i < tam; i++){
			var obs = this._obs[i]
			ctx.fillStyle = obs.cor
			ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura)

		}
	}
};

function main(){
	LARGURA = window.innerWidth
	ALTURA = window.innerHeight
	console.log(LARGURA, ALTURA)

	//Definindo valor maximo para a janela do jogo
	if (LARGURA >= 500){
		LARGURA = 600
		ALTURA = 600
	}
	//
	//Criando a tag canvas no HTML
	canvas = document.createElement('canvas')
	canvas.width = LARGURA //Atribuindo a largura
	canvas.height = ALTURA //Atribuindo a altura
	canvas.style.border = '1px solid #000'

	//Contexto 2D
	ctx = canvas.getContext('2d')

	//Adicionando canvas ao Body
	document.body.appendChild(canvas)
	document.addEventListener('mousedown', clique)

	//Chama o looping do jogo
	estadoAtual = estados.jogar

	record = localStorage.getItem('record')

	if (record == null){
		record = 0
	}

	roda()
}
function clique(event){
	if (estadoAtual == estados.jogando){
		bloco.pula()
	}else if(estadoAtual == estados.jogar){
		estadoAtual = estados.jogando
	}else if(estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA){
		estadoAtual = estados.jogar
		obstaculos.limpa()
		bloco.reset()
	}

}
function roda(){ //loop do jogo
	atualiza()
	desenha()

	window.requestAnimationFrame(roda)
}
function atualiza(){
	frames++
	bloco.atualiza()

	if (estadoAtual == estados.jogando){
		obstaculos.atualiza()	
	}

}
function desenha(){
	ctx.fillStyle = '#80daff'
	ctx.fillRect(0, 0, LARGURA, ALTURA)

	ctx.fillStyle = 'white'
	ctx.font = '50px Arial'
	ctx.fillText(bloco.score, 30, 68)

	if(estadoAtual == estados.jogar){
		ctx.fillStyle = 'green'
		ctx.fillRect(LARGURA/2 -50, ALTURA/2 - 50, 100, 100)
	}else if(estadoAtual == estados.perdeu){
		ctx.fillStyle = 'red'
		ctx.fillRect(LARGURA/2 -50, ALTURA/2 - 50, 100, 100)

		ctx.save()
		ctx.translate(LARGURA/2, ALTURA/2)
		ctx.fillStyle = 'white'

		if (bloco.score > record){
			ctx.fillText('Novo Record!', -150, -65)
		}else if (record < 10){
			ctx.fillText('Record ' + record, -99, -65)
		}else if (record >= 10 && record < 100){
			ctx.fillText('Record ' + record, -112, -65)
		}else{
			ctx.fillText('Record ' + record, -125, -65)
		}
		//Filtro do digito do score na tela*
		if (bloco.score < 10){
			ctx.fillText(bloco.score, -13, 19)
		}else if (bloco.score >= 10 && bloco.score < 100){
			ctx.fillText(bloco.score, -26,19)
		}else {
			ctx.fillText(bloco.score, -39, 19)
		}

		ctx.restore()

	}else if (estadoAtual = estados.jogando){
		obstaculos.desenha()
	}

	chao.desenha()
	bloco.desenha()
}
//Inicializa do Jogo
main()