'use strict';

import FetchResults from '/slotm/assets/script/classes/fetch_results.js';

export default class SlotWeels extends FetchResults {

    constructor(instance) {

        super()

        this.slotObject = {
            brojKredita: 1000,
            ulog: 2,
            joker: 0,
            kvote: [100, 50, 30, 5, 50, 30, 20, 4, 30, 20, 10, 3],
            brojac: 0,
            pomagac: 0,
            instance: instance
        }

        this.spinovi = document.getElementsByClassName('carousel')
        this.x = document.getElementsByClassName('brake')
        this.scene = document.getElementsByClassName('scene')
        this.okvir = document.getElementById('myCanvas')

        this.downloadTimer;
        this.zumbul;

        this.zaustaviIgruDugme = this.zaustaviRotacijuFunckija.bind(this);
        this.pokreniIgruDugme = this.pokreniOkretanjeSlotova.bind(this);
        this.pokreniTipIgre = this.tipIgreEvent.bind(this);
        this.pokreniBet = this.promeniBetIgre.bind(this);
        this.promeniNacin = this.promeniNacinNagradjivanja.bind(this);

        this.aktivirajEventeNaRadioButtons()
        this.dodalListenere()

    }

    getVrednostDzokera(x) {

        let vrednostDzokera = 0
        if (this.slotObject.instance.jokerAdded) {

            vrednostDzokera = x * 5
        } else {
            vrednostDzokera = 0
        }

        this.slotObject.joker = vrednostDzokera

        if (document.getElementById('nag2').checked) {
            return 0
        } else {
            return this.slotObject.joker
        }
    }

    promeniNacinNagradjivanja() {

        this.checkNacin(document.querySelector('input[name="nag"]:checked'))

    }

    promeniBetIgre() {

        let x = document.querySelector('input[name="bet"]:checked')

        if (x.id === 'bet4') {
            this.checkerLast(x)
        } else {
            this.checker(x)
        }

    }

    tipIgreEvent() {

        let x = document.querySelector('input[name="tipIgre"]:checked')

        if (x.id === 'tip5') {
            this.checkerLast(x)

        } else {

            this.checker(x)
        }

    }

    izbrisiEventeNaRadiouButtons() {
        let x = [document.getElementsByClassName('cosma'), document.getElementsByClassName('gozma'), document.getElementsByClassName('gigozma')]

        for (let i = 0; i < x.length; i++) {
            for (let j = 0; j < x[i].length; j++) {
                x[i][j].onclick = null
            }
        }
    }

    aktivirajEventeNaRadioButtons() {

        let x = [document.getElementsByClassName('cosma'), document.getElementsByClassName('gozma'), document.getElementsByClassName('gigozma')]

        for (let i = 0; i < x.length; i++) {
            for (let j = 0; j < x[i].length; j++) {
                x[i][j].onclick = () => {
                    if (x[i][j].getElementsByTagName('input')[0].checked === false) {

                        if (x[i][j].querySelector('input[name="tipIgre"]')) {

                            this.napraviSpinove(x[i][j].getElementsByTagName('input')[0].value - 1)
                            document.getElementById('igra').textContent = x[i][j].getElementsByTagName('label')[0].textContent;
                            document.getElementById('ukupanulog').textContent = this.slotObject.instance.brojacLinija() * this.slotObject.ulog + this.getVrednostDzokera(this.slotObject.ulog)

                        } else if (x[i][j].querySelector('input[name="bet"]')) {

                            this.pomocnikZaPromenuUloga(x[i][j].getElementsByTagName('input')[0].value)

                        } else if (x[i][j].querySelector('input[name="nag"]')) {

                            this.checkNacin(document.querySelector('input[name="nag"]:checked'))

                        }

                        x[i][j].parentElement.querySelector('input:checked').parentElement.style.background = 'white'
                        x[i][j].getElementsByTagName('input')[0].checked = true;
                        x[i][j].style.background = 'lightgreen'

                    }
                }
            }

        }
    }

