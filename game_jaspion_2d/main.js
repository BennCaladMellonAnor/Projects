console.log('[Dev.Mellanor] Jaspion 2D')

reseta_div_game()

function reseta_div_game() {
	const fds = document.querySelector('[content]')
	const tag = document.createElement('div')
	tag.classList.add('game')
	tag.setAttribute('game', '')
	fds.appendChild(tag)
}

const game = document.querySelector('[game]')

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
}

const menu = {
	desenha(){
		construtora.img('img', 'menu', 'img/jaspion-capa-.jpg')
		setTimeout(() => {
			menu.grade_menu()
		}, 3000)
	},
	grade_menu(){
		construtora.node('div', 'grade-menu', 'O fantastico Jaspion')
		construtora.img('img', 'load-jaspion', 'img/jaspion_1.gif')
		setTimeout(() =>{
			construtora.button('input', 'menu-button', 'onclick', 'menu.click()', 'Play')
		}, 3000)
	},
	click(){
		console.log('here call "destruidora"')
	}
}


menu.desenha()