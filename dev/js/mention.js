// 테스트중 테스트중 임시 임시
class MiniEditor extends HTMLElement {
	constructor(){
		super();
		this._value = '';
	}

	connectedCallback(){
		var shadow = this.attachShadow({ mode:'open'});
		var wrapper = document.createElement('div');
		var placeholder = document.createElement('div');
		var outp = document.createElement('div');
		var inp = document.createElement('div');
		wrapper.setAttribute('class', 'editor-body');
		var style = document.createElement('style');
		style.textContent = `
		div.editor-body {
			width:100%;
			height:100%;
			overflow-y:auto;
			overflow-x:none;
			min-height:5em;
			border-top:solid 1px #eee;
			border-bottom:solid 1px #eee;
			position:relative;
			box-sizing:border-box;
		}
		div.editor-body>div {
			box-sizing:border-box;
			padding:10px;
		}
		div.outp, div.placeholder{
			pointer-events:none;
		}
		div.outp>span.mention{
			background:#69c;
			color:white;
			border-radius:.5em;
			padding:0 .2em;
			margin:0 -.2em;
		}
		div.placeholder {
			color:#999;
		}
		.inp {
			z-index:1;
		}
		div.outp {
			z-index:2;
		}
		div.outp, .inp, div.placeholder {
			text-align:left;
			width:100%;
			height:auto;
			min-height:100%;
			position:absolute;
			top:0;
			left:0;
			overflow-y:visible;
		}
		div.outp:focus, .inp:focus, div.placeholder:focus {
			outline:none;
		}
		`;

		placeholder.setAttribute('class', 'placeholder');
		if( this.hasAttribute('placeholder') ){
			placeholder.innerHTML = this.getAttribute('placeholder');
		}else{
			console.log(this.hasAttribute('placeholder'));
			placeholder.innerHTML = '';
		}
		outp.setAttribute('class', 'outp');
		inp.setAttribute('class', 'inp');
		inp.setAttribute('contenteditable', true);
		inp.addEventListener('input', this.update.bind(this), false);
		inp.addEventListener('keydown', this.keydown.bind(this), false);
		shadow.appendChild(wrapper);
		shadow.appendChild(style);
		wrapper.appendChild(placeholder);
		wrapper.appendChild(inp);
		wrapper.appendChild(outp);
		this._children = {
			placeholder, inp, outp
		};
		if(this.hasAttribute('value')){
			this._value = this.getAttribute('value');
			this.checkvalue();
		}
		this.shadow = shadow;
	}
	checkvalue(){
		if( this._value.length > 0 ){
			this._children.placeholder.style.display = 'none';
		}else{
			this._children.placeholder.style.display = 'block';
		}	
		this._children.outp.innerHTML = this._value;
	}
	set value(v){
		this._value = v;
		this.checkvalue();
	}
	get value(){
		return this._value;
	}
	update(e){
		console.log('update 입니다');
		var str = e.target.innerText;
		str = str
			.replace(/\n/g, "&nbsp;&nbsp;&nbsp;")
			.replace(/^(@\S+)/g, "<span class='mention'>$1</span>")
			.replace(/([^\&])(@\S+)/g, "$1<span class='mention'>$2</span>");
		this.value = str;
	}
	keydown(e){
		console.log('keydown 입니다');
			if( e.keyCode == 13 ){
				e.preventDefault();
				return false;
			}
	}
}
customElements.define('mini-editor', MiniEditor);