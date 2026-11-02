'use strict';
const avatarOptions=[['fox','Fox','#ffe5d3'],['cat','Cat','#e4e7fb'],['panda','Panda','#ede1fb'],['penguin','Penguin','#dcebf3'],['rabbit','Rabbit','#fbdfe8'],['owl','Owl','#f8ecc8'],['turtle','Turtle','#daf0e5'],['butterfly','Butterfly','#dddffe']];
const avatarPolygons={
 fox:'<path fill="#d95b26" d="m20 23 22 10 18-8 20-8-7 34-22 31-24-27z"/><path fill="#f49543" d="m20 23 29 22-22 10zm60-6L49 45l24 6z"/><path fill="#fff3db" d="m27 55 22-10 24 6-22 31z"/><path fill="#f8bb76" d="m20 23 22 10 7 12zm60-6-20 8-11 20z"/><path fill="#30374c" d="m45 66 12-1-6 8z"/><path fill="#3b3043" d="m33 48 7 3-5 3zm26 0 7-3-4 8z"/>',
 cat:'<path fill="#6e6b9d" d="m22 17 26 16 27-16-3 39-22 25-25-23z"/><path fill="#a7a6cb" d="m22 17 26 16-23 25zm53 0-3 39-24-23z"/><path fill="#d8d6e9" d="m25 58 23-25 24 23-22 25z"/><path fill="#30374c" d="m43 62 13 0-6 8zm-13-16 10 4-6 4zm29 4 10-5-4 9z"/><path fill="#e6a6bf" d="m27 25 13 10-13 8zm43 0-11 10 12 7z"/>',
 panda:'<path fill="#353a4a" d="m21 36-4-14 16-6 10 20zm37-1 8-19 17 9-4 15z"/><path fill="#fcfbf6" d="m24 31 27-9 27 13 2 31-27 17-30-15z"/><path fill="#dcd9eb" d="m51 22 2 61-30-15 1-37z"/><path fill="#353a4a" d="m31 39 14 5-5 17-14-7zm28 4 13-3 4 14-15 7zm-15 23 15-1-7 9z"/><path fill="#fff" d="m32 47 5 0v5h-5zm31 0h5v5h-5z"/>',
 penguin:'<path fill="#303e51" d="m36 20 28-1 15 53-27 15-28-15z"/><path fill="#55677f" d="m36 20 28-1-12 68z"/><path fill="#f6f8f1" d="m41 37 14 7 7-8 8 33-18 13-18-13z"/><path fill="#f6ab57" d="m48 41 15 5-12 7zm-12 37 15 4-13 7-13-5zm17 4 16-4 7 8-19 3z"/><path fill="#fff" d="m40 30h4v5h-4zm17-1h4v5h-4z"/>',
 rabbit:'<path fill="#cc7fa7" d="m31 41-9-30 15-3 13 33zm21 0 9-33 14 5-8 35z"/><path fill="#efb3c8" d="m32 42-3-25 6-2 11 27zm25-2 8-24 5 2-7 27z"/><path fill="#e39fba" d="m27 43 26-11 23 19-7 25-23 8-23-20z"/><path fill="#f3cad4" d="m27 43 26-11-7 52-23-20z"/><path fill="#6b4160" d="m35 49 5 3-3 6zm25 3 5-3-2 8zm-17 12 12 0-6 7z"/>',
 owl:'<path fill="#aa7653" d="m23 22 26 13 26-13-4 45-22 17-22-17z"/><path fill="#d3a166" d="m23 22 26 13v49L27 67z"/><path fill="#fae8b9" d="m29 35 20 6-7 22-15-14zm20 6 20-6 4 14-16 14z"/><path fill="#3d3746" d="m32 44 9 2-5 8zm25 2 9-3-4 11z"/><path fill="#e6a04c" d="m43 59 13 0-6 11z"/><path fill="#83593e" d="m27 67 22 17-16-28zm44 0L49 84l17-28z"/>',
 turtle:'<path fill="#649780" d="m29 36-12-9-5 13 15 10zm41 0 11-10 8 13-15 13zM32 70 23 84l14 5 9-15zm32 2 8 15 13-7-12-14z"/><path fill="#93b75f" d="m31 30 30-3 18 27-12 25-32-2-14-23z"/><path fill="#4d8a6f" d="m31 30 20 23-30 1zm30-3L51 53l28 1zm-26 50 16-24 16 26z"/><path fill="#d3dca2" d="m51 39 13 13-12 16-15-16z"/><path fill="#8ab696" d="m39 25 0-15 21-3 8 14-13 13z"/><path fill="#263e40" d="m46 15h4v5h-4zm12-1h4v5h-4z"/>',
 butterfly:'<path fill="#7a77ce" d="m45 49-31-31-4 32 31 15-21 12 12 14 18-25 19 23 12-14-22-11 31-19-7-29-30 32z"/><path fill="#b6a3eb" d="m14 18 27 47-31-15zm69-2L59 64l31-19z"/><path fill="#e0b5dc" d="m41 65-21 12 12 14zm18-1 22 11-12 14z"/><path fill="#53516c" d="m46 37 8 0 3 29-7 13-7-13z"/>'
};
function avatarMarkup(choice='fox',name='',photo=''){
 if(photo&&/^data:image\/(png|jpeg|webp);base64,/.test(photo))return `<img src="${photo}" alt="" class="profile-photo">`;
 if(choice==='initials')return `<span class="avatar-initials">${escapeHTML((name||'CS').slice(0,2).toUpperCase())}</span>`;
 const option=avatarOptions.find(x=>x[0]===choice)||avatarOptions[0];
 return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="50" fill="${option[2]}"/>${avatarPolygons[option[0]]}</svg>`;
}
function displayName(){return data.profile?.displayName||currentAccount?.username||'Guest learner';}
function toggleSetting(key,title,description){return `<label class="preference-row" for="pref-${key}"><span><strong>${title}</strong><small>${description}</small></span><input type="checkbox" class="preference-switch" id="pref-${key}" data-preference="${key}" ${preferences[key]?'checked':''}></label>`;}
function settingsPage(){return `<div class="settings-page">${head('MAKE YOURSELF AT HOME','Your space. Your way.','Choose what makes learning clearer and more comfortable for you.')}<div class="personal-tabs"><a href="#profile">Profile</a><a href="#settings" aria-current="page">Appearance & accessibility</a></div>
 <section class="panel preference-panel"><div class="preference-section-heading"><span class="setting-symbol">◐</span><div><h2>Appearance</h2><p>A little more you. A little easier on the eyes.</p></div></div><fieldset class="theme-fieldset"><legend>Color theme</legend><div class="theme-choices">${[['light','☀','Light'],['dark','☾','Dark'],['system','◐','Use device setting']].map(([value,symbol,label])=>`<label class="theme-choice"><input type="radio" name="colorTheme" value="${value}" data-preference="theme" ${preferences.theme===value?'checked':''}><span class="theme-swatch theme-${value}" aria-hidden="true"><i></i><i></i><i></i></span><span><b>${symbol}</b> ${label}</span></label>`).join('')}</div></fieldset></section>
 <section class="panel preference-panel"><div class="preference-section-heading"><span class="setting-symbol">Aa</span><div><h2>Reading & accessibility</h2><p>Adjust the page to fit how you read and navigate.</p></div></div><label class="preference-row" for="pref-textSize"><span><strong>Text size</strong><small>Enlarge lessons, navigation, forms, and guide replies.</small></span><select id="pref-textSize" data-preference="textSize">${[['standard','Standard'],['large','Large'],['extra','Extra large']].map(([value,label])=>`<option value="${value}" ${preferences.textSize===value?'selected':''}>${label}</option>`).join('')}</select></label>
 ${toggleSetting('contrast','Higher contrast','Stronger text and borders for clearer separation.')}
 ${toggleSetting('spacing','Roomier reading','Add space between lines and letters in learning content.')}
 ${toggleSetting('simpleFont','Use a simple font','Use your device’s familiar system font throughout.')}
 ${toggleSetting('underlinedLinks','Underline links','Make links easier to recognize without relying on color.')}
 ${toggleSetting('reducedMotion','Reduce motion','Remove page animations. Your device’s reduced-motion setting is always respected.')}
 <div class="reading-preview"><span class="eyebrow">YOUR READING PREVIEW</span><h3>Small steps. Real understanding.</h3><p>AI learns patterns from examples. You learn by asking questions, trying ideas, and making connections.</p><a href="#lesson/learning/learn">Explore how machines learn →</a></div></section>
 <section class="panel preference-panel"><div class="preference-section-heading"><span class="setting-symbol">⌘</span><div><h2>Focus & navigation</h2><p>Keep the parts you need close by.</p></div></div>${toggleSetting('focusMode','Focus mode','Hide the guide and decorative artwork while you study. Turn it off any time.')}<div class="keyboard-tip"><strong>Keyboard friendly</strong><p>Use <kbd>Tab</kbd> to move, <kbd>Enter</kbd> to select, and <kbd>Esc</kbd> to close the menu. The first Tab reveals “Skip to learning content.”</p></div></section>
 <div class="preferences-footer"><span id="preferenceStatus" role="status">Preferences save automatically on this device${currentAccount?' for your account':''}.</span><button class="text-button" id="resetPreferences">Restore defaults</button></div></div>`;}
function profilePage(){
 if(!currentAccount)return `<div class="profile-page">${head('YOUR PROFILE','A space with your name on it.','Create an account to choose an avatar and keep your learning together.')}<section class="panel guest-profile"><span class="profile-avatar">${avatarMarkup('fox')}</span><h2>Ready to make it yours?</h2><p>You can use lessons and accessibility settings as a guest, too.</p><a href="#signup" class="button">Create account ${icon('arrow')}</a><a href="#login" class="text-button">Already have an account? Log in</a></section></div>`;
 const p=data.profile||{},name=displayName(),choice=p.avatar||'fox';
 return `<div class="profile-page">${head('YOUR LEARNING IDENTITY','Hello, '+escapeHTML(name)+'.','Make this space feel familiar. Your profile stays on this device.')}<div class="personal-tabs"><a href="#profile" aria-current="page">Profile</a><a href="#settings">Appearance & accessibility</a></div><div class="profile-grid"><section class="panel profile-overview"><span class="profile-avatar" id="profileAvatar">${avatarMarkup(choice,name,p.photo)}</span><h2 id="profileName">${escapeHTML(name)}</h2><p>@${escapeHTML(currentAccount.username)}</p><span class="pill purple">${currentAccount.view==='educator'?'Educator preview':'Student'}</span><div class="profile-stat"><strong>${completed()} <small>/ 5</small></strong><span>modules completed</span></div><a href="#progress" class="text-button">View my progress ${icon('arrow')}</a></section><div>
 <section class="panel profile-editor"><h2>The basics</h2><form id="profileForm"><div class="form-field"><label for="profileDisplayName">Display name</label><input id="profileDisplayName" name="displayName" autocomplete="nickname" maxlength="50" required value="${escapeHTML(name)}"><small>This is the name shown in your workspace.</small></div><div class="form-field"><label for="profileBio">About you <span class="optional">(optional)</span></label><textarea id="profileBio" name="bio" maxlength="180" rows="2" placeholder="A curious student, one idea at a time…">${escapeHTML(p.bio||'')}</textarea></div><div class="form-field"><label for="profileGoal">My learning goal <span class="optional">(optional)</span></label><input id="profileGoal" name="goal" maxlength="160" value="${escapeHTML(p.goal||'')}" placeholder="e.g. Understand AI well enough to use it thoughtfully"></div><button class="button small" type="submit">Save profile ${icon('check')}</button><span class="inline-save-status" id="profileStatus" role="status"></span></form></section>
 <section class="panel"><h2>Pick your study companion</h2><p class="profile-help">An origami-inspired avatar for your next chapter.</p><div class="avatar-grid">${avatarOptions.map(([key,label])=>`<button type="button" data-avatar="${key}" class="avatar-choice" aria-label="Choose ${label.toLowerCase()} avatar" aria-pressed="${choice===key&&!p.photo}">${avatarMarkup(key)}<span>${label}</span></button>`).join('')}<button type="button" data-avatar="initials" class="avatar-choice" aria-label="Use my initials" aria-pressed="${choice==='initials'&&!p.photo}">${avatarMarkup('initials',name)}<span>Initials</span></button><label class="avatar-choice upload-choice" for="profilePhoto"><span class="upload-avatar">${icon('plus')}</span><span>My photo</span><input id="profilePhoto" type="file" accept="image/png,image/jpeg,image/webp" class="sr-only"></label></div><p class="fine-print" id="avatarStatus" role="status">Avatars save when selected. Photos stay in this browser.</p></section>
 <section class="panel preference-panel"><h2>Account & device</h2><label class="preference-row" for="rememberProfile"><span><strong>Remember this device</strong><small>Stay signed in for up to 30 days. Use on your own device.</small></span><input id="rememberProfile" type="checkbox" class="preference-switch" ${isRemembered()?'checked':''}></label><p class="profile-help">Your browser can offer to save your password when you log in. ConceptStride stores a password hash, never the password itself. Accounts and work don’t sync between devices yet.</p><div class="profile-account-actions"><a href="#forgot" class="text-button">Change password</a><button type="button" class="text-button" data-auth-action="logout">Log out</button></div></section></div></div></div>`;
}
function updateFocusControl(){const el=document.getElementById('focusModeButton');if(el){el.hidden=!preferences.focusMode;el.setAttribute('aria-pressed',String(preferences.focusMode));}}
function updateAvatarUI(){
 const p=data.profile||{},name=displayName();
 document.querySelectorAll('[data-avatar]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.avatar===(p.avatar||'fox')&&!p.photo)));
 const large=document.getElementById('profileAvatar');if(large)large.innerHTML=avatarMarkup(p.avatar,name,p.photo);
 updateAccountControls();
}
document.addEventListener('change',e=>{
 const key=e.target.dataset.preference;
 if(key){setPreference(key,e.target.type==='checkbox'?e.target.checked:e.target.value);return;}
 if(e.target.id==='rememberProfile'){try{setRemembered(currentAccount,e.target.checked);toast(e.target.checked?'This device will remember you for up to 30 days.':'Remembered login removed. This tab stays signed in.');}catch{e.target.checked=false;toast('Your browser could not save this device preference.');}}
 if(e.target.id==='profilePhoto')loadProfilePhoto(e.target);
});
document.addEventListener('click',e=>{
 const avatar=e.target.closest('[data-avatar]');if(avatar){data.profile={...data.profile,avatar:avatar.dataset.avatar,photo:''};save();updateAvatarUI();document.getElementById('avatarStatus').textContent=storageOK?'Your avatar is saved.':'Storage is full. This avatar is set for the current session only.';}
 if(e.target.closest('#resetPreferences')){preferences={...preferenceDefaults};try{localStorage.removeItem(preferenceKey());}catch{}applyPreferences();render();document.getElementById('preferenceStatus').textContent='Default preferences restored.';}
 if(e.target.closest('#focusModeButton')){setPreference('focusMode',false);render();toast('Focus mode off. Your guide is back.');}
});
document.addEventListener('submit',e=>{
 if(e.target.id!=='profileForm')return;e.preventDefault();if(!e.target.reportValidity())return;
 const name=document.getElementById('profileDisplayName').value.trim();if(!name){toast('Add a display name.');return;}
 data.profile={...data.profile,displayName:name,bio:document.getElementById('profileBio').value.trim(),goal:document.getElementById('profileGoal').value.trim()};save();updateAvatarUI();
 document.getElementById('profileName').textContent=name;document.querySelector('.profile-page h1').textContent='Hello, '+name+'.';document.getElementById('profileStatus').textContent=storageOK?'Profile saved.':'Storage is full. Your profile is saved for this session only.';
});
async function loadProfilePhoto(input){
 const file=input.files?.[0];if(!file)return;
 const status=document.getElementById('avatarStatus');
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024){status.textContent='Choose a PNG, JPG, or WebP photo smaller than 5 MB.';input.value='';return;}
 const accountId=currentAccount?.id;
 try{
  const url=URL.createObjectURL(file),img=new Image();
  try{await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url;});}finally{URL.revokeObjectURL(url);}
  if(!currentAccount||currentAccount.id!==accountId)return;
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const ctx=canvas.getContext('2d'),side=Math.min(img.width,img.height);
  ctx.drawImage(img,(img.width-side)/2,(img.height-side)/2,side,side,0,0,256,256);
  data.profile={...data.profile,avatar:'photo',photo:canvas.toDataURL('image/jpeg',.85)};save();updateAvatarUI();status.textContent=storageOK?'Your photo is saved on this device.':'Storage is full. Choose an avatar instead.';
 }catch{status.textContent='That photo could not be opened. Try a different image.';}
 input.value='';
}
