(function($) {

    $(document).ready(function() {
        /* Selectbox */
        if ($('select').length) {
            $('select').selectbox();
        }
        
        /* Modal */
        if($('[data-modal="open"]').length){
            $('[data-modal="open"]').magnificPopup({
                type:'inline',
                midClick: true,
                showCloseBtn: false
            });            
        }

        /* Checkbox and radio */
        if ($('[type="checkbox"]').length || $('[type="radio"]').length) {
            $('[type="checkbox"], [type="radio"]').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
            });
        }
        
        /* scrollable */
        if ($('.scrollable').length) {
            var scrollable = $(".scrollable");
            scrollable.each(function() {
                $(this).jScrollPane({
                    verticalDragMaxHeight: 40,
                    verticalGutter : 0,
                    mouseWheelSpeed : 30
                });

            });
        }
        
        /* sidepanel */
        if($('.sidepanel').length){
            $('.open-sidepanel').on('click',function(){
               $('body').addClass('sidepanel-open'); 
            });
            $('.close-sidepanel').on('click',function(){
               $('body').removeClass('sidepanel-open'); 
            });
        }

        /* Accordion */
        var accordionBtn = $('.toggle-accordion', '.shop-map .sidepanel');
        accordionBtn.each(function() {
            $(this).on('click', function() {
                if (!$(this).hasClass('active')) {
                    $(this).parents('ul').first().find('.toggle-accordion').removeClass('active');
                    $(this).parents('ul').first().find('.accordion-content').slideUp();
                    $(this).next('.accordion-content').slideDown();
                    $(this).addClass('active');
                } else {
                    $(this).next('.accordion-content').slideUp();
                    $(this).removeClass('active');
                }
            });
        });

        /* Log and connect box */
        if ($('.log-box').length) {
            function logBoxHeight() {
                var boxHeight = $('li', '.log-box').height(),
                        containerHeight = $(window).height() - $('#navigation').height() - $('#footer').height() - $('#content-header').height();

                if ($(window).width() > 769 && containerHeight > boxHeight) {
                    $('li', '.log-box').css('height', containerHeight);
                }
            }

            $(window).resize(function() {
                logBoxHeight();
            });

            $(window).load(function() {
                logBoxHeight();
            });
        }

        /**  Manage menu  **/
        if ($('#user-experience>li>a').length) {
            $('#user-experience>li>a').each(function() {
                var _$element = $(this);
                _$element.on('click', function(e) {
                    e.preventDefault();
                    var _current = _$element.parent().hasClass('open');
                    $('#header .open').removeClass('open');
                    if (!_current) {
                        _$element.parent().addClass('open');
                    }
                });
            });
        }

        if ($('#share-button').length) {
            $('#share-button').each(function() {
                var _$element = $(this);
                _$element.on('click', function(e) {
                    e.preventDefault();
                    var $_parent = _$element.parent();
                    var _current = $_parent.hasClass('open');
                    $_parent.removeClass('open');
                    if (!_current) {
                        $_parent.addClass('open');
                    }
                });
            });
        }
        
        if ($('.has-child').length) {
            $('.has-child').each(function() {
                var _$element = $(this);
                _$element.on('click', function(e) {
                    e.preventDefault();
                    var $_parent = _$element.parent();
                    var _current = $_parent.hasClass('open');
                    $_parent.removeClass('open');
                    if (!_current) {
                        $_parent.addClass('open');
                    }
                });
            });
        }

        if ($('#mobile-logo').length) {
            $('#mobile-logo').on('click', function(e) {
                e.preventDefault();
                var _current = $(this).hasClass('open');
                $('#header .open').removeClass('open');
                if (!_current) {
                    $(this).addClass('open');
                    $('#main-navigation').addClass('open');
                }
            });
        }

        /* Mobile dropdown menu */
        if ($('.box-menu').length) {
            $('.toggle-nav').on('click', function(e) {
                e.preventDefault();
                var _current = $(this).hasClass('open');
                var _menu = $('.toggle-nav + ul');
                $('.box-menu .open').removeClass('open');
                if (!_current) {
                    $(this).addClass('open');
                    $(_menu).addClass('open');
                }
            });
        }
        if ($('.inner-product-nav').length) {
            $('.toggle-nav').on('click', function(e) {
                e.preventDefault();
                var _current = $(this).hasClass('open');
                var _menu = $('.toggle-nav + ul');
                $('.inner-product-nav .open').removeClass('open');
                if (!_current) {
                    $(this).addClass('open');
                    $(_menu).addClass('open');
                }
            });

            /* Smooth scroll */
            $('a[href^="#"]', '.inner-product-nav').click(function(e) {
                e.preventDefault();
                $('a[href^="#"]', '.inner-product-nav').removeClass('active');
                $(this).addClass('active');

                var the_id = $(this).attr('href');
                if ($(window).width() >= 600) {
                    var offset = $('#content-header').height() + $('.inner-product-nav').height() + 63;
                } else {
                    var offset = 20;
                }

                $('html, body').animate({
                    scrollTop: ($(the_id).offset().top) - offset
                }, 'slow');

            });
        }
        if ($('.dropdown-select').length) {
            var _dropdownSelect = $('.dropdown-select');
            $('.toggle-nav', _dropdownSelect).on('click', function(e) {
                e.preventDefault();
                var _parent = $(this).parent('.dropdown-select');
                var _isOpen = $(_parent).hasClass('open');

                if (!_isOpen) {
                    $(_parent).addClass('open');
                } else {
                    $(_parent).removeClass('open');
                }
            });
        }


        if ($('.basket-list').length) {
            function basketCarousel() {
                var _nbrItems = $('.box-listing li', '.basket-list').length,
                        _windowWidth = $(window).width(),
                        _maxItems = Math.floor(_windowWidth / 350);


                $('.box-listing', '.basket-list').carouFredSel({
                    circular: true,
                    infinite: false,
                    responsive: true,
                    scroll: 1,
                    height: 109,
                    width: "100%",
                    auto: false,
                    swipe: true,
                    items: {
                        width: 350,
                        height: "100%",
                        visible: {
                            min: 1,
                            max: _maxItems
                        }
                    },
                    prev: {
                        button: $('.prev', '.basket-list-nav')
                    },
                    next: {
                        button: $('.next', '.basket-list-nav')
                    }
                });
            }


            $(window).load(function() {
                basketCarousel();
            });

            $(window).resize(function() {
                basketCarousel();
            });


        }

        if ($('#carousel').length) {
            $('#carousel').carouFredSel({
                width: '100%',
                height: 'variable',
                align: 'left',
                responsive: true,
                items: {
                    height: 'variable'
                },
                auto: false,
                /*
                 auto: {
                 pauseOnHover:   true
                 },*/
                scroll: {
                    items: 1
                },
                swipe: true,
                pagination: {
                    container: '#carousel-pager'
                },
                transition: true
            });
        }
        
        /* Resize box title */
        if ($('.box-listing-container').length) {
            $('.box-listing-container').geoListBox();
        }

        if ($('#contact-list').length) {
            $('#contact-list').geoContactBox();
        }

        if ($('.overview-box').length) {
            $('.overview-box').geoContactBox();
        }

        if ($('input').length) {
            $('input').placeholder();
        }
        resizeWide();


        if ($('body').hasClass('search') && $('#navigation-search').length) {
            if ($(window).width() > 600) {
                $('.item', $('.search', $('#user-experience'))).eq(0).trigger('click');
            }
        }

        /* Account tabs */
        if ($('#navigation-account.logged-in').length) {
            var _tab = $('.tab', '#navigation-account');
            var _tabContent = $('.account-content > *');
            $(_tab).on('click', function() {
                var _target = $(this).attr('id');
                _tabContent.hide().filter('#content-' + _target).show();
                $('.active', '#navigation-account').removeClass('active');
                $(this).addClass('active');
            }).filter(':first').click();
            ;
        }
        
        /* Popover - tooltip */
        if ( $('[rel=popover]').length ){
            $('[rel=popover]').popover({
                hover: false,
                click: true,
                resize: true,
                scroll: true,
                topOffset: 21
              });
        }
    });

    $(window).resize(function() {
        resizeWide();
    });

    $(window).on('orientationchange', function() {
        resizeWide();
    });

    function resizeWide() {
        var _limit_wide = 1280;
        $_window_width = $(window).width();
        var $_main_navigation = $('#main-navigation');
        var _percent = 100;

        var _initial_menu_size = '100%';
        var _initial_sub_menu_width = 257;
        var _initial_sub_menu__item_height = 31;


        if ($_window_width >= _limit_wide) {
            _percent = $_window_width * 100 / _limit_wide;
            $_main_navigation.css('font-size', _percent + '%');

            var _sub_menu_size = _percent * _initial_sub_menu_width / 100;
            $('.second-level', $_main_navigation).css('width', _sub_menu_size + 'px');

            var _sub_menu_item_height = _percent * _initial_sub_menu__item_height / 100;
            $('.second-level a', $_main_navigation).css('line-height', _sub_menu_item_height + 'px');

        } else {
            $_main_navigation.css('font-size', _initial_menu_size);
            $('.second-level', $_main_navigation).css('width', _initial_sub_menu_width + 'px');
            $('.second-level a', $_main_navigation).css('line-height', _initial_sub_menu__item_height + 'px');
        }

        if ($('#twitter-feed').length) {
            resizeWideTwitterFeed(_limit_wide, _percent);
        }
    }

    function resizeWideTwitterFeed(limit_wide, percent) {
        var _limit_wide = limit_wide;
        var $_twitter_feed = $('#twitter-feed');

        var _initial_font_size = 18;
        var _initial_line_height = 20;
        var _initial_height = 126;
        var _initial_width = 320;

        if (percent > 100) {
            $('h2', $_twitter_feed).css('font-size', percent + '%');

            var _font_size = percent * _initial_font_size / 100;
            $('p', $_twitter_feed).css('font-size', _font_size + 'px');

            var _line_height = percent * _initial_line_height / 100;
            $_twitter_feed.css('line-height', _line_height + 'px');

            var _height = percent * _initial_height / 100;
            $_twitter_feed.css('height', _height + 'px');

            var _width = percent * _initial_width / 100;
            $_twitter_feed.css('width', _width + 'px');
        } else {
            $('h2', $_twitter_feed).css('font-size', '100%');
            $('p', $_twitter_feed).css('font-size', _initial_font_size + 'px');
            $_twitter_feed.css('line-height', _initial_line_height + 'px');
            $_twitter_feed.css('height', _initial_height + 'px');
            $_twitter_feed.css('width', _initial_width + 'px');
        }
    }

})(jQuery);