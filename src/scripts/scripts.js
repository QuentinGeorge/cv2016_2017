// Main Scripts

const START_LAYOUT = "tabsNav";

const fSetLayoutBases = function( sLayoutType ) {
    if ( sLayoutType === "onePage" ) {
        // Remove styles adjustments
        $( ".timeline" ).removeClass( "tabs-nav-layout-activated" );
        // Display section h2
        $( ".timeline h2" ).removeClass( "hidden" );
        $( ".projects h2" ).removeClass( "hidden" );
        $( ".followers h2" ).removeClass( "hidden" );
        // Display all tabs
        $( ".tab-pane" ).show();
        // Hide categories-nav "All" link
        $( ".categories-nav li:nth-child( 1 )" ).hide();
        $( ".categories-nav li:nth-child( 2 )" ).addClass( "active" );
    } else {
        // Styles adjustments
        $( ".timeline" ).addClass( "tabs-nav-layout-activated" );
        // Hide titles because the title is already showed by the nav bar
        $( ".timeline h2" ).addClass( "hidden" );
        $( ".projects h2" ).addClass( "hidden" );
        $( ".followers h2" ).addClass( "hidden" );
        // Display the active tab only
        $( "section.tab-pane" ).hide();
        $( ".overview" ).show();
        // Show categories-nav "All" link
        $( ".categories-nav li:nth-child( 1 )" ).show();
        $( ".categories-nav li:nth-child( 2 )" ).removeClass( "active" );
    }
};

const fLayoutsHandler = function( $this, sLayout ) {
    let $sLayoutType = sLayout;

    // manage .active
    $( ".layout-nav a" ).removeClass( "active" );
    $this.addClass( "active" );
    // Reset sticky elt
    $( ".sticky" ).removeClass( "sticky" );
    // Reset nav menu .active
    $( ".content-nav .active" ).removeClass( "active" );
    $( ".categories-nav .active" ).removeClass( "active" );
    $( ".content-nav li:nth-child( 2 )" ).addClass( "active" );
    $( ".categories-nav li:nth-child( 1 )" ).addClass( "active" );
    // Reset table tr hideContent
    $( "table .hideContent" ).siblings().show();
    $( "table .hideContent" ).removeClass( "hideContent" );
    // change layout
    if ( $this.hasClass( "one-page-lay" ) ) {
        $sLayoutType = "onePage";
    } else {
        $sLayoutType = "tabsNav";
    }
    fSetLayoutBases( $sLayoutType );
    return $sLayoutType;
};

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

const fHandleStickyEltByTopPos = function( iTopPos, oStickyElt ) {
    if ( $( window ).scrollTop() > iTopPos ) {
        oStickyElt.addClass( "sticky" );
    } else {
        oStickyElt.removeClass( "sticky" );
    }
};

const fStickyEltsHandler = function() {
    let $iContNavTopPosition = $( ".content-nav" ).position().top,
        $iCatNavTopPosition = $( ".timeline" ).position().top - $( ".content-nav" ).height() - 10,  // -10px margin-top .sticky ul
        $iTimelineSectionBottom = $( ".timeline" ).position().top + $( ".timeline" ).height(),
        $iCatNavBottomLimit = $( window ).scrollTop() + $( ".content-nav" ).height() + $( ".categories-nav" ).height(),
        $iCatNavTopLimit = $( ".timeline" ).height() - $( ".categories-nav" ).height();

    // content-nav bar
    fHandleStickyEltByTopPos( $iContNavTopPosition, $( ".content-nav-container" ) );

    // categories-nav bar
    // Don't stick further than timeline section bottom
    if ( $iCatNavBottomLimit >= $iTimelineSectionBottom ) {
        $( ".timeline .sticky" ).addClass( "sticky-bottom-section" );
        $( ".timeline .sticky" ).css( "top", `${ $iCatNavTopLimit }px` );
        $( ".timeline .sticky" ).removeClass( "sticky" );
    } else {
        fHandleStickyEltByTopPos( $iCatNavTopPosition, $( ".categories-nav" ) );
        $( ".timeline .sticky" ).css( "top", "" );
        $( ".timeline .sticky" ).removeClass( "sticky-bottom-section" );
    }

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

            return;
        }
    } );

    return $oLink;
};

const fMenuActiveLinkHandler = function( oLinkActive ) {
    oLinkActive.parent().siblings( ".active" ).removeClass( "active" );
    oLinkActive.parent().addClass( "active" );
};