    checkNacin(x) {

        if (x.id === 'nag1') {
            this.checker(x)

        } else {
            this.checkerLast(x)

        }

    }

    checker(x) {
        if (x.name === "tipIgre") {

            this.napraviSpinove(x.value)
            document.getElementById('igra').textContent = x.parentElement.nextElementSibling.querySelector('label').textContent;
            document.getElementById('ukupanulog').textContent = this.slotObject.instance.brojacLinija() * this.slotObject.ulog + this.getVrednostDzokera(this.slotObject.ulog)

        } else if (x.name === "bet") {

            this.pomocnikZaPromenuUloga(x.parentElement.nextElementSibling.querySelector('input').value)

        } else if (x.name === "nag") {

            this.perspectiveYes();

        }

        x.checked = false
        x.parentElement.style.background = 'white'
        x.parentElement.nextElementSibling.querySelector('input').checked = true
        x.parentElement.nextElementSibling.style.background = 'lightgreen'
    }

    checkerLast(x) {
        if (x.name === "tipIgre") {

            this.napraviSpinove(0)
            document.getElementById('igra').textContent = x.parentElement.parentElement.firstChild.nextElementSibling.querySelector('label').textContent;
            document.getElementById('ukupanulog').textContent = this.slotObject.instance.brojacLinija() * this.slotObject.ulog + this.getVrednostDzokera(this.slotObject.ulog)

        } else if (x.name === "bet") {

            this.pomocnikZaPromenuUloga(x.parentElement.parentElement.firstChild.nextElementSibling.querySelector('input').value)

        } else if (x.name === "nag") {

            this.perspectiveNo();

            this.slotObject.instance.ocistiCanvas()
            this.slotObject.instance.lineCheck()

            if (this.slotObject.instance.jokerAdded) {

                this.slotObject.instance.dodajDzokera(this.slotObject.instance.kkk1, this.slotObject.instance.kkk2)

                document.getElementById('ukupanulog').textContent = document.getElementById('igraBrojLinija').textContent * document.getElementById('igraUlog').textContent + document.querySelector('input[name="bet"]:checked').value * 5
                document.getElementById('igraDzoker').textContent = 'DA (' + document.querySelector('input[name="bet"]:checked').value * 5 + ' $)'

            }

        }

        x.checked = false
        x.parentElement.style.background = 'white'
        x.parentElement.parentElement.firstChild.nextElementSibling.querySelector('input').checked = true
        x.parentElement.parentElement.firstChild.nextElementSibling.style.background = 'lightgreen'
    }

    getUkupanUlog(x, y, z) {
        if (document.getElementById('nag2').checked) {
            return x
        } else {
            return x * y + z
        }
    }

    pomocnikZaPromenuUloga(x) {
        document.getElementById('igraUlog').textContent = x
        document.getElementById('ukupanulog').textContent = this.slotObject.instance.brojacLinija() * x + this.getVrednostDzokera(x)

        if (this.slotObject.instance.jokerAdded) {

            if (document.getElementById('nag2').checked) {
                document.getElementById('igraDzoker').textContent = ' NE (0 $)';
            } else {
                document.getElementById('igraDzoker').textContent = 'DA (' + x * 5 + ' $)'
            }

        }

        this.slotObject.ulog = x
    }

