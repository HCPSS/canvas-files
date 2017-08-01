var hcpssDropdown;  // Used for Canvas Connections menu

/******************************************
	Google Analytics for HCPSS Webmaster account
	Sends data back for LMS property as well as the roll-up property
******************************************/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-59680056-2', 'auto'); // Canvas LMS
ga('create', 'UA-72246853-1', 'auto', 'digLearningTracker'); // Digital learning
ga('create', 'UA-59965527-2', {'name': 'rollupProperty'}); // HCPSS
ga('rollupProperty.send', 'pageview');

var trackLinkClick = function(category, label) {
   ga('send', 'event', category, 'click', label, {
     'transport': 'beacon'
   });
   ga('digLearningTracker.send', 'event', category, 'click', label, {
     'transport': 'beacon'
   });
}


$(document).ready(function(){

	/******************************************
		Google analytics that runs on document.ready
	******************************************/
	var sCourseName = null;
	var sTemp;

	try {
		sTemp = window.location.pathname.match(/\/courses\/(\d+)/);
		sCourseName = $("#section-tabs-header").text().trim().replace(/\n.*/, '').replace(/\s+/g, ' ').trim();
		if (sTemp[1]) // Only set for Courses
		{
			ga('set', 'dimension1', sTemp[1]);
			ga('set', 'dimension2', sCourseName);
			ga('digLearningTracker.set', 'dimension1', sTemp[1]);
			ga('digLearningTracker.set', 'dimension2', sCourseName);
		}
	} catch (err) { }
	ga('send', 'pageview');
	ga('digLearningTracker.send', 'pageview');


	/******************************************
		Canvas connection nav &
		CourseArc iFrame resizing
	******************************************/
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

	// Listen to message from child window
	eventer(messageEvent,function(e) {
		if (e.origin == "https://hcpss.coursearc.com" || e.origin == "https://dlidhcpss.org" ) {
			hcpssDropdown = e.data;
			if ($('nav.hcpss-dropdown').length == 0) {
				if (e.data != '{"event":"ready"}') {
					if ($('iframe.hcpss-dropdown').length > 0) {
						$('iframe.hcpss-dropdown').after(e.data).parent().css('margin', '15px 0');
					} else if ($('iframe.coursearc').length > 0) {
						$('iframe.coursearc').height(e.data);
					}
				}
			}
		}
	},false);

	$('iframe.canvas-connection-footer').parent().css('margin', '15px 0');

	/******************************************
		Get subdomain/environment
	******************************************/
	var subdomain = getSubdomain();


	/******************************************
		Add extra links to side nav
	******************************************/
	// Grades icon
	var html = '';
	html = ' <li id="grades_menu_item" class="menu-item ic-app-header__menu-list-item">' +
        '<a class="ic-app-header__menu-list-link" href="/grades">' +
        '  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">' +
        '  	<g>' +
        '  		<path d="M38.101,36.465h23.798c0.153,0,0.3-0.061,0.409-0.168c0.108-0.109,0.169-0.256,0.169-0.41v-1.615   c0-0.32-0.259-0.58-0.578-0.578l-23.798-0.002c-0.32,0-0.58,0.26-0.58,0.58l-0.001,1.615c0.001,0.154,0.062,0.301,0.17,0.41   C37.799,36.404,37.948,36.465,38.101,36.465z"></path>' +
        '  		<path d="M61.899,63.535H38.101c-0.307,0-0.58,0.271-0.58,0.578v1.617c0,0.318,0.26,0.578,0.58,0.578l23.798-0.002   c0.159,0.002,0.303-0.064,0.409-0.17c0.104-0.104,0.169-0.248,0.169-0.408v-1.615c0-0.154-0.061-0.301-0.169-0.41   C62.199,63.596,62.052,63.535,61.899,63.535z"></path>' +
        '  		<path d="M54.589,45.717H38.101c-0.307,0-0.58,0.271-0.58,0.578v1.617c0,0.318,0.26,0.578,0.58,0.578l15.935-0.001   C54.132,47.535,54.323,46.609,54.589,45.717z"></path>' +
        '  		<path d="M58.071,39.705l-19.97-0.002c-0.319,0.002-0.578,0.26-0.58,0.58v1.615c0,0.152,0.061,0.301,0.169,0.41   c0.11,0.107,0.255,0.17,0.409,0.17h17.896C56.581,41.474,57.277,40.544,58.071,39.705z"></path>' +
        '  		<path d="M68.96,65c-1.455,0-2.858-0.218-4.188-0.604l0,8.277H35.228l0.001-45.346H64.77l0,8.277C66.102,35.218,67.505,35,68.96,35   c1.077,0,2.126,0.119,3.139,0.335V23.664c0-0.979-0.382-1.898-1.075-2.592C70.333,20.38,69.414,20,68.435,20H31.564   c-0.978,0-1.897,0.381-2.59,1.072c-0.692,0.693-1.073,1.613-1.073,2.592v52.672c-0.001,0.979,0.38,1.898,1.073,2.592   C29.666,79.62,30.585,80,31.564,80h36.872c0.978,0,1.897-0.383,2.589-1.074c0.692-0.691,1.075-1.611,1.075-2.59V64.665   C71.086,64.881,70.038,65,68.96,65z"></path>' +
        '  		<path d="M55.998,57.523l-17.897-0.002c-0.319,0.002-0.578,0.26-0.58,0.58v1.615c0,0.152,0.061,0.301,0.169,0.41   c0.11,0.107,0.255,0.17,0.409,0.17h19.973C57.279,59.457,56.583,58.528,55.998,57.523z"></path>' +
        '  		<path d="M54.036,51.511L38.101,51.51c-0.32,0-0.58,0.26-0.58,0.58l-0.001,1.615c0.001,0.154,0.062,0.301,0.17,0.41   c0.108,0.107,0.257,0.168,0.41,0.168h16.488C54.323,53.391,54.132,52.465,54.036,51.511z"></path>' +
        '  		<g>' +
        '  			<path d="M70.54,37.601c-6.847-0.873-13.107,3.972-13.979,10.819c-0.873,6.847,3.973,13.107,10.82,13.979    c6.847,0.873,13.107-3.974,13.979-10.821C82.232,44.731,77.387,38.473,70.54,37.601z M72.923,56.5    c-0.179,0.139-0.38,0.193-0.606,0.164c-0.225-0.028-0.404-0.131-0.537-0.31c-0.071-0.093-0.122-0.187-0.151-0.284l-0.955-3.825    l-3.928-0.5l-1.891,3.462c-0.052,0.087-0.125,0.166-0.217,0.237c-0.179,0.139-0.381,0.193-0.606,0.164    c-0.225-0.028-0.406-0.131-0.541-0.31c-0.136-0.179-0.19-0.38-0.161-0.605c0.016-0.123,0.06-0.241,0.132-0.357l5.439-10.019    c0.21-0.349,0.492-0.499,0.845-0.454c0.363,0.047,0.598,0.263,0.705,0.651l2.764,11.103c0.028,0.107,0.035,0.221,0.02,0.338    C73.206,56.181,73.102,56.361,72.923,56.5z M79.376,48.614l-3.733,2.889c-0.09,0.07-0.204,0.102-0.316,0.088    c-0.113-0.015-0.216-0.074-0.286-0.165l-1.709-2.208c-0.146-0.187-0.111-0.457,0.077-0.602l0.848-0.658    c0.09-0.068,0.205-0.1,0.317-0.085c0.113,0.015,0.216,0.073,0.285,0.163l0.791,1.021l2.545-1.971    c0.094-0.072,0.208-0.1,0.316-0.086c0.109,0.014,0.213,0.069,0.286,0.162l0.656,0.85c0.069,0.09,0.1,0.203,0.085,0.316    C79.524,48.442,79.466,48.544,79.376,48.614z"></path>' +
        '  			<polygon points="67.583,50.198 70.252,50.539 69.356,46.924   "></polygon>' +
        '  		</g>' +
        '  	</g>' +
        '  </svg>' +
        '  <div class="menu-item__text">' +
        '    Grades' +
        '  </div>' +
        '</a>' +
		'</li>';
	$('ul#menu').append(html);

	// Community icon for teachers and admins
	if(typeof(ENV) !== 'undefined' && (ENV.current_user_roles.indexOf('admin') != -1 || ENV.current_user_roles.indexOf('teacher') != -1) ){
		var html = ''
		html = ' <li id="communities_menu_item" class="menu-item ic-app-header__menu-list-item"> ' +
				' <a id="global_nav_communities_link" href="/courses/378/pages/canvas-communities" class="ic-app-header__menu-list-link">'+
				'	<div class="menu-item-icon-container" aria-hidden="true"><img src="https://canvasfiles.hcpss.me/images/new-ui-communities-icon.png"></div>'+
				'	<div class="menu-item__text">Communities</div> ' +
				' </a>' +
			'</li>';
		$('ul#menu').append(html);
	}

	/******************************************
		Add extra links to dashboard
	******************************************/
	// Create container
	$('#dashboard .col-xs-9').after('<ul id="extra-nav"></ul>');
	$('.ic-Dashboard-header .grid-row').css('position', 'relative');

	// Orientation link
	var url = "https://hcpss.instructure.com/courses/9495";
	var label = "Orientation";
	$('#extra-nav').append("<li class='menu-item' > <a id='link-orientation' href='" + url + "' class='menu-item-no-drop' target='_blank'>"+label+"</a> </li>");

	// Synergy link for everyone
	if (subdomain == "hcpss-tc") {
		var url = "https://hcpss.me/synergy-test";
	} else {
		var url = "https://hcpss.me/synergy";
	}
	var label = "Synergy";
	$('#extra-nav').append("<li class='menu-item' > <a id='link-synergy' href='" + url + "' class='menu-item-no-drop' target='_blank' rel='noopener noreferrer'>"+label+"</a> </li>");

	/*******************************************
		Joe's Request 10/27/2015:
      	Remove "Treat Ungraded as 0" from Grades menu
	*******************************************/
	if ($('body.gradebook2').length > 0) {
		var intervalTimes3 = 0;
		var intervalID3 = setInterval(function() {
			$('.gradebook_dropdown li').each(function() {
				if ($(this).children('a').text() == "Treat Ungraded as 0") {
					$(this).remove();
				}
			});
			if (++intervalTimes3 === 8) {
				window.clearInterval(intervalID3);
			}
		}, 500);
	}

	/*******************************************
		Folding faqs & Accordion
	*******************************************/
	var intervalID4 = setInterval(function() {
		
		// FAQ
		$('.faqs h4').each(function() {
			$(this).prepend('<span class="arrow"></span>');
			$(this).nextUntil('h4, h3').hide();
		});
		$('.faqs h4').click(function() {
			$(this).nextUntil('h4, h3').slideToggle();
			$(this).children('.arrow').toggleClass('open');
		});
		
		// Accordion
		$('.enhanceable_content.accordion div').hide();
		$('.enhanceable_content.accordion h3').click(function(){
			$(this).next("div").slideToggle();
			return false;
		});
		
		window.clearInterval(intervalID4);
	}, 500);

	/*******************************************
		Remove 'report a problem' and 'submit a feature' from help dialog -
		only for students/observers
	*******************************************/
	$('.help_dialog_trigger').click(function() {
		var intervalTimes5 = 0;
		var intervalID5 = setInterval(function() {
			if(typeof(ENV) !== 'undefined' &&
				!(ENV.current_user_roles.indexOf('admin') != -1 || ENV.current_user_roles.indexOf('teacher') != -1)
			){
				$('#help-dialog .text').each(function() {
					if ($(this).text() == "Report a Problem" || $(this).text() == "Submit a Feature Idea") {
						$(this).parent().parent().hide();
					}
				});
			}
			if (++intervalTimes5 === 20) {
				window.clearInterval(intervalID5);
			}
		}, 100);
	});


	/******************************************
		Joe's Request 10/29:
		In the create assignment modal, change Quiz to say Online Quiz
	*******************************************/
	var intervalTimes6 = 0;
	var intervalID6 = setInterval(function() {
		$('.create_assignment_dialog select[name=submission_types] option').each(function() {
			if ($(this).text() == "Quiz") {
				$(this).text("Online Quiz");
			}
		});
		if (++intervalTimes6 === 30) {
			window.clearInterval(intervalID6);
		}
	}, 500);


	var intervalTimes7 = 0;
	var intervalID7 = setInterval(function() {
		$('body.grades input#ungraded').parent().parent().hide();
		if (++intervalTimes7 === 8) {
			window.clearInterval(intervalID7);
		}
	}, 500);


	/*******************************************
		Shobana's Gradebook code
	*******************************************/
	//HCPSS Customization to open Student Grades page
	var regex = new RegExp('/accounts/([0-9]+)/users/([0-9]+)$');
	var matches = regex.exec(document.location);
	if (matches) {
		if ($('#jj_allgrades').length == 0) {
			var text = document.getElementsByTagName('h2');
			var gh = text[0];
			var url = '/users/' + matches[2] + '/grades?' + gh.innerHTML;
			$('#right-side-wrapper div').append('<a id="jj_allgrades" class="btn button-sidebar-wide" href="' + url + '"><i class="icon-gradebook"></i> View All Grades for Student</a>');
		}
	}


	// Shobana's Customization - New "Parent Dashboard" button at right side of the dashboard page
	if( document.location.href == "https://hcpss.instructure.com/" && isParent())
	{
		var url = "https://canvasdata.hcpss.me/CANVASStudentGrades";
		var label = "Students";
		$('#extra-nav').append("<li class='menu-item' > <a id='link-parent-dashboard' href='" + url + "' class='menu-item-no-drop' target='_blank'>"+label+"</a> </li>");
	}

	// HCPSS Customization to replace the heading in page with student name
	var regex = new RegExp('/users/([0-9]+/grades?[a-zA-Z0-9_ ]+)');
	var matches = regex.exec(document.location);
	if (matches) {
		var url = window.location.toString();


		var originalURL = url.split('?');

		var userName = originalURL[1];
		var text = document.getElementsByTagName('h2');
		var gh = text[0];

		var re = new RegExp('%20', 'g');
		var re1 = new RegExp('%27', 'g');

		var studentName = userName.replace(re, ' ');
		studentName = studentName.replace(re1, "'");
		gh.innerHTML = "Courses for " + studentName

		var breadcrumbnodes = document.getElementById('breadcrumbs').childNodes[0].childNodes[1];
		var classText = breadcrumbnodes.getElementsByClassName("ellipsible");
		classText[0].innerText = studentName

		var url = window.location.toString();


		var originalURL = url.split('/');
		var finalURL = originalURL[0] + '//' + originalURL[2] + '/accounts/1/' + originalURL[3] + '/' + originalURL[4];

		var breadcrumbnodes = document.getElementById('breadcrumbs').childNodes[0].childNodes[1];
		var aTag = breadcrumbnodes.getElementsByTagName('a');
		aTag[0].href = finalURL

	}

	/******************************************
		Modifications to jQuery UI accordion -
		All closed by default.  Dynamic height.
	*******************************************/
	// This appears to be depricated but holding on till we do full regression testing.
	/*
	var intervalTimes8 = 0;
	var intervalID8 = setInterval(function() {
		$('#content .accordion_closed').accordion("option", "collapsible", true);
		$('#content .accordion_closed').accordion("option", "active", -1);
		$('#content .accordion_closed').accordion("option", "heightStyle", "content");
		if (++intervalTimes8 === 5) {
			window.clearInterval(intervalID8);
		}
	}, 500);
	*/

	/******************************************
	 New "fake" tabs - these "tabs" link out
	 elsewhere rather than to an ID on the page.
	 *******************************************/
	var intervalTimes9 = 0;
	var intervalID9 = setInterval(function() {
		if ($('.fake-tabs').length > 0 && !$('.fakeTabs').hasClass('ui-tabs')) {
			$('.fake-tabs').addClass('ui-tabs ui-widget ui-widget-content ui-corner-all');
			$('.fake-tabs ul').addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all')
			$('.fake-tabs ul li').addClass('ui-state-hover ui-state-default ui-corner-top');
			$('.fake-tabs ul li a').addClass('ui-tabs-anchor');

			/* Add class ui-tabs-active if on the tab/page currently */
			$('.fake-tabs ul a').each(function () {
				if ($(this).prop('href') == window.location.href.replace(window.location.search,"")) {
					$(this).parent().addClass('active');
				}
			});
		}

		if (++intervalTimes9 === 5) {
			window.clearInterval(intervalID9);
		}
	}, 500);
});


