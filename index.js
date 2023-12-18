document.addEventListener('DOMContentLoaded', () => {
    console.log('connected to index.JS')
    let perso = document.getElementById('perso')
    let persoCSS = window.getComputedStyle(perso)
    let tirDiv = document.getElementById('TIR')
    let remnantDIV = document.getElementById('DIVremnant')
    let enemyDIV = document.getElementById('DIVenemy')
    let zBOOL = false;
    let sBOOL = false;
    let qBOOL = false;
    let dBOOL = false;
    let timer = document.getElementById('timer')
    let time = 0
    let gameON = false
    let tirCount = 0
    let nbEnemy = 0
    let currentLetter = -1
    let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let onno = ['PAF', 'PIF', 'BANG', 'POUF', 'BING', 'BAM', 'BIM', 'BOUM', 'DA', 'TA', 'RA']


    window.addEventListener('pointerdown', (e) => {
        if (e.which == 3) {
            console.log('rightClick')
        }
        if (e.which == 1) {
            tirCount++

            //crée le missile
            tir = document.createElement('p')
            tirDiv.appendChild(tir)
            tir.innerHTML = randomOnno().toLowerCase()
            tir.classList.add('tir')
            tir.setAttribute("id", tirCount)

            //le place et l'envoie
            tir.style.left = persoCSS['left']
            tir.style.top = persoCSS['top']
            let distance = speedCalcul(Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), e.pageX, e.pageY, 30)
            tirMovment(tir, Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), e.pageX, e.pageY, 0, distance)
        }
    })


    function finMovment(obj) {
        console.log(mechants)
        //animation de fin de mouvement
        obj.innerHTML = nextLetter()
        obj.style.animation = 'explode 0.5s linear'

        //detect if it HIT
        mechants.forEach(e => {
            if (Math.abs(Number(window.getComputedStyle(obj)['top'].replace('px', '')) - Number(e.posY)) < 50 &&
                Math.abs(Number(window.getComputedStyle(obj)['left'].replace('px', '')) - Number(e.posX)) < 50) {
                e.destroy()
            }
        });

        //créer la marque au sol
        let remnant = document.createElement('p')
        remnant.classList.add('remnant')
        remnant.innerHTML = obj.innerHTML
        remnantDIV.appendChild(remnant)
        remnant.style.top = window.getComputedStyle(obj)['top']
        remnant.style.left = window.getComputedStyle(obj)['left']
        setTimeout(() => {
            obj.remove()
            return
        }, 500)
        setTimeout(() => {
            remnant.remove()
            return
        }, 60000)
    }
    function nextLetter() {
        if (currentLetter == 25) { currentLetter = 0 } else { currentLetter++ }
        return alph[currentLetter]
    }
    function randomOnno() {
        return onno[Math.floor(Math.random() * ((onno.length - 1) - 0 + 1) + 0)]
    }
    function speedCalcul(depX, depY, ariX, ariY, speed) {
        let distance = 0
        if (depX > ariX) {
            while (depX > ariX) {
                depX -= speed
                distance++
            }
        } else {
            while (depX <= ariX) {
                ariX -= speed
                distance++
            }
        }
        if (depY > ariY) {
            while (depY > ariY) {
                depY -= speed
                distance++
            }
        } else {
            while (depY <= ariY) {
                ariY -= speed
                distance++
            }
        }
        return distance
    }
    function tirMovment(obj, depX, depY, ariX, ariY, count, distance) {
        // console.log(obj)
        setTimeout(() => {
            count++
            pos = ((((ariY - depY) / distance) * count) + depY)
            obj.style.top = pos + "px"
            pos = ((((ariX - depX) / distance) * count) + depX)
            obj.style.left = pos + "px"
            if (count == distance) {
                finMovment(obj)
            } else { tirMovment(obj, depX, depY, ariX, ariY, count, distance) }
        }, 10)
    }




    class enemy {
        constructor() {
            nbEnemy++
            this.number = nbEnemy
            this.life =  Math.floor(Math.random() * (Math.ceil(time / 10) - 1 + 1) + 1)
            console.log('enemy n' + this.number + ' has spawn')


            this.elem = document.createElement('p')
            enemyDIV.appendChild(this.elem)
            this.elem.classList.add('enemy')
            this.spawn()


            this.moveToPerso()
        }
        moveToPerso() {
            this.posX = Number(window.getComputedStyle(this.elem)['left'].replace('px', ''))
            this.posY = Number(window.getComputedStyle(this.elem)['top'].replace('px', ''))

            if (this.posX < Number(persoCSS['left'].replace('px', ''))) {
                this.elem.style.left = (this.posX + 1) + 'px'
            } else if (this.posX > Number(persoCSS['left'].replace('px', ''))) {
                this.elem.style.left = (this.posX - 1) + 'px'
            }

            if (this.posY < Number(persoCSS['top'].replace('px', ''))) {
                this.elem.style.top = (this.posY + 1) + 'px'
            } else if (this.posY > Number(persoCSS['top'].replace('px', ''))) {
                this.elem.style.top = (this.posY - 1) + 'px'
            }
            // console.log('Y = ' + this.posY + '    X = ' + this.posX)


            setTimeout(() => {
                this.moveToPerso()
            }, 20)
        }

        spawn() {
            this.elem.innerHTML = this.life

            let x = Math.floor(Math.random() * (window.innerWidth - 0 + 1) + 0)
            let y = Math.floor(Math.random() * (window.innerHeight - 0 + 1) + 0)
            if (Math.abs(Number(persoCSS['top'].replace('px', '')) - y) > 300 || Math.abs(Number(persoCSS['left'].replace('px', '')) - x) > 300) {
                this.elem.style.top = y + 'px'
                this.elem.style.left = x + 'px'
            } else {
                this.spawn()
            }
        }

        destroy() {
            if (this.life <= 1) {
                console.log(this.number + ' is dead')
                mechants.splice(mechants.indexOf(this), 1)
                Object.getOwnPropertyNames(this).forEach(pName => {
                    delete this.pName;
                })
                this.elem.remove()
            } else {
                this.life -= 1
                this.elem.innerHTML = this.life
            }

        }
    }

    function spawnCoordinate() {
        let x = Math.floor(Math.random() * (window.innerWidth - 0 + 1) + 0)
        let y = Math.floor(Math.random() * (window.innerHeight - 0 + 1) + 0)
        if (Math.abs(Number(persoCSS['top'].replace('px', '')) - y) > 300 || Math.abs(Number(persoCSS['left'].replace('px', '')) - x) > 300) {
            return x + '|' + y
        } else {
            return spawnCoordinate()
        }
    }
























    let mechants = []
    setInterval(() => {
        if (gameON == true) {
            time++
            timer.innerHTML = time
            if (time % 1 == 0) {
                mechants.push(new enemy())
            }
        }
    }, 1000);


    window.addEventListener('keydown', function (e) {
        if (gameON == false) {
            gameON = true
        }
        // console.log(`DOWN ${e.key}`)
        if (e.key == 'z') {
            if (zBOOL == false) {
                zfonction()
                zBOOL = true
            }
        }
        if (e.key == 's') {
            if (sBOOL == false) {
                sfonction()
                sBOOL = true
            }
        }
        if (e.key == 'd') {
            if (dBOOL == false) {
                dfonction()
                dBOOL = true
            }

        }
        if (e.key == 'q') {
            if (qBOOL == false) {
                qfonction()
                qBOOL = true
            }
        }
    });

    window.addEventListener('keyup', function (e) {
        // console.log(`UP ${e.key}`);
        if (e.key == 'z') {
            zBOOL = false
        }
        if (e.key == 's') {
            sBOOL = false
        }
        if (e.key == 'd') {
            dBOOL = false
        }
        if (e.key == 'q') {
            qBOOL = false
        }
    });

    function zfonction() {
        setTimeout(() => {
            let top = Number(persoCSS['top'].replace('px', ''))
            top -= 4
            if (top < -0) { return }
            top = top + 'px'
            perso.style.top = top
            if (zBOOL == true) {
                zfonction()
            }
        }, 1)
    }
    function sfonction() {
        setTimeout(() => {
            let top = Number(persoCSS['top'].replace('px', ''))
            top += 4
            if (top > window.innerHeight) { return }
            top = top + 'px'
            perso.style.top = top
            if (sBOOL == true) {
                sfonction()
            }
        }, 1)
    }
    function dfonction() {
        setTimeout(() => {
            let top = Number(persoCSS['left'].replace('px', ''))
            top += 4
            if (top > window.innerWidth) { return }
            top = top + 'px'
            perso.style.left = top
            if (dBOOL == true) {
                dfonction()
            }
        }, 1)
    }
    function qfonction() {
        setTimeout(() => {
            let top = Number(persoCSS['left'].replace('px', ''))
            top -= 4
            if (top < 0) { return }
            top = top + 'px'
            perso.style.left = top
            if (qBOOL == true) {
                qfonction()
            }
        }, 1)
    }

    //enlever le menu du clic droit
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

})