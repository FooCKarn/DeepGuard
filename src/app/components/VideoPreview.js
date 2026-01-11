import React from "react";

export default function VideoPreview({ preview, onRemove }) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-black aspect-video w-80 mb-6 drop-shadow-[0_0_6px_#4A557888]">
      <video src={preview} controls className="w-full h-full object-contain" />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-black/50 hover:bg-[#EB8E5B] text-white p-1 rounded-full transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  );
}
