import { useState, useEffect } from 'react';
import Head from 'next/head';
import { SiteContext } from './SiteContext';
import { getTheme } from '../lib/theme';
import { NAV, NAV_ICONS, SERVICES } from '../lib/data';
import LiveChat from './LiveChat';
import ServiceModal from './ServiceModal';
import ProcessModal from './ProcessModal';

const DEFAULT_TITLE='WhizTest Pvt Ltd — Premium Digital Technology & Software Services';
const DEFAULT_DESC='WhizTest Pvt Ltd delivers world-class website development, mobile apps, UI/UX design, custom software, SEO, and testing services. 10+ projects, 99% satisfaction rate.';

export default function Layout({children,title,description}){
  const [dark,setDark]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [modal,setModal]=useState(null);
  const [processOpen,setProcessOpen]=useState(false);
  const [showTop,setShowTop]=useState(false);
  const [isMobile,setIsMobile]=useState(false);

  useEffect(()=>{
    const saved=localStorage.getItem('wt-theme');
    if(saved)setDark(saved==='dark');
    else setDark(window.matchMedia('(prefers-color-scheme:dark)').matches);
  },[]);

  useEffect(()=>{
    const check=()=>{
      const mobile=window.innerWidth<=900;
      setIsMobile(mobile);
      if(!mobile)setMenuOpen(false);
    };
    check();
    window.addEventListener('resize',check);
    return()=>window.removeEventListener('resize',check);
  },[]);

  useEffect(()=>{
    const h=()=>{setScrolled(window.scrollY>50);setShowTop(window.scrollY>500);};
    window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h);
  },[]);

  useEffect(()=>{document.body.style.overflow=menuOpen?'hidden':'';return()=>{document.body.style.overflow='';};},[menuOpen]);

  const toggleDark=()=>{const n=!dark;setDark(n);localStorage.setItem('wt-theme',n?'dark':'light');};

  const theme=getTheme(dark,isMobile);
  const {BG,BD,T1,T2,ACC,wrap}=theme;

  const ctxValue={dark,toggleDark,isMobile,setModal,setProcessOpen,...theme};

  return(
    <SiteContext.Provider value={ctxValue}>
      <Head>
        <title>{title||DEFAULT_TITLE}</title>
        <meta name="description" content={description||DEFAULT_DESC}/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta property="og:title" content={title||DEFAULT_TITLE}/>
        <meta property="og:description" content={description||DEFAULT_DESC}/>
      </Head>

      <div style={{background:BG,color:T1,minHeight:'100vh',fontFamily:"'Plus Jakarta Sans',-apple-system,sans-serif",transition:'background .3s,color .3s'}}>

        {/* ── NAVBAR ── */}
        <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,transition:'all .3s ease',
          background:scrolled?(dark?'rgba(6,15,32,.9)':'rgba(244,248,255,.92)'):undefined,
          backdropFilter:scrolled?'blur(16px)':undefined,
          borderBottom:scrolled?`1px solid ${BD}`:undefined,
          boxShadow:scrolled?'0 2px 20px rgba(37,99,235,.08)':undefined,
        }}>
          <div style={{...wrap,display:'flex',alignItems:'center',justifyContent:'space-between',height:isMobile?'72px':'88px'}}>
            <a href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'12px'}}>
              <img src="/logo.jpg" alt="WhizTest logo" style={{width:'46px',height:'46px',borderRadius:'50%',objectFit:'cover',flexShrink:0,boxShadow:'0 2px 10px rgba(37,99,235,.3)'}}/>
              <span style={{fontWeight:800,fontSize:'1.4rem',color:T1,letterSpacing:'-.01em'}}>WhizTest</span>
            </a>
            {isMobile?(
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <button onClick={toggleDark} style={{background:dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.06)',border:'none',borderRadius:'50%',width:'38px',height:'38px',cursor:'pointer',fontSize:'1rem',color:T2,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {dark?'☀️':'🌙'}
                </button>
                <button onClick={()=>setMenuOpen(p=>!p)} aria-label="Toggle menu"
                  style={{background:dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.06)',border:'none',borderRadius:'10px',width:'38px',height:'38px',cursor:'pointer',fontSize:'1.2rem',color:T1,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {menuOpen?'✕':'☰'}
                </button>
              </div>
            ):(
              <div style={{display:'flex',gap:'36px',alignItems:'center'}}>
                <div style={{display:'flex',gap:'30px',listStyle:'none'}}>
                  {NAV.map(n=>(
                    <a key={n.label} href={n.href}
                      style={{color:T2,textDecoration:'none',fontSize:'1rem',fontWeight:700,letterSpacing:'.01em',
                        padding:'6px 2px',borderBottom:'2px solid transparent',transition:'color .2s,border-color .2s'}}
                      onMouseEnter={e=>{e.target.style.color=ACC;e.target.style.borderBottomColor=ACC;}}
                      onMouseLeave={e=>{e.target.style.color=T2;e.target.style.borderBottomColor='transparent';}}>
                      {n.label}
                    </a>
                  ))}
                </div>
                <button onClick={toggleDark} style={{background:dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.06)',border:'none',borderRadius:'50%',width:'44px',height:'44px',cursor:'pointer',fontSize:'1.15rem',color:T2,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {dark?'☀️':'🌙'}
                </button>
                <a href="/contact" style={{background:'linear-gradient(135deg,#2563EB,#4F46E5)',color:'#fff',padding:'13px 28px',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'1rem',boxShadow:'0 4px 14px rgba(37,99,235,.3)',letterSpacing:'.01em',whiteSpace:'nowrap'}}>Get a Quote</a>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile drawer menu — rendered as a sibling of <nav>, not inside it, so
            nav's scroll-triggered backdropFilter never turns it into the drawer's
            containing block (that collapsed the drawer to nav's own height). */}
        {isMobile&&menuOpen&&(
          <>
            <div onClick={()=>setMenuOpen(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',backdropFilter:'blur(3px)',zIndex:1050,animation:'fadeIn .25s ease'}}/>
            <div style={{position:'fixed',top:0,left:0,bottom:0,width:'min(300px,82vw)',
              background:dark?'linear-gradient(180deg,#0A1628,#060F20)':'linear-gradient(180deg,#FFFFFF,#F4F8FF)',
              zIndex:1060,boxShadow:'8px 0 44px rgba(0,0,0,.35)',display:'flex',flexDirection:'column',
              padding:'20px 18px',overflowY:'auto',animation:'drawerSlideIn .32s cubic-bezier(.22,1,.36,1)'}}>

              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'22px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <img src="/logo.jpg" alt="WhizTest logo" style={{width:'36px',height:'36px',borderRadius:'50%',objectFit:'cover',flexShrink:0,boxShadow:'0 2px 10px rgba(37,99,235,.3)'}}/>
                  <span style={{fontWeight:800,fontSize:'1.1rem',color:T1}}>WhizTest</span>
                </div>
                <button onClick={()=>setMenuOpen(false)} aria-label="Close menu"
                  style={{background:dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.06)',border:'none',borderRadius:'50%',width:'34px',height:'34px',cursor:'pointer',fontSize:'1rem',color:T2,display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
              </div>

              {/* Featured CTA */}
              <a href="/contact" onClick={()=>setMenuOpen(false)}
                style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px',
                  background:'linear-gradient(135deg,#2563EB,#4F46E5,#7C3AED)',color:'#fff',padding:'14px 18px',
                  borderRadius:'16px',textDecoration:'none',fontWeight:800,fontSize:'.95rem',marginBottom:'20px',
                  boxShadow:'0 8px 22px rgba(37,99,235,.35)'}}>
                <span style={{display:'flex',alignItems:'center',gap:'10px'}}><span style={{fontSize:'1.2rem'}}>🚀</span>Get a Free Quote</span>
                <span>→</span>
              </a>

              {/* Nav list */}
              <div style={{background:dark?'rgba(255,255,255,.04)':'rgba(0,0,0,.03)',borderRadius:'16px',overflow:'hidden',marginBottom:'14px',border:`1px solid ${BD}`}}>
                {NAV.map((n,i)=>(
                  <a key={n.label} href={n.href} onClick={()=>setMenuOpen(false)}
                    style={{display:'flex',alignItems:'center',gap:'14px',padding:'15px 16px',color:T1,textDecoration:'none',fontWeight:700,fontSize:'.92rem',
                      borderBottom:i<NAV.length-1?`1px solid ${BD}`:'none'}}>
                    <span style={{fontSize:'1.15rem'}}>{NAV_ICONS[n.label]}</span>{n.label}
                  </a>
                ))}
              </div>

              {/* Theme toggle */}
              <button onClick={toggleDark}
                style={{display:'flex',alignItems:'center',gap:'14px',padding:'15px 16px',
                  background:dark?'rgba(255,255,255,.04)':'rgba(0,0,0,.03)',border:`1px solid ${BD}`,borderRadius:'16px',
                  color:T1,fontWeight:700,fontSize:'.92rem',cursor:'pointer',marginBottom:'14px',width:'100%',textAlign:'left',
                  fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                <span style={{fontSize:'1.15rem'}}>{dark?'☀️':'🌙'}</span>{dark?'Light Mode':'Dark Mode'}
              </button>

              <div style={{flex:1}}/>

              {/* WhatsApp quick contact */}
              <a href="https://wa.me/9779866697309" target="_blank" rel="noopener" onClick={()=>setMenuOpen(false)}
                style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',padding:'14px',
                  borderRadius:'16px',background:'rgba(37,211,102,.12)',border:'1px solid rgba(37,211,102,.35)',
                  color:'#25D366',fontWeight:800,fontSize:'.9rem',textDecoration:'none'}}>
                💬 Chat on WhatsApp
              </a>
            </div>
          </>
        )}

        {children}

        {/* ── FOOTER ── */}
        <footer style={{background:dark?'#030C1A':'#0F172A',color:'rgba(255,255,255,.6)',padding:'60px 0 28px',borderTop:`1px solid rgba(37,99,235,.15)`}}>
          <div style={wrap}>
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr 1fr':'2fr 1fr 1fr 1fr',gap:isMobile?'28px':'40px',marginBottom:'48px'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}>
                  <img src="/logo.jpg" alt="WhizTest logo" style={{width:'36px',height:'36px',borderRadius:'50%',objectFit:'cover',flexShrink:0}}/>
                  <span style={{fontWeight:800,fontSize:'1.1rem',color:'#fff'}}>WhizTest</span>
                </div>
                <p style={{lineHeight:1.72,fontSize:'.875rem',maxWidth:'260px',marginBottom:'18px'}}>Premium digital technology and software services. Building the future, one product at a time.</p>
                <div style={{display:'flex',gap:'12px'}}>
                  <a href="https://www.facebook.com/whiztest" target="_blank" rel="noopener" aria-label="WhizTest on Facebook"
                    style={{width:'34px',height:'34px',borderRadius:'8px',background:'rgba(255,255,255,.08)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'background .2s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#1877F2'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.08)'}>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.91c0-2.39 1.42-3.71 3.6-3.71 1.04 0 2.13.19 2.13.19v2.35h-1.2c-1.18 0-1.55.74-1.55 1.5v1.8h2.64l-.42 2.91h-2.22V22c4.78-.76 8.44-4.92 8.44-9.94Z"/></svg>
                  </a>
                  <a href="mailto:entrance.whiztest@gmail.com" aria-label="Email WhizTest"
                    style={{width:'34px',height:'34px',borderRadius:'8px',background:'rgba(255,255,255,.08)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'background .2s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#2563EB'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.08)'}>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/></svg>
                  </a>
                  <a href="https://wa.me/9779866697309" target="_blank" rel="noopener" aria-label="WhizTest on WhatsApp"
                    style={{width:'34px',height:'34px',borderRadius:'8px',background:'rgba(255,255,255,.08)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'background .2s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#25D366'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.08)'}>
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.08.89 2.41 1.02 2.58c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.19.21-.58.21-1.08.14-1.19-.06-.11-.23-.17-.48-.29Z"/></svg>
                  </a>
                </div>
              </div>
              {[
                {title:'Services',links:SERVICES.map(s=>({label:s.title,href:'/services'}))},
                {title:'Company',links:[{label:'About',href:'/#about'},{label:'Technologies',href:'/#technologies'},{label:'Process',href:'#',onClick:()=>setProcessOpen(true)},{label:'Portfolio',href:'/portfolio'},{label:'Careers',href:'/careers'},{label:'Contact',href:'/contact'}]},
                {title:'Contact',links:[{label:'support.whiztest@gmail.com',href:'mailto:support.whiztest@gmail.com'},{label:'+977 9866697309',href:'https://wa.me/9779866697309'},{label:'Pratappur-7, Suryapura, Nawalparasi -33008'},{label:'Mon–Sat 9am–7pm IST'}]},
              ].map((col,i)=>(
                <div key={i}>
                  <div style={{color:'#fff',fontWeight:700,marginBottom:'14px',fontSize:'.9rem'}}>{col.title}</div>
                  {col.links.map((l,j)=>l.href?(
                    <a key={j} href={l.href} onClick={l.onClick?(e=>{e.preventDefault();l.onClick();}):undefined}
                      style={{display:'block',fontSize:'.82rem',marginBottom:'8px',color:'inherit',textDecoration:'none',cursor:'pointer',transition:'color .2s'}}
                      onMouseEnter={e=>e.target.style.color='#38BDF8'} onMouseLeave={e=>e.target.style.color=''}>{l.label}</a>
                  ):(
                    <div key={j} style={{fontSize:'.82rem',marginBottom:'8px'}}>{l.label}</div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:'24px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px',fontSize:'.8rem'}}>
              <span>© 2025 WhizTest Pvt Ltd — All rights reserved</span>
              <div style={{display:'flex',gap:'20px',flexWrap:'wrap'}}>
                <a href="/privacy-policy" style={{color:'inherit',textDecoration:'none',transition:'color .2s'}}
                  onMouseEnter={e=>e.target.style.color='#38BDF8'} onMouseLeave={e=>e.target.style.color=''}>Privacy Policy</a>
                <a href="/terms-of-service" style={{color:'inherit',textDecoration:'none',transition:'color .2s'}}
                  onMouseEnter={e=>e.target.style.color='#38BDF8'} onMouseLeave={e=>e.target.style.color=''}>Terms of Service</a>
              </div>
              <span>Made with ❤️ in Nepal</span>
            </div>
          </div>
        </footer>

        {/* ── FLOATING BUTTONS ── */}
        {showTop&&(
          <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            style={{position:'fixed',bottom:'24px',left:'24px',width:'44px',height:'44px',borderRadius:'50%',border:'none',background:dark?'rgba(255,255,255,.1)':'rgba(0,0,0,.1)',cursor:'pointer',fontSize:'1.1rem',color:T1,zIndex:900,backdropFilter:'blur(8px)',animation:'slideUp .3s ease',display:'flex',alignItems:'center',justifyContent:'center'}}>
            ↑
          </button>
        )}

        {/* AI Chat */}
        <LiveChat dark={dark}/>

        {/* Service Modal */}
        {modal&&<ServiceModal svc={modal} dark={dark} onClose={()=>setModal(null)}/>}

        {/* Process Modal */}
        {processOpen&&<ProcessModal dark={dark} onClose={()=>setProcessOpen(false)}/>}

      </div>
    </SiteContext.Provider>
  );
}
