document.addEventListener('DOMContentLoaded', () => {
    console.log('mechant loaded')

    let enemyDIV = document.getElementById('DIVenemy')
    let enemytirDIV = document.getElementById('enemytirDIV')




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
            if (gamePAUSE) {
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
            img.style.position = 'relative'
            img.style.marginTop = '-50%'
            img.style.left = '-50%'
            img.classList.add(this.constructor.name)
            this.elem.appendChild(img)
            this.elem.style.overflow = 'visible'

            this.spawn()
        }
        spawn() {
            this.posX = Math.floor(Math.random() * (96 - 7 + 1) + 7)
            this.posY = Math.floor(Math.random() * (94 - 5 + 1) + 5)
            if (Math.abs(PXtoVH(Number(persoCSS['top'].replace('px', ''))) - this.posY) > 40 || Math.abs(PXtoVH(Number(persoCSS['left'].replace('px', ''))) - this.posX) > 40) {
                this.elem.style.top = this.posY + 'vh'
                this.elem.style.left = this.posX + 'vh'
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
                setTimeout(() => {
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


    class turret {
        constructor(life = 3, bullets = 1, skin = "../img/turret.png") {
            this.life = life
            this.skin = skin
            this.bullets = bullets
            this.bulletsConstant = true


            this.create()
            // console.log(this.constructor.name + ' = ' + this.speed)
            this.bulletFunction(this.bullets)
            this.bulletAuto()
        }
        bulletAuto() {
            setTimeout(() => {
                if (!this.bulletsConstant) { return }
                this.bulletFunction(this.bullets)
                this.bulletAuto()
            }, 2000)
        }
        bulletFunction(nbtirs) {
            nbtirs--
            if (persoDEAD) { return }

            //crée le missile
            let bullet = document.createElement('div')
            bullet.style.position = 'absolute'
            bullet.style.height = '2vh'
            bullet.style.width = '2vh'
            bullet.style.backgroundColor = 'red'
            bullet.style.borderRadius = '50%'
            bullet.style.zIndex = '35'
            enemytirDIV.appendChild(bullet)

            //le place et l'envoie
            bullet.style.left = this.posX + 'vh'
            bullet.style.top = this.posY + 'vh'

            let lineY = PXtoVH(Number(persoCSS['top'].replace('px', ''))) - this.posY
            let lineX = PXtoVH(Number(persoCSS['left'].replace('px', ''))) - this.posX
            let hypothenuse = Math.sqrt((lineX * lineX) + (lineY * lineY))
            let ratioY = (lineY / hypothenuse).toFixed(2)
            let ratioX = (lineX / hypothenuse).toFixed(2)


            this.bulletMouvment(bullet, ratioY, ratioX)

            if (nbtirs > 0) {
                setTimeout(() => {
                    this.bulletFunction(nbtirs)
                }, 100)
            }
        }
        bulletMouvment(obj, dirY, dirX) {
            // console.log(obj)
            setTimeout(() => {
                obj.style.top = (Number(obj.style.top.replace('vh', '')) + 1 * dirY) + 'vh'
                obj.style.left = (Number(obj.style.left.replace('vh', '')) + 1 * dirX) + 'vh'

                // console.log('bulletX = ' + this.posX)
                if (Math.abs(Number(obj.style.top.replace('vh', '')) - PXtoVH(Number(persoCSS['top'].replace('px', '')))) < 2 &&
                    Math.abs(Number(obj.style.left.replace('vh', '')) - PXtoVH(Number(persoCSS['left'].replace('px', '')))) < 2) {
                    persoHIT()
                    obj.remove()
                }

                if (Number(obj.style.top.replace('vh', '')) < 5 || Number(obj.style.top.replace('vh', '')) > 95 ||
                    Number(obj.style.left.replace('vh', '')) < 5 || Number(obj.style.left.replace('vh', '')) > 95) {
                    obj.remove()
                } else { this.bulletMouvment(obj, dirY, dirX) }

            }, 12)
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
            img.style.position = 'relative'
            img.style.marginTop = '-50%'
            img.style.left = '-50%'
            this.elem.appendChild(img)
            this.elem.style.overflow = 'visible'

            this.spawn()
        }
        spawn() {
            this.posX = Math.floor(Math.random() * (90 - 10 + 1) + 10)
            this.posY = Math.floor(Math.random() * (90 - 10 + 1) + 10)
            if (Math.abs(PXtoVH(Number(persoCSS['top'].replace('px', ''))) - this.posY) > 40 || Math.abs(PXtoVH(Number(persoCSS['left'].replace('px', ''))) - this.posX) > 40) {
                this.elem.style.top = this.posY + 'vh'
                this.elem.style.left = this.posX + 'vh'
            } else {
                this.spawn()
            }
        }
        destroy() {
            if (this.life <= damageDEAL) {
                this.bulletsConstant = false
                xp.add()
                roomMECHANTS.splice(roomMECHANTS.indexOf(this), 1)
                Object.getOwnPropertyNames(this).forEach(pName => {
                    delete this.pName;
                })
                this.elem.remove()
            } else {
                this.elem.classList.add('hit')
                setTimeout(() => {
                    this.elem.classList.remove('hit')
                }, 250)
                this.life -= damageDEAL
                // this.elem.innerHTML = this.life
            }

        }
    }

    class biggerTurret extends turret{
        constructor() {
            super(3, 3, "../img/biggerTurret.png")
        }
    }




    window.biggerTurret = biggerTurret
    window.turret = turret
    window.gnome = gnome
    window.goblin = goblin
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
    let xp = new xpCLASS()
    function PXtoVH(nb) {
        return (nb / innerHeight) * 100
    }
})