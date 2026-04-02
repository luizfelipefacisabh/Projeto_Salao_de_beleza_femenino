import React, { useState, useEffect } from 'react';
import { Calendar, Users, Briefcase, Settings, BarChart as ChartIcon, Bell, TrendingUp, DollarSign, Camera, Image as ImageIcon, Trash2, Scissors, Gift, Plus, Link as LinkIcon, MapPin, Phone, CheckCircle2, MessageCircle, SlidersHorizontal, Eye, EyeOff, Save, BrainCircuit, X, Lightbulb, Sparkles, TrendingDown, Clock, CreditCard, Lock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataMensal = [ { name: 'Sem 1', faturamento: 4500 }, { name: 'Sem 2', faturamento: 5200 }, { name: 'Sem 3', faturamento: 3800 }, { name: 'Sem 4', faturamento: 6100 } ];
const dataSemestral = [ { name: 'Jan', faturamento: 18500 }, { name: 'Fev', faturamento: 16200 }, { name: 'Mar', faturamento: 19800 }, { name: 'Abr', faturamento: 21000 }, { name: 'Mai', faturamento: 16500 }, { name: 'Jun', faturamento: 23400 } ];
const dataAnual = [ { name: '2023', faturamento: 180000 }, { name: '2024', faturamento: 215000 }, { name: '2025 (Proj)', faturamento: 280000 } ];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Configurações'); 
  const [period, setPeriod] = useState<'Mensal' | 'Semestral' | 'Anual'>('Semestral');

  const [copiedLink, setCopiedLink] = useState(false);
  const [whatsappReminder, setWhatsappReminder] = useState(true);
  const [menuVisibility, setMenuVisibility] = useState({
    fidelidade: true, financeiro: true, portfolio: true, clientes: true
  });

  const [showAiPush, setShowAiPush] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => { setShowAiPush(true); }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const chartData = period === 'Mensal' ? dataMensal : period === 'Semestral' ? dataSemestral : dataAnual;

  const getRevenueDrops = () => {
    const drops = [];
    for (let i = 1; i < dataSemestral.length; i++) {
        if (dataSemestral[i].faturamento < dataSemestral[i-1].faturamento) {
            const dropPercent = (((dataSemestral[i-1].faturamento - dataSemestral[i].faturamento) / dataSemestral[i-1].faturamento) * 100).toFixed(1);
            drops.push({ current: dataSemestral[i].name, prev: dataSemestral[i-1].name, drop: dropPercent });
        }
    }
    return drops;
  };
  const analyzedDrops = getRevenueDrops();

  const menuItems = [
    { icon: Calendar, label: 'Agenda Diária', id: 'agenda' },
    { icon: BrainCircuit, label: 'Assistente IA', id: 'ia' },
    { icon: Scissors, label: 'Menu de Serviços', id: 'servicos' },
    { icon: Users, label: 'Clientes & CRM', id: 'clientes', show: menuVisibility.clientes },
    { icon: Briefcase, label: 'Profissionais', id: 'profissionais' },
    { icon: ImageIcon, label: 'Portfólio (Galeria)', id: 'portfolio', show: menuVisibility.portfolio },
    { icon: Gift, label: 'Fidelidade', id: 'fidelidade', show: menuVisibility.fidelidade },
    { icon: ChartIcon, label: 'Painel Financeiro', id: 'financeiro', show: menuVisibility.financeiro },
    { icon: Settings, label: 'Configurações', id: 'configuracoes' }
  ].filter(item => item.show !== false);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex relative">
      {/* PUSH NOTIFICATION IA */}
      {showAiPush && (
        <div className="fixed top-24 right-8 w-[340px] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-[1.5rem] p-5 shadow-[0_15px_40px_-5px_rgba(79,70,229,0.4)] z-50 animate-in fade-in slide-in-from-right-16 duration-700 text-white border border-indigo-400">
          <button onClick={() => setShowAiPush(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"><X size={18} /></button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse"><BrainCircuit size={18} className="text-white" /></div>
            <span className="font-bold text-sm uppercase tracking-wider text-indigo-100">Alerta Estratégico IA</span>
          </div>
          <p className="text-sm font-medium leading-relaxed mb-4 text-indigo-50">
            Analisei seu painel financeiro. Houve uma retração de <span className="font-bold text-white bg-red-400/30 px-1.5 rounded">{analyzedDrops[0]?.drop || '21'}%</span> em Maio.
          </p>
          <button onClick={() => { setActiveTab('Assistente IA'); setShowAiPush(false); }} className="w-full bg-white text-indigo-700 hover:bg-neutral-100 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2">
            Abrir Assistente Privé <Sparkles size={16}/>
          </button>
        </div>
      )}

      {/* Sidebar - Menu Rosa */}
      <aside className="w-64 bg-rose-500 flex flex-col hidden md:flex text-white shadow-xl shadow-rose-500/20 z-20">
        <div className="h-20 flex items-center px-8 border-b border-white/10">
           <h2 className="text-xl font-light">Privé <span className="font-extrabold text-rose-100">Gestão</span></h2>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button key={item.label} onClick={() => setActiveTab(item.label)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.label ? 'bg-white text-rose-600 font-bold shadow-sm' : item.id === 'ia' ? 'bg-indigo-600/20 text-indigo-100 hover:bg-indigo-600/40 border border-indigo-400/30 font-bold mt-2 mb-2' : 'text-rose-100 hover:bg-white/10 hover:text-white font-medium'}`}>
              <item.icon size={18} className={activeTab === item.label ? "text-rose-500" : item.id === 'ia' ? 'text-indigo-300' : ''} strokeWidth={activeTab === item.label ? 2.5 : 2} />
              <span className="text-[13px]">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative">
        <header className="h-20 border-b border-neutral-200 flex items-center px-8 justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10 transition-colors">
          <h1 className="text-xl font-bold text-neutral-800">{activeTab}</h1>
          <div className="flex items-center gap-6">
            <button className="text-neutral-400 hover:text-rose-500"><Bell size={22} strokeWidth={2} /></button>
            <div className="flex items-center gap-4 border-l border-neutral-200 pl-6">
              <div className="text-right hidden sm:block">
                <span className="block text-sm font-bold text-neutral-800">Marina B.</span>
                <span className="block text-xs font-medium text-neutral-400">Sócia-proprietária</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 text-rose-600 font-bold flex items-center justify-center text-sm shadow-sm">MB</div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto pb-24">
          
          {/* CONFIGURAÇÕES E ASSINATURAS */}
          {activeTab === 'Configurações' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold text-neutral-800">Ajustes & Assinatura da Clínica</h3>
                 <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-all">
                    <Save size={16} /> Salvar Configurações
                 </button>
               </div>

               {/* SEÇÃO PAGAMENTO DA PLATAFORMA (SaaS) */}
               <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden mb-6 border border-neutral-700">
                  <div className="absolute top-[-30%] right-[-10%] w-64 h-64 bg-rose-500 rounded-full blur-[90px] opacity-20 pointer-events-none"></div>
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 relative z-10">
                     <div>
                        <h4 className="flex items-center gap-2 font-bold text-white text-lg mb-1"><CreditCard size={20} className="text-rose-400" /> Assinatura do Software Privé</h4>
                        <p className="text-neutral-400 text-sm mb-4">Pagamento automatizado para garantir seu painel, IA e agendamentos no ar.</p>
                        <div className="flex items-end gap-3 mb-6">
                           <span className="text-4xl font-extrabold tracking-tight text-white">R$ 150<span className="text-lg text-neutral-500">,00</span></span>
                           <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 mb-1"><CheckCircle2 size={12}/> Plano Premium (Ativo)</span>
                        </div>
                        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest"><Clock size={12} className="inline mr-1" /> Próxima cobrança: 10 de Junho de 2026</p>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-full md:w-[360px]">
                        <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4 flex justify-between items-center">Método de Cobrança <Lock size={12} className="text-emerald-400"/></p>
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                           <div className="w-12 h-8 bg-neutral-100 rounded flex items-center justify-center"><span className="text-blue-900 font-extrabold italic text-sm">VISA</span></div>
                           <div><p className="font-bold text-sm tracking-widest">**** **** **** 4242</p><p className="text-xs text-neutral-400">Vence em 12/30</p></div>
                        </div>
                        <button className="w-full bg-white text-neutral-900 hover:bg-rose-50 hover:text-rose-600 py-3 rounded-xl text-sm font-bold shadow-sm">Atualizar Cartão de Crédito</button>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Link Publico */}
                 <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                   <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg mb-2"><LinkIcon size={20} className="text-rose-500"/> Link do Agendamento</h4>
                   <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 p-2 rounded-2xl mt-4">
                     <div className="flex-1 px-4 font-mono text-neutral-600 text-sm">https://suaplataforma.com/book/maison-prive</div>
                   </div>
                 </div>
                 {/* WhatsApp */}
                 <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                   <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg mb-2 text-green-600"><MessageCircle size={20} className="text-green-500"/> Automação WhatsApp</h4>
                   <textarea rows={2} defaultValue="Olá! Acabamos de confirmar seu horário na Maison Privé." className="w-full mt-4 border-2 border-neutral-100 rounded-xl px-4 py-3 resize-none text-sm text-neutral-600" />
                 </div>
               </div>
             </div>
          )}

          {/* AGENDA DIÁRIA */}
          {activeTab === 'Agenda Diária' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <div className="flex justify-between items-end mb-6">
                  <div>
                     <h3 className="text-2xl font-bold text-neutral-800">Sua Agenda</h3>
                     <p className="text-neutral-500 text-sm font-medium">Visualização diária dos apontamentos.</p>
                  </div>
                  <div className="flex bg-white rounded-xl shadow-sm border border-neutral-100 p-1">
                     <button className="px-4 py-2 font-bold text-sm bg-rose-50 text-rose-600 rounded-lg">Hoje</button>
                     <button className="px-4 py-2 font-bold text-sm text-neutral-400">Amanhã</button>
                  </div>
               </div>
               <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                  <div className="space-y-0 relative">
                     <div className="absolute left-16 top-0 bottom-0 w-px bg-neutral-100 z-0"></div>
                     {[
                        { time: '09:00', title: 'Balayage & Coloração', client: 'Alice Ribeiro', prof: 'Mariana B.', status: 'checkout', color: 'emerald' },
                        { time: '11:30', title: 'Corte Premium + Escova', client: 'Júlia Mendes', prof: 'Camila P.', status: 'active', color: 'rose' },
                        { time: '14:00', title: 'Manicure Gel (Alongamento)', client: 'Fernanda Lima', prof: 'Sônia R.', status: 'pending', color: 'amber' }
                     ].map((apt, i) => (
                        <div key={i} className="flex gap-6 relative z-10 py-4 group">
                           <div className="w-16 text-right pt-2 font-bold text-neutral-400 text-sm">{apt.time}</div>
                           <div className="relative"><div className={`w-3 h-3 rounded-full absolute top-3.5 -left-1.5 border-2 border-white bg-${apt.color}-400 shadow-sm transition-transform group-hover:scale-125`}></div></div>
                           <div className={`flex-1 border border-neutral-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-${apt.color}-200 transition-all cursor-pointer bg-white`}>
                              <div className="flex justify-between items-start mb-2">
                                 <h4 className="font-bold text-neutral-800 text-lg">{apt.title}</h4>
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${apt.color}-50 text-${apt.color}-600`}>{apt.status === 'checkout' ? 'Pago' : apt.status === 'active' ? 'Em andamento' : 'Aguardando'}</span>
                              </div>
                              <div className="flex items-center gap-6 mt-3 text-sm text-neutral-500 font-medium">
                                 <p>Cliente: {apt.client}</p>
                                 <p className="border-l border-neutral-200 pl-6"><Briefcase size={14} className="inline mr-2"/>{apt.prof}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
             </div>
          )}

          {/* MENU DE SERVIÇOS */}
          {activeTab === 'Menu de Serviços' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <h3 className="text-2xl font-bold text-neutral-800 mb-6">Serviços Oferecidos</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { name: 'Balayage & Coloração', desc: 'Técnica francesa de iluminação degradê personalizada.', price: 'R$ 290,00', duration: '120 min' },
                   { name: 'Corte Premium', desc: 'Corte visagista com lavagem e relaxamento.', price: 'R$ 150,00', duration: '60 min' }
                 ].map((svc, i) => (
                   <div key={i} className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-neutral-800 text-lg">{svc.name}</h4>
                         <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-bold">{svc.price}</span>
                      </div>
                      <p className="text-neutral-500 text-sm">{svc.desc}</p>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* CLIENTES & CRM */}
          {activeTab === 'Clientes & CRM' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <h3 className="text-2xl font-bold text-neutral-800 mb-6">Meus Clientes (CRM)</h3>
               <div className="bg-white border border-neutral-100 rounded-[2rem] overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-neutral-50/50 border-b border-neutral-100 text-xs uppercase tracking-wider font-bold text-neutral-400">
                           <th className="px-6 py-4">Cliente</th><th className="px-6 py-4">Última Visita</th><th className="px-6 py-4 text-center">Ticket Médio</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-neutral-50">
                        {[
                           { name: 'Alice Ribeiro', last: 'Há 2 dias', ticket: 'R$ 290,00' },
                           { name: 'Bruna Silva', last: 'Há 45 dias', ticket: 'R$ 80,00' }
                        ].map((client, i) => (
                           <tr key={i} className="hover:bg-rose-50/30">
                              <td className="px-6 py-4 font-bold text-neutral-800">{client.name}</td>
                              <td className="px-6 py-4 text-sm font-medium text-neutral-500">{client.last}</td>
                              <td className="px-6 py-4 text-center text-sm font-bold text-emerald-600">{client.ticket}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
             </div>
          )}

          {/* PAINEL FINANCEIRO */}
          {activeTab === 'Painel Financeiro' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <h3 className="text-2xl font-bold text-neutral-800 mb-6">Controle e Extrato de Receitas</h3>
               <div className="bg-white border border-neutral-100 rounded-[2rem] overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-neutral-50/50 border-b border-neutral-100 text-xs uppercase tracking-wider font-bold text-neutral-400">
                           <th className="px-6 py-4">Serviço & Cliente</th>
                           <th className="px-6 py-4">Data</th>
                           <th className="px-6 py-4">Método de Checkout</th>
                           <th className="px-6 py-4 text-right">Valor</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-neutral-50">
                        {[
                           { title: 'Balayage & Coloração (Alice Ribeiro)', date: 'Hoje, 09:00', method: 'PIX (App)', val: 'R$ 290,00', local: false },
                           { title: 'Manicure Gel (Fernanda Lima)', date: 'Ontem, 14:00', method: 'Cartão de Crédito (App)', val: 'R$ 110,00', local: false },
                           { title: 'Corte Premium (Júlia Mendes)', date: 'Ontem, 11:30', method: 'Pagamento no Salão', val: 'R$ 150,00', local: true },
                        ].map((trans, i) => (
                           <tr key={i} className="hover:bg-rose-50/30">
                              <td className="px-6 py-4 font-bold text-neutral-800">{trans.title}</td>
                              <td className="px-6 py-4 text-sm font-medium text-neutral-500">{trans.date}</td>
                              <td className="px-6 py-4">
                                {trans.local ? (
                                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[11px] font-bold border border-amber-200">Em Espécie / Maquininha (Local)</span>
                                ) : (
                                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-100">{trans.method}</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right text-sm font-bold text-neutral-800">{trans.val}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
             </div>
          )}

          {/* OUTRAS ABAS COMUNS (IA, Profissionais, Fidelidade) */}
          {!['Configurações', 'Agenda Diária', 'Menu de Serviços', 'Clientes & CRM', 'Painel Financeiro'].includes(activeTab) && (
             <div className="bg-white border border-neutral-50 rounded-[2rem] p-8 min-h-[400px] shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
               <p className="text-neutral-400 font-medium text-lg">Módulo {activeTab} operando normalmente.</p>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}