const fTabsHandler = function( oEvent, $this ) {
    let $sLinkedID = $this.attr( "href" ),
        $sTabID = $( `${ $sLinkedID }` ).parent().attr( "id" ),
        $aMenuLinksActive = [
            $this
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
    if ( $this.hasClass( "content-nav-link" ) ) {
        // modify original pattern variables for content-nav menu navigation
        $aMenuLinksActive[ 1 ] = $( ".categories-nav li:nth-child( 1 ) a" );
        $aEltsToShow[ 2 ] = $( "table tbody" );
        $iScrollPos = 0;
        // reset table tr hideContent
        $( "table .hideContent" ).siblings().show();
        $( "table .hideContent" ).removeClass( "hideContent" );
        // avoid bug with cat nav sticky
        $( ".categories-nav" ).removeClass( "sticky" );
    } else if ( $this.hasClass( "categories-nav-link" ) ) {
        // modify original pattern variables for categories-nav menu navigation
        if ( $sLinkedID === "#timeline-content" ) {
            $aEltsToHide = [];
            $aEltsToShow[ 0 ] = $( `${ $sLinkedID }` ).children( ".tab-pane" );
        }
        $iScrollPos = $( ".content-nav" ).position().top;
    } else if ( $this.hasClass( "timeline-drop-link" ) ) {
        // modify original pattern variables for categories-nav dropdown menu navigation
        $aMenuLinksActive[ 0 ] = fFindLinkByAttrHref( $( ".categories-nav-link" ), `#${ $sTabID }` );
        $aEltsToHide[ 0 ] = $( "table tr" );
        $aEltsToShow[ 1 ] = $( `${ $sLinkedID }` ).siblings( ".table-section-header" );
        $aEltsToShow[ 2 ] = $( "table tbody" ); // restore tbody ( could be hidden by the categories nav menu )
    } else if ( $this.hasClass( "header-drop-link" ) ) {
        // modify original pattern variables for header dropdown menu navigation
        $aMenuLinksActive[ 0 ] = fFindLinkByAttrHref( $( ".categories-nav-link" ), `${ $sLinkedID }` );
        // do only if we are not already in timeline section
        if ( $( ".content-nav .active a" ).attr( "href" ) !== "#timeline" ) {
            $( "section.tab-pane" ).hide();
            $( ".timeline" ).show();
            $aMenuLinksActive[ 1 ] = fFindLinkByAttrHref( $( ".content-nav-link" ), "#timeline" );
        }
    }

    // manage .active on nav menu
    $aMenuLinksActive.forEach( function( elt ) {
        fMenuActiveLinkHandler( elt );
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

const fAnchorScrollHandler = function( oEvent, $this ) {
    let $iScrollPos = $( `${ $this.attr( "href" ) }` ).offset().top - $( ".content-nav" ).height() - 24;

    oEvent.preventDefault();

    window.scrollTo( 0, $iScrollPos );
};

const fGetScrolledEltID = function( oElts, iTopSpacing = 0 ) {
    let $iWindowTop = $( window ).scrollTop() + $( ".content-nav" ).height(),
        $sID;

    oElts.each( function() {
        if ( $iWindowTop > $( this ).offset().top - iTopSpacing )  {
            $sID = $( this ).attr( "id" );

            return;
        }
    } );

    return $sID;
};

const fNavMenuActiveEltHandlerOnScroll = function() {
    let $sSectionScrolledID,
        $sTbodyScrolledID;

    $sSectionScrolledID = fGetScrolledEltID( $( "section.tab-pane" ), 48 );
    // fGetScrolledEltID(); Don't find a result for all scroll events. We have to check if we have a result befor sending him to the others fct
    if ( $sSectionScrolledID !== undefined ) {
        fMenuActiveLinkHandler( fFindLinkByAttrHref( $( ".content-nav-link" ), `#${ $sSectionScrolledID }` ) );
    }
    if ( $sSectionScrolledID === "timeline" ) {
        $sTbodyScrolledID = fGetScrolledEltID( $( "tbody.tab-pane" ), 48 );
        if ( $sTbodyScrolledID !== undefined ) {
            fMenuActiveLinkHandler( fFindLinkByAttrHref( $( ".categories-nav-link" ), `#${ $sTbodyScrolledID }` ) );
        }
    }
};

$( function() {
    let $sLayoutType = START_LAYOUT;

    /* Set layout bases on page load */
    fSetLayoutBases( $sLayoutType );

    /* Prevent page reloading on dropdown expander click */
    $( ".dropdown-expand" ).on( "click", function( oEvent ) {
        oEvent.preventDefault();
    } );

    /* Page layout selection */
    $( ".layout-nav a" ).on( "click", function( oEvent ) {
        oEvent.preventDefault();
        // If already active don't do anything
        if ( $( this ).hasClass( "active" ) ) {
            return;
        }
        $sLayoutType = fLayoutsHandler( $( this ), $sLayoutType );
    } );

    /* Drop Down accessible by focus & aria-expanded attribute status */
    $( ".dropdown" ).on( "mouseenter focusin", function() {
        fDropDownContentHandler( $( this ), true );
    } );
    $( ".dropdown" ).on( "mouseleave focusout", function() {
        fDropDownContentHandler( $( this ) );
    } );

    /* Sticky elements */
    fStickyEltsHandler(); // For page reload when already scrolled
    // $( window ).scroll( fStickyEltsHandler );
    $( window ).scroll( function() {
        fStickyEltsHandler();
        if ( $sLayoutType === "onePage" ) {
            fNavMenuActiveEltHandlerOnScroll();
        }
    } );

    /* Show/Hide more informations */
    $( ".control-info" ).on( "click", fShowHideInfo );

    /* Show/Hide table elements */
    $( ".table-row" ).on( "click", fTableTdHide );

    /* Display the active tab only */
    $( ".tab-nav-link" ).on( "click", function( oEvent ) {
        if ( $sLayoutType === "tabsNav" ) {
            fTabsHandler( oEvent, $( this ) );
        } else if ( $sLayoutType === "onePage" ) {
            fAnchorScrollHandler( oEvent, $( this ) );
        }
        fStickyEltsHandler();  // Reset sticky elts
    } );
} );