/*******************************************************
JS Fallback for tiles, which use flexbox.
Tiles are used for parent-facing courses.
http://osvaldas.info/flexbox-based-responsive-equal-height-blocks-with-javascript-fallback
*******************************************************/
$(document).ready(function(){
    'use strict';

    var s = document.body || document.documentElement, s = s.style;
    //if( s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '' ) return true;

    var $list       = $( '#content-wrapper .user_content ul.tiles' ),
        $items      = $list.find( 'li' ),
        setHeights  = function()
        {
            $items.css( 'height', 'auto' );

            var perRow = Math.floor( $list.width() / $items.width() );
            if( perRow == null || perRow < 2 ) return true;

            for( var i = 0, j = $items.length; i < j; i += perRow )
            {
                var maxHeight   = 0,
                    $row        = $items.slice( i, i + perRow );

                $row.each( function()
                {
                    var itemHeight = parseInt( $( this ).outerHeight() );
                    if ( itemHeight > maxHeight ) maxHeight = itemHeight;
                });
                $row.css( 'height', maxHeight );
            }
        };

    setHeights();
    $( window ).on( 'resize', setHeights );
});


/*******************************************************
jCarousel - v0.3.1 - 2014-04-26
http://sorgalla.com/jcarousel
Copyright (c) Jan Sorgalla; Licensed MIT
*******************************************************/

