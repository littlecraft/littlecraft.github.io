/**
 * Main JS file for BlogInn behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $("article").fitVids();

    $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

    $(document).ready(function(){
        // Responsive video embeds
        $('.entry-content').fitVids();

        // Navigation
        $('#menu-toggle').click(function(){
            var _this = $(this);
            _this.toggleClass( 'toggled-on' ).attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
            $('.nav-menu').slideToggle();
        });
        $(window).bind('resize orientationchange', function() {
            if ( $('#menu-toggle').is(':hidden') ) {
                $('#menu-toggle').removeClass('toggled-on').attr('aria-expanded', 'false');
                $('.nav-menu').removeAttr('style');
            }
        });

        // Scroll to top
        $('#top-link').on('click', function(e) {
            $('html, body').animate({'scrollTop': 0});
            e.preventDefault();
        });

        // Magnific popup
        $('.image-popup').magnificPopup({
          type: 'image',
          tLoading: 'Loading image #%curr%...',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
          },
          image: {
            tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
          },
          removalDelay: 300, // Delay in milliseconds before popup is removed
          // Class that is added to body when popup is open. 
          // make it unique to apply your CSS animations just to this exact popup
          mainClass: 'mfp-fade'
        });
    });

}(jQuery));
