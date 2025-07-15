(function ($) {
	
	"use strict";

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	

    // Isotope Filtering - Only initialize if a .grid element exists on the page
    // This is crucial for pages like services.html and appdownload.html which don't have .grid for images
	if ($(".grid").length && typeof Isotope !== 'undefined') { // Check if .grid exists and Isotope is loaded
        var $grid = $(".grid").isotope({ //
            itemSelector: ".all", //
            percentPosition: true, //
            masonry: { //
                columnWidth: ".all" //
            }
        });

        $('.filters ul li').click(function(){
            $('.filters ul li').removeClass('active');
            $(this).addClass('active');
            
            var data = $(this).attr('data-filter');
            $grid.isotope({
                filter: data
            });
        });
    }

    // Modern-Slider (Slick.js) Initialization - Only if .Modern-Slider exists
    if ($(".Modern-Slider").length && typeof $.fn.slick !== 'undefined') { //
        $(".Modern-Slider").slick({ //
            autoplay:true, //
            autoplaySpeed:10000, //
            speed:600, //
            slidesToShow:1, //
            slidesToScroll:1, //
            pauseOnHover:false, //
            dots:true, //
            pauseOnDotsHover:true, //
            cssEase:'linear', //
            // fade:true, //
            draggable:false, //
            prevArrow:'<button class="PrevArrow"></button>', //
            nextArrow:'<button class="NextArrow"></button>', //
        });
    }

    // Search Icon Click
	$('.search-icon a').on("click", function(event) {
	    event.preventDefault();
	    $("#search").addClass("open");
	    $('#search > form > input[type="search"]').focus();
	});

	$("#search, #search button.close").on("click keyup", function(event) {
	    if (
	      event.target == this ||
	      event.target.className == "close" ||
	      event.keyCode == 27
	    ) {
	      $(this).removeClass("open");
	    }
	});

	$("#search-box").submit(function(event) {
	    event.preventDefault();
	    return false;
	});

    // Owl Carousel (for testimonials) - Only if .owl-carousel exists
    if ($('.owl-carousel').length && typeof $.fn.owlCarousel !== 'undefined') { //
        $('.owl-carousel').owlCarousel({ //
            loop:true, //
            margin:30, //
            nav:false, //
            pagination:true, //
            responsive:{ //
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        });
    }

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init (using scrollReveal)
	if (typeof scrollReveal !== 'undefined') {
	    window.sr = new scrollReveal();
	}
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation (smooth scroll for anchor links)
	$('a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	// Preloader hiding logic moved here for faster perceived load.
	// This ensures the preloader disappears as soon as the DOM is ready,
	// without waiting for all images and external assets to fully load.
	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll for # links (duplicate with above, but keeping original structure)
	    $('a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });

		// Preloader hiding logic
		if($('#preloader').length){
			$("#preloader").animate({
				'opacity': '0'
			}, 600, function(){
				setTimeout(function(){
					$("#preloader").css("visibility", "hidden").fadeOut();
				}, 300);
			});
		}
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        // Check if currLink.attr("href") is a valid selector (not just '#')
	        try {
	            var refElement = $(currLink.attr("href"));
	            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	                $('.nav ul li a').removeClass("active");
	                currLink.addClass("active");
	            }
	            else{
	                currLink.removeClass("active");
	            }
	        } catch (e) {
	            // Ignore errors for invalid selectors (e.g., just '#')
	        }
	    });
	}


	// Page loading animation - Parallax effect
	// This relies on imgfix.min.js and is kept on window.load as it might need all images.
	$(window).on('load', function() {
		if($('.cover').length && typeof $.fn.parallax !== 'undefined'){ // Check if .cover and parallax plugin exist
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}
	});


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);