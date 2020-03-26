'use strict';

export default class DrawLines {

    constructor() {
	
        this.linez = [1, 0, 0, 0, 0, 0, 0]
        this.kockice
        this.dzoker = 0
		this.vrednostDzokera = 0

        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");

        this.kkk1;
        this.kkk2;
        this.jokerAdded = false;
        this.img = new Image();

        this.width = this.c.offsetWidth;      
        this.c.setAttribute('height', this.c.offsetHeight)
        this.c.setAttribute('width', this.width)

        this.pomocniNiz = [];

        this.r = 'rgba(60, 0, 129, 0.4)';

        this.halfStep = ((this.c.offsetHeight / 3) / 2);
        this.middle = 3 * this.halfStep
        this.down = 5 * this.halfStep

        this.halfStepW = (this.width / 5) / 2;

        this.ctx.lineWidth = 10;
        this.ctx.font = "20px Arial";
        this.ctx.strokeStyle = this.r

        this.text = document.getElementById('igraDzoker')

        this.myVideoEndedHandler = this.myListener.bind(this);
        this.myloader2;
		this.myloader3
		this.myloader4
        this.prvaLin()

        this.lining(document.getElementById('linije').getElementsByTagName('input'));

        this.jokerCheckboxEvent = this.dzokerChekBoxListener.bind(this);

        document.getElementById('joker').addEventListener('click', this.jokerCheckboxEvent)
    }

    dzokerChekBoxListener() {

        if (document.getElementById('joker').checked == true) {

            this.brojacKockica()
            document.getElementById('igraBrojLinija').textContent = this.brojacLinija()
            this.crtacKockica()
            document.getElementById('linije').style.display = 'none'

        } else {

            this.dzoker = 0
            this.mojBrisac()
            this.ocistiCanvas()
            this.lineCheck()

            document.getElementById('linije').style.display = 'block'

            if (document.getElementById('snimiDzokera')) {

                snimiDzokera.remove()

            }
        }

    }

	obrisiLiningEvents(x){
		
		for (let i = 0; i < x.length; i++) {
            x[i].onclick = null
			x[i].disabled = true
						
        }
		
		console.log(x[0].disabled)
		x[0].disabled = true
		x[1].disabled = true
		
	}
	
    lining(x) {
		let counter = 0;
		let pointer = 0;
		
        for (let i = 0; i < x.length; i++) {
            x[i].onclick = () => {
                this.lineCheckHelperFull(x[i])
            }
			if(x[i].checked){
				counter++
				pointer=i
			}
			
			
        }

		for (let i = 0; i < x.length; i++) {
		if(counter>1){

				x[i].disabled = false
			}else{
				if(i == pointer){

					x[i].disabled = true
				}else{

					x[i].disabled = false
				}
				
			}
		}
    }

    dzokerList() {

     
            return this.dzoker;
        
    }

    cekerZaLinijskeDzokere(x) {
        let mapaDzokera = [
            [2, 6],
            [2, 5],
            [2, 7],
            [2, 4],
            [2, 6],
            [1, 4, 5],
            [1, 6, 7],
            [1, 4, 5],
            [1, 6, 7],
            [1, 4, 5],
            [3, 7],
            [3, 4],
            [3, 6],
            [3, 5],
            [3, 7]
        ]
        for (let i = 0; i < mapaDzokera[this.dzoker - 1].length; i++) {
            if (mapaDzokera[this.dzoker - 1][i] === x) {
                this.pomocniNiz[i] = x
            }
        }

    }
	lineCheckHelperFull(x) {
		
		

	
		switch (parseInt(x.name)) {
		  case 0:
			this.lineCheckHelperFullHelper(x)
			break;
		  case 1:
			this.lineCheckHelperFullHelper(x)
			break;
		  case 2:
			this.lineCheckHelperFullHelper(x)
			break;
		  case 3:
			this.lineCheckHelperFullHelper(x)
			break;
		  case 4:
			this.lineCheckHelperFullHelper(x)
			break;
		  case 5:
			this.lineCheckHelperFullHelper(x)
			break;
		  case  6:
			this.lineCheckHelperFullHelper(x)
			break;
		}
		
		if (this.jokerAdded) {

            for (let i = 0; i < this.pomocniNiz.length; i++) {

                if (this.linez[this.pomocniNiz[i] - 1] === 0) {
                    this.pomocniNiz[i] = 0
                }

            }

            if (this.pomocniNiz.reduce((a, b) => a + b) === 0) {
                this.obrisiDzokera();
            } else {
                this.dodajDzokera(this.kkk1, this.kkk2)
            }

        }

        this.brojacLinija()	
		
	}
	
