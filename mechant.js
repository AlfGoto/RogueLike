document.addEventListener('DOMContentLoaded', () => {
    console.log('mechant loaded')

    let enemyDIV = document.getElementById('DIVenemy')

    class gnome{
        constructor(){
            this.life = 3
            this.speed = 20

            this.elem = document.createElement('p')
            enemyDIV.appendChild(this.elem)
            this.elem.classList.add('enemy')

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

            let x = Math.floor(Math.random() * (96 - 7 + 1) + 7)
            let y = Math.floor(Math.random() * (94 - 5 + 1) + 5)
            if (Math.abs(Number(persoCSS['top'].replace('px', '')) - y) > 50 || Math.abs(Number(persoCSS['left'].replace('px', '')) - x) > 50) {
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
                this.life -= damageDEAL
                this.elem.innerHTML = this.life
            }

        }
    }








    window.gnome = gnome
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