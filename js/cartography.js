(function($) {

    function loadTheme(theme) {
        var current = $(document.body).attr('data-map-theme');
        $('#catalog-' + current).hide();

        $(document.body).attr('data-map-theme', theme);
        $('#logo .baseline').text('Administration de ' + theme);
        $('#theme-selector span').text(theme);
        $('#catalog-' + theme).show();
    }

    $(document).ready(function() {
        // load theme
        var theme = getParameterByName('theme') || 'grand-public';
        loadTheme(theme);


        /* Hide welcome overlayer */
        if ($('.welcome-overlayer').length) {
            $('.welcome-overlayer, .close-overlayer').on('click', function() {
                if( !$(this).hasClass('off') ) {
                    $(this).addClass('off');
                    $(this).fadeOut();

                    var tooltips = $(".left-menu .couches").qtip({
                        id: "mytooltip",
                        content: "Cliquez ici pour ajouter des couches",
                        position: {
                            my: 'bottom left',  // Position my top left...
                            at: 'top center' // at the bottom right of...
                        },
                        style: {
                            classes: 'tooltip',
                            tip: {
                                corner: true
                            }
                        }
                    });
                    var api = tooltips.qtip('api');
                    api.show("mytooltip");
                    // simulate a click on couches
                    //$('.left-menu .couches').click();
                }
            });
        }

        /* Switch header */
        if ($('[data-header-show]').length) {
            $('[data-header-show]').on('click', function(e) {
                e.preventDefault();
                var showHeader = $(this).attr('data-header-show'),
                        hideHeader = $(this).attr('data-header-hide');

                $('.' + hideHeader).fadeOut("slow", function() {
                    $('.' + showHeader).fadeIn('slow');
                });
            });
        }
        
        /* Map legend select */
        if( $('.select','.map-legend').length ){
            $('.select-value').each(function(){
                $(this).on('click',function(){
                   var  _list = $(this).next('ul'),
                        _selectParent = $(this).parent(".select"),
                        _valueWidth = $(this).innerWidth(),
                        _listHeight = $(_list).height();
                        
                   _list.css({
                      'top': -(_listHeight),
                      'width': _valueWidth
                   });
                   
                   if(_selectParent.hasClass('open')){
                       _selectParent.removeClass('open');
                   } else {
                       _selectParent.addClass('open');
                   }
                });
            });
        }
        if( $('.toggle-legend').length ){
            $('.toggle-legend').on('click',function(){
                var _mapLegend = $(this).parent('.map-legend');
               _mapLegend.toggleClass('is-open');
            });
        }
        
        /* Sortable my layers */
        if($(".my-layers").length){
            $(".my-layers").sortable();
        }

        if ($('#add-layers').length) {
            $('#add-layers').on('click', function() {
                $('#liste').click();
            });
        }
        // simulate a click on couches

        // show message when adding a layer
        $('.icheckbox_square-blue .iCheck-helper').on('click', function() {
            $('#flash').text('Couche "Réserves forestières" ajoutée');
            $('#flash').fadeIn().delay(2000).fadeOut(800);
            $('#my-layers-count').text(3);
        });

        $('.themes-list>li>a').on('click', function() {
            var theme = $(this).attr('data-map-theme');
            if (theme) {
                loadTheme(theme);
                $('#themes-content').hide();
            }
        });

        $('#theme-selector>a').on('click', function() {
            $('#themes-content').show();
            return false;
        });

        $('.main').on('click', function(evt) {
            if (evt.clientX < 1000 && evt.clientX > 400 && evt.clientY > 420 && evt.clientY < 800) {
                $('#vtt').show();
                $('.infos').show().click();
                $('#results').show();
                $('#results_empty').hide();
                $('.infos .badge').show();
            }
        });
        $('#clear').on('click', function() {
            $('#vtt').hide();
            $('#results').hide();
            $('#results_empty').show();
            $('.infos .badge').hide();
        });

        /***** 
         ** Slidepanel 
         *****/
        if ($('.sidepanel').length) {
            /* Scrollbar */
            var calcScrollableHeight = function() {
                if ($('.scrollable').length) {
                    $('.scrollable').each(function(){
                       var scrollableHeight = $('.sidepanel').innerHeight() - $(this).position().top - 10;
                        $(this).css('height', scrollableHeight); 
                    });
                }
            };
            var isScrollable = function() {
                if ($('.scrollable').length) {
                    var scrollable = $(".scrollable");
                    scrollable.each(function() {
                        $(this).jScrollPane({
                            verticalDragMaxHeight: 50,
                            verticalGutter : 1,
                            mouseWheelSpeed : 30,
                            contentWidth : 300
                        });
                    
                        var scrollableAPI = $(this).data('jsp');
                        scrollableAPI.reinitialise();   
                    });
                }
            };


            /* Slidepanel content height */
            var tabsContentTop = $('.tabs-content').position().top,
                    sidepanelHeight = $('.sidepanel').innerHeight();
            $('.tabs-content').height(sidepanelHeight - tabsContentTop);


            /* Toggle slidepanel when menu is clicked */
            var sidePanelBtn = $('a', '.left-menu'),
                    sidePanel = $('.sidepanel'),
                    closeSidePanel = $('.close-panel', '.sidepanel');

            /* Open */
            sidePanelBtn.each(function() {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    var panelToOpen = $(this).attr('data-slidepanel');

                    /* Active menu */
                    $('.active', '.left-menu').removeClass('active');
                    $(this).addClass('active');

                    /* Slide sidepanel */
                    $(sidePanel).css('left', '0');
                    $('> div', sidePanel).hide().filter('.' + panelToOpen).show();

                    /* Push content to right */
                    $('.main ').css('margin-left', '320px');

                    /* Scrollable height */
                    calcScrollableHeight();
                    isScrollable();
                });
            });

            /* Close */
            closeSidePanel.on('click', function() {
                $(this).parents('.sidepanel').css('left', '-320px');
                $('.main ').css('margin-left', '0');

                $('.active', '.left-menu').removeClass('active');

                //if ($(this).parents('.infos-panel').length) {
                    //$('.infos').hide();
                    //$('#vtt').hide();
                //}
            });


            /* TABS */
            var _tabs = $('.tabs', '.sidepanel');
            $(_tabs).each(function() {
                var _tabsContent = $(this).siblings('.tabs-content').find('> div');
                $('li', this).on('click', function() {
                    var _parent = $(this).parent();
                    var _target = $(this).attr('id');
                    _tabsContent.hide().filter('#' + _target + '-content').show();
                    $('.active', _parent).removeClass('active');
                    $(this).addClass('active');
                }).filter(':first').click();
            });

            /* Accordion */
            var accordionBtn = $('.toggle-accordion', '.sidepanel');
            accordionBtn.each(function() {
                $(this).on('click', function() {
                    if (!$(this).hasClass('active')) {
                        $(this).parents('ul').first().find('.toggle-accordion').removeClass('active');
                        $(this).parents('ul').first().find('li .accordion-content').slideUp();
                        $(this).next('.accordion-content').slideDown(function() {
                            isScrollable();
                        });
                        $(this).addClass('active');
                    } else {
                        $(this).next('.accordion-content').slideUp(function() {
                            isScrollable();
                        });
                        $(this).removeClass('active');
                    }
                });
            });
        }


        var change = getParameterByName('change');
        if (change) {
            $('.welcome-overlayer').hide();
            $('.left-menu>li>a.couches').click();
            $('#liste').click();
        }

    });

})(jQuery);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
