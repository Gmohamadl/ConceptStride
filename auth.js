'use strict';
// Local demo accounts only. The browser owns the account registry, password hashes,
// and saved work. These controls do not provide server-enforced authentication.
const ACCOUNTS_KEY='conceptstride-demo-accounts-v1';
const SESSION_KEY='conceptstride-demo-session-v1';
function readAccounts(){try{const a=JSON.parse(localStorage.getItem(ACCOUNTS_KEY)||'[]');return Array.isArray(a)?a.filter(x=>x&&typeof x.id==='string'&&typeof x.username==='string'&&typeof x.hash==='string'):[];}catch{return [];}}
const REMEMBER_KEY='conceptstride-remembered-device-v1';
const REMEMBER_DAYS=30;
function readRemembered(){
 try{const saved=JSON.parse(localStorage.getItem(REMEMBER_KEY)||'null');
  if(saved&&typeof saved.id==='string'&&Number(saved.expiresAt)>Date.now())return saved;
  localStorage.removeItem(REMEMBER_KEY);
 }catch{}return null;
}
function isRemembered(){return !!currentAccount&&readRemembered()?.id===currentAccount.id;}
function setRemembered(account,remember){
 if(remember&&account)localStorage.setItem(REMEMBER_KEY,JSON.stringify({id:account.id,expiresAt:Date.now()+REMEMBER_DAYS*86400000}));
 else localStorage.removeItem(REMEMBER_KEY);
}
function restoreAccount(){
 let id;try{id=sessionStorage.getItem(SESSION_KEY);}catch{}
 if(!id)id=readRemembered()?.id;
 const account=readAccounts().find(a=>a.id===id)||null;
 if(account){try{sessionStorage.setItem(SESSION_KEY,account.id);}catch{}}
 return account;
}
let currentAccount=restoreAccount();
function workspaceStorageKey(){return currentAccount?'conceptstride-workspace-'+currentAccount.id:'conceptstride-learning-v2';}
function loadWorkspaceData(){
 let d=null;
 try{d=JSON.parse(localStorage.getItem(workspaceStorageKey())||(!currentAccount?localStorage.getItem('umoja-learning-v2'):null)||'null');}catch{}
 const out=d?.version===2?{...fresh(),...d,settings:{...fresh().settings,...d.settings}}:fresh();
 for(const key of ['progress','notes','review','submissions'])if(!out[key]||typeof out[key]!=='object'||Array.isArray(out[key]))out[key]={};
 if(!Array.isArray(out.assignments))out.assignments=[];
 return out;
}
function updateAccountControls(){
 const button=document.getElementById('accountButton'),signup=document.getElementById('signupButton');
 if(!button)return;
 const name=currentAccount?displayName():'Log in';
 button.textContent=name;
 button.setAttribute('aria-label',currentAccount?'Open profile for '+name:'Log in');
 signup.hidden=!!currentAccount;
 const avatar=document.getElementById('avatarButton');
 if(avatar){avatar.innerHTML=avatarMarkup(data.profile?.avatar||'fox',name,data.profile?.photo);avatar.setAttribute('aria-label',currentAccount?'Open my profile':'Open profile and account options');}
}
const isAuthPage=()=>['login','signup','forgot'].includes(page);
function authLogo(){return '<a class="auth-logo" href="#login"><span class="auth-logo-mark" aria-hidden="true">↗</span><span>Concept<span>Stride</span></span></a>';}
function passwordField(id,label,autocomplete){return `<div class="form-field"><label for="${id}">${label}</label><div class="password-field"><input type="password" id="${id}" name="${id.toLowerCase().includes('confirm')?'confirm-password':'password'}" required minlength="4" maxlength="72" autocomplete="${autocomplete}" aria-describedby="passwordHelp"><button type="button" class="password-toggle" data-password-toggle="${id}" aria-label="Show ${label.toLowerCase()}">Show</button></div></div>`;}
let authNotice='';
function authView(){
 let form='';
 if(page==='signup'){form=`<span class="eyebrow">MAKE ROOM FOR YOUR NEXT IDEA</span><h1>Create your account.</h1><p class="auth-intro">Your own place to learn, practice, and keep growing.</p><form id="signupForm"><div class="form-field"><label for="signupUsername">Username</label><input id="signupUsername" name="username" required minlength="3" maxlength="30" pattern="[A-Za-z0-9_-]{3,30}" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="Choose a username"><small>3–30 letters, numbers, underscores, or hyphens. Usernames ignore capitalization.</small></div>${passwordField('signupPassword','Password','new-password')}${passwordField('signupConfirm','Confirm password','new-password')}<p id="passwordHelp" class="auth-field-help">At least 4 characters. Choose a password just for ConceptStride.</p><div class="form-field"><label for="signupView">Start in</label><select id="signupView"><option value="student">Student workspace</option><option value="educator">Educator preview</option></select></div><label class="remember-row"><input type="checkbox" id="signupRemember" checked><span>Remember this device<small>Stay signed in on your own device.</small></span></label><div class="auth-error" id="authError" role="alert" hidden></div><button class="button auth-primary" type="submit">Create account ${icon('arrow')}</button></form><p class="auth-alternate">Already have an account? <a href="#login">Log in</a></p>`;}
 else if(page==='forgot'){form=`<a class="text-button auth-back" href="#login">${icon('back')} Back to login</a><span class="eyebrow">A FRESH START</span><h1>Reset your password.</h1><p class="auth-intro">Enter a username created in this browser and choose a new password.</p><div class="auth-reset-note">Device-only reset: anyone with access to this browser can reset a password saved here. No email or identity check is used.</div><form id="resetPasswordForm"><div class="form-field"><label for="resetUsername">Username</label><input id="resetUsername" required minlength="3" maxlength="30" autocomplete="username" autocapitalize="none" spellcheck="false" value="${escapeHTML(currentAccount?.username||'')}" placeholder="Your username"></div>${passwordField('resetPassword','New password','new-password')}${passwordField('resetConfirm','Confirm new password','new-password')}<p id="passwordHelp" class="auth-field-help">At least 4 characters. Your saved work stays with the username.</p><div class="auth-error" id="authError" role="alert" hidden></div><button class="button auth-primary" type="submit">Reset password ${icon('arrow')}</button></form>`;}
 else{form=`<span class="eyebrow">ONE MORE STEP FORWARD</span><h1>Welcome back.</h1><p class="auth-intro">Pick up your learning where you left off.</p>${authNotice?`<div class="auth-success" role="status">${escapeHTML(authNotice)}</div>`:''}<form id="loginForm"><div class="form-field"><label for="loginUsername">Username</label><input id="loginUsername" name="username" required maxlength="30" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="Your username"></div>${passwordField('loginPassword','Password','current-password')}<div class="auth-form-meta"><label class="remember-row"><input type="checkbox" id="loginRemember"><span>Remember this device</span></label><a href="#forgot">Forgot password?</a></div><div class="auth-error" id="authError" role="alert" hidden></div><button class="button auth-primary" type="submit">Log in ${icon('arrow')}</button></form><p class="auth-alternate">New to ConceptStride? <a href="#signup">Create an account</a></p>`;}
 return `<div class="auth-layout"><section class="auth-story">${authLogo()}<div class="auth-story-copy"><span class="auth-kicker">UNDERSTAND. PRACTICE. PROGRESS.</span><h2>Your next breakthrough<br>starts with <em>you.</em></h2><p>A focused space for learning AI, trying ideas, and keeping the questions that move you forward.</p><div class="auth-path"><div><span>01</span><p><strong>Understand the concept.</strong><small>Start with a short, clear lesson.</small></p></div><div><span>02</span><p><strong>Try it for yourself.</strong><small>Practice, get feedback, and reflect.</small></p></div><div><span>03</span><p><strong>Build on what you know.</strong><small>Keep your notes and track your progress.</small></p></div></div></div><span class="auth-story-footer">YOUR CURIOSITY. YOUR PACE.</span></section><section class="auth-form-side"><div class="auth-form-card">${form}<div class="auth-divider"><span>or</span></div><a class="auth-guest" href="#dashboard">${currentAccount?'Return to your workspace':'Explore as a guest'} ${icon('arrow-up-right')}</a><p class="auth-local-note">Your account and learning stay in this browser.<br>Use your browser’s password manager to save your password.</p><a class="auth-settings-link" href="#settings">Appearance & accessibility</a></div></section></div>`;
}
function authError(message){const el=document.getElementById('authError');if(el){el.hidden=false;el.textContent=message;}}
function validatePassword(pass,confirm){if(pass!==confirm)return 'The passwords don’t match. Please try again.';if(pass.length<4)return 'Use at least 4 characters for your password.';if(new TextEncoder().encode(pass).length>72)return 'Use a shorter password (72 bytes or fewer).';return '';}
function writeAccounts(accounts){localStorage.setItem(ACCOUNTS_KEY,JSON.stringify(accounts));}
function newAccountId(){return [...crypto.getRandomValues(new Uint8Array(16))].map(b=>b.toString(16).padStart(2,'0')).join('');}
function enterAccount(account,remember=false,created=false){
 save(); // Preserve work in the current guest/account workspace first.
 try{sessionStorage.setItem(SESSION_KEY,account.id);}catch{throw new Error('This browser cannot keep a local login session. Allow browser storage and try again.');}
 setRemembered(account,remember);
 currentAccount=account;data=loadWorkspaceData();loadPreferences();restoreChat();query='';filter='all';teacherTab='overview';reviewIndex=0;reviewRevealed=false;notebookTopic='general';authNotice='';
 sessionStorage.setItem('conceptstride-welcome',JSON.stringify({name:displayName(),created}));
 location.hash=account.view==='educator'?'teacher':'dashboard';
}
function leaveAccount(){document.getElementById('welcomeCloud')?.remove();save();try{sessionStorage.removeItem(SESSION_KEY);setRemembered(null,false);}catch{}currentAccount=null;data=loadWorkspaceData();loadPreferences();restoreChat();query='';filter='all';authNotice='You’re logged out. Your saved work is still here for your next login.';location.hash='login';}
// Password hashes are kept in the local registry; raw passwords are never saved.
document.addEventListener('submit',async e=>{
 const form=e.target;if(!['loginForm','signupForm','resetPasswordForm'].includes(form.id))return;
 e.preventDefault();if(!form.reportValidity())return;
 const submit=form.querySelector('[type=submit]'),original=submit.innerHTML;submit.disabled=true;submit.textContent='One moment…';
 try{
  const bcrypt=window.dcodeIO?.bcrypt;if(!bcrypt)throw new Error('The password helper did not load. Keep the vendor folder with your project files and reload.');
  if(form.id==='loginForm'){
   const username=document.getElementById('loginUsername').value.trim().toLowerCase();
   const account=readAccounts().find(a=>a.username.toLowerCase()===username);
   const password=document.getElementById('loginPassword').value;
   if(!account||!(await bcrypt.compare(password,account.hash))){authError('That username or password is incorrect. Try again or reset your password.');return;}
   enterAccount(account,!!document.getElementById('loginRemember')?.checked);toast('Welcome back, '+displayName()+'.');
  }else if(form.id==='signupForm'){
   const username=document.getElementById('signupUsername').value.trim(),key=username.toLowerCase(),password=document.getElementById('signupPassword').value;
   if(!/^[A-Za-z0-9_-]{3,30}$/.test(username)){authError('Choose a username using 3–30 letters, numbers, underscores, or hyphens.');return;}
   const problem=validatePassword(password,document.getElementById('signupConfirm').value);if(problem){authError(problem);return;}
   if(readAccounts().some(a=>a.username.toLowerCase()===key)){authError('That username already exists in this browser. Choose another one or log in.');return;}
   const hash=await bcrypt.hash(password,10),accounts=readAccounts();
   if(accounts.some(a=>a.username.toLowerCase()===key)){authError('That username was just created. Choose another one.');return;}
   const account={id:newAccountId(),username,hash,view:document.getElementById('signupView').value,createdAt:new Date().toISOString()};
   writeAccounts([...accounts,account]);enterAccount(account,!!document.getElementById('signupRemember')?.checked,true);toast('Account created. You’re ready to learn.');
  }else{
   const username=document.getElementById('resetUsername').value.trim().toLowerCase(),password=document.getElementById('resetPassword').value;
   const problem=validatePassword(password,document.getElementById('resetConfirm').value);if(problem){authError(problem);return;}
   if(!readAccounts().some(a=>a.username.toLowerCase()===username)){authError('That username hasn’t been created in this browser. You can create a new account instead.');return;}
   const hash=await bcrypt.hash(password,10),accounts=readAccounts(),account=accounts.find(a=>a.username.toLowerCase()===username);
   if(!account){authError('That local account is no longer available.');return;}
   account.hash=hash;writeAccounts(accounts);if(readRemembered()?.id===account.id)setRemembered(null,false);
   if(currentAccount)leaveAccount();
   authNotice='Password reset. Log in with your new password. No verification was needed.';
   if(location.hash==='#login')render();else location.hash='login';
  }
 }catch(err){authError(err?.message||'Browser storage is unavailable. Please allow storage for this page and try again.');}
 finally{submit.disabled=false;submit.innerHTML=original;}
});
document.addEventListener('click',e=>{
 const toggle=e.target.closest('[data-password-toggle]');if(toggle){const input=document.getElementById(toggle.dataset.passwordToggle);const showing=input.type==='password';input.type=showing?'text':'password';toggle.textContent=showing?'Hide':'Show';toggle.setAttribute('aria-label',(showing?'Hide ':'Show ')+input.labels[0].textContent.toLowerCase());return;}
 if(e.target.closest('[data-auth-action="logout"]'))leaveAccount();
 if(e.target.closest('#accountButton'))location.hash=currentAccount?'profile':'login';
 if(e.target.closest('#avatarButton'))location.hash='profile';
 if(e.target.closest('#signupButton')){authNotice='';location.hash='signup';}
});

// Each successful sign-in creates one dismissible greeting. Reloads do not repeat it.
function showWelcomeCloud(){
 if(isAuthPage())return;
 let name;try{name=sessionStorage.getItem('conceptstride-welcome');sessionStorage.removeItem('conceptstride-welcome');}catch{return;}
 if(!name)return;
 let greeting;try{greeting=JSON.parse(name);}catch{greeting={name,created:true};}
 document.getElementById('welcomeCloud')?.remove();
 const cloud=document.createElement('section');cloud.id='welcomeCloud';cloud.className='welcome-cloud';cloud.setAttribute('role','status');
 cloud.innerHTML=`<button type="button" class="welcome-close" aria-label="Close welcome message">×</button><span class="welcome-cloud-icon" aria-hidden="true">☁</span><div><strong>${greeting.created?'Welcome to ConceptStride':'Welcome back'}, ${escapeHTML(greeting.name)}!</strong><p>${greeting.created?'Thank you for signing up. Your learning space is ready.':'Your learning is right where you left it.'} Start a lesson, explore an idea, and make it your own.</p></div>`;
 cloud.querySelector('button').addEventListener('click',()=>cloud.remove());document.body.append(cloud);
}
