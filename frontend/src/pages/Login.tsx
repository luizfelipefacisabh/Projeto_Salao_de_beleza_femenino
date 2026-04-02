import React from 'react';
import { Phone } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-[100px] opacity-40" />
      
      <div className="w-full max-w-sm relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-neutral-800 mb-3">Maison <span className="font-bold text-rose-500">Privé</span></h1>
          <p className="text-neutral-500 text-sm font-medium">Informe seu WhatsApp para acessar seus agendamentos.</p>
        </div>

        <div className="bg-white/90 backdrop-blur-2xl border border-white p-8 rounded-[2rem] shadow-xl shadow-rose-100/50">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700 ml-1">WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" size={18} strokeWidth={2.5} />
                <input 
                  type="tel" 
                  placeholder="(11) 90000-0000" 
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl py-3.5 pl-12 pr-4 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400 transition-all font-semibold"
                />
              </div>
            </div>

            <button type="button" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 active:scale-[0.98]">
              Continuar
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <a href="/admin" className="text-xs font-bold text-neutral-400 hover:text-rose-500 transition-colors">
              Página de Parceiras / Donas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
