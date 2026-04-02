import React from 'react';
import { Sparkles, Scissors, Clock, CreditCard, MessageCircle, CheckCircle2, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientWizard() {
  const [step, setStep] = React.useState(0);
  const [paymentMethod, setPaymentMethod] = React.useState('pix');

  const handleWhatsAppCheckout = () => {
    const text = encodeURIComponent('Olá! Gostaria de confirmar meu agendamento na Maison Privé para Balayage com a Mariana às 09:00. Paguei via PIX!');
    window.open(`https://wa.me/5511999999999?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-100 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-200/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-pink-200/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700 flex-1 flex flex-col">
        {step > 0 && (
           <header className="mb-6 text-center">
             <h1 className="text-4xl font-light tracking-tight text-neutral-800 mb-2 mt-4">
               Maison <span className="font-semibold text-rose-500">Privé</span>
             </h1>
             <p className="text-rose-400 text-sm font-medium">Sua experiência premium</p>
           </header>
        )}

        {step > 0 && (
          <div className="relative flex justify-between mb-8 px-4">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-rose-200 -z-10 -translate-y-1/2" />
            {[
              { num: 1, icon: Scissors, label: 'Serviço' },
              { num: 2, icon: Sparkles, label: 'Profissional' },
              { num: 3, icon: Clock, label: 'Horário' },
              { num: 4, icon: CreditCard, label: 'Checkout' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${
                    step >= s.num ? 'bg-rose-500 text-white shadow-[0_4px_15px_rgba(244,63,94,0.4)] scale-110' : 'bg-white text-rose-300 border-2 border-rose-100'
                  }`}>
                  <s.icon size={s.num === 4 ? 18 : 20} strokeWidth={step >= s.num ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] sm:text-xs mt-3 font-semibold transition-colors duration-200 ${step >= s.num ? 'text-rose-600' : 'text-neutral-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className={`bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-rose-100/60 transition-all duration-300 flex-1 flex flex-col ${step === 0 ? 'mt-8 p-8' : 'p-6 sm:p-8'}`}>
          {/* STEP 0: SALON PROFILE */}
          {step === 0 && (
            <div className="text-center space-y-6 flex-1 flex flex-col justify-center animate-in fade-in duration-700">
               <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl shadow-rose-200/50 mb-2 relative">
                 <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Salon Cover" />
                 <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-full"></div>
               </div>
               
               <div>
                  <h2 className="text-3xl font-bold text-neutral-800 mb-2">Maison <span className="text-rose-500">Privé</span></h2>
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-4">
                     <Star size={16} className="fill-current" /><Star size={16} className="fill-current" /><Star size={16} className="fill-current" /><Star size={16} className="fill-current" /><Star size={16} className="fill-current" />
                     <span className="text-sm font-bold text-neutral-600 ml-1">(4.9/5)</span>
                  </div>
                  <p className="text-neutral-500 font-medium text-[15px] leading-relaxed mb-6">
                    Seu espaço premium em São Paulo. Especialistas em mechas balayage, coloração avançada e cuidados de alto padrão para unhas e estética.
                  </p>
                  
                  <div className="bg-rose-50/50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border border-rose-100/50">
                     <div className="flex items-center gap-2 text-sm text-neutral-600 font-semibold">
                        <MapPin size={16} className="text-rose-500"/> Jardins, SP
                     </div>
                     <div className="flex justify-center gap-2 text-xs font-bold text-emerald-600">
                        <span className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aberto Agora</span>
                        <span className="bg-neutral-50 px-3 py-1 rounded-full border border-neutral-200 text-neutral-500">Seg a Sáb, 8h às 20h</span>
                     </div>
                  </div>
               </div>

               <div className="mt-8 space-y-4">
                 <button onClick={() => setStep(1)} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-rose-500/30 active:scale-[0.98] text-lg">
                   Agendar Horário
                 </button>
                 <Link to="/portfolio" className="w-full block bg-white hover:bg-rose-50 border-2 border-rose-100 text-rose-500 font-bold py-3.5 rounded-2xl transition-all text-[15px]">
                   Ver Portfólio de Trabalhos
                 </Link>
               </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-semibold text-neutral-800">O que deseja hoje?</h2>
              </div>
              
              <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                {['Balayage & Coloração', 'Corte Premium', 'Manicure & Pedicure', 'Design de Sobrancelha'].map((service) => (
                  <button 
                    key={service}
                    onClick={() => setStep(2)}
                    className="w-full text-left p-4 rounded-2xl bg-white hover:bg-rose-50 border border-neutral-100 hover:border-rose-300 transition-all group flex justify-between items-start shadow-sm hover:shadow-md"
                  >
                    <div>
                      <span className="block text-neutral-800 font-bold group-hover:text-rose-600 transition-colors mb-1">{service}</span>
                      <span className="text-xs text-neutral-500 font-medium line-clamp-2">Tratamento completo com hidratação e proteção térmica, garantindo o melhor design para você.</span>
                    </div>
                    <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap mt-1">R$ 150+</span>
                  </button>
                ))}
              </div>
              <div className="pt-2 text-center mt-auto">
                <button onClick={() => setStep(0)} className="px-6 py-2 text-sm font-semibold text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">Voltar ao Salão</button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-neutral-800 mb-6 text-center">Sua Profissional</h2>
              <div className="space-y-3 flex-1">
                {['Mariana Luz', 'Camila P.'].map((stylist) => (
                  <button 
                    key={stylist}
                    onClick={() => setStep(3)}
                    className="w-full text-left p-4 rounded-2xl bg-white hover:bg-rose-50 border border-neutral-100 hover:border-rose-300 transition-all flex items-center gap-4 group shadow-sm hover:shadow-md"
                  >
                    <div className="w-14 h-14 rounded-full bg-rose-100 overflow-hidden flex-shrink-0 relative group-hover:ring-4 ring-rose-200 transition-all shadow-inner">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${stylist}&backgroundColor=fce7f3`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <span className="block text-neutral-800 font-bold text-lg group-hover:text-rose-600 transition-colors">{stylist}</span>
                      <span className="text-sm text-neutral-500 font-medium">Especialista Ouro</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="pt-2 text-center mt-auto">
                <button onClick={() => setStep(1)} className="px-6 py-2 text-sm font-semibold text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">Voltar</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-neutral-800 mb-6 text-center">Melhor horário?</h2>
              <div className="grid grid-cols-2 gap-3 flex-1 content-start">
                {['09:00', '10:30', '14:00', '16:30'].map((time) => (
                  <button 
                    key={time}
                    onClick={() => setStep(4)}
                    className="p-4 text-center rounded-2xl bg-white hover:bg-rose-500 hover:text-white border border-neutral-100 hover:border-rose-500 transition-all font-bold text-[15px] text-neutral-700 shadow-sm hover:shadow-md active:translate-y-0"
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="pt-4 flex justify-between items-center mt-auto px-2">
                <button onClick={() => setStep(2)} className="px-5 py-2 text-sm font-semibold text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">Voltar</button>
                <button onClick={() => setStep(2)} className="px-5 py-2 text-sm font-semibold text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">Modificar</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-neutral-800 mb-2 text-center">Checkout</h2>
              
              <div className="bg-rose-50 rounded-2xl p-4 mb-4 border border-rose-100">
                <p className="flex justify-between text-sm text-neutral-600 mb-1 font-medium"><span>Serviço:</span> <span className="font-bold text-neutral-800">Balayage & Coloração</span></p>
                <p className="flex justify-between text-sm text-neutral-600 mb-1 font-medium"><span>Especialista:</span> <span className="font-bold text-neutral-800">Mariana Luz</span></p>
                <p className="flex justify-between text-sm text-neutral-600 mb-3 font-medium"><span>Data/Hora:</span> <span className="font-bold text-neutral-800">Hoje às 09:00</span></p>
                <hr className="border-rose-200/60 mb-3"/>
                <p className="flex justify-between text-base font-semibold text-rose-500 uppercase tracking-widest"><span>Total:</span> <span className="font-extrabold text-2xl">R$ 290</span></p>
              </div>

              <div className="space-y-2 mb-6">
                 <p className="text-sm font-bold text-neutral-800 mb-2 ml-1">Método de pagamento:</p>
                 <div className="grid grid-cols-1 gap-3">
                   <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => setPaymentMethod('pix')} className={`p-4 rounded-2xl font-bold flex flex-col items-center gap-2 border-2 transition-all ${paymentMethod === 'pix' ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm' : 'border-neutral-100 bg-white text-neutral-500 hover:border-rose-300'}`}>
                        <CheckCircle2 size={24} className={paymentMethod === 'pix' ? 'text-rose-500' : 'text-neutral-300'}/> PIX
                     </button>
                     <button onClick={() => setPaymentMethod('card')} className={`p-4 rounded-2xl font-bold flex flex-col items-center gap-2 border-2 transition-all ${paymentMethod === 'card' ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm' : 'border-neutral-100 bg-white text-neutral-500 hover:border-rose-300'}`}>
                        <CreditCard size={24} className={paymentMethod === 'card' ? 'text-rose-500' : 'text-neutral-300'}/> Cartão
                     </button>
                   </div>
                   <button onClick={() => setPaymentMethod('local')} className={`p-4 rounded-2xl font-bold flex flex-col items-center gap-2 border-2 transition-all ${paymentMethod === 'local' ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm' : 'border-neutral-100 bg-white text-neutral-500 hover:border-rose-300'}`}>
                      <MapPin size={24} className={paymentMethod === 'local' ? 'text-rose-500' : 'text-neutral-300'}/> Pagar no Salão
                   </button>
                 </div>
              </div>

              <button onClick={handleWhatsAppCheckout} className="w-full mt-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/30 active:scale-[0.98] flex items-center justify-center gap-2">
                 <MessageCircle size={22} /> Confirmar & Pagar
              </button>
              
              <button onClick={() => setStep(3)} className="w-full mt-3 py-2 text-sm font-semibold text-neutral-400 hover:text-rose-500 transition-colors">Voltar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
