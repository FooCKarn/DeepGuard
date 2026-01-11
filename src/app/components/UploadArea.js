import React from "react";

export default function UploadArea({ fileInputRef, handleFileChange, handleDrop, handleDragOver }) {
  return (
    <div
      className="bg-[#6B8292]/70 border-2 border-dashed border-[#F7E594] rounded-xl w-80 h-36 flex flex-col items-center justify-center mb-6 cursor-pointer hover:border-[#F7E594] transition drop-shadow-[0_0_5px_#6B829288]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="text-4xl text-[#F7E594] mb-2 drop-shadow-[0_0_4px_#F7E59488]">&#8682;</div>
      <p className="text-white drop-shadow-[0_0_3px_#F7E59433]">Choose a video or drag it here</p>
    </div>
  );
}
