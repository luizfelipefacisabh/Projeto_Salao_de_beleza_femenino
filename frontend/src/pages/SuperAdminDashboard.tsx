import React, { useState } from 'react';
import { Building2, Power, LayoutDashboard, Settings, Search, CreditCard, Download, CheckCircle2, TrendingUp, DollarSign, Activity, Tag, Save } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const dataMRR = [
  { name: 'Jan', receita: 15000, inativo: 1000 },
  { name: 'Fev', receita: 18000, inativo: 1500 },
  { name: 'Mar', receita: 22000, inativo: 2000 },
  { name: 'Abr', receita: 27500, inativo: 1800 },
  { name: 'Mai', receita: 32000, inativo: 2200 },
  { name: 'Jun', receita: 41000, inativo: 1000 }
];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('Configurações do SaaS'); // starts here to show feature
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
        <header className="h-20 border-b border-neutral-200 flex items-center px-8 justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10 transition-colors">
          <h1 className="text-xl font-bold text-neutral-800">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-bold text-neutral-800">Felipe A.</span>
              <span className="block text-xs font-medium text-rose-500">Super Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-800 to-black text-rose-300 font-bold flex items-center justify-center shadow-sm">FA</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto pb-24">
          
          {/* SAAS SETTINGS (NEW FEATURE) */}
          {activeTab === 'Configurações do SaaS' && (
             <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                <div className="flex justify-between items-center mb-6">
                   <div>
                     <h3 className="text-2xl font-bold text-neutral-800">Configurações de Pagamento da Plataforma</h3>
                     <p className="text-neutral-500 text-sm font-medium mt-1">Crie os planos e defina os valores de assinatura mensal que os Salões pagarão no cartão de crédito.</p>
                   </div>
                   <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-all focus:ring-4 focus:ring-emerald-100">
                      <Save size={16} /> Salvar Alterações Globais
                   </button>
                </div>

                {/* Gateway Integration */}
                <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm space-y-6 mb-8">
                   <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg"><CreditCard size={20} className="text-indigo-500 border border-indigo-100 rounded-md p-0.5"/> Gateway de Pagamento (Stripe/Asaas)</h4>
                   <p className="text-neutral-500 text-sm mb-4">Conecte sua chave de integração para faturar automaticamente os cartões vinculados nos painéis dos donos de salões.</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Chave de Produção (Secret API Key)</label>
                         <input type="password" defaultValue="sk_live_51M..." className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 text-neutral-700 bg-neutral-50 font-mono focus:border-rose-300 focus:outline-none" />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Ação Inadimplência Automática</label>
                         <select className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 text-neutral-700 font-semibold focus:border-rose-300 focus:outline-none appearance-none">
                            <option>Bloquear salão após 3 dias de falha (Recomendado)</option>
                            <option>Apenas notificar salão e manter ativo</option>
                         </select>
                      </div>
                   </div>
                </div>

                {/* SaaS Plan Tiers */}
                <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg mb-4 px-2"><Tag size={20} className="text-rose-500"/> Planos Praticados</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Plano Basic */}
                   <div className="bg-white border-2 border-neutral-100 rounded-[2rem] p-8 shadow-sm hover:border-neutral-200 transition-colors">
                      <input type="text" defaultValue="Plano Basic" className="font-bold text-2xl text-neutral-800 w-full bg-transparent border-b border-transparent hover:border-neutral-200 focus:border-rose-300 focus:outline-none mb-4" />
                      
                      <div className="relative mb-6">
                         <span className="absolute top-3 left-4 text-neutral-400 font-bold">R$</span>
                         <input type="number" defaultValue={80.00} className="w-full border-2 border-neutral-100 rounded-xl pl-12 pr-4 py-3 font-bold text-xl text-neutral-700 focus:border-rose-300 focus:outline-none" />
                         <span className="absolute top-3 right-4 text-neutral-400 text-sm font-medium">/mês</span>
                      </div>

                      <div>
                         <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Recursos Inclusos</label>
                         <textarea rows={3} defaultValue="Até 2 profissionais&#10;Agendamentos ilimitados&#10;Dashboard financeiro básico" className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 text-neutral-600 text-sm focus:border-rose-300 focus:outline-none resize-none leading-relaxed" />
                      </div>
                   </div>

                   {/* Plano Premium */}
                   <div className="bg-white border-2 border-rose-200 rounded-[2rem] p-8 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">Mais Popular</div>
                      <input type="text" defaultValue="Plano Premium" className="font-bold text-2xl text-rose-600 w-full bg-transparent border-b border-transparent hover:border-rose-100 focus:border-rose-300 focus:outline-none mb-4" />
                      
                      <div className="relative mb-6">
                         <span className="absolute top-3 left-4 text-neutral-400 font-bold">R$</span>
                         <input type="number" defaultValue={150.00} className="w-full border-2 border-rose-100 rounded-xl pl-12 pr-4 py-3 font-bold text-xl text-rose-600 focus:border-rose-300 focus:outline-none bg-rose-50/30" />
                         <span className="absolute top-3 right-4 text-neutral-400 text-sm font-medium">/mês</span>
                      </div>

                      <div>
                         <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Recursos Inclusos</label>
                         <textarea rows={4} defaultValue="Profissionais Ilimitados&#10;Inteligência Artificial (Insights)&#10;Integração WhatsApp Lembretes&#10;Módulo Fidelidade Completo" className="w-full border-2 border-rose-100 rounded-xl px-4 py-3 text-neutral-600 text-sm focus:border-rose-300 focus:outline-none resize-none leading-relaxed bg-rose-50/30" />
                      </div>
                   </div>
                </div>

             </div>
          )}

          {/* Gestão de Salões */}
           {activeTab === 'Gestão de Salões' && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
               {/* Resumo original omitido por brevidade - Mantemos o core do mockup aqui */}
               <h2 className="text-2xl font-bold text-neutral-800 mb-8">Salões Cadastrados</h2>
               <div className="bg-white border border-neutral-100 rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50/50">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Empresa</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Plano Assinado</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 text-center">Software Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {salons.map((salon) => (
                      <tr key={salon.id} className="hover:bg-rose-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-neutral-800">{salon.name}</td>
                        <td className="px-6 py-4"><span className={`px-3 py-1 text-xs font-bold rounded-full ${salon.plan === 'Premium' ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-600'}`}>{salon.plan}</span></td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${salon.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            {salon.status === 'active' ? 'Pagamento Ok / Ativo' : 'Bloqueado (Falta Pgto)'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Demais Abas (Como antes) */}
          {['Controle Financeiro Gerencial', 'Extrato de Faturas'].includes(activeTab) && (
              <div className="bg-white border border-neutral-50 rounded-[2rem] p-8 min-h-[400px] shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
              <LayoutDashboard size={48} className="text-rose-200 mb-4" strokeWidth={1.5} />
              <p className="text-neutral-400 font-medium text-lg">Módulo de {activeTab} 🚀</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
