window.onload = () => {
    console.log('bazooka connected')




    let tirDiv = document.getElementById('TIR')
    let tirCount = 0
    let remnantDIV = document.getElementById('DIVremnant')
    window.persoCSS = window.getComputedStyle(perso)
    window.cooldown = false
    window.cooldownTime = 1000
    window.explodeRadius = 50
    window.damageDEAL = 1
    let tirITERATION = 1
    let tirIterationCount = []
    let currentLetter = -1
    let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let onno = ['PAF', 'PIF', 'BANG', 'POUF', 'BING', 'BAM', 'BIM', 'BOUM', 'DA', 'TA', 'RA']




    window.addEventListener('pointerdown', (e) => {
        if (e.which == 3) {
            autoclickON = !autoclickON
            autoclickFunction()
            // console.log('autoclick = ' + autoclickON)
        }
        if (e.which == 1) {
            if (gamePAUSE) { return }
            if (cooldown == false) {
                setTimeout(() => {
                    cooldown = false
                }, cooldownTime)
                cooldown = true

                tirCount++
                tirIterationCount[tirCount] = 0
                tirFunction(tirCount)

            } else {
                perso.style.color = 'gray'
                setTimeout(() => {
                    perso.style.color = 'black'
                }, 100)
            }
        }
    })





    function autoclickFunction() {
        if (persoDEAD) { return }
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

            tirCount++
            tirIterationCount[tirCount] = 0
            tirFunction(tirCount)



        } else {
            perso.style.color = 'gray'
            setTimeout(() => {
                perso.style.color = 'black'
            }, 100)
        }
        setTimeout(autoclickFunction, cooldownTime + 1)
    }

    //BAZOOKA
    function tirFunction(id) {
        if (persoDEAD) { return }
        tirIterationCount[id]++

        //crée le missile
        tir = document.createElement('p')
        tirDiv.appendChild(tir)
        tir.innerHTML = randomOnno().toLowerCase()
        tir.classList.add('tir')

        //le place et l'envoie
        tir.style.left = persoCSS['left']
        tir.style.top = persoCSS['top']
        let distance = speedCalcul(Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), mouseX, mouseY, 10)
        tirMovment(tir, Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), mouseX, mouseY, 0, distance)

        if (tirIterationCount[id] != tirITERATION) {
            setTimeout(() => {
                tirFunction(id)
            }, 50)
        } else { tirIterationCount.splice(id, 1) }
    }
    function finMovment(obj) {
        //animation de fin de mouvement
        obj.innerHTML = nextLetter()
        obj.style.animation = 'explode 0.5s linear'

        //detect if it HIT
        roomMECHANTS.forEach(e => {
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
        }, 30000)
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
            } else {
                if (PXtoVH(Number(obj.style.top.replace('px', ''))) < -20 || PXtoVH(Number(obj.style.top.replace('px', ''))) > 120 ||
                    PXtoVH(Number(obj.style.left.replace('px', ''))) < -20 || PXtoVH(Number(obj.style.left.replace('px', ''))) > 120) {
                    obj.remove()
                } else { tirMovment(obj, depX, depY, ariX, ariY, count, distance) }
            }
        }, 10)
    }



    function PXtoVH(nb) {
        return (nb / innerHeight) * 100
    }
}