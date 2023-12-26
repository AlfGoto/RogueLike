window.onload = () => {
    console.log('sword connected')




    let tirDiv = document.getElementById('TIR')
    let tirCount = 0
    window.persoCSS = window.getComputedStyle(perso)
    window.cooldown = false
    window.cooldownTime = 650
    window.radius = 20
    window.damageDEAL = 1
    let tirITERATION = 1
    let tirIterationCount = []
    let autoclickON = false;

    document.addEventListener('pointerdown', (e) => {
        if (e.which == 3) {
            autoclickON = !autoclickON
            console.log('autoclick = ' + autoclickON)
            autoclickFunction()
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
                tirFunction(tirCount, mouseY, mouseX)

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
        if (persoDEAD) { return }
        if (gamePAUSE) {
            setTimeout(autoclickFunction, cooldownTime + 1)
            return
        }
        setTimeout(() => {
            cooldown = false
        }, cooldownTime)
        cooldown = true

        tirCount++
        tirIterationCount[tirCount] = 0

        if (roomMECHANTS.length != 0) {
            posY = 10000
            posX = 10000
            roomMECHANTS.forEach((e) => {
                if(Math.abs(Number(window.getComputedStyle(e.elem)['top'].replace('px', '')) - Number(persoCSS['top'].replace('px', ''))) < Math.abs(posY -  Number(persoCSS['top'].replace('px', '')))
                && Math.abs(Number(window.getComputedStyle(e.elem)['left'].replace('px', '')) - Number(persoCSS['left'].replace('px', ''))) < Math.abs(posX -  Number(persoCSS['left'].replace('px', ''))))
                posY = Math.floor(Number(window.getComputedStyle(e.elem)['top'].replace('px', '')))
                posX = Math.floor(Number(window.getComputedStyle(e.elem)['left'].replace('px', '')))
            })
            tirFunction(tirCount, posY, posX)
        }

        setTimeout(autoclickFunction, cooldownTime + 1)
    }
    function tirFunction(id, mY, mX) {
        if (persoDEAD) { return }
        tirIterationCount[id]++

        //crée le missile
        tir = document.createElement('div')
        img = document.createElement('img')
        img.setAttribute('src', '../img/sword.png')
        img.style.height = '1.5vh'
        tir.appendChild(img)
        // tir = document.createElement('img')
        // tir.setAttribute('src', '../img/sword.png');
        tir.style.height = '2vh'
        tirDiv.appendChild(tir)
        tir.classList.add('tir')

        angle = Math.atan2(mX - Number(persoCSS['left'].replace('px', '')), - (mY - Number(persoCSS['top'].replace('px', '')))) * (180 / Math.PI);
        tir.style.transform = "rotate(" + (angle - 90) + "deg)";

        //le place et l'envoie
        tir.style.left = persoCSS['left']
        tir.style.top = persoCSS['top']

        lineY = mY - Number(persoCSS['top'].replace('px', ''))
        lineX = mX - Number(persoCSS['left'].replace('px', ''))
        hypothenuse = Math.sqrt((lineX * lineX) + (lineY * lineY))
        ratioY = (lineY / hypothenuse).toFixed(2)
        ratioX = (lineX / hypothenuse).toFixed(2)


        tirMouvment(tir, ratioY, ratioX)
    }
    function tirMouvment(obj, dirY, dirX) {
        // console.log(obj)
        setTimeout(() => {
            obj.style.top = (Number(obj.style.top.replace('px', '')) + 25 * dirY) + 'px'
            obj.style.left = (Number(obj.style.left.replace('px', '')) + 25 * dirX) + 'px'

            //detect if it HIT
            roomMECHANTS.forEach(e => {
                if (Math.abs(Number(window.getComputedStyle(obj)['top'].replace('px', '')) - Number(e.posY)) < radius &&
                    Math.abs(Number(window.getComputedStyle(obj)['left'].replace('px', '')) - Number(e.posX)) < radius) {
                    e.destroy()
                    obj.remove()
                }
            });

            if (PXtoVH(Number(obj.style.top.replace('px', ''))) < 5 || PXtoVH(Number(obj.style.top.replace('px', ''))) > 95 ||
                PXtoVH(Number(obj.style.left.replace('px', ''))) < 5 || PXtoVH(Number(obj.style.left.replace('px', ''))) > 95) {
                obj.remove()
            } else { tirMouvment(obj, dirY, dirX) }

        }, 10)
    }










    function PXtoVH(nb) {
        return (nb / innerHeight) * 100
    }
}