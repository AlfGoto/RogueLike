document.addEventListener('DOMContentLoaded', () => {
    let mapAREA = document.getElementById('mapAREA')
    window.listeNB = []
    window.rooms = []

    for (let i = 0; i < 100; i++) {
        temp = []
        if (i < 10) { temp['top'] = true } else { temp['top'] = false }
        if (i > 89) { temp['bot'] = true } else { temp['bot'] = false }
        if (i % 10 == 0) { temp['left'] = true } else { temp['left'] = false }
        if (i % 10 == 9) { temp['right'] = true } else { temp['right'] = false }
        listeNB.push(temp)
    }

    window.nbROOMS = Math.floor(Math.random() * (10 - 5 + 1) + 5)
    // console.log(nbROOMS)

    roomsleft = []
    roombasegenerate = []
    for (let i = 0; i < 100; i++) {
        roomsleft.push(i)
    }


    //commencer par la room 55. Prendre une des rooms a coté au pif pour la suivante. Puis prendre une des rooms a coté d'une des rooms déja générée qui n'est pas deja générée
    //Generer les mobs et plus tard les structures
    console.log('nombre de rooms = ' + nbROOMS)
    for (let i = 0; i < nbROOMS; i++) {
        if (i == 0) {
            room = 55
            temp = []
            temp['id'] = room
            rooms.push(temp)
            roomsleft.splice(room, 1)
        } else {
            room = nextroomfunction()
            // console.log(room)
        }


        //fait une temp array des rooms autour possibles
        temp = []
        if (roomsleft.includes(room - 10) && room > 9) { temp.push(room - 10) }
        if (roomsleft.includes(room + 10) && room < 90) { temp.push(room + 10) }
        if (roomsleft.includes(room - 1) && room % 10 != 0) { temp.push(room - 1) }
        if (roomsleft.includes(room + 1) && room % 10 != 9) { temp.push(room + 1) }
        if (temp.length == 0) {
            // console.log('continue')
            i--
            continue
        }

        roomadded = temp[Math.floor(Math.random() * temp.length)]
        temp = []
        temp['id'] = roomadded
        console.log(roomadded)
        rooms.push(temp)
        roomsleft.splice(roomsleft.indexOf(roomadded), 1)

        roombasegenerate.push(room)
    }




    function nextroomfunction() {
        let nextroom = rooms[Math.floor(Math.random() * rooms.length)]['id']
        if (roombasegenerate.includes(nextroom)) {
            if (Math.random() < 0.9) { return nextroomfunction() } else { return nextroom }
        } else {
            return nextroom
        }
    }


})