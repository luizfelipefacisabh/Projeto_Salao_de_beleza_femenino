import React from 'react';
import { Camera, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Portfolio() {
  const images = [
    { id: 1, url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', category: 'Balayage', likes: 124 },
    { id: 2, url: 'https://images.unsplash.com/photo-1516975080661-46bbc173d100?auto=format&fit=crop&q=80&w=800', category: 'Manicure', likes: 89 },
    { id: 3, url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800', category: 'Maquiagem', likes: 210 },
    { id: 4, url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800', category: 'Corte', likes: 156 },
    { id: 5, url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800', category: 'Skincare', likes: 92 },
    { id: 6, url: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=800', category: 'Spa', likes: 315 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-rose-200/40 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link to="/book" className="inline-flex items-center gap-2 text-rose-500 font-semibold text-sm hover:text-rose-600 transition-colors mb-6 bg-rose-100/50 px-4 py-2 rounded-full">
              <ArrowLeft size={16} /> Voltar ao Agendamento
            </Link>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-800">
              Nosso <span className="font-bold text-rose-500">Portfólio</span>
            </h1>
            <p className="text-neutral-500 font-medium mt-3 text-lg">Trabalhos recentes feitos por nossos especialistas de beleza.</p>
          </div>
          
          <div className="flex gap-3">
            {['Todos', 'Cabelo', 'Unhas', 'Maquiagem'].map((filter, i) => (
              <button key={filter} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${i === 0 ? 'bg-rose-500 text-white' : 'bg-white text-neutral-600 hover:text-rose-500 border border-neutral-200'}`}>
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img) => (
            <div key={img.id} className="break-inside-avoid relative group rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-rose-500/20 transition-all duration-500 cursor-pointer border border-neutral-100">
              <img src={img.url} alt={img.category} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-lg bg-rose-500/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
                    {img.category}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-rose-500 transition-colors shadow-lg">
                      <Share2 size={18} />
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-rose-500 font-bold transition-transform shadow-lg hover:scale-105">
                      <Heart size={16} className="fill-current" /> {img.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-50 hover:border-rose-300 font-bold rounded-full transition-all shadow-sm flex items-center gap-3 mx-auto">
            <Camera size={20} /> Carregar mais trabalhos
          </button>
        </div>
      </div>
    </div>
  );
}
