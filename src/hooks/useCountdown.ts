import { useEffect, useState } from 'react';
import { invitation } from '../config/invitation';
import { validDate } from '../utils/calendar';
export function useCountdown() {
 const [now,setNow]=useState(Date.now());
 useEffect(()=>{const timer=window.setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer);},[]);
 const configured=validDate(invitation.startsAt);
 const left=configured ? Math.max(0,Math.floor((Date.parse(invitation.startsAt!)-now)/1000)):null;
 return {left,values:left===null?['—','—','—','—']:[Math.floor(left/86400),Math.floor(left/3600)%24,Math.floor(left/60)%60,left%60].map(n=>String(n).padStart(2,'0'))};
}
