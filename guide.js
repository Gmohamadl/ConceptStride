'use strict';
// A transparent, offline course guide. No provider keys or invented AI connectivity.
const guideWelcome='Hi, I’m Stride Guide. Ask me about AI, machine learning, prompts, checking answers, or responsible use.\n\nI can explain a concept, give an example, review a prompt, or ask you a quick question. What are you curious about?';
const guideTopics={
 ai:{terms:/\b(ai|artificial intelligence|predict\w*|generat\w*)\b/i,simple:'AI is software that uses patterns to make predictions, recognize things, or create content. It can produce useful results without understanding the world the way a person does.',examples:['A map app predicts traffic from travel data. A text generator creates a new route summary. Prediction estimates an outcome; generation creates content.','Your phone groups similar photos. A writing tool drafts a caption. They use patterns, but their tasks and outputs differ.'],quiz:{question:'A tool estimates tomorrow’s bus arrival time from past journeys. Is it mainly predicting or generating?',accept:/predict|estim|forecast/i,explanation:'It estimates a future outcome from data. That makes prediction its main task.'}},
 learning:{terms:/\b(machine learning|train\w*|dataset|data|model|supervised|unsupervised|overfit\w*|learn\w*|neural|deep learning|algorithm|label\w*|feature\w*)\b/i,simple:'A machine-learning model learns patterns from examples. During training it adjusts its parameters to reduce errors. Then we test it on examples it has not seen to find out how useful those patterns are.',examples:['Think of learning to spot spam. Training messages provide examples. A separate test set checks whether the model can handle unfamiliar messages.','A model estimates house prices from past sales. Test it on sales kept out of training. If it memorizes the training houses, it may struggle with a new one.'],quiz:{question:'Your model does perfectly on its training examples. Should you test on the same examples or on held-out examples? Why?',accept:/held|unseen|new|separate|not seen|did not|didn.t|different/i,explanation:'Use held-out examples. Familiar examples can hide memorization, also called overfitting.'}},
 prompts:{terms:/\b(prompt\w*|instruction\w*|context|output format)\b/i,simple:'A prompt is the instruction you give an AI tool. Say what you need, add relevant context, and describe the audience or format. Then review and refine the output.',examples:['Vague: “Help with AI.” Clearer: “Explain machine learning to a beginner in three short bullets using a spam-filter example.”','For a study plan: “I have 20 minutes today. Give me a three-step review of AI basics and one question to check my understanding.”'],quiz:{question:'Which prompt is clearer: “Explain AI” or “Explain AI to a beginner in three bullets with one example”? What extra direction helps?',accept:/second|2|beginner|three|3|audience|format|example|bullets/i,explanation:'The second prompt gives an audience, a format, and a request for an example. You still need to check the result.'}},
 verification:{terms:/\b(hallucin\w*|verif\w*|trust\w*|accur\w*|source\w*|citation\w*|statistic\w*|fact\w*|confab\w*|check\w*)\b/i,simple:'An AI answer can sound confident and still be wrong. Identify its key claim, open a reliable original source, and check that the source actually supports the claim in context.',examples:['A chatbot cites a statistic about students. Find the original study, check the date and sample, and see whether it reports that number.','A generated answer includes a quotation. Open the original text and check the wording. A plausible quotation is not proof that someone said it.'],quiz:{question:'Two chatbots agree on a statistic. Is that enough evidence, or should you open an original reliable source?',accept:/original|reliable|source|not enough|no\b|paper|study|evidence/i,explanation:'Open the original reliable source. Agreement between generated answers is not independent verification.'}},
 ethics:{terms:/\b(bias\w*|fair\w*|ethic\w*|responsib\w*|privacy|harm\w*|discrimin\w*|consent)\b/i,simple:'Responsible AI means thinking about the people affected by a system. Ask who benefits, who might be harmed or excluded, what data is used, and how someone can question a decision.',examples:['A scholarship model trained mostly on one type of school may make more errors for other students. Check outcomes across groups and provide human review.','Before pasting a classmate’s work into an AI tool, consider permission and privacy. Share only what is necessary and follow your course rules.'],quiz:{question:'A model has high average accuracy but makes more mistakes for one group. Should you ignore it or examine that group’s outcomes and provide review?',accept:/examin|review|group|assess|investig|not ignore|don.t ignore|second|latter/i,explanation:'Look beyond the average. Evaluate the affected group’s outcomes, involve people affected, and provide a way to challenge decisions.'}}
};
const guideGlossary=[
 [/\b(neural network|deep learning)\b/i,'A neural network is a model made of connected layers of mathematical operations. Training adjusts weights so its outputs better fit examples. Deep learning uses networks with multiple layers. It is inspired loosely by brains, but it is not a human brain.','learning'],
 [/\b(overfit\w*|memoriz\w*)\b/i,'Overfitting happens when a model fits its training examples too closely, including noise or quirks, and does worse on new data. Compare training and held-out performance. More representative data, simpler models, and regularization can help.','learning'],
 [/\b(unsupervised)\b/i,'Unsupervised learning looks for structure in data without supplied target labels. For example, clustering can group similar songs. The groups still need interpretation and evaluation.','learning'],
 [/\b(reinforcement learning)\b/i,'Reinforcement learning trains an agent using feedback called rewards as it takes actions. The goal is to learn a policy that improves reward over time. For example, a game-playing agent learns which actions lead to better outcomes.','learning'],
 [/\b(supervised|label\w*)\b/i,'Supervised learning uses examples with known target answers, or labels. A spam message labeled “spam” is one example. The model learns the relationship between input features and those labels.','learning'],
 [/\b(llm|large language model|token\w*)\b/i,'A large language model learns statistical patterns in text and generates text token by token. A token is a piece of text, sometimes a word or part of one. Fluent output can still contain mistakes, so check important claims.','ai'],
 [/\b(algorithm)\b/i,'An algorithm is a set of steps for solving a task. A machine-learning algorithm is a procedure for learning a model’s parameters from data. The trained model then uses those parameters to produce outputs.','learning'],
 [/\b(classification|regression)\b/i,'Classification predicts a category, such as spam or not spam. Regression predicts a numeric value, such as tomorrow’s temperature. Both can be supervised-learning tasks.','learning'],
 [/\b(hallucin\w*|confab\w*)\b/i,'An AI hallucination is a plausible but false or unsupported generated statement. It can include invented sources or quotations. Check important claims against reliable original evidence; confidence is not proof.','verification'],
 [/\b(bias)\b/i,'AI bias can show up as systematic differences in errors or treatment between groups. It may come from data, labels, design choices, or the context of use. Check performance for affected groups rather than relying only on an average.','ethics'],
 [/\b(privacy|personal data)\b/i,'For privacy, share only the information needed for a task. Avoid posting passwords, student records, or other people’s personal information into AI tools. Check permission, course rules, and how the tool handles data.','ethics']
];
function guideState(){
 if(!data.guideState||typeof data.guideState!=='object')data.guideState={topicId:'ai'};
 if(!guideTopics[data.guideState.topicId])data.guideState.topicId='ai';
 return data.guideState;
}
function guideContextTopic(){return page==='lesson'?lesson.id:page==='review'?lessons[reviewIndex].id:page==='notebook'&&guideTopics[notebookTopic]?notebookTopic:guideState().topicId;}
function appendChatNode(message){
 const node=document.createElement('div');node.className='chat-bubble '+(message.who==='user'?'user':'assistant');
 const content=document.createElement('p');content.textContent=message.text;node.append(content);
 if(message.who!=='user'&&guideTopics[message.topicId]){
  const l=lessons.find(l=>l.id===message.topicId),link=document.createElement('a');link.href='#lesson/'+l.id+'/learn';link.textContent='Revisit: '+l.title+' →';link.className='chat-lesson-link';node.append(link);
 }
 $('#chatLog').append(node);
}
function addChat(text,who='assistant',topicId=null){
 if(!Array.isArray(data.chat))data.chat=[];
 const message={text:String(text).slice(0,6000),who:who==='user'?'user':'assistant',topicId:guideTopics[topicId]?topicId:null};
 data.chat.push(message);data.chat=data.chat.slice(-30);appendChatNode(message);
 while($('#chatLog').children.length>30)$('#chatLog').firstElementChild.remove();
 $('#chatLog').scrollTop=$('#chatLog').scrollHeight;
}
function restoreChat(){
 if(!document.getElementById('chatLog'))return;
 $('#chatLog').replaceChildren();
 data.chat=(Array.isArray(data.chat)?data.chat:[]).filter(m=>m&&typeof m.text==='string'&&['user','assistant'].includes(m.who)).slice(-30);
 if(!data.chat.length)data.chat.push({text:guideWelcome,who:'assistant'});
 data.chat.forEach(appendChatNode);$('#chatInput').value='';
}
function reviewPrompt(text){
 const candidate=text.replace(/^.*?\b(?:review|improve|check)\s+(?:my |this )?prompt\s*[:—-]?\s*/i,'').trim();
 if(candidate.length<12||candidate===text&&text.length<25)return 'Paste your draft after “Review my prompt:”. I’ll check for a clear task, audience, context, and output format.\n\nExample: Review my prompt: Explain AI.';
 const task=/\b(explain|write|compare|summari[sz]e|list|plan|describe|create|help|give|teach|analyse|analyze)\b/i.test(candidate),audience=/\b(beginner|student|year|grade|audience|expert|child|kid|new to)\b/i.test(candidate),format=/\b(bullet|paragraph|table|step|sentence|word|short|list|\d+)\b/i.test(candidate);
 return 'Here’s a prompt check:\n\n'+(task?'✓ The task is stated.':'• Add a task: explain, compare, summarize, or plan.')+'\n'+(audience?'✓ There is an audience or level.':'• Say who it is for, such as a beginner.')+'\n'+(format?'✓ There is some direction on format or length.':'• Specify a format or length, such as three bullets.')+'\n\nAdd any necessary context and say how you will check the result. Clearer directions help, but they don’t guarantee accuracy.';
}
function reply(text){
 if(disabledGuide())return 'The guide is paused for independent work. Write your own explanation, then revisit the lesson afterward.';
 const q=text.toLowerCase().trim(),state=guideState();
 let id=guideContextTopic(),explicit=Object.keys(guideTopics).find(key=>guideTopics[key].terms.test(q));
 // Prefer the most specific topic over a generic mention of AI or learning.
 for(const key of ['ethics','verification','prompts','learning'])if(guideTopics[key].terms.test(q)){explicit=key;break;}
 if(explicit)id=explicit;else if(/\b(it|that|another|again)\b/.test(q))id=state.topicId;
 const topic=guideTopics[id],l=lessons.find(l=>l.id===id);
 if(state.quiz&&((explicit&&explicit!==state.quiz.topicId&&/^(what|how|why|explain|define|tell)\b/.test(q))))state.quiz=null;
 state.topicId=id;
 if(/^(hi|hello|hey|yo|good morning)[!. ]*$/.test(q)){state.source=null;return 'Hey'+(currentAccount?', '+displayName():'')+'! What are you working on? Try “What is AI?”, “Explain overfitting”, or “Review my prompt: …”.';}
 if(/^(thanks|thank you|ty)[!. ]*$/.test(q)){state.source=null;return 'You’re welcome. Keep asking questions—each one is another step forward.';}
 if(/\b(how (do|can) i|where (is|are|can)).*(navigate|profile|avatar|dark|light|setting|notebook|module|progress)|\b(dark mode|accessibility|change (my )?avatar)\b/.test(q)){state.source=null;return 'Use Settings & accessibility in the sidebar for themes, text size, contrast, and focus mode. Click your avatar for your profile. Learning modules contains the five lessons, and My notebook keeps your ideas. On mobile, open the menu at the top left.';}
 if(/\b(write my|do my|give (me )?(the )?(final |correct )?answer|solve (my|this)|complete (my|the) assignment|write (my |the |an )?essay)\b/.test(q)){state.source=id;return 'I can help you reason it through, but your submitted explanation should be your own.\n\n'+l.hint+'\n\nWhat is your first thought? Tell me which part is unclear.';}
 if(/\b(review|improve|check)\b.*\bprompt\b/.test(q)){state.topicId='prompts';state.source='prompts';return reviewPrompt(text);}
 if(/\b(skip|stop|cancel)\b.*\bquiz\b/.test(q)){const prev=state.quiz;state.quiz=null;state.source=prev?.topicId||id;return prev?guideTopics[prev.topicId].quiz.explanation:'No quiz is active. Ask me to explain a concept or give an example.';}
 if(/\b(quiz|test me|ask me|practice question)\b/.test(q)){state.quiz={topicId:id,attempts:0};state.source=id;return 'Quick check · '+l.topic+'\n\n'+topic.quiz.question+'\n\nReply in your own words. This is practice, not a graded assessment.';}
 if(state.quiz&&!/\b(hint|example|simpl|explain|skip|stop|cancel)\b/.test(q)&&! /^(what|how|why|tell|define)\b/.test(q)){
  const active=guideTopics[state.quiz.topicId];state.source=state.quiz.topicId;state.topicId=state.quiz.topicId;
  if(active.quiz.accept.test(q)){state.quiz=null;return 'You’ve identified the key idea.\n\n'+active.quiz.explanation+'\n\nAsk for another question or revisit the lesson to keep practicing.';}
  state.quiz.attempts++;return 'Let’s look at it another way.\n\n'+lessons.find(l=>l.id===state.quiz.topicId).hint+'\n\nTry a short explanation, or say “skip quiz” to see the key idea.';
 }

 state.source=id;
 if(/\bhint\b/.test(q)){if(page==='lesson'){data.progress[lesson.id]={...record(lesson.id),hints:(record(lesson.id).hints||0)+1};}return l.hint+'\n\nWhat would you try first?';}
 if(/\bexample\b/.test(q)){state.exampleIndex=(state.exampleIndex||0)+1;return topic.examples[(state.exampleIndex-1)%topic.examples.length]+'\n\nWhat goes in, and what comes out?';}
 const glossary=guideGlossary.find(([pattern])=>pattern.test(q));
 if(glossary){state.topicId=glossary[2];state.source=glossary[2];return glossary[1]+'\n\nWant an everyday example or a quick question?';}
 if(/\b(difference|vs\.?|versus)\b/.test(q)&&/ai/.test(q)&&/machine learning|\bml\b/.test(q)){state.source='ai';state.topicId='ai';return 'AI is the broad field of systems that perform tasks such as recognizing patterns or generating content. Machine learning is one way to build AI: models learn patterns from examples. Deep learning is a type of machine learning using multilayer neural networks.\n\nAI → machine learning → deep learning.';}
 if(explicit||/\b(simple|simpler|simply|explain|again|confused|understand|that|it)\b/.test(q))return topic.simple+'\n\n'+(/simple|simply|confused/.test(q)?'Try putting the idea into one sentence. I can also give an everyday example.':l.key+'\n\nWould an example or a short practice question help?');
 state.source=null;return 'I don’t have a reliable course answer for that yet. I’m a lesson-based guide, not a live AI model.\n\nTry an AI concept such as “What is a neural network?”, “How do I check an AI answer?”, or “Review my prompt: …”. If you meant the last topic, say “explain it simply”.';
}
function sendChat(text){
 text=String(text||'').trim().slice(0,1200);if(!text||disabledGuide())return;
 addChat(text,'user');const answer=reply(text);addChat(answer,'assistant',guideState().source);$('#chatInput').value='';save();
}
document.addEventListener('click',e=>{
 if(e.target.closest('#clearChat')){
  if(disabledGuide()){toast('The guide is paused during independent work.');return;}
  data.chat=[];data.guideState={topicId:guideContextTopic()};restoreChat();save();toast('A fresh conversation is ready.');
 }
 if(e.target.closest('#guideMobileToggle')){
  const control=document.getElementById('guideMobileToggle'),open=control.getAttribute('aria-expanded')!=='true';
  control.setAttribute('aria-expanded',String(open));document.getElementById('guideChatBody').hidden=!open;control.querySelector('span').textContent=open?'−':'+';
 }
});

window.matchMedia('(max-width: 760px)').addEventListener('change',e=>{
 if(!e.matches){document.getElementById('guideChatBody').hidden=false;const toggle=document.getElementById('guideMobileToggle');toggle.setAttribute('aria-expanded','true');toggle.querySelector('span').textContent='−';}
});
