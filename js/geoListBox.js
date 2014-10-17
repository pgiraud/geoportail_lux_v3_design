// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

// remember to change every instance of "pluginName" to the name of your plugin!
(function($) {

    // here we go!
    $.geoListBox = function(element, options) {

        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = { };

        // to avoid confusions, use "plugin" to reference the current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('pluginName').settings.propertyName from outside the plugin, where "element" is the
        // element the plugin is attached to;
        plugin.settings = {};

        var $element        = $(element),  // reference to the jQuery version of DOM element the plugin is attached to
              element       = element,        // reference to the actual DOM element
              $window       = $(window),
              $lists        = null
              breakpoint    = 970;

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);
            $lists = $('.box-listing', $element);
            
            $lists.each(function(){
                $_list  = $(this);
               
                if( $element.attr('data-carousel') == 'true' ){
                    $_list_container = $_list.parent();
                    $_list_container.append('<span class="prev ir"></span>');
                    $_list_container.append('<span class="next ir"></span>');     


                    $_next = $('.next', $_list_container);
                    $_prev = $('.prev', $_list_container);

                    var _swipe = true;
                    if( navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/WebKit/i)  ) {
                        _swipe = undefined;
                    }
                    
                    //alert(navigator.userAgent);
                    
                    $_list.carouFredSel({
                         circular    : false,
                         infinite    : false,    
                         responsive  : true,
                         scroll      : 1,
                         height      : '100%',
                         items	: {
                             width       : 320,
                             height      : '100%',
                             visible     : {
                                 min	 : 1,
                                 max	 : $('.box',$_list).length
                             }   
                         },
                         auto: false,
                          prev: {
                           button: $_prev
                         },
                         next: {
                           button: $_next
                         },
                         swipe: _swipe,
                         transition: true
                     }); 
                     
                     $('.caroufredsel_wrapper').css('overflow', 'inherit');
                }
               
                $('.box',$_list).each(function(i){
                   $(this).attr('data-position', i+1) ;
                });

            });                       
            
            if( $('#list-filter').length ){
                $('.filter', $('#list-filter')).on('click', function(e){
                    e.preventDefault();  
                    $_button = $(this);

                    if( ! $_button.hasClass('active') ){
                      $('.active', $('#list-filter')).removeClass('active');
                      $_button.addClass('active');
                    }                  

                    if( $_button.attr('data-filter') === 'all' ){
                        showAll();
                    }else{
                        showFiltered($_button.attr('data-filter'));
                    }
                });                   
            }
            
            if($('.shop-filter').length){
                $('.shop-filter').on('click',function(e){
                   e.preventDefault();

                   var filterType = $(this).attr('data-filter-type'); 
                   var filterValue = $(this).attr('data-filter-value');

                   shopFilters(filterType,filterValue);

                   $(this).parents('.dropdown-select').eq(0).removeClass('open');
                });
            }
            
            $(document).ready(function() {
                resizeContent();
            });

            $(window).resize(function() {
                resizeContent();
            });
            
            $(window).on('orientationchange', function(){
                resizeContent();
            });

        };
        
        var resizeContent = function(){
            var _initial_width = 1280;
            var _initial_font = 16;
            if('.overview-box'){
              var _initial_font = 20;  
            }
            var _window_width = $window.width();
                        
            var _width = $('.box', $element).eq(0).width();  
                        
            if( _window_width <=320 ||  _width < _window_width ){
                _initial_width = 320;
            }
            var _width_percent = _width * 100 / _initial_width;            
            
            if( $element.attr('data-carousel') == 'true' || ( $element.attr('data-carousel') == 'false' && _window_width > breakpoint ) || $element.attr('data-singlebox') == 'true' ){
                if( _window_width <= 320 || _width < _window_width ){                
                    $('.caroufredsel_wrapper', $element).height(_width+'px');  
                    $('.box-listing', $element).height(_width+'px');         
                    $('.box:not([data-height=auto])', $element).height(_width+'px');
                    $('.box-menu', $element).css('height','auto');
                } else {                
                    var _height_size = _width_percent * 108 / 100; 
                    $('.box', $element).height((_height_size )+'px');
                    $('.box[data-height=auto], .box-menu', $element).css('height','auto');
                }
                
                var _font_size = _width_percent * _initial_font / 100;
                
                if( $('.box', $element).attr('data-fontsize') != 'static' ) {
                    $('.box', $element).css('font-size', _font_size+'px');  
                    $('.box', $element).css('line-height', _font_size+'px');
                }
                       
 
            } else {
                if(  $element.attr('data-carousel') == 'false' && _window_width <= breakpoint ){
                    $('.box', $element).height('84px'); 
                    $('.box', $element).css('font-size', '16px');  
                    $('.box', $element).css('line-height', '16px'); 
                }
            }
        };
        
        
        var showAll = function(){
            if( $element.attr('data-filtered') == "true" ){
                $lists.each(function(){
                    showAllInList( $(this), true );                
                });            
            }
        };
        
        var showAllInList = function($list, sort){
            if( $element.attr('data-filtered') == "true" ){
                $('.box', $list).attr('data-disable', false);
                if( sort ){
                    $('.box', $list).tsort({attr:'data-position'});
                }
            }
        };
        
        var showFiltered = function(filter){ 
            if( $element.attr('data-filtered') == "true" ){
                $lists.each(function(){
                    $_list = $(this);
                    showAllInList($_list, false);

                    $('.box[data-'+filter+'=false]', $_list).attr('data-disable', true);
                    $('.box', $_list).tsort({attr:'data-disable'}, {attr:'data-position'});
                });
            }            
        };
        
        var shopFilters = function(filterType, filterValue) {
            if( $element.attr('data-filtered') == "true" ){
                $lists.each(function(){
                    $_list = $(this);
                    showAllInList( $_list, true );
                    
                    if(filterType == "tag"){
                        $('.box', $_list).each(function(){
                            $(this).attr('data-disable', true);
                            var _tagList = $(this).attr('data-tags');
                            if( _tagList.indexOf(filterValue) > -1 ){
                                $(this).attr('data-disable', false);
                            }
                            $('.box', $_list).tsort({attr:'data-disable'}, {attr:'data-position'});
                        });
                    } else {
                        $('.box[data-'+filterType+'!='+filterValue+']',$_list).attr('data-disable', true);
                        $('.box', $_list).tsort({attr:'data-disable'}, {attr:'data-position'});
                    }
                });
            }
        };
        
        // fire up the plugin! Call the "constructor" method
        plugin.init();
    };

    // add the plugin to the jQuery.fn object
    $.fn.geoListBox = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('geoListBox')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.geoListBox(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                $(this).data('geoListBox', plugin);
            }
        });
    };
})(jQuery);