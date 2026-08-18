import { db, runMigrations } from './db.js';

runMigrations();

const farmers = [
  {
    name: 'Amina Sani',
    location: 'Kano',
    region: 'North West',
    phone: '+234 807 111 2345',
    rating: 4.9,
  },
  {
    name: 'Bala Ibrahim',
    location: 'Kaduna',
    region: 'North West',
    phone: '+234 813 222 3456',
    rating: 4.7,
  },
  {
    name: 'Chinwe Okafor',
    location: 'Abia',
    region: 'South East',
    phone: '+234 814 333 4567',
    rating: 4.8,
  },
  {
    name: 'Tunde Adebayo',
    location: 'Oyo',
    region: 'South West',
    phone: '+234 806 444 5678',
    rating: 4.6,
  },
];

const farmerInsert = db.prepare(`
  INSERT OR IGNORE INTO farmers (name, location, region, phone, rating)
  VALUES (@name, @location, @region, @phone, @rating)
`);

const userInsert = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, password, phone, location, region, role)
  VALUES (@name, @email, @password, @phone, @location, @region, @role)
`);

const listingInsert = db.prepare(`
  INSERT OR IGNORE INTO listings (
    farmer_id, title, produce, category, quantity, price, unit, location, description, image, delivery, stock
  ) VALUES (
    @farmer_id, @title, @produce, @category, @quantity, @price, @unit, @location, @description, @image, @delivery, @stock
  )
