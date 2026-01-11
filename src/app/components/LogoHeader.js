import React from "react";

export default function LogoHeader() {
  return (
    <>
      <img src="/logo.png" alt="logo" className="w-20 mb-4 select-none pointer-events-none" draggable="false" />
      <h2 className="text-[#F7E594] text-2xl font-bold mb-6 tracking-wider drop-shadow-[0_0_4px_#F7E59488]">UPLOAD VIDEO</h2>
      <h3 className="text-[#F7E594]/80 text-sm font-light mb-4 text-center drop-shadow-[0_0_3px_#F7E59455]">อัปโหลดวิดีโอของคุณ แล้วให้เราช่วยตรวจสอบ</h3>
    </>
  );
}
