/*
*
*
*
* AirCold JS UI Library v1.0
* https://aircold.org/
* Includes ac.js
* https://aircold.org/
*
* Date: 2016-03-20T18:02Z
*
*
*
Copyright 2015,2016 AirCold Misha Landau



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


ac.prototype.extend( {

    c_progress_bar: function( options ) {
        var $this = this,
            isOptions = typeof options === 'object',
            animationDuration = 1000,
            max = 100,
            percent = true,
            max_percent = 100,
            text = '',
            strokeColorA = '#cccccc',
            strokeColorB = '#676767',
            strokewidthA = '2',
            strokewidthB = '2',
            textColor = '#b4b4b4',
            progress = function(){},
            success = function(){},
            reverse = false;



        var setting = {
            radius: 60
        },
            stroke_dasharray = ( 2 * Math.PI ) * setting.radius;


        if( isOptions ) {

            animationDuration = options.duration || animationDuration;

            max = options.max || max

            max_percent = options.max_percent || max_percent;

            if( max > 100 && !options.max_percent )
                max_percent = max;

            text = options.text || text;

            strokeColorA = options.strokeColorA || strokeColorA;
            strokeColorB = options.strokeColorB || strokeColorB;
            strokewidthA = options.strokewidthA || strokewidthA;
            strokewidthB = options.strokewidthB || strokewidthB;
            textColor = options.textColor || textColor;
            progress = options.progress || progress;
            success = options.success || success;
            reverse = options.reverse || reverse

        }


        var animationStartTime = Date.now() || 0;
        
        
        function update( el ) {
            var currentTime = Date.now();
            var positionInAnimation = ( currentTime - animationStartTime ) / animationDuration;
            var count = positionInAnimation * max;
            var count_reverse,
                bindStroke,
                percent_s = Math.round( ( count / max ) * 100 ),
                percent_o_s = Math.round( ( count / max_percent ) * 100 );
            
            
            if( reverse ) {

                count = max_percent - count;
                count_reverse = stroke_dasharray - positionInAnimation * ( stroke_dasharray * max / max_percent );
                if( count_reverse <= 0 ) count_reverse = 0;
                if( max + count <= max_percent ) count = max_percent - max;
                bindStroke = count_reverse;
                percent_s = Math.round( ( ( max_percent - count ) / max ) * 100 );
                percent_o_s = Math.round( ( ( max_percent - count ) / max_percent ) * 100 );
                
            } else {

                if( count >= max ) count = max;
                bindStroke = count * ( stroke_dasharray / max_percent );
            }
            
            ac( '#' + el.id + ' #ac-c-progress' ).attr( "stroke-dasharray",  bindStroke + ", " + stroke_dasharray );

            ac( '#' + el.id + ' #ac-c-text' ).html( Math.floor( count ) + text );


            if ( positionInAnimation <= 1 ) {
                
                requestAnimationFrame( function() {
                    update( el );
                } );

                progress.call( el, percent_s, percent_o_s );                        

            } else {

                success.call( el );

            }
        };
        
        $this.each( function() {
            var el = this;
            
            if( ac( '#' + el.id + ' svg' ).length == 0 ) {
                
                ac( el ).append( '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 200 200" preserveAspectRatio="none" class="ac-bar-progress"><circle cx="100" cy="100" r="' + setting.radius + '" id="ac-c-bar" fill="none" stroke="' + strokeColorA + '" stroke-width="' + strokewidthA + '" stroke-dasharray="' + stroke_dasharray + ', ' + stroke_dasharray + '" transform="rotate(-90,100,100)"></circle><circle cx="100" cy="100" r="' + setting.radius + '" id="ac-c-progress" fill="none" stroke="' + strokeColorB + '" stroke-width="' + strokewidthB + '" stroke-dasharray="0, ' + stroke_dasharray + '" transform="rotate(-90,100,100)"></circle><text id="ac-c-text" text-anchor="middle" x="100" y="110" fill="' + textColor + '">0' + text +'</text></svg>' );
                
            }
            
            
            requestAnimationFrame( function() {
                update( el );
            } );
            
        } );        

        

    },
    
    fixed_menu: function( options ) {
        
        var $this = this[ 0 ],
            isOptions = typeof options === 'object',
            arr_position = new Array(),
            top = $this.getClientRects()[ 0 ].top || $this.getBoundingClientRect().top,
            bottom = $this.getClientRects()[ 0 ].bottom || $this.getBoundingClientRect().bottom,
            offsetTop = $this.offsetTop,
            bodyTop = document.body.getClientRects()[ 0 ].top || document.body.getBoundingClientRect().top;
        var firstTop = offsetTop,
            isChange = false;
        
//        options
        var change = function(){},
            position_start = function(){};
        
        if( isOptions ) {
            
            change = options.change || change;
            position_start = options.position_start || position_start;
            
        }
        
        var scrollTop = ac.scrollTop();
        var scrollLeft = ac.scrollLeft();
        
        window.scrollTo( scrollLeft, 0 );
        window.scrollTo( scrollLeft, scrollTop );
        
        
        var topScroll = function() {

            if( top <= 0 ) {
                
                change.call( $this );
                
                isChange = true;

                $this.style.top = '0px';
                $this.style.position = 'fixed';

            }
            
            
            
            if( !isChange )
                firstTop = $this.offsetTop;
            
            
            if( firstTop + bodyTop > 0 ) {

                if( isChange ) {

                    position_start.call( $this );

                    $this.style.top = '';

                    $this.style.position = '';

                    isChange = false;

                }

            }
        };
        
        window.addEventListener( 'scroll', function() {

            top = $this.getClientRects()[ 0 ].top || $this.getBoundingClientRect().top;
            bottom = $this.getClientRects()[ 0 ].bottom || $this.getBoundingClientRect().bottom;
            offsetTop = $this.offsetTop;
            bodyTop = document.body.getClientRects()[ 0 ].top || document.body.getBoundingClientRect().top;
            
            topScroll();

        } );
            
            
    }
    
    
} );
