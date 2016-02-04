/* Track Integration Framework Version: 3.0-20121015-184449 */
HAF=window.HAF=(typeof window.HAF==="undefined")?{}:window.HAF;
HAF._int={version:"3.0-20121015-184449",providers:[]};
if(typeof HAF.config==="undefined"){HAF.config=yellAnalyticsConfig
}(function(){function Storage(){this.initialize()
}Storage.prototype={initialize:function(){this.useHTMLSessionStorage="sessionStorage" in window
},createCookie:function(name,value,secs){var expires="";
if(secs){var date=new Date();
date.setTime(date.getTime()+(secs*1000));
expires="; expires="+date.toGMTString()
}document.cookie=name+"="+value+expires+"; path=/"
},readCookie:function(name){var nameEQ=name+"=";
var ca=document.cookie.split(";");
for(var i=0;
i<ca.length;
i++){var c=ca[i];
while(c.charAt(0)==" "){c=c.substring(1,c.length)
}if(c.indexOf(nameEQ)==0){return c.substring(nameEQ.length,c.length)
}}return null
},deleteCookie:function(name){createCookie(name,"",-1)
},read:function(key){if(null==key){return null
}if(this.useHTMLSessionStorage){return sessionStorage.getItem(this.myKey(key))
}else{return readCookie(this.myKey(key))
}},write:function(value,key){if((null==key)||(null==value)){return
}if(this.useHTMLSessionStorage){sessionStorage.setItem(this.myKey(key),value)
}else{createCookie(this.myKey(key),value,0)
}},myKey:function(key){if(this.useHTMLSessionStorage){return"yellfwjs_"+key
}else{return key
}}};
HAF._int.Storage=Storage
})();
(function(){function TrackEvent(descriptor,eventId){this.getDescriptor=function(){return descriptor
};
this.setEventId(eventId||null);
this.props={};
this.propsDuplicity={};
this.nextEvent=null;
this.storage=new HAF._int.Storage()
}TrackEvent.prototype.getEventName=function(){return("name" in this.getDescriptor())?this.getDescriptor().name:null
};
TrackEvent.prototype.getEventId=function(){return this.eventId
};
TrackEvent.prototype.setEventId=function(value){this.eventId=value?value.replace(/\s/g,"_"):value;
return this
};
TrackEvent.prototype.getProps=function(){return this.props
};
TrackEvent.prototype.getPropsFor=function(plattform){var returnValue=[];
for(var key in this.props){var value=this.props[key].value;
var varObj=this.props[key].varObj;
var wasSent=this.propertyHasBeenSent(varObj);
if(value&&varObj[plattform]){returnValue.push({propertyName:varObj.name,propertyDefinitions:varObj[plattform].split("|"),hasBeenSent:wasSent,value:value})
}}return returnValue
};
TrackEvent.prototype.setProp=function(propertyDescriptor,value){var idx=HAF._int.yellIndex(propertyDescriptor.name);
if(!this.props[idx]){this.props[idx]={};
this.props[idx].varObj=propertyDescriptor
}this.props[idx].value=HAF._int.yellHTMLDecode(value);
return this
};
TrackEvent.prototype.setPropDuplicity=function(prop,uniqueId){var idx=HAF._int.yellIndex(prop.name);
this.propsDuplicity[idx].varObj=prop;
this.propsDuplicity[idx].uniqueId=uniqueId;
return this
};
TrackEvent.prototype.chain=function(event){if(null==this.nextEvent){this.nextEvent=event
}else{this.nextEvent.chain(event)
}return this
};
TrackEvent.prototype.hasBeenSent=function(){if(null==this.getEventId()){return false
}else{var uniqueid=this.getEventName()+"_"+this.getEventId();
uniqueid=HAF._int.yellIndex(uniqueid);
return this.storage.read(uniqueid)=="X"
}};
TrackEvent.prototype.markAsSent=function(){if(null!=this.getEventId()){var uniqueid=this.getEventName()+"_"+this.getEventId();
uniqueid=HAF._int.yellIndex(uniqueid);
this.storage.write("X",uniqueid)
}};
TrackEvent.prototype.propertyHasBeenSent=function(prop){var propId=this.propsDuplicity[prop];
if(propId){var sentBefore=prop+"_"+propId;
return this.storage.read(sentBefore)=="X"
}else{return false
}};
TrackEvent.prototype.propertyMarkAsSent=function(prop){var propId=this.propsDuplicity[prop];
if(propId){var sentBefore=prop+"_"+propId;
this.storage.write("X",sentBefore)
}};
HAF._int.TrackEvent=window.YellEvent=TrackEvent
})();
(function(){HAF.pgEvents=new function(){var events=[];
this.isEmpty=function(){return events.length===0
};
this.add=function(event){events.push(event);
return this
};
this.getEvents=function(){return events
};
this.getEventByName=function(name){for(var x=0;
x<events.length;
x++){if(events[x].getEventName()===name){return events[x]
}}};
this.clear=function(){events=[]
}
}()
})();
(function(){HAF._int.Constants={OMNITURE:"YellOmniture",GA:"YellGoogleAnalytics",PIWIK:"YellPiwik",COMSCORE:"Comscore",DEBUG:"YellDebug"};
var plattformInterface=["name","process","send","clear","processTrackLinkEvent","afterTrackingEventProcessed","requiresEventTimeout"];
function augment(obj,base){for(var p in base){if(!(p in obj)||((p in obj)&&(typeof(obj[p])!="function")&&(typeof(base[p])!="function"))){obj[p]=base[p]
}}}function yellIndex(str){str=str.replace(/^\s+|\s+$/g,"");
str=str.toLowerCase();
return str.replace(/\s/g,"_")
}function yellHTMLDecode(value){var temp=document.createElement("div");
temp.innerHTML=value;
var result=temp.childNodes[0].nodeValue;
temp.removeChild(temp.firstChild);
return result
}function yellQueryParam(url,name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
var regexS="[\\?&]"+name+"=([^&#]*)";
var regex=new RegExp(regexS);
var results=regex.exec(url);
if(results==null){return""
}else{return results[1]
}}function getAvailablePlattforms(){if(typeof HAF._int.plattformInstances==="undefined"){var plattformInstances=[];
for(var x=0;
x<HAF._int.providers.length;
x++){var provider=HAF._int.providers[x];
plattformInstances.push(new provider())
}plattformInstances.processEvent=function(event){for(var i=0;
i<this.length;
i++){this[i].process(false,event)
}};
plattformInstances.sendAndClear=function(){for(var i=0;
i<this.length;
i++){if(this[i].sendCallback){this[i].sendCallback();
delete this[i].sendCallback
}else{this[i].send()
}this[i].clear()
}};
plattformInstances.requiresEventTimeout=function(){var forceTimeout=false;
for(var x=0;
x<this.length;
x++){forceTimeout=forceTimeout||this[x].requiresEventTimeout
}return forceTimeout
};
HAF._int.plattformInstances=plattformInstances
}return HAF._int.plattformInstances
}function sendPageEvents(){var plattforms=getAvailablePlattforms();
var events=yellPageEvents.getEvents();
for(var i=0;
i<events.length;
i++){var currentEvent=events[i];
if(!currentEvent.hasBeenSent()){currentEvent.markAsSent();
plattforms.processEvent(currentEvent)
}}HAF.listeners.beforePageTrack(trackingCallbackEvent);
HAF.listeners.beforeTracking(trackingCallbackEvent);
plattforms.sendAndClear();
yellMarkEventsAsSent(events)
}function sendTrackLinkEvent(obj,trackevent,name,immediate){name=name||trackevent.getEventName();
var plattforms=getAvailablePlattforms();
var forceTimeout=plattforms.requiresEventTimeout();
immediate==forceTimeout?false:immediate;
HAF.listeners.beforeTracking(trackingCallbackEvent);
HAF.listeners.beforeLinkTrack(trackingCallbackEvent);
for(var x=0;
x<plattforms.length;
x++){plattforms[x].processTrackLinkEvent(obj,trackevent,name,immediate)
}yellMarkEventsAsSent(trackevent);
var ref=obj.href+"";
for(var x=0;
x<plattforms.length;
x++){plattforms[x].afterTrackingEventProcessed(obj,trackevent,name,immediate)
}if(ref){if(immediate){document.location=ref
}else{setTimeout('document.location = "'+ref+'"',500)
}}return false
}function yellMarkEventsAsSent(events){function markAsCompleteSent(event){var yprops=event.getProps();
for(var key in yprops){var varObj=yprops[key].varObj;
event.propertyMarkAsSent(varObj)
}event.markAsSent()
}if(yellIsArray(events)){for(var i=0;
i<events.length;
i++){var ev=events[i];
while(ev){markAsCompleteSent(ev);
ev=ev.nextEvent
}}}else{var ev=events;
while(ev){markAsCompleteSent(ev);
ev=ev.nextEvent
}}}function yellIsArray(testObject){return testObject&&!(testObject.propertyIsEnumerable("length"))&&typeof testObject==="object"&&typeof testObject.length==="number"
}function createClickListener(trackevent,name,immediate){return function(e){if(!e){var e=window.event
}e.returnValue=false;
if(e.preventDefault){e.preventDefault()
}if(e.stopPropagation){e.stopPropagation()
}var targ;
if(e.target){targ=e.target
}else{targ=e.srcElement
}if(!targ.href&&targ.parentNode){for(var x=0;
x<5;
x++){targ=targ.parentNode;
if(targ.src||!targ.parentNode){break
}}}return sendTrackLinkEvent(targ,trackevent,name,immediate)
}
}HAF._int.augment=augment;
HAF._int.yellIndex=yellIndex;
HAF._int.yellHTMLDecode=yellHTMLDecode;
HAF._int.yellQueryParam=yellQueryParam;
HAF._int.getPlattformInstances=getAvailablePlattforms;
HAF._int.plattformInterface=plattformInterface;
HAF._int.getProviderByName=function(name){for(var x=0;
x<HAF._int.providers.length;
x++){if(name===HAF._int.providers[x].prototype.name){return HAF._int.providers[x]
}}};
window.yellPageEvents=HAF.pgEvents;
HAF.newEvent=function(event,eventId){return new HAF._int.TrackEvent(event,eventId)
};
HAF.pg_event=window.yellSendPageEvents=sendPageEvents;
HAF.lnk_event=window.yellSendTrackLinkEvent=sendTrackLinkEvent;
HAF.lnk_handler=createClickListener;
var noop=function(){};
if("listeners" in HAF){var trackingCallbackEvent={getProviders:function(){return HAF._int.getPlattformInstances()
},getOmnitureTracker:function(){var omniture=HAF._int.getProviderByName(HAF._int.Constants.OMNITURE);
return omniture.ss
}};
if(!"beforeTracking" in HAF.listeners){HAF.listeners.beforeTracking=noop
}else{var fn=HAF.listeners.beforeTracking;
var executeAgain=true;
HAF.listeners.beforeTracking=function(trckEvt){if(executeAgain){executeAgain=fn(trckEvt)
}}
}if(!"beforePageTrack" in HAF.listeners){HAF.listeners.beforePageTrack=noop
}if(!"beforeLinkTrack" in HAF.listeners){HAF.listeners.beforeLinkTrack=noop
}}else{var trackingCallbackEvent={};
HAF.listeners={beforePageTrack:noop,beforeTracking:noop,beforeLinkTrack:noop}
}})();
(function(){var config=(typeof HAF.config.omniture==="undefined")?{enabled:false}:HAF.config.omniture;
if(!config.enabled){return
}function addToList(list,newvalue){if(newvalue){if(!list||list==="None"){list=newvalue;
return list
}var arr=list.split(",");
for(var i=0;
i<arr.length;
i++){if(arr[i]===newvalue){return list
}}list+=","+newvalue
}return list
}function YellOmniture(){this.ss=(typeof s==="undefined")?s_gi(config.account):s;
this.clear()
}YellOmniture.prototype.process=function(isTrackLink,yellEvent){var yevt=yellEvent.getDescriptor();
if(!yellEvent.hasBeenSent()){if(yevt.omniture){this.ss.events=addToList(this.ss.events,yevt.omniture)
}if(isTrackLink){this.ss.linkTrackEvents=addToList(this.ss.linkTrackEvents,yevt.omniture);
this.ss.events=this.ss.linkTrackEvents;
this.ss.linkTrackVars=addToList(this.ss.linkTrackVars,"events")
}var yprops=yellEvent.getPropsFor("omniture");
for(var x=0;
x<yprops.length;
x++){var property=yprops[x];
if(property.hasBeenSent){continue
}for(var i=0;
i<property.propertyDefinitions.length;
i++){var prop=property.propertyDefinitions[i];
this.ss[prop]=property.value;
if(isTrackLink){this.ss.linkTrackVars=addToList(this.ss.linkTrackVars,prop)
}}}}};
YellOmniture.prototype.clear=function(){this.ss.events=null;
this.ss.products=null;
this.ss.campaign=null;
this.ss.linkTrackVars="None";
this.ss.linkTrackEvents="None";
var isProp=/^prop/;
var isEVar=/^eVar/;
for(var key in this.ss){if(isProp.test(key)||isEVar.test(key)){this.ss[key]=null
}}};
YellOmniture.prototype.sendTrackLink=function(obj,name){if(!this.ss.pageName){this.ss.pageName=document.title
}this.optimize();
if(typeof hookOmniture=="function"){hookOmniture(this,true)
}name=name?name:"None";
this.ss.tl(obj?obj:true,"o",name)
};
YellOmniture.prototype.send=function(){if(!this.ss.pageName){this.ss.pageName=document.title
}this.optimize();
if(config.campaign){this.ss.campaign=HAF._int.yellQueryParam(window.location.href,config.campaign)
}if(typeof hookOmniture=="function"){hookOmniture(this,false)
}this.ss.t()
};
YellOmniture.prototype.optimize=function(){for(var i=1;
i<=150;
++i){var prop="prop"+i;
var evar="eVar"+i;
if((prop in this.ss)&&(evar in this.ss)&&(this.ss[prop]==this.ss[evar])&&(this.ss[prop]!=null)){var dyn="D=v"+i;
if(this.ss[prop].toString().length>dyn.length){this.ss[prop]=dyn
}}}};
YellOmniture.prototype.processTrackLinkEvent=function(obj,event,name,immediate){var ev=event;
while(ev){this.process(true,ev);
ev=ev.nextEvent
}this.sendTrackLink(immediate||obj,name);
this.clear()
};
YellOmniture.prototype.afterTrackingEventProcessed=function(obj,event,delay,name){if(obj.href&&""!=obj.href&&obj.href.indexOf("#")!=1){if(this.ss.linkInternalFilters){var values=this.ss.linkInternalFilters.split(",");
values.push(obj.href);
this.ss.linkInternalFilters=values.join(",")
}else{this.ss.linkInternalFilters=obj.href
}}};
YellOmniture.prototype.requiresEventTimeout=false;
YellOmniture.prototype.name=HAF._int.Constants.OMNITURE;
HAF._int.providers.push(YellOmniture)
})();
(function(){var conf=HAF.config.global;
var gaConf=(typeof HAF.config.googleanalytics==="undefined")?{enabled:false}:HAF.config.googleanalytics;
if(!gaConf.enabled){return
}function gtw(){if(!gaConf.useSynchronousAPI){var pfx=this.accountPrefix="haf"+Math.floor(Math.random()*100)+".";
function p(fnName){return pfx+fnName
}window._gaq=window._gaq||[];
_gaq.push([p("_setAccount"),gaConf.account]);
this.setInit=function(fn,val){_gaq.push([p(fn),val])
};
this.setCustomVar=function(index,name,value,opt_scope){_gaq.push([p("_setCustomVar"),index,name,value,opt_scope])
};
this.deleteCustomVar=function(index){_gaq.push([p("_deleteCustomVar"),index])
};
this.trackEvent=function(category,action,opt_label){_gaq.push([p("_trackEvent"),category,action,opt_label]);
return true
};
this.trackPageview=function(opt_pageURL){var data=[p("_trackPageview")];
if(opt_pageURL){data.push(opt_pageURL)
}_gaq.push(data)
}
}else{var tracker=_gat._getTracker(gaConf.account);
this.setInit=function(fn,val){tracker[fn](val)
};
this.setCustomVar=function(index,name,value,opt_scope){tracker._setCustomVar(index,name,value,opt_scope)
};
this.deleteCustomVar=function(index){tracker._deleteCustomVar(index)
};
this.trackEvent=function(category,action,opt_label){return tracker._trackEvent(category,action,opt_label)
};
this.trackPageview=function(opt_pageURL){tracker._trackPageview(opt_pageURL)
}
}if(gaConf.domainName){this.setInit("_setDomainName",gaConf.domainName)
}var allowHash=true;
if(!(typeof gaConf.allowHash==="undefined")){allowHash=(gaConf.allowHash!="false")
}if(!allowHash){this.setInit("_setAllowHash",allowHash)
}if(gaConf.allowLinker){this.setInit("_setAllowLinker",gaConf.allowLinker)
}if(gaConf.campaignCookieTimeout&&!isNaN(gaConf.campaignCookieTimeout)){this.setInit("_setCampaignCookieTimeout",gaConf.campaignCookieTimeout)
}if(gaConf.sessionCookieTimeout&&!isNaN(gaConf.sessionCookieTimeout)){this.setInit("_setSessionCookieTimeout",gaConf.sessionCookieTimeout)
}if(gaConf.visitorCookieTimeout&&!isNaN(gaConf.visitorCookieTimeout)){this.setInit("_setVisitorCookieTimeout",gaConf.visitorCookieTimeout)
}}function YellGoogleAnalytics(){this.maxCustomVars=5;
this.separatorProp="|";
this.separatorEvent=":";
this.propsKey="";
this.propsValue="";
this.categoryEvent=null;
this.maxCustomVars=gaConf.maxCustomVars;
this.gtw=new gtw();
this.clear()
}YellGoogleAnalytics.trackingWrapper=gtw;
YellGoogleAnalytics.prototype.process=function(isTrackLink,yellEvent){do{var yevt=yellEvent.getDescriptor();
var category=null;
if(yevt!=null&&yevt.googleanalytics){category=yevt.googleanalytics;
this.categoryEvent=category
}var yprops=yellEvent.getPropsFor("googleanalytics");
if(yprops.length>0){var propsKeysArray=[];
var propsValuesArray=[];
for(var x=0;
x<yprops.length;
x++){var property=yprops[x];
var defs=property.propertyDefinitions;
if(isTrackLink){if(defs.length==2||defs.length==3){propsKeysArray.push(defs[1]);
propsValuesArray.push(property.value)
}}else{var nameCustomVar=(category!=null)?category+this.separatorEvent:"";
nameCustomVar+=defs[1];
property.value=this.adjustVarLength(nameCustomVar,property.value);
if(defs.length==3){this.gtw.setCustomVar(defs[0],nameCustomVar,property.value,defs[2])
}else{if(defs.length==2){this.gtw.setCustomVar(defs[0],nameCustomVar,property.value)
}}}}if(isTrackLink){this.propsKey=propsKeysArray.join(this.separatorProp);
this.propsValue=propsValuesArray.join(this.separatorProp);
this.sendTrackLink()
}}yellEvent=yellEvent.nextEvent
}while(null!=yellEvent)
};
YellGoogleAnalytics.prototype.adjustVarLength=function(varName,varValue){var cont=varName+varValue;
if(cont.length>128){var trimDistance=varValue.length-(cont.length-128);
varValue=varValue.substr(0,trimDistance)
}return varValue
};
YellGoogleAnalytics.prototype.clear=function(){for(var i=1;
i<=this.maxCustomVars;
i++){this.gtw.deleteCustomVar(i)
}this.propsKey="";
this.propsValue="";
this.categoryEvent=null
};
YellGoogleAnalytics.prototype.sendTrackLink=function(){if(this.categoryEvent==null){this.categoryEvent=gaConf.defaultEventName
}var sendTrack=false;
if(typeof hookGoogleAnalytics=="function"){hookGoogleAnalytics(this,true)
}sendTrack=this.gtw.trackEvent(this.categoryEvent,this.propsKey,this.propsValue);
this.propsKey="";
this.propsValue="";
this.categoryEvent=null;
return sendTrack
};
YellGoogleAnalytics.prototype.send=function(){if(typeof hookGoogleAnalytics=="function"){hookGoogleAnalytics(this,false)
}this.gtw.trackPageview()
};
YellGoogleAnalytics.prototype.recordOutboundLink=function(action){this.gtw.trackEvent(gaConf.externalLinks,action)
};
YellGoogleAnalytics.prototype.recordDownloadFileLink=function(fileType,linkFile){return this.gtw.trackEvent(gaConf.downloadLinks,fileType,linkFile)
};
var PARAM_SEPARATOR=",";
function eventClick(element,event,functionClick){if(element.addEventListener){element.addEventListener(event,functionClick,false)
}else{element.attachEvent("on"+event,functionClick)
}}function processLinks(){var internalDomains=(conf.trackExternalLinks&&conf.internalDomains)?conf.internalDomains.split(PARAM_SEPARATOR):null;
var downloadFileTypes=(conf.trackDownloadLinks&&conf.downloadFileTypes)?conf.downloadFileTypes.split(PARAM_SEPARATOR):null;
var plattforms=HAF._int.getPlattformInstances();
var gaRef=null;
for(var x=0;
x<plattforms.length;
x++){if(plattforms[x].name===HAF._int.Constants.GA){gaRef=plattforms[x];
break
}}function createOnclickHandler(link){var href=link.href;
return function(){if(internalDomains!=null){var findInternalDomain=false;
for(var j=0;
j<internalDomains.length;
j++){var patter=new RegExp(internalDomains[j],"i");
if(href.match(patter)!=null){findInternalDomain=true;
break
}}if(!findInternalDomain){gaRef.recordOutboundLink(href)
}}if(downloadFileTypes!=null){var findFileType=false;
var fileType="";
for(var j=0;
j<downloadFileTypes.length;
j++){var patter=new RegExp("[\x2E]"+downloadFileTypes[j],"i");
if(href.match(patter)!=null){findFileType=true;
fileType=downloadFileTypes[j];
break
}}if(findFileType){gaRef.recordDownloadFileLink(fileType,href)
}}}
}var links=window.document.getElementsByTagName("a");
for(var i=0;
i<links.length;
i++){var inlineOnclick=links[i].onclick||"";
inlineOnclick=inlineOnclick?""+inlineOnclick:"";
if(inlineOnclick&&inlineOnclick.indexOf("yellSendTrackLinkEvent")!=-1){continue
}if(inlineOnclick&&inlineOnclick.indexOf("HAF.lnk_event")!=-1){continue
}eventClick(links[i],"mousedown",createOnclickHandler(links[i]))
}}if(conf.trackExternalLinks||conf.trackDownloadLinks){if(typeof window.addEventListener!="undefined"){window.addEventListener("load",processLinks,false)
}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onload",processLinks)
}else{if(window.onload!=null){var oldOnload=window.onload;
window.onload=function(e){oldOnload(e);
window[processLinks]()
}
}else{window.onload=processLinks
}}}}YellGoogleAnalytics.prototype.processTrackLinkEvent=function(obj,event,name,immediate){var ev=event;
var specificEventsInChain=false;
do{specificEventsInChain=ev.getPropsFor("googleanalytics").length>0;
if(specificEventsInChain){break
}ev=ev.nextEvent
}while(ev!=null);
if(!specificEventsInChain){this.recordOutboundLink(obj.getAttribute("href"))
}else{this.process(true,ev)
}};
YellGoogleAnalytics.prototype.afterTrackingEventProcessed=function(obj,event,delay,name){};
YellGoogleAnalytics.prototype.requiresEventTimeout=true;
YellGoogleAnalytics.prototype.name=HAF._int.Constants.GA;
HAF._int.providers.push(YellGoogleAnalytics)
})();
(function(){var conf=HAF.config.global;
var pwConf=(typeof HAF.config.piwik==="undefined")?{enabled:false}:HAF.config.piwik;
if(!pwConf.enabled){return
}function YellPiwik(){this.pageTracker=null;
this.category="";
this.propsKey="";
this.propsValue="";
this.maxCustomVars=5;
this.separator="|";
if(pwConf.listenerSecure){this.pageTracker=Piwik.getTracker(pwConf.listenerSecure,pwConf.siteId)
}else{this.pageTracker=Piwik.getTracker(pwConf.listener,pwConf.siteId)
}if(conf.trackDownloadLinks&&conf.downloadFileTypes){var piwikExtensions=conf.downloadFileTypes.replace(",","|");
this.pageTracker.setDownloadExtensions(piwikExtensions);
this.pageTracker.enableLinkTracking()
}if(conf.trackExternalLinks&&conf.internalDomains){var piwikDomains=conf.internalDomains.split(",");
this.pageTracker.setDomains(piwikDomains);
this.pageTracker.enableLinkTracking()
}this.clear()
}YellPiwik.prototype.process=function(isTrackLink,yellEvent){var yevt=yellEvent.getDescriptor();
var categoryProcess=yevt.piwik;
var allProps=yellEvent.getPropsFor("piwik");
var propsKeysArray=[];
var propsValuesArray=[];
for(var x=0;
x<allProps.length;
x++){var property=allProps[x];
var props=property.propertyDefinitions;
if(property.hasBeenSent){continue
}if(isTrackLink){if(isNaN(props[0])){propsKeysArray.push(props[0])
}else{propsKeysArray.push(props[1])
}propsValuesArray.push(value)
}else{if(isNaN(props[0])){this.pageTracker[props[0]].call(this.pageTracker,property.value)
}else{if(categoryProcess!=null&&categoryProcess!=""){this.pageTracker.setCustomVariable(props[0],categoryProcess+":"+props[1],property.value,scope=props[2])
}else{this.pageTracker.setCustomVariable(props[0],props[1],property.value,scope=props[2])
}}}}if(isTrackLink){this.category=categoryProcess;
this.propsKey=propsKeysArray.join(this.separator);
this.propsValue=propsValuesArray.join(this.separator)
}};
YellPiwik.prototype.sendTrackLink=function(){var sendTrack=false;
if(this.pageTracker!=null){if(typeof hookPiwik=="function"){hookPiwik(this,true)
}if(this.category!=null&&this.category!=""){this.pageTracker.trackGoal(0,this.category+":"+this.propsKey+":"+this.propsValue);
sendTrack=true;
this.category=""
}else{this.pageTracker.trackGoal(0,this.propsKey+":"+this.propsValue);
sendTrack=true
}}return sendTrack
};
YellPiwik.prototype.clear=function(){for(var i=1;
i<=this.maxCustomVars;
i++){this.pageTracker.deleteCustomVariable(i,"visit");
this.pageTracker.deleteCustomVariable(i,"page")
}};
YellPiwik.prototype.send=function(){if(typeof hookPiwik=="function"){hookPiwik(this,false)
}this.pageTracker.trackPageView()
};
YellPiwik.prototype.processTrackLinkEvent=function(obj,event,name,immediate){var ev=event;
while(ev){this.process(true,ev);
ev=ev.nextEvent
}this.sendTrackLink();
this.clear()
};
YellPiwik.prototype.afterTrackingEventProcessed=function(obj,event,delay,name){};
YellPiwik.prototype.requiresEventTimeout=false;
YellPiwik.prototype.name=HAF._int.Constants.PIWIK;
HAF._int.providers.push(YellPiwik)
})();
(function(){var config=(typeof HAF.config.comscore==="undefined")?{enabled:false}:HAF.config.comscore;
if(!config.enabled){return
}function comScore(t){var b="comScore",o=document,f=o.location,a="",e="undefined",g=2048,s,k,p,h,r="characterSet",n="defaultCharset",m=(typeof encodeURIComponent!=e?encodeURIComponent:escape);
if(o.cookie.indexOf(b+"=")!=-1){p=o.cookie.split(";");
for(h=0,f=p.length;
h<f;
h++){var q=p[h].indexOf(b+"=");
if(q!=-1){a="&"+unescape(p[h].substring(q+b.length+1))
}}}t=t+"&ns__t="+(new Date().getTime());
t=t+"&ns_c="+(o[r]?o[r]:(o[n]?o[n]:""))+"&c8="+m(o.title)+a+"&c7="+m(f&&f.href?f.href:o.URL)+"&c9="+m(o.referrer);
if(t.length>g&&t.indexOf("&")>0){s=t.substr(0,g-8).lastIndexOf("&");
t=(t.substring(0,s)+"&ns_cut="+m(t.substring(s+1))).substr(0,g)
}if(o.images){k=new Image();
if(typeof ns_p==e){ns_p=k
}k.src=t
}else{o.write('<p><img src="'+t+'" height="1" width="1" alt="*"></p>')
}}function CS(){this.accountId=config.accountId;
this.siteNS=config.siteNS;
this.customVars={}
}CS.prototype.process=function(isTrackLink,yellEvent){if(isTrackLink){return
}var allEvents=[yellEvent];
while(yellEvent.nextEvent){yellEvent=yellEvent.nextEvent;
allEvents.push(yellEvent)
}for(var x=0;
x<allEvents.length;
x++){var evt=allEvents[x];
var items=evt.getPropsFor("comscore");
for(var y=0;
y<items.length;
y++){var property=items[y];
for(var z=0;
z<property.propertyDefinitions.length;
z++){this.customVars[property.propertyDefinitions[z]]=property.value
}}}};
CS.prototype.clear=function(){this.customVars={}
};
CS.prototype.send=function(){var link=["http"+(document.location.href.charAt(4)=="s"?"s://sb":"://b")];
link.push(".scorecardresearch.com/p?c1=2&c2=");
link.push(this.accountId);
if(!this.customVars.ns_site){link.push("&ns_site=");
link.push(this.siteNS)
}for(e in this.customVars){link.push("&"+e+"=");
link.push(encodeURIComponent(this.customVars[e]))
}comScore(link.join(""))
};
CS.prototype.processEcommerce=CS.prototype.process;
CS.prototype.processTrackLinkEvent=function(){};
CS.prototype.afterTrackingEventProcessed=function(){};
CS.prototype.requiresEventTimeout=false;
CS.prototype.name=HAF._int.Constants.COMSCORE;
HAF._int.providers.push(CS)
})();