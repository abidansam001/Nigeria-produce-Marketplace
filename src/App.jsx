import { useEffect, useMemo, useState } from 'react';

const initialForm = {
  buyerName: '',
  buyerPhone: '',
  quantity: 1,
};

const initialAuthForm = {
  name: '',
  email: '',
  phone: '',
  password: '',
  location: '',
  region: 'North West',
};

const initialFarmForm = {
  title: '',
  produce: '',
  category: 'Crops',
  quantity: '',
  price: '',
  unit: 'bag',
  location: '',
  description: '',
  delivery: 'Pickup and local delivery',
  stock: '10',
};

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'ha', label: 'Hausa' },
  { code: 'yo', label: 'Yoruba' },
  { code: 'ig', label: 'Igbo' },
  { code: 'pcm', label: 'Pidgin' },
];

const translations = {
  en: {
    brand: 'AgriConnect Nigeria',
    market: 'Nigeria Produce Market',
    welcomeTitle: 'Grow your harvest. Connect to buyers faster.',
    welcomeText: 'AgriConnect helps Nigerian farmers list produce, reach customers across the country, and manage orders from one simple dashboard.',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Explore Marketplace',
    loginTitle: 'Welcome back',
    signupTitle: 'Create your account',
    email: 'Email address',
    password: 'Password',
    fullName: 'Full name',
    phone: 'Phone number',
    login: 'Login',
    signup: 'Sign up',
    continueGuest: 'Continue as guest',
    dashboard: 'Dashboard',
    overview: 'Overview',
    marketplace: 'Marketplace',
    orders: 'Orders',
    addListing: 'Add listing',
    myListings: 'My listings',
    buyer: 'Buyer',
    farmer: 'Farmer',
    location: 'Location',
    region: 'Region',
    searchPlaceholder: 'Search produce, farmer, or location',
    allCategories: 'All categories',
    allRegions: 'All regions',
    trustedFarmers: 'Trusted Farmers',
    fastDelivery: 'Fast Delivery',
    paidOrders: 'Paid Orders',
    totalFarmers: 'Farmers',
    activeListings: 'Active Listings',
    deliveries: 'Deliveries',
    liveMarket: 'Live market summary',
    noOrders: 'No orders yet.',
    placeOrder: 'Place order',
    buyerName: 'Buyer name',
    buyerPhone: 'Phone number',
    quantity: 'Quantity',
    confirmOrder: 'Confirm order',
    recentOrders: 'Recent orders',
    noListings: 'No produce listings match your filter.',
    logout: 'Logout',
    totalVolume: 'Market volume',
    ready: 'Ready to sell?',
    quickStats: 'Quick stats',
  },
  ha: {
    brand: 'AgriConnect Najeriya',
    market: 'Kasuwancin Abin Noma na Najeriya',
    welcomeTitle: 'Noma naka ya yi girma. Haɗa masu siyan da sauri.',
    welcomeText: 'AgriConnect na taimaka wa manoman Najeriya su lissafa amfanin gona, su kai ga abokan ciniki a fadin ƙasa, da sarrafa odar a dashboard ɗaya.',
    ctaPrimary: 'Fara',
    ctaSecondary: 'Binciken Kasuwa',
    loginTitle: 'Barka da komowa',
    signupTitle: 'Halicci asusu',
    email: 'Adireshin imel',
    password: 'Kalmar sirri',
    fullName: 'Cikakken suna',
    phone: 'Lambar waya',
    login: 'Shiga',
    signup: 'Riga ku',
    continueGuest: 'Ci gaba ba tare da asusu ba',
    dashboard: 'Dashboard',
    overview: 'Bayani',
    marketplace: 'Kasuwa',
    orders: 'Abubuwan odar',
    addListing: 'Ƙara lissafi',
    myListings: 'Lissafina',
    buyer: 'Mai sayarwa',
    farmer: 'Manomi',
    location: 'Wuri',
    region: 'Yanki',
    searchPlaceholder: 'Bincika amfanin gona, manomi, ko wuri',
    allCategories: 'Duk nau’ikan',
    allRegions: 'Duk yankuna',
    trustedFarmers: 'Manoma masu aminci',
    fastDelivery: 'Isarwa ta hanzari',
    paidOrders: 'Odar da aka biya',
    totalFarmers: 'Manoma',
    activeListings: 'Jerin abinci',
    deliveries: 'Aikin isarwa',
    liveMarket: 'Bayani na kasuwa',
    noOrders: 'Babu odar tukuna.',
    placeOrder: 'Yi oda',
    buyerName: 'Sunan mai saye',
    buyerPhone: 'Lambar waya',
    quantity: 'Yawan',
    confirmOrder: 'Tabbarar oda',
    recentOrders: 'Kwanakin odar',
    noListings: 'Babu amfanin gona da ya dace da tace.',
    logout: 'Fita',
    totalVolume: 'Adadin kasuwa',
    ready: 'Kuna shirye don siyarwa?',
    quickStats: 'Ƙididdiga cikin sauri',
  },
  yo: {
    brand: 'AgriConnect Nàìjíríà',
    market: 'Oja Ese Agbègbè Nàìjíríà',
    welcomeTitle: 'Gbigba eso re. So àwọn onibara ni kiakia.',
    welcomeText: 'AgriConnect ṣe iranlọwọ fun awọn agboowo Nàìjíríà lati tọju ọja wọn, de ọdọ awọn onibara kọja ilẹ-ede, ati ṣakoso awọn aṣẹ lati tabili kan.',
    ctaPrimary: 'Bẹ̀rẹ̀',
    ctaSecondary: 'Ṣawari Oja',
    loginTitle: 'Ẹ ku abọ',
    signupTitle: 'Ṣẹda akọọlẹ',
    email: 'Adirẹsi imeeli',
    password: 'Ọrọ aṣina',
    fullName: 'Orukọ ni kikun',
    phone: 'Nọmba foonu',
    login: 'Login',
    signup: 'Forukọsilẹ',
    continueGuest: 'Tẹsiwaju laisi akọọlẹ',
    dashboard: 'Iga Ipele',
    overview: 'Àkójọpọ',
    marketplace: 'Oja',
    orders: 'Aṣẹ',
    addListing: 'Fi iwe kun',
    myListings: 'Akọsílẹ̀ mi',
    buyer: 'Onibara',
    farmer: 'Agboowo',
    location: 'Ibi',
    region: 'Agbegbe',
    searchPlaceholder: 'Ṣawari eso, agboowo, tabi ibi',
    allCategories: 'Gbogbo ẹka',
    allRegions: 'Gbogbo agbegbe',
    trustedFarmers: 'Awon agboowo to gbẹkẹle',
    fastDelivery: 'Aṣọ ilera iyara',
    paidOrders: 'Aṣẹ ti san',
    totalFarmers: 'Awọn agboowo',
    activeListings: 'Àwọn àkọsílẹ̀',
    deliveries: 'Aṣọ ibufe',
    liveMarket: 'Àkójọpọ oja lọwọ',
    noOrders: 'Ko si aṣẹ.',
    placeOrder: 'Fi aṣẹ ranse',
    buyerName: 'Orukọ onibara',
    buyerPhone: 'Nọmba foonu',
    quantity: 'Iwọn',
    confirmOrder: 'Jẹrisi aṣẹ',
    recentOrders: 'Aṣẹ laipẹ',
    noListings: 'Ko si ọja ti o ba àrọrùn.',
    logout: 'Jade',
    totalVolume: 'Iwọn ọja',
    ready: 'Ṣetan lati ta?',
    quickStats: 'Akọkọ ìṣirò',
  },
  ig: {
    brand: 'AgriConnect Naijirịa',
    market: 'Ahia Ọfụma Naijirịa',
    welcomeTitle: 'Kwalite mkpụrụ gị. Jikọta ndị na-azụ ngwa ngwa.',
    welcomeText: 'AgriConnect na-enyere ụmụ ike na Naijirịa aka itinye ngwaahịa, zute ndị na-azụ n’ofe mba, na-elekọta iwu n’otu dashboard.',
    ctaPrimary: 'Bido',
    ctaSecondary: 'Lelee Ahia',
    loginTitle: 'Nnọọ, laghachi',
    signupTitle: 'Mepụta akaụntụ',
    email: 'Email adreesị',
    password: 'Okwuntughe',
    fullName: 'Aha zuru oke',
    phone: 'Nọmba ekwentị',
    login: 'Banye',
    signup: 'Debanye aha',
    continueGuest: 'Gaa na-aga n’efu',
    dashboard: 'Dashboard',
    overview: 'Nleba',
    marketplace: 'Ahia',
    orders: 'Nkuzi',
    addListing: 'Tinye ndepụta',
    myListings: 'Ndepụta m',
    buyer: 'Onye zụrụ',
    farmer: 'Ndị ọrụ ugbo',
    location: 'Ebe',
    region: 'Mpaghara',
    searchPlaceholder: 'Chọọ ihe, farmer, ma ọ bụ ebe',
    allCategories: 'Ụdị niile',
    allRegions: 'Mpaghara niile',
    trustedFarmers: 'Ndị ọrụ ugbo a kwadoro',
    fastDelivery: 'Nbugharị ngwa ngwa',
    paidOrders: 'Nkuzi akwụm',
    totalFarmers: 'Ndị ọrụ ugbo',
    activeListings: 'Ndepụta dị ndụ',
    deliveries: 'Nbugharị',
    liveMarket: 'Mkpokọta ahia ugbu a',
    noOrders: 'Enweghi nkuzi.',
    placeOrder: 'Debe nkuzi',
    buyerName: 'Aha onye zụrụ',
    buyerPhone: 'Nọmba ekwentị',
    quantity: 'Ọnụọgụ',
    confirmOrder: 'Kwenye nkuzi',
    recentOrders: 'Nkuzi nke na-adịbeghị anya',
    noListings: 'Enweghị ihe n’ahịa dakọtara.',
    logout: 'Pụọ',
    totalVolume: 'Ogo ahia',
    ready: 'I ready ịre ahịa?',
    quickStats: 'Stats ngwa ngwa',
  },
  pcm: {
    brand: 'AgriConnect Nigeria',
    market: 'Nigeria Produce Market',
    welcomeTitle: 'Grow your harvest. Connect to buyers fast.',
    welcomeText: 'AgriConnect dey help Nigerian farmers list their produce, reach customers across the country, and manage orders from one simple dashboard.',
    ctaPrimary: 'Start',
    ctaSecondary: 'Look for market',
    loginTitle: 'Welcome back',
    signupTitle: 'Create account',
    email: 'Email address',
    password: 'Password',
    fullName: 'Full name',
    phone: 'Phone number',
    login: 'Login',
    signup: 'Sign up',
    continueGuest: 'Continue as guest',
    dashboard: 'Dashboard',
    overview: 'Overview',
    marketplace: 'Market',
    orders: 'Orders',
    addListing: 'Add listing',
    myListings: 'My listings',
    buyer: 'Buyer',
    farmer: 'Farmer',
    location: 'Location',
    region: 'Region',
    searchPlaceholder: 'Search produce, farmer, or place',
    allCategories: 'All categories',
    allRegions: 'All regions',
    trustedFarmers: 'Trusted farmers',
    fastDelivery: 'Fast delivery',
    paidOrders: 'Paid orders',
    totalFarmers: 'Farmers',
    activeListings: 'Active listings',
    deliveries: 'Deliveries',
    liveMarket: 'Live market summary',
    noOrders: 'No order yet.',
    placeOrder: 'Place order',
    buyerName: 'Buyer name',
    buyerPhone: 'Phone number',
    quantity: 'Quantity',
    confirmOrder: 'Confirm order',
    recentOrders: 'Recent orders',
    noListings: 'No produce match your filter.',
    logout: 'Logout',
    totalVolume: 'Market volume',
    ready: 'Ready to sell?',
    quickStats: 'Quick stats',
  },
};

