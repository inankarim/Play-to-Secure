import React from 'react';
import mascot from '../../assets/mascot.png';

const RememberSection = () => {
  return (
    <aside className="relative overflow-hidden rounded-md p-6 bg-white/60">
      <div className="absolute -top-16 right-0 h-64 w-64 rounded-full bg-gradient-to-b from-[hsl(var(--bg-end))] to-transparent opacity-70" aria-hidden />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <span role="img" aria-label="brain">🧠</span> Remember:
          </h2>
          <p className="mt-3 text-lg">
            Even without injecting JavaScript, a malicious user could hijack your logic using just HTML structure. That's why DOM Clobbering is a silent but serious threat.
          </p>
        </div>
        <div className="justify-self-center">
          <img src={mascot} alt="3D developer character illustration" className="w-48 h-48 object-contain drop-shadow" loading="lazy" />
        </div>
      </div>
    </aside>
  );
};

export default RememberSection;
