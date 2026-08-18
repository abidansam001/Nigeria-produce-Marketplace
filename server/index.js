import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, runMigrations } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

runMigrations();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nigeria Produce Marketplace API is running.' });
});

app.get('/api/listings', (req, res) => {
  const { search = '', category = '', region = '' } = req.query;

  const query = `
    SELECT l.*, f.name AS farmer_name, f.location AS farmer_location, f.region AS farmer_region, f.rating AS farmer_rating, f.phone AS farmer_phone
    FROM listings l
    JOIN farmers f ON f.id = l.farmer_id
    WHERE (
      l.title LIKE ? OR
      l.produce LIKE ? OR
      f.name LIKE ? OR
      l.location LIKE ? OR
      l.category LIKE ?
    )
    AND (? = '' OR l.category = ?)
    AND (? = '' OR f.region = ?)
    ORDER BY l.created_at DESC
  `;

  const rows = db
    .prepare(query)
    .all(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      category,
      category,
      region,
      region
    );

  res.json(rows);
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, phone, location, region, role = 'buyer' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(String(email).trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const result = db.prepare(`
    INSERT INTO users (name, email, password, phone, location, region, role)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    String(name).trim(),
    String(email).trim().toLowerCase(),
    String(password),
    phone || '',
    location || '',
    region || '',
    role === 'farmer' ? 'farmer' : 'buyer'
  );

  if (role === 'farmer') {
    const farmerExists = db.prepare('SELECT id FROM farmers WHERE name = ? AND location = ?').get(String(name).trim(), String(location || ''));
    if (!farmerExists) {
      db.prepare(`
        INSERT INTO farmers (name, location, region, phone, rating)
        VALUES (?, ?, ?, ?, 4.8)
      `).run(
        String(name).trim(),
        location || 'Farmgate',
        region || 'North West',
        phone || ''
      );
    }
  }

  const user = db.prepare('SELECT id, name, email, phone, location, region, role FROM users WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ user, message: 'Account created successfully.' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = db.prepare(`
    SELECT id, name, email, phone, location, region, role
    FROM users
    WHERE email = ? AND password = ?
  `).get(String(email).trim().toLowerCase(), String(password));

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  res.json({ user, message: 'Login successful.' });
});

app.post('/api/farmer/listings', (req, res) => {
  const {
    farmerId,
    title,
    produce,
    category,
    quantity,
    price,
    unit,
    location,
    description,
    image,
    delivery,
    stock,
  } = req.body;

  if (!title || !produce || !category || !quantity || !price || !unit || !location) {
    return res.status(400).json({ message: 'Please fill in the required listing information.' });
  }

  const user = db.prepare('SELECT id, name, location, region, phone, role FROM users WHERE id = ?').get(Number(farmerId));

  if (!user || user.role !== 'farmer') {
    return res.status(403).json({ message: 'Only farmers can create listings.' });
  }

  const farmer = db.prepare('SELECT id, name, location, region, phone FROM farmers WHERE name = ?').get(user.name);
  const farmerIdToUse = farmer ? farmer.id : db.prepare(`
    INSERT INTO farmers (name, location, region, phone, rating)
    VALUES (?, ?, ?, ?, 4.8)
  `).run(user.name, user.location || location, user.region || 'North West', user.phone || '').lastInsertRowid;

  const result = db.prepare(`
    INSERT INTO listings (
      farmer_id, title, produce, category, quantity, price, unit, location, description, image, delivery, stock
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    Number(farmerIdToUse),
    title,
    produce,
    category,
    String(quantity),
    Number(price),
    unit,
    location,
    description || '',
    image || 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    delivery || 'Pickup and local delivery',
    Number(stock || 1)
  );

  res.status(201).json({ id: result.lastInsertRowid, message: 'Listing added successfully.' });
});

app.post('/api/orders', (req, res) => {
  const { listingId, buyerName, buyerPhone, quantity } = req.body;

  if (!listingId || !buyerName || !buyerPhone || !quantity) {
    return res.status(400).json({ message: 'All buyer details are required.' });
  }

  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(listingId);

  if (!listing) {
    return res.status(404).json({ message: 'Listing not found.' });
  }

  const quantityNumber = Number(quantity);
  const totalAmount = Number(listing.price) * quantityNumber;

  if (quantityNumber <= 0 || quantityNumber > Number(listing.stock || 0)) {
    return res.status(400).json({ message: 'Requested quantity exceeds available stock.' });
  }

  const result = db.prepare(`
    INSERT INTO orders (listing_id, buyer_name, buyer_phone, quantity, total_amount)
    VALUES (?, ?, ?, ?, ?)
  `).run(listingId, buyerName, buyerPhone, `${quantityNumber}`, totalAmount);

  db.prepare('UPDATE listings SET stock = stock - ? WHERE id = ?').run(quantityNumber, listingId);

  res.status(201).json({
    id: result.lastInsertRowid,
    listingId,
    buyerName,
    totalAmount,
    status: 'Pending',
  });
});

app.get('/api/orders', (req, res) => {
  const rows = db.prepare(`
    SELECT o.*, l.title, l.produce, f.name AS farmer_name
    FROM orders o
    JOIN listings l ON l.id = o.listing_id
    JOIN farmers f ON f.id = l.farmer_id
    ORDER BY o.created_at DESC
  `).all();

  res.json(rows);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
