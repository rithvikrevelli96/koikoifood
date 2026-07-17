import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect, Ellipse, Defs, LinearGradient as SvgLinearGradient, Stop, Line, Text as SvgText } from 'react-native-svg';

export function PremiumSteelDabbaSvg() {
  return (
    <Svg width={90} height={90} viewBox="0 0 100 100">
      <Defs>
        <SvgLinearGradient id="steel" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#D9D9D9" />
          <Stop offset="20%" stopColor="#ECECEC" />
          <Stop offset="40%" stopColor="#FFFFFF" />
          <Stop offset="60%" stopColor="#EAEAEA" />
          <Stop offset="80%" stopColor="#CCCCCC" />
          <Stop offset="100%" stopColor="#B3B3B3" />
        </SvgLinearGradient>
        
        <SvgLinearGradient id="steelDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#999999" />
          <Stop offset="50%" stopColor="#E0E0E0" />
          <Stop offset="100%" stopColor="#777777" />
        </SvgLinearGradient>

        <SvgLinearGradient id="accentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FF852C" />
          <Stop offset="100%" stopColor="#E96A2E" />
        </SvgLinearGradient>

        <SvgLinearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
          <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </SvgLinearGradient>
      </Defs>

      <Ellipse cx={50} cy={88} rx={32} ry={6} fill="url(#shadowGrad)" />

      <Path
        d="M 32 30 C 32 12, 68 12, 68 30"
        fill="none"
        stroke="url(#steelDark)"
        strokeWidth={5}
        strokeLinecap="round"
      />
      <Path
        d="M 32 30 C 32 12, 68 12, 68 30"
        fill="none"
        stroke="url(#steel)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      <Rect x={40} y={12} width={20} height={5} rx={2.5} fill="#444444" />

      <Rect x={26} y={32} width={48} height={15} rx={3} fill="url(#steel)" stroke="#B3B3B3" strokeWidth={0.5} />
      <Line x1={26} y1={47} x2={74} y2={47} stroke="url(#steelDark)" strokeWidth={1} />

      <Rect x={26} y={48} width={48} height={16} rx={1} fill="url(#steel)" stroke="#B3B3B3" strokeWidth={0.5} />
      <Line x1={26} y1={64} x2={74} y2={64} stroke="url(#steelDark)" strokeWidth={1} />

      <Rect x={26} y={65} width={48} height={17} rx={3} fill="url(#steel)" stroke="#B3B3B3" strokeWidth={0.5} />

      <Line x1={27} y1={39} x2={73} y2={39} stroke="#FFFFFF" strokeWidth={0.8} opacity={0.6} />
      <Line x1={27} y1={40} x2={73} y2={40} stroke="#CCCCCC" strokeWidth={0.8} opacity={0.8} />

      <Line x1={27} y1={56} x2={73} y2={56} stroke="#FFFFFF" strokeWidth={0.8} opacity={0.6} />
      <Line x1={27} y1={57} x2={73} y2={57} stroke="#CCCCCC" strokeWidth={0.8} opacity={0.8} />

      <Line x1={27} y1={73} x2={73} y2={73} stroke="#FFFFFF" strokeWidth={0.8} opacity={0.6} />
      <Line x1={27} y1={74} x2={73} y2={74} stroke="#CCCCCC" strokeWidth={0.8} opacity={0.8} />

      <Rect x={22} y={30} width={4} height={52} rx={1.5} fill="url(#steelDark)" />
      <Rect x={22} y={30} width={2} height={52} rx={1} fill="url(#steel)" opacity={0.8} />

      <Rect x={74} y={30} width={4} height={52} rx={1.5} fill="url(#steelDark)" />
      <Rect x={74} y={30} width={2} height={52} rx={1} fill="url(#steel)" opacity={0.8} />

      <Rect x={20} y={49} width={3} height={14} rx={1} fill="url(#accentGrad)" />
      <Rect x={77} y={49} width={3} height={14} rx={1} fill="url(#accentGrad)" />

      <Rect x={41} y={53} width={18} height={6} rx={1} fill="url(#accentGrad)" opacity={0.95} />
      <SvgText x={50} y={57.5} fontSize={3.2} fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing={0.2}>
        KOI KOI
      </SvgText>
    </Svg>
  );
}

