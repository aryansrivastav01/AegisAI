"use client";

import { UploadCloud } from "lucide-react";

interface UploadDropzoneProps {
  openFilePicker: () => void;
  loading: boolean;

  dragActive: boolean;

  onDragOver: (
    event: React.DragEvent<HTMLDivElement>
  ) => void;

  onDragLeave: () => void;

  onDrop: (
    event: React.DragEvent<HTMLDivElement>
  ) => void;
}

export default function UploadDropzone({
  openFilePicker,
  loading,
  dragActive,
  onDragOver,
  onDragLeave,
  onDrop,
}: UploadDropzoneProps) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
        dragActive
          ? "border-cyan-400 bg-cyan-500/10"
          : "border-cyan-500/30 bg-slate-900/60"
      }`}
    >
      <UploadCloud
        size={60}
        className="mx-auto text-cyan-400"
      />

      <h2 className="mt-6 text-2xl font-semibold text-white">
        Drag & Drop Security Logs
      </h2>

      <p className="mt-3 text-slate-400">
        Drop a JSON file here or browse from your computer.
      </p>

      <button
        onClick={openFilePicker}
        disabled={loading}
        className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Browse File"}
      </button>

      {dragActive && (
        <p className="mt-6 text-cyan-300 font-medium">
          Release to upload...
        </p>
      )}
    </div>
  );
}