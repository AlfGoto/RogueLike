document.addEventListener('DOMContentLoaded', () => {

    let innerHeight = Number(window.getComputedStyle(mapAREA)['height'].replace('px', ''))
    window.innerHeight = innerHeight
    //resize
    addEventListener("resize", (event) => {
        innerHeight = Number(window.getComputedStyle(mapAREA)['height'].replace('px', ''))
        window.innerHeight = innerHeight
    });


    //PERSO
    let perso = document.getElementById('perso')
    window.perso = perso
    window.persoName = 'TOI'
    perso.innerHTML = "<div id='TOIDIV'><p id='T'>" + persoName[0] + '</p><p id="O">' + persoName[1] + '</p><p id="I">' + persoName[2] + '</p></div>'
    window.persoT = document.getElementById('T')
    window.persoO = document.getElementById('O')
    window.persoI = document.getElementById('I')
    window.persoCSS = window.getComputedStyle(perso)
    perso.style.left = '50 vh'
    perso.style.top = '50 vh'
    let persoROOM = 44
    let grid = document.getElementById('grid')
    window.persoDEAD = false
    window.autoclickON = false
    let persoLife = 3
    window.persoLife = persoLife





    //initialisation de la premiere salle
    function buildROOM(room) {
        // console.log(roomsinfo[room])
        mapAREA.innerHTML = /* "<p class='mapName'>room " + room + "</p> */ "<div id='roomArea'></div >"
        let portes = ''
        if (roomsinfo[room]['top']) { portes += "<div class='ptop portes'></div>" }
        if (roomsinfo[room]['bot']) { portes += "<div class='pbot portes'></div>" }
        if (roomsinfo[room]['left']) { portes += "<div class='pleft portes'></div>" }
        if (roomsinfo[room]['right']) { portes += "<div class='pright portes'></div>" }
        let roomArea = document.getElementById('roomArea')
        roomArea.innerHTML = portes

        //faire spawn les mobs
        roomMECHANTS = []
        if (!roomsinfo[room]['found']) {
            roomsinfo[room]['found'] = true

            spawnMECHANTSlvl1()
        }





        //mini map
        let square = grid.querySelector("[id='" + room + "']")
        square.classList.remove('hidden')
        square.classList.add('ROOMfound')
        if (roomsinfo[room]['top']) { grid.querySelector("[id='" + (room - 9) + "']").classList.remove('hidden') }
        if (roomsinfo[room]['bot']) { grid.querySelector("[id='" + (room + 9) + "']").classList.remove('hidden') }
        if (roomsinfo[room]['left']) { grid.querySelector("[id='" + (room - 1) + "']").classList.remove('hidden') }
        if (roomsinfo[room]['right']) { grid.querySelector("[id='" + (room + 1) + "']").classList.remove('hidden') }

        let temp = document.querySelectorAll('.ROOMin')
        temp.forEach((e) => {
            e.classList.remove('ROOMin')
        })
        square.classList.add('ROOMin')
    }
    function spawnMECHANTSlvl1() {
        let nbMECHANTS = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        // console.log(nbMECHANTS)
        for (let i = 0; i < nbMECHANTS; i++) {
            let rand = Math.floor(Math.random() * 2);
            // console.log('rand = ' + rand)
            if (rand == 0) { roomMECHANTS.push(new gnome); }
            if (rand == 1) { roomMECHANTS.push(new goblin); }
        }
    }



    // console.log(roomsinfo)
    buildROOM(persoROOM)



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
    let pPOSminX = 40
    let pPOSmaxX = 55
    let ptopPOSY = 6.5
    let pbotPOSY = 94.5

    let pxPOSminY = 40
    let pxPOSmaxY = 55
    let pleftPOSX = 8
    let prightPOSX = 93.5

    function zfonction() {
        setTimeout(() => {
            let top = PXtoVH(Number(persoCSS['top'].replace('px', '')))
            left = PXtoVH(Number(persoCSS['left'].replace('px', '')))
            top -= 0.5
            if (top < ptopPOSY) {
                if (left > pPOSmaxX || left < pPOSminX || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['top']) {
                    persoROOM -= 9
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
                if (left > pPOSmaxX || left < pPOSminX || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['bot']) {
                    persoROOM += 9
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
                if (top < pxPOSminY || top > pxPOSmaxY || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['right']) {
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
                if (top < pxPOSminY || top > pxPOSmaxY || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['left']) {
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
    window.mouseX = 0
    window.mouseY = 0
    document.onmousemove = (e) => {
        mouseX = e.pageX
        mouseY = e.pageY
        // console.log(mouseX + " / " + mouseY)
    }
})