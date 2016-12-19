let oButtonControlInfo = document.querySelector( ".control-info" ),
    oListOthersInfo = document.querySelector( ".others-info" );

// Show/Hide more informations
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

// Menu content nav selected


// let oContentNavMenu = document.querySelector( ".content-nav" ).getElementsByTagName( "ul" ),
//     oContentNavSelectedItem = oContentNavMenu[ 0 ].querySelector( ".selected" ),
//     oContentSections = document.querySelector( ".main-container" ).getElementsByTagName( "section" ),
//     sFullURL = document.location.href,
//     sAnchor = "",
//     i = 0;
//
// oContentNavMenu[ 0 ].addEventListener( "click", () => {
//     sAnchor = document.location.hash.substring( 1 );
//     for ( i = 0; i < oContentSections.length; i++ ) {
//         if ( oContentSections[ i ].id === sAnchor ) {
//             console.log(sAnchor);
//         }
//     }
// } );