function normalizePhoneNumber(value = '') {
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `234${digits.slice(1)}`;
  return digits.startsWith('234') ? digits : `234${digits}`;
}

function formatWhatsAppLink(phone, listing, buyerName, buyerPhone, quantity) {
  const digits = normalizePhoneNumber(phone || '');
  const message = `Hello ${listing?.farmer_name || 'Farmer'}, I want to order ${quantity} ${listing?.unit || 'unit'} of ${listing?.title || 'your produce'} for ${buyerName}. My phone number is ${buyerPhone}. Please confirm availability and price.`;
  if (!digits) return '#';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function loadPaystackScript() {
  return new Promise((resolve) => {
    if (window.PaystackPop) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    }
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('welcome');
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('buyer');
  const [activeTab, setActiveTab] = useState('overview');
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [orderForm, setOrderForm] = useState(initialForm);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agriCurrentUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authForm, setAuthForm] = useState(initialAuthForm);
  const [farmerForm, setFarmerForm] = useState(initialFarmForm);
  const [processingPayment, setProcessingPayment] = useState(false);

  const t = translations[language] || translations.en;

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('agriCurrentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('agriCurrentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    if (view === 'dashboard') {
      fetchListings();
      fetchOrders();
    }
  }, [search, category, region, view]);

  const categories = useMemo(() => ['Crops', 'Spices', 'Roots', 'Vegetables', 'Grains', 'Fruit'], []);
  const regions = useMemo(() => ['North West', 'South East', 'South West'], []);

  const myFarmerListings = useMemo(
    () => (currentUser && currentUser.role === 'farmer' ? listings.filter((listing) => listing.farmer_name === currentUser.name) : []),
    [currentUser, listings]
  );

  const myOrders = useMemo(
    () => (currentUser && currentUser.role === 'farmer' ? orders.filter((order) => order.farmer_name === currentUser.name) : orders),
    [currentUser, orders]
  );

  async function fetchListings() {
    const response = await fetch(`/api/listings?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&region=${encodeURIComponent(region)}`);
    const data = await response.json();
    setListings(data);
    if (!selectedListing && data[0]) {
      setSelectedListing(data[0]);
    }
  }

  async function fetchOrders() {
    const response = await fetch('/api/orders');
    const data = await response.json();
    setOrders(data);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setOrderForm((current) => ({ ...current, [name]: value }));
  }

  function handleFarmInputChange(event) {
    const { name, value } = event.target;
    setFarmerForm((current) => ({ ...current, [name]: value }));
  }

  function handleAuthInputChange(event) {
    const { name, value } = event.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  }

  async function submitAuth(event) {
    event.preventDefault();
    setAuthMessage('');

    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const payload = authMode === 'login'
        ? { email: authForm.email, password: authForm.password }
        : { name: authForm.name, email: authForm.email, password: authForm.password, phone: authForm.phone, location: authForm.location || 'Farmgate', region: authForm.region || 'North West', role: authRole };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        setAuthMessage(result.message || 'Authentication failed.');
        return;
      }

      setCurrentUser(result.user);
      setAuthForm(initialAuthForm);
      setView('dashboard');
      setActiveTab(result.user.role === 'farmer' ? 'overview' : 'marketplace');
    } catch {
      setAuthMessage('Unable to connect to the server.');
    }
  }

  async function submitFarmerListing(event) {
    event.preventDefault();

    if (!currentUser || currentUser.role !== 'farmer') {
      setMessage('Only logged-in farmers can add listings.');
      return;
    }

    const response = await fetch('/api/farmer/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmerId: currentUser.id,
        ...farmerForm,
        price: Number(farmerForm.price),
        stock: Number(farmerForm.stock),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      setMessage(result.message || 'Unable to add listing.');
      return;
    }

    setMessage('Listing added successfully.');
    setFarmerForm(initialFarmForm);
    fetchListings();
  }

  async function submitOrder(event) {
    event.preventDefault();

    if (!selectedListing) {
      setMessage('Please choose a produce listing before ordering.');
      return;
    }

    if (!orderForm.buyerName || !orderForm.buyerPhone || !orderForm.quantity) {
      setMessage('Please fill in all order details.');
      return;
    }

    setProcessingPayment(true);

    try {
      await loadPaystackScript();

      const totalAmount = Number(selectedListing.price) * Number(orderForm.quantity);
      const handler = window.PaystackPop.setup({
        key: 'pk_test_9a6a4a1a8a1a8a1a8a1a8a1a8a1a8a1a',
        email: `${orderForm.buyerName}@agriconnect.ng`,
        amount: totalAmount * 100,
        currency: 'NGN',
        ref: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        onClose() {
          setProcessingPayment(false);
          setMessage('Payment window closed. Order not completed.');
        },
        onSuccess(response) {
          completeOrderAfterPayment(response.reference);
        },
      });

      handler.openIframe();
    } catch (error) {
      setProcessingPayment(false);
      setMessage('Unable to process payment. Please try again.');
    }
  }

  async function completeOrderAfterPayment(reference) {
    try {
      const totalAmount = Number(selectedListing.price) * Number(orderForm.quantity);
      const payload = {
        listingId: selectedListing.id,
        buyerName: orderForm.buyerName,
        buyerPhone: orderForm.buyerPhone,
        quantity: Number(orderForm.quantity || 1),
        paymentReference: reference,
        paymentStatus: 'completed',
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message || 'Unable to complete order.');
        setProcessingPayment(false);
        return;
      }

      setMessage(`✓ Payment successful! Order confirmed for ${formatCurrency(totalAmount)}.`);
      setOrderForm(initialForm);
      setProcessingPayment(false);
      fetchListings();
      fetchOrders();
    } catch (error) {
      setMessage('Order completed but could not save. Please contact support.');
      setProcessingPayment(false);
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    setView('welcome');
    setActiveTab('overview');
    setMessage('');
  }

  const dashboardCards = [
    { label: t.paidOrders, value: `${myOrders.length || 0}` },
    { label: t.totalFarmers, value: '12' },
    { label: t.activeListings, value: `${listings.length || 0}` },
    { label: t.deliveries, value: '86%' },
  ];

  const profileName = currentUser ? currentUser.name : 'Ada Okafor';
  const profileRole = currentUser ? currentUser.role : 'buyer';
  const profileInitials = profileName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={darkMode ? 'app-shell dark-mode' : 'app-shell'}>
      <header className="topbar">
        <div>
          <p className="eyebrow">{t.market}</p>
          <h1>{t.brand}</h1>
        </div>

        <div className="header-actions">
          <div className="language-switcher" aria-label="Language selector">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                type="button"
                className={language === option.code ? 'language-btn active' : 'language-btn'}
                onClick={() => setLanguage(option.code)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button type="button" className="secondary-btn theme-toggle" onClick={() => setDarkMode((current) => !current)} title={darkMode ? 'Light mode' : 'Dark mode'}>
            {darkMode ? '☀️' : '🌙'}
          </button>

          {view !== 'welcome' && (
            <button type="button" className="secondary-btn" onClick={handleLogout}>
              {t.logout}
            </button>
          )}
        </div>
      </header>

      {view === 'welcome' && (
        <main className="welcome-screen">
          <section className="welcome-hero">
            <div className="welcome-copy">
              <p className="eyebrow">{t.market}</p>
              <h2>{t.welcomeTitle}</h2>
              <p>{t.welcomeText}</p>
              <div className="button-row">
                <button type="button" className="primary-btn" onClick={() => setView('auth')}>
                  {t.ctaPrimary}
                </button>
                <button type="button" className="secondary-btn" onClick={() => setView('dashboard')}>
                  {t.ctaSecondary}
                </button>
              </div>
            </div>

            <div className="welcome-panel">
              <div className="mini-card"><span>{t.trustedFarmers}</span><strong>1,240+</strong></div>
              <div className="mini-card"><span>{t.fastDelivery}</span><strong>48 hrs</strong></div>
              <div className="mini-card accent"><span>{t.totalVolume}</span><strong>₦8.4M</strong></div>
            </div>
          </section>
        </main>
      )}

      {view === 'auth' && (
        <main className="auth-screen">
          <div className="auth-card">
            <div className="auth-tabs">
              <button type="button" className={authMode === 'login' ? 'tab-button active' : 'tab-button'} onClick={() => setAuthMode('login')}>
                {t.login}
              </button>
              <button type="button" className={authMode === 'signup' ? 'tab-button active' : 'tab-button'} onClick={() => setAuthMode('signup')}>
                {t.signup}
              </button>
            </div>

            <h2>{authMode === 'login' ? t.loginTitle : t.signupTitle}</h2>

            {authMode === 'signup' && (
              <div className="role-switcher">
                <button type="button" className={authRole === 'buyer' ? 'role-button active' : 'role-button'} onClick={() => setAuthRole('buyer')}>
                  {t.buyer}
                </button>
                <button type="button" className={authRole === 'farmer' ? 'role-button active' : 'role-button'} onClick={() => setAuthRole('farmer')}>
                  {t.farmer}
                </button>
              </div>
            )}

            <form className="auth-form" onSubmit={submitAuth}>
              {authMode === 'signup' && (
                <>
                  <label>
                    {t.fullName}
                    <input type="text" name="name" value={authForm.name} onChange={handleAuthInputChange} placeholder="Ada Okafor" required />
                  </label>
                  <label>
                    {t.phone}
                    <input type="tel" name="phone" value={authForm.phone} onChange={handleAuthInputChange} placeholder="0803 000 0000" required />
                  </label>
                  {authRole === 'farmer' && (
                    <>
                      <label>
                        {t.location}
                        <input type="text" name="location" value={authForm.location} onChange={handleAuthInputChange} placeholder="Kano" required />
                      </label>
                      <label>
                        {t.region}
                        <select name="region" value={authForm.region} onChange={handleAuthInputChange}>
                          {regions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                    </>
                  )}
                </>
              )}

              <label>
                {t.email}
                <input type="email" name="email" value={authForm.email} onChange={handleAuthInputChange} placeholder="farmer@agriconnect.ng" required />
              </label>

              <label>
                {t.password}
                <input type="password" name="password" value={authForm.password} onChange={handleAuthInputChange} placeholder="••••••••" required />
              </label>

              {authMessage && <div className="alert">{authMessage}</div>}

              <button type="submit" className="primary-btn full-width">
                {authMode === 'login' ? t.login : t.signup}
              </button>

              <button type="button" className="text-link" onClick={() => setView('dashboard')}>
                {t.continueGuest}
              </button>
            </form>
          </div>
        </main>
      )}

      {view === 'dashboard' && (
        <main className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <div className="profile-card">
              <div className="avatar">{profileInitials}</div>
              <div>
                <strong>{profileName}</strong>
                <p>{profileRole === 'farmer' ? 'Farmer dashboard' : 'Buyer dashboard'}</p>
              </div>
            </div>

            <nav className="nav-list">
              <button type="button" className={activeTab === 'overview' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('overview')}>
                {t.overview}
              </button>
              <button type="button" className={activeTab === 'marketplace' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('marketplace')}>
                {t.marketplace}
              </button>
              {currentUser?.role === 'farmer' && (
                <button type="button" className={activeTab === 'my-listings' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('my-listings')}>
                  {t.myListings}
                </button>
              )}
              <button type="button" className={activeTab === 'orders' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab('orders')}>
                {t.orders}
              </button>
            </nav>
          </aside>

          <section className="dashboard-main">
            {activeTab === 'overview' && (
              <div className="overview-panel">
                <div className="overview-header">
                  <div>
                    <p className="eyebrow">{t.ready}</p>
                    <h2>{t.liveMarket}</h2>
                  </div>
                  <button type="button" className="primary-btn" onClick={() => setActiveTab('marketplace')}>
                    {t.marketplace}
                  </button>
                </div>

                <div className="stats-grid">
                  {dashboardCards.map((item) => (
                    <div key={item.label} className="stat-card">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="insight-box">
                  <h3>{t.quickStats}</h3>
                  <ul>
                    <li>Top category: Crops</li>
                    <li>Best region: North West</li>
                    <li>Average order value: ₦52,000</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'my-listings' && currentUser?.role === 'farmer' && (
              <div className="farmer-panel">
                <div className="farmer-form-box">
                  <h3>{t.addListing}</h3>
                  <form className="farmer-form" onSubmit={submitFarmerListing}>
                    <div className="farm-grid">
                      <label>
                        {t.fullName}
                        <input value={currentUser.name} readOnly />
                      </label>
                      <label>
                        {t.location}
                        <input name="location" value={farmerForm.location} onChange={handleFarmInputChange} placeholder="Kano" required />
                      </label>
                    </div>
                    <div className="farm-grid">
                      <label>
                        Listing title
                        <input name="title" value={farmerForm.title} onChange={handleFarmInputChange} placeholder="Fresh yellow corn" required />
                      </label>
                      <label>
                        Produce
                        <input name="produce" value={farmerForm.produce} onChange={handleFarmInputChange} placeholder="Maize" required />
                      </label>
                    </div>
                    <div className="farm-grid">
                      <label>
                        Category
                        <select name="category" value={farmerForm.category} onChange={handleFarmInputChange}>
                          {categories.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      </label>
                      <label>
                        Unit
                        <select name="unit" value={farmerForm.unit} onChange={handleFarmInputChange}>
                          <option value="bag">Bag</option>
                          <option value="basket">Basket</option>
                          <option value="crate">Crate</option>
                          <option value="bunch">Bunch</option>
                          <option value="tubers">Tubers</option>
                        </select>
                      </label>
                    </div>
                    <div className="farm-grid">
                      <label>
                        Quantity
                        <input name="quantity" value={farmerForm.quantity} onChange={handleFarmInputChange} placeholder="200" required />
                      </label>
                      <label>
                        Price (NGN)
                        <input name="price" type="number" value={farmerForm.price} onChange={handleFarmInputChange} placeholder="35000" required />
                      </label>
                    </div>
                    <div className="farm-grid">
                      <label>
                        Stock
                        <input name="stock" type="number" value={farmerForm.stock} onChange={handleFarmInputChange} placeholder="15" required />
                      </label>
                      <label>
                        Delivery note
                        <input name="delivery" value={farmerForm.delivery} onChange={handleFarmInputChange} placeholder="Pickup and local delivery" />
                      </label>
                    </div>
                    <label>
                      Description
                      <textarea name="description" value={farmerForm.description} onChange={handleFarmInputChange} rows="4" placeholder="Fresh produce description" />
                    </label>
                    <button type="submit" className="primary-btn">Publish listing</button>
                  </form>
                </div>

                <div className="farmer-listings-box">
                  <h3>{t.myListings}</h3>
                  {myFarmerListings.length ? (
                    <div className="orders-list">
                      {myFarmerListings.map((listing) => (
                        <div key={listing.id} className="order-row">
                          <div>
                            <strong>{listing.title}</strong>
                            <p>{listing.produce}</p>
                          </div>
                          <span>{listing.stock} in stock</span>
                          <strong>{formatCurrency(listing.price)}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No listing added yet.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div className="content-grid">
                <section className="listings-panel">
                  <div className="filters">
                    <input type="text" placeholder={t.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">{t.allCategories}</option>
                      {categories.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <select value={region} onChange={(e) => setRegion(e.target.value)}>
                      <option value="">{t.allRegions}</option>
                      {regions.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>

                  <div className="listing-grid">
                    {listings.map((listing) => (
                      <article key={listing.id} className={`listing-card ${selectedListing?.id === listing.id ? 'selected' : ''}`} onClick={() => setSelectedListing(listing)}>
                        <img src={listing.image} alt={listing.title} />
                        <div className="listing-meta">
                          <div className="row between">
                            <span className="tag">{listing.category}</span>
                            <span className="stock">{listing.stock} in stock</span>
                          </div>
                          <h3>{listing.title}</h3>
                          <p className="produce-name">{listing.produce}</p>
                          <div className="row between price-row">
                            <strong>{formatCurrency(listing.price)}</strong>
                            <span>per {listing.unit}</span>
                          </div>
                          <div className="row between muted">
                            <span>{listing.location}</span>
                            <span>⭐ {listing.farmer_rating || 4.8}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="detail-panel">
                  {selectedListing ? (
                    <>
                      <div className="detail-header">
                        <img src={selectedListing.image} alt={selectedListing.title} />
                        <div>
                          <p className="eyebrow">{selectedListing.produce}</p>
                          <h2>{selectedListing.title}</h2>
                        </div>
                      </div>

                      <div className="stats-row">
                        <div>
                          <span>Farmer</span>
                          <strong>{selectedListing.farmer_name}</strong>
                        </div>
                        <div>
                          <span>Region</span>
                          <strong>{selectedListing.farmer_region}</strong>
                        </div>
                      </div>

                      <p className="description">{selectedListing.description}</p>

                      <ul className="detail-list">
                        <li>Quantity: {selectedListing.quantity} {selectedListing.unit}</li>
                        <li>Location: {selectedListing.location}</li>
                        <li>Delivery: {selectedListing.delivery}</li>
                        <li>Price: {formatCurrency(selectedListing.price)} / {selectedListing.unit}</li>
                      </ul>

                      <form className="order-form" onSubmit={submitOrder}>
                        <h3>{t.placeOrder}</h3>
                        <label>
                          {t.buyerName}
                          <input name="buyerName" value={orderForm.buyerName} onChange={handleInputChange} placeholder="Your full name" required />
                        </label>
                        <label>
                          {t.buyerPhone}
                          <input name="buyerPhone" value={orderForm.buyerPhone} onChange={handleInputChange} placeholder="0803 000 0000" required />
                        </label>
                        <label>
                          {t.quantity}
                          <input name="quantity" type="number" min="1" max={selectedListing.stock} value={orderForm.quantity} onChange={handleInputChange} required />
                        </label>
                        <div className="total-price">
                          <span>Total:</span>
                          <strong>{formatCurrency(Number(selectedListing.price) * Number(orderForm.quantity || 1))}</strong>
                        </div>
                        <button type="submit" disabled={processingPayment}>{processingPayment ? 'Processing...' : 'Pay with Paystack'}</button>
                      </form>

                      <a className="whatsapp-link" href={formatWhatsAppLink(selectedListing.farmer_phone, selectedListing, orderForm.buyerName || 'Buyer', orderForm.buyerPhone || 'N/A', Number(orderForm.quantity || 1))} target="_blank" rel="noreferrer">
                        Chat on WhatsApp
                      </a>

                      {message && <div className="alert">{message}</div>}
                    </>
                  ) : (
                    <div className="empty-state">{t.noListings}</div>
                  )}
                </aside>
              </div>
            )}

            {activeTab === 'orders' && (
              <section className="orders-panel orders-panel-large">
                <h3>{t.recentOrders}</h3>
                <div className="orders-list">
                  {myOrders.length ? (
                    myOrders.slice(0, 6).map((order) => (
                      <div key={order.id} className="order-row">
                        <div>
                          <strong>{order.title}</strong>
                          <p>{order.buyer_name}</p>
                        </div>
                        <span>{order.status}</span>
                        <strong>{formatCurrency(order.total_amount)}</strong>
                      </div>
                    ))
                  ) : (
                    <p>{t.noOrders}</p>
                  )}
                </div>
              </section>
            )}
          </section>
        </main>
      )}
    </div>
  );
}
