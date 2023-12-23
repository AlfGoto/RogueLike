document.addEventListener('DOMContentLoaded', () => {


    //PERSO
    let perso = document.getElementById('perso')
    perso.innerHTML = '<p>TOI</p>'
    let persoCSS = window.getComputedStyle(perso)
    perso.style.left = Math.ceil(window.innerHeight / 2) + 'px'
    perso.style.top = Math.ceil(window.innerHeight / 2.50) + 'px'



    //MOUVEMENT
    let zBOOL = false;
    let sBOOL = false;
    let qBOOL = false;
    let dBOOL = false;


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

    //PORTES
    let pPOSminX = 46.5
    let pPOSmaxX = 93
    let ptopPOSY = 2.5
    let pbotPOSY = 90

    function zfonction() {
        setTimeout(() => {
            let top = (Number(persoCSS['top'].replace('px', '')) / window.innerHeight) * 100
            left = (Number(persoCSS['left'].replace('px', '')) / window.innerHeight) * 100
            top -= 0.5
            if (top < ptopPOSY) {
                if (left < pPOSmaxX && left > pPOSminX) {
                    let mapAREAtop = Number(window.getComputedStyle(mapAREA)['top'].replace('px', ''))
                    let VHinPX = window.innerHeight
                    if (mapAREAtop + VHinPX < 0) {
                        mapAREA.style.top = ((mapAREAtop + VHinPX)/window.innerHeight)*100 + 0.2 + 'vh'
                        perso.style.top = 82 + 'vh'
                        perso.style.left = 52 + 'vh'
                    }
                }
                return
            }
            perso.style.top = top + 'vh'
            if (zBOOL == true) {
                zfonction()
            }
        }, 7)
    }
    function sfonction() {
        setTimeout(() => {
            let top = Number(persoCSS['top'].replace('px', ''))
            top = (top / window.innerHeight) * 100
            top += 0.5
            if (top > pbotPOSY) {
                if (left < pPOSmaxX && left > pPOSminX) {
                    let mapAREAtop = Number(window.getComputedStyle(mapAREA)['top'].replace('px', ''))
                    let VHinPX = window.innerHeight
                    if (mapAREAtop - VHinPX > 0 - VHinPX*10) {
                        mapAREA.style.top = ((mapAREAtop - VHinPX)/window.innerHeight)*100 + 0.2 + 'vh'
                        perso.style.top = 82 + 'vh'
                        perso.style.left = 52 + 'vh'
                    }
                }
                return
            }
            perso.style.top = top + 'vh'
            if (sBOOL == true) {
                sfonction()
            }
        }, 7)
    }
    function dfonction() {
        setTimeout(() => {
            let top = Number(persoCSS['left'].replace('px', ''))
            top = (top / window.innerHeight) * 100
            top += 0.5
            if (top > 92) { return }
            perso.style.left = top + 'vh'
            if (dBOOL == true) {
                dfonction()
            }
        }, 7)
    }
    function qfonction() {
        setTimeout(() => {
            let top = Number(persoCSS['left'].replace('px', ''))
            top = (top / window.innerHeight) * 100
            top -= 0.5
            if (top < 6) { return }
            perso.style.left = top + 'vh'
            if (qBOOL == true) {
                qfonction()
            }
        }, 7)
    }

})