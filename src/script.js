let oButtonControlInfo = document.querySelector( ".control-info" ),
    oListOthersInfo = document.querySelector( ".others-info" );

oButtonControlInfo.addEventListener( "click", () => {
    if ( oListOthersInfo.className.match( "(^|\\s)hide(\\s|$)" ) !== null ) {
        oListOthersInfo.classList.add( "show" );
        oListOthersInfo.classList.remove( "hide" );
        oButtonControlInfo.value = "Hide more informations";
    } else {
        oListOthersInfo.classList.add( "hide" );
        oListOthersInfo.classList.remove( "show" );
        oButtonControlInfo.value = "Show more informations";
    }
} );
