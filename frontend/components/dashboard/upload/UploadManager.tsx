"use client";

import { useRef, useState } from "react";

import {
  uploadSecurityLog,
  type UploadResponse,
} from "@/services/upload";

interface UploadManagerProps {
  children: (
    props: {
      openFilePicker: () => void;
      loading: boolean;
      analysis: UploadResponse | null;

      dragActive: boolean;

      onDragOver: (
        event: React.DragEvent<HTMLDivElement>
      ) => void;

      onDragLeave: () => void;

      onDrop: (
        event: React.DragEvent<HTMLDivElement>
      ) => void;
    }
  ) => React.ReactNode;
}

export default function UploadManager({
  children,
}: UploadManagerProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [loading, setLoading] =
    useState(false);

  const [analysis, setAnalysis] =
    useState<UploadResponse | null>(null);

  const [dragActive, setDragActive] =
    useState(false);

  async function handleFile(file: File) {
    try {
      setLoading(true);

      const result =
        await uploadSecurityLog(file);

      setAnalysis(result);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  }

  function onDragOver(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    setDragActive(true);
  }

  function onDragLeave() {
    setDragActive(false);
  }

  function onDrop(
    event: React.DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();

    setDragActive(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      void handleFile(file);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".json"
        onChange={(event) => {
          const file =
            event.target.files?.[0];

          if (file) {
            void handleFile(file);
          }
        }}
      />

      {children({
        openFilePicker: () =>
          inputRef.current?.click(),
        loading,
        analysis,
        dragActive,
        onDragOver,
        onDragLeave,
        onDrop,
      })}
    </>
  );
}