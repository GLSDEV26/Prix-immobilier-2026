import React, { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Euro, Home, Building2, Trees, Info, ChevronRight, MousePointer2, X } from 'lucide-react';

const App = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const data = [
    { name: "Divonne-les-Bains", zone: "Frontier", avg: 5790, details: { apt: 6200, house: 5400, land: 950 } },
    { name: "Prévessin-Moëns", zone: "Frontier", avg: 4870, details: { apt: 5100, house: 4600, land: 880 } },
    { name: "Thoiry", zone: "Frontier", avg: 4840, details: { apt: 4950, house: 4700, land: 820 } },
    { name: "St-Genis-Pouilly", zone: "Frontier", avg: 4580, details: { apt: 4750, house: 4100, land: 750 } },
    { name: "Beynost", zone: "Lyon", avg: 3200, details: { apt: 3450, house: 2950, land: 420 } },
    { name: "Miribel", zone: "Lyon", avg: 3150, details: { apt: 3100, house: 3200, land: 380 } },
    { name: "Meximieux", zone: "Lyon", avg: 2850, details: { apt: 2700, house: 2950, land: 290 } },
    { name: "Ambérieu-en-Bugey", zone: "Central", avg: 2200, details: { apt: 2100, house: 2300, land: 180 } },
    { name: "Bourg-en-Bresse", zone: "Central", avg: 1860, details: { apt: 1750, house: 2150, land: 140 } },
    { name: "Oyonnax", zone: "Central", avg: 1640, details: { apt: 1450, house: 1850, land: 110 } },
    { name: "Nantua", zone: "Central", avg: 1320, details: { apt: 1200, house: 1450, land: 90 } }
  ];

  const filteredData = selectedZone === 'all' 
    ? data 
    : data.filter(d => d.zone === selectedZone);

  const zones = [
    { id: 'all', label: 'Toutes', color: 'bg-slate-200 text-slate-700' },
    { id: 'Frontier', label: 'Gex', color: 'bg-rose-500 text-white' },
    { id: 'Lyon', label: 'Lyon', color: 'bg-blue-500 text-white' },
    { id: 'Central', label: 'Bresse', color: 'bg-emerald-500 text-white' }
  ];

  const getZoneColor = (zone) => {
    switch(zone) {
      case 'Frontier': return 'bg-rose-500';
      case 'Lyon': return 'bg-blue-500';
      default: return 'bg-emerald-500';
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    // Sur mobile, on ouvre une vue plein écran pour les détails
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Header compact pour mobile/story */}
      <div className="bg-slate-900 p-6 text-white shrink-0">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-blue-500" size={20} />
          <h1 className="text-xl font-bold tracking-tight uppercase">Immo Ain 2026</h1>
        </div>
        <p className="text-slate-400 text-xs mt-1">Comparatif interactif des prix au m²</p>
      </div>

      {/* Filtres horizontaux scrollables sur mobile */}
      <div className="p-4 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar bg-white sticky top-0 z-10">
        {zones.map(z => (
          <button
            key={z.id}
            onClick={() => setSelectedZone(z.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-sm shrink-0 ${
              selectedZone === z.id ? z.color : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            {z.label}
          </button>
        ))}
      </div>

      <div className="flex-grow grid lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Liste principale */}
        <div className="lg:col-span-7 p-4 md:p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
            {filteredData.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => handleCityClick(item)}
                className={`w-full text-left p-4 rounded-xl transition-all border outline-none ${
                  selectedCity?.name === item.name 
                    ? 'bg-blue-50 border-blue-400 shadow-md ring-2 ring-blue-50' 
                    : 'bg-white border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className={`font-bold ${selectedCity?.name === item.name ? 'text-blue-700' : 'text-slate-800'}`}>
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                      {item.zone === 'Frontier' ? 'Frontalier' : item.zone === 'Lyon' ? 'Secteur Lyon' : 'Ain Central'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 tracking-tighter">{item.avg.toLocaleString()} €</span>
                    <p className="text-[9px] text-slate-400 uppercase">m² moyen</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${getZoneColor(item.zone)}`}
                    style={{ width: `${(item.avg / 6000) * 100}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Panneau latéral (Desktop) */}
        <div className="hidden lg:block lg:col-span-5 bg-slate-50 p-8 border-l border-slate-100">
            {selectedCity ? (
               <DetailsContent city={selectedCity} getZoneColor={getZoneColor} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <MousePointer2 className="mb-4 animate-bounce text-blue-300" size={40} />
                <p className="text-sm">Sélectionnez une ville pour voir le détail</p>
              </div>
            )}
        </div>
      </div>

      {/* Modal Mobile (Story-friendly) */}
      {isMobileModalOpen && selectedCity && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
          <div className="mt-auto bg-white rounded-t-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <ChevronRight className="text-blue-500" />
                <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">{selectedCity.name}</h2>
              </div>
              <button 
                onClick={() => setIsMobileModalOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200"
              >
                <X size={24} />
              </button>
            </div>
            
            <DetailsContent city={selectedCity} getZoneColor={getZoneColor} isMobile={true} />
            
            <button 
              onClick={() => setIsMobileModalOpen(false)}
              className="w-full mt-6 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      )}

      {/* Legend simple */}
      <div className="p-4 bg-white border-t border-slate-100 text-[10px] text-slate-400 text-center uppercase tracking-widest shrink-0">
        Données indicatives 2026 • © Immo Ain Info
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

const DetailsContent = ({ city, getZoneColor, isMobile = false }) => (
  <div className="space-y-4">
    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white mb-2 ${getZoneColor(city.zone)}`}>
      SECTEUR {city.zone === 'Frontier' ? 'PAYS DE GEX' : city.zone === 'Lyon' ? 'CÔTIÈRE' : 'BRESSE/BUGEY'}
    </div>

    <div className="grid gap-3">
      <DetailCard icon={<Building2 size={22}/>} label="Appartements" price={city.details.apt} color="indigo" />
      <DetailCard icon={<Home size={22}/>} label="Maisons" price={city.details.house} color="orange" />
      <DetailCard icon={<Trees size={22}/>} label="Terrains nus" price={city.details.land} color="emerald" />
    </div>

    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 leading-relaxed">
      <Info size={14} className="inline mr-2" />
      Le marché de <strong>{city.name}</strong> reste l'un des plus dynamiques du département en 2026.
    </div>
  </div>
);

const DetailCard = ({ icon, label, price, color }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100"
  };
  return (
    <div className={`bg-white p-4 rounded-2xl border flex items-center gap-4 ${colors[color]}`}>
      <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase opacity-60 tracking-wider">{label}</p>
        <p className="text-xl font-black text-slate-900">{price.toLocaleString()} €<span className="text-xs font-normal text-slate-400"> / m²</span></p>
      </div>
    </div>
  );
}

export default App;

