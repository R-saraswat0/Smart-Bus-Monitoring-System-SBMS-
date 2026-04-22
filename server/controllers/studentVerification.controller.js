const Student = require('../models/Student.model');
const BusArrivalVerificationLog = require('../models/BusArrivalVerificationLog.model');

// In-memory OTP store (keyed by mobile_number) — values never sent to client
const otpStore = new Map();

exports.verifyStudent = async (req, res) => {
  try {
    const { student_id, busArrivalId } = req.body;
    if (!student_id || !busArrivalId) return res.status(400).json({ error: 'student_id and busArrivalId required' });

    const student = await Student.findOne({ student_id, is_active: true }).lean();
    if (!student) return res.status(404).json({ valid: false, message: 'INVALID STUDENT' });

    const existingLog = await BusArrivalVerificationLog.findOne({ arrival_log_id: busArrivalId, student_id }).lean();
    res.json({ valid: true, alreadyScanned: !!existingLog, student: { student_id: student.student_id, name: student.name, department: student.department } });
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' });
  }
};

exports.markStudentArrival = async (req, res) => {
  try {
    const { student_id, busArrivalId, bus_number, verification_status } = req.body;
    if (!student_id || !busArrivalId || !bus_number) return res.status(400).json({ error: 'student_id, busArrivalId, bus_number required' });

    const guard_id = req.user?.id || 'unknown';
    const existing = await BusArrivalVerificationLog.findOne({ arrival_log_id: busArrivalId, student_id }).lean();
    if (existing) return res.status(400).json({ error: 'Duplicate scan prevented.' });

    await BusArrivalVerificationLog.create({ bus_number, arrival_log_id: busArrivalId, student_id, guard_id, verification_status: verification_status || 'VERIFIED' });
    res.status(201).json({ success: true, message: 'Student verified and marked.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark arrival' });
  }
};

exports.sendGuestOTP = async (req, res) => {
  try {
    const mobile_number = String(req.body.mobile_number || '').trim();
    if (!mobile_number || mobile_number.length < 10) return res.status(400).json({ error: 'Valid mobile number required.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(mobile_number, { otp, expires: Date.now() + 5 * 60000 });

    // In production: integrate SMS gateway here. OTP is intentionally NOT returned in response.
    console.log(`\n[MOCK SMS] OTP for ${mobile_number}: ${otp}\n`);

    res.json({ success: true, message: 'OTP sent to mobile number.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

exports.markGuestArrival = async (req, res) => {
  try {
    const { mobile_number, purpose, busArrivalId, bus_number, otp } = req.body;
    const mobile = String(mobile_number || '').trim();
    if (!mobile || mobile.length < 10) return res.status(400).json({ error: 'Valid mobile number required.' });
    if (!otp) return res.status(400).json({ error: 'OTP required.' });

    const record = otpStore.get(mobile);
    if (!record) return res.status(400).json({ error: 'OTP expired or not requested.' });
    if (Date.now() > record.expires) { otpStore.delete(mobile); return res.status(400).json({ error: 'OTP expired. Request a new one.' }); }
    if (record.otp !== String(otp)) return res.status(400).json({ error: 'Invalid OTP.' });

    otpStore.delete(mobile);

    const guard_id = req.user?.id || 'unknown';
    const existing = await BusArrivalVerificationLog.findOne({ arrival_log_id: busArrivalId, mobile_number: mobile }).lean();
    if (existing) return res.status(400).json({ error: 'Mobile number already registered for this session.' });

    await BusArrivalVerificationLog.create({ bus_number, arrival_log_id: busArrivalId, mobile_number: mobile, purpose, guard_id, verification_status: 'GUEST' });
    res.status(201).json({ success: true, message: 'Guest logged successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log guest' });
  }
};

exports.getArrivalList = async (req, res) => {
  try {
    const logs = await BusArrivalVerificationLog.find({ arrival_log_id: req.params.busArrivalId }).lean();
    const enriched = await Promise.all(logs.map(async (l) => {
      const student = l.student_id ? await Student.findOne({ student_id: l.student_id }).select('name department').lean() : null;
      return { ...l, student_details: student || null };
    }));
    res.json({ logs: enriched });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch arrival list' });
  }
};
