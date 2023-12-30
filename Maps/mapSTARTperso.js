document.addEventListener('DOMContentLoaded', () => {
    let roomArea = document.getElementById('roomArea')

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
    let persoROOM = 40
    let grid = document.getElementById('grid')
    window.persoDEAD = false
    window.autoclickON = false
    let persoLife = 3
    window.persoLife = persoLife
    window.mooveSpeed = 0.5


    //POWER UP 
    let powerupDIV = document.getElementById('powerupDIV')
    let powerupArray = []
    window.gamePAUSE = false
    let powerupTitle = document.getElementById('powerupTitle')
    let powerupMenuPAUSE = true

    let CSS = getComputedStyle(document.documentElement)

    //XP
    window.lvlP = document.getElementById('lvl')
    window.xpCount = 0
    window.lvl = 1
    window.xpNeeded = 10
    window.xpPROGRESS = document.getElementById('xpPROGRESS')

    //Pause
    let pauseDIV = document.getElementById('pauseDIV')
    let pauseStatsDIV = document.getElementById('pauseStatsDIV')

    //treasure ROOM
    let TreasureTaken = false
    let didtreasuremm = false

    //boss ROOM
    let didbossmm = false





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
        if (!roomsinfo[room]['found'] && !roomsinfo[room]['treasure'] && !roomsinfo[room]['boss']) {
            roomsinfo[room]['found'] = true
            spawnMECHANTSlvl1()
        }
        if (roomsinfo[room]['treasure']) {
            roomArea.innerHTML += "<div id='treasureDIV'><div class='externSquare'></div><div class='middleSquare'></div><div class='internSquare'></div><div class='externSquare duplicate'></div><div class='middleSquare duplicate'></div><div class='internSquare duplicate'></div><div class='autel'></div><img src='../img/runic text3.png' id='externText' alt='some strange rune text'><img src='../img/runic text2.png' id='middleText' alt='some strange rune text'><img src='../img/runic text1.png' id='internText' alt='some strange rune text'></div>"
            if (!TreasureTaken) { treasureCheck() }
        }



        //mini map
        let square = grid.querySelector("[id='" + room + "']")
        square.classList.remove('hidden')
        square.classList.add('ROOMfound')
        if (roomsinfo[room]['treasure']) { square.classList.add('treasureFOUND') }
        if (roomsinfo[room]['boss']) { square.classList.add('bossFOUND') }
        if (roomsinfo[room]['top']) { grid.querySelector("[id='" + (room - 9) + "']").classList.remove('hidden') }
        if (roomsinfo[room]['bot']) { grid.querySelector("[id='" + (room + 9) + "']").classList.remove('hidden') }
        if (roomsinfo[room]['left']) { grid.querySelector("[id='" + (room - 1) + "']").classList.remove('hidden') }
        if (roomsinfo[room]['right']) { grid.querySelector("[id='" + (room + 1) + "']").classList.remove('hidden') }
        if (room - 9 in roomsinfo) { if (roomsinfo[room - 9]['treasure']) { grid.querySelector("[id='" + (room - 9) + "']").classList.add('treasureNOTFOUND'); chestOnMinimap() } }
        if (room + 9 in roomsinfo) { if (roomsinfo[room + 9]['treasure']) { grid.querySelector("[id='" + (room + 9) + "']").classList.add('treasureNOTFOUND'); chestOnMinimap() } }
        if (room - 1 in roomsinfo) { if (roomsinfo[room - 1]['treasure']) { grid.querySelector("[id='" + (room - 1) + "']").classList.add('treasureNOTFOUND'); chestOnMinimap() } }
        if (room + 1 in roomsinfo) { if (roomsinfo[room + 1]['treasure']) { grid.querySelector("[id='" + (room + 1) + "']").classList.add('treasureNOTFOUND'); chestOnMinimap() } }
        if (room - 9 in roomsinfo) { if (roomsinfo[room - 9]['boss']) { grid.querySelector("[id='" + (room - 9) + "']").classList.add('bossNOTFOUND'); bossOnMinimap() } }
        if (room + 9 in roomsinfo) { if (roomsinfo[room + 9]['boss']) { grid.querySelector("[id='" + (room + 9) + "']").classList.add('bossNOTFOUND'); bossOnMinimap() } }
        if (room - 1 in roomsinfo) { if (roomsinfo[room - 1]['boss']) { grid.querySelector("[id='" + (room - 1) + "']").classList.add('bossNOTFOUND'); bossOnMinimap() } }
        if (room + 1 in roomsinfo) { if (roomsinfo[room + 1]['boss']) { grid.querySelector("[id='" + (room + 1) + "']").classList.add('bossNOTFOUND'); bossOnMinimap() } }



        let temp = document.querySelectorAll('.ROOMin')
        temp.forEach((e) => {
            e.classList.remove('ROOMin')
        })
        square.classList.add('ROOMin')
    }
    function spawnMECHANTSlvl1() {
        let nbMECHANTS = Math.floor(Math.random() * (6 - 3 + 1) + 3)
        // console.log(nbMECHANTS)
        for (let i = 0; i < nbMECHANTS; i++) {
            let rand = Math.floor(Math.random() * 2);
            // console.log('rand = ' + rand)
            if (rand == 0) { roomMECHANTS.push(new gnome); }
            if (rand == 1) { roomMECHANTS.push(new goblin); }
        }
    }



    function treasureCheck() {
        setTimeout(() => {
            if (Math.abs(PXtoVH(Number(persoCSS['top'].replace('px', ''))) - 50) < 2 && Math.abs(PXtoVH(Number(persoCSS['left'].replace('px', ''))) - 50) < 2) {
                console.log('TREASURE')
                TreasureTaken = true
                powerupMenu()
            } else { treasureCheck() }
        }, 10)
    }
    function chestOnMinimap() {
        if (didtreasuremm) { return }
        didtreasuremm = true
        let chestroom = grid.querySelector(".treasureNOTFOUND")
        let img = document.createElement('img')
        img.setAttribute('src', '../img/chest.png')
        img.style.height = 2 + 'vh'
        chestroom.appendChild(img)
    }
    function bossOnMinimap() {
        if (didbossmm) { return }
        didbossmm = true
        let bossroom = grid.querySelector(".bossNOTFOUND")
        let img = document.createElement('img')
        img.setAttribute('src', '../img/boss.png')
        img.style.height = 2 + 'vh'
        bossroom.appendChild(img)
    }
    // console.log(roomsinfo)
    buildROOM(persoROOM)














    class xpCLASS {
        add() {
            xpCount++
            // console.log('xp = ' + xpCount + '     xpNeeded for lvl ' + lvl + ' = ' + xpNeeded * (1.25 * lvl))
            xpPROGRESS.style.left = ((xpCount / (xpNeeded * (1.25 * lvl))) * 100) - 100 + '%'
            if (xpNeeded * (1.25 * lvl) <= xpCount) {
                window.gamePAUSE = true
                xpPROGRESS.style.left = '100%'
                // console.log('LVL UP')
                lvl++
                lvlP.innerHTML = 'level ' + lvl
                xpCount = 0
                powerupMenu()
            }
        }
    }
    window.xpCLASS = xpCLASS

    class powerup {
        constructor(n, d, func) {

            this.lvl = 0
            this.elem = document.createElement('div')
            powerupDIV.appendChild(this.elem)
            this.elem.classList.add('powerupDIVS')

            this.nameP = document.createElement('h3')
            this.elem.appendChild(this.nameP)
            this.nameP.innerHTML = n
            this.descriptionP = document.createElement('p')
            this.elem.appendChild(this.descriptionP)
            this.descriptionP.innerHTML = d

            this.elem.addEventListener('click', func)
            this.elem.classList.add('hidden')
        }
    }

    function powerupMenu() {
        gamePAUSE = true
        // console.log('Pupmenu Oppening...')
        powerupTitle.classList.remove('hidden')
        let tempARR = [...powerupArray]
        // console.log(tempARR)

        //First element
        tempKey = Math.floor(Math.random() * ((tempARR.length - 1) - 0 + 1) + 0)
        let tempOne = tempARR[tempKey]
        tempARR.splice(tempKey, 1)
        // console.log(tempARR)
        tempOne.elem.style.left = '2.5vhw'
        tempOne.elem.classList.remove('hidden')

        //Second element
        tempKey = Math.floor(Math.random() * ((tempARR.length - 1) - 0 + 1) + 0)
        let tempTwo = tempARR[tempKey]
        tempARR.splice(tempKey, 1)
        // console.log(tempARR)
        tempTwo.elem.style.left = '32.5vh'
        tempTwo.elem.classList.remove('hidden')

        //Third element
        tempKey = Math.floor(Math.random() * ((tempARR.length - 1) - 0 + 1) + 0)
        let tempThree = tempARR[tempKey]
        tempARR.splice(tempKey, 1)
        // console.log(tempARR)
        tempThree.elem.style.left = '65vh'
        tempThree.elem.classList.remove('hidden')

        setTimeout(() => {
            powerupMenuPAUSE = false
        }, 1000)
    }

    function closepowerupMenu() {
        gamePAUSE = false
        // console.log('menu closed')
        powerupTitle.classList.add('hidden')
        tempARR = document.querySelectorAll('.powerupDIVS')
        tempARR.forEach(e => {
            if (!e.classList.contains('hidden')) { e.classList.add('hidden') }
        })
        window.gamePAUSE = false
        powerupMenuPAUSE = true
    }



    powerupArray.push(MOREBULLETs = new powerup('I Need More Bullets', 'Get one more shot everytime you shoot', () => {
        if (powerupMenuPAUSE) { return }

        MOREBULLETs.lvl++
        window.tirITERATION++

        closepowerupMenu()
    }))

    powerupArray.push(QuickReading = new powerup('Quick Reading', 'Shoot faster by 15%', () => {
        if (powerupMenuPAUSE) { return }

        QuickReading.lvl++
        window.cooldownTime -= window.cooldownTime * 0.15

        closepowerupMenu()
    }))

    powerupArray.push(betterFASTERstronger = new powerup('betterFASTERstronger', 'Move faster !', () => {
        if (powerupMenuPAUSE) { return }

        betterFASTERstronger.lvl++
        mooveSpeed = mooveSpeed * 1.50

        closepowerupMenu()
    }))

    powerupArray.push(HealingSorcery = new powerup('Healing Sorcery', "Doctissimo ou l'excellent 'appliquer un bandage pour les nuls' de Joseph Mourigno. Bref +1pv", () => {
        if (powerupMenuPAUSE) { return }

        HealingSorcery.lvl++
        persoLife++
        if (persoLife == 2) { persoO.classList.remove('hidden') } else if (persoLife == 3) { persoI.classList.remove('hidden') }

        closepowerupMenu()
    }))

    powerupArray.push(BiggerExplosions = new powerup('BIGGER', "Bigger explosions, BIGGER BIGGER BIGGER (augment radius by the first value it had at the start)", () => {
        if (powerupMenuPAUSE) { return }

        BiggerExplosions.lvl++
        window.radius = Math.ceil(radius * 1.25)
        window.taille = Math.ceil(taille * 1.25)
        let radiusForCSS = Math.ceil(Number(CSS.getPropertyValue('--explode-radius1').replace('%', '')) * 1.25);

        document.documentElement.style.setProperty('--explode-radius1', radiusForCSS + '%');
        radiusForCSS = Math.ceil(radiusForCSS * 1.25)
        document.documentElement.style.setProperty('--explode-radius2', radiusForCSS + '%');
        radiusForCSS = Math.ceil(radiusForCSS * 1.25)
        document.documentElement.style.setProperty('--explode-radius3', radiusForCSS + '%');
        radiusForCSS = Math.ceil(radiusForCSS * 1.25)
        document.documentElement.style.setProperty('--explode-radius4', radiusForCSS + '%');
        radiusForCSS = Math.ceil(radiusForCSS * 1.25)
        document.documentElement.style.setProperty('--explode-radius5', radiusForCSS + '%');

        closepowerupMenu()
    }))

    powerupArray.push(MoreDamage = new powerup('I NEED MORE DAMAGE', 'Deal one more damage each shot', () => {
        if (powerupMenuPAUSE) { return }

        MoreDamage.lvl++
        damageDEAL++

        closepowerupMenu()
    }))



    function pausestatsmenuBUILD() {
        pauseStatsDIV.innerHTML = ''
        powerupArray.forEach(function (e) {
            // console.log(e)
            if (e.lvl != 0) {
                pauseStatsDIV.innerHTML += "<div id='" + e.nameP.innerHTML + "'></div>"
                let s = document.getElementById(e.nameP.innerHTML)
                s.style.display = 'flex'
                s.style.width = '100%'
                let s1 = document.createElement('p')
                let s2 = document.createElement('p')
                pauseStatsDIV.appendChild(s)
                s.appendChild(s1)
                s.appendChild(s2)
                s1.innerHTML = e.nameP.innerHTML + " levels"
                s2.innerHTML = ': ' + e.lvl
            }
        })
    }






























    //MOUVEMENT
    let zBOOL = false;
    let sBOOL = false;
    let qBOOL = false;
    let dBOOL = false;

    window.addEventListener('keydown', function (e) {
        if (e.key == 'Escape') {
            gamePAUSE = !gamePAUSE
            if (gamePAUSE == false) { pauseDIV.classList.add('hidden') } else {
                pauseDIV.classList.remove('hidden')
                pausestatsmenuBUILD()
            }
            // console.log('ESCAPE')
            return
        }
        if (gamePAUSE) { return }
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
            if (qBOOL || dBOOL) { top -= mooveSpeed * 0.7 } else { top -= mooveSpeed }


            //room change
            if (top < ptopPOSY) {
                if (left > pPOSmaxX || left < pPOSminX || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['top']) {
                    persoROOM -= 9
                    perso.style.top = 82 + 'vh'
                    perso.style.left = 52 + 'vh'
                    buildROOM(persoROOM)
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
            if (qBOOL || dBOOL) { top += mooveSpeed * 0.7 } else { top += mooveSpeed }

            //room change
            if (top > pbotPOSY) {
                if (left > pPOSmaxX || left < pPOSminX || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['bot']) {
                    persoROOM += 9
                    perso.style.top = 8 + 'vh'
                    perso.style.left = 52 + 'vh'
                    buildROOM(persoROOM)
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
            if (zBOOL || sBOOL) { left += mooveSpeed * 0.7 } else { left += mooveSpeed }

            //room change
            if (left > prightPOSX) {
                if (top < pxPOSminY || top > pxPOSmaxY || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['right']) {
                    persoROOM += 1
                    perso.style.top = 48 + 'vh'
                    perso.style.left = 13 + 'vh'
                    buildROOM(persoROOM)
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
            if (zBOOL || sBOOL) { left -= mooveSpeed * 0.7 } else { left -= mooveSpeed }

            //room change
            if (left < pleftPOSX) {
                if (top < pxPOSminY || top > pxPOSmaxY || roomMECHANTS.length != 0) { return }
                if (roomsinfo[persoROOM]['left']) {
                    persoROOM -= 1
                    perso.style.top = 48 + 'vh'
                    perso.style.left = 83 + 'vh'
                    buildROOM(persoROOM)
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
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

})