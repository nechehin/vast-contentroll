/**
 * IntersectionObserver polyfill
 * @link https://github.com/w3c/IntersectionObserver/tree/gh-pages/polyfill
 *
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(h,g){function m(a){this.time=a.time;this.target=a.target;this.rootBounds=a.rootBounds;this.boundingClientRect=a.boundingClientRect;this.intersectionRect=a.intersectionRect||l();this.isIntersecting=!!a.intersectionRect;a=this.boundingClientRect;a=a.width*a.height;var b=this.intersectionRect;b=b.width*b.height;this.intersectionRatio=a?b/a:this.isIntersecting?1:0}function d(a,b){var c=b||{};if("function"!=typeof a)throw Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw Error("root must be an Element");
    this._checkForIntersections=u(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT);this._callback=a;this._observationTargets=[];this._queuedEntries=[];this._rootMarginValues=this._parseRootMargin(c.rootMargin);this.thresholds=this._initThresholds(c.threshold);this.root=c.root||null;this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function u(a,b){var c=null;return function(){c||(c=setTimeout(function(){a();c=null},b))}}function n(a,b,c,e){"function"==
typeof a.addEventListener?a.addEventListener(b,c,e||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function r(a,b,c,e){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,e||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function p(a){try{var b=a.getBoundingClientRect()}catch(c){}if(!b)return l();b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top});return b}function l(){return{top:0,bottom:0,
    left:0,right:0,width:0,height:0}}function t(a,b){for(var c=b;c;){if(c==a)return!0;c=q(c)}return!1}function q(a){return(a=a.parentNode)&&11==a.nodeType&&a.host?a.host:a}if("IntersectionObserver"in h&&"IntersectionObserverEntry"in h&&"intersectionRatio"in h.IntersectionObserverEntry.prototype)"isIntersecting"in h.IntersectionObserverEntry.prototype||Object.defineProperty(h.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}});else{var k=[];d.prototype.THROTTLE_TIMEOUT=
    100;d.prototype.POLL_INTERVAL=null;d.prototype.observe=function(a){if(!this._observationTargets.some(function(b){return b.element==a})){if(!a||1!=a.nodeType)throw Error("target must be an Element");this._registerInstance();this._observationTargets.push({element:a,entry:null});this._monitorIntersections();this._checkForIntersections()}};d.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a});this._observationTargets.length||(this._unmonitorIntersections(),
    this._unregisterInstance())};d.prototype.disconnect=function(){this._observationTargets=[];this._unmonitorIntersections();this._unregisterInstance()};d.prototype.takeRecords=function(){var a=this._queuedEntries.slice();this._queuedEntries=[];return a};d.prototype._initThresholds=function(a){a=a||[0];Array.isArray(a)||(a=[a]);return a.sort().filter(function(a,c,e){if("number"!=typeof a||isNaN(a)||0>a||1<a)throw Error("threshold must be a number between 0 and 1 inclusively");return a!==e[c-1]})};d.prototype._parseRootMargin=
    function(a){a=(a||"0px").split(/\s+/).map(function(a){a=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!a)throw Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(a[1]),unit:a[2]}});a[1]=a[1]||a[0];a[2]=a[2]||a[0];a[3]=a[3]||a[1];return a};d.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(n(h,"resize",this._checkForIntersections,
    !0),n(g,"scroll",this._checkForIntersections,!0),"MutationObserver"in h&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(g,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))};d.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,r(h,"resize",this._checkForIntersections,!0),r(g,"scroll",this._checkForIntersections,!0),
this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))};d.prototype._checkForIntersections=function(){var a=this._rootIsInDom(),b=a?this._getRootRect():l();this._observationTargets.forEach(function(c){var e=c.element,d=p(e),f=this._rootContainsTarget(e),g=c.entry,k=a&&f&&this._computeTargetAndRootIntersection(e,b);c=c.entry=new m({time:h.performance&&performance.now&&performance.now(),target:e,boundingClientRect:d,rootBounds:b,intersectionRect:k});g?a&&f?this._hasCrossedThreshold(g,
    c)&&this._queuedEntries.push(c):g&&g.isIntersecting&&this._queuedEntries.push(c):this._queuedEntries.push(c)},this);this._queuedEntries.length&&this._callback(this.takeRecords(),this)};d.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=h.getComputedStyle(a).display){for(var c=p(a),e=q(a),d=!1;!d;){var f=null,k=1==e.nodeType?h.getComputedStyle(e):{};if("none"==k.display)return;e==this.root||e==g?(d=!0,f=b):e!=g.body&&e!=g.documentElement&&"visible"!=k.overflow&&(f=p(e));if(f){k=
    Math.max(f.top,c.top);var l=Math.min(f.bottom,c.bottom),m=Math.max(f.left,c.left);c=Math.min(f.right,c.right);f=c-m;var n=l-k;c=0<=f&&0<=n&&{top:k,bottom:l,left:m,right:c,width:f,height:n};if(!c)break}e=q(e)}return c}};d.prototype._getRootRect=function(){if(this.root)var a=p(this.root);else{a=g.documentElement;var b=g.body;a={top:0,left:0,right:a.clientWidth||b.clientWidth,width:a.clientWidth||b.clientWidth,bottom:a.clientHeight||b.clientHeight,height:a.clientHeight||b.clientHeight}}return this._expandRectByRootMargin(a)};
    d.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,e){return"px"==b.unit?b.value:b.value*(e%2?a.width:a.height)/100});b={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};b.width=b.right-b.left;b.height=b.bottom-b.top;return b};d.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,e=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==e)for(var d=0;d<this.thresholds.length;d++){var f=this.thresholds[d];
        if(f==c||f==e||f<c!==f<e)return!0}};d.prototype._rootIsInDom=function(){return!this.root||t(g,this.root)};d.prototype._rootContainsTarget=function(a){return t(this.root||g,a)};d.prototype._registerInstance=function(){0>k.indexOf(this)&&k.push(this)};d.prototype._unregisterInstance=function(){var a=k.indexOf(this);-1!=a&&k.splice(a,1)};h.IntersectionObserver=d;h.IntersectionObserverEntry=m}})(window,document);



/*!
 * VAST content-roll
 *
 * @version 0.0.11
 * @link https://github.com/nechehin/vast-contentroll
 */
