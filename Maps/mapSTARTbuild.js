document.addEventListener('DOMContentLoaded', () => {
    window.gamePAUSE = false




    window.rooms = []


    window.nbROOMS = Math.floor(Math.random() * (10 - 5 + 1) + 5)
    // console.log(nbROOMS)

    roomsleft = []
    roombasegenerate = []
    for (let i = 0; i < 81; i++) {
        roomsleft.push(i)
    }
    // console.log(roomsleft)


    //commencer par la room 55. Prendre une des rooms a coté au pif pour la suivante. Puis prendre une des rooms a coté d'une des rooms déja générée qui n'est pas deja générée
    //Generer les mobs et plus tard les structures
    // console.log('nombre de rooms = ' + nbROOMS)
    for (let i = 0; i < nbROOMS; i++) {
        if (i == 0) {
            room = 40
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
        if (element == 40) { temp['found'] = true } else { temp['found'] = false }
        temp['treasure'] = false
        temp['boss'] = false

        roomsinfo[element] = temp
        // console.log(element)
    });
    // console.log(roomsinfo)

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    shuffleArray(roomsleft)
    //treasure room
    for (let i = 0; i < 81; i++) {
        if (i in roomsleft) {
            // console.log('roomsleft include ok')
            e = roomsleft[i]
            if (e > 8 && e < 72 && e % 9 != 0 && e % 9 != 8) {
                if (roomsinfo.hasOwnProperty(e - 9) || roomsinfo.hasOwnProperty(e + 9) || roomsinfo.hasOwnProperty(e - 1) || roomsinfo.hasOwnProperty(e + 1)) {
                    temp = []
                    temp['treasure'] = true
                    temp['boss'] = false
                    temp['found'] = false
                    roomsinfo[e] = temp

                    roomsleft.splice(roomsleft.indexOf(e), 1)
                    break
                }
            }
        }
    }

    //boss room
    for (let i = 0; i < 81; i++) {
        if (i in roomsleft) {
            // console.log('roomsleft include ok')
            e = roomsleft[i]
            if (e > 8 && e < 72 && e % 9 != 0 && e % 9 != 8) {
                if (roomsinfo.hasOwnProperty(e - 9) || roomsinfo.hasOwnProperty(e + 9) || roomsinfo.hasOwnProperty(e - 1) || roomsinfo.hasOwnProperty(e + 1)) {
                    temp = []
                    temp['boss'] = true
                    temp['found'] = false
                    roomsinfo[e] = temp

                    roomsleft.splice(roomsleft.indexOf(e), 1)
                    break
                }
            }
        }
    }



    //les portes
    roomsinfo.forEach(element => {
        if ((roomsinfo.indexOf(element) - 9) in roomsinfo) { element['top'] = true } else { element['top'] = false }
        if ((roomsinfo.indexOf(element) + 9) in roomsinfo) { element['bot'] = true } else { element['bot'] = false }
        if ((roomsinfo.indexOf(element) - 1) in roomsinfo) { element['left'] = true } else { element['left'] = false }
        if ((roomsinfo.indexOf(element) + 1) in roomsinfo) { element['right'] = true } else { element['right'] = false }
    })


    // console.log(roomsinfo)









    //build minimap
    let grid = document.getElementById('grid');

    for (let i = 0; i < 81; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        square.id = i;
        square.classList.add('hidden')
        if (i == 40) {
            square.classList.add('ROOMfirst')
        }
    }
})