document.addEventListener('DOMContentLoaded', () => {
    window.rooms = []


    window.nbROOMS = Math.floor(Math.random() * (10 - 5 + 1) + 5)
    // console.log(nbROOMS)

    roomsleft = []
    roombasegenerate = []
    for (let i = 0; i < 81; i++) {
        roomsleft.push(i)
    }


    //commencer par la room 55. Prendre une des rooms a coté au pif pour la suivante. Puis prendre une des rooms a coté d'une des rooms déja générée qui n'est pas deja générée
    //Generer les mobs et plus tard les structures
    console.log('nombre de rooms = ' + nbROOMS)
    for (let i = 0; i < nbROOMS; i++) {
        if (i == 0) {
            room = 44
            temp = []
            temp['id'] = room
            rooms.push(room)
            roomsleft.splice(room, 1)
        } else {
            room = nextroomfunction()
            // console.log(room)
        }


        //fait une temp array des rooms autour possibles
        temp = []
        if (roomsleft.includes(room - 9) && room > 8) { temp.push(room - 9) }
        if (roomsleft.includes(room + 9) && room < 72) { temp.push(room + 9) }
        if (roomsleft.includes(room - 1) && room % 9 != 0) { temp.push(room - 1) }
        if (roomsleft.includes(room + 1) && room % 9 != 8) { temp.push(room + 1) }
        if (temp.length == 0) {
            // console.log('continue')
            i--
            continue
        }

        roomadded = temp[Math.floor(Math.random() * temp.length)]
        // console.log(roomadded)
        rooms.push(roomadded)
        roomsleft.splice(roomsleft.indexOf(roomadded), 1)

        roombasegenerate.push(room)
    }

    // console.log(rooms)



    function nextroomfunction() {
        let nextroom = rooms[Math.floor(Math.random() * rooms.length)]
        if (roombasegenerate.includes(nextroom)) {
            if (Math.random() < 0.9) { return nextroomfunction() } else { return nextroom }
        } else {
            return nextroom
        }
    }






    //Donner les infos pour chaques salles
    window.roomsinfo = []
    rooms.forEach(element => {
        temp = []
        if (rooms.includes(element - 9)) { temp['top'] = true } else { temp['top'] = false }
        if (rooms.includes(element + 9)) { temp['bot'] = true } else { temp['bot'] = false }
        if (rooms.includes(element - 1)) { temp['left'] = true } else { temp['left'] = false }
        if (rooms.includes(element + 1)) { temp['right'] = true } else { temp['right'] = false }
        roomsinfo[element] = temp
        // console.log(element)
    });
    // console.log(roomsinfo)




    //build minimap
    let grid = document.getElementById('grid');

    for (let i = 0; i < 81; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        square.id = i;
        square.classList.add('hidden')
        if(i == 44){
            square.classList.add('ROOMfirst')
        }
    }
})