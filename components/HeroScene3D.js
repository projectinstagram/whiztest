import { useState, useEffect, useRef } from 'react';
import { HERO_TECH, HERO_ORBITS, CODE_SYMBOLS } from '../lib/data';

export default function HeroScene3D({isMobile}){
  const wrapRef=useRef(null);
  const laptopRef=useRef(null);
  const labelRefs=useRef([]);
  const canvasRef=useRef(null);
  const hoverRef=useRef([false,false,false,false,false]);
  const timeAccRef=useRef([0,0,0,0,0]);
  const emergeRef=useRef([1,1,1,1,1]);
  const nextEmergeRef=useRef([]);
  const mouseRef=useRef({x:0,y:0});
  const smoothRef=useRef({x:0,y:0});
  const idleRef=useRef(0);
  const runningRef=useRef(true);
  const particlesRef=useRef([]);
  const rafRef=useRef(null);
  const lastRef=useRef(0);
  const [activeKeys,setActiveKeys]=useState([]);
  const [reducedMotion,setReducedMotion]=useState(false);

  const S=isMobile?0.62:1;
  const visibleIdx=isMobile?[0,2,4]:[0,1,2,3,4];
  const keyCount=isMobile?18:40;
  const keyCols=isMobile?9:12;

  useEffect(()=>{
    const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  },[]);

  useEffect(()=>{
    const now=performance.now();
    nextEmergeRef.current=HERO_TECH.map((_,i)=>now+1800+i*900);
  },[]);

  useEffect(()=>{
    if(!wrapRef.current)return;
    const ob=new IntersectionObserver(([e])=>{runningRef.current=e.isIntersecting;},{threshold:.1});
    ob.observe(wrapRef.current);
    return()=>ob.disconnect();
  },[]);

  useEffect(()=>{
    const id=setInterval(()=>{
      if(!runningRef.current)return;
      setActiveKeys(prev=>{
        const now=Date.now();
        const kept=prev.filter(k=>now-k.t<160);
        const n=Math.random()<0.6?1:2;
        const added=[];
        for(let j=0;j<n;j++)added.push({i:Math.floor(Math.random()*keyCount),t:now});
        return [...kept,...added].slice(-10);
      });
    },isMobile?170:110);
    return()=>clearInterval(id);
  },[isMobile,keyCount]);

  useEffect(()=>{
    if(isMobile)return;
    const el=wrapRef.current;
    if(!el)return;
    const onMove=(e)=>{
      const r=el.getBoundingClientRect();
      mouseRef.current={
        x:((e.clientX-r.left)/r.width)*2-1,
        y:((e.clientY-r.top)/r.height)*2-1,
      };
    };
    const onLeave=()=>{mouseRef.current={x:0,y:0};};
    el.addEventListener('pointermove',onMove);
    el.addEventListener('pointerleave',onLeave);
    return()=>{el.removeEventListener('pointermove',onMove);el.removeEventListener('pointerleave',onLeave);};
  },[isMobile]);

  useEffect(()=>{
    const canvas=canvasRef.current,el=wrapRef.current;
    if(!canvas||!el)return;
    const resize=()=>{
      const r=el.getBoundingClientRect();
      const dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=r.width*dpr;
      canvas.height=r.height*dpr;
      canvas.style.width=r.width+'px';
      canvas.style.height=r.height+'px';
      const ctx=canvas.getContext('2d');
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    resize();
    const ro=new ResizeObserver(resize);
    ro.observe(el);
    return()=>ro.disconnect();
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas?canvas.getContext('2d'):null;
    const maxParticles=isMobile?14:42;
    const motionMul=reducedMotion?0.25:1;
    let ambientTimer=0;

    const spawnAmbient=()=>{
      if(!ctx||particlesRef.current.length>=maxParticles)return;
      const w=canvas.clientWidth,h=canvas.clientHeight;
      const cx=w/2,cy=h/2+30*S;
      const sym=CODE_SYMBOLS[Math.floor(Math.random()*CODE_SYMBOLS.length)];
      particlesRef.current.push({
        x:cx+(Math.random()-0.5)*80*S,y:cy+(Math.random()-0.5)*20*S,
        vx:(Math.random()-0.5)*18,vy:-(24+Math.random()*30),
        life:1,decay:0.5+Math.random()*0.35,char:sym,
        hue:Math.random()<0.5?'56,189,248':'167,139,250',
        size:(11+Math.random()*4)*S,
      });
    };

    const spawnTrail=(x0,y0,x1,y1)=>{
      if(!ctx)return;
      const n=isMobile?4:8;
      for(let k=0;k<n;k++){
        if(particlesRef.current.length>=maxParticles)break;
        const t=k/n;
        particlesRef.current.push({
          x:x0+(x1-x0)*t+(Math.random()-0.5)*10,y:y0+(y1-y0)*t+(Math.random()-0.5)*10,
          vx:(Math.random()-0.5)*8,vy:(Math.random()-0.5)*8,
          life:1,decay:0.9+Math.random()*0.4,char:null,
          hue:'96,165,250',size:(2+Math.random()*2)*S,
        });
      }
    };

    const tick=(now)=>{
      const last=lastRef.current||now;
      let dt=(now-last)/1000;
      dt=Math.min(dt,0.05);
      lastRef.current=now;

      if(runningRef.current){
        smoothRef.current.x+=(mouseRef.current.x-smoothRef.current.x)*0.06;
        smoothRef.current.y+=(mouseRef.current.y-smoothRef.current.y)*0.06;
        idleRef.current+=dt;

        if(laptopRef.current){
          const idleRX=Math.sin(idleRef.current*0.35)*2.4;
          const idleRY=Math.sin(idleRef.current*0.22+1)*3;
          const mx=smoothRef.current.x,my=smoothRef.current.y;
          const rx=12-my*5*motionMul+idleRX*motionMul;
          const ry=-16+mx*9*motionMul+idleRY*motionMul;
          laptopRef.current.style.transform=`translate(-50%,-50%) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }

        const depthPush=smoothRef.current.y*34*motionMul;

        visibleIdx.forEach((i)=>{
          const orbit=HERO_ORBITS[i];
          const node=labelRefs.current[i];
          if(!node)return;
          const hovered=hoverRef.current[i];
          if(!hovered)timeAccRef.current[i]+=dt*orbit.speed*orbit.dir*motionMul;
          const angle=i*(Math.PI*2/5)+timeAccRef.current[i];
          const xOrbit=Math.cos(angle)*orbit.radiusX*S;
          const yPlane=Math.sin(angle)*orbit.radiusY*S;
          const tiltRad=orbit.tilt*Math.PI/180;
          const zOrbit=yPlane*Math.sin(tiltRad)+depthPush;
          const yScreen=yPlane*Math.cos(tiltRad)+orbit.baseY*S;

          let ep=emergeRef.current[i];
          if(ep<1){
            ep=Math.min(1,ep+dt*(reducedMotion?0.8:1.15));
            emergeRef.current[i]=ep;
          }else if(now>=nextEmergeRef.current[i]){
            nextEmergeRef.current[i]=now+5200+i*650+Math.random()*900;
            if(canvas)spawnTrail(canvas.clientWidth/2,canvas.clientHeight/2+30*S,canvas.clientWidth/2+xOrbit,canvas.clientHeight/2+yScreen);
            emergeRef.current[i]=0;
            ep=0;
          }
          const eased=1-Math.pow(1-ep,3);
          const fx=ep>=1?xOrbit:xOrbit*eased;
          const fy=ep>=1?yScreen:(-40*S)+(yScreen-(-40*S))*eased;
          const fz=ep>=1?zOrbit:50*(1-eased)+zOrbit*eased;

          const depthT=Math.max(0,Math.min(1,(fz+90)/180));
          let scale=0.8+depthT*0.32;
          let opacity=0.68+depthT*0.32;

          if(hovered){scale+=0.14;opacity=1;}
          if(ep<1){opacity*=Math.min(1,ep*2);scale*=0.85+eased*0.15;}

          node.style.transform=`translate3d(-50%,-50%,0) translate3d(${fx}px,${fy}px,${fz}px) scale(${scale})`;
          node.style.opacity=opacity;
          // depth-sorted z-index (laptop sits at 20): far labels tuck behind it, near labels float in front
          node.style.zIndex=hovered?60:Math.round(depthT*40);
          node.style.boxShadow=hovered
            ?`0 0 26px 6px ${HERO_TECH[i].glow}99, 0 8px 24px rgba(0,0,0,.35)`
            :`0 0 ${6+depthT*8}px ${HERO_TECH[i].glow}45, 0 4px 14px rgba(0,0,0,.3)`;
        });
      }

      if(ctx&&canvas){
        const w=canvas.clientWidth,h=canvas.clientHeight;
        ctx.fillStyle='rgba(6,13,28,0.22)';
        ctx.fillRect(0,0,w,h);

        ambientTimer+=dt;
        const spawnEvery=(isMobile?0.65:0.28)*(reducedMotion?2.2:1);
        if(runningRef.current&&ambientTimer>spawnEvery){
          ambientTimer=0;
          spawnAmbient();
        }

        const arr=particlesRef.current;
        for(let k=arr.length-1;k>=0;k--){
          const p=arr[k];
          if(runningRef.current){
            p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=6*dt;
            p.life-=p.decay*dt;
          }
          if(p.life<=0){arr.splice(k,1);continue;}
          ctx.globalAlpha=Math.max(0,Math.min(1,p.life))*0.85;
          ctx.shadowBlur=5;
          ctx.shadowColor=`rgba(${p.hue},0.9)`;
          if(p.char){
            ctx.font=`700 ${p.size}px 'Plus Jakarta Sans',monospace`;
            ctx.fillStyle=`rgba(${p.hue},0.95)`;
            ctx.fillText(p.char,p.x,p.y);
          }else{
            ctx.beginPath();
            ctx.fillStyle=`rgba(${p.hue},0.95)`;
            ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
            ctx.fill();
          }
        }
        ctx.globalAlpha=1;ctx.shadowBlur=0;
      }

      rafRef.current=requestAnimationFrame(tick);
    };

    rafRef.current=requestAnimationFrame(tick);
    return()=>{if(rafRef.current)cancelAnimationFrame(rafRef.current);};
  },[isMobile,reducedMotion]);

  return(
    <div ref={wrapRef} style={{
      position:'relative',width:'100%',height:isMobile?'260px':'500px',
      perspective:'1400px',borderRadius:'28px',overflow:'hidden',
      background:'radial-gradient(ellipse at 50% 28%,rgba(30,45,95,.5),rgba(5,10,24,.94) 72%)',
      border:'1px solid rgba(56,189,248,.2)',
      boxShadow:'0 30px 70px rgba(2,6,20,.55), inset 0 0 60px rgba(37,99,235,.08)',
    }}>
      {/* particle canvas */}
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none'}}/>

      {/* arc-reactor core glow — sits behind the laptop, bleeds out around its edges */}
      <div style={{position:'absolute',top:'50%',left:'50%',width:`${150*S}px`,height:`${150*S}px`,marginLeft:`${-75*S}px`,marginTop:`${-75*S}px`,
        borderRadius:'50%',background:'radial-gradient(circle,rgba(224,247,255,.95) 0%,rgba(103,232,249,.6) 34%,rgba(37,99,235,.28) 62%,transparent 78%)',
        filter:'blur(3px)',animation:'reactorCorePulse 2.6s ease-in-out infinite',zIndex:3,pointerEvents:'none'}}/>

      {/* orbit rings — layered like an arc-reactor housing. Flat 2D ellipses (not
          rotateX'd circles): a perspective-projected 3D tilt can paint a hair
          outside its own box in some browsers and slip past overflow:hidden —
          plain 2D transforms are guaranteed to clip correctly, no exceptions. */}
      <div style={{position:'absolute',top:'50%',left:'50%',width:`${200*S}px`,height:`${74*S}px`,marginLeft:`${-100*S}px`,marginTop:`${-37*S}px`,
        borderRadius:'50%',border:`${2*S}px dashed rgba(224,247,255,.65)`,
        boxShadow:'0 0 18px rgba(224,247,255,.7), 0 0 40px rgba(56,189,248,.4)',
        animation:'spin 18s linear infinite, reactorGlowPulse 2.2s ease-in-out infinite',zIndex:2,pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'50%',left:'50%',width:`${260*S}px`,height:`${96*S}px`,marginLeft:`${-130*S}px`,marginTop:`${-48*S}px`,
        borderRadius:'50%',border:`${1.5*S}px solid rgba(56,189,248,.55)`,
        boxShadow:'0 0 24px rgba(56,189,248,.5), 0 0 50px rgba(37,99,235,.32)',
        animation:'spin 34s linear infinite reverse, reactorGlowPulse 3s ease-in-out infinite .4s',zIndex:2,pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'50%',left:'50%',width:`${320*S}px`,height:`${118*S}px`,marginLeft:`${-160*S}px`,marginTop:`${-59*S}px`,
        borderRadius:'50%',border:'1.5px solid rgba(139,92,246,.4)',boxShadow:'0 0 40px rgba(124,58,237,.26)',
        animation:'spin 46s linear infinite',zIndex:2,pointerEvents:'none'}}/>

      {/* laptop */}
      <div ref={laptopRef} style={{position:'absolute',top:'50%',left:'50%',width:0,height:0,transformStyle:'preserve-3d',zIndex:20,willChange:'transform'}}>
        {/* screen */}
        <div style={{position:'absolute',left:0,top:0,transform:'translate(-50%,-100%)',
          width:`${230*S}px`,height:`${146*S}px`,
          borderRadius:`${12*S}px`,background:'linear-gradient(160deg,#0B1830,#050B18)',
          border:'1px solid rgba(56,189,248,.4)',boxShadow:'0 0 34px rgba(37,99,235,.45), inset 0 0 20px rgba(0,0,0,.5)',
          overflow:'hidden',padding:`${10*S}px`,boxSizing:'border-box'}}>
          <div style={{display:'flex',gap:`${5*S}px`,marginBottom:`${8*S}px`}}>
            {['#F87171','#FBBF24','#34D399'].map(c=>(
              <span key={c} style={{width:`${6*S}px`,height:`${6*S}px`,borderRadius:'50%',background:c,opacity:.8,display:'inline-block'}}/>
            ))}
          </div>
          {[0.9,0.6,0.75,0.4,0.65,0.3].map((w,li)=>(
            <div key={li} style={{display:'flex',alignItems:'center',gap:`${4*S}px`,marginBottom:`${6*S}px`}}>
              <div style={{width:`${w*140*S}px`,height:`${5*S}px`,borderRadius:'3px',
                background:['#38BDF8','#818CF8','#34D399','#FBBF24','#38BDF8','#818CF8'][li],opacity:.55}}/>
              {li===5&&<span style={{width:`${2*S}px`,height:`${8*S}px`,background:'#38BDF8',display:'inline-block',animation:'blink 1s step-end infinite'}}/>}
            </div>
          ))}
          <div style={{position:'absolute',left:0,right:0,height:'40%',background:'linear-gradient(180deg,transparent,rgba(56,189,248,.35),transparent)',animation:'screenScan 3.6s ease-in-out infinite',pointerEvents:'none'}}/>
        </div>

        {/* keyboard base */}
        <div style={{position:'absolute',left:0,top:`${4*S}px`,transformOrigin:'top center',
          transform:`translate(-50%,0) rotateX(72deg) translateZ(${-6*S}px)`,
          width:`${250*S}px`,height:`${90*S}px`,
          background:'linear-gradient(180deg,#111B33,#0A1424)',borderRadius:`0 0 ${16*S}px ${16*S}px`,
          border:'1px solid rgba(56,189,248,.22)',
          boxShadow:'0 20px 40px rgba(0,0,0,.5)',padding:`${8*S}px`,boxSizing:'border-box',
          display:'grid',gridTemplateColumns:`repeat(${keyCols},1fr)`,gap:`${3*S}px`,alignContent:'start'}}>
          {Array.from({length:keyCount}).map((_,ki)=>{
            const isActive=activeKeys.some(k=>k.i===ki);
            return(
              <div key={ki} style={{
                height:`${9*S}px`,borderRadius:`${2*S}px`,
                background:isActive?'rgba(56,189,248,.85)':'rgba(255,255,255,.08)',
                boxShadow:isActive?'0 0 8px 2px rgba(56,189,248,.75)':'none',
                transition:'background .18s ease,box-shadow .18s ease'}}/>
            );
          })}
        </div>
      </div>

      {/* floating tech labels */}
      {visibleIdx.map(i=>{
        const t=HERO_TECH[i];
        return(
          <div key={i} ref={el=>{labelRefs.current[i]=el;}}
            onMouseEnter={()=>{hoverRef.current[i]=true;}}
            onMouseLeave={()=>{hoverRef.current[i]=false;}}
            style={{position:'absolute',top:'50%',left:'50%',zIndex:20,
              padding:`${8*S}px ${14*S}px`,borderRadius:'14px',
              background:'rgba(10,16,34,.82)',backdropFilter:'blur(6px)',
              border:`1px solid ${t.glow}55`,
              display:'flex',alignItems:'center',gap:`${8*S}px`,
              whiteSpace:'nowrap',fontSize:`${0.82*S}rem`,fontWeight:700,color:'#F1F5F9'}}>
            <span style={{fontSize:`${1.15*S}rem`}}>{t.emoji}</span>{t.label}
          </div>
        );
      })}
    </div>
  );
}
