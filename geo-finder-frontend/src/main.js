console.log("main.js")
let EMAIL = ""

function displaySigninForm(){
    let signinForm = document.getElementById("sign-in-form");
    let emailDom = document.getElementById("sign-in-input");
    signinForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        email = emailDom.value
        EMAIL = email
        console.log("in signin",email)
        getUser(email)
    } )
}

function displaySignupForm(){
    let signupForm = document.getElementById("sign-up-form");
    let emailDom = document.getElementById("sign-up-input");
    signupForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        email = emailDom.value
        EMAIL = email
        console.log("in signup",email)
        addNewUser(email)
    } )
}

function hideEachDisplay(array){
    array.forEach(id => {
        let domContentId = document.getElementById(id)
        domContentId.style.display = "none"
    })
}

function onlyDisplay(array){
    array.forEach(id => {
        let domContentId = document.getElementById(id)
        domContentId.style.display = "block"
    })
}

function userLogout(){
    let logout = document.getElementById("logout");
    logout.addEventListener("click", (ev) => {
        ev.preventDefault();
        hideEachDisplay(["after-login", "after-login-navbar"])
        onlyDisplay(["before-login"])
    } )
}

function playButton(){
    let playDiv = document.getElementById("play");
    playDiv.addEventListener("click", (ev) => {
        ev.preventDefault();
        console.log(EMAIL)
        getUser(EMAIL)
    })
}

function startGame(){
    let displayStartDiv = document.getElementById("display-start");
    displayStartDiv.addEventListener("click", (ev) => {
        ev.preventDefault();
        hideEachDisplay(CSS_ID_ARRAY)
        onlyDisplay(["after-login-navbar"])
    })
}

function startClickListener(){
    let startDiv = document.getElementById('display-start');
    startDiv.addEventListener('click', (ev) => {
        ev.preventDefault();
        console.log("Started")
        
        TryRandomLocation(HandleCallback);
        initMap();
        hideEachDisplay(CSS_ID_ARRAY)
        onlyDisplay(["after-login-navbar", "after-login", "mapPageButtons"])
        // let submitButton = document.getElementById("submit-button")
        // submitButton.style.display = "block"
    })
}

function nextMapButton(){
    let nextButton = document.getElementById('skip-button');
    nextButton.addEventListener('click', () => {
        refreshThePageWithNewStreetMap();
        MARKERA = null
    })
}

function submitMapGuess(){
    let submit = document.getElementById('submit-button');
    submit.addEventListener('click', () => {
        if(MARKERB){
            MARKERB.setPosition(MARKERB.position);
        } else {
            MARKERB = new google.maps.Marker({
                position: {
                    
                    lat: SUMMARY_DATA.actual_lat,
                    lng: SUMMARY_DATA.actual_lng
                },
                map: MAP
            })
        }
        compareCoordinates();
        let panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
                
                pov: {
                heading: 34,
                pitch: 0
            },
                linksControl: true,
                disableDefaultUI: false,
                panControl: true,
                zoomControl: true,
                showRoadLabels: true,
                streetViewControl: true,
                fullscreenControl: true,
                addressControl: true,
        });
        panorama.setPano(PANO_ID)
        getDistanceFromLatLonInKm(SUMMARY_DATA.input_lat, SUMMARY_DATA.input_lng, SUMMARY_DATA.actual_lat, SUMMARY_DATA.actual_lat)
        
    })

}