(function(t){"use strict";var i=t.jCarousel={};i.version="0.3.1";var s=/^([+\-]=)?(.+)$/;i.parseTarget=function(t){var i=!1,e="object"!=typeof t?s.exec(t):null;return e?(t=parseInt(e[2],10)||0,e[1]&&(i=!0,"-="===e[1]&&(t*=-1))):"object"!=typeof t&&(t=parseInt(t,10)||0),{target:t,relative:i}},i.detectCarousel=function(t){for(var i;t.length>0;){if(i=t.filter("[data-jcarousel]"),i.length>0)return i;if(i=t.find("[data-jcarousel]"),i.length>0)return i;t=t.parent()}return null},i.base=function(s){return{version:i.version,_options:{},_element:null,_carousel:null,_init:t.noop,_create:t.noop,_destroy:t.noop,_reload:t.noop,create:function(){return this._element.attr("data-"+s.toLowerCase(),!0).data(s,this),!1===this._trigger("create")?this:(this._create(),this._trigger("createend"),this)},destroy:function(){return!1===this._trigger("destroy")?this:(this._destroy(),this._trigger("destroyend"),this._element.removeData(s).removeAttr("data-"+s.toLowerCase()),this)},reload:function(t){return!1===this._trigger("reload")?this:(t&&this.options(t),this._reload(),this._trigger("reloadend"),this)},element:function(){return this._element},options:function(i,s){if(0===arguments.length)return t.extend({},this._options);if("string"==typeof i){if(s===void 0)return this._options[i]===void 0?null:this._options[i];this._options[i]=s}else this._options=t.extend({},this._options,i);return this},carousel:function(){return this._carousel||(this._carousel=i.detectCarousel(this.options("carousel")||this._element),this._carousel||t.error('Could not detect carousel for plugin "'+s+'"')),this._carousel},_trigger:function(i,e,r){var n,o=!1;return r=[this].concat(r||[]),(e||this._element).each(function(){n=t.Event((s+":"+i).toLowerCase()),t(this).trigger(n,r),n.isDefaultPrevented()&&(o=!0)}),!o}}},i.plugin=function(s,e){var r=t[s]=function(i,s){this._element=t(i),this.options(s),this._init(),this.create()};return r.fn=r.prototype=t.extend({},i.base(s),e),t.fn[s]=function(i){var e=Array.prototype.slice.call(arguments,1),n=this;return"string"==typeof i?this.each(function(){var r=t(this).data(s);if(!r)return t.error("Cannot call methods on "+s+" prior to initialization; "+'attempted to call method "'+i+'"');if(!t.isFunction(r[i])||"_"===i.charAt(0))return t.error('No such method "'+i+'" for '+s+" instance");var o=r[i].apply(r,e);return o!==r&&o!==void 0?(n=o,!1):void 0}):this.each(function(){var e=t(this).data(s);e instanceof r?e.reload(i):new r(this,i)}),n},r}})(jQuery),function(t,i){"use strict";var s=function(t){return parseFloat(t)||0};t.jCarousel.plugin("jcarousel",{animating:!1,tail:0,inTail:!1,resizeTimer:null,lt:null,vertical:!1,rtl:!1,circular:!1,underflow:!1,relative:!1,_options:{list:function(){return this.element().children().eq(0)},items:function(){return this.list().children()},animation:400,transitions:!1,wrap:null,vertical:null,rtl:null,center:!1},_list:null,_items:null,_target:null,_first:null,_last:null,_visible:null,_fullyvisible:null,_init:function(){var t=this;return this.onWindowResize=function(){t.resizeTimer&&clearTimeout(t.resizeTimer),t.resizeTimer=setTimeout(function(){t.reload()},100)},this},_create:function(){this._reload(),t(i).on("resize.jcarousel",this.onWindowResize)},_destroy:function(){t(i).off("resize.jcarousel",this.onWindowResize)},_reload:function(){this.vertical=this.options("vertical"),null==this.vertical&&(this.vertical=this.list().height()>this.list().width()),this.rtl=this.options("rtl"),null==this.rtl&&(this.rtl=function(i){if("rtl"===(""+i.attr("dir")).toLowerCase())return!0;var s=!1;return i.parents("[dir]").each(function(){return/rtl/i.test(t(this).attr("dir"))?(s=!0,!1):void 0}),s}(this._element)),this.lt=this.vertical?"top":"left",this.relative="relative"===this.list().css("position"),this._list=null,this._items=null;var i=this._target&&this.index(this._target)>=0?this._target:this.closest();this.circular="circular"===this.options("wrap"),this.underflow=!1;var s={left:0,top:0};return i.length>0&&(this._prepare(i),this.list().find("[data-jcarousel-clone]").remove(),this._items=null,this.underflow=this._fullyvisible.length>=this.items().length,this.circular=this.circular&&!this.underflow,s[this.lt]=this._position(i)+"px"),this.move(s),this},list:function(){if(null===this._list){var i=this.options("list");this._list=t.isFunction(i)?i.call(this):this._element.find(i)}return this._list},items:function(){if(null===this._items){var i=this.options("items");this._items=(t.isFunction(i)?i.call(this):this.list().find(i)).not("[data-jcarousel-clone]")}return this._items},index:function(t){return this.items().index(t)},closest:function(){var i,e=this,r=this.list().position()[this.lt],n=t(),o=!1,l=this.vertical?"bottom":this.rtl&&!this.relative?"left":"right";return this.rtl&&this.relative&&!this.vertical&&(r+=this.list().width()-this.clipping()),this.items().each(function(){if(n=t(this),o)return!1;var a=e.dimension(n);if(r+=a,r>=0){if(i=a-s(n.css("margin-"+l)),!(0>=Math.abs(r)-a+i/2))return!1;o=!0}}),n},target:function(){return this._target},first:function(){return this._first},last:function(){return this._last},visible:function(){return this._visible},fullyvisible:function(){return this._fullyvisible},hasNext:function(){if(!1===this._trigger("hasnext"))return!0;var t=this.options("wrap"),i=this.items().length-1;return i>=0&&!this.underflow&&(t&&"first"!==t||i>this.index(this._last)||this.tail&&!this.inTail)?!0:!1},hasPrev:function(){if(!1===this._trigger("hasprev"))return!0;var t=this.options("wrap");return this.items().length>0&&!this.underflow&&(t&&"last"!==t||this.index(this._first)>0||this.tail&&this.inTail)?!0:!1},clipping:function(){return this._element["inner"+(this.vertical?"Height":"Width")]()},dimension:function(t){return t["outer"+(this.vertical?"Height":"Width")](!0)},scroll:function(i,s,e){if(this.animating)return this;if(!1===this._trigger("scroll",null,[i,s]))return this;t.isFunction(s)&&(e=s,s=!0);var r=t.jCarousel.parseTarget(i);if(r.relative){var n,o,l,a,h,u,c,f,d=this.items().length-1,_=Math.abs(r.target),p=this.options("wrap");if(r.target>0){var g=this.index(this._last);if(g>=d&&this.tail)this.inTail?"both"===p||"last"===p?this._scroll(0,s,e):t.isFunction(e)&&e.call(this,!1):this._scrollTail(s,e);else if(n=this.index(this._target),this.underflow&&n===d&&("circular"===p||"both"===p||"last"===p)||!this.underflow&&g===d&&("both"===p||"last"===p))this._scroll(0,s,e);else if(l=n+_,this.circular&&l>d){for(f=d,h=this.items().get(-1);l>f++;)h=this.items().eq(0),u=this._visible.index(h)>=0,u&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(h),u||(c={},c[this.lt]=this.dimension(h),this.moveBy(c)),this._items=null;this._scroll(h,s,e)}else this._scroll(Math.min(l,d),s,e)}else if(this.inTail)this._scroll(Math.max(this.index(this._first)-_+1,0),s,e);else if(o=this.index(this._first),n=this.index(this._target),a=this.underflow?n:o,l=a-_,0>=a&&(this.underflow&&"circular"===p||"both"===p||"first"===p))this._scroll(d,s,e);else if(this.circular&&0>l){for(f=l,h=this.items().get(0);0>f++;){h=this.items().eq(-1),u=this._visible.index(h)>=0,u&&h.after(h.clone(!0).attr("data-jcarousel-clone",!0)),this.list().prepend(h),this._items=null;var v=this.dimension(h);c={},c[this.lt]=-v,this.moveBy(c)}this._scroll(h,s,e)}else this._scroll(Math.max(l,0),s,e)}else this._scroll(r.target,s,e);return this._trigger("scrollend"),this},moveBy:function(t,i){var e=this.list().position(),r=1,n=0;return this.rtl&&!this.vertical&&(r=-1,this.relative&&(n=this.list().width()-this.clipping())),t.left&&(t.left=e.left+n+s(t.left)*r+"px"),t.top&&(t.top=e.top+n+s(t.top)*r+"px"),this.move(t,i)},move:function(i,s){s=s||{};var e=this.options("transitions"),r=!!e,n=!!e.transforms,o=!!e.transforms3d,l=s.duration||0,a=this.list();if(!r&&l>0)return a.animate(i,s),void 0;var h=s.complete||t.noop,u={};if(r){var c=a.css(["transitionDuration","transitionTimingFunction","transitionProperty"]),f=h;h=function(){t(this).css(c),f.call(this)},u={transitionDuration:(l>0?l/1e3:0)+"s",transitionTimingFunction:e.easing||s.easing,transitionProperty:l>0?function(){return n||o?"all":i.left?"left":"top"}():"none",transform:"none"}}o?u.transform="translate3d("+(i.left||0)+","+(i.top||0)+",0)":n?u.transform="translate("+(i.left||0)+","+(i.top||0)+")":t.extend(u,i),r&&l>0&&a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",h),a.css(u),0>=l&&a.each(function(){h.call(this)})},_scroll:function(i,s,e){if(this.animating)return t.isFunction(e)&&e.call(this,!1),this;if("object"!=typeof i?i=this.items().eq(i):i.jquery===void 0&&(i=t(i)),0===i.length)return t.isFunction(e)&&e.call(this,!1),this;this.inTail=!1,this._prepare(i);var r=this._position(i),n=this.list().position()[this.lt];if(r===n)return t.isFunction(e)&&e.call(this,!1),this;var o={};return o[this.lt]=r+"px",this._animate(o,s,e),this},_scrollTail:function(i,s){if(this.animating||!this.tail)return t.isFunction(s)&&s.call(this,!1),this;var e=this.list().position()[this.lt];this.rtl&&this.relative&&!this.vertical&&(e+=this.list().width()-this.clipping()),this.rtl&&!this.vertical?e+=this.tail:e-=this.tail,this.inTail=!0;var r={};return r[this.lt]=e+"px",this._update({target:this._target.next(),fullyvisible:this._fullyvisible.slice(1).add(this._visible.last())}),this._animate(r,i,s),this},_animate:function(i,s,e){if(e=e||t.noop,!1===this._trigger("animate"))return e.call(this,!1),this;this.animating=!0;var r=this.options("animation"),n=t.proxy(function(){this.animating=!1;var t=this.list().find("[data-jcarousel-clone]");t.length>0&&(t.remove(),this._reload()),this._trigger("animateend"),e.call(this,!0)},this),o="object"==typeof r?t.extend({},r):{duration:r},l=o.complete||t.noop;return s===!1?o.duration=0:t.fx.speeds[o.duration]!==void 0&&(o.duration=t.fx.speeds[o.duration]),o.complete=function(){n(),l.call(this)},this.move(i,o),this},_prepare:function(i){var e,r,n,o,l=this.index(i),a=l,h=this.dimension(i),u=this.clipping(),c=this.vertical?"bottom":this.rtl?"left":"right",f=this.options("center"),d={target:i,first:i,last:i,visible:i,fullyvisible:u>=h?i:t()};if(f&&(h/=2,u/=2),u>h)for(;;){if(e=this.items().eq(++a),0===e.length){if(!this.circular)break;if(e=this.items().eq(0),i.get(0)===e.get(0))break;if(r=this._visible.index(e)>=0,r&&e.after(e.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(e),!r){var _={};_[this.lt]=this.dimension(e),this.moveBy(_)}this._items=null}if(o=this.dimension(e),0===o)break;if(h+=o,d.last=e,d.visible=d.visible.add(e),n=s(e.css("margin-"+c)),u>=h-n&&(d.fullyvisible=d.fullyvisible.add(e)),h>=u)break}if(!this.circular&&!f&&u>h)for(a=l;;){if(0>--a)break;if(e=this.items().eq(a),0===e.length)break;if(o=this.dimension(e),0===o)break;if(h+=o,d.first=e,d.visible=d.visible.add(e),n=s(e.css("margin-"+c)),u>=h-n&&(d.fullyvisible=d.fullyvisible.add(e)),h>=u)break}return this._update(d),this.tail=0,f||"circular"===this.options("wrap")||"custom"===this.options("wrap")||this.index(d.last)!==this.items().length-1||(h-=s(d.last.css("margin-"+c)),h>u&&(this.tail=h-u)),this},_position:function(t){var i=this._first,s=i.position()[this.lt],e=this.options("center"),r=e?this.clipping()/2-this.dimension(i)/2:0;return this.rtl&&!this.vertical?(s-=this.relative?this.list().width()-this.dimension(i):this.clipping()-this.dimension(i),s+=r):s-=r,!e&&(this.index(t)>this.index(i)||this.inTail)&&this.tail?(s=this.rtl&&!this.vertical?s-this.tail:s+this.tail,this.inTail=!0):this.inTail=!1,-s},_update:function(i){var s,e=this,r={target:this._target||t(),first:this._first||t(),last:this._last||t(),visible:this._visible||t(),fullyvisible:this._fullyvisible||t()},n=this.index(i.first||r.first)<this.index(r.first),o=function(s){var o=[],l=[];i[s].each(function(){0>r[s].index(this)&&o.push(this)}),r[s].each(function(){0>i[s].index(this)&&l.push(this)}),n?o=o.reverse():l=l.reverse(),e._trigger(s+"in",t(o)),e._trigger(s+"out",t(l)),e["_"+s]=i[s]};for(s in i)o(s);return this}})}(jQuery,window),function(t){"use strict";t.jcarousel.fn.scrollIntoView=function(i,s,e){var r,n=t.jCarousel.parseTarget(i),o=this.index(this._fullyvisible.first()),l=this.index(this._fullyvisible.last());if(r=n.relative?0>n.target?Math.max(0,o+n.target):l+n.target:"object"!=typeof n.target?n.target:this.index(n.target),o>r)return this.scroll(r,s,e);if(r>=o&&l>=r)return t.isFunction(e)&&e.call(this,!1),this;for(var a,h=this.items(),u=this.clipping(),c=this.vertical?"bottom":this.rtl?"left":"right",f=0;;){if(a=h.eq(r),0===a.length)break;if(f+=this.dimension(a),f>=u){var d=parseFloat(a.css("margin-"+c))||0;f-d!==u&&r++;break}if(0>=r)break;r--}return this.scroll(r,s,e)}}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselControl",{_options:{target:"+=1",event:"click",method:"scroll"},_active:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onEvent=t.proxy(function(i){i.preventDefault();var s=this.options("method");t.isFunction(s)?s.call(this):this.carousel().jcarousel(this.options("method"),this.options("target"))},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend",this.onReload),this._element.on(this.options("event")+".jcarouselcontrol",this.onEvent),this._reload()},_destroy:function(){this._element.off(".jcarouselcontrol",this.onEvent),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend",this.onReload)},_reload:function(){var i,s=t.jCarousel.parseTarget(this.options("target")),e=this.carousel();if(s.relative)i=e.jcarousel(s.target>0?"hasNext":"hasPrev");else{var r="object"!=typeof s.target?e.jcarousel("items").eq(s.target):s.target;i=e.jcarousel("target").index(r)>=0}return this._active!==i&&(this._trigger(i?"active":"inactive"),this._active=i),this}})}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselPagination",{_options:{perPage:null,item:function(t){return'<a href="#'+t+'">'+t+"</a>"},event:"click",method:"scroll"},_carouselItems:null,_pages:{},_items:{},_currentPage:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onReload=t.proxy(this._reload,this),this.onScroll=t.proxy(this._update,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend",this.onReload).on("jcarousel:scrollend",this.onScroll),this._reload()},_destroy:function(){this._clear(),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend",this.onReload).off("jcarousel:scrollend",this.onScroll),this._carouselItems=null},_reload:function(){var i=this.options("perPage");if(this._pages={},this._items={},t.isFunction(i)&&(i=i.call(this)),null==i)this._pages=this._calculatePages();else for(var s,e=parseInt(i,10)||0,r=this._getCarouselItems(),n=1,o=0;;){if(s=r.eq(o++),0===s.length)break;this._pages[n]=this._pages[n]?this._pages[n].add(s):s,0===o%e&&n++}this._clear();var l=this,a=this.carousel().data("jcarousel"),h=this._element,u=this.options("item"),c=this._getCarouselItems().length;t.each(this._pages,function(i,s){var e=l._items[i]=t(u.call(l,i,s));e.on(l.options("event")+".jcarouselpagination",t.proxy(function(){var t=s.eq(0);if(a.circular){var e=a.index(a.target()),r=a.index(t);parseFloat(i)>parseFloat(l._currentPage)?e>r&&(t="+="+(c-e+r)):r>e&&(t="-="+(e+(c-r)))}a[this.options("method")](t)},l)),h.append(e)}),this._update()},_update:function(){var i,s=this.carousel().jcarousel("target");t.each(this._pages,function(t,e){return e.each(function(){return s.is(this)?(i=t,!1):void 0}),i?!1:void 0}),this._currentPage!==i&&(this._trigger("inactive",this._items[this._currentPage]),this._trigger("active",this._items[i])),this._currentPage=i},items:function(){return this._items},reloadCarouselItems:function(){return this._carouselItems=null,this},_clear:function(){this._element.empty(),this._currentPage=null},_calculatePages:function(){for(var t,i=this.carousel().data("jcarousel"),s=this._getCarouselItems(),e=i.clipping(),r=0,n=0,o=1,l={};;){if(t=s.eq(n++),0===t.length)break;l[o]=l[o]?l[o].add(t):t,r+=i.dimension(t),r>=e&&(o++,r=0)}return l},_getCarouselItems:function(){return this._carouselItems||(this._carouselItems=this.carousel().jcarousel("items")),this._carouselItems}})}(jQuery),function(t){"use strict";t.jCarousel.plugin("jcarouselAutoscroll",{_options:{target:"+=1",interval:3e3,autostart:!0},_timer:null,_init:function(){this.onDestroy=t.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",t.proxy(this._create,this))},this),this.onAnimateEnd=t.proxy(this.start,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy),this.options("autostart")&&this.start()},_destroy:function(){this.stop(),this.carousel().off("jcarousel:destroy",this.onDestroy)},start:function(){return this.stop(),this.carousel().one("jcarousel:animateend",this.onAnimateEnd),this._timer=setTimeout(t.proxy(function(){this.carousel().jcarousel("scroll",this.options("target"))},this),this.options("interval")),this},stop:function(){return this._timer&&(this._timer=clearTimeout(this._timer)),this.carousel().off("jcarousel:animateend",this.onAnimateEnd),this}})}(jQuery);;



/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);


