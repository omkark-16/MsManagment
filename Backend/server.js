const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;
const DATA_FILE = './data.json';

app.use(cors());
app.use(bodyParser.json());

// Utility function to read data
const readData = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Utility function to write data
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all data
app.get('/api/data', (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error reading data file');
  }
});

// POST a new data entry
app.post('/api/data', (req, res) => {
  try {
    const data = readData();
    const newEntry = {
      id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
      ...req.body
    };
    data.push(newEntry);
    writeData(data);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).send('Error writing data file');
  }
});

// DELETE a data entry by ID
app.delete('/api/data/:id', (req, res) => {
  try {
    let data = readData();
    const entryId = parseInt(req.params.id);
    const initialLength = data.length;
    data = data.filter(entry => entry.id !== entryId);
    if (data.length < initialLength) {
      writeData(data);
      res.status(200).send({ message: 'Entry deleted successfully' });
    } else {
      res.status(404).send({ message: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).send('Error deleting entry');
  }
});

app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});