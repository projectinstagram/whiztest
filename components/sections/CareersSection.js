import { useState } from 'react';
import { useSite } from '../SiteContext';
import { CAREERS } from '../../lib/data';
import JobModal from '../JobModal';

function formatDate(iso){
  return new Date(iso).toLocaleString('en-US',{
    year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit',hour12:true,
  }).replace(',',',');
}

export default function CareersSection({showHeading=true}){
  const [selected,setSelected]=useState(null);
  const {dark,isMobile,sec,wrap,sh,ht,hs,BG,BD,T1,T2,ACC}=useSite();

  const openCount=CAREERS.filter(j=>j.status==='open').length;

  return(
    <section id="careers" style={sec(BG)}>
      <div style={wrap}>
        {showHeading&&(
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <div style={sh()}>CAREERS</div>
            <h2 style={{...ht,textAlign:'center'}}>Join the <span style={{color:ACC}}>WhizTest Team</span></h2>
            <p style={{...hs,margin:'0 auto',textAlign:'center'}}>
              {openCount>0?`${openCount} open position${openCount>1?'s':''} right now — see something that fits?`:'No open positions right now, but check back soon.'}
            </p>
          </div>
        )}

        <div style={{position:'relative',maxWidth:'880px',margin:'0 auto'}}>
          {/* connecting line */}
          {!isMobile&&<div style={{position:'absolute',left:'170px',top:'6px',bottom:'6px',width:'2px',background:BD}}/>}
          {isMobile&&<div style={{position:'absolute',left:'6px',top:'6px',bottom:'6px',width:'2px',background:BD}}/>}

          {CAREERS.map((job,i)=>{
            const isOpen=job.status==='open';
            const StatusBadge=(
              <span style={{padding:'3px 11px',borderRadius:'20px',fontSize:'.66rem',fontWeight:800,letterSpacing:'.05em',flexShrink:0,
                background:isOpen?'rgba(34,211,238,.14)':'rgba(148,163,184,.16)',color:isOpen?'#22D3EE':'#94A3B8'}}>
                {isOpen?'● OPEN':'● CLOSED'}
              </span>
            );
            const Dot=(
              <span style={{width:'13px',height:'13px',borderRadius:'50%',flexShrink:0,zIndex:1,
                background:isOpen?'#22D3EE':'#64748B',
                boxShadow:isOpen?`0 0 0 4px ${BG},0 0 0 5px rgba(34,211,238,.4)`:`0 0 0 4px ${BG},0 0 0 5px rgba(100,116,139,.3)`}}/>
            );

            if(isMobile){
              return(
                <div key={job.id} style={{display:'flex',gap:'16px',marginBottom:i<CAREERS.length-1?'32px':0,position:'relative'}}>
                  <div style={{width:'13px',display:'flex',justifyContent:'center',paddingTop:'5px'}}>{Dot}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{color:T2,fontSize:'.78rem',marginBottom:'6px'}}>{formatDate(job.date)} · {job.type} ({job.mode})</div>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',marginBottom:'8px'}}>
                      <h3 style={{fontWeight:800,color:T1,fontSize:'1rem'}}>{job.title} <span style={{color:T2,fontWeight:600,fontSize:'.85rem'}}>({job.level} level)</span></h3>
                      {StatusBadge}
                    </div>
                    <p style={{color:T2,fontSize:'.88rem',lineHeight:1.65,marginBottom:'10px'}}>{job.summary}</p>
                    <button onClick={()=>setSelected(job)}
                      style={{background:'transparent',border:'none',cursor:'pointer',color:ACC,fontWeight:700,fontSize:'.86rem',padding:0,
                        display:'inline-flex',alignItems:'center',gap:'4px',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                      Read More <span style={{fontSize:'.8em'}}>»</span>
                    </button>
                  </div>
                </div>
              );
            }

            return(
              <div key={job.id} style={{display:'grid',gridTemplateColumns:'160px 20px 1fr',gap:'0 24px',marginBottom:i<CAREERS.length-1?'44px':0,position:'relative'}}>
                {/* date + meta */}
                <div style={{textAlign:'right',color:T2,fontSize:'.82rem',lineHeight:1.5}}>
                  <div>{formatDate(job.date)}</div>
                  <div style={{marginTop:'2px'}}>{job.type} ({job.mode})</div>
                </div>

                {/* timeline dot */}
                <div style={{display:'flex',justifyContent:'center',paddingTop:'4px'}}>{Dot}</div>

                {/* content */}
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap',marginBottom:'8px'}}>
                    <h3 style={{fontWeight:800,color:T1,fontSize:'1.08rem'}}>{job.title} <span style={{color:T2,fontWeight:600,fontSize:'.9rem'}}>({job.level} level)</span></h3>
                    {StatusBadge}
                  </div>
                  <p style={{color:T2,fontSize:'.92rem',lineHeight:1.7,marginBottom:'10px'}}>{job.summary}</p>
                  <button onClick={()=>setSelected(job)}
                    style={{background:'transparent',border:'none',cursor:'pointer',color:ACC,fontWeight:700,fontSize:'.88rem',padding:0,
                      display:'inline-flex',alignItems:'center',gap:'4px',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                    Read More <span style={{fontSize:'.8em'}}>»</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selected&&<JobModal job={selected} dark={dark} onClose={()=>setSelected(null)}/>}
    </section>
  );
}