export function LiveKitchenThumbnailSvg() {
  return (
    <Svg width={70} height={45} viewBox="0 0 70 45">
      <Defs>
        <SvgLinearGradient id="kitchenBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#2A1A12" />
          <Stop offset="100%" stopColor="#1E140F" />
        </SvgLinearGradient>
      </Defs>
      <Rect width={70} height={45} rx={8} fill="url(#kitchenBg)" />
      <Line x1={5} y1={35} x2={65} y2={35} stroke="#5C4033" strokeWidth={2} strokeLinecap="round" />
      <Rect x={20} y={20} width={16} height={12} rx={2} fill="#777777" />
      <Path d="M18 20h20M24 20v-2c0-.5.5-1 1-1h6c.5 0 1 .5 1 1v2" stroke="#777777" strokeWidth={1} />
      <Path d="M25 14c0-2 2-2 2-4M31 14c0-2 2-2 2-4" stroke="#FFF4EC" strokeWidth={1} strokeLinecap="round" opacity={0.6} />
      <Circle cx={35} cy={22.5} r={8} fill="rgba(233, 106, 46, 0.9)" />
      <Path d="M33 19.5 L39 22.5 L33 25.5 Z" fill="#FFFFFF" />
    </Svg>
  );
}

export function StyledAvatarSvg({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={12} fill={color} />
      <Circle cx={12} cy={8} r={3} fill="#FFE2D1" />
      <Path d="M6 17c0-2 2-3 6-3s6 1 6 3v2H6v-2z" fill="#FFE2D1" />
    </Svg>
  );
}

export function OverlappingAvatars() {
  const colors = ['#FF852C', '#3BA76A', '#F59E0B', '#6366F1'];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {colors.map((color, idx) => (
        <View
          key={idx}
          style={{
            marginLeft: idx === 0 ? 0 : -8,
            zIndex: 4 - idx,
            borderWidth: 1.5,
            borderColor: '#FFFFFF',
            borderRadius: 12,
            overflow: 'hidden'
          }}
        >
          <StyledAvatarSvg color={color} />
        </View>
      ))}
    </View>
  );
}

export function LeafBranchSvg() {
  return (
    <Svg width={120} height={120} viewBox="0 0 100 100" style={{ position: 'absolute', right: -10, top: 20, opacity: 0.12 }}>
      <Path d="M90 10 Q60 40 10 90" fill="none" stroke="#3BA76A" strokeWidth={1.5} />
      <Path d="M75 25 Q70 15 80 15 Q85 25 75 25" fill="#3BA76A" />
      <Path d="M65 35 Q55 30 60 20 Q70 30 65 35" fill="#3BA76A" />
      <Path d="M55 45 Q45 40 50 30 Q60 40 55 45" fill="#3BA76A" />
      <Path d="M45 55 Q35 50 40 40 Q50 50 45 55" fill="#3BA76A" />
      <Path d="M35 65 Q25 60 30 50 Q40 60 35 65" fill="#3BA76A" />
      
      <Path d="M78 28 Q88 33 83 43 Q73 38 78 28" fill="#3BA76A" />
      <Path d="M68 38 Q78 43 73 53 Q63 48 68 38" fill="#3BA76A" />
      <Path d="M58 48 Q68 53 63 63 Q53 58 58 48" fill="#3BA76A" />
      <Path d="M48 58 Q58 63 53 73 Q43 68 48 58" fill="#3BA76A" />
    </Svg>
  );
}

export function SplashLogoSvg() {
  return (
    <Svg width={90} height={90} viewBox="0 0 100 100">
      <Path
        d="M35 30 C35 15, 65 15, 65 30"
        fill="none"
        stroke="#E96A2E"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <Rect x={25} y={30} width={50} height={48} rx={14} fill="#E96A2E" />
      <Path
        d="M25 45 L75 45"
        stroke="#FFF8F2"
        strokeWidth={3}
      />
      <Path
        d="M50 63 C50 63, 40 55, 40 48.5 C40 43.5, 44 41, 47.5 41 C49.5 41, 50 43, 50 43 C50 43, 50.5 41, 52.5 41 C56 41, 60 43.5, 60 48.5 C60 55, 50 63, 50 63 Z"
        fill="#FFF8F2"
      />
    </Svg>
  );
}

