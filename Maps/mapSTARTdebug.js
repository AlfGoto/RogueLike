document.addEventListener('DOMContentLoaded', () => {
    let mapAREA = document.getElementById('mapAREA')
    let innerHeight = Number(window.getComputedStyle(mapAREA)['height'].replace('px', ''))



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

    persoROOM = 55
    buildROOM(persoROOM)

    document.addEventListener('keydown', (e) => {
        if (e.key == 'o') {
            persoROOM -= 10
            buildROOM(persoROOM)
            perso.style.top = 82 + 'vh'
            perso.style.left = 52 + 'vh'
        }
        if (e.key == 'l') {
            persoROOM += 10
            buildROOM(persoROOM)
            perso.style.top = 8 + 'vh'
            perso.style.left = 52 + 'vh'
        }
        if (e.key == 'k') {
            persoROOM -= 1
            buildROOM(persoROOM)
            perso.style.top = 48 + 'vh'
            perso.style.left = 83 + 'vh'
        }
        if (e.key == 'm') {
            persoROOM += 1
            buildROOM(persoROOM)
            perso.style.top = 48 + 'vh'
            perso.style.left = 13 + 'vh'
        }
    })


    document.addEventListener('click', (e) => {
        //console.log('innerHeight = ' + innerHeight)
        console.log((e.pageY / innerHeight) * 100)
    })


})