/*******************************************************
	gallery.js written by Bethany Meyer
	Takes an unordered list with a class of gallery,
	and turns it into a picture gallery with a
	carousel of thumbnails on the bottom and full size
	image on top. Utilizes jcarousel.js.
*******************************************************/
var connector;

$(document).ready(function() {

	setTimeout(function(){

		/* Carousel Photo Galleries */
		$('ul.gallery').each(function() {

			// Set up navigation
			var $images = $(this);
			$images.wrap('<div class="connected-carousels"></div>');
			$images.wrap('<div class="thumbnails"></div>');
			$images.before('<a href="#" class="prev prev-navigation">&laquo;</a><a href="#" class="next next-navigation">&raquo;</a>');
			$images.wrap('<div class="carousel carousel-navigation"></div>');
			var $carouselNav = $images.parent();
			var $thumbs = $carouselNav.parent();
			var $connectedCarousels = $thumbs.parent();

			// Set up stage
			$thumbs.before('<div class="stage"><div class="carousel carousel-stage"></div></div>');
			var $carouselStage = $connectedCarousels.children().children('.carousel-stage');
			$images.clone().appendTo($carouselStage);
			$carouselStage.children('ul').children('li').children('img').each(function() {
				if ($(this).prop('alt')) {
					$(this).after('<p class="caption">' + $(this).prop('alt') + '</p>');
				}
				$(this).wrap('<div class="stage-img"></div>');
				$(this).wrap('<div class="stage-img-center"></div>');
				$(this).wrap('<div class="stage-img-center2"></div>');
			});

			// Set up thumbnails
			$images.children('li').each(function() {
				var src = $(this).children('img').prop('src');
				$(this).children('img').wrap('<div class="thumbnail" style="background-image: url(' + src +');"></div>');
			});

			// Set up carousels
			var connector = function(itemNavigation, carouselStage) {
				return carouselStage.jcarousel('items').eq(itemNavigation.index());
			};
			var carouselStage      = $carouselStage.jcarousel();
			var carouselNavigation = $carouselNav.jcarousel();

			// We loop through the items of the navigation carousel and set it up
			// as a control for an item from the stage carousel.
			carouselNavigation.jcarousel('items').each(function() {
				var item = $(this);

				// This is where we actually connect to items.
				var target = connector(item, carouselStage);

				item
					.on('jcarouselcontrol:active', function() {
						carouselNavigation.jcarousel('scrollIntoView', this);
						item.addClass('active');
					})
					.on('jcarouselcontrol:inactive', function() {
						item.removeClass('active');
					})
					.jcarouselControl({
						target: target,
						carousel: carouselStage
					});
			});

			// Setup controls for the navigation carousel
			$('.prev-navigation')
				.on('jcarouselcontrol:inactive', function() {
					$(this).addClass('inactive');
				})
				.on('jcarouselcontrol:active', function() {
					$(this).removeClass('inactive');
				})
				.jcarouselControl({
					target: '-=1'
				});

			$('.next-navigation')
				.on('jcarouselcontrol:inactive', function() {
					$(this).addClass('inactive');
				})
				.on('jcarouselcontrol:active', function() {
					$(this).removeClass('inactive');
				})
				.jcarouselControl({
					target: '+=1'
				});
		});

	}, 500);

});

/* Set up Lightboxes */
$(document).ready(function() {

	setTimeout(function(){

		$('img.lightbox').each(function(i, elem) {
			$('#content-wrapper .user_content').append('<div class="lightbox-hidden" id="lightbox' + i + '"></div>');
			$('#lightbox' + i).append($(this).clone());
			$(this).wrap('<a class="lightbox" href="#lightbox' + i + '"></a>');
			$(this).removeClass('lightbox');
		});

		$('a.lightbox').each(function(i, elem) {
			$('#content-wrapper .user_content').append('<div class="lightbox-hidden" id="lightbox' + i + '"></div>');
			$('#lightbox' + i).append('<img src="' + $(this).prop('href') + '"/>');
		});

		$("a.lightbox").fancybox({
			openEffect	: 'elastic',
			closeEffect	: 'elastic'
		});

		$('a.lightbox-interactive').fancybox({
			maxWidth	: 750,
			maxHeight	: 690,
			fitToView	: false,
			width		: '90%',
			height		: '90%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none',
			type: 'iframe',
			closeBtn: true
		});


	}, 500);

	// Role DOM Support
	if(typeof(ENV) !== 'undefined'){ 
						
		// Add Role Classes To Body
		$.each(ENV.current_user_roles, function(i,e){
			$("body").addClass("role-"+e);
		});
		
		// Hide Access Log
		if( (ENV.current_user_roles.indexOf('admin')) == -1 ){		
			$(".button-sidebar-wide .icon-clock").parent().hide();
		} 
		
	}
	
	// Modules Collapse By Default
    // Parsing out various sections of the URL.
    var urlFifthLoc = document.URL.split('/')[5];

    if (urlFifthLoc === 'modules') {		
		$(".item-group-condensed").each(function(){
			$(this).addClass("collapsed_module");
		});
    }     

});

