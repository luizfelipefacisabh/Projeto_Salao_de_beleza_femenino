import React, { useState } from 'react';
import { Building2, Power, LayoutDashboard, Settings, Search, CreditCard, Download, CheckCircle2, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// --- Dados Mockados Plataforma SaaS ---
const dataMRR = [
  { name: 'Jan', receita: 15000, inativo: 1000 },
  { name: 'Fev', receita: 18000, inativo: 1500 },
  { name: 'Mar', receita: 22000, inativo: 2000 },
  { name: 'Abr', receita: 27500, inativo: 1800 },
  { name: 'Mai', receita: 32000, inativo: 2200 },
  { name: 'Jun', receita: 41000, inativo: 1000 }
];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Controle Financeiro Gerencial');
  const [salons, setSalons] = useState([
    { id: 1, name: 'Studio Mariana Beauty', owner: 'Mariana B.', plan: 'Premium', status: 'active', revenue: 'R$ 150,00/mês' },
    { id: 2, name: 'Espaço Bella', owner: 'Juliana Costa', plan: 'Basic', status: 'active', revenue: 'R$ 80,00/mês' },
    { id: 3, name: 'Glamour Hair', owner: 'Fernanda Lima', plan: 'Premium', status: 'inactive', revenue: 'R$ 0,00' },
  ]);

  const toggleStatus = (id: number) => {
    setSalons(salons.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s));
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex">
      {/* Sidebar - Plataforma Master */}
      <aside className="w-64 bg-rose-600 flex flex-col hidden md:flex text-white shadow-xl shadow-rose-600/20 z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/10">
           <h2 className="text-xl font-light">Plataforma <span className="font-extrabold text-white">Master</span></h2>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2">
          {[
            { icon: Building2, label: 'Gestão de Salões' },
            { icon: LayoutDashboard, label: 'Controle Financeiro Gerencial' },
            { icon: CreditCard, label: 'Extrato de Faturas' },
            { icon: Settings, label: 'Configurações do SaaS' }
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${
                activeTab === item.label 
                  ? 'bg-white text-rose-700 font-bold shadow-sm' 
                  : 'text-rose-100 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              <item.icon size={20} className={activeTab === item.label ? "text-rose-600" : ""} strokeWidth={activeTab === item.label ? 2.5 : 2} />
              <span className="text-[13px]">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <header className="h-20 border-b border-neutral-200 flex items-center px-8 justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-xl font-bold text-neutral-800">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-bold text-neutral-800">Felipe A.</span>
              <span className="block text-xs font-medium text-rose-500">Super Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-black text-rose-300 font-bold flex items-center justify-center shadow-sm">FA</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {activeTab === 'Gestão de Salões' ? (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800">Salões Cadastrados</h2>
                  <p className="text-sm font-medium text-neutral-400">Ative/desative acesso à plataforma SaaS por salão.</p>
                </div>
              </div>

              <div className="bg-white border border-neutral-100 rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50/50">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Acesso Empresa</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Plano</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 text-center">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 text-right">Interruptor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {salons.map((salon) => (
                      <tr key={salon.id} className="hover:bg-rose-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-neutral-800">{salon.name}</div>
                          <div className="text-sm font-medium text-neutral-400">{salon.owner}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${salon.plan === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-600'}`}>
                            {salon.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${salon.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${salon.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            {salon.status === 'active' ? 'Acesso Ativo' : 'Bloqueado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => toggleStatus(salon.id)}
                            className={`inline-flex items-center justify-center p-2 rounded-xl transition-all border ${salon.status === 'active' ? 'bg-white border-rose-100 text-rose-500 hover:bg-rose-50 hover:border-rose-200' : 'bg-white border-emerald-100 text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200'}`}
                            title={salon.status === 'active' ? 'Suspender Acesso' : 'Ativar Acesso'}
                          >
                            <Power size={18} strokeWidth={2.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'Controle Financeiro Gerencial' ? (
             <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
                <div>
                   <h2 className="text-2xl font-bold text-neutral-800">Visão Geral da Plataforma</h2>
                   <p className="text-sm font-medium text-neutral-500 mt-1">Acompanhe a saúde financeira, o crescimento de MRR e taxas de retenção.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* KPIs Gerenciais SaaS */}
                  <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between">
                     <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4"><DollarSign size={24} /></div>
                     <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-1">MRR (MENSALIDADE)</p>
                     <h3 className="text-3xl font-extrabold text-neutral-800">R$ 41.000</h3>
                     <p className="text-emerald-500 flex items-center gap-1 font-bold text-sm mt-3"><TrendingUp size={14}/> + 28.1% (30d)</p>
                  </div>
                  <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between">
                     <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4"><Building2 size={24} /></div>
                     <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-1">Total de Salões Ativos</p>
                     <h3 className="text-3xl font-extrabold text-neutral-800">342</h3>
                     <p className="text-emerald-500 flex items-center gap-1 font-bold text-sm mt-3"><TrendingUp size={14}/> + 45 novos (30d)</p>
                  </div>
                  <div className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between">
                     <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-4"><Activity size={24} /></div>
                     <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-1">Churn Rate (Evasão)</p>
                     <h3 className="text-3xl font-extrabold text-neutral-800">2.4%</h3>
                     <p className="text-rose-500 flex items-center gap-1 font-bold text-sm mt-3">- 12 salões saíram</p>
                  </div>
                  <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[2rem] p-6 shadow-lg shadow-rose-500/20 text-white flex flex-col justify-between">
                     <p className="text-xs uppercase tracking-widest font-bold text-rose-100 mb-1">LTV Estimado (Por Salão)</p>
                     <h3 className="text-3xl font-extrabold mt-1">R$ 5.400</h3>
                     <p className="text-white text-sm font-medium mt-3 border-t border-rose-400/50 pt-3">As assinaturas duram em média 36 meses.</p>
                  </div>
                </div>

                <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                   <div className="mb-8">
                     <h3 className="text-xl font-bold text-neutral-800">Evolução do MRR (Receita Corrente)</h3>
                     <p className="text-neutral-400 text-sm font-medium">Histórico de receita recebida vs. Contratos inativos ou cancelados.</p>
                   </div>
                   <div className="w-full h-[350px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dataMRR} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(val) => `R$${val/1000}k`} />
                          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                          <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Legend wrapperStyle={{ paddingTop: '20px' }} />
                          <Bar yAxisId="left" dataKey="receita" name="Receita Ativa (MRR)" fill="#f43f5e" radius={[8, 8, 0, 0]} />
                          <Bar yAxisId="right" dataKey="inativo" name="Perdas (Churn/Inadimplência)" fill="#cbd5e1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                     </ResponsiveContainer>
                   </div>
                </div>
             </div>
          ) : activeTab === 'Extrato de Faturas' ? (
             <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-bold text-neutral-800">Cobranças Recentes (Stripe/Pix)</h3>
                     <button className="flex items-center gap-2 text-rose-500 font-bold bg-rose-50 px-4 py-2 rounded-full text-sm hover:bg-rose-100 transition-colors">
                        <Download size={16} /> Exportar Extrato CSV
                     </button>
                  </div>
                  
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-100 text-neutral-400 text-sm font-medium">
                        <th className="pb-3 px-2">Data / Transação</th>
                        <th className="pb-3 px-2">Salão Resposável</th>
                        <th className="pb-3 px-2 text-right">Valor Líquido</th>
                        <th className="pb-3 px-2 text-center">Status Confirmação</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-semibold text-neutral-700 divide-y divide-neutral-50">
                       <tr className="hover:bg-neutral-50/50"><td className="py-4 px-2"><div>10/05/2026</div><div className="text-xs font-normal text-neutral-400">#TRX-88192A</div></td><td className="py-4 px-2">Studio Mariana Beauty</td><td className="py-4 px-2 text-right">R$ 150,00</td><td className="py-4 px-2 text-center"><span className="text-emerald-500 flex justify-center"><CheckCircle2 size={16}/></span></td></tr>
                       <tr className="hover:bg-neutral-50/50"><td className="py-4 px-2"><div>08/05/2026</div><div className="text-xs font-normal text-neutral-400">#TRX-88190B</div></td><td className="py-4 px-2">Espaço Bella</td><td className="py-4 px-2 text-right">R$ 80,00</td><td className="py-4 px-2 text-center"><span className="text-emerald-500 flex justify-center"><CheckCircle2 size={16}/></span></td></tr>
                       <tr className="hover:bg-neutral-50/50"><td className="py-4 px-2 text-neutral-400"><div>01/05/2026</div><div className="text-xs font-normal text-neutral-400">#TRX-88091C</div></td><td className="py-4 px-2 text-neutral-400">Glamour Hair</td><td className="py-4 px-2 text-right text-neutral-400">R$ 150,00</td><td className="py-4 px-2 text-center"><span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-[10px]">Falha Cartão / Atrasado</span></td></tr>
                    </tbody>
                  </table>
                </div>
             </div>
          ) : (
            <div className="bg-white border border-neutral-50 rounded-[2rem] p-8 min-h-[400px] shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
              <Settings size={48} className="text-rose-200 mb-4" strokeWidth={1.5} />
              <p className="text-neutral-400 font-medium text-lg">Área em desenvolvimento: {activeTab}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
