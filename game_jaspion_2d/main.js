console.log('[Dev.Mellanor] Jaspion 2D')

let frames = 0

reseta_div_game()

function reseta_div_game() {
	const fds = document.querySelector('[content]')
	const tag = document.createElement('div')
	tag.classList.add('game')
	tag.setAttribute('game', '')
	fds.appendChild(tag)
	return
}

let game = document.querySelector('[game]')

const construtora = {
	img(index, css, src){
		const tag = document.createElement(index)
		tag.classList.add(css)
		tag.src = (src)
		game.appendChild(tag)
	},
	node(index, css, text){
		const tag = document.createElement(index)
		tag.classList.add(css)
		const textN = document.createTextNode(text)
		tag.appendChild(textN)
		game.appendChild(tag)
	},
	button(index, css, attribute, content, value) {
		const tag = document.createElement(index)
		tag.classList.add(css)
		tag.setAttribute('type', 'button')
		tag.setAttribute(attribute, content)
		tag.value = value
		game.appendChild(tag)
	}
}

function destruidora(attribute){
	/*let seleciona = document.querySelectorAll(attribute)
	for (let i = seleciona.length -1; i >=0; i--) {
		let item = seleciona[i]
		item.remove()
	}*/	
	/*const seleciona = document.querySelector(attribute).remove()
	reseta_div_game()*/

	const seleciona = document.querySelector(attribute)
	while (seleciona.firstChild) {
		seleciona.removeChild(seleciona.firstChild)
	}

}

const menu = {
	desenha(){
		construtora.img('img', 'menu', 'img/jaspion-capa-.jpg')
		setTimeout(() => {
			menu.grade_menu()
		}, 30)
	},
	grade_menu(){
		construtora.node('div', 'grade-menu', 'O fantastico Jaspion')
		construtora.img('img', 'load-jaspion', 'img/jaspion_1.gif')
		setTimeout(() =>{
			construtora.button('input', 'menu-button', 'onclick', 'menu.click()', 'Play')
		}, 30)
	},
	click(){
		destruidora('[game]')
		setTimeout(() => {
			Telas.jogo()
		}, 3000)
	}
}

const jaspion_char = {
	speed: 30,
	desenha(){
		construtora.img('img', 'jaspion-char', 'img/jaspion_1.gif')
	},
}

const fundo = {
	desenha(){
		construtora.img ('img', 'fundo', 'img/pretty.gif')
	},
}

const Telas ={
	jogo(){
		fundo.desenha()
		jaspion_char.desenha()

		const chao = {
			atualiza(){
				const img = document.getElementsByTagName('img')[1]
				img.setAttribute('id', 'img')

				const imgid = document.getElementById('img').offsetHeight
				const local = img.getBoundingClientRect();
				const movimentoDoChao = 1;
      			const repeteEm = local.top / 2;
      			const movimentacao = local.left - movimentoDoChao;

      			console.log(img.style.left)
      
    		  	local.left = movimentacao % repeteEm;
			}
		}
		chao.atualiza()
	}
}

function loop() {
	menu.desenha()
	Telas.jogo()

	/*frames = frames + 1;
  requestAnimationFrame(loop);*/
}
loop()