`);

for (const farmer of farmers) {
  farmerInsert.run(farmer);
}

const seedUsers = [
  {
    name: 'Ada Okafor',
    email: 'buyer@agriconnect.ng',
    password: 'password123',
    phone: '+234 803 111 2222',
    location: 'Lagos',
    region: 'South West',
    role: 'buyer',
  },
  {
    name: 'Amina Sani',
    email: 'farmer@agriconnect.ng',
    password: 'password123',
    phone: '+234 807 111 2345',
    location: 'Kano',
    region: 'North West',
    role: 'farmer',
  },
];

seedUsers.forEach((user) => userInsert.run(user));

const farmerRows = db.prepare('SELECT id, name FROM farmers').all();
const farmerMap = Object.fromEntries(farmerRows.map((row) => [row.name, row.id]));

const sampleListings = [
  {
    farmer_id: farmerMap['Amina Sani'],
    title: 'Fresh Yellow Corn',
    produce: 'Maize',
    category: 'Crops',
    quantity: '400',
    price: 28000,
    unit: 'bag',
    location: 'Kano',
    description: 'Healthy and dry yellow corn harvested this season. Great for flour milling and food processing.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    delivery: 'Farm pickup and road transport',
    stock: 24,
  },
  {
    farmer_id: farmerMap['Bala Ibrahim'],
    title: 'Premium Ginger Root',
    produce: 'Ginger',
    category: 'Spices',
    quantity: '150',
    price: 42000,
    unit: 'basket',
    location: 'Kaduna',
    description: 'Fresh, firm ginger roots with high aroma and quality for buyers in the food and spice trade.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    delivery: 'Local delivery available',
    stock: 18,
  },
  {
    farmer_id: farmerMap['Chinwe Okafor'],
    title: 'Farm Fresh Cassava',
    produce: 'Cassava',
    category: 'Roots',
    quantity: '600',
    price: 35000,
    unit: 'crate',
    location: 'Abia',
    description: 'Tender cassava for food processing and local market supply.',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=900&q=80',
    delivery: 'Pickup and local distribution',
    stock: 30,
  },
  {
    farmer_id: farmerMap['Tunde Adebayo'],
    title: 'Organic Tomatoes',
    produce: 'Tomatoes',
    category: 'Vegetables',
    quantity: '180',
    price: 26000,
    unit: 'basket',
    location: 'Oyo',
    description: 'Bright red tomatoes grown without harmful chemicals. Ready for wholesalers and retailers.',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80',
    delivery: 'Available for dispatch',
    stock: 22,
  },
  {
    farmer_id: farmerMap['Amina Sani'],
    title: 'Dried Rice',
    produce: 'Rice',
    category: 'Grains',
    quantity: '500',
    price: 95000,
    unit: 'bag',
    location: 'Kano',
    description: 'Quality milled rice suited for household and retail markets across Nigeria.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001b9b8?auto=format&fit=crop&w=900&q=80',
    delivery: 'Bulk transport options',
    stock: 14,
  },
  {
    farmer_id: farmerMap['Chinwe Okafor'],
    title: 'Fresh Plantain Bunches',
    produce: 'Plantain',
    category: 'Fruit',
    quantity: '220',
    price: 19000,
    unit: 'bunch',
    location: 'Abia',
    description: 'Large, green plantain bunches ready for markets and local traders.',
    image: 'https://images.unsplash.com/photo-1571172964276-91faaa704e1f?auto=format&fit=crop&w=900&q=80',
    delivery: 'Pickup and delivery support',
    stock: 26,
  },
  {
    farmer_id: farmerMap['Amina Sani'],
    title: 'Fresh Pepper Mix',
    produce: 'Pepper',
    category: 'Vegetables',
    quantity: '260',
    price: 32000,
    unit: 'basket',
    location: 'Kano',
    description: 'Spicy and fresh pepper ideal for restaurants, soups, and home cooking across Nigeria.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80',
    delivery: 'Fast dispatch and local distribution',
    stock: 28,
  },
  {
    farmer_id: farmerMap['Bala Ibrahim'],
    title: 'Premium Groundnut',
    produce: 'Groundnut',
    category: 'Crops',
    quantity: '320',
    price: 48000,
    unit: 'bag',
    location: 'Kaduna',
    description: 'Well-dried groundnuts suitable for oil processing, snacks, and bulk purchases.',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
    delivery: 'Available for local and regional supply',
    stock: 16,
  },
  {
    farmer_id: farmerMap['Tunde Adebayo'],
    title: 'Fresh Okra Pods',
    produce: 'Okra',
    category: 'Vegetables',
    quantity: '210',
    price: 22000,
    unit: 'crate',
    location: 'Oyo',
    description: 'Healthy okra pods harvested early for fresh market sales and restaurant orders.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    delivery: 'Pickup and home delivery support',
    stock: 32,
  },
  {
    farmer_id: farmerMap['Chinwe Okafor'],
    title: 'Fresh Yam Tubers',
    produce: 'Yam',
    category: 'Roots',
    quantity: '450',
    price: 54000,
    unit: 'tubers',
    location: 'Abia',
    description: 'Large and healthy yam tubers suitable for wholesaling and household demand.',
    image: 'https://images.unsplash.com/photo-1622227922496-0e3b0d5f7f4c?auto=format&fit=crop&w=900&q=80',
    delivery: 'Truck pickup and local logistics',
    stock: 20,
  },
  {
    farmer_id: farmerMap['Amina Sani'],
    title: 'Quality Sorghum',
    produce: 'Sorghum',
    category: 'Grains',
    quantity: '520',
    price: 60000,
    unit: 'bag',
    location: 'Kano',
    description: 'Clean sorghum grain for food processing and animal feed supply chains.',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80',
    delivery: 'Bulk haulage available',
    stock: 12,
  },
  {
    farmer_id: farmerMap['Bala Ibrahim'],
    title: 'Fresh Garlic Bulbs',
    produce: 'Garlic',
    category: 'Spices',
    quantity: '170',
    price: 27000,
    unit: 'crate',
    location: 'Kaduna',
    description: 'Aromatic garlic bulbs packed for local markets and commercial kitchen buyers.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    delivery: 'Local delivery in 2 days',
    stock: 22,
  },
];

sampleListings.forEach((listing) => listingInsert.run(listing));

console.log('Database initialized with sample farmers and listings.');

db.close();
