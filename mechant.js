document.addEventListener('DOMContentLoaded', () => {
    console.log('mechant loaded')

    let enemyDIV = document.getElementById('DIVenemy')

    class gnome {
        constructor(life = 5, speed = 0.25, skin = "../img/gnome.png") {
            this.life = life
            this.speed = speed
            this.skin = skin


            this.create()
            this.moveToPerso()

            // console.log(this.constructor.name + ' = ' + this.speed)
        }
        moveToPerso() {
            if (window.gamePAUSE) {
                setTimeout(() => {
                    this.moveToPerso()
                }, this.speed)
                return
            }
            if (persoDEAD) { return }
            this.posX = PXtoVH(Number(window.getComputedStyle(this.elem)['left'].replace('px', '')))
            this.posY = PXtoVH(Number(window.getComputedStyle(this.elem)['top'].replace('px', '')))

            if (this.posX + 5 < PXtoVH(Number(persoCSS['left'].replace('px', '')))) {
                this.elem.style.left = (this.posX + this.speed) + 'vh'
            } else if (this.posX + 4 > PXtoVH(Number(persoCSS['left'].replace('px', '')))) {
                this.elem.style.left = (this.posX - this.speed) + 'vh'
            }

            if (this.posY + 5 < PXtoVH(Number(persoCSS['top'].replace('px', '')))) {
                this.elem.style.top = (this.posY + this.speed) + 'vh'
            } else if (this.posY + 4 > PXtoVH(Number(persoCSS['top'].replace('px', '')))) {
                this.elem.style.top = (this.posY - this.speed) + 'vh'
            }

            if (Math.abs(this.posX - PXtoVH(Number(persoCSS['left'].replace('px', '')))) < 1 && Math.abs(this.posY - PXtoVH(Number(persoCSS['top'].replace('px', '')))) < 1) {
                persoHIT()
            }
            setTimeout(() => {
                this.moveToPerso()
            }, 20)
        }
        create() {
            this.elem = document.createElement('div')
            enemyDIV.appendChild(this.elem)
            this.elem.classList.add('enemy')
            let img = document.createElement('img')
            img.setAttribute('src', this.skin)
            img.setAttribute('alt', this.constructor.name)
            img.style.height = '6vh'
            img.classList.add(this.constructor.name)
            this.elem.appendChild(img)
            this.elem.style.overflow = 'visible'

            this.spawn()
        }
        spawn() {
            let x = Math.floor(Math.random() * (96 - 7 + 1) + 7)
            let y = Math.floor(Math.random() * (94 - 5 + 1) + 5)
            if (Math.abs(Number(persoCSS['top'].replace('px', '')) - y) > 200 || Math.abs(Number(persoCSS['left'].replace('px', '')) - x) > 200) {
                this.elem.style.top = y + 'vh'
                this.elem.style.left = x + 'vh'
            } else {
                this.spawn()
            }
        }
        destroy() {
            if (this.life <= damageDEAL) {
                xp.add()
                roomMECHANTS.splice(roomMECHANTS.indexOf(this), 1)
                Object.getOwnPropertyNames(this).forEach(pName => {
                    delete this.pName;
                })
                this.elem.remove()
            } else {
                this.elem.classList.add('hit')
                setTimeout(()=>{
                    this.elem.classList.remove('hit')
                }, 250)
                this.life -= damageDEAL
                // this.elem.innerHTML = this.life
            }

        }
    }

    class goblin extends gnome {
        constructor() {
            super(3, 0.5, "../img/goblin.png")
        }
    }








    window.gnome = gnome
    window.goblin = goblin
    window.mechantCLASSlistes = [window.gnome, window.goblin]
    window.roomMECHANTS = []
    invulnerabilityPeriod = false

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
    function PXtoVH(nb) {
        return (nb / innerHeight) * 100
    }
    let xp = new xpCLASS
})