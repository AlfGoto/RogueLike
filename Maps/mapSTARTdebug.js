document.addEventListener('DOMContentLoaded', ()=>{
    let mapAREA = document.getElementById('mapAREA')

    document.addEventListener('keydown', (e)=>{
        if(e.key == 'p'){
            let mapAREAtop = Number(window.getComputedStyle(mapAREA)['top'].replace('px', ''))
            let VHinPX = window.innerHeight
            console.log(mapAREAtop) 
            console.log(VHinPX)
            mapAREA.style.top = (mapAREAtop + VHinPX) + 'px'
        }
        if(e.key == 'm'){
            let mapAREAtop = Number(window.getComputedStyle(mapAREA)['top'].replace('px', ''))
            let VHinPX = window.innerHeight
            console.log(mapAREAtop) 
            console.log(VHinPX)
            mapAREA.style.top = (mapAREAtop - VHinPX) + 'px'
        }
    })
})