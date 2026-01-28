import Image from "next/image";

export function MinistriesCard() {
    return (
        <div key={'<KEY>'} className="relative group h-[450px] overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:-translate-y-2 cursor-pointer">
            <Image alt={m.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={m.img} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-white font-display text-3xl mb-4">{m.title}</h3>
                <span className="inline-flex items-center text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Learn More <span className="material-icons text-sm ml-2">arrow_forward</span>
                </span>
            </div>
        </div>
    );
}