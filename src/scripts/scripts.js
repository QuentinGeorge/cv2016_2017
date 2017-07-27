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

const fStickyElts = function() {
    let $iContNavTopPosition = $( ".content-nav" ).position().top,
        $iCatNavTopPosition = $( ".timeline" ).position().top - $( ".content-nav" ).height() - 10; // -10px margin-top;

    // content-nav bar
    if ( $( window ).scrollTop() > $iContNavTopPosition ){
        $( ".content-nav-container" ).addClass( "sticky" );
    } else {
        $( ".content-nav-container" ).removeClass( "sticky" );
    }

    // categories-nav bar
    if ( $( window ).scrollTop() > $iCatNavTopPosition ){
        $( ".categories-nav" ).addClass( "sticky" );
    } else {
        $( ".categories-nav" ).removeClass( "sticky" );
    }

    // content-nav-header
    if ( $( window ).scrollTop() > $iContNavTopPosition + $( ".intro header img" ).height() ) {
        $( ".content-nav-header" ).removeClass( "hidden" );
        $( ".content-nav-container" ).css( "left", "0" );
        $( ".content-nav-container" ).css( "box-shadow", "" );
        $( ".content-nav-container ul" ).css( "margin", "0 auto" );
    } else {
        $( ".content-nav-header" ).addClass( "hidden" );
        $( ".content-nav-container" ).css( "left", "auto" );
        $( ".content-nav-container" ).css( "box-shadow", "none" );
        $( ".content-nav-container ul" ).css( "margin", "0" );
    }
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

const fTableTdHide = function() {
    let $oTableRowTh = $( this ).parent( "th" );

    if ( $oTableRowTh.is( ".hideContent" ) ) {
        $oTableRowTh.siblings().show();
        $oTableRowTh.removeClass( "hideContent" );
    } else {
        $oTableRowTh.siblings().hide();
        $oTableRowTh.addClass( "hideContent" );
    }
};

$( function() {

    // Drop Down accessible by focus & aria-expanded attribute status
    $( ".dropdown" ).on( "mouseover", fDropDownExpand );
    $( ".dropdown" ).on( "focusin", fDropDownExpand );
    $( ".dropdown" ).on( "mouseout", fDropDownUnexpand );
    $( ".dropdown" ).on( "focusout", fDropDownUnexpand );

    // Sticky elements
    fStickyElts(); // For page reload when already scrolled
    $( window ).scroll( fStickyElts );

    // Show/Hide more informations
    $( ".control-info" ).on( "click", fShowHideInfo );

    // Show/Hide table elements
    $( ".table-row" ).on( "click", fTableTdHide );
} );
