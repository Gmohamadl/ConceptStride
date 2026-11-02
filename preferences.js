'use strict';
// Apply the last appearance before paint. Account-specific preferences load after auth.
const preferenceDefaults={theme:'system',textSize:'standard',contrast:false,spacing:false,reducedMotion:false,underlinedLinks:false,simpleFont:false,focusMode:false};
let preferences={...preferenceDefaults};
const deviceDark=window.matchMedia('(prefers-color-scheme: dark)');
const deviceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function applyPreferences(){
 const root=document.documentElement;
 root.dataset.theme=preferences.theme==='system'?(deviceDark.matches?'dark':'light'):preferences.theme;
 root.dataset.textSize=preferences.textSize;
 for(const key of ['contrast','spacing','underlinedLinks','simpleFont','focusMode'])root.dataset[key]=String(!!preferences[key]);
 root.dataset.reducedMotion=String(preferences.reducedMotion||deviceMotion.matches);
 try{localStorage.setItem('conceptstride-last-appearance',JSON.stringify(preferences));}catch{}
}
function preferenceKey(){return 'conceptstride-preferences-'+(currentAccount?.id||'guest');}
function loadPreferences(){
 let saved={};try{saved=JSON.parse(localStorage.getItem(preferenceKey())||'{}')||{};}catch{}
 preferences={...preferenceDefaults,...saved};
 if(!['light','dark','system'].includes(preferences.theme))preferences.theme='system';
 if(!['standard','large','extra'].includes(preferences.textSize))preferences.textSize='standard';
 applyPreferences();
}
function setPreference(key,value){
 if(!(key in preferenceDefaults))return;
 preferences[key]=value;
 let saved=true;try{localStorage.setItem(preferenceKey(),JSON.stringify(preferences));}catch{saved=false;toast('Your preference works for now, but this browser could not save it.');}
 applyPreferences();
 const status=document.getElementById('preferenceStatus');if(status)status.textContent=saved?'Preferences saved on this device.':'Preferences are set for this session only; browser storage is full.';
 if(key==='focusMode')updateFocusControl();
}
try{const cached=JSON.parse(localStorage.getItem('conceptstride-last-appearance')||'{}');preferences={...preferenceDefaults,...cached};}catch{}
applyPreferences();
deviceDark.addEventListener('change',applyPreferences);
deviceMotion.addEventListener('change',applyPreferences);
