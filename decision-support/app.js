(function(){
  "use strict";
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};

  $("#theme").addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    var next=cur==="dark"?"light":(cur==="light"?"dark":(matchMedia("(prefers-color-scheme:dark)").matches?"light":"dark"));
    document.documentElement.setAttribute("data-theme",next);
  });

  function gotoTab(w){
    $$(".tab").forEach(function(x){x.setAttribute("aria-selected", x.dataset.w===w ? "true":"false");});
    $$(".world").forEach(function(s){s.classList.toggle("active", s.id===w);});
  }
  $$(".tab").forEach(function(t){t.addEventListener("click",function(){gotoTab(t.dataset.w);});});
  $$("[data-goto]").forEach(function(b){b.addEventListener("click",function(){gotoTab(b.dataset.goto);});});

  var LABELS={og:"Totale investering",on:"Totale omzet",im:"Totale opdrachtwaarde",ac:"Contractwaarde",ju:"Vergoeding"};
  $("#persp").addEventListener("change",function(){
    $("#k-label").textContent=LABELS[this.value]; $("#s-label").textContent=LABELS[this.value];
  });

  var fmt=new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR",maximumFractionDigits:0});
  function vals(){return {tarief:+$("#tarief").value||0,uren:+$("#uren").value||0,loop:+$("#loop").value||1,idx:+$("#idx").value||0};}
  function calc(v){var weeks=v.loop*52/12; var f=1+(v.idx/100)*(v.loop/24); return {total:v.tarief*v.uren*weeks*f,jaar:v.tarief*v.uren*52*(1+v.idx/200)};}
  function recompute(){
    var v=vals(), c=calc(v);
    $("#k-total").textContent=fmt.format(Math.round(c.total));
    $("#k-maand").textContent=fmt.format(Math.round(c.total/v.loop));
    $("#k-jaar").textContent=fmt.format(Math.round(c.jaar));
    $("#s-waarde").textContent=fmt.format(Math.round(c.total));
    $("#s-maand").textContent=fmt.format(Math.round(c.total/v.loop));
    $("#s-loop").textContent=v.loop+" maanden";
  }
  ["tarief","uren","loop","idx"].forEach(function(id){$("#"+id).addEventListener("input",recompute);});
  recompute();

  function pressGroup(sel,btn){$$(sel).forEach(function(b){b.setAttribute("aria-pressed","false");});btn.setAttribute("aria-pressed","true");}
  $$(".opts .opt").forEach(function(o){o.addEventListener("click",function(){pressGroup(".opts .opt",o);});});

  /* Scenario's opslaan / kopiëren / vergelijken (B2B: velden, geen sliders) */
  var scenCount=0;
  $("#save-scen").addEventListener("click",function(){
    scenCount++; var name=String.fromCharCode(64+scenCount); var v=vals(), c=calc(v);
    var el=document.createElement("div"); el.className="scen";
    el.innerHTML='<div class="n">Scenario '+name+'</div><div class="t num">'+fmt.format(Math.round(c.total))+
      ' · €'+v.tarief+'/u · '+v.uren+'u · '+v.loop+'mnd</div><div class="acts">'+
      '<button data-copy>Kopiëren</button></div>';
    el.querySelector("[data-copy]").addEventListener("click",function(){
      $("#tarief").value=v.tarief;$("#uren").value=v.uren;$("#loop").value=v.loop;$("#idx").value=v.idx;
      recompute(); showToast("Scenario "+name+" gekopieerd naar de velden");
    });
    $("#saved").appendChild(el); showToast("Scenario "+name+" opgeslagen");
  });
  $("#cmp-scen").addEventListener("click",function(){
    var n=$$("#saved .scen").length;
    showToast(n<2 ? "Sla eerst twee scenario's op om te vergelijken" : "Vergelijking van "+n+" scenario's (mock)");
  });

  var GEZAG={
    vrij:{state:"full",label:"Bekend",aB:"neutral",aT:"—",feit:"Werktijden vrij te bepalen door de zelfstandige",bewijs:"✓ contract art. 4",bwB:"ok"},
    og:{state:"part",label:"Gewijzigd",aB:"open",aT:"open vraag",feit:"Werktijden worden door de opdrachtgever bepaald",bewijs:"✗ nog geen bewijs",bwB:"miss"}
  };
  var werktijd="vrij";
  function setWerktijd(w){
    werktijd=w; pressGroup("#wt-vrij,#wt-og", w==="vrij"?$("#wt-vrij"):$("#wt-og")); renderNav();
    $("#decouple").innerHTML = w==="og"
      ? "U wijzigde een <b>feitelijk</b> kenmerk (werktijden). Financieel effect: <b>verwaarloosbaar</b>. In de Regie Navigator is <b>‘Gezag’</b> nu een aandachtspunt geworden."
      : "Een hoger tarief verandert de <b>opdrachtwaarde</b> — maar <b>niets</b> aan gezag, vervanging of bewijs.";
  }
  $("#wt-vrij").addEventListener("click",function(){setWerktijd("vrij");});
  $("#wt-og").addEventListener("click",function(){setWerktijd("og");});

  function navRows(){var g=GEZAG[werktijd];return [
    {o:"Gezag",st:g.state,stl:g.label,bron:"jurisprudentie",bw:g.bewijs,bwB:g.bwB,aB:g.aB,aT:g.aT,feit:g.feit,br:"Holistische weging arbeidsrelatie (o.a. Uber/Deliveroo)",act:"Bewijs vastleggen"},
    {o:"Organisatorische inbedding",st:"part",stl:"Deels bekend",bron:"wet",bw:"✗ ontbreekt",bwB:"miss",aB:"open",aT:"open vraag",feit:"Werkt in team De Linden, eigen kleding/telefoon",br:"Art. 7:610 BW — inbedding als indicator",act:"Aanvullen inbedding"},
    {o:"Ondernemerschap",st:"full",stl:"Bekend",bron:"beleid",bw:"✓ KvK + meerdere opdrachten",bwB:"ok",aB:"neutral",aT:"—",feit:"Ingeschreven KvK, factureert 3 opdrachtgevers",br:"Beleidsregels beoordeling arbeidsrelatie",act:"—"},
    {o:"Vervanging",st:"none",stl:"Onbekend",bron:"—",bw:"✗ ontbreekt",bwB:"miss",aB:"open",aT:"open vraag",feit:"Onbekend of vervanging is toegestaan",br:"Vrije vervangbaarheid als contra-indicator",act:"Vraag beantwoorden"},
    {o:"Ondernemersrisico",st:"full",stl:"Bekend",bron:"jurisprudentie",bw:"✓ eigen BAV (verlopen)",bwB:"open",aB:"neutral",aT:"—",feit:"Draagt eigen aansprakelijkheid; BAV-polis verlopen",br:"Ondernemersrisico als indicator",act:"BAV vernieuwen"},
    {o:"Meerdere opdrachtgevers",st:"full",stl:"Bekend",bron:"beleid",bw:"✓ facturen",bwB:"ok",aB:"neutral",aT:"—",feit:"3 opdrachtgevers in 12 maanden",br:"Meerdere opdrachtgevers als indicator",act:"—"},
    {o:"Eigen materialen",st:"full",stl:"Bekend",bron:"—",bw:"✓ verklaring",bwB:"ok",aB:"neutral",aT:"—",feit:"Gebruikt eigen telefoon en vervoer",br:"Eigen bedrijfsmiddelen als indicator",act:"—"},
    {o:"Contractvorm",st:"full",stl:"Bekend",bron:"wet",bw:"✓ modelovereenkomst",bwB:"ok",aB:"neutral",aT:"—",feit:"Goedgekeurde modelovereenkomst v1",br:"Kwalificatie o.b.v. feitelijke uitvoering, niet enkel papier",act:"—"},
    {o:"Duur",st:"full",stl:"Bekend",bron:"beleid",bw:"✓ engagement",bwB:"ok",aB:"neutral",aT:"—",feit:"12 maanden, geen eerdere verlengingen",br:"Duur/continuïteit als indicator",act:"—"},
    {o:"Exclusiviteit",st:"full",stl:"Bekend",bron:"jurisprudentie",bw:"✓ contract",bwB:"ok",aB:"neutral",aT:"—",feit:"Geen exclusiviteitsbeding",br:"Exclusiviteit als indicator",act:"—"}
  ];}
  function renderNav(){
    var body=$("#navbody"); body.innerHTML="";
    navRows().forEach(function(r){
      var tr=document.createElement("tr"); tr.className="head-row"; tr.tabIndex=0; tr.setAttribute("aria-expanded","false");
      tr.innerHTML='<td><b>'+r.o+'</b></td><td><span class="state"><span class="g '+r.st+'"></span>'+r.stl+'</span></td>'+
        '<td><span class="src">'+r.bron+'</span></td><td><span class="badge '+r.bwB+'">'+r.bw+'</span></td>'+
        '<td><span class="badge '+r.aB+'">'+r.aT+'</span></td>';
      var det=document.createElement("tr"); det.className="detail";
      det.innerHTML='<td colspan="5"><div class="chain"><div class="step"><b>Feit</b>'+r.feit+'</div>'+
        '<div class="step"><b>Bron</b>'+r.br+'</div><div class="step"><b>Bewijs</b>'+r.bw+'</div>'+
        '<div class="step"><b>Open actie</b>'+(r.act==="—"?"geen":r.act)+'</div></div></td>';
      function tgl(){var open=det.classList.toggle("show");tr.setAttribute("aria-expanded",open?"true":"false");}
      tr.addEventListener("click",tgl);
      tr.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tgl();}});
      body.appendChild(tr); body.appendChild(det);
    });
  }
  renderNav();

  var ACTIONS=[
    {t:"Bewijs opvragen: BAV-polis (verlopen)",why:"uit: Ondernemersrisico",who:"aan zelfstandige",btn:"Verzoek sturen"},
    {t:"Open vraag beantwoorden: vervanging toegestaan?",why:"uit: Vervanging",who:"aan opdrachtgever",btn:"Beantwoorden"},
    {t:"Herbeoordeling inplannen (termijn verlopen)",why:"uit: tijdlijn",who:"aan jurist",btn:"Inplannen"}
  ];
  var ah=$("#actions");
  ACTIONS.forEach(function(a){
    var d=document.createElement("div"); d.className="action";
    d.innerHTML='<div><div>'+a.t+'</div><div class="why">'+a.why+'</div></div><span class="who">'+a.who+'</span><button class="btn ghost">'+a.btn+'</button>';
    d.querySelector("button").addEventListener("click",function(){showToast("Actie gestart: "+a.t+" — vastgelegd in auditspoor");});
    ah.appendChild(d);
  });

  var EVENTS=[
    {pos:8,type:"time",when:"nu",cap:"VOG geldig"},{pos:26,type:"time",when:"+2 mnd",cap:"Herbeoordeling"},
    {pos:40,type:"event",when:"+3 mnd",cap:"Nieuw arrest [DEMO]"},{pos:58,type:"time",when:"+7 mnd",cap:"BAV-polis verloopt"},
    {pos:74,type:"time",when:"+10 mnd",cap:"Contract verloopt"},{pos:90,type:"event",when:"+12 mnd",cap:"Tariefindexatie"}
  ];
  var axis=$("#axis");
  EVENTS.forEach(function(e){var m=document.createElement("div");m.className="mk";m.style.left=e.pos+"%";
    m.innerHTML='<div class="when">'+e.when+'</div><div class="pin '+e.type+'"></div><div class="cap">'+e.cap+'</div>';axis.appendChild(m);});

  var toast=$("#toast"), tTimer;
  function showToast(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(tTimer);tTimer=setTimeout(function(){toast.classList.remove("show");},2600);}
  $("#commit").addEventListener("click",function(){
    var keuze=$(".opts .opt[aria-pressed='true']").textContent.trim();
    var reason=$("#reason").value.trim();
    var entry=document.createElement("div"); entry.className="entry";
    entry.innerHTML='<span class="t num">vandaag</span> Besluit vastgelegd: <b>'+keuze+'</b> — genomen ondanks 2 open vragen'+(reason?' · “'+reason+'”':'')+' — u';
    $("#audit").appendChild(entry); $("#s-besluit").textContent=keuze+" (vandaag)";
    showToast("Beslissing “"+keuze+"” vastgelegd in het auditspoor"); $("#reason").value="";
  });
})();
