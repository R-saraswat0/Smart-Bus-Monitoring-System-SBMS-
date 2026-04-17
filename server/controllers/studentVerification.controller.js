const studentLogs = [];
const students = [
  { student_id: 'S1001', name: 'John Doe', department: 'CS' },
  { student_id: 'S1002', name: 'Jane Smith', department: 'EE' },
];

const otpStore = new Map();

exports.verifyStudent = async (req, res) => {
  const { student_id, busArrivalId } = req.body;

  const student = students.find(s => s.student_id === student_id);
  if (!student) {
    return res.status(404).json({ valid: false, message: 'INVALID STUDENT' });
  }

  const existingLog = studentLogs.find(l => l.arrival_log_id === busArrivalId && l.student_id === student_id);

  if (existingLog) {
    return res.status(200).json({ valid: true, alreadyScanned: true, student });
  }

  res.status(200).json({ valid: true, alreadyScanned: false, student });
};

exports.markStudentArrival = async (req, res) => {
  const { student_id, busArrivalId, bus_number, guard_id, verification_status } = req.body;

  if (studentLogs.find(l => l.arrival_log_id === busArrivalId && l.student_id === student_id)) {
    return res.status(400).json({ error: 'Duplicate scan prevented.' });
  }

  studentLogs.push({ bus_number, arrival_log_id: busArrivalId, student_id, guard_id, verification_status: verification_status || 'VERIFIED' });
  res.status(201).json({ success: true, message: 'Student Verified and Marked!' });
};

exports.sendGuestOTP = async (req, res) => {
  const { mobile_number } = req.body;
  if (!mobile_number || mobile_number.length < 10) {
    return res.status(400).json({ error: 'Valid Mobile Number is required.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(mobile_number, { otp, expires: Date.now() + 5 * 60000 });

  console.log(`\n==============================================`);
  console.log(`🚨 MOCK SMS: OTP for ${mobile_number} is: ${otp} 🚨`);
  console.log(`==============================================\n`);

  res.status(200).json({ success: true, otp, message: 'OTP sent successfully' });
};

exports.markGuestArrival = async (req, res) => {
  const { mobile_number, purpose, busArrivalId, bus_number, guard_id, otp } = req.body;

  if (!mobile_number || mobile_number.length < 10) {
      return res.status(400).json({ error: 'Valid Mobile Number is required for Guest entry.' });
  }

  const record = otpStore.get(mobile_number);
  if (!record) return res.status(400).json({ error: 'OTP expired or not requested.' });
  if (record.otp !== otp) return res.status(400).json({ error: 'Invalid OTP.' });
  if (Date.now() > record.expires) {
      otpStore.delete(mobile_number);
      return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
  }

  otpStore.delete(mobile_number);

  if (studentLogs.find(l => l.arrival_log_id === busArrivalId && l.mobile_number === mobile_number)) {
    return res.status(400).json({ error: 'This mobile number is already registered for this session.' });
  }

  studentLogs.push({ bus_number, arrival_log_id: busArrivalId, mobile_number, purpose, guard_id, verification_status: 'GUEST' });
  res.status(201).json({ success: true, message: 'Guest Logged Successfully!' });
};

exports.getArrivalList = async (req, res) => {
  const { busArrivalId } = req.params;
  const logs = studentLogs.filter(l => l.arrival_log_id === busArrivalId).map(l => {
    return { ...l, student_details: students.find(s => s.student_id === l.student_id) || null };
  });

  res.status(200).json({ logs });
};