    napraviSpinove(tipIgre) {

        let brojevi = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
        let brojeviKvote = [100, 50, 30, 5, 50, 30, 20, 4, 30, 20, 10, 3]
        let rBrojevi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'I', 'II', 'III', 'IV', 'V', 'VI']
        let rBrojeviKvote = [90, 40, 28, 4, 40, 28, 18, 3, 28, 18, 8, 2]
        let vockice = ['🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉']
        let vockiceKvote = [200, 100, 60, 8, 100, 60, 40, 7, 60, 40, 20, 6]
        let zivotinje = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊']
        let zivotinjeKvote = [150, 70, 40, 7, 70, 40, 30, 6, 40, 30, 15, 5]
        let emoji = ['😀', '😁', '😂', '🤣', '😅', '😎', '😀', '😁', '😂', '🤣', '😅', '😎']
        let emojiKvote = [120, 60, 35, 6, 60, 35, 25, 5, 35, 25, 12, 4]

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 12; j++) {
                if (tipIgre == 0) {

                    this.spinovi[i].getElementsByTagName("p")[j].textContent = brojevi[j]

                    if (i < 1) {
                        this.pomocnaFunct(brojevi, brojeviKvote)
                        this.pomocnikZaZetone([2, 3, 4, 5, 6])

                    }

                } else if (tipIgre == 1) {
                    this.spinovi[i].getElementsByTagName("p")[j].textContent = rBrojevi[j]
                    if (i < 1) {
                        this.pomocnaFunct(rBrojevi, rBrojeviKvote)
                        this.pomocnikZaZetone([1, 2, 3, 4, 5])
                    }
                } else if (tipIgre == 2) {
                    this.spinovi[i].getElementsByTagName("p")[j].textContent = vockice[j]
                    if (i < 1) {
                        this.pomocnaFunct(vockice, vockiceKvote)
                        this.pomocnikZaZetone([5, 6, 7, 8, 9])
                    }
                } else if (tipIgre == 3) {

                    this.spinovi[i].getElementsByTagName("p")[j].textContent = zivotinje[j]
                    if (i < 1) {
                        this.pomocnaFunct(zivotinje, zivotinjeKvote)
                        this.pomocnikZaZetone([4, 5, 6, 7, 8])
                    }
                } else if (tipIgre == 4) {

                    this.spinovi[i].getElementsByTagName("p")[j].textContent = emoji[j]
                    if (i < 1) {
                        this.pomocnaFunct(emoji, emojiKvote)
                        this.pomocnikZaZetone([3, 4, 5, 6, 7])
                    }
                }
            }
            this.scene[i].setAttribute('style', 'perspective: 0px;transition: 0.3s;');
            this.spinovi[i].style.cssText = 'translateZ(-336px) rotateX(0deg);transition:0.1s;';
        }

        if (document.getElementById('nag1').checked) {
            this.perspectiveNo();

        } else {
            this.perspectiveYes();

        }

    }

    perspectiveNo() {

        for (let i = 0; i < 5; i++) {
            this.scene[i].setAttribute('style', 'perspective: 0px;transition: 0.3s;');

        }

        this.okvir.style.height = '100%';
        this.okvir.style.top = '0';
        document.getElementById('linije').style.display = 'block'
        document.getElementById('jokerCont').style.display = 'block'
        document.getElementById('igraBrojLinija').textContent = this.slotObject.instance.brojacLinija()

    }
    perspectiveYes() {

        this.slotObject.instance.ocistiCanvas()

        for (let i = 0; i < 5; i++) {
            this.scene[i].setAttribute('style', 'perspective: 1000px;transition: 0.3s;');
        }

        this.okvir.style.height = '180px';
        this.okvir.style.top = 'calc(50% - 90px)';
        document.getElementById('linije').style.display = 'none'
        document.getElementById('jokerCont').style.display = 'none'
        document.getElementById('igraBrojLinija').textContent = 1
        document.getElementById('ukupanulog').textContent = this.slotObject.ulog
        document.getElementById('igraDzoker').textContent = " NE (0 $)"

    }

    pomocnaFunct(array, array2) {
        this.slotObject.kvote = array2
        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                this.pomocnikPonocneFunkcije(array, i, 4, 5)
                this.pomocnikZaKvote([array2[0], array2[1], array2[2], array2[3]], i)
            } else if (i === 1) {

                this.pomocnikPonocneFunkcije(array, i, 2, 3)
                this.pomocnikZaKvote([array2[4], array2[5], array2[6], array2[7]], i)
            } else if (i === 2) {

                this.pomocnikPonocneFunkcije(array, i, 0, 1)
                this.pomocnikZaKvote([array2[8], array2[9], array2[10], array2[11]], i)
            }
        }
    }

    pomocnikZaZetone(array) {
        let cosma = document.getElementsByClassName('cosma');

        for (let i = 0; i < cosma.length; i++) {
            cosma[i].querySelector('input').value = array[i]
            cosma[i].querySelector('label').textContent = array[i] + '$'
        }

        document.getElementById('igraUlog').textContent = document.querySelector('input[name="bet"]:checked').value
        this.slotObject.ulog = document.querySelector('input[name="bet"]:checked').value
        if (document.getElementById('izbrisiDzokera')) {
            if (document.getElementById('nag2').checked) {
                document.getElementById('igraDzoker').textContent = ' NE (0 $)'
            } else {

                document.getElementById('igraDzoker').textContent = 'DA (' + (document.querySelector('input[name="bet"]:checked').value * 5) + ' $)'

            }

        }

    }

    pomocnikZaKvote(array, i) {
        for (let j = 0; j < 4; j++) {
            kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[j].getElementsByTagName('td')[5].textContent = array[j]
        }
    }

    pomocnikPonocneFunkcije(array, i, x, y) {
        kiki.getElementsByTagName('table')[i].getElementsByTagName('caption')[0].textContent = 'Kvota za ' + array[x] + ' i ' + array[y]

        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[0].getElementsByTagName('td')[2].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[0].getElementsByTagName('td')[3].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[0].getElementsByTagName('td')[4].textContent = array[x] + ' || ' + array[y]

        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[1].getElementsByTagName('td')[1].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[1].getElementsByTagName('td')[2].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[1].getElementsByTagName('td')[3].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[1].getElementsByTagName('td')[4].textContent = array[x] + ' || ' + array[y]

        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[2].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[3].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[4].textContent = array[x] + ' || ' + array[y]

        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[3].getElementsByTagName('td')[3].textContent = array[x] + ' || ' + array[y]
        kiki.getElementsByTagName('table')[i].getElementsByTagName('tr')[3].getElementsByTagName('td')[4].textContent = array[x] + ' || ' + array[y]
    }

    rotateCarousel(array) {

        let x = document.getElementsByClassName('brake');

        for (let i = 0; i < 2; i++) {
            this.x[i].style.pointerEvents = "none";
        }

        for (let i = 0; i < 5; i++) {

            if (this.slotObject.pomagac === 0) {
                this.spinovi[i].style.cssText = "transform: translateZ(-336px) rotateX(" + (360 * (Math.floor(Math.random() * (15 - 10 + 1)) + 10) + (-30) * (array[i] - 1)) + "deg); transition-delay:" + 0.2 * i + "s; transition-duration: 5s;";
                this.slotObject.pomagac++
            } else {
                this.spinovi[i].style.cssText = "transform: translateZ(-336px) rotateX(" + (-360 * (Math.floor(Math.random() * (10 - 5 + 1)) + 5) + (-30) * (array[i] - 1)) + "deg); transition-delay:" + 0.2 * i + "s; transition-duration: 5s;";
                this.slotObject.pomagac = 0
            }

        }

    }

    stopAnimation(array) {

        for (let i = 0; i < 5; i++) {

            this.spinovi[i].style.cssText = 'transform: translateZ(-336px) rotateX(' + (-30) * ((array[i] - 1)) + 'deg); transition-duration: 0s;';
        }

        this.pointerAll()

        this.upisivacKredita(array)

    }

    pointerAll() {

        let x = document.getElementsByClassName('brake');

        for (let i = 0; i < 2; i++) {
            this.x[i].style.pointerEvents = "auto";
        }

        document.getElementById('stoper').removeEventListener('click', this.zaustaviIgruDugme)

        this.dodalListenere()

    }

    dodalListenere() {
        this.aktivirajEventeNaRadioButtons();
        document.getElementById('pokreniIgru').addEventListener('click', this.pokreniIgruDugme);
        document.getElementById('game-button').addEventListener('click', this.pokreniTipIgre);
        document.getElementById('bet-button').addEventListener('click', this.pokreniBet);
        document.getElementById('game-button-nacin').addEventListener('click', this.promeniNacin);

    }

    zaustaviRotacijuFunckija() {

        clearInterval(this.downloadTimer);

        document.getElementById('preostalo').textContent = '5 sec';
        document.getElementById('progressBar').value = 0;
        document.getElementById('preostalo').style.visibility = 'hidden';

        this.stopAnimation(this.zumbul);

    }

    pokreniOkretanjeSlotova() {

        this.izbrisiEventeNaRadiouButtons()

        document.getElementById('pokreniIgru').removeEventListener('click', this.pokreniIgruDugme);
        document.getElementById('game-button').removeEventListener('click', this.pokreniTipIgre);
        document.getElementById('bet-button').removeEventListener('click', this.pokreniBet);
        document.getElementById('game-button-nacin').removeEventListener('click', this.promeniNacin);

        this.rotateCarousel([360, 360, 360, 360, 360])

        if (this.slotObject.instance.jokerAdded) {
            this.slotObject.joker = this.slotObject.ulog * 5
        } else {
            this.slotObject.joker = 0
        }

        let sendObj = {

            "ulog": this.slotObject.ulog,
            "igra": document.querySelector('input[name="tipIgre"]:checked').value,
            "kvote": this.slotObject.kvote,
            "brojLinija": this.slotObject.instance.brojacLinija(1),
            "dzoker": this.slotObject.instance.dzokerList(),
            "vrednostDzokera": this.slotObject.joker,
            "nacin": document.querySelector('input[name="nag"]:checked').value,
            "brojKredita": this.slotObject.brojKredita

        }

        this.postData('controller.php', sendObj)
            .then((data) => {
                this.slotObject.pomagac--
                this.slotObject.brojac++
                this.zumbul = data;
                console.log('data', data)
                console.log(data[5])
                this.rotateCarousel(data)

                document.getElementById('stoper').addEventListener('click', this.zaustaviIgruDugme)

                let timeleft = 5;
                this.downloadTimer = setInterval(() => {
                    if (timeleft <= 0) {

                        clearInterval(this.downloadTimer)

                        document.getElementById('preostalo').textContent = '5 sec';
                        document.getElementById('progressBar').value = 0;
                        document.getElementById('preostalo').style.visibility = 'hidden';

                        this.pointerAll()
                        this.upisivacKredita(data)

                    } else {

                        document.getElementById('preostalo').style.visibility = 'visible';
                        document.getElementById('preostalo').textContent = timeleft + ' sec';
                        document.getElementById('progressBar').value = 5 - timeleft;
                        timeleft -= 1;
                    }

                }, 1000);
            })

        if (document.getElementById('nag2').checked) {

            document.getElementById('brojKredita').textContent = this.slotObject.brojKredita - this.slotObject.ulog

        } else if (document.getElementById('nag1').checked) {
            document.getElementById('brojKredita').textContent = this.slotObject.brojKredita - (this.slotObject.ulog * this.slotObject.instance.brojacLinija() + this.slotObject.joker)

        }

    }

    upisivacKredita(array) {

        if ((array[8] - array[7]) == document.getElementById('brojKredita').textContent) {
            this.slotObject.brojKredita = array[8]
            document.getElementById('brojKredita').textContent = array[8]
            document.getElementById('odSpin').textContent = this.slotObject.brojac
            if (array[7] > 0) {

                if (document.getElementsByClassName('ssss').length > 4) {
                    kombinacije.lastChild.remove();
                }

                let glDiv = document.createElement('div');
                glDiv.className = 'ssss';
                glDiv.style.cssText = 'display:flex; width:100%; margin-bottom:8px';

                let izvBrojev = document.createElement('div');
                izvBrojev.innerHTML = 'Izvučeni brojevi:<span>' + array[0] + ',' + array[1] + ',' + array[2] + ',' + array[3] + ',' + array[4] + '</span>';

                let ukUl = document.createElement('div');
                ukUl.innerHTML = 'Ukupan ulog: <span>' + document.getElementById('ukupanulog').textContent + ' $</span>';

                let tipNag = document.createElement('div');
                tipNag.innerHTML = 'Tip nagradjivanja:<span>' + document.querySelector('input[name="nag"]:checked').value + '</span>';

                let upOd = document.createElement('div');
                upOd.innerHTML = 'Odigrano Linija: <span>' + document.getElementById('igraBrojLinija').textContent + '</span>';

                let ukDob = document.createElement('div');
                ukDob.innerHTML = 'Ukupan dobitak: <span >' + array[7] + '</span> $';

                let glDiv2 = document.createElement('div');
                glDiv2.className = 'midMid'
                glDiv2.id = 'winwerDiv'
                glDiv2.style.cssText = 'padding: 4px; background: white; position: absolute; top: 0; right: 0; width: 100%; height: 100%; z-index: 100001;'

                let division = document.createElement('div');
                if (JSON.parse(array[5]).nacin == 1) {
                    if (array[10].length > 1) {
                        for (let i = 0; i < array[10].length; i++) {
                            if (array[10][i] !== "nema dobitka") {
                                division.innerHTML += '<h1>Svaka čast imate pogodak na liniji ' + (array[10][i][5] + 1) + ' </h1>'
                            }

                        }
                    } else {

                        division.innerHTML += '<h1>Svaka čast imate pogodak na liniji 1! </h1>'

                    }
                } else {
                    division.innerHTML += '<h1>Svaka čast imate pogodak! </h1>'
                }
                division.innerHTML += '<h1>Vrhunska pobednička animacija</h1>'

                glDiv2.appendChild(division)

                if (array[9] === 0) {

                    let button1 = document.createElement('button');
                    button1.textContent = 'Pritisnite za nastavak igre'

                    button1.addEventListener('click', () => {

                        winwerDiv.remove()
                        document.getElementsByTagName("BODY")[0].style.overflow = 'initial'
                    });

                    glDiv2.appendChild(button1)

                } else {

                    glDiv2.innerHTML += '<h1> Ostvarili ste i pravo na mini game</h1>';

                    let button2 = document.createElement('button');
                    button2.textContent = 'Pritisnite za ulazak u mini game'

                    glDiv2.appendChild(button2)

                    button2.addEventListener('click', () => {

                        let glDiv3 = document.createElement('div');
                        glDiv3.className = 'midMid'
                        glDiv3.id = 'winwerDiv2'
                        glDiv3.style.cssText = 'padding: 4px; background: white; position: absolute; top: 0; right: 0; width: 100%; height: 100%; z-index: 100001;'
                        glDiv3.innerHTML = "<h1> Mini game nije nažalost spreman :'( </h1>";
                        glDiv2.appendChild(glDiv3)

                        let button3 = document.createElement('button');
                        button3.textContent = 'Pritisnite za nastavak igre'
                        glDiv3.appendChild(button3)
                        button3.addEventListener('click', () => {
                            winwerDiv.remove()
                            document.getElementsByTagName("BODY")[0].style.overflow = 'initial'

                        });

                    });

                }

                document.getElementsByTagName("BODY")[0].style.overflow = 'hidden'
                document.getElementsByTagName("BODY")[0].prepend(glDiv2);

                glDiv.appendChild(izvBrojev);
                glDiv.appendChild(ukUl);
                glDiv.appendChild(tipNag);
                glDiv.appendChild(upOd);
                glDiv.appendChild(ukDob);
                kombinacije.prepend(glDiv);

            }
        } else {

            this.slotObject.brojKredita = 0
            document.getElementById('brojKredita').textContent = 0
            console.log('varate, zbog toga su vam oduzeti svi krediti')
        }

    }

}