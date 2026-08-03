"use client";

export default function FloatingParticles() {

  return (

    <>

      {Array.from({ length: 25 }).map((_, i) => (

        <div
          key={i}
          className="absolute rounded-full bg-cyan-400/20 blur-sm animate-pulse"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />

      ))}

    </>

  );

}