/*! For license information please see 23.adaba7f1.iframe.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1928:function(module,exports,__webpack_require__){module.exports=function(){"use strict";var _shared={pullStartY:null,pullMoveY:null,handlers:[],styleEl:null,events:null,dist:0,state:"pending",timeout:null,distResisted:0,supportsPassive:!1,supportsPointerEvents:"undefined"!=typeof window&&!!window.PointerEvent};try{window.addEventListener("test",null,{get passive(){_shared.supportsPassive=!0}})}catch(e){}function setupDOM(handler){if(!handler.ptrElement){var ptr=document.createElement("div");handler.mainElement!==document.body?handler.mainElement.parentNode.insertBefore(ptr,handler.mainElement):document.body.insertBefore(ptr,document.body.firstChild),ptr.classList.add(handler.classPrefix+"ptr"),ptr.innerHTML=handler.getMarkup().replace(/__PREFIX__/g,handler.classPrefix),handler.ptrElement=ptr,"function"==typeof handler.onInit&&handler.onInit(handler),_shared.styleEl||(_shared.styleEl=document.createElement("style"),_shared.styleEl.setAttribute("id","pull-to-refresh-js-style"),document.head.appendChild(_shared.styleEl)),_shared.styleEl.textContent=handler.getStyles().replace(/__PREFIX__/g,handler.classPrefix).replace(/\s+/g," ")}return handler}function onReset(handler){handler.ptrElement&&(handler.ptrElement.classList.remove(handler.classPrefix+"refresh"),handler.ptrElement.style[handler.cssProp]="0px",setTimeout((function(){handler.ptrElement&&handler.ptrElement.parentNode&&(handler.ptrElement.parentNode.removeChild(handler.ptrElement),handler.ptrElement=null),_shared.state="pending"}),handler.refreshTimeout))}function update(handler){var iconEl=handler.ptrElement.querySelector("."+handler.classPrefix+"icon"),textEl=handler.ptrElement.querySelector("."+handler.classPrefix+"text");iconEl&&("refreshing"===_shared.state?iconEl.innerHTML=handler.iconRefreshing:iconEl.innerHTML=handler.iconArrow),textEl&&("releasing"===_shared.state&&(textEl.innerHTML=handler.instructionsReleaseToRefresh),"pulling"!==_shared.state&&"pending"!==_shared.state||(textEl.innerHTML=handler.instructionsPullToRefresh),"refreshing"===_shared.state&&(textEl.innerHTML=handler.instructionsRefreshing))}var _timeout,_ptr={setupDOM:setupDOM,onReset:onReset,update:update},screenY=function screenY(event){return _shared.pointerEventsEnabled&&_shared.supportsPointerEvents?event.screenY:event.touches[0].screenY},_setupEvents=function(){var _el;function _onTouchStart(e){var target=_shared.handlers.filter((function(h){return h.contains(e.target)}))[0];_shared.enable=!!target,target&&"pending"===_shared.state&&(_el=_ptr.setupDOM(target),target.shouldPullToRefresh()&&(_shared.pullStartY=screenY(e)),clearTimeout(_shared.timeout),_ptr.update(target))}function _onTouchMove(e){_el&&_el.ptrElement&&_shared.enable&&(_shared.pullStartY?_shared.pullMoveY=screenY(e):_el.shouldPullToRefresh()&&(_shared.pullStartY=screenY(e)),"refreshing"!==_shared.state?("pending"===_shared.state&&(_el.ptrElement.classList.add(_el.classPrefix+"pull"),_shared.state="pulling",_ptr.update(_el)),_shared.pullStartY&&_shared.pullMoveY&&(_shared.dist=_shared.pullMoveY-_shared.pullStartY),_shared.distExtra=_shared.dist-_el.distIgnore,_shared.distExtra>0&&(e.cancelable&&e.preventDefault(),_el.ptrElement.style[_el.cssProp]=_shared.distResisted+"px",_shared.distResisted=_el.resistanceFunction(_shared.distExtra/_el.distThreshold)*Math.min(_el.distMax,_shared.distExtra),"pulling"===_shared.state&&_shared.distResisted>_el.distThreshold&&(_el.ptrElement.classList.add(_el.classPrefix+"release"),_shared.state="releasing",_ptr.update(_el)),"releasing"===_shared.state&&_shared.distResisted<_el.distThreshold&&(_el.ptrElement.classList.remove(_el.classPrefix+"release"),_shared.state="pulling",_ptr.update(_el)))):e.cancelable&&_el.shouldPullToRefresh()&&_shared.pullStartY<_shared.pullMoveY&&e.preventDefault())}function _onTouchEnd(){if(_el&&_el.ptrElement&&_shared.enable){if(clearTimeout(_timeout),_timeout=setTimeout((function(){_el&&_el.ptrElement&&"pending"===_shared.state&&_ptr.onReset(_el)}),500),"releasing"===_shared.state&&_shared.distResisted>_el.distThreshold)_shared.state="refreshing",_el.ptrElement.style[_el.cssProp]=_el.distReload+"px",_el.ptrElement.classList.add(_el.classPrefix+"refresh"),_shared.timeout=setTimeout((function(){var retval=_el.onRefresh((function(){return _ptr.onReset(_el)}));retval&&"function"==typeof retval.then&&retval.then((function(){return _ptr.onReset(_el)})),retval||_el.onRefresh.length||_ptr.onReset(_el)}),_el.refreshTimeout);else{if("refreshing"===_shared.state)return;_el.ptrElement.style[_el.cssProp]="0px",_shared.state="pending"}_ptr.update(_el),_el.ptrElement.classList.remove(_el.classPrefix+"release"),_el.ptrElement.classList.remove(_el.classPrefix+"pull"),_shared.pullStartY=_shared.pullMoveY=null,_shared.dist=_shared.distResisted=0}}function _onScroll(){_el&&_el.mainElement.classList.toggle(_el.classPrefix+"top",_el.shouldPullToRefresh())}var _passiveSettings=_shared.supportsPassive?{passive:_shared.passive||!1}:void 0;return _shared.pointerEventsEnabled&&_shared.supportsPointerEvents?(window.addEventListener("pointerup",_onTouchEnd),window.addEventListener("pointerdown",_onTouchStart),window.addEventListener("pointermove",_onTouchMove,_passiveSettings)):(window.addEventListener("touchend",_onTouchEnd),window.addEventListener("touchstart",_onTouchStart),window.addEventListener("touchmove",_onTouchMove,_passiveSettings)),window.addEventListener("scroll",_onScroll),{onTouchEnd:_onTouchEnd,onTouchStart:_onTouchStart,onTouchMove:_onTouchMove,onScroll:_onScroll,destroy:function destroy(){_shared.pointerEventsEnabled&&_shared.supportsPointerEvents?(window.removeEventListener("pointerdown",_onTouchStart),window.removeEventListener("pointerup",_onTouchEnd),window.removeEventListener("pointermove",_onTouchMove,_passiveSettings)):(window.removeEventListener("touchstart",_onTouchStart),window.removeEventListener("touchend",_onTouchEnd),window.removeEventListener("touchmove",_onTouchMove,_passiveSettings)),window.removeEventListener("scroll",_onScroll)}}},_ptrMarkup='\n<div class="__PREFIX__box">\n  <div class="__PREFIX__content">\n    <div class="__PREFIX__icon"></div>\n    <div class="__PREFIX__text"></div>\n  </div>\n</div>\n',_ptrStyles="\n.__PREFIX__ptr {\n  box-shadow: inset 0 -3px 5px rgba(0, 0, 0, 0.12);\n  pointer-events: none;\n  font-size: 0.85em;\n  font-weight: bold;\n  top: 0;\n  height: 0;\n  transition: height 0.3s, min-height 0.3s;\n  text-align: center;\n  width: 100%;\n  overflow: hidden;\n  display: flex;\n  align-items: flex-end;\n  align-content: stretch;\n}\n\n.__PREFIX__box {\n  padding: 10px;\n  flex-basis: 100%;\n}\n\n.__PREFIX__pull {\n  transition: none;\n}\n\n.__PREFIX__text {\n  margin-top: .33em;\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.__PREFIX__icon {\n  color: rgba(0, 0, 0, 0.3);\n  transition: transform .3s;\n}\n\n/*\nWhen at the top of the page, disable vertical overscroll so passive touch\nlisteners can take over.\n*/\n.__PREFIX__top {\n  touch-action: pan-x pan-down pinch-zoom;\n}\n\n.__PREFIX__release .__PREFIX__icon {\n  transform: rotate(180deg);\n}\n",_defaults={distThreshold:60,distMax:80,distReload:50,distIgnore:0,mainElement:"body",triggerElement:"body",ptrElement:".ptr",classPrefix:"ptr--",cssProp:"min-height",iconArrow:"&#8675;",iconRefreshing:"&hellip;",instructionsPullToRefresh:"Pull down to refresh",instructionsReleaseToRefresh:"Release to refresh",instructionsRefreshing:"Refreshing",refreshTimeout:500,getMarkup:function(){return _ptrMarkup},getStyles:function(){return _ptrStyles},onInit:function(){},onRefresh:function(){return location.reload()},resistanceFunction:function(t){return Math.min(1,t/2.5)},shouldPullToRefresh:function(){return!window.scrollY}},_methods=["mainElement","ptrElement","triggerElement"],_setupHandler=function(options){var _handler={};return Object.keys(_defaults).forEach((function(key){_handler[key]=options[key]||_defaults[key]})),_handler.refreshTimeout="number"==typeof options.refreshTimeout?options.refreshTimeout:_defaults.refreshTimeout,_methods.forEach((function(method){"string"==typeof _handler[method]&&(_handler[method]=document.querySelector(_handler[method]))})),_shared.events||(_shared.events=_setupEvents()),_handler.contains=function(target){return _handler.triggerElement.contains(target)},_handler.destroy=function(){clearTimeout(_shared.timeout);var offset=_shared.handlers.indexOf(_handler);_shared.handlers.splice(offset,1)},_handler};return{setPassiveMode:function setPassiveMode(isPassive){_shared.passive=isPassive},setPointerEventsMode:function setPointerEventsMode(isEnabled){_shared.pointerEventsEnabled=isEnabled},destroyAll:function destroyAll(){_shared.events&&(_shared.events.destroy(),_shared.events=null),_shared.handlers.forEach((function(h){h.destroy()}))},init:function init(options){void 0===options&&(options={});var handler=_setupHandler(options);return _shared.handlers.push(handler),handler},_:{setupHandler:_setupHandler,setupEvents:_setupEvents,setupDOM:_ptr.setupDOM,onReset:_ptr.onReset,update:_ptr.update}}}()}}]);
//# sourceMappingURL=23.adaba7f1.iframe.bundle.js.map