export function BoyIllustrationSvg() {
  return (
    <Svg width={250} height={250} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={41} fill="#FFF4EA" opacity={0.9} />
      <Circle cx={50} cy={50} r={45} fill="none" stroke="#FD5F20" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.6} />
      <Circle cx={50} cy={50} r={43} fill="none" stroke="#312019" strokeWidth={0.3} opacity={0.3} />

      <Rect x={45} y={66} width={4} height={12} rx={1} fill="#5C4535" stroke="#312019" strokeWidth={1.2} />
      <Rect x={51} y={66} width={4} height={12} rx={1} fill="#5C4535" stroke="#312019" strokeWidth={1.2} />
      
      <Path
        d="M 38 48 C 38 48, 50 44, 62 48 L 60 66 C 60 68, 40 68, 40 66 Z"
        fill="#FD6E20"
        stroke="#312019"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      <Rect x={47} y={43} width={6} height={6} fill="#E8C39E" stroke="#312019" strokeWidth={1.2} />
      <Circle cx={50} cy={35} r={10} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
      
      <Path
        d="M 39 33 C 39 23, 61 23, 61 33 C 58 29, 42 29, 39 33 Z"
        fill="#423026"
        stroke="#312019"
        strokeWidth={1.5}
      />

      <Circle cx={47} cy={34} r={1} fill="#312019" />
      <Circle cx={53} cy={34} r={1} fill="#312019" />
      <Path d="M 48 38 C 49 39.5, 51 39.5, 52 38" stroke="#312019" strokeWidth={1.2} strokeLinecap="round" fill="none" />

      <Path d="M 40 48 L 30 48 L 30 54" fill="none" stroke="#E8C39E" strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M 40 48 L 30 48 L 30 54" fill="none" stroke="#312019" strokeWidth={1.2} strokeLinecap="round" />
      
      <Rect x={24} y={54} width={12} height={10} rx={2} fill="#B0B0B0" stroke="#312019" strokeWidth={1.2} />
      <Path d="M 24 59 L 36 59" stroke="#312019" strokeWidth={1} />
      <Path d="M 26 54 C 26 48, 34 48, 34 54" fill="none" stroke="#312019" strokeWidth={1} />
      <Path d="M 28 46 Q 29 44, 28 42" fill="none" stroke="#FD5F20" strokeWidth={0.8} />
      <Path d="M 32 46 Q 33 44, 32 42" fill="none" stroke="#FD5F20" strokeWidth={0.8} />

      <Path d="M 60 48 L 70 48 L 70 54" fill="none" stroke="#E8C39E" strokeWidth={4.5} strokeLinecap="round" />
      <Path d="M 60 48 L 70 48 L 70 54" fill="none" stroke="#312019" strokeWidth={1.2} strokeLinecap="round" />
      
      <Path d="M 65 54 L 75 54 L 73 66 L 67 66 Z" fill="#E2A25B" stroke="#312019" strokeWidth={1.2} strokeLinejoin="round" />
      <Path d="M 67 54 C 67 50, 73 50, 73 54" fill="none" stroke="#312019" strokeWidth={1} />
    </Svg>
  );
}

