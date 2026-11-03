// Model-independent pedagogical diagrams with deterministic motion and reviewed French text.
// Render a complete 8-second cycle; all periodic movement returns to its initial state.
export function drawEquipment(ctx, kind, t) {
  const W=960,H=960, blue='#66c6e8', white='#effaff', muted='#abc8dc';
  ctx.clearRect(0,0,W,H);
  const bg=ctx.createRadialGradient(480,390,50,480,480,730);bg.addColorStop(0,'#153c59');bg.addColorStop(1,'#061326');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  ctx.lineWidth=1;ctx.strokeStyle='#66c6e80c';for(let i=0;i<960;i+=48){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,H);ctx.moveTo(0,i);ctx.lineTo(W,i);ctx.stroke();}
  function text(s,x,y,size=24,color=white,align='left'){ctx.fillStyle=color;ctx.font=`${size>=30?'600':'500'} ${size}px Arial`;ctx.textAlign=align;ctx.fillText(s,x,y);}
  function box(x,y,w,h,fill='#0a2138',stroke='#527b96',r=8){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}}
  function line(points,color=blue,width=8){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();}
  function dot(x,y,r=7,color=blue){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
  function flow(points,offset=0,color=blue){let lengths=[],len=0;for(let i=1;i<points.length;i++){const d=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);lengths.push(d);len+=d;}for(let k=0;k<7;k++){let d=((t/2+offset+k/7)%1)*len;for(let i=0;i<lengths.length;i++){if(d<=lengths[i]){const f=d/lengths[i];dot(points[i][0]+(points[i+1][0]-points[i][0])*f,points[i][1]+(points[i+1][1]-points[i][1])*f,5,color);break;}d-=lengths[i];}}}
  function pipe(points,active=true){line(points,'#254863',22);line(points,'#6892aa',2);if(active)flow(points);}
  function tank(x,y,w,h,color='#285ca0') {const g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,'#0c2746');g.addColorStop(.3,color);g.addColorStop(.55,'#8bd7f2');g.addColorStop(1,'#173b66');box(x,y,w,h,g,'#8dbed6',w*.3);}
  function tag(s,x,y,color=blue){box(x-60,y-22,120,42,'#071b2e',color,3);text(s,x,y+6,19,color,'center');}
  const titles={softener:'Adoucissement de l’eau',filter:'Filtration magnétique',pressure:'Maintien de pression',dosing:'Protection du circuit fermé',radiator:'Désembouage du radiateur',probio:'Désinfection pilotée PROBIO',descaling:'Détartrage de la douche','ecs-recovery':'Rétablir la production ECS'};
  const stages={softener:['Eau dure : calcium + magnésium','La résine échange les ions','L’eau adoucie protège la production','Régénération : un cycle distinct'],filter:['L’eau ralentit dans le filtre','Les aimants retiennent le fer','La poche retient les autres boues','Le circuit retrouve une eau filtrée'],pressure:['Les variations de volume sont mesurées','Le régulateur compare la pression','Le groupe corrige la pression','Le circuit reste dans sa plage'],dosing:['La pompe prélève le traitement','Le dosage est ajusté au circuit','Un film protecteur couvre le métal','Le suivi maintient la protection'],radiator:['Observer : haut chaud, bas froid','Désembouer et évacuer les dépôts','Vérifier une chaleur homogène','Filtrer en chaufferie et suivre l’eau'],probio:['Une contamination a été confirmée','Mesure REDOX et injection pilotée','Remettre la production ECS en état','Contrôler puis maintenir le suivi']};
  const stage=Math.floor(t/2)%4;
  stages.descaling=['Repérer les dépôts existants','Détartrer les surfaces touchées','Rincer et vérifier le résultat','Prévenir ensuite en amont'];
  stages['ecs-recovery']=['Un défaut ECS a été identifié','Contrôler production et distribution','Corriger la cause du défaut','Vérifier puis maintenir le suivi'];
  text('AQUAPROX  /  COMPRENDRE LA SOLUTION',50,62,17,blue);
  text(titles[kind],50,115,38);
  text('Schéma de principe • illustration pédagogique',50,151,18,muted);
  // Shared four-step rail, high contrast with square glass panels.
  for(let i=0;i<4;i++){const x=50+i*220;box(x,190,200,4,i===stage?blue:'#29465c',null,0);text(`0${i+1}`,x,225,17,i===stage?white:muted);}
  if(kind==='softener') {
    const regen=stage===3;
    tank(358,315,215,340);box(375,275,180,64,'#11283c','#6a9ab4');box(425,288,80,35,'#66c6e8','#9adff3',2);
    box(380,368,170,240,'#0e2d4a','#9cdff5',18);
    for(let r=0;r<8;r++)for(let c=0;c<5;c++)dot(399+c*32,390+r*27,9,'#5a8ebc');
    text('Résine',465,641,22,white,'center');
    pipe([[80,350],[310,350],[310,390],[380,390]],!regen);pipe([[550,590],[630,590],[630,350],[880,350]],!regen);
    tag(regen?'Cycle séparé':'Eau dure',160,300);tag(regen?'En attente':'Eau adoucie',790,300);
    if(!regen)for(let i=0;i<5;i++){const p=((t/2+i/5)%1);dot(90+p*275,350,8,'#d4dce3');}
    if(!regen){
      for(let i=0;i<8;i++){const p=((t/2+i/8)%1);dot(404+(i%4)*32,390+190*p,5,blue);}
      for(let i=0;i<4;i++){const p=((t/2+i/4)%1);dot(320+80*p,390,7,'#d4dce3');dot(550+60*p,590,5,blue);}
      text('Ca²⁺ / Mg²⁺ retenus',465,690,23,white,'center');text('Ions sodium échangés (Na⁺)',465,722,20,muted,'center');
    }
    tank(700,495,145,160,'#526d88');text('Bac à sel',773,690,21,muted,'center');
    line([[700,550],[610,550],[610,320],[554,320]],regen?blue:'#446077',4);
    if(regen){flow([[700,550],[610,550],[610,320],[554,320]]);line([[465,610],[465,735],[660,735]],'#66c6e8',4);flow([[465,610],[465,735],[660,735]],0,'#c5e5f1');text('Saumure → résine → rinçage / égout',480,780,22,white,'center');}
    else text('Le sel sert à régénérer la résine',480,780,22,muted,'center');
  }
  if(kind==='filter') {
    pipe([[75,390],[345,390]]);pipe([[610,590],[875,590]]);
    tank(345,310,265,370,'#708b9e');box(366,340,222,300,'#0c2c46','#97c6dd',14);
    ctx.setLineDash([5,6]);box(380,365,193,255,'#163750','#9dcee3',7);ctx.setLineDash([]);
    for(let x=415;x<=535;x+=60){tank(x,370,15,200,'#8498a7');for(let j=0;j<5;j++)dot(x+16,395+j*35,7,'#303d4f');}
    for(let i=0;i<10;i++){let p=((t/2+i/10)%1);dot(80+p*330,390,6,i%2?'#9db0c1':'#303d4f');}
    for(let i=0;i<5;i++){const p=((t/2+i/5)%1);dot(384+25*p,390+i*36,6,'#303d4f');}
    text('Retour chauffage',90,332,22);text('Eau filtrée',720,535,22);text('Barreaux aimantés',477,720,23,white,'center');text('Poche de filtration complémentaire',477,756,21,muted,'center');
    text('Fer → aimants   /   Autres boues → poche',480,798,23,blue,'center');
  }
  if(kind==='pressure') {
    pipe([[90,380],[320,380],[320,620],[850,620]]);
    box(420,325,165,315,'#122c44','#8fb6cd');box(445,355,115,75,'#071b2e','#66c6e8');text('RÉGULATION',501,404,16,blue,'center');
    tank(650,380,145,230,'#8b9daf');line([[720,610],[720,620]],blue,8);
    box(352,490,47,110,'#41647c','#92bed3');dot(375,545,15,'#66c6e8');
    line([[320,500],[350,500]],blue,8);line([[400,585],[420,585]],blue,6);
    dot(245,380,56,'#0b2239');ctx.strokeStyle='#89cce7';ctx.lineWidth=3;ctx.beginPath();ctx.arc(245,380,56,0,Math.PI*2);ctx.stroke();
    const a=-1.57+.22*Math.sin(t*Math.PI/4);line([[245,380],[245+37*Math.cos(a),380+37*Math.sin(a)]],blue,4);
    ctx.setLineDash([6,8]);line([[245,324],[245,285],[502,285],[502,325]],'#82b5cd',2);ctx.setLineDash([]);
    text('Mesure',245,468,22,white,'center');text('Commande',502,690,23,white,'center');text('Volume tampon',722,690,22,white,'center');
    text('La fuite est réparée avant la régulation',480,780,23,blue,'center');
  }
  if(kind==='dosing') {
    pipe([[95,375],[865,375]]);box(100,360,760,30,'#0c2e47','#6394ae');
    line([[110,360],[850,360]],'#66c6e8',4);line([[110,390],[850,390]],'#66c6e8',4);
    flow([[100,375],[860,375]]);
    tank(220,530,180,155,'#718da7');box(268,509,84,25,'#1b3149','#9abbd0');
    box(478,475,110,118,'#285e9f','#99dff6');box(500,490,65,35,'#071a2b','#66c6e8',3);dot(533,560,21,'#d1e4ed');
    line([[310,530],[310,500],[478,500]],'#8ecbe3',5);line([[588,530],[660,530],[660,375]],'#8ecbe3',5);
    flow([[310,530],[310,500],[478,500]],0,'#94dff5');flow([[588,530],[660,530],[660,375]],0,'#94dff5');
    for(let i=0;i<6;i++){const p=((t/2+i/6)%1);dot(660+p*180,375,4,'#e0faff');}
    const pulse=.5+.5*Math.sin(t*Math.PI);ctx.globalAlpha=.35+.4*pulse;line([[680,355],[850,355]],blue,9);line([[680,395],[850,395]],blue,9);ctx.globalAlpha=1;
    text('Circuit fermé de chauffage',480,310,25,white,'center');text('Traitement',310,732,22,white,'center');text('Pompe doseuse',535,732,22,white,'center');
    text('Film protecteur sur la paroi',480,794,24,blue,'center');
  }
  if(kind==='radiator') {
    const clean=stage>=2;
    box(280,330,390,290,'#d3dce2','#f4fbff',8);
    const heat=ctx.createLinearGradient(0,340,0,610);heat.addColorStop(0,'#f68a61');heat.addColorStop(.45,'#f7bb88');heat.addColorStop(1,clean?'#ee9b67':'#2d78bb');
    for(let i=0;i<12;i++)box(294+i*30,344,18,260,heat,null,5);
    pipe([[100,365],[280,365]]);pipe([[670,580],[850,580]]);
    if(!clean)for(let i=0;i<18;i++)dot(309+i*18,592,5,'#334c63');
    box(95,650,125,88,'#123451','#66c6e8');text('Nettoyage',158,700,20,white,'center');
    line([[295,610],[295,695],[220,695]],blue,6);flow([[295,610],[295,695],[220,695]],0,stage===1?'#9fabb4':blue);
    text(clean?'Chaleur homogène':'Haut chaud · bas froid',480,280,25,white,'center');
    text('Le nettoyage évacue les boues présentes',480,780,22,blue,'center');
    if(stage===3){box(690,650,180,88,'#10344b','#80d9ef',4);text('Filtration',780,687,21,white,'center');text('en chaufferie',780,714,18,muted,'center');}
    else text('Intervention de désembouage',480,730,21,muted,'center');
  }
  if(kind==='probio') {
    pipe([[90,350],[870,350]]);text('Boucle d’eau chaude sanitaire',480,295,25,white,'center');
    dot(620,350,14,'#c5e8f5');text('Sonde REDOX',670,403,21,muted,'center');
    box(280,445,340,270,'#0d2e48','#70aec9',5);box(302,466,105,58,'#183d58','#99dff5');text('Régulation',355,502,18,white,'center');
    box(320,555,85,115,'#275e9e','#9bdcf3',4);box(475,555,85,115,'#275e9e','#9bdcf3',4);
    dot(362,628,19,'#cce8f1');dot(517,628,19,'#cce8f1');text('Pompe 1',362,696,17,muted,'center');text('Pompe 2',517,696,17,muted,'center');
    tank(80,550,125,145,'#8b9eae');text('Produit',142,728,20,white,'center');
    line([[205,605],[320,605]],blue,4);flow([[205,605],[320,605]]);
    line([[250,605],[250,740],[450,740],[450,605],[475,605]],blue,4);flow([[250,605],[250,740],[450,740],[450,605],[475,605]]);
    line([[405,580],[440,580],[440,350]],blue,4);flow([[405,580],[440,580],[440,350]]);
    line([[560,580],[730,580],[730,350]],blue,4);flow([[560,580],[730,580],[730,350]]);
    ctx.setLineDash([6,7]);line([[620,350],[620,432],[355,432],[355,466]],'#afdcf0',2);ctx.setLineDash([]);
    text('Deux pompes d’injection pilotées',480,778,23,blue,'center');
    text('La désinfection ne réchauffe pas l’eau',480,817,20,muted,'center');
  }
  if(kind==='descaling') {
    const clean=stage>=2;
    box(285,310,390,370,'#16394d','#a9ddec',3);
    line([[280,300],[675,300],[675,690]],'#badbe8',7);
    line([[330,690],[650,690]],'#a4b9c4',8);
    if(!clean)for(let i=0;i<66;i++) {
      const x=315+(i*53%325),y=345+(i*73%280);
      ctx.globalAlpha=stage===1?Math.max(0,1-(t-2)/2):.85;
      dot(x,y,3+(i%4),'#ecede2');
    }
    ctx.globalAlpha=1;
    if(stage===1||stage===2)for(let i=0;i<11;i++) {
      const y=330+((t*.3+i/11)%1)*325;
      line([[330+i*29,y],[330+i*29,y+20]],'#8fdbec',3);
    }
    text(clean?'Surface rincée et contrôlée':'Dépôt minéral sur le verre',480,270,25,white,'center');
    text('Le détartrage retire les dépôts existants',480,735,23,blue,'center');
    text('L’adoucisseur prévient les nouveaux dépôts',480,781,21,muted,'center');
  }
  if(kind==='ecs-recovery') {
    const restored=stage>=2;
    tank(295,325,210,350,'#ce8b53');
    box(333,278,135,48,'#0c263e','#87bfd6',3);
    text(restored?'Contrôlé':'À contrôler',400,309,18,restored?blue:'#f4c798','center');
    pipe([[90,620],[295,620]]);pipe([[505,365],[825,365],[825,565]]);
    line([[825,565],[875,565]],'#a9d9e9',8);
    line([[825,582],[825,640]],restored?'#f1b47e':'#7ed7ec',5);
    flow([[505,365],[825,365],[825,565]],0,restored?'#f1b47e':'#7ed7ec');
    line([[505,625],[705,625],[705,720],[400,720],[400,675]],'#557c96',7);
    if(restored)flow([[505,625],[705,625],[705,720],[400,720],[400,675]]);
    line([[315,460],[350,460],[350,420],[455,420],[455,480],[350,480],[350,540],[455,540],[455,600],[315,600]],restored?'#efac76':'#6e879b',7);
    text('Échangeur + ballon ECS',400,260,24,white,'center');
    text('Distribution',790,315,21,muted,'center');
    text('Retour de boucle',605,759,20,muted,'center');
    text('Remise en état distincte de la désinfection',480,802,21,blue,'center');
  }
  // Enough room below the diagram for the application caption overlay.
  box(50,832,860,70,'#071c31','#436d88',3);text(stages[kind][stage],480,876,26,white,'center');
  text('Principe simplifié • réglage et suivi par AQUAPROX',480,935,17,muted,'center');
}
