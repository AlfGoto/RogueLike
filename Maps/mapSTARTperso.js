document.addEventListener('DOMContentLoaded', () => {
    let innerHeight = Number(window.getComputedStyle(mapAREA)['height'].replace('px', ''))
    let persoROOM = 55


    //initialisation de la premiere salle
    function buildROOM(room) {
        mapAREA.innerHTML = "<p class='mapName'>room " + room + "</p><div id='roomArea'></div >"
        let portes = ''
        if (!listeNB[room]['top']) { portes += "<div class='ptop'></div>" }
        if (!listeNB[room]['bot']) { portes += "<div class='pbot'></div>" }
        if (!listeNB[room]['left']) { portes += "<div class='pleft'></div>" }
        if (!listeNB[room]['right']) { portes += "<div class='pright'></div>" }
        let roomArea = document.getElementById('roomArea')
        roomArea.innerHTML = portes
    }

    // console.log(listeNB)
    buildROOM(55)


    //PERSO
    let perso = document.getElementById('perso')
    perso.innerHTML = '<p>TOI</p>'
    let persoCSS = window.getComputedStyle(perso)
    perso.style.left = '50 vh'
    perso.style.top = '50 vh'


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
    let pPOSminX = 46
    let pPOSmaxX = 60
    let ptopPOSY = 2.5
    let pbotPOSY = 90

    let pxPOSminY = 42
    let pxPOSmaxY = 60
    let pleftPOSX = 6
    let prightPOSX = 92

    function zfonction() {
        setTimeout(() => {
            let top = PXtoVH(Number(persoCSS['top'].replace('px', '')))
            left = PXtoVH(Number(persoCSS['left'].replace('px', '')))
            top -= 0.5
            if (top < ptopPOSY) {
                if (left > pPOSmaxX || left < pPOSminX) { return }
                if (!listeNB[persoROOM]['top']) {
                    persoROOM -= 10
                    buildROOM(persoROOM)
                    perso.style.top = 82 + 'vh'
                    perso.style.left = 52 + 'vh'
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
            let top = PXtoVH(Number(persoCSS['top'].replace('px', '')))
            left = PXtoVH(Number(persoCSS['left'].replace('px', '')))
            top += 0.5
            if (top > pbotPOSY) {
                if (left > pPOSmaxX || left < pPOSminX) { return }
                if (!listeNB[persoROOM]['bot']) {
                    persoROOM += 10
                    buildROOM(persoROOM)
                    perso.style.top = 8 + 'vh'
                    perso.style.left = 52 + 'vh'
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
            let left = PXtoVH(Number(persoCSS['left'].replace('px', '')))
            let top = PXtoVH(Number(persoCSS['top'].replace('px', '')))
            left += 0.5
            if (left > prightPOSX) {
                if (top < pxPOSminY || top > pxPOSmaxY) { return }
                if (!listeNB[persoROOM]['right']) {
                    persoROOM += 1
                    buildROOM(persoROOM)
                    perso.style.top = 48 + 'vh'
                    perso.style.left = 13 + 'vh'
                }
                return
            }
            perso.style.left = left + 'vh'
            if (dBOOL == true) {
                dfonction()
            }
        }, 7)
    }
    function qfonction() {
        setTimeout(() => {
            let left = PXtoVH(Number(persoCSS['left'].replace('px', '')))
            let top = PXtoVH(Number(persoCSS['top'].replace('px', '')))
            left -= 0.5
            if (left < pleftPOSX) {
                if (top < pxPOSminY || top > pxPOSmaxY) { return }
                if (!listeNB[persoROOM]['left']) {
                    persoROOM -= 1
                    buildROOM(persoROOM)
                    perso.style.top = 48 + 'vh'
                    perso.style.left = 83 + 'vh'
                }
                return
            }
            perso.style.left = left + 'vh'
            if (qBOOL == true) {
                qfonction()
            }
        }, 7)
    }



    function PXtoVH(nb) {
        return (nb / innerHeight) * 100
    }
})