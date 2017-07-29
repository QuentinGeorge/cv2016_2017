// Main Scripts


const fDropDownContentHandler = function( $this, bShow = false ) {
    let $oContent = $this.children( ".dropdown-content" ),
        $oExpand = $this.children( ".dropdown-expand" );

    if ( bShow === true ) {
        $oContent.css( "top", "0" );
        $oExpand.attr( "aria-expanded", "true" );
    } else {
        $oContent.css( "top", "" );
        $oExpand.attr( "aria-expanded", "false" );
    }
};

const fAddStickyElts = function( iTopPos, oStickyElt ) {
    if ( $( window ).scrollTop() > iTopPos ){
        oStickyElt.addClass( "sticky" );
    } else {
        oStickyElt.removeClass( "sticky" );
    }
};

const fScrollEvents = function() {
    let $iContNavTopPosition = $( ".content-nav" ).position().top,
        $iCatNavTopPosition = $iContNavTopPosition + 24 - 10; // 24px margin-top .timeline -10px margin-top .sticky ul;

    // content-nav bar
    fAddStickyElts( $iContNavTopPosition, $( ".content-nav-container" ) );

    // categories-nav bar
    fAddStickyElts( $iCatNavTopPosition, $( ".categories-nav" ) );

    // content-nav bar header
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
    if ( $( ".others-info" ).is( ".show" ) ) {
        $( ".others-info" ).removeClass( "show" ).addClass( "hide" );
        $( ".control-info" ).attr( "value", "Show more informations" );
    } else {
        $( ".others-info" ).removeClass( "hide" ).addClass( "show" );
        $( ".control-info" ).attr( "value", "Hide more informations" );
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

const fMenuActiveHandler = function( oTarget ) {
    oTarget.siblings( ".active" ).removeClass( "active" );
    oTarget.addClass( "active" );
};

const fDropDownTabHandler = function( oEvent ) {
    let $sLinkedID = $( this ).attr( "href" ),
        $sTabID = $( `${ $sLinkedID }` ).parent().attr( "id" ),
        $sCatNavMenuLiMatched;

    oEvent.preventDefault();

    // manage .active on categories nav menu
    $( ".categories-nav .tab-nav-link" ).each( function() {
        if ( $( this ).attr( "href" ) === `#${ $sTabID }` ) {
            $sCatNavMenuLiMatched = $( this ).parent();
        }
    } );
    fMenuActiveHandler( $sCatNavMenuLiMatched );

    // manage content
    $( "table tr" ).hide();
    $( `${ $sLinkedID }` ).siblings( ".table-section-header" ).show();
    $( `${ $sLinkedID }` ).show();

    // restore tbody ( could be hidden by the categories nav menu )
    $( "table tbody" ).show();
};

const fTabHandler = function( oEvent ) {
    let $sLinkedID = $( this ).attr( "href" ),
        $iScrollPos = 0;

    oEvent.preventDefault();

    // manage .active on nav menu
    fMenuActiveHandler( $( this ).parent() );

    // manage content
    if ( $sLinkedID === "#timeline-content" ) {
        $( `${ $sLinkedID }` ).children( ".tab-pane" ).show();
    } else {
        $( `${ $sLinkedID }` ).siblings( ".tab-pane" ).hide();
        $( `${ $sLinkedID }` ).show();
    }

    // restore tr ( could be hidden by the dropdown menu )
    $( "table tr" ).show();

    // scroll page to top of selected element
    if ( $( this ).hasClass( "content-nav-link" ) ) {
        window.scrollTo( 0, $iScrollPos );
    } else if ( $( this ).hasClass( "categories-nav-link" ) ) {
        $iScrollPos = $( ".content-nav" ).position().top;
        window.scrollTo( 0, $iScrollPos );
    }
};

$( function() {
    /* Styles adjustments when js is supported */
    $( ".timeline" ).addClass( "js-supported" );
    // Hide titles when js is supported because the title is already showed by the nav bar
    $( ".timeline h2" ).addClass( "hidden" );
    $( ".projects h2" ).addClass( "hidden" );
    $( ".followers h2" ).addClass( "hidden" );

    /* Drop Down accessible by focus & aria-expanded attribute status */
    $( ".dropdown" ).on( "mouseenter focusin", function() {
        fDropDownContentHandler( $( this ), true );
    } );
    $( ".dropdown" ).on( "mouseleave focusout", function() {
        fDropDownContentHandler( $( this ) );
    } );

    /* Sticky elements */
    fScrollEvents(); // For page reload when already scrolled
    $( window ).scroll( fScrollEvents );

    /* Show/Hide more informations */
    $( ".control-info" ).on( "click", fShowHideInfo );

    /* Show/Hide table elements */
    $( ".table-row" ).on( "click", fTableTdHide );

    /* Display the active tab only */
    // On page load
    $( "section.tab-pane" ).hide();
    $( ".overview" ).show();
    // On click
    $( ".drop-tab-link" ).on( "click", fDropDownTabHandler );
    $( ".tab-nav-link" ).on( "click", fTabHandler );
} );
