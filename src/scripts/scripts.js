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

const fFindLinkByAttrHref = function( oLinks, sAttrHref ) {
    let $oLink;

    oLinks.each( function() {
        if ( $( this ).attr( "href" ) === sAttrHref ) {
            $oLink = $( this );
        }
    } );

    return $oLink;
};

const fTabsHandler = function( oEvent ) {
    let $sLinkedID = $( this ).attr( "href" ),
        $sTabID = $( `${ $sLinkedID }` ).parent().attr( "id" ),
        $aMenuLinkActive = [
            $( this )
        ],
        $aEltsToHide = [
            $( `${ $sLinkedID }` ).siblings( ".tab-pane" )
        ],
        $aEltsToShow = [
            $( `${ $sLinkedID }` ),
            $( "table tr" )  // restore tr ( could be hidden by the dropdown menu )
        ],
        $iScrollPos;

    oEvent.preventDefault();

    // prepare
    if ( $( this ).hasClass( "content-nav-link" ) ) {
        // modify original pattern variables for content-nav menu navigation
        $iScrollPos = 0;
    } else if ( $( this ).hasClass( "categories-nav-link" ) ) {
        // modify original pattern variables for categories-nav menu navigation
        if ( $sLinkedID === "#timeline-content" ) {
            $aEltsToHide = [];
            $aEltsToShow[ 0 ] = $( `${ $sLinkedID }` ).children( ".tab-pane" );
        }
        $iScrollPos = $( ".content-nav" ).position().top;
    } else if ( $( this ).hasClass( "timeline-drop-link" ) ) {
        // modify original pattern variables for categories-nav dropdown menu navigation
        $aMenuLinkActive[ 0 ] = fFindLinkByAttrHref( $( ".categories-nav-link" ), `#${ $sTabID }` );
        $aEltsToHide[ 0 ] = $( "table tr" );
        $aEltsToShow[ 1 ] = $( `${ $sLinkedID }` ).siblings( ".table-section-header" );
        $aEltsToShow[ 2 ] = $( "table tbody" ); // restore tbody ( could be hidden by the categories nav menu )
    } else if ( $( this ).hasClass( "header-drop-link" ) ) {
        // modify original pattern variables for header dropdown menu navigation
        $aMenuLinkActive[ 0 ] = fFindLinkByAttrHref( $( ".categories-nav-link" ), `${ $sLinkedID }` );
        // do only if we are not already in timeline section
        if ( $( ".content-nav .active a" ).attr( "href" ) !== "#timeline" ) {
            $( "section.tab-pane" ).hide();
            $( ".timeline" ).show();
            $aMenuLinkActive[ 1 ] = fFindLinkByAttrHref( $( ".content-nav-link" ), "#timeline" );
        }
    }

    // manage .active on nav menu
    $aMenuLinkActive.forEach( function( elt ) {
        elt.parent().siblings( ".active" ).removeClass( "active" );
        elt.parent().addClass( "active" );
    } );

    // manage content
    $aEltsToHide.forEach( function( elt ) {
        elt.hide();
    } );
    $aEltsToShow.forEach( function( elt ) {
        elt.show();
    } );

    // if necessary, scroll page to top of selected element
    if ( typeof $iScrollPos !== "undefined" && $( window ).scrollTop() > $( ".content-nav" ).position().top + 5 ) {
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
    $( ".tab-nav-link" ).on( "click", fTabsHandler );
} );
