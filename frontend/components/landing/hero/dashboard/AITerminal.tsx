"use client";

import { useEffect, useState } from "react";
import { Terminal, CheckCircle2 } from "lucide-react";

const commands = [
  "> Upload received...",
  "> Extracting IOCs...",
  "> Querying VirusTotal...",
  "> Querying AbuseIPDB...",
  "> Running Ollama...",
  "> Generating AI Report...",
];

export default function AITerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    if (currentLine >= commands.length) return;

    const text = commands[currentLine];
    let index = 0;

    const interval = setInterval(() => {
      setTyping(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);

        setTimeout(() => {
          setDisplayed((prev) => [...prev, text]);
          setTyping("");
          setCurrentLine((prev) => prev + 1);
        }, 350);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentLine]);

  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-[#050505] p-6">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Terminal
            size={18}
            className="text-cyan-400"
          />

          <h3 className="font-semibold text-white">
            AI Investigation Engine
          </h3>

        </div>

        <div className="flex items-center gap-2">

          <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

          <span className="text-xs text-green-400">

            Running

          </span>

        </div>

      </div>

      {/* Terminal */}

      <div className="space-y-2 font-mono text-sm">

        {displayed.map((line) => (
          <p
            key={line}
            className="text-cyan-400"
          >
            {line}
          </p>
        ))}

        {typing && (
          <p className="text-cyan-400">
            {typing}
            <span className="animate-pulse">▌</span>
          </p>
        )}

        {currentLine >= commands.length && (
          <div className="mt-4 flex items-center gap-2 text-green-400">

            <CheckCircle2 size={18} />

            Investigation Complete

          </div>
        )}

      </div>

    </div>
  );
}