import React from "react";

export default function LoadingOverlay({ fakeProgress }) {
  return (
    <div style={{
      position: 'fixed',
      zIndex: 50,
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(20,24,40,0.96)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backdropFilter: 'blur(2px)'
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '32px',
      }}>
        {/* Sci-fi animation */}
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="48" stroke="#F7E594" strokeWidth="2" fill="none" opacity="0.2" />
            <circle cx="60" cy="60" r="40" stroke="#EB8E5B" strokeWidth="2" fill="none" opacity="0.15" />
            <circle cx="60" cy="60" r="54" stroke="#6B8292" strokeWidth="1" fill="none" opacity="0.12" />
            <g>
              <circle cx="60" cy="60" r="36" stroke="#F7E594" strokeWidth="2" fill="none" strokeDasharray="56 56" strokeDashoffset="0">
                <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="60" r="28" stroke="#EB8E5B" strokeWidth="2" fill="none" strokeDasharray="44 44" strokeDashoffset="22">
                <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="1.6s" repeatCount="indefinite" />
              </circle>
            </g>
            <circle cx="60" cy="60" r="6" fill="#F7E594" opacity="0.7">
              <animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </svg>
          {/* Progress ring (no % in center) */}
          <svg style={{position:'absolute',top:0,left:0}} width="120" height="120">
            <circle cx="60" cy="60" r="52" stroke="#F7E594" strokeWidth="4" fill="none" opacity="0.18" />
            <circle
              cx="60" cy="60" r="52"
              stroke="#EB8E5B"
              strokeWidth="4"
              fill="none"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - fakeProgress / 100)}
              style={{transition:'stroke-dashoffset 0.3s cubic-bezier(.4,2,.6,1)'}}
              opacity="0.7"
            />
          </svg>
        </div>
        {/* Progress bar */}
        <div style={{width: 220, marginTop: 12, marginBottom: 0}}>
          <div style={{
            width: '100%',
            height: 12,
            background: 'rgba(107,130,146,0.18)',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 0 8px #F7E59433',
            border: '1.5px solid #F7E59422',
          }}>
            <div style={{
              width: fakeProgress + '%',
              height: '100%',
              background: 'linear-gradient(90deg, #F7E594 0%, #EB8E5B 100%)',
              boxShadow: '0 0 8px #EB8E5B88',
              borderRadius: 8,
              transition: 'width 0.3s cubic-bezier(.4,2,.6,1)'
            }} />
          </div>
          <div style={{
            color: '#F7E594',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            marginTop: 2,
            textAlign: 'right',
            textShadow: '0 0 6px #F7E59499',
            fontFamily: 'Michroma, IBM Plex Sans Thai, Arial, sans-serif',
          }}>{Math.round(fakeProgress)}%</div>
        </div>
        <div style={{
          color: '#F7E594',
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 2,
          textShadow: '0 0 16px #F7E594cc, 0 0 32px #EB8E5B55',
          fontFamily: 'Michroma, IBM Plex Sans Thai, Arial, sans-serif',
          textAlign: 'center',
          marginBottom: 8,
          marginTop: 8
        }}>
          กำลังวิเคราะห์วิดีโอของคุณ...<br/>
          <span style={{fontSize: 16, color: '#EB8E5B', textShadow: '0 0 8px #EB8E5B88'}}>Processing...</span>
        </div>
        <div style={{color:'#6B8292', fontSize:12, letterSpacing:1, textAlign:'center', opacity:0.7}}>
          <span>AI is scanning for deepfake patterns<br/>Please wait a moment</span>
        </div>
      </div>
    </div>
  );
}
