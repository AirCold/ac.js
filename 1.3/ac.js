/*
*
*
*
* AirCold JS Library v1.3
* http://aircold.org/
*
* Date: 2016-03-20T16:47Z
*
*
*
Copyright 2015, 2016 AirCold Misha Landau



Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*
*
*/




( function( w ) {
    var ac = function( selector, context, nameselector ) {
        return new init( selector, context, nameselector )
    };
    
    
    init = function( selector ){
        
        if( !selector ) {
            return this;
        }
        
        var results;
        
        if( typeof selector === 'object' ) {
            results = [ selector ];
        } else{
            results = document.querySelectorAll( selector );
        }
        
        for( var i = 0; i < results.length; i++ ) {
            this[ i ] = results[ i ];
        }
        
        this.selector = results;
        this.nameselector = selector;
        this.length = i;
    };

    
    ac.prototype = {
        constructor: ac,
        length: 0,
        push: [].push,
        sort: [].sort,
        splice: [].splice
    };
    
    init.prototype = ac.prototype;
    
    
    w.$ = w.ac = ac;
    
    
    ac.extend = ac.prototype.extend = function() {
        
        var options, name, src, copy,
            
            target = arguments[ 0 ] || {},
            
            i = 1,
            
            length = arguments.length,
            
            deep = false;
        
        if ( typeof target === "boolean" ) {
            
            deep = target;
            
            target = arguments[ i ] || {};
            
            i++;
        
        }
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            if ( ( options = arguments[ i ] ) != null ) {

                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];


                    if ( target === copy ) {
                        continue;
                    }
                        target[ name ] = copy;
                }
            }
        }
        
        return target;
    }
    
    
    if( !window.userAgent ) {
        
        var userAgent = navigator.userAgent.toLowerCase();
    
    }
    
    var browser = {
        
        version: ( userAgent.match( /.+(?:me|ox|on|rv|it|era|opr|ie)[\/: ]([\d.]+)/ ) || [ 0, '0' ] )[ 1 ],
        opera: ( /opera/i.test( userAgent ) || /opr/i.test( userAgent ) ),
        msie: ( /msie/i.test( userAgent ) && !/opera/i.test( userAgent ) || /trident\//i.test( userAgent ) ) || /edge/i.test( userAgent ),
        msie6: ( /msie 6/i.test( userAgent ) && !/opera/i.test( userAgent ) ),
        msie7: ( /msie 7/i.test( userAgent ) && !/opera/i.test( userAgent ) ),
        msie8: ( /msie 8/i.test( userAgent ) && !/opera/i.test( userAgent ) ),
        msie9: ( /msie 9/i.test( userAgent ) && !/opera/i.test( userAgent ) ),
        mozilla: /firefox/i.test( userAgent ),
        chrome: /chrome/i.test( userAgent ) && !/edge/i.test( userAgent ),
        safari: ( !( /chrome/i.test( userAgent ) ) && /webkit|safari|khtml/i.test( userAgent ) ),
        iphone: /iphone/i.test( userAgent ),
        ipod: /ipod/i.test( userAgent ),
        iphone4: /iphone.*OS 4/i.test( userAgent ),
        ipod4: /ipod.*OS 4/i.test( userAgent ),
        ipad: /ipad/i.test( userAgent ),
        android: /android/i.test( userAgent ),
        bada: /bada/i.test( userAgent ),
        mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test( userAgent ),
        msie_mobile: /iemobile/i.test( userAgent ),
        safari_mobile: /iphone|ipod|ipad/i.test( userAgent ),
        opera_mobile: /opera mini|opera mobi/i.test( userAgent ),
        opera_mini: /opera mini/i.test( userAgent ),
        mac: /mac/i.test( userAgent ),
        search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test( userAgent )
    };
    
    function longPoll( timestamp, func ) {
        var queryString, callback;
        
        if( timestamp !== undefined )
            queryString = { 'ac_ajax': 'common', 'timestamp': timestamp };
        else
            queryString = { 'ac_ajax': 'common' };
        
        if( isObject( func ) && func !== undefined ){
            
            var url = func.url,
                type = func.type || 'POST',
                success = func.success || undefined,
                error = func.error || undefined,
                updates = func.updates || undefined;
        
        }
        
        ac.ajax( {
            url: url,
            data: queryString,
            type: type,
            success: function( res ) {
                
                try{
                    if( success !== undefined ) {
                        success.call( this, res );
                    }
                    
                    if(updates !== undefined){
                        
                        jcode = JSON.parse( res );
                        
                        longPoll( jcode.timestamp, func );
                        
                        if( jcode.new_message !== undefined ) {
                            func.updates.call(this, res);
                        
                        }
                    
                    }
                
                } catch( e ) {};
            
            },
            
            error: function( err ) {
                
                if( error !== undefined ) {
                    
                    error.call( this, err );
                
                }
            
            }
        
        } );
    
    };
    
    
    function isObject( obj ){
        
        return Object.prototype.toString.call( obj ) === '[object Object]'
            && !( browser.msie8 && obj && obj.item !== 'undefined'
                 && obj.namedItem !== 'undefined' );
    }
    
    function http_build_query( formdata, numeric_prefix, arg_separator ) {
        
        var key,
            use_val,
            use_key,
            i = 0,
            tmp_arr = [];
        
        if( !arg_separator ){
            
            arg_separator = '&';
        
        }
        
        for( key in formdata ) {
            use_key = encodeURIComponent( key );
            use_val = encodeURIComponent( ( formdata[ key ] ) );
            use_val = '' + use_val;
            use_val = use_val.replace(/%20/g, '+');
            
            if( numeric_prefix && !isNaN( key ) ) {
                
                use_key = numeric_prefix + i;
            
            }
            
            tmp_arr[ i ] = use_key + '=' + use_val;
            i++;
        
        }
        
        return tmp_arr.join( arg_separator );
    };
    
    
    
    ac.prototype.html = function( text ) {
        
        var ele;
        
        _eval_script( text );
        
        this.each( function() {
            ele = this;
            if( text !== undefined ) {
                
                this.innerHTML = text;
            
                
                if( ac.in_array( ele.tagName.toLowerCase(), [ 'text' ] ) ) {
                    
                    this.textContent = text;
                    
                }
                
                
            } else {
                
                ele = this.innerHTML || this.textContent;
                
            }
            
            
        } );
        
        
        return ele;
    };
    
    
    ac.prototype.refresh_dom = function() {
        
        var ele;
        
        _eval_script( text );
        
        this.each( function() {
            
            ele = this;
            
            var html = ele.innerHTML;
            
            ele.innerHTML = html;
            
        } );
        
        
        return this;
    };
    ac.prototype.blockCentr = function() {
        var bodyWidth = window.innerWidth / 2;
        this.each( function() {
            var ele = this;
            var e = this.offsetWidth / 2;
            this.style.marginLeft = bodyWidth - e + 'px';
            
            window.onresize = function() {
                bodyWidth = window.innerWidth / 2;
                ele.style.marginLeft = bodyWidth - e + 'px';
            }
        } );
        return this;
    };
    
    
    var _eval_script = function( content ) {
        
        var is_html = typeof content === 'object';

        if( !is_html ) {
            
            var c = document.createElement( 'div' );
            c.innerHTML = content;
            content = c;
            
        }
        
        content = new Array( content );
        
        ac.each( content, function() {
            
            var firstContent = this;
            
            var script = firstContent.getElementsByTagName( 'script' );
            
            ac.each( script, function() {
                
                eval( this.text );
                
                
            } );
            
        } );
        
    };
    
var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    
    
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};
    
    function isArraylike( obj ) {
        
        var length = "length" in obj && obj.length,
            type = ac.type( obj );
        
        if ( type === "function" || ac.isWindow( obj ) ) {
            return false;
        }
        
        if ( obj.nodeType === 1 && length ) {
            
            return true;
        
        }
        
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    };
    
    
    
    ac.event = {
        
        global: {},
        add: function( elem, types ){
            
        },
        remove: function(){
            
        }
    
    };
    
    ac.prototype.extend( {
        
        on: function(){
          
            
            
            
            
            
        },
        
        
        append: function( text ) {
            
            _eval_script( text );
            
            return this.domManip( arguments, function( elem ) {
                
                var target = this;
                
                target.appendChild( elem );
            
            } );
            
        },
        prepend: function( text ) {
            
            _eval_script( text );
            
            return this.domManip( arguments, function( elem ) {
                
                var target = this;
				target.insertBefore( elem, target.firstChild );
                
            } );
            
            
        },
        before: function( text ) {
            var ele;


            _eval_script( text );

            this.each( function() {

                ele = this;

                ele.insertAdjacentHTML( 'beforeBegin', text );

            } );

            return this;
        },
        after: function( text ) {

            var ele;

            _eval_script( text );

            this.each(function() {

                ele = this;

                ele.insertAdjacentHTML( 'afterEnd', text );

            } );

            return this;                
        },
        wrapAll: function(elms) {
            var elem;

            function getTarget(h){
                var container = document.createElement("div");
                container.innerHTML = h;
                return container.children[0];
            }
            elem = getTarget(elms);
            element = elem;
                while(element.firstElementChild){
                    element = element.firstElementChild;
                }
            this.each(function(){
                var el = this, parent = el.parentNode, sibling = el.nextSibling;
                element.appendChild(el);
                parent.insertBefore(elem, sibling);
            });

            return this;
        },
        addClass: function(className){
            var ele, attribute, element = this;
            this.each(function(){
                ele = this;
                if( className !== undefined ){
                    var classes = className.split( ' ' );
                    ac.each( classes, function( i, v ){
                        ele.classList.add( v );
                    });
                }
            });
            return this;
        },
        removeClass: function(className){
            var ele, attribute, element = this;
            this.each(function(){
                ele = this;
                if(className !== undefined){
                    var classes = className.split( ' ' );
                    ac.each( classes, function( i, v ){
                        ele.classList.remove( v );
                    });
                }else{
                    element.attr('class', '');
                }
            });
            return this;
        },


        fadeIn: function(time){
            this.each(function(){
                ac.fade('in', this, time, true);
            });
            return this;
        },
        fadeOut: function(time){
            this.each(function(){
                ac.fade('out', this, time, true);
            });
            return this;
        },
        domManip: function( args, callback ) {
            
            this.each( function() {
                
                var fragment = ac.buildFragment( args, this.ownerDocument, this );
                
                callback.call( this, fragment );
            
            } );
            
            return this;
            
        },
        Elscroll: function( params ) {
            var pos = 0,
                lastAnimation = 0,
                indices = 0,
                elScroll = this,
                transformCSS = function( pos, duration, anim ) {
                    return "-webkit-transform: translate3d(0, " + pos + "%, 0); -webkit-transition: -webkit-transform " + duration + "ms " + anim + "; -moz-transform: translate3d(0, " + pos + "%, 0); -moz-transition: -moz-transform " + duration + "ms " + anim + "; -ms-transform: translate3d(0, " + pos + "%, 0); -ms-transition: -ms-transform transform " + duration + "ms " + anim + "; transform: translate3d(0, " + pos + "%, 0); transition: transform " + duration + "ms " + anim + ";";
                },
                scrollHeight = ac.scrollHeight(),
                activeScrollslide = function( elem, index ) {
                var IsIndex = index != '';
                    if( IsIndex ) {
                        setTimeout( function() {

                            var el_index = index - 1, pos = (el_index * 100) * -1;
                            
                            
                            if( Math.floor( elem.getClientRects()[ 0 ].top ) == 0 ) {

                                ac( '.ac-tab-scroll,.ac-slide a' ).removeClass( 'active' );
                                ac( '.ac-tab-scroll' )[el_index].classList.add( 'active' );
                                ac( '.ac-slide a' )[el_index].classList.add( 'active' );
                                elem.style.cssText = transformCSS( pos, duration, anim );

                            }
                        }, 0 );
                    }
                },
                savePos = function( name, value ) {
                    if( typeof( Storage ) !== 'undefined' ) {
                        return localStorage.setItem( name, value );
                    }
                    return false;
                };


            if( typeof params == 'object' ) {
                var duration = params.duration || 1000,
                    anim = params.transition_timing_function || 'ease',
                    updateURL = params.updateURL === true;
            }




            document.body.style.overflow = 'hidden';



            ac.click_whell();

            ac('.ac-tab-scroll').each( function() {
                indices++;
                this.setAttribute( 'data-index', indices );
                this.setAttribute( 'style', 'top: ' + ( indices - 1 ) * 100 + '%;' );
            } );


            var iScroll = 0;



            elScroll.each( function() {

                var ele = this,
                    top,
                    hash_index = document.location.hash.replace( /#/,'' ) || localStorage.getItem( 'ac-scroll-index' ) || false;

                window.addEventListener( "load", function() {

                    top = ele.getClientRects()[ 0 ].top;


                    if( top == 0 ) {
                        ac( '.ac-tab-scroll:first-child' ).addClass( 'active' );
                        ac( '.ac-scroll-sliders .ac-slide:first-child a' ).addClass( 'active' );
                        ac( '.ac-scroll-sliders' ).fadeIn( 500 );

                    } else if( top < 0 && ac( '#ac-tab' + ac( '.ac-tab-scroll' ).length ) ) {
                        ac( '.ac-tab-scroll:last-child' ).addClass( 'active' );
                        ac( '.ac-scroll-sliders .ac-slide:last-child a' ).addClass( 'active' );
                        ac( '.ac-scroll-sliders' ).fadeIn( 500 );                                 
                    }else{
                        if( !hash_index )
                            ac( '.ac-scroll-sliders' ).fadeOut();
                    }



                        activeScrollslide( ele, hash_index, duration, anim );  

                });

                iScroll++;


                var nameIscroll = 'scroll-effect-' + iScroll;

                var acOffsetTop = getComputedStyle( ele )[ 'margin-top' ].replace( 'px', '' );
                acOffsetTop = Number( acOffsetTop );
                var offsetTop = ( document.documentElement.clientHeight - 5 ) + acOffsetTop;
                ac( this ).wrapAll('<div id="' + nameIscroll + '" class="ac-effect-scroll"></div>');

                ac( '#' + nameIscroll ).append( '<div id="ac-scroll-sliders-' + iScroll + '" class="ac-scroll-sliders"></div>' );


                for( var i = 1; i <= ac( '#' + nameIscroll + ' .ac-tab-scroll' ).length; i++ ){

                    ac( '#ac-scroll-sliders-' + iScroll ).append( '<li id="ac-slide-' + i + '" class="ac-slide"><a href="#' + i + '" data-index="' + i + '"></a></li>' );

                }
                delete iScroll;

                ac( '.ac-scroll-sliders .ac-slide a' ).click( function() {


                    var index = this.dataset.index - 1, timeNow = new Date().getTime();

                    var i = index + 1;

                    savePos( 'ac-scroll-index', i );

                    ac( '.ac-tab-scroll' ).removeClass( 'active' );


                    ac( '.ac-tab-scroll' ).each( function() {

                        if( this.dataset.index == i ){
                            this.classList.add( 'active' );
                        }
                    } );                        



                    pos = ( index * 100 ) * -1;

                    ele.style.cssText = transformCSS( pos, duration, anim );

                    ac( '.ac-scroll-sliders .ac-slide a' ).removeClass( 'active' );

                    ac( this ).addClass( 'active' );

                    lastAnimation = timeNow;


                    return updateURL;
                } );
            } );

            ac.wheel( {


                scroll: function( up, down ) {

                    var currentpx = ac.scrollTop(),
                        height,
                        top,
                        bottom,
                        timeNow = new Date().getTime();



                    elScroll.each( function() {
                        
                        top = Math.floor( this.getClientRects()[ 0 ].top );
                        bottom = Math.floor( this.getClientRects()[ 0 ].bottom );

                        if( top <= 0 && typeof ac( '.ac-tab-scroll.active' )[ 0 ] === 'object' ) {

                            if( timeNow - lastAnimation < duration ) {
                                return false;
                            }                                    

                            if( top == 0 ) localStorage.removeItem( 'ac-scroll-index' );

                            index = ac( '.ac-tab-scroll.active' )[ 0 ].dataset.index - 1;


                            var offsetBody = document.body.scrollHeight;
                            var offsetEL = this.offsetHeight;
                            var offsetHeightTabScroll = 0;
                            ac('.ac-tab-scroll').each( function() {
                                offsetHeightTabScroll += this.offsetHeight;
                            } );

                            var isBottom = offsetBody - ( offsetEL + this.offsetTop );

                            if( isBottom == 0 && this.offsetTop == 0 ) {

                                if( down )
                                    if( indices == ac( '.ac-tab-scroll.active' )[ 0 ].dataset.index ) {
                                        return false;
                                    }
                                if( up )
                                    if( ac( '.ac-tab-scroll.active' )[ 0 ].dataset.index == 1 ) {
                                        return false;
                                    }
                            }

                            if( isBottom == 0 ) {
                                if( down )
                                    if( indices == ac( '.ac-tab-scroll.active' )[ 0 ].dataset.index ) {
                                        return false;
                                    }
                                
                            } else if( this.offsetTop == 0 ) {
                                
                                if( up )
                                    if( ac( '.ac-tab-scroll.active' )[ 0 ].dataset.index == 1 ){
                                        return false;
                                    }
                                
                            }

                            ac( '.ac-tab-scroll' ).removeClass( 'active' );
                            ac( '.ac-scroll-sliders .ac-slide a' ).removeClass( 'active' );




                                if( up ) {
                                    index--;
                                } else {
                                    index++;
                                }

                                ac( '.ac-tab-scroll' ).each( function() {
                                    
                                    if( this.dataset.index == index + 1 ) {




                                        this.classList.add( 'active' );
                                        if( updateURL ) {
                                            location.hash = this.dataset.index;
                                        } else {
                                            savePos( 'ac-scroll-index', this.dataset.index );
                                        }
                                        ac( '.ac-scroll-sliders .ac-slide a' ).each( function(){


                                            if( this.dataset.index == index + 1 ){


                                                this.classList.add( 'active' );


                                            }

                                        } );
                                    }
                                    
                                } );

                            if( index + 1 <= ac( '.ac-tab-scroll' ).length && index + 1 > 0 ) {
                                
                                pos = ( index * 100 ) * -1;
                                this.style.cssText = transformCSS( pos, duration, anim );

                            } else {
                                
                                if( up )
                                    window.scrollTo( 0, currentpx - 100 );
                                else
                                    window.scrollTo( 0, currentpx + 100 );
                                
                            }



                            lastAnimation = timeNow;

                        } else {
                            
                            if( typeof ac( '.ac-tab-scroll.active' )[ 0 ] !== 'object' ) {

                                localStorage.removeItem( 'ac-scroll-index' );

                                for( var i = 1; i <= 100; i++ ) {

                                    top = this.getClientRects()[ 0 ].top || this.getBoundingClientRect().top;
                                    top = Math.floor( top );
                                    bottom = this.getClientRects()[ 0 ].bottom || this.getBoundingClientRect().bottom;
                                    bottom = Math.floor( bottom );

                                    if( top == 0 ) {
                                        
                                        savePos( 'ac-scroll-index', 1 );
                                        ac( '.ac-tab-scroll:first-child' ).addClass( 'active' );
                                        ac( '.ac-scroll-sliders .ac-slide:first-child a' ).addClass( 'active' );
                                        ac( '.ac-scroll-sliders' ).fadeIn( 500 );
                                        break;

                                    } else if( top < 0 && ac( '#ac-tab' + ac( '.ac-tab-scroll' ).length )[ 0 ].getClientRects()[ 0 ].top >= 0 ) {

                                        savePos( 'ac-scroll-index', ac( '.ac-tab-scroll' ).length );
                                        ac( '.ac-tab-scroll:last-child' ).addClass( 'active' );
                                        ac( '.ac-scroll-sliders .ac-slide:last-child a' ).addClass( 'active' );
                                        ac( '.ac-scroll-sliders' ).fadeIn( 500 );
                                        break;

                                    } else if( top < 0 ) {
                                        savePos( 'ac-scroll-index', ac( '.ac-tab-scroll' ).length );
                                    } else {
                                        ac( '.ac-scroll-sliders' ).fadeOut();
                                    }

                                    if( up )
                                        window.scrollTo( 0, currentpx - i );
                                    else
                                        window.scrollTo( 0, currentpx + i );

                                }
                                
                            }
                        }
                        
                        if( ac( '.ac-tab-scroll.active' )[ 0 ] === undefined ) {
                            ac( '.ac-scroll-sliders' ).fadeOut();
                        }
                        
                    } );

                }
            } );
        }
    } );
    
    
    ac.fade = function( type, el, duration, IEsupport ){

            duration = duration || 0;
            var isIn        = ( type == 'in' ),
                IE          = ( IEsupport ) ? IEsupport : false,
                opacity     = isIn ? 0 : getComputedStyle( el ).opacity || 1,
                interval    = 50,
                gap         = interval / duration,
                display,
                maxOpacity  = getComputedStyle(el).opacity;

            if(isIn) {
                if(getComputedStyle(el).display != 'block'){
                   el.style.display = 'block';
                    display = true;
                    el.style.opacity = opacity;
                }else{
                    return this;
                }
                if(IE) {
                    el.style.filter = 'alpha(opacity=' + opacity + ')';
                    el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')';
                }
            }else{
                if(getComputedStyle(el).display == 'none'){
                    return this;
                }
            }
            function func() {

                    opacity = isIn ? opacity + gap : opacity - gap;
                if(!isIn) {
                    el.style.opacity = opacity;
                }else{
                    if(display){
                        el.style.opacity = opacity;
                    }
                }
                if(IE) {
                    el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
                    el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')';
                }
                if(opacity <= 0){
                    el.style.display = "none";
                    el.style.opacity = 0;
                    el.style.opacity = '';
                    window.clearInterval(fading);
                }else if(opacity >= maxOpacity){
                    el.style.opacity = maxOpacity;
                    el.style.opacity = '';
                    window.clearInterval(fading);
                }

            }
            var fading = window.setInterval(func, interval);
            return this;
        };


    ac.prototype.remove = function(element){
        var ele;

        this.each(function(){

            ele = this;

            try{
                if(ele.parentNode){
                    ele.parentNode.removeChild(ele);
                }
            }catch(e){}

        });

        return this;
    };
    ac.time = function() {
        var str = "";

        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var day = currentTime.getDate();
        var month = currentTime.getMonth() + 1;
        var year = currentTime.getFullYear();

        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;            
        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;

        str = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        return str;
    };


    ac.declension = function( number, declension_array ) {
        var sEnding, i;
        number = number % 100;
        if( number >= 11 && number <= 19 ){
            sEnding = declension_array [ 2 ];
        }else{
            i = number % 10;
            switch(i){
                case ( 1 ): sEnding = declension_array[ 0 ]; break;
                case ( 2 ):
                case ( 3 ):
                case ( 4 ): sEnding = declension_array[ 1 ]; break;
                default: sEnding = declension_array[ 2 ];
            }
        }
        return sEnding;
    };


    ac.ajax = function( params, callback ) {

        var url,
            type,
            success,
            async,
            data,
            error,
            dataType;


        if( window.XMLHttpRequest ) { // Mozilla, Safari, ...
            var xhr = new XMLHttpRequest();
            if( xhr.overrideMimeType ) {
                xhr.overrideMimeType( 'text/xml' );
                // See note below about this line
            }
        } else if( window.ActiveXObject ) { // IE
            ac.each( [ 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ], function() {
                var t = '' + this;
                try {
                    xhr = new ActiveXObject( t );
                    return false;
                } catch( e ) {};
            } );
        } 

        if(xhr === undefined) return false;


        if(isObject(params) && typeof params.length === 'undefined'){

                url = params.url || window.location.href;

                type = params.type || 'GET';

                async = params.async || true;

                success = params.success || undefined;

                error = params.error || undefined;

                dataType = params.dataType || undefined;

            if(params.data !== undefined){
                if(isObject(params.data)){
                    data = http_build_query(params.data);
                }else{
                    data = params.data;
                }
            }


        }else{
            url = window.location.href;
            type = 'GET';
            async = true;
        }



        ac.each(['GET', 'POST'], function() {
            var t = '' + this.toLowerCase();
            type = type.toLowerCase()
            if(t == type){
                if(type == 'get'.toLowerCase()){
                    if(data !== undefined){
                        url = url + '?' + http_build_query(params.data);
                    }
                }
                xhr.open(type, url, async);
                return false;
            }
        });

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
        if(async === true){
        xhr.onreadystatechange = function() {

            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    if(success !== undefined){
                        callback = success;
                        callback.call(xhr.responseText, arguments = xhr.responseText, xhr.responseText);
                    }

                    if(dataType !== undefined){
                        if(dataType == 'script'){
                            eval(xhr.responseText);
                        }
                    }
                }else{
                    if(error !== undefined){
                        callback = error;
                        callback.call(xhr.status, arguments = xhr.status, xhr.status);
                    }
                }
            }
        }
        }else if(async === false){
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    if(success !== undefined){
                        callback = success;
                        callback.call(xhr.responseText, arguments = xhr.responseText, xhr.responseText);
                    }

                    if(dataType !== undefined){
                        if(dataType == 'script'){
                            eval(xhr.responseText);
                        }
                    }
                }else{
                    if(error !== undefined){
                        callback = error;
                        callback.call(xhr.status, arguments = xhr.status, xhr.status);
                    }
                }
            }
        }
    };

    ac.prototype.click = function(callback){
        this.each(function(){
            if(typeof callback === 'function')
                this.addEventListener(
                    'click',
                    function(e){
                        var result = callback.call( this, e );

                        if( result === false){
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    },
                    false);
            else
                this.click();
        });
        return this;
    };


    ac.prototype.attr = function(attribute, value){
        var attr = this;
        this.each(function(){
            if(attribute && value !== undefined){
                if(value === false){
                    this.removeAttribute(attribute);
                }else if(value === true){
                    this.setAttribute(attribute, value);
                }else{
                    this.setAttribute(attribute, value);
                }
            }else if(attribute !== undefined && value === undefined){
                attr = this.getAttribute(attribute) || undefined;
                return false;
            }
        });
        return attr;
    };


    ac.each = function( obj, callback, args ) {
        
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike( obj );
        
        if( args ) {
            
            if ( isArray ) {
                
                for( ; i < length; i++ ) {
                    
                    value = callback.apply( obj[ i ], args );
                   
                    if( value === false ) {
						break;
                    }
                
                }
            } else {
                
                for( i in obj ) {
                    
                    value = callback.apply( obj[ i ], args );
                    
                    if ( value === false ) {
                        
                        break;
                    
                    }
                
                }
            
            }

		// A special, fast, case for the most common use of each
		} else {
            
			if( isArray ) {
				
                for( ; i < length; i++ ) {
					
                    value = callback.call( obj[ i ], i, obj[ i ] );

					if( value === false ) {
						break;
					}
				}
                
			} else {
				for( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	};
            
    ac.ready = function( callback ) {
        
        document.addEventListener( 'DOMContentLoaded', function() {
            callback.call( this );
        }, false );
        
    };
            
    ac.prototype.each = function( callback, args ) {
        
        return ac.each( this, callback );
        
    };


    ac.http_build_query = function( formdata, numeric_prefix, arg_separator ) {
        var key, use_val, use_key, i = 0, tmp_arr = [];

        if(!arg_separator){
            arg_separator = '&';
        }

        for(key in formdata){
            use_key = encodeURIComponent(key);
            use_val = encodeURIComponent((formdata[key].toString()));
            use_val = use_val.replace(/%20/g, '+');

            if(numeric_prefix && !isNaN(key)){
                use_key = numeric_prefix + i;
            }
            tmp_arr[i] = use_key + '=' + use_val;
            i++;
        }

        return tmp_arr.join(arg_separator);
    }

    ac.prototype.oninput = function(callback){
        this.each(function(){
            this.addEventListener( 'input', function(){
                callback.call(this);
            }, false);
        });
        return this;
    };

    ac.prototype.onchange = function(callback){
        this.each(function(){
            this.addEventListener( 'change', function(){
                callback.call(this);
            }, false);
        });
        return this;
    };


    ac.prototype.textareaAutoresize = function(){
        var scrolltop;
        function h(e){
            e.style.height = 'auto';
            e.style.overflow = 'hidden';
            e.style.height = e.scrollHeight + 'px';

        }

        this.each(function(){
            h(this);
        }).oninput(function(){
            scrolltop = ac.scrollTop();
            h(this);
            window.scrollTo(0, scrolltop);
        });

        return this;
    };


    ac.prototype.loader = function(loadname){
        var ele = this;
        this.each(function(){
            ac('.row, .cf').remove();
            ele.append('<div class="row cf"><div class="span-loader"><div class="' + loadname + '"></div></div></div>');
        });
        return this;
    };

    ac.prototype.loaderOff = function(){
        ac('.row, .cf').remove();
        return this;
    };

    ac.prototype.val = function( text ){
        var element = this, size_element = 0, value = [], final_value, final_values = [];



            if( text !== undefined ){

                element.each( function(){
                    this.value = text;
                });




            }else{
                element.each( function(){
                    value.push( this.value );
                });
                ac.each( value, function( i,v ){

                    if( v != '' ){
                        size_element++;
                        final_value = v;
                        final_values.push(v);
                    }

                });

                if( size_element > 1 ){
                    final_value = final_values;
                }else if( size_element == 0 ){
                    final_value = '';
                }

            }

        if( text === undefined ) return final_value;
        else return element;

    };
                
                
                
    ac.extend( {
        isWindow: function( obj ) {
            return obj != null && obj === obj.window;
        },
        type: function( obj ) {
            
            var type = {};
            
            if( obj == null ) {
                return obj + '';
            }
            
            return typeof obj === 'object' || typeof obj === 'function' ?
                type[ toString.call( obj ) ] || 'object' :
            typeof obj;
        },
        removeEvent: function( elem, type, handle ) {
            if ( elem.removeEventListener ) {
                elem.removeEventListener( type, handle, false );
            }
        },
        sound: function(src){
            var audio = new Audio();
            audio.src = src;
            audio.autoplay = true;
        },
        longpoll: function(object){

            setInterval(function(){
                longPoll('', object);
            }, 60 * 1000);

            longPoll('', object);

        },
        get: function(get){
            qs = window.location.search;
            qs = qs.split("+").join(" ");
            var params = {},
                tokens,
                re = /[?&]?([^=]+)=([^&]*)/g,
                ok,
                type;

            while (tokens = re.exec(qs)) {




                if(decodeURIComponent(tokens[2]).search(/^[0-9]+$/) == 0){
                    type = Number(decodeURIComponent(tokens[2]));
                }else{
                    type = decodeURIComponent(tokens[2]);
                }

                params[decodeURIComponent(tokens[1])] = type;

                if(decodeURIComponent(tokens[1]) == get){
                    ok = get;
                    params = type;
                }
            }
            if(ok === undefined && get !== undefined){
                params = undefined;
            }
            return params;


        },
        min: function(arr){
            if(typeof arr === 'string') arr = arr.split(',');


            if(typeof arr === 'object' && !isObject(arr)){
               return Math.min.apply(null, arr);
            }

            throw new Error("Not an array!");
        },
        max: function(arr){
            if(typeof arr === 'string') arr = arr.split(',');

            if(typeof arr === 'object' && !isObject(arr)){
                return Math.max.apply(null, arr);
            }
            throw new Error("Not an array!");
        },
        sort: function(arr, sort){
            if(typeof arr === 'string') arr = arr.split(',');

            if(typeof arr === 'object' && isObject(arr))
                throw new Error("Not an array!");

            var sorts = {
                asc: function(a, b){
                    return a - b;
                },
                desc: function(a, b){
                    return b - a;
                }   
            }


            if(sort == '') sort = 'asc';
            return arr.sort(sorts[sort]);
        },
        htmlspecialchars: function( text ) {
            return text
                .replace(/&/g, "\\&amp;")
                .replace(/</g, "\\&lt;")
                .replace(/>/g, "\\&gt;")
                .replace(/"/g, "\\&quot;")
                .replace(/'/g, "\\&#039;");
        },
        escape: function( text ){

            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&#039;'
            };

            return text.replace( /(&|<|>|"|')/g, function( m ) { return map[ m ]; } );              
        },
        escape_decode: function( text ){

            var map = {
                '&amp;': '&',
                '&lt;': '<' ,
                '&gt;': '>',
                '&quot;': '"',
                '&#039;': '\''
            };

            return text.replace( /(&amp;|&lt;|&gt;|&quot;|&#039;)/g, function( m ) { return map[ m ]; } );
        },
        scrollTop: function() {
            var html = document.documentElement;
            var body = document.body;
            var scrollTop = html.scrollTop || body && body.scrollTop || 0;
            scrollTop -= html.clientTop;
            return scrollTop;
        },
        scrollLeft: function() {
            var scrollLeft = window.pageXOffset;
            
            return scrollLeft;
            
        },
        wheel: function( callback ) {


            function wheelScroll( e ){
                var delta = e.deltaY || e.detail || e.wheelDelta,
                    up,
                    down;
                if( delta > 0 ) {
                    up = false;
                    down = true;
                } else {
                    up = true;
                    down = false;
                }
                return callback.scroll.call( e, up, down );
            }
            if( window.addEventListener ) {
                
                if( 'onwheel' in document ) {
                    window.addEventListener( 'wheel', wheelScroll );
                } else if( 'onmousewheel' in document ) {
                    
                    window.addEventListener( 'mousewheel', wheelScroll );
                } else {
                    
                    window.addEventListener( 'MozMousePixelScroll', wheelScroll );
                
                }
            
            } else {
                
                window.attachEvent( 'onmousewheel', wheelScroll );
                
            }
            
        },
        animate: function( options ) {

            var start = performance.now();

            requestAnimationFrame( function animate( time ) {

                var timeFraction = ( time - start ) / options.duration;

                if( timeFraction > 1 ) timeFraction = 1;

                var progress = animationType[ options.name ]( timeFraction );
                if( !progress ) return false;
                options.draw( progress );

                if( timeFraction < 1 ) {
                    requestAnimationFrame( animate );
                }
                
            } );
        },
        scrollHeight: function(){
            var scrollHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
            return scrollHeight;
        },
        click_whell: function(params){
            var params = params || false, ie;
            if(params) return true;
            else{
                if ( navigator.userAgent.indexOf('MSIE') != -1) ie = 1;
                else ie = 0;
                document.onmousedown = function(e) {
                    var e = e || window.event;
                    if ((ie && e.button == 4) || (!ie && e.button == 1)) return false;
                }
            }
        },
        isMob: function(device){
            var ua      = navigator.userAgent,
                devices = device || '(ipad|iphone|iPod|android|BlackBerry|PlayBook|bb\\d+|MeeGo|Opera Mini|IEMobile)';

            mobilePattern = new RegExp(devices, 'i');

            var ismob = ua.match(mobilePattern);

            if(ismob){
                return ismob[0].toLowerCase();
            }
            return false;
        },
        getCookie: function(name){
            var matches = document.cookie.match(
                new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                )
            );
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },
        setCookie: function(name, value, options){
            options = options || {};

            var expires = options.expires;

            if(typeof expires == "number" && expires){

                var d = new Date();

                d.setTime(d.getTime() + expires * 1000);

                expires = options.expires = d;

            }

            if(expires && expires.toUTCString){
                options.expires = expires.toUTCString();
            }

            value = encodeURIComponent(value);

            var updatedCookie = name + "=" + value;

            for(var propName in options){

                updatedCookie += "; " + propName;

                var propValue = options[propName];
                if(propValue !== true){
                    updatedCookie += "=" + propValue;
                }
            }

            document.cookie = updatedCookie;
        },
        md5: function(string){
            var hexcase = 0;
            var b64pad = "";
            function hex_md5(s){
                return rstr2hex(rstr_md5(str2rstr_utf8(s)));
            }
            function any_md5(s, e){
                return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
            }
            function hex_hmac_md5(k, d){
                return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
            }
            function any_hmac_md5(k, d, e){
                return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
            }
            function md5_vm_test(){
                return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
            }
            function rstr_md5(s){
                return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
            }
            function rstr_hmac_md5(key, data){
                var bkey = rstr2binl(key);
                if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

                var ipad = Array(16),
                    opad = Array(16);
                for(var i = 0; i < 16; i++){
                    ipad[i] = bkey[i] ^ 0x36363636;
                    opad[i] = bkey[i] ^ 0x5C5C5C5C;
                }

                var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
                return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
            }
            function rstr2hex(input){
                var hex_tab = "0123456789abcdef";
                var output = "";
                var x;
                for(var i = 0; i < input.length; i++){
                    x = input.charCodeAt(i);
                    output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
                }
                return output;
            }
            function rstr2any(input, encoding){
                var divisor = encoding.length;
                var i, j, q, x, quotient;
                var dividend = Array(Math.ceil(input.length / 2));
                for (i = 0; i < dividend.length; i++) {
                    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
                }
                var full_length = Math.ceil(input.length * 8 /
                    (Math.log(encoding.length) / Math.log(2)));
                var remainders = Array(full_length);
                for (j = 0; j < full_length; j++) {
                    quotient = Array();
                    x = 0;
                    for(i = 0; i < dividend.length; i++){
                        x = (x << 16) + dividend[i];
                        q = Math.floor(x / divisor);
                        x -= q * divisor;
                        if (quotient.length > 0 || q > 0)
                            quotient[quotient.length] = q;
                    }
                    remainders[j] = x;
                    dividend = quotient;
                }
                var output = "";
                for(i = remainders.length - 1; i >= 0; i--)
                    output += encoding.charAt(remainders[i]);

                return output;
            }
            function str2rstr_utf8(input){
                var output = "";
                var i = -1;
                var x, y;

                while(++i < input.length){
                    x = input.charCodeAt(i);
                    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                    if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                        i++;
                    }
                    if (x <= 0x7F)
                        output += String.fromCharCode(x);
                    else if (x <= 0x7FF)
                        output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
                            0x80 | (x & 0x3F));
                    else if (x <= 0xFFFF)
                        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                            0x80 | ((x >>> 6) & 0x3F),
                            0x80 | (x & 0x3F));
                    else if (x <= 0x1FFFFF)
                        output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                            0x80 | ((x >>> 12) & 0x3F),
                            0x80 | ((x >>> 6) & 0x3F),
                            0x80 | (x & 0x3F));
                }
                return output;
            }
            function str2rstr_utf16le(input){
                var output = "";
                for (var i = 0; i < input.length; i++)
                    output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
                        (input.charCodeAt(i) >>> 8) & 0xFF);
                return output;
            }

            function str2rstr_utf16be(input){
                var output = "";
                for (var i = 0; i < input.length; i++)
                    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                        input.charCodeAt(i) & 0xFF);
                return output;
            }
            function rstr2binl(input) {
                var output = Array(input.length >> 2);
                for (var i = 0; i < output.length; i++)
                    output[i] = 0;
                for (var i = 0; i < input.length * 8; i += 8)
                    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
                return output;
            }
            function binl2rstr(input) {
                var output = "";
                for (var i = 0; i < input.length * 32; i += 8)
                    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
                return output;
            }
            function binl_md5(x, len) {
                x[len >> 5] |= 0x80 << ((len) % 32);
                x[(((len + 64) >>> 9) << 4) + 14] = len;

                var a = 1732584193;
                var b = -271733879;
                var c = -1732584194;
                var d = 271733878;

                for (var i = 0; i < x.length; i += 16) {
                    var olda = a;
                    var oldb = b;
                    var oldc = c;
                    var oldd = d;

                    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                    a = safe_add(a, olda);
                    b = safe_add(b, oldb);
                    c = safe_add(c, oldc);
                    d = safe_add(d, oldd);
                }
                return Array(a, b, c, d);
            }
            function md5_cmn(q, a, b, x, s, t) {
                return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
            }
            function md5_ff(a, b, c, d, x, s, t) {
                return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
            }
            function md5_gg(a, b, c, d, x, s, t) {
                return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
            }
            function md5_hh(a, b, c, d, x, s, t) {
                return md5_cmn(b ^ c ^ d, a, b, x, s, t);
            }
            function md5_ii(a, b, c, d, x, s, t) {
                return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
            }
            function safe_add(x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }
            function bit_rol(num, cnt) {
                return (num << cnt) | (num >>> (32 - cnt));
            }
            return hex_md5(string);

        },
        trim: function( str, charlist ){
            charlist = !charlist ? ' \\s\xA0' : charlist.replace( /([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1' );
            var re = new RegExp( '^[\\' + charlist + ']+|[\\' + charlist + ']+$', 'g' );
            return str.replace( re, '' );
        },
        ltrim: function( str, charlist ){
            charlist = !charlist ? ' \\s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
            var re = new RegExp( '^[\\' + charlist + ']+', 'g' );
            return str.replace(re, '');
        },
        rtrim: function( str, charlist ){
            charlist = !charlist ? ' \\s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
            var re = new RegExp('[\\' + charlist + ']+$', 'g');
            return str.replace(re, '');
        },
        str_replace: function( search, replace, subject ) {
            if( !( replace instanceof Array ) ){
                replace = new Array( replace );
                if( search instanceof Array ){
                    //If search	is an array and replace	is a string, then this replacement string is used for every value of search
                    while( search.length > replace.length ){
                        replace[ replace.length ] = replace[ 0 ];
                    }
                }
            }
            if( !( search instanceof Array ) ) search = new Array( search );

            while(search.length>replace.length){
                //If replace	has fewer values than search , then an empty string is used for the rest of replacement values
                replace[ replace.length ] = '';
            }

            if( subject instanceof Array ){
                //If subject is an array, then the search and replace is performed with every entry of subject , and the return value is an array as well.
                for( k in subject ){
                    subject[ k ] = str_replace( search, replace, subject[ k ] );
                }
                return subject;
            }

            for( var k = 0; k < search.length; k++ ){
                var i = subject.indexOf( search[ k ] );
                while( i >- 1 ){
                    subject = subject.replace( search[ k ], replace[ k ] );
                    i = subject.indexOf( search[ k ], i );
                }
            }

            return subject;
        },
        in_array: function( string, array ){
            var is_search = false, array_s = array;

            ac.each( array_s, function( i, v ){
                if( v == string ){
                    is_search = true;
                    return false;
                }
            } );
            return is_search;
        },
        is_array: Array.isArray,
        parseXML: function( data ) {

            var xml, tmp;

            if ( !data || typeof data !== "string" ) {

                return null;

            }

            // Support: IE9

            try {
                tmp = new DOMParser();

                xml = tmp.parseFromString( data, "text/xml" );

            } catch ( e ) {

                xml = undefined;

            }

            if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {

                throw new Error( "Invalid XML: " + data );

            }

            return xml;

        },
        parseHTML: function( data ){

            var content = document.createElement( 'div' ),
                arr = [];

            content.innerHTML = data;

            content = content.childNodes;

            ac.each( content, function() {

                var is_script = this.tagName.toLowerCase() == 'script';

                if( !is_script )
                    arr.push( this );

            } );

            return arr;


        },
        
        buildFragment: function( elems, context, scripts ) {
            
            var elem, tmp, tag, wrap, contains, a,
                fragment = context.createDocumentFragment(),
                nodes = [],
                i = 0,
                l = elems.length;
            
            for ( ; i < l; i++ ) {
                
                elem = elems[ i ];
                
                if ( elem || elem === 0 ) {
                    
                    tmp = tmp || fragment.appendChild( context.createElement( 'div' ) );
					tag = ( rtagName.exec( elem ) || [ '', '' ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, '<$1></$2>' ) + wrap[ 2 ];
					a = wrap[ 0 ];
                    
					while ( a-- ) {
						tmp = tmp.lastChild;
					}
                    
					ac.merge( nodes, tmp.childNodes );
					tmp = fragment.firstChild;
					tmp.textContent = '';
				}
            
            }
            
            fragment.textContent = '';
            
            i = 0;
            
            while ( (elem = nodes[ i++ ]) ) {
                
                fragment.appendChild( elem );
            
            }
            
            return fragment;
        
        },
        merge: function( first, second ) {
            
            var len = +second.length,
                j = 0,
                i = first.length;
            
            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }
            
            first.length = i;
            return first;
        },
        rand: function( min, max ) {
            
            var argc = arguments.length;
            
            if( argc === 0 ) {
                
                min = 0;
                max = 2147483647;
            } else if( argc === 1 ) {
                throw new Error('Warning: expects exactly 2 parameters, 1 given');
            }
            
            return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
            
        },
        mt_rand: function( min, max ) {
            var argc = arguments.length;
            
            if( argc === 0 ) {
                
                min = 0;
                max = 2147483647;
                
            } else if( argc === 1 ) {
                
                throw new Error('Warning: expects exactly 2 parameters, 1 given');
            
            } else {
                
                min = parseInt( min, 10 );
                max = parseInt( max, 10 );
                
            }
            
            return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
            
        }
    
    } );
            
            
    var animationType = {
        linear: function( timeFraction ) {
            return anim = timeFraction;
        },
        back: function( timeFraction ) {
            return anim = Math.pow( timeFraction, 2 ) * ( ( 1.5 + 1 ) * timeFraction - 1.5 );
        },
        quad: function( timeFraction ){
            return anim = Math.pow( timeFraction, 2 );
        },
        circ: function( timeFraction ) {
            
            return anim = 1 - Math.sin( Math.acos( timeFraction ) );
            
        },
        bounce: function( timeFraction ) {
            
            for ( var a = 0, b = 1, result; 1; a += b, b /= 2 ) {
                if ( timeFraction >= ( 7 - 4 * a ) / 11 ) {
                    return anim = -Math.pow( ( 11 - 6 * a - 11 * timeFraction ) / 4, 2 ) + Math.pow( b, 2 );
                }
            }
            
        },
        elastic: function( timeFraction ) {
            
            return anim = Math.pow( 2, 10 * ( timeFraction - 1 ) ) * Math.cos( 20 * Math.PI * 1.5 / 3 * timeFraction );
            
        },
        ease_out: function( timeFraction ) {
            
            return anim = ( 1 - Math.cos( timeFraction * Math.PI ) ) / 2;
            
        },
        ease_out_bounce: function( timeFraction ) {
            
            function makeEaseOut( timing ) {
                return 1 - timing( 1 - timeFraction );
            }
            
            return makeEaseOut( animationType.bounce );
            
        },
        ease_in_out_bounce: function( timeFraction ) {
            
            function makeEaseInOut( timing ) {
                if ( timeFraction < .5 )
                    return timing( 2 * timeFraction ) / 2;
                else
                    return ( 2 - timing( 2 * ( 1 - timeFraction ) ) ) / 2;
            }
            
            return makeEaseInOut( animationType.bounce );
            
        }
    };
} )( window );
