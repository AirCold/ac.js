/*!
 *
 *
 *
 * AirCold JavaScript Library v1.4.2
 * http://aircold.org/
 * Date: 2016-03-26T17:03Z
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 *
 *
 *
Copyright 2015, 2016 AirCold, Misha Landau



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
    
    var 
        version = '1.4.2',
        
        ac = function( selector, context ) {
            return new ac.fn.init( selector, context );
        },
        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        };
    
    
    var arr = [];
    
    var document = window.document;

    var sort = arr.sort;
    
    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};
    
    ac.fn = ac.prototype = {
        
        // The current version of ac being used
        ac: version,
        
        constructor: ac,
        
        // Start with an empty selector
        selector: '',
        
        // The default length of a ac object is 0
        length: 0,
        toArray: function() {
            return slice.call( this );
        },
        
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        
        get: function( num ) {
            return num != null ?
                // Return just the one element from the set
                ( num < 0 ? this[ num + this.length ] : this[ num ] ) :
            // Return all the elements in a clean array
            slice.call( this );
        },
        
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        
        pushStack: function( elems ) {
            // Build a new ac matched element set
            var ret = ac.merge( this.constructor(), elems );
            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;
            
            return ret;
        },
        
        // Execute a callback for every element in the matched set.
        
        each: function( callback ) {
            return ac.each( this, callback );
        },
        
        map: function( callback ) {
            return this.pushStack( ac.map( this, function( elem, i ) {
                return callback.call( elem, i, elem );
            } ) );
        },
        slice: function() {
            return this.pushStack( slice.apply( this, arguments ) );
        },
        first: function() {
            return this.eq( 0 );
        },
        last: function() {
            return this.eq( -1 );
        },
        eq: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        // For internal use only.
        // Behaves like an Array's method, not like a ac method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };    
    
    
    w.$ = w.ac = ac;
    
    if ( typeof Symbol === "function" ) {
        ac.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
    }
    
    ac.extend = ac.fn.extend = function() {
        
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        
        if ( typeof target === "boolean" ) {
            
            deep = target;
            target = arguments[ i ] || {};
            i++;
        }
        
        if ( typeof target !== "object" && !ac.is_function( target ) ) {
            
            target = {};
        
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
                    
                    if ( deep && copy && ( ac.isPlainObject( copy ) ||
                                          ( copyIsArray = ac.is_array( copy ) ) ) ) {
                        
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && ac.is_array( src ) ? src : [];
                        
                        } else {
                            clone = src && ac.isPlainObject( src ) ? src : {};
                        }
                        
                        target[ name ] = ac.extend( deep, clone, copy );
                    
                    } else if ( copy !== undefined ) {
                        
                        target[ name ] = copy;
                    
                    }
                
                }
            
            }
        
        }
        
        return target;
    
    };
    
    
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
    
    
    function winnow( elements, qualifier, not ) {
        if ( ac.is_function( qualifier ) ) {
            return ac.grep( elements, function( elem, i ) {
                /* jshint -W018 */
                return !!qualifier.call( elem, i, elem ) !== not;
            } );

        }

        if ( qualifier.nodeType ) {
            return ac.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            } );

        }

        if ( typeof qualifier === "string" ) {
            if ( risSimple.test( qualifier ) ) {
                return ac.filter( qualifier, elements, not );
            }

            qualifier = ac.filter( qualifier, elements );
        }

        return ac.grep( elements, function( elem ) {
            return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
        } );
    }    
    
    
    ac.fn.html = function( text ) {
        
        var elem = this;
        
        _eval_script( text );
        
        this.each( function() {
            var ele = this;
            if( text !== undefined ) {
                
                this.innerHTML = text;
            
                
                if( ac.in_array( ele.tagName.toLowerCase(), [ 'text' ] ) ) {
                    
                    this.textContent = text;
                    
                }
                
                
            } else {
                
                elem = this.innerHTML || this.textContent;
                
            }
            
            
        } );
        
        
        return elem;
    };
    
    
    ac.fn.refresh_dom = function() {
        
        var ele;
        
        this.each( function() {
            
            ele = this;
            
            
            var html = ele.innerHTML;
            _eval_script( html );
            ele.innerHTML = html;
            
        } );
        
        
        return this;
    };
    ac.fn.blockCentr = function() {
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

		_default: [ 0, '', '' ]
	};
    
    
    
    
    // Support: Android<4.1
    // Make sure we trim BOM and NBSP
    var ltrim = /^[\s\uFEFF\xA0]+/g,
        rtrim = /[\s\uFEFF\xA0]+$/g,
        trim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    

