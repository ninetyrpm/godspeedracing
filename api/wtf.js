const people=[
 [
  "🩺",
  "BP",
  "THE GOOD DOCTOR",
  "PLASTIC SURGEON · MEDICALLY CERTIFIED POWERHOUSE",
  "The nicest person you've ever met. Unclear why he continues to associate with us. Some say he's nine feet tall. Nobody has been able to independently verify this, largely because nobody can reach the top of his head."
 ],
 [
  "🪑",
  "JUSTIN",
  "THE CHAIRMAN",
  "ENERGY ANALYST · CX SANDBAGGER",
  "Understands energy markets and has an unusual appreciation for cuck chairs. We don't know how these disciplines intersect, and we are afraid to ask. Won his very first cyclocross race in Cat 5/Novice, then immediately took second in Cat 4. Apparently the rest of us have been doing this wrong."
 ],
 [
  "💩",
  "MIGUEL",
  "JOHN MAHORNEY",
  "WALKING SHITPOST · SUPREME LEADER",
  "The face of Godspeed. The fearless leader. Allegedly named Miguel. Officially John Mahorney. Nobody remembers when the bit started, and at this point it would be inappropriate to stop. Somehow built an entire cycling community despite having only recently discovered what maltodextrin is and what red lights are for."
 ],
 [
  "⚖️",
  "JOSH",
  "THE PEOPLE'S CHAMPION",
  "WEIGHT WEENIE · DOOLITTLE'S WORST NIGHTMARE",
  "Never encountered a bicycle component he couldn't make lighter. Will spend hundreds to save ten grams, then voluntarily consume a pickle capable of stripping industrial paint. Widely regarded as James Kraus' most underestimated disciple. Mostly by Josh."
 ],
 [
  "💻",
  "MITCH",
  "ZWIFT KING",
  "POWER-TO-WEIGHT RATIO: YES",
  "That boy can eat. That boy can also put down enough watts to power a modest subdivision. Frequently spotted hauling a laptop in his backpack in case work calls. The rest of us remain unconvinced it isn't full of training weights and EPO."
 ],
 [
  "🚒",
  "ZACH",
  "THE FIRE DEPARTMENT",
  "EMERGENCY CONTACT: HIMSELF",
  "A man with a massive hose and an even bigger heart. An actual firefighter whose profession has somehow become the team's entire communications protocol. One firetruck emoji can mean congratulations, condolences, race tactics, or absolutely nothing."
 ],
 [
  "📹",
  "JAMES",
  "THE DOCUMENTARIAN",
  "CAMERAMAN · RECOVERING FIXIE PURIST",
  "Somehow we convinced him to ride a bicycle with gears. Also suspiciously handy with a wrench, which means he is now the unofficial mechanic whether he likes it or not. Our most likely future velodrome champion, assuming nobody makes him shift."
 ],
 [
  "🥒",
  "MIKE",
  "THE PICKLE DEALER",
  "MBA · GAS OPERATIONS, ON AND OFF THE BIKE",
  "Our primary supplier of questionable quantities of pickled goods. Also responsible for some of the finest leadouts in the Cat 5 industry. Might not win the crit, but he'll steal a prime from under your nose."
 ]
];
const css='.hero{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;position:relative}.hero h1{flex:1;min-width:0;font-size:clamp(65px,12vw,150px)}.hero .timer{flex:0 0 208px;border:1px solid #77515e;background:#151015;display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:16px;margin:70px 0 0}.hero .timer label{font-size:10px}.hero #count{font-size:clamp(23px,3vw,35px)}.hero .small{font-size:9px;line-height:1.4}@media(max-width:700px){.hero{display:block}.hero h1{font-size:clamp(67px,16vw,115px);margin:65px 0 28px}.hero .timer{margin:0 0 55px;width:max-content;max-width:100%;gap:8px}.hero #count{font-size:32px}}*{box-sizing:border-box}body{margin:0;background:#0b0a0b;color:#f5f0f2;font-family:Arial,Helvetica,sans-serif}main{max-width:1120px;margin:auto;padding:0 25px}header{padding:25px 0;border-bottom:1px solid #54434c;display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:900;letter-spacing:.13em}header b{font-size:29px}h1{font-size:clamp(70px,14vw,180px);line-height:.82;letter-spacing:-.09em;margin:65px 0 25px;font-weight:1000}h1 span,.pink{color:#f3b8cf}.intro{font-size:clamp(20px,3vw,29px);font-weight:900;line-height:1.2}.timer{display:flex;align-items:center;flex-wrap:wrap;gap:24px;margin:55px 0 65px;padding-top:23px;border-top:1px solid #54434c}.timer label,.small{font-size:11px;letter-spacing:.15em;font-weight:900;color:#f3b8cf}#count{font-size:clamp(30px,6vw,64px);font-weight:900;font-variant-numeric:tabular-nums}.section{padding:18px 0;border-top:5px solid #f3b8cf;display:flex;justify-content:space-between;font-size:11px;font-weight:900;letter-spacing:.12em}.grid{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid #45383f;border-left:1px solid #45383f}.card{padding:38px;min-height:360px;border-right:1px solid #45383f;border-bottom:1px solid #45383f}.card:nth-child(4n+2),.card:nth-child(4n+3){background:#151115}.emoji{font-size:40px}h2{font-size:clamp(38px,5vw,72px);letter-spacing:-.07em;line-height:1;margin:25px 0 5px}.alias{font-size:clamp(20px,3vw,30px);font-weight:900;color:#f3b8cf;line-height:1.05;margin:0 0 22px}.meta{font-size:10px;letter-spacing:.1em;font-weight:900;color:#cbbdc5}.bio{font-size:clamp(15px,1.7vw,19px);line-height:1.45}footer{border-bottom:12px solid #f3b8cf;padding:70px 0 25px;font-size:clamp(35px,7vw,85px);font-weight:1000;letter-spacing:-.07em}.fine{padding:20px 0 35px;color:#968991;font-size:10px;letter-spacing:.12em}.dead{min-height:100svh;display:grid;place-content:center;text-align:center;padding:24px}.dead h1{color:#f3b8cf;margin:0 0 20px;font-size:clamp(110px,20vw,230px)}.dead p{font-size:23px;font-weight:900}.dead small{color:#aaa}.dead b{font-size:46px;margin:28px}@media(max-width:650px){.grid{grid-template-columns:1fr}.card{min-height:0;padding:30px 24px}.card:nth-child(n){background:#0b0a0b}.card:nth-child(even){background:#151115}h1{font-size:16vw}.section{font-size:9px;gap:12px}header{font-size:9px}}';
const wrap=s=>'<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>GODSPEED RACING — UNOFFICIAL TEAM ROSTER</title><style>'+css+'</style></head><body>'+s+'</body></html>';
function dossier(p){return '<article class="card"><div class="emoji">'+p[0]+'</div><h2>'+p[1]+'</h2><p class="alias">'+p[2]+'</p><p class="meta">'+p[3]+'</p><p class="bio">'+p[4]+'</p></article>';}
function live(until,pending){
 const script=pending?'':'<script>(function(){var deadline='+until+',el=document.getElementById("count");function update(){var n=Math.max(0,deadline-Date.now());if(!n){location.reload();return}var s=Math.ceil(n/1000),a=[Math.floor(s/3600),Math.floor(s%3600/60),s%60];el.textContent=a.map(function(x){return String(x).padStart(2,"0")}).join(":")}update();setInterval(update,1000)})();</script>';
 return wrap('<main><header><span>GODSPEED RACING / LOUISVILLE KY</span><b>🚒</b><span>UNOFFICIAL TEAM ROSTER</span></header><div class="hero"><h1>MEET<br>THE<br><span>PROBLEM.</span></h1><div class="timer"><label>WEBSITE SELF-DESTRUCTS IN</label><div id="count">'+(pending?'24:00:00':'--:--:--')+'</div>'+(pending?'<span class="small">PREVIEW / TIMER NOT ARMED</span>':'')+'</div></div><div class="section"><span>WHO THE FUCK ARE THESE GUYS?</span></div><section class="grid">'+people.map(dossier).join('')+'</section><footer>GODSPEED. 🚒</footer><div class="fine">THIS RECORD IS TEMPORARY.</div></main>'+script);
}
function dead(){return wrap('<div class="dead"><h1>404</h1><p>GODSPEED RACING HAS CEASED OPERATIONS.</p><small>IT WAS AVAILABLE FOR 24 HOURS. YOU HAD YOUR CHANCE.</small><b>🚒</b></div>');}
module.exports=function(req,res){
 const launch=Date.parse(process.env.GODSPEED_WTF_LAUNCH_AT||'');
 const pending=!Number.isFinite(launch);
 const expired=!pending&&Date.now()>=launch+86400000;
 res.setHeader('Content-Type','text/html; charset=utf-8');
 res.setHeader('Cache-Control','private, no-store, max-age=0');
 res.setHeader('CDN-Cache-Control','no-store');
 res.setHeader('Vercel-CDN-Cache-Control','no-store');
 res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
 res.statusCode=expired?404:200;
 res.end(expired?dead():live(launch+86400000,pending));
};
