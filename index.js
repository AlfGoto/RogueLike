document.addEventListener('DOMContentLoaded', () => {
    console.log('connected to index.JS')
    let perso = document.getElementById('perso')
    let persoCSS = window.getComputedStyle(perso)
    let tirDiv = document.getElementById('TIR')
    let zBOOL = false;
    let sBOOL = false;
    let qBOOL = false;
    let dBOOL = false;
    let tirCount = 0



    window.addEventListener('pointerdown', (e)=>{
        tirCount++
        let x = e.pageX //left
        let y = e.pageY //top
        tir = tirDiv.createElement('p')
        tir.innerHTML = 'tir'
        tir.classList.add('tir')
        tir.setAttribute("id",tirCount)
        tir.left = x + 'px'
        tir.top = y + 'px'
        // tirDiv.innerHTML = "<p class='tir' id='" + tirCount + "'>TIR</p>"
        console.log('X = ' + x + "\nY = " + y)
    })


    window.addEventListener('keydown', function (e) {
        // console.log(`DOWN ${e.key}`)
        if (e.key == 'z') {
            if(zBOOL == false){
                zfonction()
                zBOOL = true
            }
        }
        if (e.key == 's') {
            if(sBOOL == false){
                sfonction()
                sBOOL = true
            }
        }
        if (e.key == 'd') {
            if(dBOOL == false){
                dfonction()
                dBOOL = true
            }

        }
        if (e.key == 'q') {
            if(qBOOL == false){
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



    function zfonction(){
        setTimeout(()=>{
            let top = persoCSS['top'].replace('px', '')
            top = Number(top)
            top -= 4
            top = top + 'px'
            perso.style.top = top
            if(zBOOL == true){
                zfonction()
            }
        },1)
    }
    function sfonction(){
        setTimeout(()=>{
            let top = persoCSS['top'].replace('px', '')
            top = Number(top)
            top += 4
            top = top + 'px'
            perso.style.top = top
            if(sBOOL == true){
                sfonction()
            }
        },1)
    }
    function dfonction(){
        setTimeout(()=>{
            let top = persoCSS['left'].replace('px', '')
            top = Number(top)
            top += 4
            top = top + 'px'
            perso.style.left = top
            if(dBOOL == true){
                dfonction()
            }
        },1)
    }
    function qfonction(){
        setTimeout(()=>{
            let top = persoCSS['left'].replace('px', '')
            top = Number(top)
            top -= 4
            top = top + 'px'
            perso.style.left = top
            if(qBOOL == true){
                qfonction()
            }
        },1)
    }


})