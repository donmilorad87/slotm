'use strict';

export default class DrawLines {

    constructor() {

        this.linez = [1, 0, 0, 0, 0, 0, 0]
        this.kockice
        this.dzoker = 0
        this.jokerVrednost = 0

        this.c = document.getElementById("myCanvas");
        this.ctx = this.c.getContext("2d");

        this.kkk1;
        this.kkk2;
        this.jokerAdded = false;
        this.img = new Image();

        this.width = this.c.offsetWidth;
        this.height = this.c.offsetHeight;
        this.c.setAttribute('height', this.height)
        this.c.setAttribute('width', this.width)

        this.pomocniNiz = [];

        this.r = 'rgba(60, 0, 129, 0.4)';

        this.halfStep = ((this.height / 3) / 2);
        this.halfStep2 = (this.height / 3) / 4;
        this.middle0 = 2 * this.halfStep
        this.middle = 3 * this.halfStep
        this.down = 5 * this.halfStep

        this.halfStepW = (this.width / 5) / 2;

        this.ctx.lineWidth = 10;
        this.ctx.font = "20px Arial";
        this.ctx.strokeStyle = this.r

        this.text = document.getElementById('igraDzoker')

        this.myVideoEndedHandler = this.myListener.bind(this);
        this.myloader2;

        this.lineCheck()

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

    lining(x) {

        for (let i = 0; i < x.length; i++) {
            x[i].onclick = () => {
                this.lineCheckHelperFull(x[i])
            }
        }
    }

    dzokerList(x = 0) {

        if (x) {
            return this.jokerVrednost;
        } else {
            return this.dzoker;
        }
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

        if (x.name == 0) {
            if (x.value == 1) {

                this.linez[0] = 0;
                x.value = 0;
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[0] = 1;
                x.value = 1;
                this.prvaLin()

                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(1)

                }

            }
        } else if (x.name == 1) {

            if (x.value == 1) {

                this.linez[1] = 0;
                x.value = 0;
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[1] = 1;
                x.value = 1;
                this.drugaLin()

                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(2)

                }

            }
        } else if (x.name == 2) {

            if (x.value == 1) {

                this.linez[2] = 0;
                x.value = 0;
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[2] = 1;
                x.value = 1;
                this.trecaLin()

                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(3)

                }

            }
        } else if (x.name == 3) {

            if (x.value == 1) {

                this.linez[3] = 0;
                x.value = 0;
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[3] = 1;
                x.value = 1;
                this.cetvrtaLin()

                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(4)
                }

            }
        } else if (x.name == 4) {

            if (x.value == 1) {

                this.linez[4] = 0;
                x.value = 0;
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[4] = 1;
                x.value = 1;
                this.petaLin()

                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(5)
                }

            }
        } else if (x.name == 5) {

            if (x.value == 1) {

                this.linez[5] = 0;
                x.value = 0;
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[5] = 1;
                x.value = 1;
                this.sestaLin()

                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(6)

                }

            }
        } else if (x.name == 6) {

            if (x.value == 1) {

                this.linez[6] = 0;
                x.value = 0;
                this.ocistiCanvas()
                this.lineCheck()

            } else {

                this.linez[6] = 1;
                x.value = 1;
                this.sedmaLin()
                if (this.jokerAdded) {

                    this.cekerZaLinijskeDzokere(7)
                }
            }
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

            if (document.getElementById('linije').querySelector('input:disabled')) {
                document.getElementById('linije').querySelector('input:disabled').disabled = false
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

        const rect = this.c.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const mousePos = {
            x: e.clientX - Math.floor(rect.left + scrollLeft),
            y: e.clientY - Math.floor(rect.top + scrollTop)
        };

        let komer3 = mousePos.y / this.middle0

        let komer4 = mousePos.x / (this.halfStepW * 2)

        if (komer3 > 0 && komer3 < 1) {

            if (komer4 > 0 && komer4 < 1) {

                if (this.kockice[0] === 1) {

                    if (this.dzoker === 1) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(0, 0)
                        this.pomocniNiz = [(this.linez[1] > 0) ? 2 : 0, (this.linez[5] > 0) ? 6 : 0]
                        this.dzoker = 1

                    }

                }

            } else if (komer4 > 1 && komer4 < 2) {

                if (this.kockice[1] === 1) {

                    if (this.dzoker === 2) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(2 * this.halfStepW, 0)
                        this.pomocniNiz = [(this.linez[1] > 0) ? 2 : 0, (this.linez[4] > 0) ? 5 : 0]
                        this.dzoker = 2

                    }
                }
            } else if (komer4 > 2 && komer4 < 3) {

                if (this.kockice[2] === 1) {
                    if (this.dzoker === 3) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(4 * this.halfStepW, 0)
                        this.pomocniNiz = [(this.linez[1] > 0) ? 2 : 0, (this.linez[6] > 0) ? 7 : 0]
                        this.dzoker = 3

                    }
                }
            } else if (komer4 > 3 && komer4 < 4) {

                if (this.kockice[3] === 1) {
                    if (this.dzoker === 4) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(6 * this.halfStepW, 0)
                        this.pomocniNiz = [(this.linez[1] > 0) ? 2 : 0, (this.linez[3] > 0) ? 4 : 0]
                        this.dzoker = 4

                    }
                }
            } else if (komer4 > 4 && komer4 < 5) {

                if (this.kockice[4] === 1) {

                    if (this.dzoker === 5) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(8 * this.halfStepW, 0)
                        this.pomocniNiz = [(this.linez[1] > 0) ? 2 : 0, (this.linez[5] > 0) ? 6 : 0]
                        this.dzoker = 5

                    }
                }
            }

        } else if (komer3 > 1 && komer3 < 2) {

            if (komer4 > 0 && komer4 < 1) {

                if (this.kockice[5] === 1) {

                    if (this.dzoker === 6) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(0, 2 * this.halfStep)

                        this.dzoker = 6

                        this.pomocniNiz = [(this.linez[0] > 0) ? 1 : 0, (this.linez[3] > 0) ? 4 : 0, (this.linez[4] > 0) ? 5 : 0]

                    }
                }
            } else if (komer4 > 1 && komer4 < 2) {

                if (this.kockice[6] === 1) {

                    if (this.dzoker === 7) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(2 * this.halfStepW, 2 * this.halfStep)

                        this.dzoker = 7
                        this.pomocniNiz = [(this.linez[0] > 0) ? 1 : 0, (this.linez[5] > 0) ? 6 : 0, (this.linez[6] > 0) ? 7 : 0]

                    }
                }
            } else if (komer4 > 2 && komer4 < 3) {

                if (this.kockice[7] === 1) {

                    if (this.dzoker === 8) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(4 * this.halfStepW, 2 * this.halfStep)

                        this.dzoker = 8
                        this.pomocniNiz = [(this.linez[0] > 0) ? 1 : 0, (this.linez[3] > 0) ? 4 : 0, (this.linez[4] > 0) ? 5 : 0]

                    }
                }
            } else if (komer4 > 3 && komer4 < 4) {

                if (this.kockice[8] === 1) {

                    if (this.dzoker === 9) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(6 * this.halfStepW, 2 * this.halfStep)

                        this.dzoker = 9
                        this.pomocniNiz = [(this.linez[0] > 0) ? 1 : 0, (this.linez[5] > 0) ? 6 : 0, (this.linez[6] > 0) ? 7 : 0]

                    }
                }
            } else if (komer4 > 4 && komer4 < 5) {

                if (this.kockice[9] === 1) {

                    if (this.dzoker === 10) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(8 * this.halfStepW, 2 * this.halfStep)

                        this.dzoker = 10
                        this.pomocniNiz = [(this.linez[0] > 0) ? 1 : 0, (this.linez[3] > 0) ? 4 : 0, (this.linez[4] > 0) ? 5 : 0]

                    }
                }
            }

        } else if (komer3 > 2 && komer3 < 3) {

            if (komer4 > 0 && komer4 < 1) {

                if (this.kockice[10] === 1) {

                    if (this.dzoker === 11) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(0, 4 * this.halfStep)

                        this.dzoker = 11
                        this.pomocniNiz = [(this.linez[2] > 0) ? 3 : 0, (this.linez[6] > 0) ? 7 : 0]

                    }
                }

            } else if (komer4 > 1 && komer4 < 2) {

                if (this.kockice[11] === 1) {

                    if (this.dzoker === 12) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(2 * this.halfStepW, 4 * this.halfStep)

                        this.dzoker = 12

                        this.pomocniNiz = [(this.linez[2] > 0) ? 3 : 0, (this.linez[3] > 0) ? 4 : 0]

                    }
                }
            } else if (komer4 > 2 && komer4 < 3) {

                if (this.kockice[12] === 1) {
                    if (this.dzoker === 13) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(4 * this.halfStepW, 4 * this.halfStep)

                        this.dzoker = 13
                        this.pomocniNiz = [(this.linez[2] > 0) ? 3 : 0, (this.linez[5] > 0) ? 6 : 0]

                    }
                }
            } else if (komer4 > 3 && komer4 < 4) {

                if (this.kockice[13] === 1) {

                    if (this.dzoker === 14) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(6 * this.halfStepW, 4 * this.halfStep)

                        this.dzoker = 14
                        this.pomocniNiz = [(this.linez[2] > 0) ? 3 : 0, (this.linez[4] > 0) ? 5 : 0]

                    }
                }
            } else if (komer4 > 4 && komer4 < 5) {

                if (this.kockice[14] === 1) {

                    if (this.dzoker === 15) {

                    } else {

                        this.ocistiCanvas()
                        this.crtacKockica()
                        this.dodajDzokera(8 * this.halfStepW, 4 * this.halfStep)

                        this.dzoker = 15
                        this.pomocniNiz = [(this.linez[2] > 0) ? 3 : 0, (this.linez[6] > 0) ? 7 : 0]

                    }
                }
            }

        }

    }

    dodajDzokera(x, y) {

        this.img.src = "../../img/biten.png"
		this.myloader2 = this.myOnloadPic.bind(this, x, y);

        this.img.addEventListener('load', this.myloader2);

    }

    obrisiDzokera() {

        this.text.textContent = " NE (0 $)";
        document.getElementById('ukupanulog').textContent = document.getElementById('igraBrojLinija').textContent * document.getElementById('igraUlog').textContent
        this.jokerVrednost = 0
        this.ocistiCanvas()
        this.lineCheck()
        this.dzoker = 0
        izbrisiDzokera.remove()
        document.getElementById('joker').checked = false
        document.getElementById('joker').disabled = false

        this.jokerAdded = false

    }

    myOnloadPic(x, y) {

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

                    document.getElementById('snimiDzokera').addEventListener('click', () => {

                        this.snimiDzokera()
                    });
                }
            }
        }

    }

    snimiDzokera() {

        this.text.textContent = " DA (" + (document.querySelector('input[name="bet"]:checked').value) * 5 + " $)";
        this.jokerVrednost = (document.querySelector('input[name="bet"]:checked').value) * 5
        document.getElementById('ukupanulog').textContent = document.getElementById('igraBrojLinija').textContent * document.querySelector('input[name="bet"]:checked').value + this.jokerVrednost
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
        dugme.addEventListener('click', () => {

            this.obrisiDzokera()
        });

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