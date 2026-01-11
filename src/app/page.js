"use client"; // บอก Next.js ว่าหน้านี้รันบน Browser (เพราะมี state)



import { useRef, useState } from "react";
import axios from "axios";
import LoadingOverlay from "./components/LoadingOverlay";
import UploadArea from "./components/UploadArea";
import VideoPreview from "./components/VideoPreview";
import ResultCard from "./components/ResultCard";
import LogoHeader from "./components/LogoHeader";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [fakeProgress, setFakeProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // ฟังก์ชันเมื่อมีการเลือกไฟล์
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setResult(null);
      setError(null);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };
  const handleDragOver = (e) => e.preventDefault();

  // ฟังก์ชันส่งไฟล์ไป Backend
  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setFakeProgress(0);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      // เริ่ม fake progress แบบ smooth
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        if (progress >= 98) {
          progress = 98;
          clearInterval(interval);
        }
        setFakeProgress(progress);
      }, 125);

      const response = await axios.post("https://fuuji-deepguard-api.hf.space/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      clearInterval(interval);
      setFakeProgress(100);
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
      }, 400);
    } catch (err) {
      setFakeProgress(100);
      setTimeout(() => {
        setLoading(false);
        setError("เกิดข้อผิดพลาดในการตรวจสอบ กรุณาลองใหม่");
      }, 400);
      console.error(err);
    }
  };

  return (
    <>
      {/* Overlay Loading Sci-fi */}
      {loading && <LoadingOverlay fakeProgress={fakeProgress} />}
      <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#181a2b] to-[#23243a] p-0 m-0 overflow-hidden">
        <div
          className="rounded-2xl shadow-2xl flex flex-col items-center responsive-card bg-gradient-to-br from-[rgba(74,85,120,0.92)] to-[rgba(60,50,100,0.92)] drop-shadow-lg"
          style={{
            boxShadow: '0 4px 18px 0 #4A557899, 0 0 12px 0 #F7E59422',
            backdropFilter: 'blur(1px)',
            margin: '0 auto',
          }}
        >
        <LogoHeader />
        {!preview ? (
          <UploadArea
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
          />
        ) : (
          <VideoPreview
            preview={preview}
            onRemove={() => { setFile(null); setPreview(null); setResult(null); }}
          />
        )}
        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className={`w-40 py-2.5 rounded-lg font-semibold text-[#4A5578] mt-2 mb-2 transition-all shadow-lg text-lg tracking-wide drop-shadow-[0_0_4px_#EB8E5B66] ${
            (!file || loading)
              ? "bg-[#F7E59488] cursor-not-allowed"
              : "bg-gradient-to-r from-[#F7E594] to-[#EB8E5B] hover:from-[#EB8E5B] hover:to-[#F7E594]"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#4A5578]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              กำลังวิเคราะห์...
            </span>
          ) : "SUBMIT"}
        </button>
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center w-full mt-2">
            {error}
          </div>
        )}
        {/* ผลลัพธ์เดิม */}
        {result && (
          <ResultCard
            result={result}
            onNext={() => {
              setFile(null); setPreview(null); setResult(null); setError(null);
              setTimeout(() => { fileInputRef.current?.click(); }, 100);
            }}
            onBack={() => {
              setFile(null); setPreview(null); setResult(null); setError(null);
            }}
          />
        )}
      </div>
    </div>
    </>
  );
}
