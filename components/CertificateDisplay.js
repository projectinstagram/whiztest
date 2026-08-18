import { useState } from 'react';
import CertificateView from './CertificateView';

// Shows the real signed/stamped certificate image when one has been uploaded
// for this certificate; falls back to the generated certificate design if
// there's no image field, or if the image fails to load (e.g. not saved yet).
export default function CertificateDisplay({cert}){
  const [imgError,setImgError]=useState(false);

  if(cert.image&&!imgError){
    return (
      <img id="certificate-print-area" src={cert.image} alt={`${cert.name} — ${cert.type} Certificate`}
        onError={()=>setImgError(true)}
        style={{width:'100%',height:'auto',display:'block',borderRadius:'6px',boxShadow:'0 20px 60px rgba(0,0,0,.15)'}}/>
    );
  }
  return <CertificateView cert={cert}/>;
}