/* Get subdomain - this is used so we can target specific code to test/beta/live */
function getSubdomain() {
	var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
	var urlParts = regexParse.exec(window.location.hostname);
	if (urlParts) {
		return window.location.hostname.replace(urlParts[0],'').slice(0, -1);
	}
}

function isParent() {
	if (typeof(ENV) !== 'undefined')  {
		if ( $.inArray('observer', ENV['current_user_roles']) !== -1 ) {
			return true;
		} else if ($.inArray('user', ENV['current_user_roles']) == 0 && ENV['current_user_roles'].length == 1) {
			return true;
		}
	}
	return false;
}

/******************************************
  Add HCPSS Calendar links to Calendar
******************************************/

if (document.location.pathname.indexOf("/calendar") > -1) {
  var html = '';
  html = '<div class="rs-section" id="hcpss_calendar_link" style="text-align: center; margin-bottom: 14px; text-decoration: none">' +
          '<a class="link_to_hcpss_calendar" href="http://www.hcpss.org/calendar/">' +
            'HCPSS System Calendar'
          '</a>' +
         '</div>'

  $('aside#right-side').prepend(html);
}


////////////////////////////////////////////////////
// DESIGN TOOLS CONFIG                            //
////////////////////////////////////////////////////
// Copyright (C) 2016  Utah State University
var DT_variables = {
        iframeID: '',
        // Path to the hosted USU Design Tools
        path: 'https://designtools.ciditools.com/',
        templateCourse: '56040',
        // OPTIONAL: Button will be hidden from view until launched using shortcut keys
        hideButton: true,
        // OPTIONAL: Limit tools loading by users role
        limitByRole: false, // set to true to limit to roles in the roleArray
        // adjust roles as needed
        roleArray: [
            'student',
            'teacher',
            'admin'
        ],
        // OPTIONAL: Limit tools to an array of Canvas user IDs
        limitByUser: false, // Change to true to limit by user
        // add users to array (Canvas user ID not SIS user ID)
        userArray: [
            '1234',
            '987654'
        
        ]
    };

// Run the necessary code when a page loads
$(document).ready(function () {
    'use strict';
    // This runs code that looks at each page and determines what controls to create
    $.getScript(DT_variables.path + 'js/master_controls.js', function () {
        console.log('master_controls.js loaded');
    });
});
////////////////////////////////////////////////////
// END DESIGN TOOLS CONFIG                        //
////////////////////////////////////////////////////

// ADD CLASS TO CONTENT WHERE DESIGN TOOLS IS NOT USED
function klAdditionalAfterContentLoaded() {
    if ($('#kl_wrapper_3').length === 0) {
        $('.user_content').addClass('not_design_tools');
    }
}

////////////////////////////////////
// Math Jax CDN Include & Config
////////////////////////////////////
var mj = document.createElement('script');
mj.type = 'text/javascript';
mj.async = true;
mj.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_HTMLorMML'; //config was TeX-AMS-MML_HTMLorMML
document.getElementsByTagName('body')[0].appendChild(mj);

////////////////////////////////////
// OBSERVERS ADDON
////////////////////////////////////
// ==UserScript==
// @name        Message Observers
// @namespace   msgobs
// @include     https://canvas.test.instructure.com/*
// @include     https://canvas.instructure.com/*
// @version     v0.05
// @grant       none
// ==/UserScript==

// If you are using TamperMonkey / GreaseMonkey you will need to update the above URLs
//  to your own canvas instance. Don't forget the * after the trailing slash to ensure the script runs on all pages
//  Alternativley you can specify which pages this script should run on from the GreaseMonkey
//  control panel.

// The above UserScript block may be removed entirely if you are not using GreaseMonkey or TamperMonkey etc, and are
// instead applying the script to your entire site.

/*
 * MSGOBS v0.05
 * https:// github.com/sdjrice/msgobs
 * Stephen Rice
 * srice@scc.wa.edu.au
 */

 /*
  * Please Note:
  * There are currently two separate observer lookup methods within this script
  * The older method, which wasn't well suited to handling group lookups will be
  * removed, following a big code cleanup.
  * Sorry about that.
  */

