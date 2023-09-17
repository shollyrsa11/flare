(function($) {

    if (!Cookies.get('popupViewed')) {
        Cookies.set('popupViewed', '0', {
            expires: 7
        });
    }

    $('body.home header').addClass('active');
    $('.builder-hero').addClass('active');

    //Mobile menu
    $('html').on('click', '.mobile header .nav-container .main-navigation #menu-main-navigation > .menu-item > a', function(e) {
        e.preventDefault();
        console.log('click');
        var menuParent = $(this).parent();
        $('header .nav-container .main-navigation #menu-main-navigation > .menu-item').not(menuParent).find('.sub-menu').slideUp(200, function() {});
        $(this).parent().find('.sub-menu').slideToggle(200, function() {});
    });

    //Hamburger
    $("header .hamburger").on("click", function() {
        $('body').toggleClass('menu-active');
        $(this).toggleClass('is-active');
        $("header .nav-container").first().fadeToggle(200, "linear");
        var windowHeight = $(window).height();
        var headerHeight = 101;
        var menuHeight = $('.menu-main-navigation-container').outerHeight(true);
        var ctaHeight = $('.header-cta-navigation').outerHeight(true);
        var socialHeight = $('header .nav-container .inner>.social-wrapper').outerHeight(true);
        //console.log('windowHeight: '+windowHeight);
        //console.log('headerHeight: '+headerHeight);
        //console.log('menuHeight: '+menuHeight);
        //console.log('ctaHeight: '+ctaHeight);
        //console.log('socialHeight: '+socialHeight);
        var menuMargin = windowHeight - headerHeight - menuHeight - ctaHeight - socialHeight + 0;
        //console.log('Menu margin: '+menuMargin);
        $('nav.main-navigation').css('margin-bottom', menuMargin);
    });

    //TLT
    //if ($(".tlt")[0]){
    var tltLine1 = {
        initialDelay: 0,
        autoStart: true,
        in: {
            effect: 'fadeInUp',
            delayScale: 0.5,
            delay: 50,
        },
    };
    var tltLine2 = {
        initialDelay: 200,
        autoStart: true,
        in: {
            effect: 'fadeInUp',
            delayScale: 0.5,
            delay: 50,
        },
    };
    var tltLine3 = {
        initialDelay: 400,
        autoStart: true,
        in: {
            effect: 'fadeInUp',
            delayScale: 0.5,
            delay: 50,
        },
    };

    var tltMobile = {
        initialDelay: 0,
        autoStart: true,
        in: {
            effect: 'fadeInUp',
            delayScale: 0.5,
            delay: 10,
        },
    };
    //}

    //Calc menu offset
    function menuOffset() {
        $('nav.main-navigation .menu > .menu-item').each(function(i, obj) {
            var offset = $(this).position().left;
            var sub_height = $(this).find('.sub-menu').outerHeight();
            $(this).attr('data-offset', offset);
            $(this).attr('data-height', sub_height);
        });
    }

    //Weglot menu recalc 
    Weglot.on("languageChanged", function(newLang, prevLang) {
        setTimeout(function() {
            menuOffset();
            //console.log('Lang update');
        }, 700);
    });


    //Resolution specific
    $(window).on('load resize', function() {

        iconBoxCalc()

        //Tab marker calc
        var initLength = $('.tab-nav span.active').width();
        $('.tab-nav').css('--decoration-width', initLength + 'px');
        //console.log('Width: '+initLength);

        //Mobile
        if ($(window).width() < 973) {

            //Environment classes
            $('body').removeClass('desktop');
            $('body').addClass('mobile');

            //Remove Megamenu
            $('#sub-menu-container').remove();

            //TLT
            if ($(".mobile .tlt")[0]) {
                if ($(".mobile .tlt.line1")[0]) {
                    var tlt_mobile = new IntersectionObserver(function(entries) {
                        if (entries[0].isIntersecting === true)
                            $('.mobile .tltmobile').textillate(tltMobile).removeClass('inactive');
                    }, {
                        threshold: [1]
                    });
                    tlt_mobile.observe(document.querySelector(".mobile .tltmobile"));
                }
            }
        }

        //Desktop
        if ($(window).width() > 974) {
            $('body').removeClass('mobile');
            $('body').addClass('desktop');

            //Reset sub-menus
            $('#menu-main-navigation .menu-item .sub-menu').css('display', '');


            //Megamenu setup
            if (!$('#sub-menu-container').length) {
                $('#menu-main-navigation').append('	<div id="sub-menu-container"><span class="marker"></span><div id="sub-menu-holder"></div></div>');
            };


            $(document).ready(function() {
                setTimeout(function() {
                    menuOffset()
                }, 100);
            });
            $('#menu-main-navigation').mouseenter(function() {
                $('#blur-overlay.menu').fadeIn('300ms', function() {});
            })
            $('.main-navigation .menu > .menu-item').mouseenter(function() {
                if ($(this).hasClass("wide")) {
                    var mega_total = 502;
                    var mega_width = mega_total / 2;
                } else {
                    var mega_width = 148;
                };
                var sub_height = $(this).attr('data-height');
                $('#sub-menu-holder').css('height', sub_height);
                var offset = parseFloat($(this).attr('data-offset'));
                var offset_center = offset + parseFloat($(this).outerWidth()) / 2;
                var offset_align_marker = (offset_center - mega_width) - 7.5;
                var offset_decimal_marker = offset_align_marker.toFixed(2);
                var offset_align_holder = (offset_center - mega_width);
                var offset_decimal_holder = offset_align_holder.toFixed(2);
                $('#sub-menu-holder').css('left', offset_decimal_holder + 'px');
                $('#sub-menu-container .marker').css('left', 'calc(' + offset_decimal_marker + 'px + ' + mega_width + 'px)');
            })
            $('#menu-main-navigation').mouseleave(function(events) {
                $('#blur-overlay.menu').fadeOut('300ms', function() {});
            });


            //TLT
            //if ($(".tlt")[0]){
            if ($(".desktop .tlt.line1")[0]) {
                var tlt_l1 = new IntersectionObserver(function(entries) {
                    if (entries[0].isIntersecting === true)
                        $('.desktop .tlt.line1').textillate(tltLine1).removeClass('inactive');
                }, {
                    threshold: [1]
                });
                tlt_l1.observe(document.querySelector(".desktop .tlt.line1"));
            }

            if ($(".desktop .tlt.line2")[0]) {
                var tlt_l2 = new IntersectionObserver(function(entries) {
                    if (entries[0].isIntersecting === true)
                        $('.desktop .tlt.line2').textillate(tltLine2).removeClass('inactive');
                }, {
                    threshold: [1]
                });
                tlt_l2.observe(document.querySelector(".desktop .tlt.line2"));
            }

            if ($(".desktop .tlt.line3")[0]) {
                var tlt_l3 = new IntersectionObserver(function(entries) {
                    if (entries[0].isIntersecting === true)
                        $('.desktop .tlt.line3').textillate(tltLine3).removeClass('inactive');
                }, {
                    threshold: [1]
                });
                tlt_l3.observe(document.querySelector(".desktop .tlt.line3"));
            }
            //}
        }
    });

    //AOS
    $('img[loading="lazy"').attr({
        "data-aos": "fade-up",
        "data-aos-duration": "600"
    });
    AOS.init();

    //Icon box calcs
    function iconBoxCalc() {

        $('.builder-icon-boxes').removeClass('calculated');

        $('.builder-icon-boxes:not(.calculated)').each(function() {
            $(this).addClass('calculated');

            var titleHeight = -1;
            var iconHeight = -1;
            var contentHeight = -1;
            var buttonHeight = -1;

            //Align all fetch
            $(this).find('.box-wrapper.align-all .title-wrapper .title').each(function() {
                titleHeight = titleHeight > $(this).outerHeight(true) ? titleHeight : $(this).outerHeight(true);
            });
            $(this).find('.box-wrapper.align-all .icon-wrapper .icon').each(function() {
                iconHeight = iconHeight > $(this).outerHeight(true) ? iconHeight : $(this).outerHeight(true);
            });
            $(this).find('.box-wrapper.align-all .content-wrapper .content').each(function() {
                contentHeight = contentHeight > $(this).outerHeight(true) ? contentHeight : $(this).outerHeight(true);
            });

            $(this).find('.box-wrapper.align-all .buttons-wrapper .buttons').each(function() {
                buttonHeight = buttonHeight > $(this).outerHeight(true) ? buttonHeight : $(this).outerHeight(true);
            });

            //Align buttons 
            $(this).find('.box-wrapper.align-buttons .title-wrapper .title').each(function() {
                titleHeight = titleHeight > $(this).outerHeight(true) ? titleHeight : $(this).outerHeight(true);
            });
            $(this).find('.box-wrapper.align-buttons .icon-wrapper .icon').each(function() {
                iconHeight = iconHeight > $(this).outerHeight(true) ? iconHeight : $(this).outerHeight(true);
            });
            $(this).find('.box-wrapper.align-buttons .content-wrapper .content').each(function() {
                contentHeight = contentHeight > $(this).outerHeight(true) ? contentHeight : $(this).outerHeight(true);
            });

            //console.log('titleHeight: '+titleHeight);
            //console.log('iconHeight: '+iconHeight);
            //console.log('contentHeight: '+contentHeight);
            //console.log('buttonHeight: '+buttonHeight);


            //Align all apply
            $(this).find('.box-wrapper.align-all .title-wrapper').each(function() {
                $(this).height(titleHeight);
            });
            $(this).find('.box-wrapper.align-all .icon-wrapper').each(function() {
                $(this).height(iconHeight);
            });
            $(this).find('.box-wrapper.align-all .content-wrapper').each(function() {
                $(this).height(contentHeight);
            });
            $(this).find('.box-wrapper.align-all .buttons-wrapper').each(function() {
                $(this).height(buttonHeight);
            });

            //Align buttons apply
            $(this).find('.box-wrapper.align-buttons .inner').each(function() {
                $(this).height(titleHeight + iconHeight + contentHeight);
            });

            var titleHeight = -1;
            var iconHeight = -1;
            var contentHeight = -1;

        })

    }


    //Blog cat filter
    $(".flare-news .filter-toggle").on("click", function() {
        $(this).toggleClass('active');
        $('.flare-news .wrapper .cat-nav .cats').slideToggle();
    });



    //Product box calcs
    $(document).ready(productBoxCalc);
    $(window).resize(productBoxCalc);

    function productBoxCalc() {
        var titleHeight = -1;
        var taglineHeight = -1;
        var contentHeight = -1;
        $('.builder-product-boxes .box-wrapper .box .title').each(function() {
            titleHeight = titleHeight > $(this).outerHeight(true) ? titleHeight : $(this).outerHeight(true);
        });
        $('.builder-product-boxes .box-wrapper .box .tagline').each(function() {
            taglineHeight = taglineHeight > $(this).outerHeight(true) ? taglineHeight : $(this).outerHeight(true);
        });
        $('.builder-product-boxes .box-wrapper .box .content').each(function() {
            contentHeight = contentHeight > $(this).outerHeight(true) ? contentHeight : $(this).outerHeight(true);
        });
        $('.builder-product-boxes .box-wrapper .box .title-wrapper').each(function() {
            $(this).height(titleHeight + taglineHeight);
        });
        $('.builder-product-boxes .box-wrapper .box .content-wrapper').each(function() {
            $(this).height(contentHeight);
        });
    }

    //Tab nav
    $('.tab-nav span').on("click", function() {
        $('.tab-nav span').removeClass('active');
        $(this).addClass('active');
        var tab = $(this).attr('data-source');
        $('.tabs').removeClass('active').addClass('inactive');
        $('.' + tab).removeClass('inactive').addClass('active');
    });

    //Wallet filter
    $("#wallet-search").keyup(function() {
        var filter = $(this).val().trim().toLowerCase();
        var wrapper = $('.archive-wallet-grid .grid-wrapper.search');
        $('.archive-wallet-grid .box').each(function() {
            if ($(this).attr('data-name').toLowerCase().includes(filter)) {
                $(this).appendTo(".archive-wallet-grid .grid-wrapper.search");
            } else {
                $(this).appendTo(".archive-wallet-grid .temp");
            }
            wrapper.find('.box').sort(function(a, b) {
                return +a.dataset.order - +b.dataset.order;
            }).appendTo(wrapper);
        });
    });


    //Contact/newsletter validation
    $("#contact-form form").validate({
        ignore: [],
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            MESSAGE: "required",
            EMAIL: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            hiddenRecaptcha: {
                required: true,
            }

        },
        // Specify validation error messages
        messages: {
            MESSAGE: "Please enter your message",
            EMAIL: "Please enter a valid email address",
            hiddenRecaptcha: "Please complete the reCAPTCHA"
        },

        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
            form.submit();
        }
    });

    window.recaptchaCallback = recaptchaCallback;

    function recaptchaCallback() {
        $('#hiddenRecaptcha').val(true);
        $('#hiddenRecaptcha-error').hide();
        console.log('Clicked');
    };

    function contactValid() {
        if ($('#contact-form #mce-EMAIL').attr('aria-invalid') == 'false' && $('#contact-form textarea').attr('aria-invalid') == 'false') {
            $('#contact-form input[type=submit]').removeClass('inactive');
        }
    }

    $("#contact-form form textarea, #contact-form #mce-EMAIL").keydown(function() {
        contactValid();
    })

    $("#contact-form form input[type='checkbox'], #contact-form form input[type='radio']").change(function() {
        //contactValid();
    })

    //reCAPTCHA required
    window.onload = function() {
        var el = document.getElementById('g-recaptcha-response');
        if (el) {
            el.setAttribute('required', 'required');
        }
    }


    $('#mce-TCS-NL').change(
        function() {
            if ($(this).is(':checked') && $(this).val() == 'tcs_confirmed') {
                $('.newsletter-wrapper input[type=submit]').removeClass('inactive');
            }
        });

    //ContactForm tracking
    $('#contact-form input[type=submit]').click(function() {
        //$('#contact-form .test-btn').click(function() {
        $.ajax({
            url: tracking.ajax_url,
            data: {
                action: 'contactFormScripts',
            },
            type: "get",
            contentType: false,
            cache: false,
            processData: true,
            success: function(data, response) {
                //console.log( "AJAX success");
                //console.log(data);
                $('head').append(data);
            }
        });
    });

    //NewsletterForm tracking
    $('.newsletter-wrapper input[type=submit]').click(function() {
        //$('#contact-form .test-btn').click(function() {
        $.ajax({
            url: tracking.ajax_url,
            data: {
                action: 'newsletterFormScripts',
            },
            type: "get",
            contentType: false,
            cache: false,
            processData: true,
            success: function(data, response) {
                //console.log( "Newsletter success");
                //console.log(data);
                $('head').append(data);
            }
        });
    });

    //Newsletter AJAX
    var $form = $('.newsletter-wrapper form');
    if ($form.length > 0) {
        $('.newsletter-wrapper form input[type="submit"]').bind('click', function(event) {
            if (event) event.preventDefault();
            register($form);
        });
    }

    function register($form) {
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function(err) {
                alert("Could not connect to the registration server. Please try again later.");
            },
            success: function(data) {
                if (data.result != "success") {
                    $('.newsletter-wrapper .email-error').show();
                } else {
                    $('.newsletter-wrapper form').hide();
                    $('.newsletter-wrapper .thank-you').show();
                }
            }
        });
    }


    //Popup
    function popupActive() {
        $('body').addClass('popup-active');
        $('#popup-wrapper').fadeIn('500ms', function() {});
        $('#blur-overlay.popup').fadeIn('300ms', function() {});
        $('#blur-overlay.menu').fadeOut('300ms', function() {});
        $('#popup-modal').addClass('active').fadeOut('500ms', function() {});
        Cookies.set('popupViewed', '1', {
            expires: 7
        })
    }
    if (Cookies.get('popupViewed') == '0') {
        setTimeout(function() {
            $('#popup-modal').fadeIn('1500ms', function() {});
        }, 15000);
    }
    $("a[href='#newsletter']").on("click", function() {
        popupActive();
    });

    $("#popup-modal .close").on("click", function() {
        Cookies.set('popupViewed', '1', {
            expires: 7
        })
        $('#popup-modal').fadeOut('100ms', function() {});
    });

    $("#popup-wrapper .popup .close").on("click", function() {
        $('body').removeClass('popup-active');
        $('#popup-wrapper').fadeOut('100ms', function() {});
        $('#blur-overlay.popup').fadeOut('300ms', function() {});
    });




})(jQuery);

var nav = document.querySelector('.tab-nav');
if (typeof(nav) != 'undefined' && nav != null) {
    nav.addEventListener('click', function(event) {
        if (event.target.tagName == 'SPAN') {
            nav.style.setProperty(
                '--decoration-left',
                event.target.offsetLeft + 'px'
            );
            nav.style.setProperty(
                '--decoration-width',
                event.target.offsetWidth + 'px'
            );
        }
    })
}