import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CalendarEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
}

interface AddToCalendarProps {
  event: CalendarEvent;
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const getGoogleCalendarUrl = (): string => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      details: event.description,
      location: event.location,
      dates: `${formatDate(event.startDate)}/${formatDate(event.endDate)}`,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const getICSFileContent = (): string => {
    const formatICSDate = (date: Date): string => formatDate(date).slice(0, 8) + 'T' + formatDate(date).slice(8, 14) + 'Z';
    
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Brilliant Perspectives//LIMITLESS Summit//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(event.startDate)}`,
      `DTEND:${formatICSDate(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}`,
      'STATUS:CONFIRMED',
      `CREATED:${formatICSDate(new Date())}`,
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  };

  const getiCalUrl = (): string => {
    const data = getICSFileContent();
    const blob = new Blob([data], { type: 'text/calendar;charset=utf-8' });
    return window.URL.createObjectURL(blob);
  };

  const downloadICS = () => {
    const blob = new Blob([getICSFileContent()], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'limitless-summit.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getOutlookOnlineUrl = (): string => {
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      startdt: event.startDate.toISOString(),
      enddt: event.endDate.toISOString(),
      subject: event.title,
      body: event.description,
      location: event.location,
    });

    return `https://outlook.live.com/calendar/0/${params.toString()}`;
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#2A2A2A] rounded-full px-4 py-2 text-white/90 hover:text-white border border-white/[0.08] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Add to Calendar</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-72 bg-[#2A2A2A] rounded-xl border border-white/[0.08] shadow-xl overflow-hidden z-50"
        >
          <div className="p-3">
            <div className="text-sm text-white/70 mb-2 px-2">
              Choose your calendar app:
            </div>
            
            <div className="space-y-1">
              {/* Google Calendar */}
              <button
                onClick={() => {
                  window.open(getGoogleCalendarUrl(), '_blank');
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-white/90 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22c-5.5 0-10-4.5-10-10S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/>
                    <path d="M17 11h-4V7c0-.6-.4-1-1-1s-1 .4-1 1v4H7c-.6 0-1 .4-1 1s.4 1 1 1h4v4c0 .6.4 1 1 1s1-.4 1-1v-4h4c.6 0 1-.4 1-1s-.4-1-1-1z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Google Calendar</div>
                  <div className="text-xs text-white/60">Best for Gmail users</div>
                </div>
              </button>

              {/* Apple Calendar */}
              <button
                onClick={() => {
                  window.open(getiCalUrl(), '_blank');
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-white/90 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Apple Calendar</div>
                  <div className="text-xs text-white/60">For iPhone & Mac users</div>
                </div>
              </button>

              {/* Other Calendar Apps */}
              <button
                onClick={() => {
                  downloadICS();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-white/90 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Other Calendar Apps</div>
                  <div className="text-xs text-white/60">Download .ics file</div>
                </div>
              </button>
            </div>

            <div className="mt-3 px-2 py-2 bg-white/5 rounded-lg">
              <div className="text-xs text-white/60">
                💡 Tip: Choose the option that matches your default calendar app for the best experience
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AddToCalendar; 