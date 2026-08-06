"use client";

import UploadManager from "./UploadManager";
import UploadDropzone from "./UploadDropzone";
import UploadProgress from "./UploadProgress";
import UploadStatus from "./UploadStatus";
import RecentUploads from "./RecentUploads";

export default function UploadWorkspace() {
  return (
    <UploadManager>
      {({
        openFilePicker,
        loading,
        analysis,
        dragActive,
        onDragOver,
        onDragLeave,
        onDrop,
      }) => (
        <div className="space-y-8">

          <div>

            <h1 className="text-3xl font-bold text-white">
              Upload Security Logs
            </h1>

            <p className="mt-2 text-slate-400">
              Upload JSON logs for IOC extraction,
              threat intelligence analysis and
              AI-powered investigation.
            </p>

          </div>

          <UploadDropzone
            openFilePicker={openFilePicker}
            loading={loading}
            dragActive={dragActive}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          />

          <div className="grid gap-6 lg:grid-cols-2">

            <UploadProgress
              loading={loading}
            />

            <UploadStatus
              analysis={analysis}
            />

          </div>

          <RecentUploads />

        </div>
      )}
    </UploadManager>
  );
}