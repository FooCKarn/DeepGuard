import React from "react";

export default function ResultCard({ result, onNext, onBack }) {
  return (
    <div className={`p-6 border-t mt-4 w-full ${result.result === "FAKE" ? "bg-red-900/20 border-red-500/30" : "bg-green-900/20 border-green-500/30"}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">ผลการวิเคราะห์:</span>
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
          result.result === "FAKE" ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}>
          {result.result === "FAKE" ? "⚠️ FAKE (ปลอม)" : "✅ REAL (จริง)"}
        </span>
      </div>
      <div className="space-y-2 mb-4">
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
      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={onNext}
          className="px-4 py-1.5 rounded-lg font-semibold text-[#23243a] bg-gradient-to-r from-[#F7E594] to-[#EB8E5B] hover:from-[#EB8E5B] hover:to-[#F7E594] shadow-md transition-all tracking-wide drop-shadow-[0_0_4px_#EB8E5B66] text-base"
          style={{ fontFamily: 'Michroma, IBM Plex Sans Thai, Arial, sans-serif', letterSpacing: 1, fontSize: 13 }}
        >
          วิดีโอถัดไป
        </button>
        <button
          onClick={onBack}
          className="px-4 py-1.5 rounded-lg font-semibold text-[#F7E594] border border-[#F7E594] bg-transparent hover:bg-[#23243a] shadow-sm transition-all tracking-wide text-base"
          style={{ fontFamily: 'Michroma, IBM Plex Sans Thai, Arial, sans-serif', letterSpacing: 1, fontSize: 13 }}
        >
          กลับ
        </button>
      </div>
    </div>
  );
}