	lineCheckHelperFullHelper(x){
		console.log(x)
		console.log(x.name)
		console.log(x.value)
		if (x.value == 1) {

                this.linez[x.name] = 0;
                x.value = 0;
				x.parentElement.style.background = 'white'
				
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[x.name] = 1;
                x.value = 1;
				x.parentElement.style.background = 'lightgreen'
				
                this.lineCheckHelperFullHelperChecker(parseInt(x.name))

                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(parseInt(x.name)+1)

                }
        }
	}
	
	lineCheckHelperFullHelperChecker(x){
		switch (x) {
		  case 0:
				this.prvaLin()
			break;
		  case 1:
				this.drugaLin()
			break;
		  case 2:
				this.trecaLin()
			break;
		  case 3:
				this.cetvrtaLin()
			break;
		  case 4:
                this.petaLin()
			break;
		  case 5:
				this.sestaLin()
			break;
		  case  6:
				this.sedmaLin()
			break;
		}
	}
	
	
   

        

    

    brojacLinija(xxx = 0) {

        let y = 0;

        this.linez.map(items => (items === 1) ? y++ : 0);

        if (y === 1) {

            document.getElementById('linije').querySelector('input:checked').disabled = true
            document.getElementById('igraBrojLinija').textContent = 1
            document.getElementById('ukupanulog').textContent = 1 * document.getElementById('igraUlog').textContent + document.getElementById('igraDzoker').textContent.match(/\d+/g).map(Number)[0]
        } else {
            if (document.getElementById('nag2').checked === false) {
                document.getElementById('igraBrojLinija').textContent = y
                document.getElementById('ukupanulog').textContent = y * document.getElementById('igraUlog').textContent + document.getElementById('igraDzoker').textContent.match(/\d+/g).map(Number)[0]
            }
			if (xxx === 0) {
				if (document.getElementById('linije').querySelector('input:disabled')) {
					
					document.getElementById('linije').querySelector('input:disabled').disabled = false
				}
            }

        }

        if (xxx === 0) {
            return y
        } else {
            return this.linez
        }

    }

    brojacKockica() {

        this.kockice = new Array(15).fill(0);
        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                if (linija1.checked) {
                    for (let i = 5; i < 10; i++) {
                        this.kockice[i] = 1
                    }
                }
            } else if (i === 1) {
                if (linija2.checked) {
                    for (let i = 0; i < 5; i++) {
                        this.kockice[i] = 1
                    }
                }
            } else if (i === 2) {
                if (linija3.checked) {
                    for (let i = 10; i < 15; i++) {
                        this.kockice[i] = 1
                    }
                }
            } else if (i === 3) {
                if (linija4.checked) {
                    this.kockice[5] = 1
                    this.kockice[11] = 1
                    this.kockice[7] = 1
                    this.kockice[3] = 1
                    this.kockice[9] = 1

                }
            } else if (i === 4) {
                if (linija5.checked) {

                    this.kockice[5] = 1
                    this.kockice[1] = 1
                    this.kockice[7] = 1
                    this.kockice[13] = 1
                    this.kockice[9] = 1
                }
            } else if (i === 5) {
                if (linija6.checked) {

                    this.kockice[0] = 1
                    this.kockice[6] = 1
                    this.kockice[12] = 1
                    this.kockice[8] = 1
                    this.kockice[4] = 1
                }
            } else if (i === 6) {
                if (linija7.checked) {

                    this.kockice[10] = 1
                    this.kockice[6] = 1
                    this.kockice[2] = 1
                    this.kockice[8] = 1
                    this.kockice[14] = 1
                }
            }
        }
    }

    crtacKockica() {
        this.ocistiCanvas();
        this.ctx.strokeStyle = '#3c0081';
        this.ctx.shadowColor = "black";
        this.ctx.shadowBlur = 18;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        for (let i = 0; i < 15; i++) {
            if (i > -1 && i < 5) {
                if (this.kockice[i] === 1) {

                    this.ctx.beginPath();

                    this.ctx.rect(0 + (this.halfStepW * 2 * i), 0, this.halfStepW * 2, (this.halfStep * 2));
                    this.ctx.stroke();
                }

            } else if (i > 4 && i < 10) {
                if (this.kockice[i] === 1) {
                    this.ctx.beginPath();

                    this.ctx.rect(0 + (this.halfStepW * 2 * (i - 5)), this.halfStep * 2, this.halfStepW * 2, this.halfStep * 2);
                    this.ctx.stroke();
                }
            } else {
                if (this.kockice[i] === 1) {
                    this.ctx.beginPath();

                    this.ctx.rect(0 + (this.halfStepW * 2 * (i - 10)), this.halfStep * 4, this.halfStepW * 2, this.halfStep * 2);
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.shadowBlur = 0;
        this.crtacDzokera()
        this.ctx.strokeStyle = this.r

    }

    crtacDzokera() {

        this.c.addEventListener('click', this.myVideoEndedHandler);

    }

    mojBrisac() {

        this.c.removeEventListener('click', this.myVideoEndedHandler);

    }

    myListener(e) {

        const rect = this.c.getBoundingClientRect();

        const mousePos = {
            x: e.clientX - Math.floor(rect.left),
            y: e.clientY - Math.floor(rect.top)
        };


        let komer3 = mousePos.y / (2 * this.halfStep)

        let komer4 = mousePos.x / (this.halfStepW * 2)
		
		this.myListenerCaseHelper(komer3,komer4);
	

    }
	
	myListenerCaseHelper(x,y){
		console.log(x,y)	
		let help;
		if(x > 0 && x < 1){
			help = 0
		}
		else if(x > 1 && x < 2){
			help = 1
		}
		else if(x > 2 && x < 3){
			help = 2
		}
		
		
		switch (help) {
			  case 0:

					this.myListenerCaseHelper2(y,0)
				break;
			  case 1:

					this.myListenerCaseHelper2(y,5)
				break;
			  case 2:

					this.myListenerCaseHelper2(y,10)
				break;
			}
					

	}
	
	myListenerCaseHelper2(x,y){
		let help;
		
		if(x > 0 && x < 1){
			help = 0
		}
		else if(x > 1 && x < 2){
			help = 1
		}
		else if(x > 2 && x < 3){
			help = 2
		}
		else if(x > 3 && x < 4){
			help = 3
		}
		else if(x > 4 && x < 5){
			help = 4
		}
		
		switch (help) {
			  case 0:
				help = help + y;
					this.myListenerCaseHelper3(help)
				break;
			  case 1:
				help = help + y;
					this.myListenerCaseHelper3(help)
				break;
			  case 2:
				help = help + y;
					this.myListenerCaseHelper3(help)
				break;
		      case 3:
				help = help + y;
					this.myListenerCaseHelper3(help)
				break;
			  case 4:
				help = help + y;
					this.myListenerCaseHelper3(help)
				break; 	
			}
		
		console.log(help)
		
	}
	
	myListenerCaseHelper3(x){
		console.log(x)
		let niz = [
		[0,0,1,(this.linez[1] > 0) ? 2 : 0, (this.linez[5] > 0) ? 6 : 0],
		[2 * this.halfStepW, 0, 2, (this.linez[1] > 0) ? 2 : 0, (this.linez[4] > 0) ? 5 : 0],
		[4 * this.halfStepW, 0, 3, (this.linez[1] > 0) ? 2 : 0, (this.linez[6] > 0) ? 7 : 0],
		[6 * this.halfStepW, 0, 4, (this.linez[1] > 0) ? 2 : 0, (this.linez[3] > 0) ? 4 : 0],
		[8 * this.halfStepW, 0, 5, (this.linez[1] > 0) ? 2 : 0, (this.linez[5] > 0) ? 6 : 0],
		[0, 2 * this.halfStep, 6, (this.linez[0] > 0) ? 1 : 0, (this.linez[3] > 0) ? 4 : 0, (this.linez[4] > 0) ? 5 : 0],
		[2 * this.halfStepW, 2 * this.halfStep, 7, (this.linez[0] > 0) ? 1 : 0, (this.linez[5] > 0) ? 6 : 0, (this.linez[6] > 0) ? 7 : 0],
		[4 * this.halfStepW, 2 * this.halfStep, 8, (this.linez[0] > 0) ? 1 : 0, (this.linez[3] > 0) ? 4 : 0, (this.linez[4] > 0) ? 5 : 0],
		[6 * this.halfStepW, 2 * this.halfStep, 9, (this.linez[0] > 0) ? 1 : 0, (this.linez[5] > 0) ? 6 : 0, (this.linez[6] > 0) ? 7 : 0],
		[8 * this.halfStepW, 2 * this.halfStep, 10, (this.linez[0] > 0) ? 1 : 0, (this.linez[3] > 0) ? 4 : 0, (this.linez[4] > 0) ? 5 : 0],
		[0, 4 * this.halfStep, 11, (this.linez[2] > 0) ? 3 : 0, (this.linez[6] > 0) ? 7 : 0],
		[2 * this.halfStepW, 4 * this.halfStep, 12, (this.linez[2] > 0) ? 3 : 0, (this.linez[3] > 0) ? 4 : 0],
		[4 * this.halfStepW, 4 * this.halfStep, 13, (this.linez[2] > 0) ? 3 : 0, (this.linez[5] > 0) ? 6 : 0],
		[6 * this.halfStepW, 4 * this.halfStep, 14, (this.linez[2] > 0) ? 3 : 0, (this.linez[4] > 0) ? 5 : 0],
		[8 * this.halfStepW, 4 * this.halfStep, 15, (this.linez[2] > 0) ? 3 : 0, (this.linez[6] > 0) ? 7 : 0 ],
	    ]
		
		


		
		
	
		
		if (this.kockice[x] === 1) {

                    if (this.dzoker !== (x+1)) {

                       this.ocistiCanvas()
                        this.crtacKockica()
                        this.pomocniNiz=[]
						for(let i=2; i<niz[x].length;i++){
							if(i === 2){
								this.dodajDzokera(niz[x][0], niz[x][1], niz[x][2])
							}else{
								this.pomocniNiz.push(niz[x][i]);
							}
							
						}
						
						
                    }
                }
	}
	
	
    dodajDzokera(x, y, z) {

        this.img.src = "data:image/png;base64,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"
        this.myloader2 = this.myOnloadPic.bind(this, x, y, z);

        this.img.addEventListener('load', this.myloader2);

    }

    obrisiDzokera() {

        this.text.textContent = " NE (0 $)";
        document.getElementById('ukupanulog').textContent = document.getElementById('igraBrojLinija').textContent * document.getElementById('igraUlog').textContent
       
        this.ocistiCanvas()
        this.lineCheck()
        this.dzoker = 0
		this.vrednostDzokera = 0
        izbrisiDzokera.remove()
        document.getElementById('joker').checked = false
        document.getElementById('joker').disabled = false

        this.jokerAdded = false

    }

    myOnloadPic(x, y, z) {
		
        this.kkk1 = x;
        this.kkk2 = y;
        let ke;
        let w = this.img.width;
        let h = this.img.height;

        let sizer = Math.min((2 * this.halfStepW / w), (2 * this.halfStep / h));

        if (this.halfStepW > this.halfStep) {
            ke = x + ((2 * this.halfStepW - this.img.width) / 2)
            this.ctx.drawImage(this.img, ke, y, w * sizer, h * sizer);
        } else {
            ke = y + ((2 * this.halfStep - this.img.width) / 2)
            this.ctx.drawImage(this.img, x, ke, w * sizer, h * sizer);
        }

        if (document.getElementById('snimiDzokera')) {

        } else {
            if (document.getElementById('izbrisiDzokera')) {

            } else {
                if (document.getElementById('joker').checked) {
                    let dugme = document.createElement('button')
                    dugme.textContent = 'Snimi Dzokera'
                    dugme.id = 'snimiDzokera'
                    dugme.className = 'snimidzokeraklasa'
                    jokerCont.appendChild(dugme);
					
					this.myloader3 = this.snimiDzokera.bind(this, z);
					
                    document.getElementById('snimiDzokera').addEventListener('click', this.myloader3);
                }
            }
        }

    }
		

    snimiDzokera(x) {
		this.dzoker = x
		this.vrednostDzokera = document.querySelector('input[name="bet"]:checked').value * 5
        this.text.textContent = " DA (" + (document.querySelector('input[name="bet"]:checked').value) * 5 + " $)";
        let xx = (document.querySelector('input[name="bet"]:checked').value) * 5
        document.getElementById('ukupanulog').textContent = document.getElementById('igraBrojLinija').textContent * document.querySelector('input[name="bet"]:checked').value + xx
        this.ocistiCanvas()
        this.lineCheck()
        this.dodajDzokera(this.kkk1, this.kkk2)

        document.getElementsByClassName('snimidzokeraklasa')[0].style.display = 'none'
        this.mojBrisac()
        this.jokerAdded = true

        let dugme = document.createElement('button')
        dugme.textContent = 'Izbrisi dzokera'
        dugme.id = 'izbrisiDzokera'

        jokerCont.appendChild(dugme);
        document.getElementById("joker").disabled = true
        document.getElementById('linije').style.display = 'block'

        setTimeout(() => {
            snimiDzokera.remove()
        }, 0)
		
		this.myloader4 = this.obrisiDzokera.bind(this);
		
        document.getElementById('izbrisiDzokera').addEventListener('click', this.myloader4);

    }

    lineCheck() {

        for (let i = 0; i < 7; i++) {
            if (i === 0) {
                if (this.linez[0] === 1) {
                    this.prvaLin()
                }
            } else if (i === 1) {
                if (this.linez[1] === 1) {
                    this.drugaLin()
                }
            } else if (i === 2) {
                if (this.linez[2] === 1) {
                    this.trecaLin()
                }
            } else if (i === 3) {
                if (this.linez[3] === 1) {
                    this.cetvrtaLin()
                }
            } else if (i === 4) {
                if (this.linez[4] === 1) {
                    this.petaLin()
                }
            } else if (i === 5) {
                if (this.linez[5] === 1) {
                    this.sestaLin()
                }
            } else if (i === 6) {
                if (this.linez[6] === 1) {
                    this.sedmaLin()
                }
            }
        }

    }

    nacrtajBrojRav(x, y) {

        for (let i = 2; i < 9; i += 2) {

            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(i * this.halfStepW - 1, y, 10, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
            this.ctx.stroke()

            this.ctx.fillStyle = 'black';

            this.ctx.fillText(x, i * this.halfStepW - 7, y + 7);
        }

    }
    nacrtajBroj(x, y, z) {

        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(y, z, 10, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.stroke()

        this.ctx.fillStyle = 'black';

        this.ctx.fillText(x, y - 6, z + 7);

    }
    prvaLin() {

        this.ctx.strokeStyle = this.r
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.middle);
        this.ctx.lineTo(this.width, this.middle);
        this.ctx.stroke();

        this.nacrtajBrojRav(1, this.middle);

        this.ctx.lineWidth = 10;
    }

    drugaLin() {
        this.ctx.strokeStyle = this.r
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.halfStep);
        this.ctx.lineTo(this.width, this.halfStep);
        this.ctx.stroke();

        this.nacrtajBrojRav(2, this.halfStep);

        this.ctx.lineWidth = 10;

    }

    trecaLin() {

        this.ctx.strokeStyle = this.r
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.down);
        this.ctx.lineTo(this.width, this.down);
        this.ctx.stroke();

        this.nacrtajBrojRav(3, this.down);

        this.ctx.lineWidth = 10;

    }

    cetvrtaLin() {

        this.ctx.strokeStyle = this.r
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.middle);
        this.ctx.lineTo(this.halfStepW, this.middle);
        this.ctx.lineTo(3 * this.halfStepW, this.down);
        this.ctx.lineTo(7 * this.halfStepW, this.halfStep);
        this.ctx.lineTo(9 * this.halfStepW, this.middle);
        this.ctx.lineTo(this.width, this.middle);
        this.ctx.stroke();

        this.nacrtajBroj(4, 2 * this.halfStepW, this.middle + this.halfStep)

        this.nacrtajBroj(4, 4 * this.halfStepW, this.middle + this.halfStep)

        this.nacrtajBroj(4, 6 * this.halfStepW, this.middle - this.halfStep)

        this.nacrtajBroj(4, 8 * this.halfStepW, this.middle - this.halfStep)

        this.ctx.lineWidth = 10;

    }

    petaLin() {
        this.ctx.strokeStyle = this.r
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.middle);
        this.ctx.lineTo(this.halfStepW, this.middle);
        this.ctx.lineTo(3 * this.halfStepW, this.halfStep);
        this.ctx.lineTo(7 * this.halfStepW, this.down);
        this.ctx.lineTo(9 * this.halfStepW, this.middle);
        this.ctx.lineTo(this.width, this.middle);
        this.ctx.stroke();

        this.nacrtajBroj(5, 2 * this.halfStepW, this.middle - this.halfStep)

        this.nacrtajBroj(5, 4 * this.halfStepW, this.middle - this.halfStep)

        this.nacrtajBroj(5, 6 * this.halfStepW, this.middle + this.halfStep)

        this.nacrtajBroj(5, 8 * this.halfStepW, this.middle + this.halfStep)

        this.ctx.lineWidth = 10;

    }

    sestaLin() {
        this.ctx.strokeStyle = this.r
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.halfStep);
        this.ctx.lineTo(this.halfStepW, this.halfStep);
        this.ctx.lineTo(5 * this.halfStepW, this.down);
        this.ctx.lineTo(9 * this.halfStepW, this.halfStep);
        this.ctx.lineTo(this.width, this.halfStep);
        this.ctx.stroke();

        this.nacrtajBroj(6, this.halfStepW, this.halfStep)

        this.nacrtajBroj(6, 3 * this.halfStepW, this.middle)

        this.nacrtajBroj(6, 5 * this.halfStepW, this.down)

        this.nacrtajBroj(6, 7 * this.halfStepW, this.middle)

        this.nacrtajBroj(6, 9 * this.halfStepW, this.halfStep)

        this.ctx.lineWidth = 10;

    }

    sedmaLin() {
        this.ctx.strokeStyle = this.r
        this.ctx.lineWidth = 10;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.down);
        this.ctx.lineTo(this.halfStepW, this.down);
        this.ctx.lineTo(5 * this.halfStepW, this.halfStep);
        this.ctx.lineTo(9 * this.halfStepW, this.down);
        this.ctx.lineTo(this.width, this.down);
        this.ctx.stroke();

        this.nacrtajBroj(7, this.halfStepW, this.down)

        this.nacrtajBroj(7, 3 * this.halfStepW, this.middle)

        this.nacrtajBroj(7, 5 * this.halfStepW, this.halfStep)

        this.nacrtajBroj(7, 7 * this.halfStepW, this.middle)

        this.nacrtajBroj(7, 9 * this.halfStepW, this.down)

        this.ctx.lineWidth = 10;

    }

    ocistiCanvas() {

        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        this.img = new Image();
    }

}
