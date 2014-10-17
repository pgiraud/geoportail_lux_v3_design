// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

// remember to change every instance of "pluginName" to the name of your plugin!
(function($) {

    // here we go!
    $.geoContactBox = function(element, options) {

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

        var $element        = $(element),      // reference to the jQuery version of DOM element the plugin is attached to
              element       = element,        // reference to the actual DOM element
              $window       = $(window),
              breakpoint    = 321;
      
        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);
            
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
            var _window_width = $window.width(); 
            var _initial_width = 320;
            
            $('li', $element).each(function(){
                $_li  = $(this);
                var _width = $_li.width();  
                var _width_percent = _width * 100 / _initial_width;            
                var _font_size = _width_percent * _initial_font / 100;
                
                if( $('.sub-question', $_li).length ){                    
                    var $_subs = $('.sub-question', $_li);
                    
                    _width = $_subs.eq(0).outerWidth();                
                    //_width = $_subs.eq(0).width();                

                    var _width_percent = _width * 100 / _initial_width;            
                    var _font_size = _width_percent * _initial_font / 100;
                
                             
                    
                    if( _window_width <= breakpoint ){
                        $_li.height( (breakpoint * 2) +'px');
                        $_subs.each(function(){
                           $_sub = $(this);
                           $_padding_top = $_sub.css('paddingTop');                          
                           $_sub.height( (breakpoint - parseInt($_padding_top)) +'px');     
                        });   
                    }else {
                        $_li.height(_width+'px');     
                        $_subs.height( _width  +'px');     
                    }
                    
                    $_subs.css('font-size', _font_size+'px');  
                    $_subs.css('line-height', _font_size+'px'); 
                } else {
                    var _width_percent = _width * 100 / _initial_width;            
                    var _font_size = _width_percent * _initial_font / 100;
                    
                    $_li.height(_width+'px');                                     
                    $_li.css('font-size', _font_size+'px');  
                    $_li.css('line-height', _font_size+'px'); 
                }
                
                
            });            
            
        };
            
        
        // fire up the plugin! Call the "constructor" method
        plugin.init();
    };

    // add the plugin to the jQuery.fn object
    $.fn.geoContactBox = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('geoContactBox')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.geoContactBox(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                $(this).data('geoContactBox', plugin);
            }
        });
    };
})(jQuery);