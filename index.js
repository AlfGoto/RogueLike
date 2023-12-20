document.addEventListener('DOMContentLoaded', () => {

    console.log('connected to index.JS')


    //PERSO
    let perso = document.getElementById('perso')
    let persoName = 'TOI'
    perso.innerHTML = '<p id="T">' + persoName[0] + '</p><p id="O">' + persoName[1] + '</p><p id="I">' + persoName[2] + '</p>'
    let persoT = document.getElementById('T')
    let persoO = document.getElementById('O')
    let persoI = document.getElementById('I')
    let persoCSS = window.getComputedStyle(perso)
    perso.style.left = Math.ceil(window.innerWidth / 2) + 'px'
    perso.style.top = Math.ceil(window.innerHeight / 2.50) + 'px'
    let persoLife = 3
    let persoDEAD = false
    let invulnerabilityPeriod = false

    //XP
    let lvlP = document.getElementById('lvl')
    let xpCount = 0
    let lvl = 1
    let xpNeeded = 10
    let xpPROGRESS = document.getElementById('xpPROGRESS')


    //TIR
    let tirDiv = document.getElementById('TIR')
    let tirCount = 0
    let remnantDIV = document.getElementById('DIVremnant')
    let enemyDIV = document.getElementById('DIVenemy')
    let cooldown = false


    //MOUVEMENT
    let zBOOL = false;
    let sBOOL = false;
    let qBOOL = false;
    let dBOOL = false;


    let timer = document.getElementById('timer')
    let time = 0
    let gameON = false
    let autoclickON = false

    let nbEnemy = 0

    let currentLetter = -1
    let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let onno = ['PAF', 'PIF', 'BANG', 'POUF', 'BING', 'BAM', 'BIM', 'BOUM', 'DA', 'TA', 'RA']


    //POWER UP 
    let powerupDIV = document.getElementById('powerupDIV')
    let powerupArray = []
    let gamePAUSE = false
    let powerupTitle = document.getElementById('powerupTitle')
    let powerupMenuPAUSE = true
    //les trucs augmentables
    let cooldownTime = 1000
    let mooveSpeed = 2
    let tirITERATION = 1
    let tirIterationCount = 0
    let explodeRadius = 50

    let CSS = getComputedStyle(document.documentElement)





    window.addEventListener('pointerdown', (e) => {
        if (e.which == 3) {
            autoclickON = !autoclickON
            autoclickFunction()
            console.log('autoclick = ' + autoclickON)
        }
        if (e.which == 1) {
            if (gamePAUSE) { return }
            if (cooldown == false) {
                setTimeout(() => {
                    cooldown = false
                }, cooldownTime)
                cooldown = true

                tirIterationCount = 0

                tirFunction()

            } else {
                perso.style.color = 'gray'
                setTimeout(() => {
                    perso.style.color = 'black'
                }, 100)
            }
        }
    })





    function autoclickFunction() {
        if (!autoclickON) { return }
        if (gamePAUSE) {
            setTimeout(autoclickFunction, cooldownTime + 1)
            return
        }
        if (cooldown == false) {
            setTimeout(() => {
                cooldown = false
            }, cooldownTime)
            cooldown = true

            tirIterationCount = 0

            tirFunction()

        } else {
            perso.style.color = 'gray'
            setTimeout(() => {
                perso.style.color = 'black'
            }, 100)
        }
        setTimeout(autoclickFunction, cooldownTime + 1)
    }
    function tirFunction() {
        tirIterationCount++
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
        let distance = speedCalcul(Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), mouseX, mouseY, 30)
        tirMovment(tir, Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), mouseX, mouseY, 0, distance)

        if (tirIterationCount != tirITERATION) {
            setTimeout(() => {
                tirFunction()
            }, 150)
        }
    }
    function finMovment(obj) {
        //animation de fin de mouvement
        obj.innerHTML = nextLetter()
        obj.style.animation = 'explode 0.5s linear'

        //detect if it HIT
        mechants.forEach(e => {
            if (Math.abs(Number(window.getComputedStyle(obj)['top'].replace('px', '')) - Number(e.posY)) < explodeRadius &&
                Math.abs(Number(window.getComputedStyle(obj)['left'].replace('px', '')) - Number(e.posX)) < explodeRadius) {
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
            this.life = Math.floor(Math.random() * (Math.ceil(time / 10) - Math.ceil(time / 50) + 1) + Math.ceil(time / 100))
            this.speed = 20

            this.elem = document.createElement('p')
            enemyDIV.appendChild(this.elem)
            this.elem.classList.add('enemy')

            if (this.life > 1) {
                var d = Math.random();
                if (d < 0.7) {
                    this.speed = 5
                    this.elem.style.color = 'green'
                    this.life = Math.ceil(this.life / 2)
                }
            }

            this.spawn()
            this.moveToPerso()
        }
        moveToPerso() {
            if (gamePAUSE) {
                setTimeout(() => {
                    this.moveToPerso()
                }, 500)
                return
            }
            if (persoDEAD) { return }
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

            if (Math.abs(this.posX - Number(persoCSS['left'].replace('px', ''))) < 10 && Math.abs(this.posY - Number(persoCSS['top'].replace('px', ''))) < 10) {
                persoHIT()
            }
            setTimeout(() => {
                this.moveToPerso()
            }, this.speed)
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
                xpADD()
                // console.log(this.number + ' is dead')
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






    let mechants = []
    //TIMER
    setInterval(() => {
        if (gameON && !persoDEAD && !gamePAUSE) {
            time++
            timer.innerHTML = time + ' secondes'
            if (time % 1 == 0) {
                mechants.push(new enemy())
            }
        }
    }, 1000);




    //mouvement
    window.addEventListener('keydown', function (e) {
        if (gamePAUSE) { return }
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
            top -= mooveSpeed
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
            top += mooveSpeed
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
            top += mooveSpeed
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
            top -= mooveSpeed
            if (top < 0) { return }
            top = top + 'px'
            perso.style.left = top
            if (qBOOL == true) {
                qfonction()
            }
        }, 1)
    }







    function persoHIT() {
        if (invulnerabilityPeriod) { return }
        invulnerabilityPeriod = true
        setTimeout(() => {
            invulnerabilityPeriod = false
        }, 1000)
        persoLife--
        if (persoLife <= 0) {
            gameON = false
            persoDEAD = true
            perso.remove()
            console.log('perso dead')
        } else if (persoLife == 1) {
            persoO.classList.add('hidden')
        } else if (persoLife == 2) {
            persoI.classList.add('hidden')
        }
    }

    function xpADD() {
        xpCount++
        // console.log('xp = ' + xpCount + '     xpNeeded for lvl ' + lvl + ' = ' + xpNeeded * (1.25 * lvl))
        xpPROGRESS.style.left = ((xpCount / (xpNeeded * (1.25 * lvl))) * 100) - 100 + '%'
        if (xpNeeded * (1.25 * lvl) <= xpCount) {
            gamePAUSE = true
            xpPROGRESS.style.left = '100%'
            // console.log('LVL UP')
            lvl++
            lvlP.innerHTML = 'level ' + lvl
            xpCount = 0
            powerupMenu()
        }
    }

    class powerup {
        constructor(n, d, func) {

            this.elem = document.createElement('div')
            powerupDIV.appendChild(this.elem)
            this.elem.classList.add('powerupDIVS')

            this.nameP = document.createElement('h3')
            this.elem.appendChild(this.nameP)
            this.nameP.innerHTML = n
            this.descriptionP = document.createElement('p')
            this.elem.appendChild(this.descriptionP)
            this.descriptionP.innerHTML = d

            this.elem.addEventListener('click', func)
            this.elem.classList.add('hidden')
        }
    }

    function powerupMenu() {
        console.log('Pupmenu Oppening...')
        powerupTitle.classList.remove('hidden')
        let tempARR = [...powerupArray]
        console.log(tempARR)

        //First element
        tempKey = Math.floor(Math.random() * ((tempARR.length - 1) - 0 + 1) + 0)
        let tempOne = tempARR[tempKey]
        tempARR.splice(tempKey, 1)
        console.log(tempARR)
        tempOne.elem.style.left = '23.5vw'
        tempOne.elem.classList.remove('hidden')

        //Second element
        tempKey = Math.floor(Math.random() * ((tempARR.length - 1) - 0 + 1) + 0)
        let tempTwo = tempARR[tempKey]
        tempARR.splice(tempKey, 1)
        console.log(tempARR)
        tempTwo.elem.style.left = '43.5vw'
        tempTwo.elem.classList.remove('hidden')

        //Third element
        tempKey = Math.floor(Math.random() * ((tempARR.length - 1) - 0 + 1) + 0)
        let tempThree = tempARR[tempKey]
        tempARR.splice(tempKey, 1)
        console.log(tempARR)
        tempThree.elem.style.left = '63.5vw'
        tempThree.elem.classList.remove('hidden')

        setTimeout(() => {
            powerupMenuPAUSE = false
        }, 1000)
    }

    function closepowerupMenu() {
        console.log('menu closed')
        powerupTitle.classList.add('hidden')
        tempARR = document.querySelectorAll('.powerupDIVS')
        tempARR.forEach(e => {
            if (!e.classList.contains('hidden')) { e.classList.add('hidden') }
        })
        gamePAUSE = false
        powerupMenuPAUSE = true
    }

    powerupArray.push(new powerup('I Need More Bullets', 'Get one more shot everytime you shoot', () => {
        tirITERATION++
        closepowerupMenu()
    }))
    powerupArray.push(new powerup('Quick Reading', 'Shoot faster by 15%', () => {
        if (powerupMenuPAUSE) { return }
        cooldownTime -= (cooldownTime / 100) * 15
        closepowerupMenu()
    }))
    powerupArray.push(new powerup('betterFASTERstronger', 'Move faster !', () => {
        if (powerupMenuPAUSE) { return }
        mooveSpeed++
        closepowerupMenu()
    }))
    powerupArray.push(new powerup('Healing Sorcery', "Doctissimo ou l'excellent 'appliquer un bandage pour les nuls' de Joseph Mourigno. Bref +1pv", () => {
        if (powerupMenuPAUSE) { return }
        persoLife++
        if (persoLife == 2) { persoO.classList.remove('hidden') } else if (persoLife == 3) { persoI.classList.remove('hidden') }
        closepowerupMenu()
    }))
    powerupArray.push(new powerup('Bigger Explosions', "Bigger explosions, everything is in the title what more do you want ? (augment radius by the first value it had at the start)", () => {
        if (powerupMenuPAUSE) { return }
        explodeRadius = Math.ceil(explodeRadius * 1.50)
        let radius = Math.ceil(Number(CSS.getPropertyValue('--explode-radius1').replace('%', '')) * 1.50);

        document.documentElement.style.setProperty('--explode-radius1', radius + '%');
        radius = Math.ceil(radius * 1.25)
        document.documentElement.style.setProperty('--explode-radius2', radius + '%');
        radius = Math.ceil(radius * 1.25)
        document.documentElement.style.setProperty('--explode-radius3', radius + '%');
        radius = Math.ceil(radius * 1.25)
        document.documentElement.style.setProperty('--explode-radius4', radius + '%');
        radius = Math.ceil(radius * 1.25)
        document.documentElement.style.setProperty('--explode-radius5', radius + '%');

        closepowerupMenu()
    }))





    let mouseX = 0
    let mouseY = 0
    document.onmousemove = (e) => {
        mouseX = e.pageX
        mouseY = e.pageY
        // console.log(mouseX + " / " + mouseY)
    }

    //enlever le menu du clic droit
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

})