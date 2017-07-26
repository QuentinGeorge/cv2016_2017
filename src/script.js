// Main Scripts


// Drop Down accessible by focus
// let oDropDown = document.getElementsByClassName( "dropdown" ),
//     oDropDownContent = document.getElementsByClassName( "dropdown-content" ),
//     oDropDownExpand = document.getElementsByClassName( "dropdown-expand" ),
//     i = 0;
//
//     console.log(oDropDown);
//
// for ( i = 0; i < oDropDown.length; i++ ) {
//     console.log(oDropDown[ i ]);
//     oDropDown[ i ].addEventListener( "mouseover", () => {
//         oDropDownExpand[ i ].setAttribute( "aria-expanded", "true" );
//     } );
// }

// oDropDown.addEventListener( "mouseover", () => {
//     oDropDownExpand.setAttribute( "aria-expanded", "true" );
// } );
//
// oDropDown.addEventListener( "focusin", () => {
//     oDropDownExpand.setAttribute( "aria-expanded", "true" );
//     oDropDownContent.style.top = '0';
// } );
//
// oDropDown.addEventListener( "mouseout", () => {
//     oDropDownExpand.setAttribute( "aria-expanded", "false" );
// } );
//
// oDropDown.addEventListener( "focusout", () => {
//     oDropDownExpand.setAttribute( "aria-expanded", "false" );
//     oDropDownContent.style.top = '-99999px';
// } );


// Show/Hide more informations
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
