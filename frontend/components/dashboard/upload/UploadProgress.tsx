"use client";

interface UploadProgressProps {
  loading: boolean;
}

export default function UploadProgress({
  loading,
}: UploadProgressProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">

      <h2 className="text-lg font-semibold text-white">
        Upload Progress
      </h2>

      <div className="mt-6">

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">

          <div
            className={`h-full rounded-full bg-cyan-400 transition-all duration-500 ${
              loading
                ? "w-2/3"
                : "w-0"
            }`}
          />

        </div>

        <p className="mt-4 text-sm text-slate-400">
          {loading
            ? "Uploading and analyzing..."
            : "Waiting for upload"}
        </p>

      </div>

    </div>
  );
}