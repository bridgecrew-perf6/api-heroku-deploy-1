const router = require('express').Router();
const { Location, Traveller, Trip } = require('../models');

router.get('/api/travellers', async (req, res) => {
  const travellerData = await Traveller.findAll(req.body);
  res.json(travellerData)
});
router.post('/api/travellers', async (req, res) => {
  const travellerData = await Traveller.create(req.body);
  res.json(travellerData);
});
router.get('/api/travellers/:id', async (req, res) => {
  const travellerData = await Traveller.findByPk(
    req.params.id,
    {
      include: [{ model: Location, through: Trip }]
    }
  );
  res.json(travellerData);
});
router.delete('/api/travellers/:id', async (req, res) => {
  const travellerData = await Traveller.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(travellerData);
});
router.get('/api/locations/', async (req, res) => {
  const locationData = await Location.findAll(req.body);
  res.json(locationData)
});
router.post('/api/locations/', async (req, res) => {
  const locationData = await Location.create(req.body);
  res.json(locationData);
});
router.get('/api/locations/:id', async (req, res) => {
  const locationData = await Location.findByPk(
    req.params.id,
    {
      include: [{ 
        model: Traveller, 
        through:{
          attributes: []
        } 
      }]
    }
  );
  const location = JSON.parse(JSON.stringify(locationData));

  location.travellers.forEach(traveller => {
      delete traveller.trip;
  });
 
  res.json(location);
});
router.delete('/api/locations/:id', async (req, res) => {
  const locationData = await Location.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(locationData);
});
router.get('/api/trips', async (req, res) => {
  const tripData = await Trip.findAll({});
  res.json(tripData);
});

router.post('/api/trips', async (req, res) => {
  const tripData = await Trip.create(req.body);
  res.json(tripData);
});

router.delete('/api/trips/:id', async (req, res) => {
  const tripData = await Trip.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(tripData);
});
module.exports = router;
