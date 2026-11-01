/* Valley Pure deals calendar — embed.js
   Usage on any page:
     <div id="vp-deals"></div>
     <script src="https://YOURNAME.github.io/vp-deals/embed.js" defer></script>
   Reads deals.json from the same folder as this script. Optional attributes on the <div>:
     data-src="https://.../deals.json"   load a different data file
     data-store="woodlake"               force a default store
*/
(function () {
  'use strict';
  var script = document.currentScript;
  var host = document.getElementById('vp-deals');
  if (!host) { host = document.createElement('section'); host.id = 'vp-deals'; (script ? script.parentNode : document.body).insertBefore(host, script || null); }
  host.setAttribute('aria-label', 'Valley Pure deals calendar');
  var src = host.getAttribute('data-src') || (script && script.src ? new URL('deals.json', script.src).href : 'deals.json');

  /* ---------- styles (scoped to #vp-deals) ---------- */
  var CSS = '\
#vp-deals{--bg:#FFFFFF;--bg-2:#F6F8F5;--bg-3:#ECF0EA;--line:#DCE3D9;--line-2:#C3CCBF;--tx:#2E2E2E;--tx-2:#5F665F;--tx-3:#8A928B;--vp:#043B21;--vp-2:#0B5A33;--acc:#519F45;--pusha:#E4632B;--pusha-soft:rgba(228,99,43,.10);--ld-red:#C7352D;--ld-blue:#24427E;--mon:#1F8A8A;--tue:#2F5FD0;--wed:#D33E7C;--thu:#4A4F57;--fri:#2E9E4F;--sat:#C7352D;--sun:#7846C7;--shadow:0 10px 30px rgba(4,59,33,.12);background:var(--bg);color:var(--tx);font-family:"Montserrat","Helvetica Neue",Arial,sans-serif;font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased;padding:32px 18px 56px;box-sizing:border-box;text-align:left}\
#vp-deals *,#vp-deals *::before,#vp-deals *::after{box-sizing:border-box}\
#vp-deals button{font:inherit;color:inherit;cursor:pointer;background:none;border:0;padding:0;margin:0;text-transform:none;letter-spacing:normal;line-height:inherit;box-shadow:none;border-radius:0}\
#vp-deals a{color:inherit}#vp-deals :focus-visible{outline:2px solid var(--acc);outline-offset:2px}\
#vp-deals h2,#vp-deals h4,#vp-deals p{margin:0;padding:0;color:inherit;letter-spacing:normal;text-transform:none}\
#vp-deals .in{max-width:1180px;margin:0 auto}\
#vp-deals .hd{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:20px}\
#vp-deals .kicker{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--acc);font-weight:700}\
#vp-deals h2.ttl{font-family:"Montserrat","Helvetica Neue",Arial,sans-serif;font-weight:600;font-size:40px;line-height:1.05;margin:6px 0 10px;letter-spacing:.14em;text-transform:uppercase;color:var(--vp)}\
#vp-deals h2.ttl span{color:var(--acc)}\
#vp-deals .lede{color:var(--tx-2);max-width:56ch;font-size:15px}\
#vp-deals .store{display:grid;gap:8px}\
#vp-deals .store .l{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--tx-3);font-weight:700}\
#vp-deals .stores{display:flex;flex-wrap:wrap;gap:6px}\
#vp-deals .stores button{border:2px solid var(--vp);padding:8px 16px;font-weight:700;font-size:13px;color:var(--vp);background:#fff;transition:all .15s ease}\
#vp-deals .stores button:hover{background:var(--bg-3)}\
#vp-deals .stores button[aria-pressed="true"]{background:var(--vp);color:#fff}\
#vp-deals .feat{display:grid;grid-template-columns:1.35fr 1fr;gap:12px;margin-bottom:24px}\
#vp-deals .feat.one{grid-template-columns:1fr}\
#vp-deals .house{border:2px solid var(--vp);background:#fff;padding:18px 20px;display:grid;grid-template-columns:auto 1fr;gap:6px 16px;align-items:start;position:relative}\
#vp-deals .house .lg{grid-row:1/span 2;width:72px;height:72px;background:var(--vp);display:grid;place-items:center}\
#vp-deals .house .lg img{width:60px;height:auto;display:block}\
#vp-deals .house .ey{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:var(--acc)}\
#vp-deals .house .tt{font-weight:800;font-size:17px;line-height:1.15;text-transform:uppercase;letter-spacing:.04em;color:var(--vp);margin-top:2px}\
#vp-deals .house .items{grid-column:1/-1;display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px;margin-top:10px}\
#vp-deals .house .it{background:#F1F8EF;border-left:4px solid var(--acc);padding:10px 12px}\
#vp-deals .house .it b{display:block;font-weight:900;font-size:22px;line-height:1;color:var(--vp);letter-spacing:-.01em}\
#vp-deals .house .it span{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:800;color:var(--tx-2);margin-top:6px}\
#vp-deals .house .it em{display:block;font-style:normal;font-size:12.5px;color:var(--tx);margin-top:3px;font-weight:600}\
#vp-deals .house .go{grid-column:1/-1;justify-self:start;margin-top:10px;background:var(--vp);color:#fff;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:10px 14px;display:inline-flex;gap:8px;align-items:center}\
#vp-deals .house .go:hover{background:var(--acc)}\
#vp-deals .sec .st h4.hs{color:var(--acc)}\
#vp-deals .deal.house-row{border-color:var(--acc);border-left:4px solid var(--acc);background:#F1F8EF}\
#vp-deals .today{background:var(--vp);color:#fff;padding:22px 24px;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center}\
#vp-deals .today::before{content:"";position:absolute;inset:0 auto 0 0;width:8px;background:var(--c,var(--acc))}\
#vp-deals .today .l{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.7);font-weight:700}\
#vp-deals .today .big{font-weight:700;font-size:24px;line-height:1.2;margin:6px 0 6px;text-transform:uppercase;letter-spacing:.04em}\
#vp-deals .today .big em{font-style:normal;color:var(--c,var(--acc))}\
#vp-deals .today .rest{color:rgba(255,255,255,.82);font-size:13.5px}\
#vp-deals .today .go{background:#fff;color:var(--vp);font-weight:700;padding:13px 18px;font-size:13px;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}\
#vp-deals .today .go:hover{background:var(--acc);color:#fff}\
#vp-deals .pusha{border:2px solid var(--pusha);padding:20px 22px;background:linear-gradient(135deg,rgba(228,99,43,.12),rgba(228,99,43,.02));display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center}\
#vp-deals .pusha .brand{font-weight:900;font-size:24px;line-height:1;letter-spacing:.04em;color:var(--pusha);font-style:italic;text-transform:uppercase}\
#vp-deals .pusha .what{font-weight:700;font-size:15px;line-height:1.2;margin-top:6px;text-transform:uppercase;letter-spacing:.03em}\
#vp-deals .pusha .sub{font-size:12.5px;color:var(--tx-2);margin-top:6px}\
#vp-deals .pusha .price{text-align:right}\
#vp-deals .pusha .price b{font-weight:900;font-size:40px;line-height:1;color:var(--pusha);display:block}\
#vp-deals .pusha .price span{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--tx-2);font-weight:700}\
#vp-deals .tools{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}\
#vp-deals .legend{display:flex;gap:8px 14px;flex-wrap:wrap;font-size:11.5px;color:var(--tx-2);font-weight:600}\
#vp-deals .legend i{display:inline-block;width:10px;height:10px;margin-right:5px;vertical-align:-1px;background:var(--c)}\
#vp-deals .legend i.ld{background:linear-gradient(90deg,var(--ld-red) 50%,var(--ld-blue) 50%)}\
#vp-deals .finder{display:flex;align-items:center;gap:8px}\
#vp-deals .finder label{font-size:12.5px;color:var(--tx-2);font-weight:700;margin:0}\
#vp-deals .finder select{font:inherit;font-size:13px;font-weight:700;color:var(--vp);background:#fff;border:2px solid var(--vp);padding:8px 34px 8px 12px;appearance:none;-webkit-appearance:none;margin:0;border-radius:0;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' fill=\'none\' stroke=\'%23043B21\' stroke-width=\'2\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}\
#vp-deals .finder .x{font-size:12.5px;color:var(--acc);text-decoration:underline;text-underline-offset:3px;display:none;font-weight:700}\
#vp-deals .finder .x.on{display:inline}\
#vp-deals .earlier{display:none;width:100%;align-items:center;justify-content:space-between;gap:10px;border:1px dashed var(--line-2);background:var(--bg-2);padding:10px 14px;margin-bottom:6px;font-size:12.5px;font-weight:700;color:var(--tx-2);text-align:left}\
#vp-deals .earlier span{color:var(--acc)}\
#vp-deals .dows{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:6px}\
#vp-deals .dows div{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--tx-3);font-weight:700;padding:0 4px}\
#vp-deals .grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}\
#vp-deals .day{position:relative;text-align:left;background:#fff;border:1px solid var(--line);min-height:132px;padding:12px 11px 10px;display:flex;flex-direction:column;gap:5px;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease,opacity .2s ease;overflow:hidden;width:100%}\
#vp-deals .day::before{content:"";position:absolute;left:0;right:0;top:0;height:5px;background:var(--c)}\
#vp-deals .day.ld::before{background:repeating-linear-gradient(90deg,var(--ld-red) 0 10px,#fff 10px 14px,var(--ld-blue) 14px 24px,#fff 24px 28px)}\
#vp-deals .day.blank{background:var(--bg-2);border-style:dashed;cursor:default}\
#vp-deals .day.blank::before{display:none}\
#vp-deals .day.past{opacity:.45}\
#vp-deals .day:not(.blank):hover{transform:translateY(-2px);box-shadow:var(--shadow);border-color:var(--line-2)}\
#vp-deals .day.is-today{border-color:var(--vp);box-shadow:0 0 0 2px var(--vp)}\
#vp-deals .day.hit{border-color:var(--acc);background:#F1F8EF;opacity:1}\
#vp-deals .day.miss{opacity:.25}\
#vp-deals .day .n{display:flex;justify-content:space-between;align-items:baseline}\
#vp-deals .day .n b{font-weight:800;font-size:19px;line-height:1;color:var(--vp)}\
#vp-deals .day .n span{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--c)}\
#vp-deals .day .n span.tdy{background:var(--vp);color:#fff;padding:3px 6px}\
#vp-deals .day .h{font-weight:700;font-size:14px;line-height:1.2;text-transform:uppercase;letter-spacing:.02em}\
#vp-deals .day .h em{font-style:normal;color:var(--c)}\
#vp-deals .day .h.ld em{color:var(--ld-red)}\
#vp-deals .day .h em.ph{color:var(--pusha)}\
#vp-deals .day .h.tbd em{color:var(--tx-3)}\
#vp-deals .tbdn{font-size:13px;color:var(--tx-2);background:var(--bg-2);border:1px dashed var(--line-2);padding:12px 14px}\
#vp-deals .day .m{font-size:11.5px;color:var(--tx-2);line-height:1.35}\
#vp-deals .day .more{margin-top:auto;font-size:11px;color:var(--acc);font-weight:700}\
#vp-deals .day .hitb{position:absolute;right:8px;bottom:8px;font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:var(--acc);color:#fff;padding:3px 6px;display:none}\
#vp-deals .day.hit .hitb{display:block}\
#vp-deals .ov{position:fixed;inset:0;background:rgba(4,59,33,.55);z-index:99998;display:none}\
#vp-deals .ov.on{display:block}\
#vp-deals .md{position:fixed;z-index:99999;top:50%;left:50%;transform:translate(-50%,-50%);width:min(680px,calc(100% - 24px));max-height:min(88vh,900px);overflow:auto;background:#fff;border:1px solid var(--line-2);box-shadow:var(--shadow);display:none;color:var(--tx)}\
#vp-deals .md.on{display:block}\
#vp-deals .md .band{position:sticky;top:0;background:var(--c,var(--vp));color:#fff;padding:18px 22px 16px;display:grid;grid-template-columns:1fr auto;gap:12px;align-items:start;z-index:1}\
#vp-deals .md .band.ld{background:linear-gradient(100deg,var(--ld-red),var(--ld-blue));color:#fff}\
#vp-deals .md .band.ph{background:var(--pusha);color:#fff}\
#vp-deals .md .band .k{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;font-weight:800;opacity:.85}\
#vp-deals .md .band .d{font-weight:800;font-size:26px;line-height:1.1;margin:6px 0 4px;text-transform:uppercase;letter-spacing:.06em}\
#vp-deals .md .band .s{font-weight:600;font-size:13px;opacity:.9}\
#vp-deals .md .band .cl{background:rgba(255,255,255,.18);width:34px;height:34px;display:grid;place-items:center;font-size:18px;line-height:1;font-weight:700;color:#fff}\
#vp-deals .md .band .cl:hover{background:rgba(255,255,255,.32)}\
#vp-deals .md .nav{display:flex;justify-content:space-between;padding:12px 22px 0}\
#vp-deals .md .nav button{font-size:12.5px;color:var(--tx-2);font-weight:700}\
#vp-deals .md .nav button:hover{color:var(--vp)}\
#vp-deals .md .bd{padding:12px 22px 24px;display:grid;gap:20px}\
#vp-deals .sec .st{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:8px}\
#vp-deals .sec .st h4{font-weight:700;font-size:15px;letter-spacing:.14em;text-transform:uppercase;line-height:1.2;color:var(--vp)}\
#vp-deals .sec .st h4.ld{background:linear-gradient(90deg,var(--ld-red),var(--ld-blue));-webkit-background-clip:text;background-clip:text;color:transparent}\
#vp-deals .sec .st h4.ph{color:var(--pusha)}\
#vp-deals .sec .st small{font-size:12px;color:var(--tx-3);font-weight:600}\
#vp-deals .deals{display:grid;gap:6px}\
#vp-deals .deal{display:grid;grid-template-columns:62px 1fr auto;gap:12px;align-items:center;background:var(--bg-2);border:1px solid var(--line);padding:10px 12px}\
#vp-deals .deal .pct{font-weight:900;font-size:20px;line-height:1;color:var(--c,var(--vp));text-align:center;letter-spacing:-.01em}\
#vp-deals .deal .pct.sm{font-size:14px}\
#vp-deals .deal.top{border-color:var(--c,var(--vp));background:linear-gradient(90deg,color-mix(in srgb,var(--c,var(--vp)) 12%,#fff),var(--bg-2))}\
#vp-deals .deal .b{font-weight:700;font-size:14.5px;line-height:1.2}\
#vp-deals .deal .o{font-size:12px;color:var(--tx-2);margin-top:2px}\
#vp-deals .deal .shop{display:inline-flex;align-items:center;gap:6px;background:var(--vp);color:#fff;padding:8px 12px;font-size:12px;font-weight:700;text-decoration:none;white-space:nowrap;transition:all .15s ease}\
#vp-deals .deal .shop:hover{background:var(--acc);color:#fff}\
#vp-deals .deal .shop svg{width:11px;height:11px}\
#vp-deals .shops{display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-end;max-width:220px}\
#vp-deals .shops a{border:1.5px solid var(--vp);padding:4px 8px;font-size:11px;font-weight:700;text-decoration:none;color:var(--vp)}\
#vp-deals .shops a:hover{background:var(--vp);color:#fff}\
#vp-deals .md .allbtn{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--vp);color:#fff;padding:14px;font-weight:700;font-size:13px;letter-spacing:.1em;text-transform:uppercase;text-decoration:none}\
#vp-deals .md .allbtn:hover{background:var(--acc);color:#fff}\
#vp-deals .md .allbtn svg{width:12px;height:12px}\
#vp-deals .md .fine{font-size:11px;color:var(--tx-3);line-height:1.45}\
#vp-deals details.reg{border:1px dashed var(--line-2);padding:10px 12px}\
#vp-deals details.reg summary{cursor:pointer;font-weight:700;font-size:13px;color:var(--tx-2);list-style:none;display:flex;justify-content:space-between}\
#vp-deals details.reg summary::-webkit-details-marker{display:none}\
#vp-deals details.reg summary::after{content:"+";font-weight:800}\
#vp-deals details.reg[open] summary::after{content:"\\2013"}\
#vp-deals details.reg .deals{margin-top:10px}\
#vp-deals .foot{margin-top:20px;font-size:11.5px;color:var(--tx-3);line-height:1.5}\
#vp-deals .err{padding:24px;color:var(--tx-2);text-align:center}\
/* ---------- #vp-deals.th-halloweenalloween theme (data "theme" block; auto on/off by date) ---------- */\
#vp-deals.th-halloween{--bg:#0B090C;--bg-2:#16121A;--bg-3:#211A26;--line:#2E2534;--line-2:#4B3B55;--tx:#F5EEE6;--tx-2:#D2C6BB;--tx-3:#9A8E98;--vp:#FF7518;--vp-2:#FF9A3D;--acc:#FF9A3D;--ink:#0B090C;--ld-red:#FF7518;--ld-blue:#9B5DE5;--mon:#FF7518;--tue:#9B5DE5;--wed:#7BD148;--thu:#FF7518;--fri:#9B5DE5;--sat:#FF7518;--sun:#7BD148;--shadow:0 10px 34px rgba(255,117,24,.22);position:relative;padding-top:72px;background:radial-gradient(1200px 420px at 50% -120px,rgba(255,117,24,.18),transparent 70%),var(--bg);color:var(--tx);overflow:hidden}\
#vp-deals.th-halloween .drip{position:absolute;top:0;left:0;width:100%;height:56px;display:block}\
#vp-deals.th-halloween .hd{position:relative}\
#vp-deals.th-halloween .kicker{color:var(--vp);text-shadow:0 0 12px rgba(255,117,24,.45)}\
#vp-deals.th-halloween h2.ttl{color:#fff;text-shadow:0 0 18px rgba(255,117,24,.55),0 2px 0 #000}\
#vp-deals.th-halloween h2.ttl span{color:var(--vp)}\
#vp-deals.th-halloween .bats{position:absolute;left:min(520px,60%);top:-18px;width:180px;height:70px;pointer-events:none;color:#F5EEE6}\
#vp-deals.th-halloween .bats i{position:absolute;display:block;width:44px;opacity:.85;animation:vpBat 4.5s ease-in-out infinite}\
#vp-deals.th-halloween .bats i:nth-child(1){left:0;top:24px}\
#vp-deals.th-halloween .bats i:nth-child(2){left:70px;top:0;width:30px;animation-delay:-1.4s;opacity:.65}\
#vp-deals.th-halloween .bats i:nth-child(3){left:128px;top:34px;width:24px;animation-delay:-2.6s;opacity:.5}\
#vp-deals.th-halloween .bats svg{width:100%;height:auto;display:block}\
@keyframes vpBat{0%,100%{transform:translate(0,0) rotate(-4deg)}50%{transform:translate(6px,-8px) rotate(4deg)}}\
#vp-deals.th-halloween .stores button{background:var(--bg-2);border-color:var(--vp);color:var(--vp)}\
#vp-deals.th-halloween .stores button:hover{background:var(--bg-3)}\
#vp-deals.th-halloween .stores button[aria-pressed="true"]{background:var(--vp);color:var(--ink)}\
#vp-deals.th-halloween .today{background:linear-gradient(135deg,#1C1222,#0B090C 70%);border:2px solid var(--vp);color:#fff}\
#vp-deals.th-halloween .today .big em{color:var(--vp)}\
#vp-deals.th-halloween .today .go{background:var(--vp);color:var(--ink)}\
#vp-deals.th-halloween .today .go:hover{background:#fff;color:var(--ink)}\
#vp-deals.th-halloween .house{background:var(--bg-2);border-color:var(--vp)}\
#vp-deals.th-halloween .house .lg{background:#000;border:1px solid var(--line-2)}\
#vp-deals.th-halloween .house .ey{color:var(--vp)}\
#vp-deals.th-halloween .house .tt{color:#fff}\
#vp-deals.th-halloween .house .it{background:var(--bg-3);border-left-color:var(--vp)}\
#vp-deals.th-halloween .house .it b{color:var(--vp)}\
#vp-deals.th-halloween .house .it em{color:var(--tx)}\
#vp-deals.th-halloween .house .go{background:var(--vp);color:var(--ink)}\
#vp-deals.th-halloween .house .go:hover{background:#fff;color:var(--ink)}\
#vp-deals.th-halloween .sec .st h4.hs{color:var(--vp)}\
#vp-deals.th-halloween .deal.house-row{background:var(--bg-3);border-color:var(--vp);border-left-color:var(--vp)}\
#vp-deals.th-halloween .finder select{background-color:var(--bg-2);color:var(--vp);border-color:var(--vp);background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' fill=\'none\' stroke=\'%23FF7518\' stroke-width=\'2\'/%3E%3C/svg%3E")}\
#vp-deals.th-halloween .finder select option{background:#16121A;color:#F5EEE6}\
#vp-deals.th-halloween .earlier{background:var(--bg-2)}\
#vp-deals.th-halloween .dows div{color:var(--tx-3)}\
#vp-deals.th-halloween .day{background:var(--bg-2);border-color:var(--line)}\
#vp-deals.th-halloween .day.blank{background:transparent;border-color:var(--line)}\
#vp-deals.th-halloween .day .n b{color:#fff}\
#vp-deals.th-halloween .day .n span.tdy{background:var(--vp);color:var(--ink)}\
#vp-deals.th-halloween .day.is-today{border-color:var(--vp);box-shadow:0 0 0 2px var(--vp),0 0 22px rgba(255,117,24,.35)}\
#vp-deals.th-halloween .day.ld{background:linear-gradient(160deg,#2A1530,#16121A 60%);border-color:var(--vp)}\
#vp-deals.th-halloween .day.ld::before{background:repeating-linear-gradient(90deg,var(--ld-red) 0 12px,#000 12px 16px,var(--ld-blue) 16px 28px,#000 28px 32px)}\
#vp-deals.th-halloween .day.ld .h em{color:var(--vp)}\
#vp-deals.th-halloween .day.hit{background:#2A1A0F;border-color:var(--vp)}\
#vp-deals.th-halloween .day .hitb{background:var(--vp);color:var(--ink)}\
#vp-deals.th-halloween .ov{background:rgba(0,0,0,.72)}\
#vp-deals.th-halloween .md{background:var(--bg);border-color:var(--vp);color:var(--tx)}\
#vp-deals.th-halloween .md .band{background:#000;border-bottom:4px solid var(--c,var(--vp))}\
#vp-deals.th-halloween .md .band.ld{background:linear-gradient(100deg,#3A1A05,#2A1540);border-bottom-color:var(--vp)}\
#vp-deals.th-halloween .md .band .d{color:#fff}\
#vp-deals.th-halloween .md .nav button:hover{color:var(--vp)}\
#vp-deals.th-halloween .sec .st h4{color:#fff}\
#vp-deals.th-halloween .deal{background:var(--bg-2);border-color:var(--line)}\
#vp-deals.th-halloween .deal.top{background:linear-gradient(90deg,color-mix(in srgb,var(--c,var(--vp)) 22%,#16121A),#16121A);border-color:var(--c,var(--vp))}\
#vp-deals.th-halloween .deal .shop,#vp-deals.th-halloween .md .allbtn{background:var(--vp);color:var(--ink)}\
#vp-deals.th-halloween .deal .shop:hover,#vp-deals.th-halloween .md .allbtn:hover{background:#fff;color:var(--ink)}\
#vp-deals.th-halloween .shops a{border-color:var(--vp);color:var(--vp)}\
#vp-deals.th-halloween .shops a:hover{background:var(--vp);color:var(--ink)}\
#vp-deals.th-halloween details.reg{border-color:var(--line-2)}\
@media (max-width:640px){#vp-deals.th-halloween{padding-top:60px}#vp-deals.th-halloween .drip{height:42px}#vp-deals.th-halloween .bats{left:auto;right:0;top:-46px;width:110px;height:40px}#vp-deals.th-halloween .bats i:nth-child(3){display:none}}\
@media (prefers-reduced-motion:reduce){#vp-deals.th-halloween .bats i{animation:none}}\
@media (max-width:900px){#vp-deals .feat{grid-template-columns:1fr}#vp-deals h2.ttl{font-size:30px}}\
@media (max-width:640px){#vp-deals .house .items{grid-template-columns:1fr}#vp-deals{padding:20px 12px 48px}#vp-deals .dows{display:none}#vp-deals .grid{grid-template-columns:1fr 1fr}#vp-deals .day.blank{display:none}#vp-deals .day{min-height:116px}#vp-deals .earlier.on{display:flex}#vp-deals .legend{display:none}#vp-deals .day.past.collapsed{display:none}#vp-deals .today{grid-template-columns:1fr}#vp-deals .today .go{text-align:center}#vp-deals .deal{grid-template-columns:52px 1fr}#vp-deals .deal .shop,#vp-deals .shops{grid-column:2;justify-self:start;justify-content:flex-start;max-width:none}#vp-deals .md{top:auto;bottom:0;left:0;transform:none;width:100%;max-height:90vh}}\
@media (prefers-reduced-motion:reduce){#vp-deals *{transition:none !important}}';

  if (!document.getElementById('vp-deals-css')) {
    var st = document.createElement('style'); st.id = 'vp-deals-css'; st.textContent = CSS; document.head.appendChild(st);
    var f = document.createElement('link'); f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap';
    document.head.appendChild(f);
  }

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  if (window.VP_DEALS_DATA) { init(window.VP_DEALS_DATA); return; } // inline data (standalone/offline build)
  // Monthly rollover: if deals-YYYY-MM.json exists for the current month (Pacific time), use it; otherwise deals.json.
  var ym = (function () { try { var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit' }).formatToParts(new Date()); var g = function (t) { for (var i = 0; i < p.length; i++) if (p[i].type === t) return p[i].value; }; return g('year') + '-' + g('month'); } catch (e) { return null; } })();
  var monthly = (!host.getAttribute('data-src') && ym) ? new URL('deals-' + ym + '.json', src).href : null;
  var load = function (u) { return fetch(u, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }); };
  (monthly ? load(monthly).catch(function () { return load(src); }) : load(src)).then(init)
    .catch(function (e) { host.innerHTML = '<div class="in"><div class="err">Deals are loading slowly — <a href="https://valleypure.net/deals/">refresh the page</a> or check your store\'s menu.</div></div>'; console.error('vp-deals', e); });

  function init(D) {
    /* ---------- calendar math ---------- */
    var ym = D.month.split('-'), Y = +ym[0], M = +ym[1];
    var daysIn = new Date(Y, M, 0).getDate();
    var firstDow = new Date(Y, M - 1, 1).getDay(); // Sun=0 — week runs Sunday → Saturday
    var DOWS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var DNAME = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };
    var MONTH_NAME = new Date(Y, M - 1, 1).toLocaleString('en-US', { month: 'long' });
    var dowOf = function (day) { return DOWS[(firstDow + day - 1) % 7]; };
    var WEEK = D.week, SALES = D.sales || [], EVERY = (D.everyday && D.everyday.deals) || [], FEATURE = D.featureDays || {};
    var saleOn = function (day) { for (var i = 0; i < SALES.length; i++) if (day >= SALES[i].from && day <= SALES[i].to) return SALES[i]; return null; };
    var every = function (day) { return EVERY.filter(function (e) { return (e.from == null || (day >= e.from && day <= e.to)) && !(e.notDow && e.notDow.indexOf(dowOf(day)) !== -1); }); };

    /* ---------- links ---------- */
    var L = D.links;
    var slug = function (s) { return s.toLowerCase().replace(/&/g, 'and').replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
    var linkFor = function (brand) { var path = (L.overrides && L.overrides[brand]) || L.brandPath.replace('{slug}', slug(brand)); return L.base + (L.storePrefix ? '/menu/' + store : '') + path; };
    var offersFor = function () { return L.base + '/menu/' + store + (L.offersPath || '/offers'); };

    /* ---------- state ---------- */
    var store = D.defaultStore;
    var findStore = function (id) { for (var i = 0; i < D.stores.length; i++) if (D.stores[i].id === id) return D.stores[i]; return null; };
    try {
      var q = new URLSearchParams(location.search).get('store'), s = localStorage.getItem('vp_store'), a = host.getAttribute('data-store');
      if (findStore(q)) store = q; else if (findStore(a)) store = a; else if (findStore(s)) store = s;
    } catch (e) {}
    var sel = null, brandPick = '', showPast = false;
    var todayNum = (function () {
      try {
        var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(new Date());
        var g = function (t) { for (var i = 0; i < p.length; i++) if (p[i].type === t) return +p[i].value; };
        return (g('year') === Y && g('month') === M) ? g('day') : null;
      } catch (e) { return null; }
    })();

    /* ---------- seasonal theme: "theme": { "name": "halloween", "from": 27, "to": 31 } — on only while today is in range ---------- */
    var TH = D.theme && todayNum && todayNum >= D.theme.from && todayNum <= D.theme.to ? D.theme : null;
    try { var tq = new URLSearchParams(location.search).get('vptheme'); if (tq && D.theme && tq === D.theme.name) TH = D.theme; } catch (e) {} // preview: ?vptheme=halloween
    Array.prototype.slice.call(host.classList).forEach(function (c) { if (c.indexOf('th-') === 0) host.classList.remove(c); });
    if (TH) host.classList.add('th-' + TH.name);
    var bat = '<svg viewBox="0 0 64 28" aria-hidden="true"><path fill="currentColor" d="M32 9c1.3-3 2.6-4.2 2.6-4.2l.9 3.4c1.6-.4 2.9-.1 3.9.5 2.6-4.4 9-7.2 15.6-6.4-2.4 1.6-3.4 3.8-2.8 6 2.8-.6 6.1.4 8.8 2.8-3.4.1-5.5 1.6-6 3.9-2.9-1.2-6.4-.4-8.7 1.9-1.4-2-3.9-3-6.2-2.4C38.7 18 35.6 23 32 26c-3.6-3-6.7-8-8.1-11.5-2.3-.6-4.8.4-6.2 2.4-2.3-2.3-5.8-3.1-8.7-1.9-.5-2.3-2.6-3.8-6-3.9 2.7-2.4 6-3.4 8.8-2.8.6-2.2-.4-4.4-2.8-6 6.6-.8 13 2 15.6 6.4 1-.6 2.3-.9 3.9-.5l.9-3.4S30.7 6 32 9z"/></svg>';
    var drip = '<svg class="drip" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path fill="#FF7518" d="M0 0h1200v14c-22 0-26 30-44 30s-18-26-40-26-20 12-42 12-24 26-46 26-18-36-46-36-30 16-52 16-20-22-44-22-28 40-50 40-16-34-40-34-28 14-52 14-24-24-46-24-22 30-46 30-20-20-44-20-26 26-50 26-22-34-46-34-26 12-50 12-22 22-46 22-24-28-48-28-26 16-50 16-20-14-44-14-26 34-50 34-24-30-48-30-22 10-46 10-24 24-48 24-22-26-46-26-26 8-50 8-22 16-46 16-24-20-48-20-26 22-50 22-22-26-46-26-14 4-20 4z"/><path fill="#9B5DE5" opacity=".9" d="M0 0h1200v6c-30 0-34 18-60 18s-30-12-58-12-30 20-56 20-28-16-54-16-36 10-60 10-26 22-52 22-30-24-58-24-28 14-54 14-30-10-58-10-26 26-52 26-32-22-60-22-28 10-54 10-28 18-56 18-26-24-52-24-32 14-58 14-28-8-56-8-26 20-52 20-30-18-58-18-26 8-54 8-30 14-58 14-24-14-50-14-12 2-10 2z"/></svg>';
    host.innerHTML =
      (TH ? drip : '') +
      '<div class="in"><header class="hd"><div><div class="kicker">' + esc(TH && TH.kicker ? TH.kicker : 'Valley Pure · Daily deals') + '</div>' + (TH ? '<div class="bats"><i>' + bat + '</i><i>' + bat + '</i><i>' + bat + '</i></div>' : '') + '<h2 class="ttl">' + esc(D.title || MONTH_NAME) + ' <span>Deals</span></h2><p class="lede">' + esc(D.lede || '') + '</p></div>' +
      '<div class="store"><div class="l">Shopping at</div><div class="stores" id="vpStores" role="group" aria-label="Choose your store"></div></div></header>' +
      '<div class="feat' + ((D.everyday && D.everyday.brand) || D.house ? '' : ' one') + '"><div class="today" id="vpToday"></div>' +
      (D.house && !(D.everyday && D.everyday.brand) ? '<div class="house"><div class="lg">' + (D.house.logo ? '<img src="' + esc(D.house.logo) + '" alt="Valley Pure">' : '') + '</div><div><div class="ey">' + esc(D.house.eyebrow || '') + '</div><div class="tt">' + esc(D.house.title || '') + '</div></div><div class="items">' + (D.house.items || []).map(function (i) { return '<div class="it"><b>' + esc(i.big) + '</b><span>' + esc(i.label) + '</span><em>' + esc(i.detail || '') + '</em></div>'; }).join('') + '</div><a class="go" id="vpHouseGo" target="_blank" rel="noopener" href="#">Shop ' + esc(D.house.brand) + ' &rarr;</a></div>' : '') +
      ((D.everyday && D.everyday.brand) ? '<div class="pusha"><div><div class="brand cond">' + esc(D.everyday.brand) + '</div><div class="what cond">' + esc(D.everyday.headline) + '</div><div class="sub">' + esc(D.everyday.sub) + '</div></div><div class="price"><b id="vpPushaPrice"></b><span id="vpPushaStore"></span></div></div>' : '') + '</div>' +
      '<div class="tools"><div class="legend" id="vpLegend"></div><div class="finder"><label for="vpBrand">When is my brand on sale?</label><select id="vpBrand"><option value="">Pick a brand</option></select><button class="x" id="vpBrandClear">Clear</button></div></div>' +
      '<button type="button" class="earlier" id="vpEarlier"></button><div class="dows"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div><div class="grid" id="vpGrid"></div>' +
      '<p class="foot">' + esc(D.finePrint || '') + '</p></div>' +
      '<div class="ov" id="vpOv"></div><div class="md" id="vpMd" role="dialog" aria-modal="true" aria-labelledby="vpMdTitle"></div>';
    var $ = function (id) { return host.querySelector('#' + id); };

    /* ---------- store picker ---------- */
    var storesEl = $('vpStores');
    D.stores.forEach(function (s) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = s.name; b.dataset.id = s.id; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { store = s.id; try { localStorage.setItem('vp_store', store); } catch (e) {} buildGrid(); renderToday(); render(); if (sel) openDay(sel); });
      storesEl.appendChild(b);
    });

    /* ---------- legend ---------- */
    $('vpLegend').innerHTML = DOWS.filter(function (k) { return WEEK[k].deals.length; }).map(function (k) { return '<span><i style="--c:var(--' + k + ')"></i>' + esc(WEEK[k].id) + '</span>'; }).join('') +
      SALES.map(function (S) { return '<span><i class="ld"></i>' + esc(S.name) + ' ' + M + '/' + S.from + '–' + M + '/' + S.to + '</span>'; }).join('');

    /* ---------- brand finder ---------- */
    // per-store scoping: "stores": ["woodlake"] shows only there; "notStores": ["woodlake"] hides it there
    var forStore = function (d) { return (!d.stores || d.stores.indexOf(store) !== -1) && (!d.notStores || d.notStores.indexOf(store) === -1); };
    var inRange = function (d, day) { return (d.from == null || day >= d.from) && (d.to == null || day <= d.to); };
    var wk = function (day) { return WEEK[dowOf(day)].deals.filter(function (d) { return forStore(d) && inRange(d, day); }); };
    // a sale with "replaces": true is the whole lineup for its days: the regular weekday list is hidden,
    // and every-day deals whose brands are all in the sale are folded into it (house deals always stay)
    var saleDeals = function (S, day) { return S.deals.filter(function (d) { return (!d.only || d.only === day) && forStore(d); }); };
    var covered = function (d, day) {
      var S = saleOn(day); if (!S || !S.replaces || d.house) return false;
      var bs = {}; saleDeals(S, day).forEach(function (x) { x.b.forEach(function (b) { bs[b] = 1; }); });
      return d.b.every(function (b) { return bs[b]; });
    };
    var dayDeals = function (day) {
      var out = [], S = saleOn(day);
      if (S) saleDeals(S, day).forEach(function (d) { out.push(d); });
      if (!(S && S.replaces)) wk(day).forEach(function (d) { out.push(d); });
      every(day).filter(forStore).filter(function (d) { return !covered(d, day); }).forEach(function (d) { out.push(d); });
      return out;
    };
    var dayHas = function (day, brand) { return dayDeals(day).some(function (d) { return d.b.indexOf(brand) !== -1; }); };
    var all = {};
    for (var day = 1; day <= daysIn; day++) dayDeals(day).forEach(function (d) { d.b.forEach(function (b) { all[b] = 1; }); });
    var selB = $('vpBrand');
    Object.keys(all).sort(function (a, b) { return a.localeCompare(b); }).forEach(function (b) { var o = document.createElement('option'); o.value = b; o.textContent = b; selB.appendChild(o); });
    selB.addEventListener('change', function () { brandPick = selB.value; render(); });
    $('vpBrandClear').addEventListener('click', function () { brandPick = ''; selB.value = ''; render(); });

    /* ---------- grid ---------- */
    var grid = $('vpGrid');
    var split = function (s) { var p = s.split('|'); return '<em>' + esc(p[0]) + '</em> ' + esc(p[1] || ''); };
    function tileHero(day) {
      var S = saleOn(day);
      if (FEATURE[day] === 'PUSHA') return { html: '<em class="ph">PUSHA</em> Pod BOGO', more: wk(day)[0] };
      if (S) return { html: split(day === S.to && S.lastDayHeadline ? S.lastDayHeadline : S.tileHeadline), cls: 'ld', sec: (day === S.to && S.lastDaySecondary) || S.tileSecondary };
      var t = wk(day)[0];
      if (!t) return { html: '<em>New deals</em> coming soon', cls: 'tbd' };
      return { html: '<em>' + esc(t.pct) + '</em> ' + esc(t.b[0]) };
    }
    function buildGrid() {
      grid.innerHTML = '';
      var blank = function () { var x = document.createElement('div'); x.className = 'day blank'; grid.appendChild(x); };
      for (var i = 0; i < firstDow; i++) blank();
      for (var day = 1; day <= daysIn; day++) (function (day) {
        var k = dowOf(day), w = { deals: wk(day) }, b = document.createElement('button'); b.type = 'button';
        b.className = 'day' + (saleOn(day) ? ' ld' : ''); b.dataset.day = day; b.style.setProperty('--c', 'var(--' + k + ')');
        b.setAttribute('aria-label', MONTH_NAME + ' ' + day + ', ' + DNAME[k] + ' deals');
        var h = tileHero(day);
        var promo = every(day).filter(forStore).filter(function (e) { return e.tile; }).map(function (e) { return '<b>' + esc(e.tile) + '</b>'; }).join(' · ');
        var secondary = (promo ? promo + ' · ' : '') + (h.sec || ((h.more ? esc(h.more.b[0] + ' ' + h.more.pct) + ' · ' : '') +
          w.deals.slice(1).filter(function (d) { return !(h.more && d.b[0] === 'PUSHA'); }).slice(0, 2).map(function (d) { return d.b.slice(0, 2).join(' · '); }).join(' · ')));
        secondary = secondary.replace(/ · $/, '');
        b.innerHTML = '<div class="n"><b>' + day + '</b><span class="' + (day === todayNum ? 'tdy' : '') + '">' + (day === todayNum ? 'Today' : k) + '</span></div>' +
          '<div class="h ' + (h.cls || '') + '">' + h.html + '</div><div class="m">' + secondary + '</div>' +
          '<div class="more">See all ' + dayDeals(day).length + ' deals →</div><span class="hitb">On sale</span>';
        b.addEventListener('click', function () { openDay(day); });
        grid.appendChild(b);
      })(day);
      var tail = (7 - ((firstDow + daysIn) % 7)) % 7;
      for (var j = 0; j < tail; j++) blank();
    }

    /* ---------- today card ---------- */
    function renderToday() {
      var el = $('vpToday'), day = todayNum || 1, k = dowOf(day), w = { id: WEEK[k].id, deals: wk(day) }, S = saleOn(day);
      el.style.setProperty('--c', S ? 'var(--ld-red)' : 'var(--' + k + ')');
      var label = todayNum ? 'Today · ' + DNAME[k] + ', ' + MONTH_NAME + ' ' + day : 'Starts ' + DNAME[dowOf(1)] + ', ' + MONTH_NAME + ' 1';
      var none = !S && !w.deals.length, hb = D.house && D.house.items ? D.house.items : [];
      if (none) { el.style.setProperty('--c', 'var(--acc)'); el.innerHTML = '<div><div class="l">' + esc(label) + '</div><div class="big"><em>House specials</em> every day</div><div class="rest">' + esc(hb.map(function (i) { return i.label + ' ' + i.big; }).join(' · ') + (hb.length ? '. ' : '') + (D.tbdNote || "Today's full lineup is on your store's menu.")) + '</div></div><button type="button" class="go">See today\'s deals</button>'; el.querySelector('.go').addEventListener('click', function () { openDay(day); }); return; }
      var big = S ? (day === S.to && S.todayBigLast ? S.todayBigLast : S.todayBig) : '<em>' + esc(w.deals[0].pct) + '</em> ' + esc(w.deals[0].b[0]) + " — it's " + esc(w.id);
      var promoT = every(day).filter(forStore).filter(function (e) { return e.tile; }).map(function (e) { return e.tile; }).join(' · ');
      var rest = (promoT ? promoT + '. ' : '') + (S ? S.todayRest : 'Plus ' + w.deals.slice(1, 4).map(function (d) { return d.b.slice(0, 2).join(' & ') + ' ' + d.pct; }).join(', ') + ' and more.');
      el.innerHTML = '<div><div class="l">' + esc(label) + '</div><div class="big">' + big + '</div><div class="rest">' + esc(rest) + '</div></div><button type="button" class="go">See today\'s deals</button>';
      el.querySelector('.go').addEventListener('click', function () { openDay(day); });
    }

    /* ---------- modal ---------- */
    var ov = $('vpOv'), md = $('vpMd');
    var arrow = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 6h8M6 2l4 4-4 4"/></svg>';
    var shopLinks = function (d) {
      return d.b.length === 1
        ? '<a class="shop" href="' + linkFor(d.b[0]) + '" target="_blank" rel="noopener">Shop ' + esc(d.b[0]) + ' ' + arrow + '</a>'
        : '<div class="shops">' + d.b.map(function (b) { return '<a href="' + linkFor(b) + '" target="_blank" rel="noopener">' + esc(b) + '</a>'; }).join('') + '</div>';
    };
    var dealRow = function (d, c) {
      var s = findStore(store);
      var raw = (d.o && typeof d.o === 'object') ? (d.o[store] || d.o['default'] || '') : d.o; // per-store wording: "o": { "default": "...", "woodlake": "..." }
      var o = d.pusha ? raw.replace('{price}', '<b>$' + s.pushaPrice + '</b>').replace('{store}', esc(s.name))
        : raw === 'Off' ? esc(d.pct + ' off ' + d.b.join(', ')) : esc(raw);
      return '<div class="deal' + (d.top ? ' top' : '') + '" style="--c:' + c + '"><div class="pct' + (d.pct.length > 3 ? ' sm' : '') + '">' + esc(d.pct) + '</div><div><div class="b">' + esc(d.name || d.b.join(', ')) + '</div><div class="o">' + o + '</div></div>' + shopLinks(d) + '</div>';
    };
    function openDay(day) {
      sel = day;
      var k = dowOf(day), w = { id: WEEK[k].id, deals: wk(day) }, S = saleOn(day), ph = FEATURE[day] === 'PUSHA', sName = findStore(store).name;
      md.style.setProperty('--c', 'var(--' + k + ')');
      var html = '<div class="band' + (S ? ' ld' : ph ? ' ph' : '') + '"><div><div class="k">' + esc(S ? S.name + ' · ' + MONTH_NAME.slice(0, 3) + ' ' + S.from + '–' + S.to : w.id) + '</div><div class="d" id="vpMdTitle">' + DNAME[k] + ', ' + MONTH_NAME + ' ' + day + '</div><div class="s">' + (S ? 'Limited time · ' : '') + 'Shopping at ' + esc(sName) + '</div></div><button type="button" class="cl" aria-label="Close">×</button></div>';
      html += '<div class="nav"><button type="button" data-nav="-1"' + (day === 1 ? ' disabled style="visibility:hidden"' : '') + '>← ' + MONTH_NAME.slice(0, 3) + ' ' + (day - 1) + '</button><button type="button" data-nav="1"' + (day === daysIn ? ' disabled style="visibility:hidden"' : '') + '>' + MONTH_NAME.slice(0, 3) + ' ' + (day + 1) + ' →</button></div><div class="bd">';
      var hs = every(day).filter(forStore).filter(function (e) { return e.house; });
      if (hs.length) html += '<div class="sec"><div class="st"><h4 class="hs">' + esc((D.house && D.house.section) || 'House deals') + '</h4><small>Every day</small></div><div class="deals">' + hs.map(function (d) { return dealRow(d, 'var(--acc)').replace('class="deal', 'class="deal house-row'); }).join('') + '</div></div>';
      if (ph && EVERY[0]) html += '<div class="sec"><div class="st"><h4 class="ph">' + esc((D.featureLabels && D.featureLabels[day]) || 'Featured today') + '</h4></div><div class="deals">' + dealRow(EVERY[0], 'var(--pusha)') + '</div></div>';
      if (S) {
        html += '<div class="sec"><div class="st"><h4 class="ld">' + esc(S.name) + '</h4><small>' + (day === S.to ? 'Ends tonight' : 'Through ' + DNAME[dowOf(S.to)] + ' ' + M + '/' + S.to) + '</small></div><div class="deals">' + saleDeals(S, day).map(function (d) { return dealRow(d, 'var(--ld-red)'); }).join('') + '</div></div>';
        if (!S.replaces) html += '<details class="reg"><summary>Regular ' + DNAME[k] + ' deals also on today</summary><div class="deals">' + w.deals.map(function (d) { return dealRow(d, 'var(--' + k + ')'); }).join('') + '</div></details>';
      } else {
        if (!w.deals.length) html += '<div class="sec"><div class="st"><h4>' + esc(w.id) + '</h4></div><p class="tbdn">' + esc(D.tbdNote || "Today's full lineup is on your store's menu.") + '</p></div>';
        else html += '<div class="sec"><div class="st"><h4>' + esc(w.id) + '</h4><small>Every ' + DNAME[k] + ' in ' + MONTH_NAME + '</small></div><div class="deals">' + w.deals.filter(function (d) { return !(ph && d.b.length === 1 && d.b[0] === 'PUSHA'); }).map(function (d) { return dealRow(d, 'var(--' + k + ')'); }).join('') + '</div></div>';
      }
      var ev = every(day).filter(forStore).filter(function (e) { return !(ph && e.pusha) && !e.house && !covered(e, day); });
      if (ev.length) html += '<div class="sec"><div class="st"><h4>Every day</h4></div><div class="deals">' + ev.map(function (d) { return dealRow(d, d.pusha ? 'var(--pusha)' : 'var(--vp)'); }).join('') + '</div></div>';
      html += '<a class="allbtn" href="' + offersFor() + '" target="_blank" rel="noopener">Shop all deals at ' + esc(sName) + ' ' + arrow + '</a>';
      html += '<div class="fine">' + esc(D.modalFinePrint || '') + '</div></div>';
      md.innerHTML = html;
      md.querySelector('.cl').addEventListener('click', closeMd);
      Array.prototype.forEach.call(md.querySelectorAll('[data-nav]'), function (b) { b.addEventListener('click', function () { openDay(day + +b.dataset.nav); }); });
      ov.classList.add('on'); md.classList.add('on'); md.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      md.querySelector('.cl').focus();
    }
    function closeMd() { ov.classList.remove('on'); md.classList.remove('on'); document.body.style.overflow = ''; var t = grid.querySelector('[data-day="' + sel + '"]'); sel = null; if (t) t.focus(); }
    ov.addEventListener('click', closeMd);
    document.addEventListener('keydown', function (e) {
      if (!md.classList.contains('on')) return;
      if (e.key === 'Escape') closeMd();
      if (e.key === 'ArrowRight' && sel < daysIn) openDay(sel + 1);
      if (e.key === 'ArrowLeft' && sel > 1) openDay(sel - 1);
    });

    /* ---------- render ---------- */
    var earlierBtn = $('vpEarlier');
    earlierBtn.addEventListener('click', function () { showPast = !showPast; render(); if (!showPast) earlierBtn.scrollIntoView({ block: 'nearest' }); });
    function render() {
      var s = findStore(store);
      var pastCount = todayNum ? todayNum - 1 : 0, collapse = pastCount > 0 && !brandPick && !showPast;
      earlierBtn.classList.toggle('on', pastCount > 0 && !brandPick);
      earlierBtn.innerHTML = showPast ? 'Hide earlier days <span>&uarr;</span>' : 'Earlier this month <span>Show ' + MONTH_NAME.slice(0, 3) + ' 1&ndash;' + pastCount + '</span>';
      Array.prototype.forEach.call(storesEl.querySelectorAll('button'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.id === store)); });
      if ($('vpHouseGo') && D.house) $('vpHouseGo').href = linkFor(D.house.brand);
      if (D.everyday && D.everyday.brand) { $('vpPushaPrice').textContent = '$' + s.pushaPrice; $('vpPushaStore').textContent = (D.everyday.priceLabel || 'at {store}').replace('{store}', s.name); }
      $('vpBrandClear').classList.toggle('on', !!brandPick);
      Array.prototype.forEach.call(grid.querySelectorAll('.day[data-day]'), function (t) {
        var d = +t.dataset.day;
        t.classList.toggle('is-today', d === todayNum);
        t.classList.toggle('past', !!todayNum && d < todayNum && !brandPick);
        t.classList.toggle('collapsed', collapse && d < todayNum);
        t.classList.toggle('hit', !!brandPick && dayHas(d, brandPick));
        t.classList.toggle('miss', !!brandPick && !dayHas(d, brandPick));
      });
    }
    buildGrid(); renderToday(); render();
  }
})();
