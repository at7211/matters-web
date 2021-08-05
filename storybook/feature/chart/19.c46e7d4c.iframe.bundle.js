(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1958:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return useDrag}));var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);function addV(v1,v2){return v1.map((function(v,i){return v+v2[i]}))}function subV(v1,v2){return v1.map((function(v,i){return v-v2[i]}))}function calculateDistance(movement){return Math.hypot.apply(Math,movement)}function calculateAllKinematics(movement,delta,dt){var dl=calculateDistance(delta),alpha=0===dl?0:1/dl,beta=0===dt?0:1/dt,velocity=beta*dl,velocities=delta.map((function(v){return beta*v})),direction=delta.map((function(v){return alpha*v}));return{velocities:velocities,velocity:velocity,distance:calculateDistance(movement),direction:direction}}function sign(x){return Math.sign?Math.sign(x):Number(x>0)-Number(x<0)||+x}function rubberband(distance,dimension,constant){return 0===dimension||Math.abs(dimension)===1/0?function rubberband2(distance,constant){return Math.pow(distance,5*constant)}(distance,constant):distance*dimension*constant/(dimension+constant*distance)}function rubberbandIfOutOfBounds(position,min,max,constant){return void 0===constant&&(constant=.15),0===constant?function minMax(value,min,max){return Math.max(min,Math.min(value,max))}(position,min,max):position<min?-rubberband(min-position,max-min,constant)+min:position>max?+rubberband(position-max,max-min,constant)+max:position}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _extends(){return(_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target}).apply(this,arguments)}function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype),subClass.prototype.constructor=subClass,subClass.__proto__=superClass}function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _createForOfIteratorHelperLoose(o,allowArrayLike){var it;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(it=function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0;return function(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(it=o[Symbol.iterator]()).next.bind(it)}function noop(){}function chainFns(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return 0===fns.length?noop:1===fns.length?fns[0]:function(){for(var result,_step,_iterator=_createForOfIteratorHelperLoose(fns);!(_step=_iterator()).done;){var fn=_step.value;result=fn.apply(this,arguments)||result}return result}}function ensureVector(value,fallback){if(void 0===value){if(void 0===fallback)throw new Error("Must define fallback value if undefined is expected");value=fallback}return Array.isArray(value)?value:[value,value]}function valueFn(v){if("function"==typeof v){for(var _len2=arguments.length,args=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++)args[_key2-1]=arguments[_key2];return v.apply(void 0,args)}return v}function resolveWith(config,resolvers){void 0===config&&(config={});for(var result={},_i=0,_Object$entries=Object.entries(resolvers);_i<_Object$entries.length;_i++){var _Object$entries$_i=_Object$entries[_i],key=_Object$entries$_i[0],resolver=_Object$entries$_i[1];switch(typeof resolver){case"function":result[key]=resolver.call(result,config[key],key,config);break;case"object":result[key]=resolveWith(config[key],resolver);break;case"boolean":resolver&&(result[key]=config[key])}}return result}function supportsTouchEvents(){return"undefined"!=typeof window&&"ontouchstart"in window}function getEventTouches(event){return"pointerId"in event?null:"touchend"===event.type?event.changedTouches:event.targetTouches}function getTouchIds(event){return Array.from(getEventTouches(event)).map((function(t){return t.identifier}))}function getGenericEventData(event){return{buttons:"buttons"in event?event.buttons:0,shiftKey:event.shiftKey,altKey:event.altKey,metaKey:event.metaKey,ctrlKey:event.ctrlKey}}var identity=function identity(xy){return xy};function getPointerEventValues(event,transform){void 0===transform&&(transform=identity);var touchEvents=getEventTouches(event),_ref=touchEvents?touchEvents[0]:event;return transform([_ref.clientX,_ref.clientY])}var InternalGestureOptionsNormalizers={threshold:function threshold(value){return void 0===value&&(value=0),ensureVector(value)},rubberband:function rubberband(value){switch(void 0===value&&(value=0),value){case!0:return ensureVector(.15);case!1:return ensureVector(0);default:return ensureVector(value)}},enabled:function enabled(value){return void 0===value&&(value=!0),value},triggerAllEvents:function triggerAllEvents(value){return void 0===value&&(value=!1),value},initial:function initial(value){return void 0===value&&(value=0),"function"==typeof value?value:ensureVector(value)},transform:!0},InternalCoordinatesOptionsNormalizers=_extends({},InternalGestureOptionsNormalizers,{axis:!0,lockDirection:function lockDirection(value){return void 0===value&&(value=!1),value},bounds:function bounds(value){if(void 0===value&&(value={}),"function"==typeof value)return function(state){return InternalCoordinatesOptionsNormalizers.bounds(value(state))};var _value2=value,_value2$left=_value2.left,left=void 0===_value2$left?-1/0:_value2$left,_value2$right=_value2.right,right=void 0===_value2$right?1/0:_value2$right,_value2$top=_value2.top,top=void 0===_value2$top?-1/0:_value2$top,_value2$bottom=_value2.bottom;return[[left,right],[top,void 0===_value2$bottom?1/0:_value2$bottom]]}}),isBrowser="undefined"!=typeof window&&window.document&&window.document.createElement,InternalGenericOptionsNormalizers={enabled:function enabled(value){return void 0===value&&(value=!0),value},domTarget:!0,window:function(_window){function window(_x){return _window.apply(this,arguments)}return window.toString=function(){return _window.toString()},window}((function(value){return void 0===value&&(value=isBrowser?window:void 0),value})),eventOptions:function eventOptions(_temp){var _ref=void 0===_temp?{}:_temp,_ref$passive=_ref.passive,passive=void 0===_ref$passive||_ref$passive,_ref$capture=_ref.capture;return{passive:passive,capture:void 0!==_ref$capture&&_ref$capture}},transform:!0},InternalDragOptionsNormalizers=_extends({},InternalCoordinatesOptionsNormalizers,{useTouch:function useTouch(value){void 0===value&&(value=!1);var supportsTouch=supportsTouchEvents(),supportsPointer=function supportsPointerEvents(){return"undefined"!=typeof window&&"onpointerdown"in window}();return!(!value||!supportsTouch)||!(!supportsTouch||supportsPointer)},experimental_preventWindowScrollY:function experimental_preventWindowScrollY(value){return void 0===value&&(value=!1),value},threshold:function threshold(v,_k,_ref3){var _ref3$filterTaps=_ref3.filterTaps,filterTaps=void 0!==_ref3$filterTaps&&_ref3$filterTaps,_ref3$lockDirection=_ref3.lockDirection,lockDirection=void 0!==_ref3$lockDirection&&_ref3$lockDirection,_ref3$axis=_ref3.axis,A=ensureVector(v,filterTaps?3:lockDirection||(void 0===_ref3$axis?void 0:_ref3$axis)?1:0);return this.filterTaps=filterTaps,A},swipeVelocity:function swipeVelocity(v){return void 0===v&&(v=.5),ensureVector(v)},swipeDistance:function swipeDistance(v){return void 0===v&&(v=50),ensureVector(v)},swipeDuration:function swipeDuration(value){return void 0===value&&(value=250),value},delay:function delay(value){switch(void 0===value&&(value=0),value){case!0:return 180;case!1:return 0;default:return value}}});function getInternalGenericOptions(config){return void 0===config&&(config={}),resolveWith(config,InternalGenericOptionsNormalizers)}function getInternalDragOptions(config){return void 0===config&&(config={}),resolveWith(config,InternalDragOptionsNormalizers)}function _buildDragConfig(_ref3){var domTarget=_ref3.domTarget,eventOptions=_ref3.eventOptions,window=_ref3.window,enabled=_ref3.enabled,rest=_objectWithoutPropertiesLoose(_ref3,["domTarget","eventOptions","window","enabled"]),opts=getInternalGenericOptions({domTarget:domTarget,eventOptions:eventOptions,window:window,enabled:enabled});return opts.drag=getInternalDragOptions(rest),opts}function getInitial(mixed){return _extends({_active:!1,_blocked:!1,_intentional:[!1,!1],_movement:[0,0],_initial:[0,0],_bounds:[[-1/0,1/0],[-1/0,1/0]],_threshold:[0,0],_lastEventType:void 0,_dragStarted:!1,_dragPreventScroll:!1,_dragIsTap:!0,_dragDelayed:!1,event:void 0,intentional:!1,values:[0,0],velocities:[0,0],delta:[0,0],movement:[0,0],offset:[0,0],lastOffset:[0,0],direction:[0,0],initial:[0,0],previous:[0,0],first:!1,last:!1,active:!1,timeStamp:0,startTime:0,elapsedTime:0,cancel:noop,canceled:!1,memo:void 0,args:void 0},mixed)}function getInitialState(){return{shared:{hovering:!1,scrolling:!1,wheeling:!1,dragging:!1,moving:!1,pinching:!1,touches:0,buttons:0,down:!1,shiftKey:!1,altKey:!1,metaKey:!1,ctrlKey:!1,locked:!1},drag:getInitial({_pointerId:void 0,axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0,tap:!1,swipe:[0,0]}),pinch:getInitial({_pointerIds:[],da:[0,0],vdva:[0,0],origin:void 0,turns:0}),wheel:getInitial({axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0}),move:getInitial({axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0}),scroll:getInitial({axis:void 0,xy:[0,0],vxvy:[0,0],velocity:0,distance:0})}}var RecognizersMap=new Map,identity$1=function identity(xy){return xy},Recognizer=function(){function Recognizer(controller,args){var _this=this;void 0===args&&(args=[]),this.controller=controller,this.args=args,this.debounced=!0,this.setTimeout=function(callback,ms){var _window;void 0===ms&&(ms=140),clearTimeout(_this.controller.timeouts[_this.stateKey]);for(var _len=arguments.length,args=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++)args[_key-2]=arguments[_key];_this.controller.timeouts[_this.stateKey]=(_window=window).setTimeout.apply(_window,[callback,ms].concat(args))},this.clearTimeout=function(){clearTimeout(_this.controller.timeouts[_this.stateKey])},this.fireGestureHandler=function(forceFlag){if(void 0===forceFlag&&(forceFlag=!1),_this.state._blocked)return _this.debounced||(_this.state._active=!1,_this.clean()),null;if(!forceFlag&&!_this.state.intentional&&!_this.config.triggerAllEvents)return null;if(_this.state.intentional){var prev_active=_this.state.active,next_active=_this.state._active;_this.state.active=next_active,_this.state.first=next_active&&!prev_active,_this.state.last=prev_active&&!next_active,_this.controller.state.shared[_this.ingKey]=next_active}var touches=_this.controller.pointerIds.size||_this.controller.touchIds.size,down=_this.controller.state.shared.buttons>0||touches>0,state=_extends({},_this.controller.state.shared,_this.state,_this.mapStateValues(_this.state),{locked:!!document.pointerLockElement,touches:touches,down:down}),newMemo=_this.handler(state);return _this.state.memo=void 0!==newMemo?newMemo:_this.state.memo,state},this.controller=controller,this.args=args}var _proto=Recognizer.prototype;return _proto.updateSharedState=function updateSharedState(sharedState){Object.assign(this.controller.state.shared,sharedState)},_proto.updateGestureState=function updateGestureState(gestureState){Object.assign(this.state,gestureState)},_proto.checkIntentionality=function checkIntentionality(_intentional,_movement){return{_intentional:_intentional,_blocked:!1}},_proto.getMovement=function getMovement(values){var rubberband=this.config.rubberband,_this$state=this.state,_bounds=_this$state._bounds,_initial=_this$state._initial,_active=_this$state._active,wasIntentional=_this$state._intentional,lastOffset=_this$state.lastOffset,prevMovement=_this$state.movement,_T=_this$state._threshold,M=this.getInternalMovement(values,this.state),i0=!1===wasIntentional[0]?getIntentionalDisplacement(M[0],_T[0]):wasIntentional[0],i1=!1===wasIntentional[1]?getIntentionalDisplacement(M[1],_T[1]):wasIntentional[1],intentionalityCheck=this.checkIntentionality([i0,i1],M);if(intentionalityCheck._blocked)return _extends({},intentionalityCheck,{_movement:M,delta:[0,0]});var _intentional=intentionalityCheck._intentional,_movement=M,movement=[!1!==_intentional[0]?M[0]-_intentional[0]:0,!1!==_intentional[1]?M[1]-_intentional[1]:0],offset=addV(movement,lastOffset),_rubberband=_active?rubberband:[0,0];return movement=computeRubberband(_bounds,addV(movement,_initial),_rubberband),_extends({},intentionalityCheck,{intentional:!1!==_intentional[0]||!1!==_intentional[1],_initial:_initial,_movement:_movement,movement:movement,values:values,offset:computeRubberband(_bounds,offset,_rubberband),delta:subV(movement,prevMovement)})},_proto.clean=function clean(){this.clearTimeout()},function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(Recognizer,[{key:"config",get:function get(){return this.controller.config[this.stateKey]}},{key:"enabled",get:function get(){return this.controller.config.enabled&&this.config.enabled}},{key:"state",get:function get(){return this.controller.state[this.stateKey]}},{key:"handler",get:function get(){return this.controller.handlers[this.stateKey]}},{key:"transform",get:function get(){return this.config.transform||this.controller.config.transform||identity$1}}]),Recognizer}();function getIntentionalDisplacement(movement,threshold){return Math.abs(movement)>=threshold&&sign(movement)*threshold}function computeRubberband(bounds,_ref,_ref2){var Vx=_ref[0],Vy=_ref[1],Rx=_ref2[0],Ry=_ref2[1],_bounds$=bounds[0],X1=_bounds$[0],X2=_bounds$[1],_bounds$2=bounds[1],Y1=_bounds$2[0],Y2=_bounds$2[1];return[rubberbandIfOutOfBounds(Vx,X1,X2,Rx),rubberbandIfOutOfBounds(Vy,Y1,Y2,Ry)]}function getGenericPayload(_ref3,event,isStartEvent){var state=_ref3.state,timeStamp=event.timeStamp,_lastEventType=event.type,previous=state.values;return{_lastEventType:_lastEventType,event:event,timeStamp:timeStamp,elapsedTime:isStartEvent?0:timeStamp-state.startTime,previous:previous}}function getStartGestureState(_ref4,values,event,initial){var state=_ref4.state,config=_ref4.config,stateKey=_ref4.stateKey,args=_ref4.args,transform=_ref4.transform,offset=state.offset,startTime=event.timeStamp,initialFn=config.initial,bounds=config.bounds,_threshold=subV(transform(config.threshold),transform([0,0])).map(Math.abs),_state=_extends({},getInitialState()[stateKey],{_active:!0,args:args,values:values,initial:null!=initial?initial:values,_threshold:_threshold,offset:offset,lastOffset:offset,startTime:startTime});return _extends({},_state,{_initial:valueFn(initialFn,_state),_bounds:valueFn(bounds,_state)})}var Controller=function Controller(classes){var _this=this;this.classes=classes,this.pointerIds=new Set,this.touchIds=new Set,this.supportsTouchEvents=supportsTouchEvents(),this.supportsGestureEvents=function supportsGestureEvents(){try{return"constructor"in GestureEvent}catch(e){return!1}}(),this.bind=function(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];for(var _step,bindings={},_iterator=_createForOfIteratorHelperLoose(_this.classes);!(_step=_iterator()).done;){var RecognizerClass=_step.value;new RecognizerClass(_this,args).addBindings(bindings)}var _loop=function _loop(eventKey){addBindings(bindings,eventKey,(function(event){return _this.nativeRefs[eventKey](_extends({},_this.state.shared,{event:event,args:args}))}))};for(var eventKey in _this.nativeRefs)_loop(eventKey);return _this.config.domTarget?updateDomListeners(_this,bindings):getPropsListener(_this,bindings)},this.effect=function(){return _this.config.domTarget&&_this.bind(),_this.clean},this.clean=function(){var domTarget=getDomTargetFromConfig(_this.config),eventOptions=_this.config.eventOptions;domTarget&&removeListeners(domTarget,takeAll(_this.domListeners),eventOptions),Object.values(_this.timeouts).forEach(clearTimeout),function clearAllWindowListeners(controller){var _controller$config=controller.config,el=_controller$config.window,eventOptions=_controller$config.eventOptions,windowListeners=controller.windowListeners;if(!el)return;for(var stateKey in windowListeners){removeListeners(el,windowListeners[stateKey],eventOptions)}controller.windowListeners={}}(_this)},this.classes=classes,this.state=getInitialState(),this.timeouts={},this.domListeners=[],this.windowListeners={}};function addEventIds(controller,event){"pointerId"in event?controller.pointerIds.add(event.pointerId):controller.touchIds=new Set(getTouchIds(event))}function removeEventIds(controller,event){"pointerId"in event?controller.pointerIds.delete(event.pointerId):getTouchIds(event).forEach((function(id){return controller.touchIds.delete(id)}))}function clearWindowListeners(_ref,stateKey,options){var config=_ref.config,windowListeners=_ref.windowListeners;void 0===options&&(options=config.eventOptions),config.window&&(removeListeners(config.window,windowListeners[stateKey],options),delete windowListeners[stateKey])}function updateWindowListeners(_ref2,stateKey,listeners,options){var config=_ref2.config,windowListeners=_ref2.windowListeners;void 0===listeners&&(listeners=[]),void 0===options&&(options=config.eventOptions),config.window&&(removeListeners(config.window,windowListeners[stateKey],options),addListeners(config.window,windowListeners[stateKey]=listeners,options))}function updateDomListeners(_ref3,bindings){var config=_ref3.config,domListeners=_ref3.domListeners,domTarget=getDomTargetFromConfig(config);if(!domTarget)throw new Error("domTarget must be defined");var eventOptions=config.eventOptions;removeListeners(domTarget,takeAll(domListeners),eventOptions);for(var _i=0,_Object$entries=Object.entries(bindings);_i<_Object$entries.length;_i++){var _Object$entries$_i=_Object$entries[_i],key=_Object$entries$_i[0],fns=_Object$entries$_i[1],name=key.slice(2).toLowerCase();domListeners.push([name,chainFns.apply(void 0,fns)])}addListeners(domTarget,domListeners,eventOptions)}function getPropsListener(_ref4,bindings){for(var props={},captureString=_ref4.config.eventOptions.capture?"Capture":"",_i2=0,_Object$entries2=Object.entries(bindings);_i2<_Object$entries2.length;_i2++){var _Object$entries2$_i=_Object$entries2[_i2],event=_Object$entries2$_i[0],fns=_Object$entries2$_i[1],fnsArray=Array.isArray(fns)?fns:[fns];props[event+captureString]=chainFns.apply(void 0,fnsArray)}return props}function takeAll(array){return void 0===array&&(array=[]),array.splice(0,array.length)}function getDomTargetFromConfig(_ref5){var domTarget=_ref5.domTarget;return domTarget&&"current"in domTarget?domTarget.current:domTarget}function addBindings(bindings,name,fn){bindings[name]||(bindings[name]=[]),bindings[name].push(fn)}function addListeners(el,listeners,options){void 0===listeners&&(listeners=[]),void 0===options&&(options={});for(var _step2,_iterator2=_createForOfIteratorHelperLoose(listeners);!(_step2=_iterator2()).done;){var _step2$value=_step2.value,eventName=_step2$value[0],eventHandler=_step2$value[1];el.addEventListener(eventName,eventHandler,options)}}function removeListeners(el,listeners,options){void 0===listeners&&(listeners=[]),void 0===options&&(options={});for(var _step3,_iterator3=_createForOfIteratorHelperLoose(listeners);!(_step3=_iterator3()).done;){var _step3$value=_step3.value,eventName=_step3$value[0],eventHandler=_step3$value[1];el.removeEventListener(eventName,eventHandler,options)}}function useRecognizers(handlers,config,nativeHandlers){void 0===nativeHandlers&&(nativeHandlers={});var classes=function resolveClasses(internalHandlers){var classes=new Set;internalHandlers.drag&&classes.add(RecognizersMap.get("drag"));internalHandlers.wheel&&classes.add(RecognizersMap.get("wheel"));internalHandlers.scroll&&classes.add(RecognizersMap.get("scroll"));internalHandlers.move&&classes.add(RecognizersMap.get("move"));internalHandlers.pinch&&classes.add(RecognizersMap.get("pinch"));internalHandlers.hover&&classes.add(RecognizersMap.get("hover"));return classes}(handlers),controller=react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo((function(){return new Controller(classes)}),[]);return controller.config=config,controller.handlers=handlers,controller.nativeRefs=nativeHandlers,react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(controller.effect,[]),controller.config.domTarget?deprecationNoticeForDomTarget:controller.bind}function deprecationNoticeForDomTarget(){0}var CoordinatesRecognizer=function(_Recognizer){function CoordinatesRecognizer(){return _Recognizer.apply(this,arguments)||this}_inheritsLoose(CoordinatesRecognizer,_Recognizer);var _proto=CoordinatesRecognizer.prototype;return _proto.getInternalMovement=function getInternalMovement(values,state){return subV(values,state.initial)},_proto.checkIntentionality=function checkIntentionality(_intentional,_movement){if(!1===_intentional[0]&&!1===_intentional[1])return{_intentional:_intentional,axis:this.state.axis};var _movement$map=_movement.map(Math.abs),absX=_movement$map[0],absY=_movement$map[1],axis=this.state.axis||(absX>absY?"x":absX<absY?"y":void 0);return this.config.axis||this.config.lockDirection?axis?this.config.axis&&axis!==this.config.axis?{_intentional:_intentional,_blocked:!0,axis:axis}:(_intentional["x"===axis?1:0]=!1,{_intentional:_intentional,_blocked:!1,axis:axis}):{_intentional:[!1,!1],_blocked:!1,axis:axis}:{_intentional:_intentional,_blocked:!1,axis:axis}},_proto.getKinematics=function getKinematics(values,event){var state=this.getMovement(values);if(!state._blocked){var dt=event.timeStamp-this.state.timeStamp;Object.assign(state,calculateAllKinematics(state.movement,state.delta,dt))}return state},_proto.mapStateValues=function mapStateValues(state){return{xy:state.values,vxvy:state.velocities}},CoordinatesRecognizer}(Recognizer);function persistEvent(event){"persist"in event&&"function"==typeof event.persist&&event.persist()}var DragRecognizer=function(_CoordinatesRecognize){function DragRecognizer(){var _this;return(_this=_CoordinatesRecognize.apply(this,arguments)||this).ingKey="dragging",_this.stateKey="drag",_this.setPointerCapture=function(event){if(!_this.config.useTouch&&!document.pointerLockElement){var target=event.target,pointerId=event.pointerId;target&&"setPointerCapture"in target&&target.setPointerCapture(pointerId),_this.updateGestureState({_dragTarget:target,_dragPointerId:pointerId})}},_this.releasePointerCapture=function(){if(!_this.config.useTouch&&!document.pointerLockElement){var _this$state=_this.state,_dragTarget=_this$state._dragTarget,_dragPointerId=_this$state._dragPointerId;if(_dragPointerId&&_dragTarget&&"releasePointerCapture"in _dragTarget&&(!("hasPointerCapture"in _dragTarget)||_dragTarget.hasPointerCapture(_dragPointerId)))try{_dragTarget.releasePointerCapture(_dragPointerId)}catch(e){}}},_this.preventScroll=function(event){_this.state._dragPreventScroll&&event.cancelable&&event.preventDefault()},_this.getEventId=function(event){return _this.config.useTouch?event.changedTouches[0].identifier:event.pointerId},_this.isValidEvent=function(event){return _this.state._pointerId===_this.getEventId(event)},_this.shouldPreventWindowScrollY=_this.config.experimental_preventWindowScrollY&&_this.controller.supportsTouchEvents,_this.setUpWindowScrollDetection=function(event){persistEvent(event),updateWindowListeners(_this.controller,_this.stateKey,[["touchmove",_this.preventScroll],["touchend",_this.clean.bind(_assertThisInitialized(_this))],["touchcancel",_this.clean.bind(_assertThisInitialized(_this))]],{passive:!1}),_this.setTimeout(_this.startDrag.bind(_assertThisInitialized(_this)),250,event)},_this.setUpDelayedDragTrigger=function(event){_this.state._dragDelayed=!0,persistEvent(event),_this.setTimeout(_this.startDrag.bind(_assertThisInitialized(_this)),_this.config.delay,event)},_this.setStartState=function(event){var values=getPointerEventValues(event,_this.transform);_this.updateSharedState(getGenericEventData(event)),_this.updateGestureState(_extends({},getStartGestureState(_assertThisInitialized(_this),values,event),getGenericPayload(_assertThisInitialized(_this),event,!0),{_pointerId:_this.getEventId(event)})),_this.updateGestureState(_this.getMovement(values))},_this.onDragStart=function(event){addEventIds(_this.controller,event),_this.enabled&&!_this.state._active&&(_this.setStartState(event),_this.setPointerCapture(event),_this.shouldPreventWindowScrollY?_this.setUpWindowScrollDetection(event):_this.config.delay>0?_this.setUpDelayedDragTrigger(event):_this.startDrag(event,!0))},_this.onDragChange=function(event){if(!_this.state.canceled&&_this.state._active&&_this.isValidEvent(event)&&(_this.state._lastEventType!==event.type||event.timeStamp!==_this.state.timeStamp)){var values;if(document.pointerLockElement){var movementX=event.movementX,movementY=event.movementY;values=addV(_this.transform([movementX,movementY]),_this.state.values)}else values=getPointerEventValues(event,_this.transform);var kinematics=_this.getKinematics(values,event);if(!_this.state._dragStarted){if(_this.state._dragDelayed)return void _this.startDrag(event);if(!_this.shouldPreventWindowScrollY)return;if(_this.state._dragPreventScroll||!kinematics.axis)return;if("x"!==kinematics.axis)return void(_this.state._active=!1);_this.startDrag(event)}var genericEventData=getGenericEventData(event);_this.updateSharedState(genericEventData);var genericPayload=getGenericPayload(_assertThisInitialized(_this),event),realDistance=calculateDistance(kinematics._movement),_dragIsTap=_this.state._dragIsTap;_dragIsTap&&realDistance>=3&&(_dragIsTap=!1),_this.updateGestureState(_extends({},genericPayload,kinematics,{_dragIsTap:_dragIsTap})),_this.fireGestureHandler()}},_this.onDragEnd=function(event){if(removeEventIds(_this.controller,event),_this.isValidEvent(event)&&(_this.clean(),_this.state._active)){_this.state._active=!1;var tap=_this.state._dragIsTap,_this$state$velocitie=_this.state.velocities,vx=_this$state$velocitie[0],vy=_this$state$velocitie[1],_this$state$movement=_this.state.movement,mx=_this$state$movement[0],my=_this$state$movement[1],_this$state$_intentio=_this.state._intentional,ix=_this$state$_intentio[0],iy=_this$state$_intentio[1],_this$config$swipeVel=_this.config.swipeVelocity,svx=_this$config$swipeVel[0],svy=_this$config$swipeVel[1],_this$config$swipeDis=_this.config.swipeDistance,sx=_this$config$swipeDis[0],sy=_this$config$swipeDis[1],sd=_this.config.swipeDuration,endState=_extends({},getGenericPayload(_assertThisInitialized(_this),event),_this.getMovement(_this.state.values)),swipe=[0,0];endState.elapsedTime<sd&&(!1!==ix&&Math.abs(vx)>svx&&Math.abs(mx)>sx&&(swipe[0]=sign(vx)),!1!==iy&&Math.abs(vy)>svy&&Math.abs(my)>sy&&(swipe[1]=sign(vy))),_this.updateSharedState({buttons:0}),_this.updateGestureState(_extends({},endState,{tap:tap,swipe:swipe})),_this.fireGestureHandler(_this.config.filterTaps&&!0===tap)}},_this.clean=function(){_CoordinatesRecognize.prototype.clean.call(_assertThisInitialized(_this)),_this.state._dragStarted=!1,_this.releasePointerCapture(),clearWindowListeners(_this.controller,_this.stateKey)},_this.onCancel=function(){_this.state.canceled||(_this.updateGestureState({canceled:!0,_active:!1}),_this.updateSharedState({buttons:0}),setTimeout((function(){return _this.fireGestureHandler()}),0))},_this.onClick=function(event){_this.state._dragIsTap||event.stopPropagation()},_this}_inheritsLoose(DragRecognizer,_CoordinatesRecognize);var _proto=DragRecognizer.prototype;return _proto.startDrag=function startDrag(event,onDragIsStart){void 0===onDragIsStart&&(onDragIsStart=!1),this.state._active&&!this.state._dragStarted&&(onDragIsStart||this.setStartState(event),this.updateGestureState({_dragStarted:!0,_dragPreventScroll:!0,cancel:this.onCancel}),this.clearTimeout(),this.fireGestureHandler())},_proto.addBindings=function addBindings$1(bindings){(this.config.useTouch?(addBindings(bindings,"onTouchStart",this.onDragStart),addBindings(bindings,"onTouchMove",this.onDragChange),addBindings(bindings,"onTouchEnd",this.onDragEnd),addBindings(bindings,"onTouchCancel",this.onDragEnd)):(addBindings(bindings,"onPointerDown",this.onDragStart),addBindings(bindings,"onPointerMove",this.onDragChange),addBindings(bindings,"onPointerUp",this.onDragEnd),addBindings(bindings,"onPointerCancel",this.onDragEnd)),this.config.filterTaps)&&addBindings(bindings,this.controller.config.eventOptions.capture?"onClick":"onClickCapture",this.onClick)},DragRecognizer}(CoordinatesRecognizer);function memoizeOne(resultFn,isEqual){var lastThis,lastResult,lastArgs=[],calledOnce=!1;return function memoized(){for(var _len=arguments.length,newArgs=new Array(_len),_key=0;_key<_len;_key++)newArgs[_key]=arguments[_key];return calledOnce&&lastThis===this&&isEqual(newArgs,lastArgs)||(lastResult=resultFn.apply(this,newArgs),calledOnce=!0,lastThis=this,lastArgs=newArgs),lastResult}}function equal(a,b){if(a===b)return!0;if(a&&b&&"object"==typeof a&&"object"==typeof b){if(a.constructor!==b.constructor)return!1;var length,i,keys,it;if(Array.isArray(a)){if((length=a.length)!==b.length)return!1;for(i=length;0!=i--;)if(!equal(a[i],b[i]))return!1;return!0}if("function"==typeof Map&&a instanceof Map&&b instanceof Map){if(a.size!==b.size)return!1;for(it=a.entries();!(i=it.next()).done;)if(!b.has(i.value[0]))return!1;for(it=a.entries();!(i=it.next()).done;)if(!equal(i.value[1],b.get(i.value[0])))return!1;return!0}if("function"==typeof Set&&a instanceof Set&&b instanceof Set){if(a.size!==b.size)return!1;for(it=a.entries();!(i=it.next()).done;)if(!b.has(i.value[0]))return!1;return!0}if(a.constructor===RegExp)return a.source===b.source&&a.flags===b.flags;if(a.valueOf!==Object.prototype.valueOf)return a.valueOf()===b.valueOf();if(a.toString!==Object.prototype.toString)return a.toString()===b.toString();if((length=(keys=Object.keys(a)).length)!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!Object.prototype.hasOwnProperty.call(b,keys[i]))return!1;if("undefined"!=typeof Element&&a instanceof Element)return!1;for(i=length;0!=i--;)if(!("_owner"===keys[i]&&a.$$typeof||equal(a[keys[i]],b[keys[i]])))return!1;return!0}return a!=a&&b!=b}function isEqual(a,b){try{return equal(a,b)}catch(error){if((error.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw error}}function useDrag(handler,config){void 0===config&&(config={}),RecognizersMap.set("drag",DragRecognizer);var buildDragConfig=Object(react__WEBPACK_IMPORTED_MODULE_0__.useRef)();return buildDragConfig.current||(buildDragConfig.current=memoizeOne(_buildDragConfig,isEqual)),useRecognizers({drag:handler},buildDragConfig.current(config))}}}]);