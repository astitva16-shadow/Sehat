import express from 'express';
import Hospital from '../models/Hospital.js';

const router = express.Router();

// Get all hospitals or filter by location
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius, emergency } = req.query;

    let query = {};

    // Filter by emergency availability
    if (emergency === 'true') {
      query.emergencyAvailable = true;
    }

    // Location-based query
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const maxDistance = radius ? parseInt(radius) * 1000 : 10000; // Default 10km

      const hospitals = await Hospital.find({
        ...query,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: maxDistance
          }
        }
      });

      // Calculate distance for each hospital
      const hospitalsWithDistance = hospitals.map(hospital => {
        const distance = calculateDistance(
          latitude, 
          longitude, 
          hospital.location.coordinates[1], 
          hospital.location.coordinates[0]
        );
        return {
          ...hospital.toObject(),
          distance: distance.toFixed(2)
        };
      });

      return res.json({ success: true, hospitals: hospitalsWithDistance });
    }

    // Return all hospitals if no location provided
    const hospitals = await Hospital.find(query);
    res.json({ success: true, hospitals });
  } catch (error) {
    console.error('Get hospitals error:', error);
    res.status(500).json({ success: false, message: 'Error fetching hospitals' });
  }
});

// Get single hospital
router.get('/:id', async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }
    res.json({ success: true, hospital });
  } catch (error) {
    console.error('Get hospital error:', error);
    res.status(500).json({ success: false, message: 'Error fetching hospital' });
  }
});

// Create hospital (for seeding/admin purposes)
router.post('/', async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json({ success: true, hospital });
  } catch (error) {
    console.error('Create hospital error:', error);
    res.status(500).json({ success: false, message: 'Error creating hospital' });
  }
});

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default router;
