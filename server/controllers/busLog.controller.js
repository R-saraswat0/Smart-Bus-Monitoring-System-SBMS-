const BusLog = require('../models/BusLog.model');
const Bus = require('../models/Bus.model');
const Alert = require('../models/Alert.model');
const User = require('../models/User.model');

exports.getAll = async (req, res) => {
  try {
    const logs = await BusLog.find().sort({ createdAt: -1 }).lean();
    const normalized = logs.map((log) => ({ id: String(log._id), ...log }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};

exports.create = async (req, res) => {
  try {
    const { busNumber, type, time, date, gate, occupancy, isLate } = req.body;

    if (!busNumber || !type || !time || !date || !gate || occupancy === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bus = await Bus.findOne({ busNumber }).lean();
    const capacity = bus ? bus.capacity : 0;
    const isOverCapacity = capacity > 0 && Number(occupancy) > capacity;
    const logStatus = isOverCapacity ? 'overcrowded' : isLate ? 'late' : 'on-time';
    const user = req.user?.id ? await User.findById(req.user.id).lean() : null;

    const log = await BusLog.create({
      busNumber,
      guard: user?.name || req.user?.name || 'Unknown',
      guardId: req.user?.id || undefined,
      type,
      time,
      date,
      gate,
      occupancy: Number(occupancy),
      capacity,
      status: logStatus,
      isLate: !!isLate,
    });

    if (bus) {
      await Bus.updateOne(
        { busNumber },
        {
          $set: {
            status: isOverCapacity
              ? 'overcrowded'
              : type === 'entry'
              ? isLate ? 'late' : 'on-campus'
              : 'departed',
          },
        }
      );
    }

    if (isOverCapacity) {
      await Alert.create({
        title: `Capacity exceeded on ${busNumber}`,
        severity: 'high',
        busNumber,
        time,
        owner: user?.name || req.user?.name || 'Unknown',
        description: `Occupancy reached ${occupancy} against a capacity of ${capacity} during ${type}.`,
      });
    }

    res.status(201).json({ id: String(log._id), ...log.toObject() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create log' });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await BusLog.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return res.status(404).json({ error: 'Log not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete log' });
  }
};