var Sizzle =
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



ac.find = Sizzle;
ac.expr = Sizzle.selectors;
ac.expr[ ":" ] = ac.expr.pseudos;
ac.uniqueSort = ac.unique = Sizzle.uniqueSort;
ac.text = Sizzle.getText;
ac.isXMLDoc = Sizzle.isXML;
ac.contains = Sizzle.contains;    
    
    
    
    
    
    
    
    
    var acceptData = function( owner ) {
        
        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        /* jshint -W018 */
        return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    
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
    
    var
        rnotwhite = (/\S+/g),
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/,
        risSimple = /^.[^:#\[\.,]*$/;
    
    
    
    
    
    function Data(){
        this.expando = ac.expando + Data.uid++;
    }
    
    Data.uid = 1;
    
    
    Data.prototype = {

        register: function( owner, initial ) {
            var value = initial || {};

            // If it is a node unlikely to be stringify-ed or looped over
            // use plain assignment
            if ( owner.nodeType ) {
                owner[ this.expando ] = value;

            // Otherwise secure it in a non-enumerable, non-writable property
            // configurability must be true to allow the property to be
            // deleted with the delete operator
            } else {
                Object.defineProperty( owner, this.expando, {
                    value: value,
                    writable: true,
                    configurable: true
                } );
            }
            return owner[ this.expando ];
        },
        cache: function( owner ) {

            // We can accept data for non-element nodes in modern browsers,
            // but we should not, see #8335.
            // Always return an empty object.
            if ( !acceptData( owner ) ) {
                return {};
            }

            // Check if the owner object already has a cache
            var value = owner[ this.expando ];

            // If not, create one
            if ( !value ) {
                value = {};

                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return an empty object.
                if ( acceptData( owner ) ) {

                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if ( owner.nodeType ) {
                        owner[ this.expando ] = value;

                    // Otherwise secure it in a non-enumerable property
                    // configurable must be true to allow the property to be
                    // deleted when data is removed
                    } else {
                        Object.defineProperty( owner, this.expando, {
                            value: value,
                            configurable: true
                        } );
                    }
                }
            }

            return value;
        },
        set: function( owner, data, value ) {
            var prop,
                cache = this.cache( owner );

            // Handle: [ owner, key, value ] args
            if ( typeof data === "string" ) {
                cache[ data ] = value;

            // Handle: [ owner, { properties } ] args
            } else {

                // Copy the properties one-by-one to the cache object
                for ( prop in data ) {
                    cache[ prop ] = data[ prop ];
                }
            }
            return cache;
        },
        get: function( owner, key ) {
            return key === undefined ?
                this.cache( owner ) :
                owner[ this.expando ] && owner[ this.expando ][ key ];
        },
        hasData: function( owner ) {
            var cache = owner[ this.expando ];
            return cache !== undefined && !ac.isEmptyObject( cache );
        }
    };
    
    var dataPriv = new Data();
    
    var dataUser = new Data();
    
    
    
    ac.event = {
        
        global: {},
        add: function( elem, types, handler, data, selector ) {
            
            var tmp, namespaces, origType, eventHandle,
                handleObj, handleObjIn;
            
            types = ( types || '' ).match( rnotwhite ) || [ '' ];
            
            ac.each( types, function( i, v ) {
                
                tmp = rtypenamespace.exec( v ) || [];
                type = origType = tmp[ 1 ];
                namespaces = ( tmp[ 2 ] || '' ).split( '.' ).sort();
                if( !type ) return false;
                
                handleObj = ac.extend( {
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    selector: selector,
                    namespace: namespaces.join( "." )
                }, handleObjIn );
                
                
                var eventHandle = function( e ) {
                    
                    return handleObj.handler();
                    
                };
                
                
                
                if ( elem.addEventListener ) {
                    elem.addEventListener( type, eventHandle );
                }                
                
                
                
            } );
            
            
        },
        remove: function() {
            
        }
    
    };
    
    ac.extend( ac.event, {
        
        
        trigger: function() {
            
            
            console.log( 1 );
            
        }
        
    } );
    
    
    ac.fn.extend( {
        
        trigger: function( type, data ) {
            
            return this.each( function() {
                ac.event.trigger( type, data, this );
            } );
            
        }
    } );
    
    
    
    
    
    
    ac.fn.extend( {
        find: function( selector ) {
            var i,
                len = this.length,
                ret = [],
                self = this;

            if ( typeof selector !== "string" ) {
                return this.pushStack( ac( selector ).filter( function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( ac.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                } ) );
            }

            for ( i = 0; i < len; i++ ) {
                ac.find( selector, self[ i ], ret );
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack( len > 1 ? ac.unique( ret ) : ret );
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function( selector ) {
           return this.pushStack( winnow( this, selector || [], false ) );
        },
        on: function( types, selector, data ){
            
            data = selector;
            
            
            return this.each( function() {
                
                ac.event.add( this, types, data, selector );
            
            } );
            
            
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
                while( element.firstElementChild ) {
                    element = element.firstElementChild;
                }
            this.each( function() {
                var el = this, parent = el.parentNode, sibling = el.nextSibling;
                element.appendChild( el );
                parent.insertBefore( elem, sibling );
            } );

            return this;
        },
        addClass: function( className ) {
            var ele, attribute, element = this;
            this.each( function() {
                ele = this;
                if( className !== undefined ) {
                    var classes = className.split( ' ' );
                    ac.each( classes, function( i, v ) {
                        ele.classList.add( v );
                    } );
                }
            } );
            return this;
        },
        removeClass: function( className ) {
            var ele, attribute, element = this;
            this.each( function() {
                ele = this;
                if( className !== undefined ) {
                    var classes = className.split( ' ' );
                    ac.each( classes, function( i, v ) {
                        ele.classList.remove( v );
                    } );
                }else{
                    element.attr( 'class', '' );
                }
            });
            return this;
        },


        fadeIn: function( time ) {
            this.each( function() {
                ac.fade( 'in', this, time, true );
            } );
            return this;
        },
        fadeOut: function( time ) {
            this.each( function() {
                ac.fade( 'out', this, time, true );
            } );
            return this;
        },
        domManip: function( args, callback ) {
            
            this.each( function() {
                
                var fragment = ac.buildFragment( args, this.ownerDocument, this );
                
                callback.call( this, fragment );
            
            } );
            
            return this;
            
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


    ac.fn.remove = function(element){
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
        var str = '';

        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var day = currentTime.getDate();
        var month = currentTime.getMonth() + 1;
        var year = currentTime.getFullYear();

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;            
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
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

    ac.fn.click = function(callback){
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


    ac.fn.attr = function(attribute, value){
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
            
    ac.fn.each = function( callback, args ) {
        
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

    ac.fn.oninput = function(callback){
        this.each(function(){
            this.addEventListener( 'input', function(){
                callback.call(this);
            }, false);
        });
        return this;
    };

    ac.fn.onchange = function(callback){
        this.each(function(){
            this.addEventListener( 'change', function(){
                callback.call(this);
            }, false);
        });
        return this;
    };


    ac.fn.textareaAutoresize = function(){
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


    ac.fn.loader = function(loadname){
        var ele = this;
        this.each(function(){
            ac('.row, .cf').remove();
            ele.append('<div class="row cf"><div class="span-loader"><div class="' + loadname + '"></div></div></div>');
        });
        return this;
    };

    ac.fn.loaderOff = function(){
        ac('.row, .cf').remove();
        return this;
    };

    ac.fn.val = function( text ){
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
        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;
            
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }
            return matches;
        },
        map: function( elems, callback, arg ) {
            var length, value,
                i = 0,
                ret = [];
            
            if ( isArrayLike( elems ) ) {
                length = elems.length;
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );
                    
                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            
            } else {
                for ( i in elems ) {
                    
                    value = callback( elems[ i ], i, arg );
                    
                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }
            
            return concat.apply( [], ret );
        
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
            var b64pad = '';
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
                var output = '';
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
                var output = '';
                for(i = remainders.length - 1; i >= 0; i--)
                    output += encoding.charAt(remainders[i]);

                return output;
            }
            function str2rstr_utf8(input){
                var output = '';
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
                var output = '';
                for (var i = 0; i < input.length; i++)
                    output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
                        (input.charCodeAt(i) >>> 8) & 0xFF);
                return output;
            }

            function str2rstr_utf16be(input){
                var output = '';
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
                var output = '';
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
            function md5_cmn( q, a, b, x, s, t ) {
                return safe_add( bit_rol( safe_add( safe_add( a, q ), safe_add( x, t ) ), s ), b );
            }
            function md5_ff( a, b, c, d, x, s, t ) {
                return md5_cmn( ( b & c ) | ( ( ~b ) & d ), a, b, x, s, t );
            }
            function md5_gg( a, b, c, d, x, s, t ) {
                return md5_cmn( ( b & d ) | ( c & ( ~d ) ), a, b, x, s, t );
            }
            function md5_hh( a, b, c, d, x, s, t ) {
                return md5_cmn( b ^ c ^ d, a, b, x, s, t );
            }
            function md5_ii( a, b, c, d, x, s, t ) {
                return md5_cmn( c ^ ( b | ( ~d ) ), a, b, x, s, t );
            }
            function safe_add( x, y ) {
                var lsw = ( x & 0xFFFF ) + ( y & 0xFFFF );
                var msw = ( x >> 16 ) + (y >> 16) + (lsw >> 16);
                return ( msw << 16 ) | ( lsw & 0xFFFF );
            }
            function bit_rol(num, cnt) {
                return ( num << cnt ) | ( num >>> ( 32 - cnt ) );
            }
            return hex_md5(string);

        },
        quote: function( str, delimiter ) {
            return ( str + '' ).replace( new RegExp( '[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + ( delimiter || '' ) + '-]', 'g' ), '\\$&' );
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
        expando: 'ac' + ( version + Math.random() ).replace( /\D/g, '' ),
        makeArray: function( arr, results ) {
            var ret = results || [];
            
            if ( arr != null ) {
                if ( isArraylike( Object( arr ) ) ) {
                    
                    ac.merge( ret,
                                 typeof arr === "string" ?
                                 [ arr ] : arr
                                );
                } else {
                    push.call( ret, arr );
                }
            }
            return ret;
        },
        inArray: function( elem, arr, i ) {
            return arr == null ? -1 : indexOf.call( arr, elem, i );
        },
        in_array: function( elem, arr, i ) {
            return ac.inArray( elem, arr, i ) == 0;
        },
        is_array: Array.isArray,
        is_function: function( obj ) {
            return ac.type( obj ) === "function";
        },
        isPlainObject: function( obj ) {
            
            if ( ac.type( obj ) !== "object" || obj.nodeType || ac.isWindow( obj ) ) {
                return false;
            }
            
            if ( obj.constructor &&
                !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                return false;
            }
            
            return true;
        
        },
        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },
        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            var realStringObj = obj && obj.toString();
            return !ac.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
        },
        guid: 1,
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
            
        },
        camelCase: function( string ) {
            return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
        },
        nodeName: function( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        proxy: function( fn, context ) {
            var tmp, args, proxy;
            if ( typeof context === "string" ) {
                tmp = fn[ context ];
                context = fn;
                fn = tmp;
            }
            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if ( !ac.is_function( fn ) ) {
                return undefined;
            }
            
            // Simulated bind
            args = slice.call( arguments, 2 );
            proxy = function() {
                return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
            };
            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || ac.guid++;
            return proxy;
        },
        now: Date.now,
        
        // ac.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    
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
            
            
            
    ac.each( [ 'trim', 'ltrim', 'rtrim' ], function( i, name ) {
        
        ac[ name ] = function( str, charlist ) {
            charlist = ac.quote( charlist, '/' );
            var pattern = '^(?:' + charlist + ')+|(?:' + charlist + ')+$';
            var airReplace = trim;
            if( name == 'ltrim' ) {
                pattern = '^(?:' + charlist + ')+';
                airReplace = ltrim;
            } else if( name == 'rtrim' ) {
                pattern = '(?:' + charlist + '+)$';
                airReplace = rtrim;
            }
            airReplace = charlist == '' ? '' : airReplace;
            re = new RegExp( pattern, 'gm' );
            return ( str == null ?
                    '' :
                    ( str + '' ).replace( !charlist ? airReplace : re, '' ) );
        }
    
    } );
            
            
            
            
            
            
            
var rootAC,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );
            
    var init = ac.fn.init = function( selector, context, root ) {
        
        var match, elem;

		if ( !selector ) {
			return this;
		}
		root = root || rootAC;

		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			if ( match && ( match[ 1 ] || !context ) ) {

				if ( match[ 1 ] ) {
					context = context instanceof ac ? context[ 0 ] : context;

					ac.merge( this, ac.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					if ( rsingleTag.test( match[ 1 ] ) && ac.isPlainObject( context ) ) {
						for ( match in context ) {

							if ( ac.is_function( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem && elem.parentNode ) {

						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			} else if ( !context || context.ac ) {
				return ( context || root ).find( selector );

			} else {
                return this;
			}

		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		} else if ( ac.is_function( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				selector( ac );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return ac.makeArray( selector, this );
	};


    init.prototype = ac.prototype;
            
    rootAC = ac( document );
            
            
            
var
	_ac = window.ac,

	_$ = window.$;
            
    ac.noConflict = function( deep ) {
        if ( window.$ === ac ) {
            window.$ = _$;
        }
        if ( deep && window.ac === ac ) {
            window.ac = _ac;
        }
        return ac;
    };
            
} )( window );
