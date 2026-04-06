import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, UserPlus, Phone, FileText, KeyRound } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { guardProfile } from '../../data/sbmsData';

export default function StudentVerificationModal({ logId, busNumber, onClose }) {
  const [scannedId, setScannedId] = useState('');
  
  // Guest Verification States
  const [guestMobile, setGuestMobile] = useState('');
  const [guestPurpose, setGuestPurpose] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [status, setStatus] = useState(null);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [verifiedList, setVerifiedList] = useState([]);
  const isProcessing = useRef(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(`/api/student/arrival-list/${logId}`);
        const data = await res.json();
        if (data.logs) setVerifiedList(data.logs);
      } catch (e) {
        console.error(e);
      }
    };
    fetchList();
  }, [logId]);

  const setFeedbackState = (type, student) => {
    setStatus(type);
    setCurrentStudent(student);
    setTimeout(() => {
      setScannedId('');
      setStatus(null);
      setCurrentStudent(null);
      isProcessing.current = false;
    }, 4000); // slightly longer for error reading
  };

  const handleScanProcess = async (idToProcess) => {
    isProcessing.current = true;
    setScannedId(idToProcess);
    setStatus('loading');
    
    try {
      const res = await fetch('/api/student/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: idToProcess, busArrivalId: logId })
      });
      const data = await res.json();

      if (!data.valid) {
        setFeedbackState('error', null);
        return;
      }

      if (data.alreadyScanned) {
        setFeedbackState('duplicate', data.student);
        return;
      }

      await fetch('/api/student/mark-arrival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: idToProcess,
          busArrivalId: logId,
          bus_number: busNumber,
          guard_id: guardProfile.id
        })
      });

      setVerifiedList(prev => [...prev, { student_details: data.student, verified_at: new Date(), verification_status: 'VERIFIED' }]);
      setFeedbackState('success', data.student);
    } catch (e) {
      setFeedbackState('error', null);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!guestMobile || guestMobile.length < 10 || !guestPurpose) return;
    
    isProcessing.current = true;
    setStatus('loading');

    try {
      const res = await fetch('/api/student/send-guest-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_number: guestMobile })
      });
      const data = await res.json();
      
      if (res.ok) {
        setOtpStep(true);
        setStatus(null);
        // Dev visual feedback so user can actually copy the simulated OTP
        alert(`TESTING MOCK SMS:\n\nOTP for ${guestMobile} is: ${data.otp}`);
      } else {
        setFeedbackState('otp_error', null);
      }
    } catch (e) {
      setFeedbackState('error', null);
    } finally {
      isProcessing.current = false;
    }
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    if (!guestMobile || guestMobile.length < 10 || !guestPurpose || !otpCode) return;
    
    isProcessing.current = true;
    setStatus('loading');

    try {
      const res = await fetch('/api/student/mark-guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile_number: guestMobile,
          purpose: guestPurpose,
          otp: otpCode,
          busArrivalId: logId,
          bus_number: busNumber,
          guard_id: guardProfile.id
        })
      });

      const data = await res.json();

      if (!res.ok) {
         if (data.error === 'Invalid OTP.') {
             setFeedbackState('invalid_otp', null);
         } else {
             setFeedbackState('error', null); 
         }
         return;
      }

      setVerifiedList(prev => [...prev, { 
        mobile_number: guestMobile, 
        purpose: guestPurpose,
        verified_at: new Date(), 
        verification_status: 'GUEST' 
      }]);
      
      // Complete reset
      setGuestMobile('');
      setGuestPurpose('');
      setOtpCode('');
      setOtpStep(false);
      
      setFeedbackState('guest_success', { name: 'Guest', mobile: guestMobile, purpose: guestPurpose });

    } catch (e) {
      setFeedbackState('error', null);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!isProcessing.current && scannedId.trim()) {
      handleScanProcess(scannedId);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-[1100px] flex max-h-[90vh] overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-[1000] text-slate-400 hover:text-slate-800 dark:hover:text-white transition bg-slate-100 dark:bg-slate-800 rounded-full p-2">
           <X className="h-5 w-5" />
        </button>

        <div className="flex-1 p-8 border-r border-slate-200 dark:border-slate-800 flex flex-col relative overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 relative z-10">Verification Hub</h2>
            <p className="text-sm text-slate-500 mb-8 font-medium">Bus: {busNumber} • Session: {logId}</p>

            <div className="flex flex-col lg:flex-row gap-8 w-full items-start justify-between">
              <div className="flex flex-col items-center w-full max-w-[340px]">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 w-full text-left uppercase tracking-wider">Fast Scan</h3>
                <div className="w-[300px] h-[300px] rounded-xl overflow-hidden mb-4 flex items-center justify-center bg-black shadow-inner border-4 border-slate-100 dark:border-slate-800 relative group">
                   <div className="absolute inset-0 border-2 border-teal-500/0 group-hover:border-teal-500/50 transition-colors pointer-events-none z-10 rounded-xl"></div>
                   <Scanner 
                     onScan={(detectedCodes) => {
                        if (!isProcessing.current && detectedCodes && detectedCodes.length > 0) {
                           handleScanProcess(detectedCodes[0].rawValue);
                        }
                     }}
                     onError={(error) => console.log(error?.message)}
                     components={{
                       audio: false,
                       finder: true
                     }}
                     styles={{
                        container: { width: 300, height: 300 },
                        finderBorder: 2
                     }}
                   />
                </div>

                <form onSubmit={handleManualSubmit} className="w-full max-w-[300px] flex gap-2 relative z-10">
                   <input 
                     value={scannedId} 
                     onChange={e => setScannedId(e.target.value)} 
                     placeholder="ID / Roll No..." 
                     className="flex-1 glass-input py-2.5 px-3 text-sm rounded-lg bg-slate-100 border-none dark:bg-slate-800 dark:text-white focus:ring-2 ring-teal-500/50 outline-none"
                   />
                   <button type="submit" disabled={isProcessing.current} className="py-2.5 px-5 shadow-sm text-sm rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 focus:outline-none disabled:opacity-50 transition-all">Verify</button>
                </form>
              </div>

              <div className="flex flex-col items-center w-full max-w-[340px]">
                 <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 w-full text-left uppercase tracking-wider">Guest Verification</h3>
                 
                 <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
                    
                    {!otpStep ? (
                        <form onSubmit={handleSendOTP} className="flex flex-col gap-4 relative z-10 animate-in slide-in-from-left-2">
                            <div className="space-y-1.5">
                               <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Mobile Number</label>
                               <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                  <input 
                                    type="tel" 
                                    required
                                    minLength={10}
                                    maxLength={15}
                                    value={guestMobile} 
                                    onChange={e => setGuestMobile(e.target.value.replace(/\D/g, ''))} 
                                    placeholder="10-digit number" 
                                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 dark:text-white focus:ring-2 ring-indigo-500/50 outline-none"
                                  />
                               </div>
                            </div>

                            <div className="space-y-1.5">
                               <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Purpose / Reason</label>
                               <div className="relative">
                                  <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                  <textarea 
                                    required
                                    value={guestPurpose} 
                                    onChange={e => setGuestPurpose(e.target.value)} 
                                    placeholder="E.g. Parent meeting, Exam..." 
                                    rows={3}
                                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 dark:text-white focus:ring-2 ring-indigo-500/50 outline-none resize-none"
                                  />
                               </div>
                            </div>

                            <button 
                               type="submit" 
                               disabled={isProcessing.current || guestMobile.length < 10 || !guestPurpose.trim()} 
                               className="w-full mt-2 py-3 px-4 shadow-sm text-sm rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-900 dark:bg-indigo-600 dark:hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 focus:outline-none transition-all flex items-center justify-center gap-2"
                            >
                               Send OTP
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleGuestSubmit} className="flex flex-col gap-4 relative z-10 animate-in slide-in-from-right-2">
                             <div className="space-y-1.5 opacity-50">
                               <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Mobile Number</label>
                               <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                  <input 
                                    disabled
                                    value={guestMobile} 
                                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-slate-100 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400 cursor-not-allowed outline-none"
                                  />
                               </div>
                            </div>
                            
                            <div className="space-y-1.5">
                               <label className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">Enter 6-Digit OTP</label>
                               <div className="relative">
                                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                                  <input 
                                    type="text" 
                                    required
                                    maxLength={6}
                                    value={otpCode} 
                                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))} 
                                    placeholder="••••••" 
                                    className="w-full pl-10 pr-3 py-3 text-lg font-bold letter-spacing-2 text-center rounded-lg bg-indigo-50 border border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-500/50 dark:text-white focus:ring-2 ring-indigo-500 outline-none"
                                  />
                               </div>
                            </div>

                            <button 
                               type="submit" 
                               disabled={isProcessing.current || otpCode.length < 6} 
                               className="w-full mt-2 py-3 px-4 shadow-sm text-sm rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 focus:outline-none transition-all flex items-center justify-center gap-2"
                            >
                               <UserPlus className="h-4 w-4" />
                               Verify & Log Guest
                            </button>
                            
                            <button 
                               type="button" 
                               onClick={() => { setOtpStep(false); setOtpCode(''); }}
                               className="w-full py-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                               Change Mobile Number
                            </button>
                        </form>
                    )}
                 </div>
              </div>
            </div>

            <div className="mt-6 min-h-[90px] w-full flex justify-center items-center relative z-10 transition-all">
                {status === 'success' && currentStudent && (
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl w-full max-w-lg animate-in slide-in-from-bottom-2">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                        <div>
                            <p className="font-bold text-emerald-800 dark:text-emerald-400">{currentStudent.name} Verified</p>
                            <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">{currentStudent.student_id} • {currentStudent.department}</p>
                        </div>
                    </div>
                )}
                {status === 'guest_success' && currentStudent && (
                    <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 rounded-xl w-full max-w-lg animate-in slide-in-from-bottom-2">
                        <UserPlus className="h-8 w-8 text-indigo-600" />
                        <div>
                            <p className="font-bold text-indigo-800 dark:text-indigo-400">Guest Verified</p>
                            <p className="text-xs text-indigo-600/80 dark:text-indigo-400/80">+91 {currentStudent.mobile}</p>
                        </div>
                    </div>
                )}
                {status === 'invalid_otp' && (
                    <div className="flex items-center gap-4 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-xl w-full max-w-lg animate-in slide-in-from-bottom-2">
                        <XCircle className="h-8 w-8 text-rose-600" />
                        <div>
                            <p className="font-bold text-rose-800 dark:text-rose-400">Invalid OTP</p>
                            <p className="text-xs text-rose-600/80 dark:text-rose-400/80">The code you entered is incorrect.</p>
                        </div>
                    </div>
                )}
                {status === 'duplicate' && currentStudent && (
                    <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl w-full max-w-lg animate-in slide-in-from-bottom-2">
                        <AlertTriangle className="h-8 w-8 text-amber-600" />
                        <div>
                            <p className="font-bold text-amber-800 dark:text-amber-400">Already Logged</p>
                            <p className="text-xs text-amber-600/80 dark:text-amber-400/80">This user was already processed in this session.</p>
                        </div>
                    </div>
                )}
                 {(status === 'error' || status === 'otp_error') && (
                    <div className="flex items-center gap-4 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-xl w-full max-w-lg animate-in slide-in-from-bottom-2">
                        <XCircle className="h-8 w-8 text-rose-600" />
                        <div>
                            <p className="font-bold text-rose-800 dark:text-rose-400">Authentication Failed</p>
                            <p className="text-xs text-rose-600/80 dark:text-rose-400/80">Connection issue or system error. Try again.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <div className="w-80 bg-slate-50 dark:bg-slate-900/40 p-6 flex flex-col border-l border-slate-200 dark:border-slate-800">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 group flex items-center gap-2">
                Session Log
              </h3>
              <span className="bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300 text-[10px] px-2 py-1 rounded-full font-bold tracking-widest uppercase shadow-sm">
                 {verifiedList.length} Entries
              </span>
           </div>
           
           <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {verifiedList.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 opacity-50">
                    <CheckCircle2 className="w-10 h-10" />
                    <p className="text-sm font-medium">Session is empty.</p>
                  </div>
              ) : verifiedList.map((log, i) => {
                  const isGuest = log.verification_status === 'GUEST';
                  return (
                    <div key={i} className={`flex gap-3 p-3 rounded-xl border shadow-sm animate-in slide-in-from-right-4 ${isGuest ? 'bg-indigo-50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-800/30' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700/50'}`}>
                        {isGuest ? (
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-800/50 flex items-center justify-center text-indigo-500 shrink-0">
                                <UserPlus className="h-5 w-5" />
                            </div>
                        ) : log.student_details?.photo_url ? (
                            <img src={log.student_details.photo_url} alt="Profile" className="w-10 h-10 rounded-lg object-cover ring-2 ring-white dark:ring-slate-800" />
                        ) : (
                            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 uppercase font-bold shrink-0">
                                {log.student_details?.name?.[0] || '?'}
                            </div>
                        )}
                        <div className="overflow-hidden flex flex-col justify-center">
                            {isGuest ? (
                                <>
                                  <p className="text-sm font-bold text-indigo-900 dark:text-indigo-300 truncate">Guest User</p>
                                  <p className="text-[10px] uppercase font-bold text-indigo-600/60 dark:text-indigo-400/60 truncate tracking-wide">{log.mobile_number}</p>
                                </>
                            ) : (
                                <>
                                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{log.student_details?.name}</p>
                                  <p className="text-xs text-slate-500 truncate">{log.student_details?.student_id}</p>
                                </>
                            )}
                        </div>
                    </div>
                  );
              })}
           </div>
        </div>
      </div>
    </div>
  );
}
