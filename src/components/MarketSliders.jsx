import React from 'react';
import { Sliders, Activity } from 'lucide-react';

export default function MarketSliders({ demand, setDemand, supply, setSupply }) {
  return (
    <div style={{ backgroundColor: '#1F2937', padding: '24px', borderRadius: '12px', border: '1px solid #374151' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Sliders size={20} color="#3B82F6" />
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Market Simulators</h3>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#9CA3AF' }}>
          <span>Market Demand Level</span>
          <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>{demand} / 10</span>
        </label>
        <input type="range" min="1" max="10" value={demand} onChange={(e) => setDemand(Number(e.target.value))} style={{ width: '100%', accentColor: '#3B82F6', cursor: 'pointer' }} />
      </div>

      <div>
        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#9CA3AF' }}>
          <span>Vendor Supply Stock</span>
          <span style={{ color: '#10B981', fontWeight: 'bold' }}>{supply} / 10</span>
        </label>
        <input type="range" min="1" max="10" value={supply} onChange={(e) => setSupply(Number(e.target.value))} style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }} />
      </div>
    </div>
  );
}