document.addEventListener('DOMContentLoaded', () => {
    let persoARME = 'sword'



    switch (persoARME) {
        case 'bazooka':
            loadJS("../armes/bazooka.js");
            break;
        case 'sword':
            loadJS("../armes/sword.js");
            break;
        case 'boomerang':
            loadJS("../armes/boomerang.js");
            break;
    }




    function loadJS(url) {

        var scriptTag = document.createElement('script');
        scriptTag.src = url;
        // scriptTag.onload = console.log('script loaded');
        document.body.appendChild(scriptTag);
    };
})