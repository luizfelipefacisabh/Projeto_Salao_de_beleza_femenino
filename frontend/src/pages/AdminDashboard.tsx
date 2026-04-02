import React, { useState, useEffect } from 'react';
import { Calendar, Users, Briefcase, Settings, BarChart as ChartIcon, Bell, TrendingUp, DollarSign, Camera, Image as ImageIcon, Trash2, Scissors, Gift, Plus, Link as LinkIcon, MapPin, Phone, CheckCircle2, MessageCircle, SlidersHorizontal, Eye, EyeOff, Save, BrainCircuit, X, Lightbulb, Sparkles, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataMensal = [ { name: 'Sem 1', faturamento: 4500 }, { name: 'Sem 2', faturamento: 5200 }, { name: 'Sem 3', faturamento: 3800 }, { name: 'Sem 4', faturamento: 6100 } ];
const dataSemestral = [ { name: 'Jan', faturamento: 18500 }, { name: 'Fev', faturamento: 16200 }, { name: 'Mar', faturamento: 19800 }, { name: 'Abr', faturamento: 21000 }, { name: 'Mai', faturamento: 16500 }, { name: 'Jun', faturamento: 23400 } ];
const dataAnual = [ { name: '2023', faturamento: 180000 }, { name: '2024', faturamento: 215000 }, { name: '2025 (Proj)', faturamento: 280000 } ];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Agenda Diária');
  const [period, setPeriod] = useState<'Mensal' | 'Semestral' | 'Anual'>('Semestral');
  const [portfolioActive, setPortfolioActive] = useState(true);

  // Estados de Configuração
  const [copiedLink, setCopiedLink] = useState(false);
  const [whatsappReminder, setWhatsappReminder] = useState(true);
  const [menuVisibility, setMenuVisibility] = useState({
    fidelidade: true,
    financeiro: true,
    portfolio: true,
    clientes: true
  });

  // Estado do Assistente IA
  const [showAiPush, setShowAiPush] = useState(false);

  useEffect(() => {
    // Simula a chegada de um Push inteligente após 2.5 segundos que a gestora abriu a tela
    const timer = setTimeout(() => {
      setShowAiPush(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const chartData = period === 'Mensal' ? dataMensal : period === 'Semestral' ? dataSemestral : dataAnual;

  const handleCopy = () => {
    navigator.clipboard.writeText('https://app.com/book/maisonprive');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Avaliação Inteligente de Queda (IA Analisadora)
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
    { icon: BrainCircuit, label: 'Assistente IA', id: 'ia' }, // NOVO: MENU IA
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
      {/* PUSH NOTIFICATION (Absolute/Fixed overlaid) */}
      {showAiPush && (
        <div className="fixed top-24 right-8 w-[340px] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-[1.5rem] p-5 shadow-[0_15px_40px_-5px_rgba(79,70,229,0.4)] z-50 animate-in fade-in slide-in-from-right-16 duration-700 text-white border border-indigo-400">
          <button onClick={() => setShowAiPush(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
               <BrainCircuit size={18} className="text-white" />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider text-indigo-100">Alerta Estratégico IA</span>
          </div>
          <p className="text-sm font-medium leading-relaxed mb-4 text-indigo-50">
            Analisei seu painel financeiro. Houve uma retração de <span className="font-bold text-white bg-red-400/30 px-1.5 rounded">{analyzedDrops[1]?.drop || '21'}%</span> em Maio. Encontrei 2 estratégias para recuperar esse movimento.
          </p>
          <button 
            onClick={() => { setActiveTab('Assistente IA'); setShowAiPush(false); }} 
            className="w-full bg-white text-indigo-700 hover:bg-neutral-100 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
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
            <button 
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.label 
                  ? 'bg-white text-rose-600 font-bold shadow-sm' 
                  : item.id === 'ia' 
                    ? 'bg-indigo-600/20 text-indigo-100 hover:bg-indigo-600/40 border border-indigo-400/30 font-bold mt-2 mb-2'
                    : 'text-rose-100 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              <item.icon size={18} className={activeTab === item.label ? "text-rose-500" : item.id === 'ia' ? 'text-indigo-300' : ''} strokeWidth={activeTab === item.label ? 2.5 : 2} />
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
          
          {/* ASSISTENTE IA (NOVO) */}
          {activeTab === 'Assistente IA' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               {/* Cabeçalho da IA */}
               <div className="bg-gradient-to-br from-indigo-800 via-purple-700 to-indigo-900 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500 rounded-full blur-[80px] pointer-events-none opacity-50" />
                  <div className="relative z-10 flex items-start gap-6">
                     <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <BrainCircuit size={32} className="text-indigo-200" />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Seu Assistente de Negócios IA</h3>
                        <p className="text-indigo-100 font-medium max-w-2xl text-sm leading-relaxed">
                          "Olá! Eu monitoro o comportamento das suas clientes, os padrões financeiros do salão e escaneio o mercado para te entregar dicas automáticas de como maximizar seus lucros e reduzir ociosidade."
                        </p>
                     </div>
                  </div>
               </div>

               {/* Análise Financeira Proativa */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                     <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-neutral-800 flex items-center gap-2 text-lg"><TrendingDown size={20} className="text-rose-500"/> Alertas de Retração</h4>
                        <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Atenção</span>
                     </div>
                     
                     <div className="space-y-5">
                       {analyzedDrops.map((drop, idx) => (
                         <div key={idx} className="border-l-4 border-rose-400 pl-4 py-1">
                            <p className="text-sm text-neutral-500 font-medium">De {drop.prev} a {drop.current}</p>
                            <p className="font-bold text-neutral-800 mt-1">Faturamento caiu <span className="text-rose-500">{drop.drop}%</span></p>
                            <div className="mt-3 bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                               <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Lightbulb size={12}/> Plano de Ação Sugerido</p>
                               <p className="text-sm text-neutral-600">Dispare um voucher via WhatsApp para os clientes de {drop.prev} ofertando uma Hidratação grátis no agendamento de Coloração em {drop.current}.</p>
                               <button className="mt-3 w-full bg-white border border-neutral-200 text-neutral-800 py-2 rounded-lg text-xs font-bold hover:bg-neutral-50 transition-colors shadow-sm">Criar Campanha CRM Automática</button>
                            </div>
                         </div>
                       ))}
                       {analyzedDrops.length === 0 && (
                          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium">Nenhuma queda brusca detectada. O faturamento está crescendo constantemente. Continue assim!</div>
                       )}
                     </div>
                  </div>

                  {/* Market Trends */}
                  <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                     <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-neutral-800 flex items-center gap-2 text-lg"><Sparkles size={20} className="text-indigo-500"/> Radar de Tendências</h4>
                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Mercado SP</span>
                     </div>
                     
                     <div className="space-y-4">
                        <div className="group border border-neutral-100 hover:border-indigo-200 bg-neutral-50 hover:bg-indigo-50/50 transition-all rounded-[1.5rem] p-5 cursor-pointer">
                           <div className="flex justify-between items-start mb-2">
                             <h5 className="font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">Alongamento Soft Gel</h5>
                             <span className="flex items-center gap-1 text-xs font-bold text-emerald-500"><TrendingUp size={12}/> +400% buscas</span>
                           </div>
                           <p className="text-xs text-neutral-500">Há uma enorme procura por Soft Gel nesta semana na sua região. 8 dos seus concorrentes recém adicionaram isso ao menu de serviços.</p>
                        </div>

                        <div className="group border border-neutral-100 hover:border-indigo-200 bg-neutral-50 hover:bg-indigo-50/50 transition-all rounded-[1.5rem] p-5 cursor-pointer">
                           <div className="flex justify-between items-start mb-2">
                             <h5 className="font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">Terapia Capilar Focada</h5>
                             <span className="flex items-center gap-1 text-xs font-bold text-emerald-500"><TrendingUp size={12}/> +120% buscas</span>
                           </div>
                           <p className="text-xs text-neutral-500">Muitos salões Premium estão integrando avaliações em microscópio digital. Custo-benefício excelente para fidelização.</p>
                        </div>
                     </div>
                  </div>
               </div>
             </div>
          )}

          {/* ... (Todo o resto das views: Configurações, Serviços, etc - Reduzido por simplicidade visual) */}
          {activeTab === 'Configurações' && (
             <div className="bg-white border border-neutral-50 rounded-[2rem] p-8 min-h-[400px] shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
               <Settings size={48} className="text-rose-200 mb-4" strokeWidth={1.5} />
               <p className="text-neutral-400 font-medium text-lg">Módulo de Configuração Ativo.</p>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}
