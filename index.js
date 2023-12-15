document.addEventListener('DOMContentLoaded', () => {
    console.log('connected to index.JS')
    let perso = document.getElementById('perso')
    let persoCSS = window.getComputedStyle(perso)
    let tirDiv = document.getElementById('TIR')
    let zBOOL = false;
    let sBOOL = false;
    let qBOOL = false;
    let dBOOL = false;
    let tirCount = 0
    let currentLetter = -1
    let alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let onno = ['PAF', 'PIF', 'BANG', 'POUF', 'BING', 'BAM', 'BIM', 'BOUM', 'DA', 'TA', 'RA']


    window.addEventListener('pointerdown', (e) => {
        tirCount++
        // let x = e.pageX //left
        // let y = e.pageY //top
        tir = document.createElement('p')
        tirDiv.appendChild(tir)
        tir.innerHTML = randomOnno().toLowerCase()
        tir.classList.add('tir')
        tir.setAttribute("id", tirCount)
        tir.style.left = Number(persoCSS['left'].replace('px', '')) + 'px'
        tir.style.top = Number(persoCSS['top'].replace('px', '')) + 'px'

        let distance = speedCalcul(Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), e.pageX, e.pageY, 30)
        tirMovment(tir, Number(persoCSS['left'].replace('px', '')), Number(persoCSS['top'].replace('px', '')), e.pageX, e.pageY, 0, distance)
    })


    function finMovment(obj) {
        obj.innerHTML = nextLetter()
        obj.style.animation = 'explode 0.5s linear'
        setTimeout(() => {
            obj.remove()
            return
        }, 500)
    }
    function nextLetter() {
        if (currentLetter == 25) { currentLetter = 0 } else { currentLetter++ }
        return alph[currentLetter]
    }
    function randomOnno(){
        return onno[Math.floor(Math.random() * ((onno.length -1) - 0 + 1) + 0)]
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



        console.log(distance)
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


    window.addEventListener('keydown', function (e) {
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
            if (top > 700) { return }
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
            if (top > 1495) { return }
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