export function DabbasIllustrationSvg() {
  return (
    <Svg width={250} height={250} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={41} fill="#FFF4EA" opacity={0.9} />
      <Circle cx={50} cy={50} r={45} fill="none" stroke="#FD5F20" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.6} />
      <Circle cx={50} cy={50} r={43} fill="none" stroke="#312019" strokeWidth={0.3} opacity={0.3} />

      <Path d="M 44 20 Q 46 16, 44 12" fill="none" stroke="#FD6E20" strokeWidth={1} strokeLinecap="round" />
      <Path d="M 50 18 Q 52 14, 50 10" fill="none" stroke="#FD6E20" strokeWidth={1} strokeLinecap="round" />
      <Path d="M 56 20 Q 58 16, 56 12" fill="none" stroke="#FD6E20" strokeWidth={1} strokeLinecap="round" />

      <Rect x={26} y={64} width={48} height={14} rx={3} fill="#BDC3C7" stroke="#312019" strokeWidth={1.5} />
      <Path d="M 26 67 L 74 67" stroke="#312019" strokeWidth={1} />
      
      <Rect x={28} y={49} width={44} height={13} rx={3} fill="#DCDCDC" stroke="#312019" strokeWidth={1.5} />
      <Path d="M 28 52 L 72 52" stroke="#312019" strokeWidth={1} />

      <Rect x={30} y={34} width={40} height={13} rx={3} fill="#BDC3C7" stroke="#312019" strokeWidth={1.5} />
      <Path d="M 30 37 L 70 37" stroke="#312019" strokeWidth={1} />
      <Ellipse cx={50} cy={40} rx={4} ry={2} fill="#FD5F20" />

      <Path
        d="M 50 20 L 50 34"
        fill="none"
        stroke="#312019"
        strokeWidth={1.5}
      />
      <Path
        d="M 28 34 L 28 78 C 28 80, 72 80, 72 78 L 72 34"
        fill="none"
        stroke="#312019"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M 40 34 C 40 25, 60 25, 60 34"
        fill="none"
        stroke="#312019"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function FamilyIllustrationSvg() {
  return (
    <Svg width={250} height={250} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={41} fill="#FFF4EA" opacity={0.9} />
      <Circle cx={50} cy={50} r={45} fill="none" stroke="#FD5F20" strokeWidth={0.5} strokeDasharray="3 3" opacity={0.6} />
      <Circle cx={50} cy={50} r={43} fill="none" stroke="#312019" strokeWidth={0.3} opacity={0.3} />

      <Circle cx={34} cy={38} r={8} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
      <Path d="M 26 34 C 26 28, 42 28, 42 34 Z" fill="#423026" stroke="#312019" strokeWidth={1.5} />
      <Circle cx={31} cy={37} r={0.8} fill="#312019" />
      <Circle cx={37} cy={37} r={0.8} fill="#312019" />
      <Path d="M 32 41 C 33 42, 35 42, 36 41" stroke="#312019" strokeWidth={1} strokeLinecap="round" fill="none" />
      <Path d="M 22 56 C 22 47, 46 47, 46 56 Z" fill="#3A75C4" stroke="#312019" strokeWidth={1.5} />

      <Circle cx={66} cy={38} r={8} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
      <Path d="M 58 34 C 58 24, 74 24, 74 34 Z" fill="#5C4535" stroke="#312019" strokeWidth={1.5} />
      <Circle cx={63} cy={37} r={0.8} fill="#312019" />
      <Circle cx={69} cy={37} r={0.8} fill="#312019" />
      <Path d="M 64 41 C 65 42, 67 42, 68 41" stroke="#312019" strokeWidth={1} strokeLinecap="round" fill="none" />
      <Path d="M 54 56 C 54 47, 78 47, 78 56 Z" fill="#E65893" stroke="#312019" strokeWidth={1.5} />

      <Circle cx={50} cy={44} r={6} fill="#E8C39E" stroke="#312019" strokeWidth={1.5} />
      <Path d="M 44 41 C 44 36, 56 36, 56 41 Z" fill="#FD852C" stroke="#312019" strokeWidth={1.5} />
      <Circle cx={48} cy={43} r={0.7} fill="#312019" />
      <Circle cx={52} cy={43} r={0.7} fill="#312019" />
      <Path d="M 49 46.5 C 49.5 47, 50.5 47, 51 46.5" stroke="#312019" strokeWidth={1} strokeLinecap="round" fill="none" />
      <Path d="M 41 58 C 41 52, 59 52, 59 58 Z" fill="#52B36D" stroke="#312019" strokeWidth={1.5} />

      <Rect x={12} y={56} width={76} height={6} rx={2} fill="#E2A25B" stroke="#312019" strokeWidth={1.5} />
      <Rect x={20} y={62} width={5} height={14} fill="#C68E5B" stroke="#312019" strokeWidth={1.2} />
      <Rect x={75} y={62} width={5} height={14} fill="#C68E5B" stroke="#312019" strokeWidth={1.2} />

      <Path d="M 44 56 C 44 54, 56 54, 56 56 Z" fill="#FFFFFF" stroke="#312019" strokeWidth={1.2} />
    </Svg>
  );
}

export function GoogleLogoSvg() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.08-.26-.14-.54-.14-.83z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export function AppleLogoSvg() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="#000000">
      <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.21.12.28.12.9 0 2.03-.65 2.53-1.45" />
    </Svg>
  );
}
