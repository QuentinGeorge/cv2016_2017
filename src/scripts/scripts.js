// Main Scripts


const fDropDownExpand = function() {
    let $oContent = $( this ).children( ".dropdown-content" ),
        $oExpand = $( this ).children( ".dropdown-expand" );

    if ( $oContent.css( "top" ) !== 0 ) {
        $oContent.css( "top", "0" );
    }
    if ( $oExpand.attr( "aria-expanded" ) !== true ) {
        $oExpand.attr( "aria-expanded", "true" );
    }
};

const fDropDownUnexpand = function() {
    let $oContent = $( this ).children( ".dropdown-content" ),
        $oExpand = $( this ).children( ".dropdown-expand" );

    $oContent.css( "top", "" );
    $oExpand.attr( "aria-expanded", "false" );
};

const fShowHideInfo = function() {
    if ( $( ".others-info" ).is( ".hide" ) ) {
        $( ".others-info" ).removeClass( "hide" ).addClass( "show" );
        $( ".control-info" ).attr( "value", "Hide more informations" );
    } else {
        $( ".others-info" ).removeClass( "show" ).addClass( "hide" );
        $( ".control-info" ).attr( "value", "Show more informations" );
    }
};

$( function() {

    // Drop Down accessible by focus & aria-expanded attribute status
    $( ".dropdown" ).on( "mouseover", fDropDownExpand );
    $( ".dropdown" ).on( "focusin", fDropDownExpand );
    $( ".dropdown" ).on( "mouseout", fDropDownUnexpand );
    $( ".dropdown" ).on( "focusout", fDropDownUnexpand );

    // Show/Hide more informations
    $( ".control-info" ).on( "click", fShowHideInfo );
} );
