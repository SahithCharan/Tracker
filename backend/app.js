const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// data file path
const dataFilePath = path.join(__dirname, 'data', 'equipment.json');

// --------------------
// GET all equipment
// --------------------
app.get('/api/equipment', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading equipment data' });
    }
    res.json(JSON.parse(data));
  });
});

// --------------------
// POST new equipment
// --------------------
app.post('/api/equipment', (req, res) => {
  const { name, type, status, lastCleanedDate } = req.body;

  if (!name || !type || !status || !lastCleanedDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading equipment data' });
    }

    const equipmentList = JSON.parse(data);

    const newEquipment = {
      id: equipmentList.length + 1,
      name,
      type,
      status,
      lastCleanedDate
    };

    equipmentList.push(newEquipment);

    fs.writeFile(
      dataFilePath,
      JSON.stringify(equipmentList, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving equipment data' });
        }
        res.status(201).json(newEquipment);
      }
    );
  });
});

// --------------------
// DELETE equipment
// --------------------
app.delete('/api/equipment/:id', (req, res) => {
  const equipmentId = parseInt(req.params.id);

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading equipment data' });
    }

    let equipmentList = JSON.parse(data);
    const index = equipmentList.findIndex(e => e.id === equipmentId);

    if (index === -1) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    const deletedEquipment = equipmentList.splice(index, 1);

    fs.writeFile(
      dataFilePath,
      JSON.stringify(equipmentList, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error deleting equipment' });
        }
        res.json(deletedEquipment[0]);
      }
    );
  });
});

// --------------------
// PUT update equipment (STEP 4.5)
// --------------------
app.put('/api/equipment/:id', (req, res) => {
  const equipmentId = parseInt(req.params.id);
  const { name, type, status, lastCleanedDate } = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading equipment data' });
    }

    const equipmentList = JSON.parse(data);
    const equipment = equipmentList.find(e => e.id === equipmentId);

    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    // update fields
    equipment.name = name ?? equipment.name;
    equipment.type = type ?? equipment.type;
    equipment.status = status ?? equipment.status;
    equipment.lastCleanedDate = lastCleanedDate ?? equipment.lastCleanedDate;

    fs.writeFile(
      dataFilePath,
      JSON.stringify(equipmentList, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating equipment' });
        }
        res.json(equipment);
      }
    );
  });
});

// --------------------
// start server
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});