var msgobs = {
  options: {
    colour: 'bisque', // colour for observers. Use any HTML colour like '#FF0000' or 'red'
    observersText: 'Include Observers', // include observers button text.
    removeText: 'Remove Students', //  remove students button text.
    busyText: 'Working...', // text to display while observers are being processed.
    btnWidth: '110px',
    autoTickIndividualMsgCheckbox: true,
    log: false // output log in the browser console.
  },

  init: function () {
    // init for conversations page (inbox) or gradebook page
    if (window.location.href.indexOf('/conversations') !== -1 && this.conversations) {
      msgobs.log('Launching Conversations');
      this.launch('conversations');
    } else if (window.location.href.indexOf('/gradebook') !== -1 && this.gradebook) {
      msgobs.log('Launching Gradebook');
      this.launch('gbook');
    }
  },

  launch: function (type) {
    console.log('----------------');
    console.log('MSGOBS \n v0.05 \nhttps://github.com/sdjrice/msgobs');
    console.log('Stephen Rice \nsrice@scc.wa.edu.au');
    console.log('----------------');

    this.common.init();

    switch (type) {
      case 'conversations':
        this.conversations.init();
        break;
      case 'gbook':
        this.gradebook.init();
        break;
    }
  },

  common: {
    els: {
      flashMessage: $('#flash_message_holder') // Canvas message flasher (appears top center of screen-ish).
    },
    txt: {
      noStudents: 'There are no students in the recipient list.',
      noStudentsRmv: 'There are no students in the recipient list.',
      addObsSuccess: 'Observers added successfully.',
      addObsNone: 'No observers were found.',
      removedStudents: 'Removed students.',
      noRecipients: 'There are no recipients in the addressee field.',
      noContext: 'Notice: You have not selected a course context for your search. The observer lookup may take some time and will include observer matches from <strong>all courses.</strong>',
      noContextRmv: 'Notice: You have not selected a course context for your search. The removal lookup will remove recipients who have a student enrolment in <strong>any course.</strong>',
      noNewObservers: 'The recipient list already included all matched observers.',
      groupExpansion: 'Your recipient list contains groups. Groups will be expanded into their respective members.'
    },

    init: function () {
      // create button objects with classes from default Canvas buttons. May need classes updated in the future.
      this.btnAddObs = $('<div>' + msgobs.options.observersText + '</div>').addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only').css({
        'margin': '0 2px',
        'min-width': msgobs.options.btnWidth
      });
      this.btnRmvStu = $('<div>' + msgobs.options.removeText + '</div>').addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only').css({
        'margin': '0 2px',
        'min-width': msgobs.options.btnWidth
      });
    },

    getCsrfToken: function () {
      // returns secret cookie token
      var csrfToken = document.cookie.slice(document.cookie.indexOf('_csrf_token=') + 12);
      if (csrfToken.indexOf(';') !== -1) { // depending on the order of the cookie vars the csrf may be at end of string. Therefore, there will be no semicolon. Chrome.
        csrfToken = csrfToken.slice(0, csrfToken.indexOf(';'));
      }
      return csrfToken;
    },

    searchObjArray: function (arr, search) {
      var match = -1;
      arr.forEach(function (item, i) {
        for (var key in item) {
          if (item[key] === search) {
            match = i;
          }
        }
      });
      return match; // for consistency with indexOf comparisons
    },

    getObservers: {
      init: function (recipients, context, callback) {
        msgobs.log('--Observers 2.0--');

        function Observers () {
          this.contexts = [context];
          this.contexts.count = 0;
          this.contexts.total = 0;

          this.contexts.getCount = 0;

          this.expand = [];
          this.expand.count = 0;
          this.expand.total = 0;

          this.users = [];
          this.users.simplified = [];

          this.enrolments = [];

          this.observers = [];

          this.callback = callback;

          this.matchFlag = 0;
        }

        var results = new Observers();

        this.sortRecipients(recipients, results);
        this.process.init(results);
      },

      sortRecipients (recipients, results) {
        recipients.forEach(function (id) {
          id = id.split('_');

          switch (id.length) {
            case 1:
              // user id
              results.expand.push(['user', id[0]]);
              break;
            case 2:
              // course, section
              results.expand.push([id[0], id[1]]);
              break;
            case 3:
              // course, section, type
              results.expand.push([id[0], id[1], id[2]]);
              break;
          }
        });
      },

      process: {
        init: function (results) {
          this.expand(results);
          results.expand.total = results.expand.length;
        },

        handle: function (data, status, results) {
          results.expand.count++;
          if (data.forEach) {
            data.forEach(function (v) {
              if (v.user) {
                results.users.push(v.user);
              } else {
                results.users.push(v);
              }
            });
          } else {
            results.users.push(data);
          }

          msgobs.log('Expand count: ' + results.expand.count + ' Total: ' + results.users.length);

          if (results.expand.count === results.expand.total) {
            results.users.forEach(function (v) {
              results.users.simplified.push({
                id: v.id,
                name: v.name
              });
            });
            msgobs.common.getObservers.process.lookup.init(results);
          }
        },

        expand: function (results) {
          var callback = this.handle;
          results.expand.forEach(function (v) {
            var url;
            var type = '';

            if (v[2]) {
              type = (v[2].slice(0, v[2].length - 1)); // remove plural
              type = '&enrollment_type=' + type;
            }

            // at some point this will need to be made per user

            switch (v[0]) {
              case 'user':
                if (results.contexts[0] === 'none') {
                  url = '/api/v1/users/' + v[1];
                } else {
                  url = '/api/v1/courses/' + results.contexts[0] + '/search_users?search_term=' + v[1];
                }
                break;
              case 'course':
                url = '/api/v1/courses/' + v[1] + '/users?per_page=100000' + type;
                break;
              case 'section':
                url = '/api/v1/sections/' + v[1] + '/enrollments?per_page=100000';
                break;
              case 'group':
                url = '/api/v1/groups/' + v[1] + '/users?per_page=100000';
                break;
            }
            msgobs.xhr.get(url, callback, results);
          });
        },

        lookup: {
          init: function (results) {
            msgobs.log('--- Getting Enrollments ---');
            results.contexts.total = results.contexts.length;
            if (results.contexts[0] === 'none') {
              results.contexts.pop();
              this.getContexts.init(results);
            } else {
              this.enrolments(results);
            }
          },

          getContexts: {
            init: function (results) {
              msgobs.log('No context for lookup, getting contexts from user enrolments.');
              results.contexts.getCount = 0;
              this.contexts(results);
            },

            contexts: function (results) {
              var callback = this.handle;
              results.users.forEach(function (v) {
                msgobs.xhr.get('/api/v1/users/' + v.id + '/enrollments?state=active&per_page=100000', callback, results);
              });
            },

            handle: function (data, status, results) {
              results.contexts.getCount ++;
              data.forEach(function (v) {
                if (results.contexts.indexOf(v.course_id) === -1) { // don't make duplicates
                  results.contexts.push(v.course_id);
                }
              });
              msgobs.log('getContextCount: ' + results.contexts.getCount + ' Total: ' + results.users.length);
              if (results.contexts.getCount === results.users.length) {
                msgobs.log('Context lookup complete.');
                msgobs.common.getObservers.process.lookup.init(results);
              }
            }

          },

          enrolments: function (results) {
            var callback = this.handle;
            results.contexts.forEach(function (v) {
              msgobs.xhr.get('/api/v1/courses/' + v + '/enrollments?per_page=100000', callback, results);
            });
          },

          handle: function (data, status, results) {
            results.contexts.count++;
            data.forEach(function (v) {
              if (v.associated_user_id) {
                results.enrolments.push(v);
              }
            });

            msgobs.log('Enrolments Count: ' + results.contexts.count + 'Total: ' + results.contexts.total);

            if (results.contexts.count === results.contexts.total) {
              msgobs.log('Completed enrolments lookup');
              msgobs.common.getObservers.process.match.init(results);
            }
          }

        },

        match: {
          init: function (results) {
            msgobs.log('--- Matching Results ---');
            this.match(results);
          },

          match: function (results) {
            results.users.forEach(function (user) {
              results.enrolments.forEach(function (enrolment) {
                msgobs.log('Comparing: ' + user.id + ' <-> ' + enrolment.associated_user_id);
                if (user.id === enrolment.associated_user_id) {
                  msgobs.log('Found a match.');
                  results.matchFlag = 1;
                  var observerData = {
                    id: enrolment.user_id,
                    name: enrolment.user.name,
                    observing: user.name
                  };
                  // omit duplicate entries, add additional observees to existing entry.
                  var observerDuplicate = msgobs.common.searchObjArray(results.observers, observerData.id);

                  // below is a probably pointless check
                  // var userDuplicate = msgobs.common.searchObjArray(results.users.simplified, user.id);
                  var userObserverDuplicate = msgobs.common.searchObjArray(results.users.simplified, observerData.id);
                  if (observerDuplicate === -1 && userObserverDuplicate === -1) {
                    results.observers.push(observerData);
                  } else if (observerDuplicate > -1) {
                    if (results.observers[observerDuplicate].observing.indexOf(user.name) === -1) {
                      results.observers[observerDuplicate].observing += ', ' + user.name;
                    }
                  }
                }
              });
            });

            msgobs.common.getObservers.complete(results);
          }
        }

      },
      complete: function (results) {
        // maybe return the whole object, eh?
        results.callback([results.observers, results.users.simplified, results.matchFlag]);
      }
    },

    // old lookup methods below. Still used in gradebook lookups.
    getEnrolments: function (ids, mode, callback) {
          // Returns an object populated with enrolment items from a given list of
          // course, user or section IDs.
          // ids: list of ids for relevant mode, mode = url string e.g 'courses'

      function CollatedEnrolments () {
        this.total = ids.length;
        this.count = 0;
        this.enrolments = [];
      }

      var enrolments = new CollatedEnrolments();

          // handle the enrolment result from each API call (one for each section);
      var handle = function (data) {
            // add each result to enrolments result object
        enrolments.enrolments.push(data);
        enrolments.count++;
        if (enrolments.count >= enrolments.total) {
              // oncomplete, merge results and call callback function.
          var allEnrolments = [];
          enrolments.enrolments.forEach(function (v) {
            allEnrolments = allEnrolments.concat(v);
          });
          callback(allEnrolments);
        }
      };

      ids.forEach(function (id) {
            // for each id, get enrolments with the handle function
        msgobs.xhr.get('/api/v1/' + mode + '/' + id + '/enrollments?per_page=100000', handle);
      });
    },

    getCourseEnrolments: function (courseId, callback) {
      msgobs.xhr.get('/api/v1/courses/' + courseId + '/enrollments?per_page=100000', callback);
    },

    getCourseSections: function (courseId, callback) {
      var handle = function (data) {
        var sections = [];
        data.forEach(function (v) {
          if (sections.indexOf(v.id) === -1) {
            sections.push(v.id);
          }
        });
        callback(sections);
      };
      msgobs.xhr.get('/api/v1/courses/' + courseId + '/sections?per_page=100000', handle);
    },

    getMatchedObservers: function (ids, enrolments) {
      // returns associated_users given an array of ids (of students)
      var observerIds = [];
      var inserted = [];
      enrolments.forEach(function (enrolment) {
        // act on observers with associated_user_id specified
        if (enrolment.type === 'ObserverEnrollment' && enrolment.associated_user_id !== null) {
          ids.forEach(function (v) { // compare with given id list
            if (enrolment.associated_user_id == v.id) {
              var observerData = {
                id: enrolment.user_id,
                name: enrolment.user.name,
                observing: v.name
              };
              // omit duplicate entries, add additional observees to existing entry.
              var duplicate = inserted.indexOf(observerData.id);
              if (duplicate === -1) {
                observerIds.push(observerData);
                inserted.push(observerData.id);
              } else {
                if (observerIds[duplicate].observing.indexOf(v.name) === -1) {
                  observerIds[duplicate].observing += ', ' + v.name;
                }
              }
            }
          });
        }
      });

      return observerIds;
    },

    notify: function (msg, type) {
      var time = new Date();
      time = time.getMilliseconds();
      var msgSuccess = $('<li id="msgobs-notification-' + time + '" class="ic-flash-' + type + '" aria-hidden="true" style="z-index: 2; margin-top: 7px;"><div class="ic-flash__icon"><i class="icon"></i></div>' + msg + '<button type="button" class="Button Button--icon-action close_link"><i class="icon-x"></i></button></li>');
      this.els.flashMessage.append(msgSuccess);
      // remove the message after a 5 secs.
      setTimeout(function () {
        $('#msgobs-notification-' + time).fadeOut(function () {
          $(this).remove();
        });
      }, 5000);
    }
  },

  conversations: {
    runOnce: 0,
    step: 0,
    els: {
      dialog: '.compose-message-dialog',
      btnContainer: '.attachments',
      courseId: 'input[name=context_code]',
      recipientList: '.ac-token-list',
      recipientEl: '.ac-token'
    },
    init: function () {
      var ctx = this;
      // set bindings for buttons
      var messagebox = document.getElementsByTagName('body');
      msgobs.common.btnAddObs.bind('click', function () {
        msgobs.conversations.getObserversInit();
      });

      msgobs.common.btnRmvStu.bind('click', function () {
        msgobs.conversations.removeStudentsInit();
      });

      // Some elements are loaded dynamaically after the page load. Loop to test
      // whether they're there yet. Previously used a mutationobserver.

      var readyCheck = function (callback) {
        if ($(msgobs.conversations.els.dialog).length) {
          msgobs.log(msgobs.conversations.els.dialog + ' found.');
          msgobs.conversations.insertUi();
        } else {
          msgobs.log(msgobs.conversations.els.dialog + ' element not ready.');
          setTimeout(function () {
            callback(callback);
          }, 500);
        }
      };
      readyCheck(readyCheck);
    },

    insertUi: function () {
      if (window.ENV.current_user_roles.indexOf('teacher') !== -1 || window.ENV.current_user_roles.indexOf('admin') !== -1) {
        $(this.els.btnContainer, this.els.dialog).append(msgobs.common.btnAddObs, msgobs.common.btnRmvStu);
        msgobs.log('Teacher/Admin role detected. UI inserted.');
      } else {
        msgobs.log('No teacher/admin role detected.');
        msgobs.log(window.ENV.current_user_roles);
      }

      this.autoCheck();

    },

    autoCheck: function () { // check the tickbox for individual messages.
      if (msgobs.options.autoTickIndividualMsgCheckbox) {
        $('#compose-btn').on('click', function () {
          setTimeout(function () {
            if($('#bulk_message').length) {
              $('#bulk_message').prop('checked', true);
            } else {
              msgobs.conversations.autoCheck();
            }
          }, 50);
        });

      }
    },

    setMode: function () {
      this.courseID = $(this.els.courseId, this.dialog).attr('value');
      if (this.courseID.indexOf('course_') !== -1) {
        this.courseID = this.courseID.replace('course_', '');
        this.mode = 'course';
      } else {
        this.mode = 'user';
      }
      msgobs.log('Mode: ' + this.mode);
      msgobs.log('Course_ID: ' + this.CourseID);
    },

    getObserversInit: function () {
      msgobs.log('Getting Observers Init..');
      this.step = 0;
      this.mode = '';

      var recipients = this.getRecipientIds();
      if (!recipients.length) {
        msgobs.common.notify(msgobs.common.txt.noRecipients, 'warning');
      } else {
        this.setMode(); // set whether a course context has been selected
        this.getObservers(); // start!
      }
    },

    getObservers: function (data) {
      this.step++;
      msgobs.log('-----------------');
      msgobs.log('GetObservers Mode: [' + this.mode + '] Step: ' + this.step);

      var callback = function getObservers (data) {
        msgobs.log('Returning to original Caller..');
        msgobs.conversations.getObservers(data);
      };

      var recipients = [];
      this.getRecipientIds().forEach(function (v) {
        recipients.push(v.id);
      });

      switch (this.step) {
        case 1:
          var context;
          if (this.mode === 'user') {
            context = 'none';
            msgobs.common.notify(msgobs.common.txt.noContext, 'success');
          } else {
            context = this.courseID;
          }

          var hasGroups = 0;
          recipients.forEach(function (v) {
            if (v.indexOf('course') !== -1 || v.indexOf('group') !== -1 || v.indexOf('section') !== -1) {
              hasGroups = 1;
            }
          });

          if (hasGroups) {
            msgobs.common.notify(msgobs.common.txt.groupExpansion, 'success');
          }

          msgobs.common.btnAddObs.addClass('disabled').text(msgobs.options.busyText);
          msgobs.common.btnRmvStu.addClass('disabled');
          msgobs.common.getObservers.init(recipients, context, callback);

          break;
        case 2:
          var observers = data[0];
          var users = data[1];
          var matchFlag = data[2];
          msgobs.log(observers);
          // complete!
          if (observers.length || users.length) {
            msgobs.conversations.clear(observers.concat(users));
            users.forEach(function (v) {
              msgobs.conversations.insert(v, false);
            });
            observers.forEach(function (v) {
              msgobs.conversations.insert(v, true);
            });

            if (users.length && !observers.length && matchFlag) {
              msgobs.common.notify(msgobs.common.txt.noNewObservers, 'success');
            }

            if (users.length && !observers.length && !matchFlag) {
              msgobs.common.notify(msgobs.common.txt.addObsNone, 'warning');
              msgobs.log('No observers found');
            }

            if (observers.length) {
              msgobs.common.notify(msgobs.common.txt.addObsSuccess, 'success');
            }
            msgobs.log('Inserted results.');
          } else {
            msgobs.common.notify(msgobs.common.txt.addObsNone, 'warning');
            msgobs.log('No observers found');
          }
          msgobs.common.btnRmvStu.removeClass('disabled');
          msgobs.common.btnAddObs.removeClass('disabled').text(msgobs.options.observersText);
          break;
      }
    },

    getRecipientIds: function () {
      // return recipients from list element
      var recipients = [];
      $(this.els.recipientEl, this.els.dialog).each(function (index, obj) {
        recipients.push({
          id: $('input', obj).attr('value'),
          name: $(obj).text()
        });
      });
      return recipients;
    },

    clear: function (arr) {
      $(this.els.recipientList, this.els.dialog).empty();
    },

    insert: function (user, observer) {
      // add a list item, might need to update these classes occasionally.
      if (observer) {
        var obj = $('<li class="ac-token" title="Linked to: ' + user.observing + '" data-type="observer" style="background-color:' + msgobs.options.colour + '; border-color: rgba(0,0,0,0.10);">' + user.name + '<a href="#" class="ac-token-remove-btn"><i class="icon-x icon-messageRecipient--cancel"></i><span class="screenreader-only">Remove recipient ' + user.name + '</span></a><input name="recipients[]" value="' + user.id + '" type="hidden"></li>');
      } else {
        var obj = $('<li class="ac-token" data-type="user" style="border-color: rgba(0,0,0,0.10);">' + user.name + '<a href="#" class="ac-token-remove-btn"><i class="icon-x icon-messageRecipient--cancel"></i><span class="screenreader-only">Remove recipient ' + user.name + '</span></a><input name="recipients[]" value="' + user.id + '" type="hidden"></li>');
      }
      $(this.els.recipientList, this.els.dialog).append(obj);
    },

    removeStudentsInit: function () {
      // remove students. Unfortunately also needs an api lookup since user roles
      // don't appear to be associated with list items.
      msgobs.log('Removing Students');
      this.removeStep = 0;
      this.setMode();
      this.removeStudents();
    },

    removeStudents: function (data) {
      var ctx = this;
      this.removeStep++;
      msgobs.log('------------------------');
      msgobs.log('Remove Students Mode: [' + this.mode + '] Step: ' + this.removeStep);

      var callback = function (result) {
        msgobs.conversations.removeStudents(result);
      };

      var recipients,
        removal;

      switch (this.mode) {
        case 'user':
          switch (this.removeStep) {
            case 1:
              msgobs.common.notify(msgobs.common.txt.noContextRmv, 'success');
              // look up user enrolments.
              if (this.getRecipientIds().length) {
                msgobs.common.btnAddObs.addClass('disabled');
                msgobs.common.btnRmvStu.addClass('disabled').text(msgobs.options.busyText);
                recipients = this.getRecipientIds();
                var ids = [];
                recipients.forEach(function (v) {
                  ids.push(v.id);
                });
                msgobs.log('Getting Enrolments for users.');
                msgobs.common.getEnrolments(ids, 'users', callback);
              } else {
                msgobs.common.notify(msgobs.common.txt.noStudentsRmv, 'warning');
              }
              break;
            case 2:
              // process for enrolment type.
              msgobs.log('User Enrolments:');
              msgobs.log(data);
              recipients = this.getRecipientIds();
              msgobs.log('Recipient IDs:');
              msgobs.log(recipients);

              // Where users have a students enrolmentType, queue for removal
              removal = [];
              recipients.forEach(function (v) {
                var enrolmentType = ctx.getEnrolmentStatus(v.id, data);
                if (enrolmentType.indexOf('StudentEnrollment') !== -1) {
                  removal.push(v.id);
                }
              });
              // remove matched StudentEnrollment ids.
              msgobs.log('Matched StudentEnrollment removal IDs:');
              msgobs.log(removal);
              this.removeById(removal);
              msgobs.common.btnRmvStu.removeClass('disabled').text(msgobs.options.removeText);
              msgobs.common.btnAddObs.removeClass('disabled');
              break;
          }
          break;
        case 'course':
          switch (this.removeStep) {
            case 1:
              // lookup course enrolments.
              if (this.getRecipientIds().length) {
                msgobs.common.btnRmvStu.addClass('disabled').text(msgobs.options.busyText);
                msgobs.common.btnAddObs.addClass('disabled');
                msgobs.log('Getting Enrolments for users.');
                msgobs.common.getEnrolments([this.courseID], 'courses', callback);
              } else {
                msgobs.common.notify(msgobs.common.txt.noStudentsRmv, 'warning');
              }
              // now that I look at this, I think it's missing sections. Probably should fix that soon.
              break;
            case 2:
              msgobs.log('Course Enrolments: ');
              msgobs.log(data);
              this.courseEnrolments = data;
              msgobs.log('Getting course sections:');
              msgobs.common.getCourseSections(this.courseID, callback);
              break;
            case 3:
              msgobs.log('Course Sections: ');
              msgobs.log(data);
              msgobs.common.getEnrolments(data, 'sections', callback);
              break;
            case 4:
              enrolments = this.courseEnrolments.concat(data);

              msgobs.log('All Enrolments: ');
              msgobs.log(data);
              recipients = this.getRecipientIds();
              removal = [];
              recipients.forEach(function (v) {
                var enrolmentType = ctx.getEnrolmentStatus(v.id, enrolments);
                if (enrolmentType.indexOf('StudentEnrollment') !== -1) {
                  removal.push(v.id);
                }
              });
              msgobs.log('Matched StudentEnrollment removal IDs:');
              msgobs.log(removal);
              this.removeById(removal);
              msgobs.common.btnRmvStu.removeClass('disabled').text(msgobs.options.removeText);
              msgobs.common.btnAddObs.removeClass('disabled');
              break;
          }
          break;
      }
    },

    removeById: function (removal) {
      // remove ids from list element given an array of ids.
      var removed = false;
      $(this.els.recipientEl, this.els.dialog).each(function (index, obj) {
        var id = $('input', obj).attr('value');
        if (removal.indexOf(id) !== -1) {
          $(this).remove();
          removed = true;
        }
      });

      if (removed) {
        msgobs.common.notify(msgobs.common.txt.removedStudents, 'success');
      } else {
        msgobs.common.notify(msgobs.common.txt.noStudentsRmv, 'warning');
      }
    },

    getEnrolmentStatus: function (user, enrolments) {
      var type = [];
      enrolments.forEach(function (v) {
        if (v.user_id == user) {
          type.push(v.type);
        }
      });
      return type;
    }
  },

  gradebook: {
    messageSent: false,
    step: 0,
    runOnce: 0,
    els: {
      gradetable: document.getElementById('gradebook-grid-wrapper'), // container for grades, monitored for mutations
      dialog: '#message_students_dialog', // container for message box
      bodyClassCoursePrefix: 'context-course_', // prefix for course context code found in body class
      btnContainer: $('.button-container', '#message_students_dialog'), // msgbox button container
      inputMessageTypes: $('.message_types', '#message_students_dialog'), // student criteria dropdown
      inputScoreCutoff: $('.cutoff_holder', '#message_students_dialog'), // when score criteria is selected, input for no. val appears
      inputFormFields: $('.cutoff_holder, #subject, #body', '#message_students_dialog'), // all form fields (for validation)
      inputSubject: $('#subject'), // msg subject field
      inputBody: $('#body'), // msg body field
      btnCanvasSend: $('.button-container .send_button', '#message_students_dialog'), // default canvas send button
      btnMsgobsSend: $('<div type="submit" class="Button Button--primary send_button disabled msgobs_sender" aria-disabled="true">Send Message</div>'), // replacement button with alternate send action
      btnCanvasClose: '.ui-dialog-titlebar-close', // close button for msgbox
      studentList: $('.student_list', '#message_students_dialog'),
      studentClass: '.student' // class for student list items.
    },

    init: function () {
      msgobs.common.btnAddObs.bind('click', function () {
        msgobs.gradebook.getObserversInit();
      }).css('float', 'left');
      msgobs.common.btnRmvStu.bind('click', function () {
        msgobs.gradebook.removeStudents();
      }).css('float', 'left');

      var courseId = $('body').attr('class');
      courseId = courseId.slice(courseId.indexOf(this.els.bodyClassCoursePrefix) + this.els.bodyClassCoursePrefix.length);
      courseId = courseId.slice(0, courseId.indexOf(' '));
      this.courseId = courseId;

      msgobs.log('Course ID: ' + this.courseId);

      // check to see if element is ready for modification.
      var readyCheck = function (callback) {
        if ($(msgobs.gradebook.els.dialog).length) {
          msgobs.log(msgobs.gradebook.els.dialog + ' found.');
          msgobs.gradebook.els.dialog = $(msgobs.gradebook.els.dialog);
          msgobs.gradebook.insertUi();
        } else {
          msgobs.log(msgobs.gradebook.els.dialog + ' element not ready.');
          setTimeout(function () {
            callback(callback);
          }, 500);
        }
      };

      readyCheck(readyCheck);
    },

    insertUi: function () {
      if (msgobs.gradebook.runOnce === 0) {
        msgobs.gradebook.runOnce = 1;

        // Action setup
        msgobs.gradebook.els.btnContainer.prepend(msgobs.common.btnAddObs, msgobs.common.btnRmvStu);

        msgobs.gradebook.els.inputMessageTypes.change(function () {
          msgobs.gradebook.removeObservers();
        });

        msgobs.gradebook.els.inputScoreCutoff.bind('keyup', function () {
          msgobs.gradebook.removeObservers();
        });

        msgobs.gradebook.els.inputFormFields.bind('keyup', function () {
          msgobs.gradebook.validate();
        });

        msgobs.gradebook.els.btnMsgobsSend.bind('click', function () {
          msgobs.gradebook.submit();
        });
        msgobs.log('UI Inserted.');
      }
    },

    getObserversInit: function () {
      msgobs.log('--------------------');
      msgobs.log('Getting Observers...');
      this.step = 0;
      this.getObservers();
    },

    getObservers: function (data) {
      this.step++;
      msgobs.log('--------------------');
      msgobs.log('Gradebook Step: ' + msgobs.gradebook.step);

      var callback = function (result) {
        msgobs.gradebook.getObservers(result);
      };

      switch (this.step) {
        case 1:
          this.removeObservers(); // cleanup previously inserted observers

          // swap buttons to prevent Canvas actions on send click.
          msgobs.gradebook.els.btnCanvasSend.remove();
          msgobs.gradebook.els.btnContainer.append(msgobs.gradebook.els.btnMsgobsSend);
          msgobs.common.btnAddObs.addClass('disabled').text(msgobs.options.busyText);
          msgobs.common.btnRmvStu.addClass('disabled');
          if (!this.getStudentList().length) { //  no studetns
            msgobs.common.notify(msgobs.common.txt.noStudents, 'warning');
            msgobs.common.btnAddObs.removeClass('disabled').text(msgobs.options.observersText);
          } else {
            // Get course enrolments.
            msgobs.log('Course: ' + this.courseId);
            msgobs.common.getEnrolments([this.courseId], 'courses', callback);
          }
          break;
        case 2:
          // store result of enrolments, get sections of present course.
          msgobs.log('Course Enrolments: ');
          msgobs.log(data);
          this.courseEnrolments = data;
          msgobs.common.getCourseSections(this.courseId, callback);
          break;
        case 3:
          // lookup enrolments of sections found in previous step
          msgobs.log('Course Sections: ');
          msgobs.log(data);
          msgobs.common.getEnrolments(data, 'sections', callback);
          break;
        case 4:
          // finalise the process
          msgobs.log('Course Section Enrolments: ');
          msgobs.log(data);
          // concanentate earlier course enrolments with section enrolments.
          var courseEnrolments = this.courseEnrolments.concat(data);
          msgobs.log('All Course Enrolments: ');
          msgobs.log(courseEnrolments);
          // match student names to ids. Vulnerable to identical names.
          var studentIds = this.getStudentIds(this.getStudentList(), courseEnrolments);
          msgobs.log('Student IDs: ');
          msgobs.log(studentIds);
          // Match user's observing ids to student ids
          var observerIds = msgobs.common.getMatchedObservers(studentIds, courseEnrolments);
          msgobs.log('Matched observers: ');
          msgobs.log(observerIds);
          // insert the tokens to the ui, complete process with feedback.
          this.insert(observerIds);
          msgobs.common.btnAddObs.removeClass('disabled').text(msgobs.options.observersText);
          msgobs.common.btnRmvStu.removeClass('disabled');
          msgobs.common.notify(msgobs.common.txt.addObsSuccess, 'success');
          break;
      }
    },

    getStudentList: function () {
      // return list of student names from recipient list element.
      var namelist = [];
      var students = $(msgobs.gradebook.els.studentClass, msgobs.gradebook.els.studentList);
      students.each(function () {
        if ($(this).attr('style').indexOf('list-item') >= 0) {
          namelist.push({
            name: $('.name', $(this)).text(),
            obj: this
          });
        }
      });
      return namelist;
    },

    getStudentIds: function (studentNames, enrolments) {
      // returns student ids from students names matched with ids found in enrolment data
      var ids = [];
      studentNames.forEach(function (studentName) {
        enrolments.forEach(function (enrolment, i) {
          if (enrolment.user.name == studentName.name) {
            ids.push({
              id: enrolment.user.id,
              name: studentName.name
            });
            $(studentName.obj).attr('data-id', enrolment.user.id);
          }
        });
      });
      return ids;
    },

    insert: function (list) {
      // insert elements into ui.
      list.forEach(function (v) {
        var item = $('<li class="parent" data-id="' + v.id + '" title="Observing: ' + v.observing + '" style="display: list-item; background-color: ' + msgobs.options.colour + '; border-color: rgba(0,0,0,0.10);"><span class="name">' + v.name + '</span><div class="remove-button Button Button--icon-action" title="Remove ' + v.name + ' from recipients" aria-disabled="false"><i class="icon-x"></i></div></li>');
        $('.remove-button', item).click(function () {
          $(this).parent().remove();
        });
        msgobs.gradebook.els.studentList.append(item);
      });

      this.validate();
    },

    validate: function () {
      // check message readiness and update button state.
      var subject = msgobs.gradebook.els.inputSubject.val();
      var body = msgobs.gradebook.els.inputBody.val();
      var recipients = 0;
      $('li', msgobs.gradebook.els.studentList).each(function () {
        if ($(this).attr('style').indexOf('list-item') !== -1) {
          recipients++;
        }
      });

      if (subject.length > 0 && body.length > 0 && recipients > 0 && this.messageSent === false) {
        msgobs.gradebook.els.btnMsgobsSend.removeClass('disabled');
      } else {
        msgobs.gradebook.els.btnMsgobsSend.addClass('disabled');
      }
    },

    getRecipients: function () {
      // return list of recipient items from student list element.
      var recipients = [];
      $('li', msgobs.gradebook.els.studentList).each(function () {
        el = $(this);
        // if the item is displayed, it should be part of the message recipients.
        if (el.attr('style').indexOf('list-item') !== -1) {
          recipients.push(el.attr('data-id'));
        }
      });
      return recipients;
    },

    submit: function () {
      msgobs.log('Sending Message...');
      // send the message
      if (this.messageSent === true) {
        return false;
      }

      // Build mega data string. Couldn't get sending JSON object to work :(
      var data = 'utf8=%E2%9C%93'; // odd tick character
      data += '&authenticity_token=' + msgobs.common.getCsrfToken();
      data += '&recipients=' + encodeURIComponent(this.getRecipients().toString(','));
      data += '&group_conversation=true';
      data += '&bulk_message=true';
      data += '&context_code=course_' + this.courseId;
      data += '&mode=async';
      data += '&subject=' + encodeURIComponent(msgobs.gradebook.els.inputSubject.val());
      data += '&body=' + encodeURIComponent(msgobs.gradebook.els.inputBody.val());
      data += '&_method=post';

      msgobs.log('Data: ' + data);

      // oncomplete function
      var callback = function (res, status) {
        msgobs.gradebook.cleanup(true);
        msgobs.gradebook.messageSent = false;
        $(msgobs.gradebook.els.btnCanvasClose).click();
        msgobs.log('XHR Status ' + status);
        if (status == '202' || status == '200') {
          msgobs.common.notify('Message sent!', 'success');
        } else {
          msgobs.common.notify('An error occured. Your message was not sent.', 'error');
          alert('An error occured and your message was not sent. Please copy your message below to prevent losing your beautifully crafted dialog!\n\n' + msgobs.gradebook.els.inputBody.val());
        }
      };

      msgobs.xhr.post('/api/v1/conversations', data, callback);
      this.messageSent = true;
      this.validate();
    },

    cleanup: function (silent) {
      msgobs.log('Cleaning up: ');
      this.removeStudents(silent);
      this.removeObservers();
    },

    removeObservers: function () {
      $('.parent', this.els.studentList).remove();
      // put the normal button back because we're not messaging parents anymore.
      msgobs.gradebook.els.btnMsgobsSend.detach();
      msgobs.gradebook.els.btnContainer.append(msgobs.gradebook.els.btnCanvasSend);
      msgobs.log('Observers removed');
    },

    removeStudents: function (silent) {
      msgobs.log('Students removed');
      var failed = 1;
      $('.student', msgobs.gradebook.els.dialog).each(function () {
        if ($(this).attr('style').indexOf('display: list-item') >= 0) {
          failed = 0;
        }
      });
      if (failed === 1) {
        if (!silent) {
          msgobs.common.notify(msgobs.common.txt.noStudentsRmv, 'warning');
        }
      } else {
        $('.student', msgobs.gradebook.els.dialog).attr('style', 'display: none;');
        if (!silent) {
          msgobs.common.notify(msgobs.common.txt.removedStudents, 'success');
        }
      }
    }
  },

  xhr: {
    // xhr stuff. pretty generic
    get: function (url, callback, ref) {
      var req = new XMLHttpRequest();
      var handle = function () {
        var res = this.responseText;
        res = JSON.parse(res.replace('while(1);', ''));
        msgobs.log('XHR: Url: ' + url);
        msgobs.log('XHR: Response: ');
        msgobs.log(res);
        callback(res, this.status, ref);
      };

      req.onload = handle;
      req.open('GET', url);
      req.send();
    },

    post: function (url, data, callback) {
      var req = new XMLHttpRequest();

      var handle = function () {
        var res = this.responseText;
        var status = this.status;
        res = JSON.parse(res.replace('while(1);', ''));
        callback(res, status);
      };

      req.onload = handle;
      req.open('POST', url, true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.send(data);
    }
  },

  logItems: [],
  log: function (msg, warn, err) {
    var date = new Date();

    function zero (str) {
      return str.toString().length < 2 ?
        '0' + str :
        str;
    } // derp. no idea how to use dates.

    stamp = '[' + zero(date.getHours()) + ':' + zero(date.getMinutes()) + ':' + zero(date.getSeconds()) + '] ';
    if (msgobs.options.log) {
      console.log(stamp + JSON.stringify(msg));
    }
    this.logItems.push(stamp + JSON.stringify(msg));
  },
  applog: function () {
    console.dir(logitems);
  }
};

$(document).ready(function () {
  msgobs.init();
});
