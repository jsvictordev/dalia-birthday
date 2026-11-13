import { invitation as c } from '../config/invitation';
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const validDate = (value: string | null): value is string => !!value && Number.isFinite(Date.parse(value));
export const hasEvent = () => validDate(c.startsAt) && validDate(c.endsAt) && Date.parse(c.endsAt) > Date.parse(c.startsAt);
const stamp = (s: string) => new Date(s).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
export function calendarUrl() {
 if (!hasEvent()) return '';
 return `https://calendar.google.com/calendar/render?${new URLSearchParams({action:'TEMPLATE',text:`Cumpleaños de ${c.name} · Nivel ${c.age}`,dates:`${stamp(c.startsAt!)}/${stamp(c.endsAt!)}`,ctz:c.timeZone,location:[c.venue,c.address].filter(Boolean).join(', '),details:c.messages.hero})}`;
}
export function downloadCalendar() {
 if (!hasEvent()) return;
 const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Dalia//Birthday//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:dalia-${stamp(c.startsAt!)}@birthday.local`,`DTSTAMP:${stamp(new Date().toISOString())}`,`DTSTART:${stamp(c.startsAt!)}`,`DTEND:${stamp(c.endsAt!)}`,`SUMMARY:${escape(`Cumpleaños de ${c.name}`)}`,`LOCATION:${escape([c.venue,c.address].filter(Boolean).join(', '))}`,'END:VEVENT','END:VCALENDAR'];
 // Fold at 75 UTF-8 octets, including the continuation space.
 const folded = lines.map(line => { let out = ''; let size = 0; for (const ch of line) { const bytes = new TextEncoder().encode(ch).length; if (size + bytes > 75) { out += '\r\n '; size = 1; } out += ch; size += bytes; } return out; });
 const url = URL.createObjectURL(new Blob([folded.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}));
 const a = document.createElement('a'); a.href=url; a.download='cumple-dalia.ics'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
