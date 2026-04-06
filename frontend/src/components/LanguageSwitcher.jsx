import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const [lang, setLang] = useState('en');

  // Load initial language if Google Translate is already initialized
  useEffect(() => {
    const getGoogleCookie = () => {
      const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
      return match ? match[2] : null;
    };
    const currentLang = getGoogleCookie();
    if (currentLang && currentLang.endsWith('hi')) {
      setLang('hi');
    }
  }, []);

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    
    // Find the hidden google translate select and trigger change
    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
      googleSelect.value = selectedLang;
      // Google script requires the event to bubble
      googleSelect.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      // Fallback: If Google Translate hasn't fully loaded yet, set the cookie manually and reload
      const cookieString = `/en/${selectedLang}`;
      document.cookie = `googtrans=${cookieString}; path=/;`;
      document.cookie = `googtrans=${cookieString}; domain=${window.location.hostname}; path=/;`;
      window.location.reload();
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Globe className="h-4 w-4 text-slate-500" />
      <select
        value={lang}
        onChange={handleChange}
        translate="no"
        className="notranslate appearance-none bg-transparent py-2 pl-2 pr-6 text-sm font-medium text-slate-700 outline-none hover:text-slate-900 focus:ring-0 focus:outline-none cursor-pointer"
        style={{
          background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-chevron-down\"><path d=\"m6 9 6 6 6-6\"/></svg>') no-repeat right center"
        }}
      >
        <option value="en">English</option>
        <option value="hi">Hindi (हिंदी)</option>
      </select>
    </div>
  );
}
