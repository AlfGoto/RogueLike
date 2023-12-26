document.addEventListener('DOMContentLoaded', () => {
    let innerHeight = Number(window.getComputedStyle(mapAREA)['height'].replace('px', ''))




    // document.addEventListener('click', (e) => {
    //     //console.log('innerHeight = ' + innerHeight)
    //     console.log((e.pageY / innerHeight) * 100)
    // })

    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    document.addEventListener('click', (e)=>{
        console.log(' ')
        console.log('x = ' + PXtoVH(e.pageX))
        console.log('y = ' + PXtoVH(e.pageY))
    })


    function PXtoVH(nb) {
        return (nb / innerHeight) * 100
    }
})