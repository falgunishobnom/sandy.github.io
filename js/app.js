/**
 * Table of contents
 * -----------------------------------
 * 1.0 JQUERY WINDOW LOAD FUNCTION
 * 1.1 PRELOADER
 ==================
 * 2.0 DOCUMENT READY FUNCTION
 * 2.1 NAVBAR ANIMATION ON SCROLL
 * 2.2 ONE PAGE NAVIGATION
 * 2.3 STELLAR JS
 * 2.4 TYPED JS
 * 2.5 SCREENSHOTS CAROUSEL
 * 2.6 TESTIMONIAL CAROUSEL
 * 2.7 LATEST BLOG CAROUSEL
 * 2.8 SCREENSHOTS POP-UP
 * 2.9 VIDEO POP-UP
 * 2.10 COUNTER UP
 * 2.11 CONTACT FORM
 * 2.12 AJAX MAILCHIMP SUBSCRIBE
 * 2.13 LOCAL SUBSCRIPTION FORM
 * 2.14 SCROLL TO UP
 * 2.15 WOW JS
 * 2.16 COUNTDOWN TIMER
 * 2.17 FAQ COLLAPSE
 ==================
 *
 */

(function($) {
    "use strict"; // this function is executed in strict mode 

    /* =================================
       1.0 JQUERY WINDOW LOAD FUNCTION
    =================================== */
    $(window).load(function() {
        /******************** 1.1 PRELOADER ********************/
        // will first fade out the loading animation
        $(".status").fadeOut();
        // will fade out the whole DIV that covers the website.
        $(".preloader").delay(1000).fadeOut("slow");
		
		/******************** 1.2 MASSONARY JS ********************/
		$('.grid').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-item',
		});
    });

    /* =================================
       2.0 DOCUMENT READY FUNCTION
    =================================== */
    $(document).ready(function() {

        var wn = $(window);

        /******************** 2.1 NAVBAR ANIMATION ON SCROLL ********************/
        function animateNav() {
            var offset = wn.scrollTop(),
                target = $('body').find('.navbar');
            if (offset > 50) {
                target.addClass('nav-sticky');
            } else {
                target.removeClass('nav-sticky');
            }
        }
        animateNav();
        wn.scroll(function() {
            animateNav();
        });

        /******************** 2.2 ONE PAGE NAVIGATION ********************/
        $('.navbar-nav-op').onePageNav({
            currentClass: 'active',
            scrollOffset: 65,
        });

         /******************** 2.3 STELLAR JS ********************/
        $(window).stellar({
            horizontalScrolling: false,
        });
		
        /*********************** 2.4 TYPED JS ***********************/
        $("#typed").typed({
            strings: ["landing page.", "Marketing your apps.", "Sale your apps."],
            typeSpeed: 100,
            backDelay: 1000,
            loop: true,
        });

        /******************** 2.5 SCREENSHOTS CAROUSEL ********************/
        $(".screenshots").owlCarousel({
            dots: true,
            autoplay: true,
            loop: true,
            autoplayTimeout: 5000,
            margin: 15,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2,
                },
                768: {
                    items: 4,
                },
            },
        });
        $(".screenshots-mobile").owlCarousel({
			nav: false,
            autoplay: false,
            loop: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 1,
                },
                768: {
                    items: 1,
                },
            },
        });

        /******************** 2.6 TESTIMONIAL CAROUSEL ********************/
        $(".testimonials").owlCarousel({
            dots: true,
            items: 1,
            autoplay: true,
            loop: true,
            animateOut: 'fadeOut',
            autoplayTimeout: 5000,
        });

        /******************** 2.7 LATEST BLOG CAROUSEL ********************/
        $(".latest-blog").owlCarousel({
            dots: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i'],
            autoplay: false,
            autoplayTimeout: 5000,
            margin: 30,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 1,
                },
                768: {
                    items: 2,
                },
                990: {
                    items: 3,
                },
            },
        });

        /******************** 2.8 SCREENSHOTS POP-UP ********************/
        $('.zoom-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            gallery: {
            enabled: true,
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
		
        /******************** 2.9 VIDEO POP-UP ********************/
		$(".js-modal-btn").modalVideo();
		
		/******************** 2.10 COUNTER UP ********************/
		$('.counter').counterUp({
			delay: 10,
			time: 2000
		});
		
		/******************** 2.11 CONTACT FORM ********************/
		function isValidEmail(emailAddress) {
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			return pattern.test(emailAddress);
		};
		$("#contact-form").on('submit', function(e) {
			e.preventDefault();
			var success = $(this).find('.email-success'),
				failed = $(this).find('.email-failed'),
				loader = $(this).find('.email-loading'),
				postUrl = $(this).attr('action');

			var data = {
				name: $(this).find('.contact-name').val(),
				email: $(this).find('.contact-email').val(),
				subject: $(this).find('.contact-subject').val(),
				message: $(this).find('.contact-message').val()
			};
			if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1)) {
				$.ajax({
					type: "POST",
					url: postUrl,
					data: data,
					beforeSend: function() {
						loader.fadeIn(1000);
					},
					success: function(data) {
						loader.fadeOut(1000);
						success.delay(500).fadeIn(1000);
						failed.fadeOut(500);
					},
					error: function(xhr) { // if error occured
						loader.fadeOut(1000);
						failed.delay(500).fadeIn(1000);
						success.fadeOut(500);
					},
					complete: function() {
						loader.fadeOut(1000);
					}
				});
			} else {
				loader.fadeOut(1000);
				failed.delay(500).fadeIn(1000);
				success.fadeOut(500);
			}
			return false;
		});
	
		/******************** 2.12 AJAX MAILCHIMP SUBSCRIBE ********************/
		$("#subscribe-mailchimp").ajaxChimp({
			callback: mailchimpCallback,
			url: "http:////unitetheme.us12.list-manage.com/subscribe/post?u=5e0141c017272ff01c6c3a091&amp;id=335f7c3601" // Replace your mailchimp post url inside double quote "".  
		});

		function mailchimpCallback(resp) {
		   var error_msg = $('#subscribe-mailchimp').find('.error-msg');
		   var success_msg = $('#subscribe-mailchimp').find('.success-msg');
		   
		   if(resp.result === 'success') {
			  error_msg.fadeOut(200);
			  success_msg.html(resp.msg).fadeIn(200);
		   } else if(resp.result === 'error') {
			  success_msg.fadeOut(200);
			  error_msg.html(resp.msg).fadeIn(200);
		   }  
		};
		
		/******************** 2.13 LOCAL SUBSCRIPTION FORM ********************/
		$("#subscribe").submit(function (e) {
			e.preventDefault();
			var email = $("#subscriber-email").val();
			var dataString = 'email=' + email;

			function isValidEmail(emailAddress) {
				var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
				return pattern.test(emailAddress);
			};

			if (isValidEmail(email)) {
				$.ajax({
					type: "POST",
					url: "subscribe/subscribe.php",
					data: dataString,
					success: function () {
						$('.success-msg').fadeIn(1000);
						$('.error-msg').fadeOut(500);
						$('.hide-after').fadeOut(500);
					}
				});
			} else {
				$('.error-msg').fadeIn(1000);
			}

			return false;
		});
		
		/******************** 2.14 SCROLL TO UP ********************/
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 500) {
				$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
		$('.scrollup').on("click", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		
		/******************** 2.15 WOW JS ********************/
		var wow = new WOW({
			offset: 50,
			mobile: true
		});
		wow.init();
		});
		
		/******************** 2.16 COUNTDOWN TIMER ********************/
		$('#launch-timer').countdown('2017/10/01', function(event) { // Changed date to your lunching date
		   $(this).html(event.strftime('<ul><li><span>%-D</span> day%!D</li><li><span>%H</span> hour%!H</li><li><span>%M</span> minute%!M</li><li><span>%S</span> second%!S</li></ul>'));
		});
		
		/******************** 2.17 FAQ COLLAPSE ********************/
		$('.collapse.in').prev('.panel-heading').addClass('active');
		  $('#accordion, #bs-collapse')
			.on('show.bs.collapse', function(a) {
			  $(a.target).prev('.panel-heading').addClass('active');
			})
			.on('hide.bs.collapse', function(a) {
			  $(a.target).prev('.panel-heading').removeClass('active');
		});

})(jQuery);