(function(){
    'use strict';

    var initVastContentRoll = function(){

        var ELEMENTS_CLASS = 'vast-contentroll';

        var FLAG = {
            INIT: 'init',
            LOADING: 'loading',
            LOADED: 'loaded',
            STARTED: 'started',
            CONTROLLS: 'controlls',
            DEBUG: 'debug',
            COLLAPSE: 'collapse',
            COMPANION: 'companion',
            RESPONSIVE: 'responsive'
        };

        var rolls = document.getElementsByClassName(ELEMENTS_CLASS);

        var intersectionObserver = new IntersectionObserver(function(entries) {
            [].forEach.call(entries, function(entry){
                if (typeof entry.isIntersecting !== 'undefined' && entry.isIntersecting === false) {
                    pauseAd(entry.target);
                } else {
                    startAd(entry.target);
                }
            });
        }, { threshold: 0 });


        /**
         * Get or set element data attribute
         *
         * @param {HTMLElement} e
         * @param {String} k
         * @param {String} v
         * @returns {String}
         */
        function data(e, k, v) {
            var attr = 'data-' + k;
            if (typeof v !== 'undefined') {
                return e.setAttribute(attr, v);
            } else {
                return e.getAttribute(attr);
            }
        }


        /**
         * Get or set element data attribute as boolean
         *
         * @param {HTMLElement} e
         * @param {String} k
         * @param {String} v
         * @returns {String}
         */
        function flag(e, k, v) {
            if (typeof v !== 'undefined') {
                return data(e, k, (v ? '1' : '0'));
            } else {
                return !!~['1', 'true'].indexOf(data(e, k)) ? true : false;
            }
        }


        /**
         * Log in console if debug enabled
         *
         * @param {HTMLElement} roll
         * @param {String} message
         */
        function log(roll, message, context) {
            if (flag(roll, FLAG.DEBUG)) {
                context = context || '';
                console.log('vast-contentroll:', message, context);
            }
        }


        /**
         * Get Mute button text
         *
         * @param {HTMLElement} roll
         * @return string
         */
        function muteText(roll) {
            return data(roll, 'mute-text') || 'Mute';
        }


        /**
         * Get Mute button text
         *
         * @param {HTMLElement} roll
         * @return string
         */
        function unmuteText(roll) {
            return data(roll, 'unmute-text') || 'Unmute';
        }


        /**
         * Create player controlls
         *
         * @param {HTMLElement} roll
         */
        function createControlls(roll) {

            if (flag(roll, FLAG.CONTROLLS)) {
                return;
            }

            flag(roll, FLAG.CONTROLLS, 1);

            roll.muteButton = document.createElement('a');
            roll.muteButton.className = ELEMENTS_CLASS + '--btn-mute';
            roll.muteButton.textContent = roll.adsManager.getVolume() === 0 ? unmuteText(roll) : muteText(roll);

            /* Mute button styles */
            roll.muteButton.style.position = 'relative';
            roll.muteButton.style.padding = '8px 16px';
            roll.muteButton.style.backgroundColor = 'rgba(0,0,0,0.8)';
            roll.muteButton.style.color = '#e6e6e6';
            roll.muteButton.style.fontFamily = 'arial';
            roll.muteButton.style.fontSize = '12px';
            roll.muteButton.style.cursor = 'pointer';

            /* Mute button click handler */
            roll.muteButton.onclick = function() {
                if (roll.adsManager.getVolume() === 0) {
                    log(roll, 'unmute clicked');
                    roll.adsManager.setVolume(1);
                    this.textContent = muteText(roll);
                } else {
                    roll.adsManager.setVolume(0);
                    log(roll, 'mute clicked');
                    this.textContent = unmuteText(roll);
                }
            }

            roll.appendChild(roll.muteButton);
        }


        /**
         * On ads loaded callback
         *
         * @param {HTMLElement} roll
         */
        function onAdsLoaded(roll) {
            flag(roll, FLAG.LOADED, 1);
        }


        /**
         * On ads started callback
         *
         * @param {HTMLElement} roll
         */
        function onAdsStarted(roll, e) {
            flag(roll, FLAG.STARTED, 1);
            log(roll, 'ads started');
            createControlls(roll);

            if (flag(roll, FLAG.COMPANION)) {
                log(roll, 'get a list of companion ads');
                var ad = e.getAd();
                var selectionCriteria = new google.ima.CompanionAdSelectionSettings();
                selectionCriteria.resourceType = google.ima.CompanionAdSelectionSettings.ResourceType.STATIC;
                selectionCriteria.creativeType = google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE;
                selectionCriteria.sizeCriteria = google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE;
                roll.companionAds = ad.getCompanionAds(roll.clientWidth, roll.clientHeight, selectionCriteria);
                log(roll, 'getted companion ads count: ' + roll.companionAds.length);
            }
        }


        /**
         * On ads competed callback
         *
         * @param {HTMLElement} roll
         */
        function onAdsCompeted(roll) {

            log(roll, 'all ads competed');

            if (roll.muteButton) {
                roll.removeChild(roll.muteButton);
            }

            intersectionObserver.unobserve(roll);

            // If companionAds not empty - show it
            if (flag(roll, FLAG.COMPANION) && roll.companionAds && roll.companionAds.length) {
                roll.innerHTML = roll.companionAds[0].getContent();
                roll.style.height = 'auto';
                log(roll, 'display companion');
            } else if (flag(roll, FLAG.COLLAPSE)) {
                roll.style.height = '0';
                log(roll, 'ads collapsed');
            }

            var onCompleteCallback = data(roll, 'on-complete');
            if (typeof window[onCompleteCallback] === 'function') {
                window[onCompleteCallback]();
            }
        }


        /**
         * On ads empty callback
         *
         * @param {HTMLElement} roll
         */
        function onAdsEmpty(roll) {
            intersectionObserver.unobserve(roll);
            roll.style.height = '0';

            var onEmptyCallback = data(roll, 'on-empty');
            if (typeof window[onEmptyCallback] === 'function') {
                window[onEmptyCallback]();
            }
        }


        /**
         * Adapt roll size
         *
         * @param {HTMLElement} roll
         */
        function adaptSize(roll) {
            var width = roll.clientWidth;
            var height = roll.clientHeight;
            var newWidth = roll.parentNode.clientWidth;
            var newHeight = height * (newWidth/width);

            if (newWidth > width) {
                log(roll, 'adapt size skiped');
                return;
            }

            roll.style.position = 'relative';
            roll.style.overflow = 'hidden';
            roll.style.width = newWidth + 'px';
            roll.style.height = newHeight + 'px';
            roll.style.maxWidth = '100%';
            log(roll, 'size adapted');
        }


        /**
         * Init ads
         *
         * @param {HTMLElement} roll
         */
        function initAd(roll) {

            if (flag(roll, FLAG.INIT)) {
                return;
            }

            if (flag(roll, FLAG.RESPONSIVE)) {
                adaptSize(roll);
            }

            intersectionObserver.observe(roll);

            roll.adDisplayContainer = new google.ima.AdDisplayContainer(roll);
            roll.adDisplayContainer.initialize();

            roll.adsLoader = new google.ima.AdsLoader(roll.adDisplayContainer);
            roll.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);

            roll.adsRequest = new google.ima.AdsRequest();

            // Add event listeners
            roll.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function(adsManagerLoadedEvent) {

                var player = document.createElement('video');
                player.muted = true;
                player.autoplay = true;
                player.playsinline = true;

                roll.adsManager = adsManagerLoadedEvent.getAdsManager(player);

                roll.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, function(e) {
                    onAdsLoaded(roll, e);
                });

                roll.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, function(e) {
                    onAdsStarted(roll, e);
                });

                roll.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function(e) {
                    onAdsCompeted(roll, e);
                });

                try {
                    roll.adsManager.init(roll.clientWidth, roll.clientHeight, google.ima.ViewMode.NORMAL);
                    roll.adsManager.start();
                } catch (adError) {
                    log(roll, 'error or empty ad', adError);
                    onAdsEmpty(roll);
                }
            }, false);

            roll.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function(adErrorEvent) {
                log(roll, 'error or empty ad', adErrorEvent.getError());
                if (typeof roll.adsManager !== 'undefined') {
                    roll.adsManager.destroy();
                }
                onAdsEmpty(roll);
            }, false);

            flag(roll, FLAG.INIT, 1);
            flag(roll, FLAG.LOADED, 0);
            flag(roll, FLAG.STARTED, 0);
            log(roll, 'init');
        }


        /**
         *
         * @param {HTMLElement} roll
         */
        function startAd(roll) {
            if (flag(roll, FLAG.STARTED)) {
                roll.adsManager.resume();
                log(roll, 'resumeAd');
            }
            else if (!flag(roll, FLAG.LOADING)) {
                log(roll, 'load');
                roll.adsRequest.adTagUrl = data(roll, 'vast');
                roll.adsLoader.requestAds(roll.adsRequest);
                flag(roll, FLAG.LOADING, 1)
            }
            else {
                log(roll, 'yet loading');
            }
        }


        /**
         *
         * @param {HTMLElement} roll
         */
        function pauseAd(roll) {
            if (flag(roll, FLAG.STARTED)) {
                roll.adsManager.pause();
                log(roll, 'pauseAd');
            }
        }


        [].forEach.call(rolls, initAd);

    }

    /* Async load Google IMA SDK and run vast content-roll init */
    var imaSdk = document.createElement('script');
    imaSdk.async = true;
    imaSdk.src = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
    imaSdk.onload = initVastContentRoll;
    document.head.appendChild(imaSdk);

})();
