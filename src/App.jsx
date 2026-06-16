import React, { useState, useEffect } from 'react';
import Auth from './components/Auth.jsx';
import PriceChart from './components/PriceChart.jsx';
import MarketSliders from './components/MarketSliders.jsx';
import { TrendingUp, Package, DollarSign, Activity, LogOut, Tag, Search, Zap, Download, Eye, AlertTriangle } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [demand, setDemand] = useState(5);
  const [supply, setSupply] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [isPredictiveMode, setIsPredictiveMode] = useState(false); // ADVANCED FEATURE 1
  const [priceAlertThreshold, setPriceAlertThreshold] = useState(500); // ADVANCED FEATURE 3
  
  const [products, setProducts] = useState([
    { id: 1, name: "Fjallraven - Foldsack No. 1 Backpack", basePrice: 109.95, costPrice: 65.00, currentPrice: 109.95, category: "men's clothing" },
    { id: 2, name: "Mens Casual Premium Slim Fit T-Shirts", basePrice: 22.30, costPrice: 10.00, currentPrice: 22.30, category: "men's clothing" },
    { id: 3, name: "Mens Cotton Jacket", basePrice: 55.99, costPrice: 30.00, currentPrice: 55.99, category: "men's clothing" },
    { id: 4, name: "Mens Casual Slim Fit", basePrice: 15.99, costPrice: 7.50, currentPrice: 15.99, category: "men's clothing" },
    { id: 5, name: "John Hardy Women's Legends Naga Gold Chain", basePrice: 695.00, costPrice: 400.00, currentPrice: 695.00, category: "jewelery" },
    { id: 6, name: "Solid Gold Petite Micropave", basePrice: 168.00, costPrice: 95.00, currentPrice: 168.00, category: "jewelery" },
    { id: 7, name: "White Gold Plated Princess", basePrice: 9.99, costPrice: 4.00, currentPrice: 9.99, category: "jewelery" },
    { id: 8, name: "Pierced Owl Rose Gold Plated Stainless Steel", basePrice: 10.99, costPrice: 5.00, currentPrice: 10.99, category: "jewelery" },
    { id: 9, name: "WD 2TB Elements Portable External Hard Drive", basePrice: 64.00, costPrice: 40.00, currentPrice: 64.00, category: "electronics" },
    { id: 10, name: "SanDisk SSD PLUS 1TB Internal SSD", basePrice: 109.00, costPrice: 70.00, currentPrice: 109.00, category: "electronics" },
    { id: 11, name: "Silicon Power 256GB SSD 3D NAND A55", basePrice: 109.00, costPrice: 68.00, currentPrice: 109.00, category: "electronics" },
    { id: 12, name: "WD 4TB Gaming Drive Works with Playstation 4", basePrice: 114.00, costPrice: 75.00, currentPrice: 114.00, category: "electronics" },
    { id: 13, name: "Acer SB220Q bi 21.5 inches Full HD IPS", basePrice: 599.00, costPrice: 380.00, currentPrice: 599.00, category: "electronics" },
    { id: 14, name: "Samsung 49-Inch CHG90 144Hz Curved Monitor", basePrice: 999.99, costPrice: 650.00, currentPrice: 999.99, category: "electronics" },
    { id: 15, name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket", basePrice: 56.99, costPrice: 32.00, currentPrice: 56.99, category: "women's clothing" },
    { id: 16, name: "Lock and Love Women's Removable Hooded Jacket", basePrice: 29.95, costPrice: 15.00, currentPrice: 29.95, category: "women's clothing" },
    { id: 17, name: "Rain Jacket Women Windbreaker Striped Climbing", basePrice: 39.99, costPrice: 20.00, currentPrice: 39.99, category: "women's clothing" },
    { id: 18, name: "MBJ Women's Solid Short Sleeve Boat Neck V", basePrice: 9.85, costPrice: 4.50, currentPrice: 9.85, category: "women's clothing" },
    { id: 19, name: "Opna Women's Short Sleeve Moisture", basePrice: 7.95, costPrice: 3.50, currentPrice: 7.95, category: "women's clothing" },
    { id: 20, name: "DANVOUY Womens T Shirt Casual Cotton Short", basePrice: 12.99, costPrice: 5.50, currentPrice: 12.99, category: "women's clothing" }
  ]);

  const [chartData, setChartData] = useState([]);

 // Price alteration algorithm engine tracking long-form timeline data rows
  useEffect(() => {
    if (!isLoggedIn) return;

    let demandFactor = demand / 5;
    let supplyFactor = 5 / supply;
    let eventModifier = isFlashSale ? 0.70 : 1.0;

    const updatedProducts = products.map(p => ({
      ...p,
      currentPrice: parseFloat((p.basePrice * demandFactor * supplyFactor * eventModifier).toFixed(2))
    }));

    setProducts(updatedProducts);

    const getAvgForCategory = (cat, modifier = 1) => {
      const filtered = updatedProducts.filter(p => p.category === cat);
      const sum = filtered.reduce((acc, curr) => acc + curr.currentPrice, 0);
      return parseFloat(((sum / filtered.length) * modifier).toFixed(2));
    };

    // Advanced Feature: Real-time vs Predictive Trend Generation
    if (!isPredictiveMode) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      // CHANGED: Increased .slice(-6) to .slice(-12) to track a longer timeline window sequence
      setChartData(prevData => [...prevData, {
        time: timestamp,
        "Electronics": getAvgForCategory("electronics"),
        "Jewelery": getAvgForCategory("jewelery"),
        "Men's Clothing": getAvgForCategory("men's clothing"),
        "Women's Clothing": getAvgForCategory("women's clothing")
      }].slice(-12));
    } else {
      // Projections over an extended 6-hour sequence remains stable
      const projectionPoints = [1, 2, 3, 4, 5, 6].map(hour => {
        const variance = 1 + (Math.sin(hour) * 0.15 * demandFactor); 
        return {
          time: `+${hour} Hour`,
          "Electronics": getAvgForCategory("electronics", variance),
          "Jewelery": getAvgForCategory("jewelery", variance),
          "Men's Clothing": getAvgForCategory("men's clothing", variance),
          "Women's Clothing": getAvgForCategory("women's clothing", variance)
        };
      });
      setChartData(projectionPoints);
    }
  }, [demand, supply, isLoggedIn, isFlashSale, isPredictiveMode]);

  // Metric Math Engine Aggregates
  const totalRevenueSum = products.reduce((acc, curr) => acc + (curr.currentPrice * 1.5), 0);
  const totalCostSum = products.reduce((acc, curr) => acc + (curr.costPrice * 1.5), 0);
  const totalProfitMargin = (((totalRevenueSum - totalCostSum) / totalRevenueSum) * 180).toFixed(1); // Mapped representation

  const demandStatusText = isPredictiveMode ? "AI Projection Mode Active" : (isFlashSale ? "Flash Sale Event Active" : (demand > 7 ? "High" : demand > 4 ? "Medium" : "Low"));
  const demandStatusColor = isPredictiveMode ? "#A855F7" : (isFlashSale ? "#EF4444" : (demand > 7 ? "#10B981" : demand > 4 ? "#F59E0B" : "#EF4444"));

  // Check if any product has breached the alert limits setup
  const highPriceBreaches = products.filter(p => p.currentPrice > priceAlertThreshold);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Product Name,Category,Cost Price,Current Dynamic Price,Margin (%)\n";
    products.forEach(p => {
      const margin = (((p.currentPrice - p.costPrice) / p.currentPrice) * 100).toFixed(1);
      csvContent += `${p.id},"${p.name}",${p.category},$${p.costPrice},$${p.currentPrice},${margin}%\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Advanced_Pricing_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isLoggedIn) {
    return <Auth onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: '#ffffff', fontFamily: 'sans-serif', padding: '30px' }}>
      
      {/* Top Main Dashboard Navigation Banner Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #1F2937', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#2563EB', padding: '10px', borderRadius: '10px' }}>
            <TrendingUp size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Dynamic Pricing Analytics Dashboard</h1>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#EF4444', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          <LogOut size={16} /> Log Out
        </button>
      </header>

      {/* ADVANCED FEATURE 3: Dynamic Price Threshold Alert System Banner */}
      {highPriceBreaches.length > 0 && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', padding: '12px 20px', borderRadius: '8px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle color="#EF4444" size={20} />
          <span style={{ fontSize: '14px', color: '#FCA5A5' }}>
            <strong>Inflation Warning Alert:</strong> {highPriceBreaches.length} products have broken past your maximum chosen price threshold boundary of <strong>${priceAlertThreshold}</strong>!
          </span>
        </div>
      )}

      {/* Primary KPI Card Layout Blocks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={metricCardStyle}>
          <div><p style={cardLabelStyle}>Total Products Configured</p><h3 style={cardValueStyle}>{products.length}</h3></div>
          <Package size={28} color="#9CA3AF" />
        </div>
        <div style={metricCardStyle}>
          {/* ADVANCED FEATURE 2: Profit Margin Tracking Metric Card */}
          <div><p style={cardLabelStyle}>Estimated Dynamic Gross Margin</p><h3 style={{ ...cardValueStyle, color: '#10B981' }}>{totalProfitMargin}%</h3></div>
          <DollarSign size={28} color="#10B981" />
        </div>
        <div style={metricCardStyle}>
          <div><p style={cardLabelStyle}>Market Performance State</p><h3 style={{ ...cardValueStyle, color: demandStatusColor }}>{demandStatusText}</h3></div>
          <Activity size={28} color={demandStatusColor} />
        </div>
      </div>

      {/* Primary Split View Layout Columns Screen */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '25px' }}>
        
        {/* Left Interactive Operations Workbox Frame */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <MarketSliders demand={demand} setDemand={setDemand} supply={supply} setSupply={setSupply} />

          {/* ADVANCED FEATURE 1 & 3: Strategic Automation Panel Board Controls */}
          <div style={{ backgroundColor: '#1F2937', padding: '20px', borderRadius: '12px', border: '1px solid #374151', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#A855F7', display: 'flex', alignItems: 'center', gap: '6px' }}><Eye size={16} /> AI Trend Machine Engine Projections</h4>
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#9CA3AF' }}>Forecasts categorical market trends across the next 6 hours.</p>
              </div>
              <button 
                onClick={() => setIsPredictiveMode(!isPredictiveMode)} 
                style={{ backgroundColor: isPredictiveMode ? '#A855F7' : '#4B5563', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
              >
                {isPredictiveMode ? "PREDICTING" : "FORECAST"}
              </button>
            </div>

            <div style={{ borderTop: '1px solid #374151', paddingTop: '12px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF', marginBottom: '6px' }}>
                <span>Inflation Alert Boundary Trigger:</span>
                <span style={{ color: '#EF4444', fontWeight: 'bold' }}>${priceAlertThreshold}</span>
              </label>
              <input type="range" min="50" max="1000" step="50" value={priceAlertThreshold} onChange={(e) => setPriceAlertThreshold(Number(e.target.value))} style={{ width: '100%', accentColor: '#EF4444', cursor: 'pointer' }} />
            </div>
          </div>

          {/* Catalog Data Stream Presentation Wrapper */}
          <div style={{ backgroundColor: '#1F2937', padding: '24px', borderRadius: '12px', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" placeholder="Search catalog items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={searchFilterInputStyle} />
              </div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ ...searchFilterInputStyle, paddingLeft: '10px', cursor: 'pointer' }}>
                <option value="all">📁 All Categories</option>
                <option value="electronics">💻 Electronics</option>
                <option value="jewelery">✨ Jewelery</option>
                <option value="men's clothing">👔 Men's Clothing</option>
                <option value="women's clothing">👗 Women's Clothing</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'scroll', paddingRight: '5px' }}>
              {filteredProducts.map(product => {
                const productMargin = (((product.currentPrice - product.costPrice) / product.currentPrice) * 100).toFixed(0);
                return (
                  <div key={product.id} style={{ backgroundColor: '#111827', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: product.currentPrice > priceAlertThreshold ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid #1F2937' }}>
                    <div style={{ maxWidth: '65%' }}>
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: product.currentPrice > priceAlertThreshold ? '#FCA5A5' : '#fff' }}>{product.name}</h4>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '2px', fontSize: '11px', color: '#6B7280' }}>
                        <span>{product.category}</span>
                        <span style={{ color: '#10B981' }}>Margin: {productMargin}%</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: product.currentPrice > priceAlertThreshold ? 'rgba(239, 68, 68, 0.15)' : 'rgba(37, 99, 235, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                      <Tag size={12} color={product.currentPrice > priceAlertThreshold ? '#EF4444' : '#3B82F6'} />
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: product.currentPrice > priceAlertThreshold ? '#EF4444' : '#3B82F6' }}>${product.currentPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Analytics Graph Rendering Platform Box Container Sheet */}
        <div style={{ backgroundColor: '#1F2937', padding: '24px', borderRadius: '12px', border: '1px solid #374151', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{isPredictiveMode ? "AI Predictive Trend Vectors (6H Forecast)" : "Live Market Valuation Analytics"}</h3>
              <button onClick={exportToCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#374151', color: '#fff', border: '1px solid #4B5563', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                <Download size={14} /> Export CSV Report
              </button>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '13px', margin: '0 0 20px 0' }}>{isPredictiveMode ? "Displaying machine-learning simulated pricing behavior timelines based on slider settings." : "Real-time valuation analytics fluctuations stream tracker mapping pipeline updates automatically."}</p>
          </div>
          <PriceChart chartData={chartData} />
        </div>

      </div>
    </div>
  );
}

const metricCardStyle = { backgroundColor: '#1F2937', padding: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #374151' };
const cardLabelStyle = { margin: 0, fontSize: '14px', color: '#9CA3AF' };
const cardValueStyle = { margin: '5px 0 0 0', fontSize: '26px', fontWeight: '700' };
const searchFilterInputStyle = { width: '100%', boxSizing: 'border-box', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '10px 10px 10px 35px', color: '#fff', fontSize: '13px', outline: 'none' };

export default App;