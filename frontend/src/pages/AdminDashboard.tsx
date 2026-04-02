import React, { useState } from 'react';
import { Calendar, Users, Briefcase, Settings, BarChart as ChartIcon, Bell, TrendingUp, DollarSign, Camera, Image as ImageIcon, Trash2, Scissors, Gift, Plus, Link as LinkIcon, MapPin, Phone, CheckCircle2, MessageCircle, SlidersHorizontal, Eye, EyeOff, Save } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataMensal = [ { name: 'Sem 1', faturamento: 4500 }, { name: 'Sem 2', faturamento: 5200 }, { name: 'Sem 3', faturamento: 3800 }, { name: 'Sem 4', faturamento: 6100 } ];
const dataSemestral = [ { name: 'Jan', faturamento: 18500 }, { name: 'Fev', faturamento: 16200 }, { name: 'Mar', faturamento: 19800 }, { name: 'Abr', faturamento: 21000 }, { name: 'Mai', faturamento: 19500 }, { name: 'Jun', faturamento: 23400 } ];
const dataAnual = [ { name: '2023', faturamento: 180000 }, { name: '2024', faturamento: 215000 }, { name: '2025 (Proj)', faturamento: 280000 } ];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Configurações'); // Starts at config to showcase
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

  const chartData = period === 'Mensal' ? dataMensal : period === 'Semestral' ? dataSemestral : dataAnual;

  const handleCopy = () => {
    navigator.clipboard.writeText('https://app.com/book/maisonprive');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const menuItems = [
    { icon: Calendar, label: 'Agenda Diária', id: 'agenda' },
    { icon: Scissors, label: 'Menu de Serviços', id: 'servicos' },
    { icon: Users, label: 'Clientes & CRM', id: 'clientes', show: menuVisibility.clientes },
    { icon: Briefcase, label: 'Profissionais', id: 'profissionais' },
    { icon: ImageIcon, label: 'Portfólio (Galeria)', id: 'portfolio', show: menuVisibility.portfolio },
    { icon: Gift, label: 'Fidelidade', id: 'fidelidade', show: menuVisibility.fidelidade },
    { icon: ChartIcon, label: 'Painel Financeiro', id: 'financeiro', show: menuVisibility.financeiro },
    { icon: Settings, label: 'Configurações', id: 'configuracoes' }
  ].filter(item => item.show !== false); // Filter out hidden menus dynamically

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 flex">
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
          
          {/* CONFIGURAÇÕES (NOVO) */}
          {activeTab === 'Configurações' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <div className="flex justify-between items-center mb-4">
                 <div>
                    <h3 className="text-xl font-bold text-neutral-800">Ajustes da Empresa</h3>
                    <p className="text-neutral-400 text-sm font-medium">Controle suas informações públicas, integrações e visibilidade.</p>
                 </div>
                 <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-all">
                    <Save size={16} /> Salvar Configurações
                 </button>
               </div>

               {/* SEÇÃO 1: LINK PÚBLICO */}
               <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                 <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg mb-2"><LinkIcon size={20} className="text-rose-500"/> Link do Agendamento</h4>
                 <p className="text-neutral-500 text-sm mb-6 max-w-2xl">Este é o link público do seu salão. Envie-o para suas clientes pelo WhatsApp ou adicione na biografia do seu Instagram para elas agendarem, verem serviços e portfólio.</p>
                 
                 <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 p-2 rounded-2xl">
                   <div className="flex-1 px-4 font-mono text-neutral-600 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                     https://suaplataforma.com/book/maison-prive
                   </div>
                   <button 
                     onClick={handleCopy}
                     className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${copiedLink ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-800 hover:bg-black text-white'}`}
                   >
                     {copiedLink ? <><CheckCircle2 size={16}/> Copiado</> : 'Copiar Link'}
                   </button>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* SEÇÃO 2: INFORMAÇÕES DO SALÃO */}
                 <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm space-y-5">
                   <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg"><Building2 size={20} className="text-rose-500"/> Perfil do Salão</h4>
                   
                   <div>
                     <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Nome do Estabelecimento</label>
                     <input type="text" defaultValue="Maison Privé" className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all text-neutral-700 font-semibold" />
                   </div>
                   
                   <div>
                     <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Descrição do Salão</label>
                     <textarea rows={3} defaultValue="Seu espaço premium em São Paulo. Especialistas em mechas balayage, coloração avançada e cuidados de alto padrão." className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all text-neutral-700 text-sm resize-none" />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Telefone</label>
                       <input type="text" defaultValue="(11) 98888-7777" className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all text-neutral-700 font-semibold text-sm" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">CEP</label>
                       <input type="text" defaultValue="01415-000" className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all text-neutral-700 font-semibold text-sm" />
                     </div>
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Endereço Completo</label>
                     <input type="text" defaultValue="Rua Oscar Freire, 1000 - Jardins, SP" className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all text-neutral-700 text-sm" />
                   </div>
                 </div>

                 {/* SEÇÃO 3 E 4: WHATSAPP E MÓDULOS */}
                 <div className="space-y-6">
                   {/* WhatsApp */}
                   <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm space-y-6">
                     <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg"><MessageCircle size={20} className="text-green-500 fill-green-100"/> Integração WhatsApp</h4>
                     
                     <div>
                       <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">WhatsApp do Salão (Para notificações)</label>
                       <input type="text" defaultValue="5511988887777" className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all text-neutral-700 font-mono text-sm" />
                     </div>

                     <div>
                       <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Mensagem de Saudação Padrão</label>
                       <textarea rows={2} defaultValue="Olá! Obrigada por contatar a Maison Privé. Como podemos te ajudar a ficar ainda mais linda hoje?" className="w-full border-2 border-neutral-100 rounded-xl px-4 py-3 focus:outline-none text-neutral-600 text-sm resize-none" />
                     </div>

                     <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                        <div>
                          <p className="font-bold text-sm text-neutral-800">Lembrete de Agendamento</p>
                          <p className="text-xs text-neutral-500 mt-1">Enviar WhatsApp automático 24h antes para cliente</p>
                        </div>
                        <button 
                          onClick={() => setWhatsappReminder(!whatsappReminder)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${whatsappReminder ? 'bg-green-500' : 'bg-neutral-300'}`}
                        >
                           <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${whatsappReminder ? 'translate-x-6' : 'translate-x-0'}`}></span>
                        </button>
                     </div>
                   </div>

                   {/* Módulos do Sistema */}
                   <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                     <h4 className="flex items-center gap-2 font-bold text-neutral-800 text-lg mb-6"><SlidersHorizontal size={20} className="text-rose-500"/> Visibilidade de Menus Internos</h4>
                     
                     <div className="space-y-4">
                       {[
                         { id: 'portfolio', label: 'Portfólio (Galeria)', desc: 'Fotos dos seus trabalhos para clientes verem' },
                         { id: 'fidelidade', label: 'Programa de Fidelidade', desc: 'Gestão de recompensas para clientes frequentes' },
                         { id: 'financeiro', label: 'Painel Financeiro', desc: 'Gráficos de evolução de faturamento e ticket' }
                       ].map(mod => (
                         <div key={mod.id} className="flex items-center justify-between group">
                           <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${menuVisibility[mod.id as keyof typeof menuVisibility] ? 'bg-rose-50 text-rose-500' : 'bg-neutral-100 text-neutral-400'}`}>
                                {menuVisibility[mod.id as keyof typeof menuVisibility] ? <Eye size={14} /> : <EyeOff size={14} />}
                             </div>
                             <div>
                               <p className="font-bold text-sm text-neutral-800">{mod.label}</p>
                               <p className="text-xs text-neutral-400">{mod.desc}</p>
                             </div>
                           </div>
                           <button 
                              onClick={() => setMenuVisibility({...menuVisibility, [mod.id]: !menuVisibility[mod.id as keyof typeof menuVisibility]})}
                              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${menuVisibility[mod.id as keyof typeof menuVisibility] ? 'border-rose-200 text-rose-600 bg-white hover:bg-rose-50' : 'border-neutral-200 text-neutral-500 bg-neutral-50 hover:bg-neutral-100'}`}
                           >
                              {menuVisibility[mod.id as keyof typeof menuVisibility] ? 'Ativo' : 'Oculto'}
                           </button>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* MENU DE SERVIÇOS */}
          {activeTab === 'Menu de Serviços' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                  <div>
                     <h3 className="text-xl font-bold text-neutral-800">Gerenciamento de Serviços</h3>
                  </div>
                  <button className="px-5 py-2.5 bg-rose-500 text-white rounded-full text-sm font-bold shadow-sm hover:bg-rose-600 flex items-center gap-2">
                     <Plus size={18} /> Novo Serviço
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { name: 'Balayage & Coloração', desc: 'Técnica francesa de iluminação degradê personalizada, inclui escova e finalização com proteção térmica.', price: 'R$ 290,00', duration: '120 min' },
                   { name: 'Corte Premium', desc: 'Corte visagista com lavagem relaxante, hidratação profunda e secagem.', price: 'R$ 150,00', duration: '60 min' }
                 ].map((svc, i) => (
                   <div key={i} className="bg-white border border-neutral-100 rounded-[2rem] p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-neutral-800 text-lg">{svc.name}</h4>
                         <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-sm font-bold">{svc.price}</span>
                      </div>
                      <p className="text-neutral-500 text-sm mb-4">{svc.desc}</p>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* FIDELIDADE */}
          {activeTab === 'Fidelidade' && (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 shadow-sm">
                   <h3 className="text-2xl font-bold text-neutral-800 mb-6">Programa de Fidelidade Privé</h3>
                </div>
             </div>
          )}

          {/* PAINEL FINANCEIRO */}
          {activeTab === 'Painel Financeiro' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
               <h3 className="text-2xl font-bold text-neutral-800 mb-6">Gráficos Financeiros</h3>
            </div>
          )}

          {/* PORTFÓLIO (Galeria) */}
          {activeTab === 'Portfólio (Galeria)' && (
             <div className="bg-white border border-neutral-50 rounded-[2rem] p-8 min-h-[400px] shadow-sm flex flex-col justify-center animate-in fade-in duration-500">
               <Camera size={48} className="text-rose-200 mb-4 mx-auto" />
               <p className="text-neutral-400 font-medium text-lg text-center">Portfólio do Salão</p>
             </div>
          )}

          {/* OUTRAS ABAS COMUNS */}
          {!['Configurações', 'Menu de Serviços', 'Fidelidade', 'Painel Financeiro', 'Portfólio (Galeria)'].includes(activeTab) && (
             <div className="bg-white border border-neutral-50 rounded-[2rem] p-8 min-h-[400px] shadow-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
               <Calendar size={48} className="text-rose-200 mb-4" strokeWidth={1.5} />
               <p className="text-neutral-400 font-medium text-lg">Módulo de {activeTab} em desenvolvimento.</p>
             </div>
          )}

        </div>
      </main>
    </div>
  );
}
