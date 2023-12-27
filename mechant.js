document.addEventListener('DOMContentLoaded', () => {
    console.log('mechant loaded')

    let enemyDIV = document.getElementById('DIVenemy')

    class gnome {
        constructor(life = 5, speed = 20, skin = "../img/gnome.png") {
            this.life = life
            this.speed = speed/2
            this.skin = skin



            this.create()
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

            if (Math.abs(this.posX - Number(persoCSS['left'].replace('px', ''))) < 20 && Math.abs(this.posY - Number(persoCSS['top'].replace('px', ''))) < 20) {
                persoHIT()
            }
            setTimeout(() => {
                this.moveToPerso()
            }, this.speed)
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
                //xpADD()
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
            super(3, 10, "../img/goblin.png")
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
})