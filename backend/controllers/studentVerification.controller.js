const Student = require('../models/Student.model');
const BusArrivalVerificationLog = require('../models/BusArrivalVerificationLog.model');

// In-memory OTP storage for guests (mobile_number -> { otp, expires })
const otpStore = new Map();

exports.verifyStudent = async (req, res) => {
  try {
    const { student_id, busArrivalId } = req.body;

    const student = await Student.findOne({ student_id });
    if (!student) {
      return res.status(404).json({ valid: false, message: 'INVALID STUDENT' });
    }

    const existingLog = await BusArrivalVerificationLog.findOne({
      arrival_log_id: busArrivalId,
      student_id: student_id
    });

    if (existingLog) {
      return res.status(200).json({
        valid: true,
        alreadyScanned: true,
        student
      });
    }

    res.status(200).json({ valid: true, alreadyScanned: false, student });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.markStudentArrival = async (req, res) => {
  try {
    const { student_id, busArrivalId, bus_number, guard_id, verification_status } = req.body;

    const verificationLog = new BusArrivalVerificationLog({
      bus_number,
      arrival_log_id: busArrivalId,
      student_id,
      guard_id,
      verification_status: verification_status || 'VERIFIED'
    });

    await verificationLog.save();

    res.status(201).json({ success: true, message: 'Student Verified and Marked!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate scan prevented.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendGuestOTP = async (req, res) => {
  try {
    const { mobile_number } = req.body;
    if (!mobile_number || mobile_number.length < 10) {
      return res.status(400).json({ error: 'Valid Mobile Number is required.' });
    }

    // Generate 6-digit simulated OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(mobile_number, { otp, expires: Date.now() + 5 * 60000 }); // 5 minutes expiry

    console.log(`\n==============================================`);
    console.log(`🚨 MOCK SMS: OTP for ${mobile_number} is: ${otp} 🚨`);
    console.log(`==============================================\n`);

    res.status(200).json({ success: true, otp, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error generating OTP' });
  }
};

exports.markGuestArrival = async (req, res) => {
  try {
    const { mobile_number, purpose, busArrivalId, bus_number, guard_id, otp } = req.body;

    if (!mobile_number || mobile_number.length < 10) {
       return res.status(400).json({ error: 'Valid Mobile Number is required for Guest entry.' });
    }

    // OTP Validation Phase
    const record = otpStore.get(mobile_number);
    if (!record) {
       return res.status(400).json({ error: 'OTP expired or not requested.' });
    }
    if (record.otp !== otp) {
       return res.status(400).json({ error: 'Invalid OTP.' });
    }
    if (Date.now() > record.expires) {
       otpStore.delete(mobile_number);
       return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
    }

    // Clear OTP after successful use
    otpStore.delete(mobile_number);

    const verificationLog = new BusArrivalVerificationLog({
      bus_number,
      arrival_log_id: busArrivalId,
      mobile_number,
      purpose,
      guard_id,
      verification_status: 'GUEST'
    });

    await verificationLog.save();

    res.status(201).json({ success: true, message: 'Guest Logged Successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'This mobile number is already registered for this session.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getArrivalList = async (req, res) => {
  try {
    const { busArrivalId } = req.params;
    
    const logs = await BusArrivalVerificationLog.aggregate([
      { $match: { arrival_log_id: busArrivalId } },
      {
        $lookup: {
          from: 'students',
          localField: 'student_id',
          foreignField: 'student_id',
          as: 'student_details'
        }
      },
      { $unwind: { path: '$student_details', preserveNullAndEmptyArrays: true } } 
    ]);

    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
