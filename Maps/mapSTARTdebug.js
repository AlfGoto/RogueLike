document.addEventListener('DOMContentLoaded', () => {
    let mapAREA = document.getElementById('mapAREA')

    document.addEventListener('keydown', (e) => {
        if (e.key == 'p') {
            let mapAREAtop = Number(window.getComputedStyle(mapAREA)['top'].replace('px', ''))
            let VHinPX = window.innerHeight
            if (mapAREAtop + VHinPX < 0) {
                mapAREA.style.top = (mapAREAtop + VHinPX) + 'px'
                console.log(Number(window.getComputedStyle(mapAREA)['top'].replace('px', '')))
                console.log(window.innerHeight)

            }

        }
        if (e.key == 'm') {
            let mapAREAtop = Number(window.getComputedStyle(mapAREA)['top'].replace('px', ''))
            let VHinPX = window.innerHeight
            if (mapAREAtop - VHinPX > 0 - VHinPX*10) {
                mapAREA.style.top = (mapAREAtop - VHinPX) + 'px'
                console.log(Number(window.getComputedStyle(mapAREA)['top'].replace('px', '')))
                console.log(window.innerHeight)

            }
        }
    })


    document.addEventListener('click', (e) => {
        console.log(window.innerHeight)
    })
})