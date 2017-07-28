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
        $iCatNavTopPosition = $iContNavTopPosition + 24 - 10; // 24px margin-top .timeline -10px margin top .sticky ul;

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
    $sCatNavMenuLiMatched.siblings( ".active" ).removeClass( "active" );
    $sCatNavMenuLiMatched.addClass( "active" );

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
    $( this ).parent().siblings( ".active" ).removeClass( "active" );
    $( this ).parent().addClass( "active" );

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

    // Hide titles when js supported because the title is already showed by the nav bar
    $( ".timeline h2" ).addClass( "hidden" );
    $( ".projects h2" ).addClass( "hidden" );
    $( ".followers h2" ).addClass( "hidden" );

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

    // Display the active tab only
    $( ".timeline" ).addClass( "js-supported" );
    $( "section.tab-pane" ).hide();
    $( ".overview" ).show();
    $( ".drop-tab-link" ).on( "click", fDropDownTabHandler );
    $( ".tab-nav-link" ).on( "click", fTabHandler );
} );
