import React, { useState } from 'react';
import { Calendar, Users, Briefcase, Settings, BarChart as ChartIcon, Bell, TrendingUp, DollarSign, Camera, Image as ImageIcon, Trash2, Scissors, Gift, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataMensal = [ { name: 'Sem 1', faturamento: 4500 }, { name: 'Sem 2', faturamento: 5200 }, { name: 'Sem 3', faturamento: 3800 }, { name: 'Sem 4', faturamento: 6100 } ];
const dataSemestral = [ { name: 'Jan', faturamento: 18500 }, { name: 'Fev', faturamento: 16200 }, { name: 'Mar', faturamento: 19800 }, { name: 'Abr', faturamento: 21000 }, { name: 'Mai', faturamento: 19500 }, { name: 'Jun', faturamento: 23400 } ];
const dataAnual = [ { name: '2023', faturamento: 180000 }, { name: '2024', faturamento: 215000 }, { name: '2025 (Proj)', faturamento: 280000 } ];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Menu de Serviços');
  const [period, setPeriod] = useState<'Mensal' | 'Semestral' | 'Anual'>('Semestral');
  const [portfolioActive, setPortfolioActive] = useState(true);

  const chartData = period === 'Mensal' ? dataMensal : period === 'Semestral' ? dataSemestral : dataAnual;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex">
      {/* Sidebar - Menu Rosa */}
      <aside className="w-64 bg-rose-500 flex flex-col hidden md:flex text-white shadow-xl shadow-rose-500/20 z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/10">
           <h2 className="text-xl font-light">Privé <span className="font-extrabold text-rose-100">Gestão</span></h2>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
          {[
            { icon: Calendar, label: 'Agenda Diária' },
            { icon: Scissors, label: 'Menu de Serviços' }, // NOVO
            { icon: Users, label: 'Clientes & CRM' },
            { icon: Briefcase, label: 'Profissionais' },
            { icon: ImageIcon, label: 'Portfólio (Galeria)' },
            { icon: Gift, label: 'Fidelidade' }, // NOVO
            { icon: ChartIcon, label: 'Painel Financeiro' },
            { icon: Settings, label: 'Ajustes' }
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.label 
                  ? 'bg-white text-rose-600 font-bold shadow-sm' 
                  : 'text-rose-100 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              <item.icon size={18} className={activeTab === item.label ? "text-rose-500" : ""} strokeWidth={activeTab === item.label ? 2.5 : 2} />
              <span className="text-[13px]">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative">
        <header className="h-20 border-b border-neutral-200 flex items-center px-8 justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-xl font-bold text-neutral-800">{activeTab}</h1>
          <div className="flex items-center gap-6">
            <button className="text-neutral-400 hover:text-rose-500 transition-colors relative">
              <Bell size={22} strokeWidth={2} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 border-l border-neutral-200 pl-6">
              <div className="text-right hidden sm:block">
                <span className="block text-sm font-bold text-neutral-800">Marina B.</span>
                <span className="block text-xs font-medium text-neutral-400">Sócia-proprietária</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 border-2 border-white text-rose-600 font-bold flex items-center justify-center text-sm shadow-sm">MB</div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto pb-24">
          
          {/* MENU DE SERVIÇOS */}
          {activeTab === 'Menu de Serviços' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800">Gerenciamento de Serviços</h3>
                    <p className="text-neutral-400 text-sm font-medium">Cadastre os serviços oferecidos, descrições detalhadas e valores.</p>
                  </div>
                  <button className="px-5 py-2.5 bg-rose-500 text-white rounded-full text-sm font-bold shadow-sm hover:bg-rose-600 transition-colors flex items-center gap-2">
                     <Plus size={18} /> Novo Serviço
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { name: 'Balayage & Coloração', desc: 'Técnica francesa de iluminação degradê personalizada, inclui escova e finalização com proteção térmica.', price: 'R$ 290,00', duration: '120 min' },
                   { name: 'Corte Premium', desc: 'Corte visagista com lavagem relaxante, hidratação profunda e secagem.', price: 'R$ 150,00', duration: '60 min' },
                   { name: 'Manicure Gel', desc: 'Esmaltação em gel de alta durabilidade com design e cutilagem russa.', price: 'R$ 80,00', duration: '90 min' },
                   { name: 'Design de Sobrancelha', desc: 'Mapeamento facial completo com aplicação de Henna.', price: 'R$ 65,00', duration: '45 min' }
                 ].map((svc, i) => (
                   <div key={i} className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow relative group">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-neutral-800 text-lg">{svc.name}</h4>
                         <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-bold">{svc.price}</span>
                      </div>
                      <p className="text-neutral-500 text-sm mb-4 line-clamp-2 min-h-[40px]">{svc.desc}</p>
                      <div className="flex justify-between items-center pt-4 border-t border-neutral-50">
                         <span className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold"><Clock size={14}/> {svc.duration}</span>
                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-blue-500 text-xs font-bold hover:underline">Editar</button>
                            <button className="text-red-500 text-xs font-bold hover:underline">Excluir</button>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* FIDELIDADE */}
          {activeTab === 'Fidelidade' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
                      <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                         <Gift size={28} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-bold text-neutral-800">Programa de Fidelidade Privé</h3>
                         <p className="text-neutral-400 font-medium text-sm">Configure regras e recompense as clientes frequentes.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4 bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                         <h4 className="font-bold text-neutral-800">Regras Atuais</h4>
                         <p className="text-sm text-neutral-600">A cada <strong className="text-rose-500">10 agendamentos realizados</strong>, a cliente ganha <strong className="text-rose-500">1 Hidratação Premium Grátis</strong>.</p>
                         <button className="text-rose-500 font-bold text-sm underline hover:text-rose-600">Alterar Regra</button>
                      </div>
                      
                      <div className="space-y-4">
                         <h4 className="font-bold text-neutral-800">Clientes Elegíveis para Resgate</h4>
                         <ul className="space-y-3">
                            <li className="flex justify-between items-center p-3 bg-white border border-neutral-100 rounded-xl shadow-sm">
                               <div>
                                  <span className="block font-bold text-sm text-neutral-800">Carolina Santos</span>
                                  <span className="text-xs text-neutral-400">(11) 98888-7777</span>
                               </div>
                               <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Resgate Grátis</span>
                            </li>
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* PAINEL FINANCEIRO */}
          {activeTab === 'Painel Financeiro' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Faturamento Atual', value: 'R$ 23.400', prev: '+14% vs. passado' },
                  { title: 'Ticket Médio', value: 'R$ 180,00', prev: '+5% vs. passado' },
                  { title: 'Lucro (Est.)', value: 'R$ 9.360', prev: 'Margem sugerida' }
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-all">
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider">{kpi.title}</p>
                    <h3 className="text-3xl font-extrabold text-neutral-800 mt-1 mb-2">{kpi.value}</h3>
                    <p className="text-emerald-500 text-sm font-semibold">{kpi.prev}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center mb-8 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-800">Crescimento de Faturamento</h3>
                  </div>
                  <div className="flex bg-neutral-100 p-1 rounded-xl">
                    {['Mensal', 'Semestral', 'Anual'].map(p => (
                      <button key={p} onClick={() => setPeriod(p as any)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${period === p ? 'bg-white text-rose-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} dy={10}/>
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }} tickFormatter={(value) => `R$${value/1000}k`}/>
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#f43f5e', fontWeight: 'bold' }} formatter={(value) => [`R$ ${value}`, 'Faturamento']} />
                      <Area type="monotone" dataKey="faturamento" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorFaturamento)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* PORTFÓLIO E OUTRAS ABAS COMUNS (Placeholder) */}
          {!['Menu de Serviços', 'Fidelidade', 'Painel Financeiro'].includes(activeTab) && (
             <div className="bg-white border border-neutral-50 rounded-[2rem] p-8 min-h-[400px] shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
               <Calendar size={48} className="text-rose-200 mb-4" strokeWidth={1.5} />
               <p className="text-neutral-400 font-medium text-lg">Módulo de {activeTab} funcional.</p>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}
