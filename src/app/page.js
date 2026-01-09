"use client"; // บอก Next.js ว่าหน้านี้รันบน Browser (เพราะมี state)

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // ฟังก์ชันเมื่อมีการเลือกไฟล์
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      // สร้าง URL สำหรับ Preview วิดีโอ
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ฟังก์ชันส่งไฟล์ไป Backend
  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // ยิงไปที่ API ของเรา (Port 8000)
      const response = await axios.post("https://fuuji-deepguard-api.hf.space/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการตรวจสอบ กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Header */}
        <div className="p-6 bg-gray-800 border-b border-gray-700 text-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            DeepGuard AI
          </h1>
          <p className="text-gray-400 text-sm mt-1">ระบบตรวจสอบวิดีโอ Deepfake</p>
        </div>

        {/* Upload Area */}
        <div className="p-6 space-y-4">
          {!preview ? (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleFileChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p>คลิกเพื่ออัปโหลดวิดีโอ</p>
                <p className="text-xs mt-2 text-gray-500">รองรับ .mp4, .avi, .mov</p>
              </div>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
              <video src={preview} controls className="w-full h-full object-contain" />
              <button 
                onClick={() => {setFile(null); setPreview(null); setResult(null);}}
                className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          )}

          {/* Action Button */}
          {file && !result && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                loading 
                  ? "bg-gray-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  กำลังวิเคราะห์...
                </span>
              ) : "เริ่มตรวจสอบ"}
            </button>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
        </div>

        {/* Result Area */}
        {result && (
          <div className={`p-6 border-t ${result.result === "FAKE" ? "bg-red-900/20 border-red-500/30" : "bg-green-900/20 border-green-500/30"}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">ผลการวิเคราะห์:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                result.result === "FAKE" ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}>
                {result.result === "FAKE" ? "⚠️ FAKE (ปลอม)" : "✅ REAL (จริง)"}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">ความมั่นใจ:</span>
                <span className="font-mono text-white">{result.confidence}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${result.result === "FAKE" ? "bg-red-500" : "bg-green-500"}`} 
                  style={{ width: result.confidence }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>วิเคราะห์ไป {result.frames_analyzed} เฟรม</span>
                <span>ไฟล์: {result.filename}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}