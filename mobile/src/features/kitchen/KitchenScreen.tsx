import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  Modal as RNModal,
} from 'react-native';
import {
  ShieldCheck,
  Info,
  Play,
  Video,
  ExternalLink,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  FileText,
  Sparkles,
  X,
  Building,
  Check
} from 'lucide-react-native';
import { useAppContext } from '../../app/context';
import {
  theme,
  Text,
  Button,
  PageLayout,
  Card,
  InfoCard,
  Badge,
} from '../../design-system';
import { BottomTabNav } from '../../core/components/BottomTabNav';

interface StationDetails {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  status: 'Active' | 'Cleaning' | 'Scheduled';
  image: string;
  description: string;
  highlights: string[];
}

export default function KitchenScreen() {
  const { go, setToast, back } = useAppContext();

  // Modals State
  const [selectedStation, setSelectedStation] = useState<StationDetails | null>(null);
  const [showDocModal, setShowDocModal] = useState<boolean>(false);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  // 8 Gallery stations data
  const stations: StationDetails[] = [
    {
      id: '01',
      num: '01',
      title: 'Vegetable Prep',
      subtitle: 'Ozone Sanitized Washing',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500',
      description: 'Farm-fresh vegetables are triple washed using eco-friendly micro-bubble ozone gas to eliminate 100% of pesticide residue and soil particles.',
      highlights: [
        '3-stage micro-bubble ozone sterilization',
        'Zero chemical wash or detergents used',
        'Temp-controlled prep room (18°C)',
        'Precision stainless steel dicing'
      ]
    },
    {
      id: '02',
      num: '02',
      title: 'Stone Ground',
      subtitle: 'Cold-Ground Whole Spices',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
      description: 'Whole organic spices are ground in slow stone mortars at low speeds to prevent heat generation and preserve volatile aromatic oils.',
      highlights: [
        'Low RPM stone grinding retains 98.4% essential oils',
        'Sourced whole directly from organic spice farms',
        'Zero artificial colorings or fillers'
      ]
    },
    {
      id: '03',
      num: '03',
      title: 'Slow Cooking',
      subtitle: 'Vedic Brass & Clay Simmer',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',
      description: 'Food is prepared in tin-lined brass and natural clay cauldrons over low heat to preserve nutrient density and deep natural flavor.',
      highlights: [
        'Vedic slow simmer retains heat-sensitive vitamins',
        'Natural earthenware & tin-lined heavy brass cookware',
        'Simmered exclusively with A2 Bilona Cow Ghee'
      ]
    },
    {
      id: '04',
      num: '04',
      title: 'Zero Contamination',
      subtitle: 'Induction Steel Packaging',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500',
      description: 'Hot meals are packed directly into food-grade 304 stainless steel dabbas inside a sterile HEPA-filtered cleanroom.',
      highlights: [
        '100% 304 Surgical Grade Stainless Steel Dabbas',
        'ISO Class 7 sterile cleanroom packaging line',
        'Zero single-use plastic contact at any stage'
      ]
    },
    {
      id: '05',
      num: '05',
      title: 'Grain Milling',
      subtitle: 'Laser-Sorted Rice & Dals',
      status: 'Cleaning',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
      description: 'Single-polished rice grains and organic pulses undergo multi-stage optical laser sorting and destoning prior to soaking.',
      highlights: [
        'Optical laser sorting removes damaged grains',
        'Single-polished unbleached heritage rice',
        'Soaked in RO purified water for optimal digestion'
      ]
    },
    {
      id: '06',
      num: '06',
      title: 'Steam Wash',
      subtitle: '120°C Thermal Sanitization',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500',
      description: 'Every returned steel dabba undergoes high-pressure 120°C pressurized steam jet cleaning and UV-C sterilization before reuse.',
      highlights: [
        '120°C high-pressure steam jet sterilization',
        'UV-C light final sanitization tunnel',
        'Dermatologically tested food-safe bio detergents'
      ]
    },
    {
      id: '07',
      num: '07',
      title: 'Quality Testing',
      subtitle: 'Batch Lab Sampling',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500',
      description: 'Every cooked batch undergoes real-time temperature, pH, moisture, and sensory evaluation before release for packaging.',
      highlights: [
        'Digital temperature cold-chain log',
        'Organoleptic taste & texture compliance test',
        'Batch retention sample archived for 48 hours'
      ]
    },
    {
      id: '08',
      num: '08',
      title: 'Cold Storage',
      subtitle: '4°C Temperature Controlled',
      status: 'Scheduled',
      image: 'https://images.unsplash.com/photo-1584473457406-6df376d19629?w=500',
      description: 'Raw ingredients and dairy are stored in dual-redundant cold storage units maintained strictly at 4°C with continuous IoT logging.',
      highlights: [
        'IoT sensor-based continuous 24/7 logging',
        'Dual backup refrigeration power generators',
        'Strict FIFO inventory rotation protocol'
      ]
    }
  ];

  const handleOpenLiveStream = () => {
    const liveUrl = 'https://live.koikoidabba.com';
    Linking.openURL(liveUrl).catch(() => {
      setToast('Opening live kitchen stream in browser...');
    });
    setToast('🔴 Connecting to real-time Kitchen Live feed...');
  };

  return (
    <PageLayout style={{ paddingHorizontal: 0 }} background="organic" backgroundVariant="minimal">
      
      {/* TOP HEADER */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={back}
          style={styles.headerIconButton}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={18} color="#1F1F1F" />
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <ShieldCheck size={18} color="#4B5D3A" />
          <Text style={styles.headerTitle}>Kitchen Transparency</Text>
        </View>

        <TouchableOpacity
          onPress={() => setToast('KOI KOI Kitchen • Certified ISO 22000 & FSSAI A+ Grade')}
          style={styles.headerIconButton}
          activeOpacity={0.7}
          accessibilityLabel="Kitchen Info"
        >
          <Info size={18} color="#4B5D3A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* 1. HERO SECTION & LIVE KITCHEN BUTTON */}
        <View style={styles.sectionContainer}>
          <Card style={styles.heroCardLight}>
            
            {/* Top Badge & Time Row */}
            <View style={styles.heroTopRow}>
              <View style={styles.livePillLight}>
                <View style={styles.redDot} />
                <Text style={styles.livePillTextLight}>LIVE KITCHEN</Text>
              </View>
              <Text style={styles.heroTimeText}>5:00 AM – 2:00 PM IST</Text>
            </View>

            {/* Title & Status */}
            <Text style={styles.heroTitleDark}>Watch Today's Kitchen</Text>
            <View style={styles.heroStatusRow}>
              <Text style={styles.heroWatchingText}>👁 1,248 watching</Text>
              <Text style={styles.heroDotSep}>•</Text>
              <Text style={styles.heroStatusLabel}>Status: <Text style={{ color: '#4B5D3A', fontWeight: '700' }}>Preparing Lunch</Text></Text>
            </View>

            {/* Video Preview Frame */}
            <View style={styles.heroVideoFrame}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=700' }}
                style={styles.heroVideoImage}
              />
              <View style={styles.heroVideoOverlay}>
                <View style={styles.camsBadge}>
                  <Video size={12} color="#FFFFFF" />
                  <Text style={styles.camsBadgeText}>3 CAMERAS ONLINE</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={handleOpenLiveStream}
                  style={styles.heroPlayCircle}
                >
                  <Play size={26} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 3 }} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Large Primary Action Button */}
            <TouchableOpacity
              onPress={handleOpenLiveStream}
              activeOpacity={0.88}
              style={styles.heroPrimaryButton}
            >
              <Text style={styles.heroPrimaryButtonText}>Open Live Kitchen</Text>
              <ExternalLink size={18} color="#FFFFFF" strokeWidth={2.5} style={{ marginLeft: 8 }} />
            </TouchableOpacity>

          </Card>
        </View>

        {/* 2. QUICK METRICS BAR */}
        <View style={styles.sectionContainer}>
          <InfoCard style={styles.metricsCard}>
            <View style={styles.metricsRow}>
              
              <View style={styles.metricCol}>
                <Text style={styles.metricNum}>3</Text>
                <Text style={styles.metricLabel}>Live Cameras</Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricCol}>
                <Text style={styles.metricNum}>428</Text>
                <Text style={styles.metricLabel}>Today's Meals</Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricCol}>
                <Text style={styles.metricNum}>26</Text>
                <Text style={styles.metricLabel}>Kitchen Staff</Text>
              </View>

              <View style={styles.metricDivider} />

              <View style={styles.metricCol}>
                <Text style={styles.metricNum}>99%</Text>
                <Text style={styles.metricLabel}>Quality Score</Text>
              </View>

            </View>
          </InfoCard>
        </View>

        {/* 3. TODAY'S KITCHEN STATUS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Today's Kitchen Status</Text>

          <Card style={styles.statusCard}>
            <View style={styles.statusHeaderRow}>
              <View style={styles.statusChip}>
                <View style={styles.greenDotSmall} />
                <Text style={styles.statusChipText}>Preparing Lunch</Text>
              </View>
              <Text style={styles.statusProgressPercent}>78% Complete</Text>
            </View>

            {/* Progress Track Bar */}
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressTrackFill, { width: '78%' }]} />
            </View>

            {/* Timeline Steps */}
            <View style={styles.timelineRow}>
              
              {/* Step 1 */}
              <View style={styles.timelineStep}>
                <View style={[styles.stepDot, styles.stepDotActive]} />
                <Text style={styles.stepTitle}>Preparing</Text>
                <Text style={styles.stepTime}>11:30 AM</Text>
              </View>

              <View style={styles.timelineConnector} />

              {/* Step 2 */}
              <View style={styles.timelineStep}>
                <View style={styles.stepDot} />
                <Text style={styles.stepTitle}>Packaging</Text>
                <Text style={styles.stepTime}>12:10 PM</Text>
              </View>

              <View style={styles.timelineConnector} />

              {/* Step 3 */}
              <View style={styles.timelineStep}>
                <View style={styles.stepDot} />
                <Text style={styles.stepTitle}>Dispatch</Text>
                <Text style={styles.stepTime}>12:45 PM</Text>
              </View>

            </View>
          </Card>
        </View>

        {/* 4. TODAY'S MENU (CURRENTLY BEING PREPARED) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Today's Menu</Text>
              <Text style={styles.sectionSubtext}>Currently Being Prepared</Text>
            </View>
            <View style={styles.estTimeChip}>
              <Clock size={12} color="#1F1F1F" />
              <Text style={styles.estTimeText}>Est. 12:15 PM</Text>
            </View>
          </View>

          <Card style={styles.menuCard}>
            <View style={styles.menu2ColRow}>
              
              {/* Left Column: Veg Meals */}
              <View style={styles.menuCol}>
                <View style={styles.menuColHeader}>
                  <View style={[styles.menuDot, { backgroundColor: '#4B5D3A' }]} />
                  <Text style={styles.menuColTitle}>Veg Meals</Text>
                </View>

                <View style={styles.menuColList}>
                  <Text style={styles.menuBulletItem}>• Steamed Rice</Text>
                  <Text style={styles.menuBulletItem}>• Tur Dal Tadka</Text>
                  <Text style={styles.menuBulletItem}>• Veg Poriyal</Text>
                  <Text style={styles.menuBulletItem}>• Curd</Text>
                  <Text style={styles.menuBulletItem}>• Salad</Text>
                </View>
              </View>

              {/* Vertical Separator */}
              <View style={styles.menuColDivider} />

              {/* Right Column: Non-Veg Meals */}
              <View style={styles.menuCol}>
                <View style={styles.menuColHeader}>
                  <View style={[styles.menuDot, { backgroundColor: '#C96B3C' }]} />
                  <Text style={styles.menuColTitle}>Non-Veg Meals</Text>
                </View>

                <View style={styles.menuColList}>
                  <Text style={styles.menuBulletItem}>• Steamed Rice</Text>
                  <Text style={styles.menuBulletItem}>• Country Chicken Curry</Text>
                  <Text style={styles.menuBulletItem}>• Egg Roast</Text>
                  <Text style={styles.menuBulletItem}>• Curd</Text>
                  <Text style={styles.menuBulletItem}>• Salad</Text>
                </View>
              </View>

            </View>
          </Card>
        </View>

        {/* 5. TODAY'S INGREDIENTS SOURCING */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Today's Ingredients</Text>
              <Text style={styles.sectionSubtext}>100% Pure, Organic & Farm-Sourced</Text>
            </View>
            <Sparkles size={20} color="#C96B3C" />
          </View>

          <View style={{ gap: 10, marginTop: 10 }}>

            {/* Grains & Dals */}
            <InfoCard style={styles.ingCard}>
              <Text style={styles.ingCategoryLabel}>GRAINS & DALS</Text>
              <View style={styles.ingChipsRow}>
                <View style={styles.ingChip}>
                  <Text style={styles.ingChipText}>🌾 Single Polished Rice</Text>
                </View>
                <View style={styles.ingChip}>
                  <Text style={styles.ingChipText}>🥣 Organic Tur Dal</Text>
                </View>
              </View>
            </InfoCard>

            {/* Spices & Herbs */}
            <InfoCard style={styles.ingCard}>
              <Text style={styles.ingCategoryLabel}>SPICES & HERBS</Text>
              <View style={styles.ingChipsRow}>
                <View style={styles.ingChip}>
                  <Text style={styles.ingChipText}>🌶 Stone Ground Spices</Text>
                </View>
                <View style={styles.ingChip}>
                  <Text style={styles.ingChipText}>🌿 Fresh Curry Leaves</Text>
                </View>
              </View>
            </InfoCard>

            {/* Cooking Medium */}
            <InfoCard style={styles.ingCard}>
              <Text style={styles.ingCategoryLabel}>COOKING MEDIUM</Text>
              <View style={styles.ingChipsRow}>
                <View style={styles.ingChip}>
                  <Text style={styles.ingChipText}>🛢 Cold Pressed Groundnut Oil</Text>
                </View>
              </View>
            </InfoCard>

            {/* Safety Guarantee */}
            <InfoCard style={styles.ingCard}>
              <Text style={styles.ingCategoryLabel}>SAFETY GUARANTEE</Text>
              <View style={styles.ingChipsRow}>
                <View style={styles.ingChip}>
                  <Text style={styles.ingChipText}>🚫 No Artificial Colors</Text>
                </View>
                <View style={styles.ingChip}>
                  <Text style={styles.ingChipText}>🛡 No Preservatives</Text>
                </View>
              </View>
            </InfoCard>

          </View>
        </View>

        {/* 6. VEDIC COOKING DOCUMENTARY */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Vedic Cooking Documentary</Text>
          
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowDocModal(true)}
            style={{ marginTop: 10 }}
          >
            <Card style={{ padding: 0, overflow: 'hidden', borderRadius: 20 }}>
              <View style={styles.docBannerContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600' }}
                  style={styles.docBannerImage}
                />
                <View style={styles.docBannerOverlay}>
                  
                  {/* Top Right Duration */}
                  <View style={styles.docDurationChip}>
                    <Clock size={11} color="#FFFFFF" />
                    <Text style={styles.docDurationText}>3 MIN</Text>
                  </View>

                  {/* Play Button Circle */}
                  <View style={styles.docBigPlayCircle}>
                    <Play size={28} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 3 }} />
                  </View>

                  {/* Bottom Text Details */}
                  <View style={styles.docBottomInfo}>
                    <Text style={styles.docCategoryText}>KITCHEN VIDEO</Text>
                    <Text style={styles.docBannerTitle}>Vedic Cooking Documentary</Text>
                    <Text style={styles.docBannerSub}>Video Tour • Sourcing • Spices • Packing</Text>
                  </View>

                </View>
              </View>

              {/* Extra Chips Row under video */}
              <View style={styles.docFooterRow}>
                <View style={styles.docFooterChip}>
                  <Clock size={12} color="#4B5D3A" />
                  <Text style={styles.docFooterChipText}>3 MIN</Text>
                </View>
                <View style={styles.docFooterChip}>
                  <Video size={12} color="#4B5D3A" />
                  <Text style={styles.docFooterChipText}>1080p HD</Text>
                </View>
                <View style={styles.docFooterChip}>
                  <FileText size={12} color="#4B5D3A" />
                  <Text style={styles.docFooterChipText}>English / Subs</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        {/* 7. KITCHEN IMAGE GALLERY (8 SMART STATIONS) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>Kitchen Image Gallery</Text>
              <Text style={styles.sectionSubtext}>Physical Cooking Spaces (8 Smart Stations)</Text>
            </View>
            <Badge label="8 STATIONS" variant="primary" style={{ backgroundColor: '#4B5D3A' }} />
          </View>
          <Text style={styles.galleryGuideText}>
            Tap any station below to launch full-screen educational walkthroughs and safety specs.
          </Text>

          <View style={styles.galleryGrid8}>
            {stations.map((st) => (
              <TouchableOpacity
                key={st.id}
                activeOpacity={0.88}
                style={styles.stationCardWrapper}
                onPress={() => setSelectedStation(st)}
              >
                <View style={styles.stationCard}>
                  <Image source={{ uri: st.image }} style={styles.stationImage} />
                  <View style={styles.stationOverlay} />

                  {/* Top Badges */}
                  <View style={styles.stationTopRow}>
                    <View style={styles.stationNumBadge}>
                      <Text style={styles.stationNumText}>{st.num}</Text>
                    </View>
                    <View style={[
                      styles.stationStatusBadge,
                      st.status === 'Active' ? { backgroundColor: '#4B5D3A' } :
                      st.status === 'Cleaning' ? { backgroundColor: '#C96B3C' } : { backgroundColor: '#3182CE' }
                    ]}>
                      <Text style={styles.stationStatusText}>{st.status}</Text>
                    </View>
                  </View>

                  {/* Bottom Title Box */}
                  <View style={styles.stationBottomBox}>
                    <Text style={styles.stationSubtitleText} numberOfLines={1}>{st.subtitle}</Text>
                    <Text style={styles.stationTitleText} numberOfLines={1}>{st.title}</Text>
                  </View>

                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 8. MEET OUR CHEFS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Meet Our Chefs</Text>

          <View style={{ gap: 14, marginTop: 10 }}>

            {/* Chef 1 */}
            <Card style={styles.chefFullCard}>
              <View style={styles.chefTopRow}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300' }}
                  style={styles.chefPortrait}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.chefNameText}>Amrita Reddy</Text>
                    <View style={styles.expBadge}>
                      <Text style={styles.expBadgeText}>12+ Years EXP</Text>
                    </View>
                  </View>
                  <Text style={styles.chefRoleText}>Head Chef & Flavor Lead</Text>
                  <Text style={styles.chefSubText}>Traditional Andhra & Deccani Heritage Cuisine</Text>
                </View>
              </View>

              {/* Stats Box */}
              <View style={styles.chefStatsBox}>
                <View style={styles.chefStatCol}>
                  <Text style={styles.chefStatLabel}>EXPERIENCE</Text>
                  <Text style={styles.chefStatValue}>12 Years</Text>
                </View>
                <View style={styles.chefStatSep} />
                <View style={styles.chefStatCol}>
                  <Text style={styles.chefStatLabel}>SPECIALITY</Text>
                  <Text style={styles.chefStatValue}>Heritage Cuisine</Text>
                </View>
              </View>

              <Text style={styles.chefQuoteText}>
                "Believes slow, gentle heating preserves natural grain sweetness without artificial taste enhancers."
              </Text>
            </Card>

            {/* Chef 2 */}
            <Card style={styles.chefFullCard}>
              <View style={styles.chefTopRow}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300' }}
                  style={styles.chefPortrait}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.chefNameText}>Harish Rao</Text>
                    <View style={styles.expBadge}>
                      <Text style={styles.expBadgeText}>8+ Years EXP</Text>
                    </View>
                  </View>
                  <Text style={styles.chefRoleText}>Vedic Sourcing & Prep Lead</Text>
                  <Text style={styles.chefSubText}>Macrobiotic & Grain Sprouting Specialist</Text>
                </View>
              </View>

              {/* Stats Box */}
              <View style={styles.chefStatsBox}>
                <View style={styles.chefStatCol}>
                  <Text style={styles.chefStatLabel}>EXPERIENCE</Text>
                  <Text style={styles.chefStatValue}>8 Years</Text>
                </View>
                <View style={styles.chefStatSep} />
                <View style={styles.chefStatCol}>
                  <Text style={styles.chefStatLabel}>SPECIALITY</Text>
                  <Text style={styles.chefStatValue}>Vedic Sourcing</Text>
                </View>
              </View>

              <Text style={styles.chefQuoteText}>
                "Sources single-polished rice and cold-pressed oils from trusted organic farms."
              </Text>
            </Card>

          </View>
        </View>

        {/* 9. STRICT KITCHEN STANDARDS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Strict Kitchen Standards</Text>
            <Badge label="A+ GRADE" variant="primary" style={{ backgroundColor: '#4B5D3A' }} />
          </View>

          <Card style={styles.standardsCardFull}>
            <View style={styles.auditList}>

              {/* Audit Item 1 */}
              <View style={styles.auditRow}>
                <View style={[styles.auditCheckIconWrap, { backgroundColor: '#4B5D3A' }]}>
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.auditTitleText}>Air Filtration Units Checked</Text>
                  <Text style={styles.auditTimeText}>Audit: Today, 11:30 AM</Text>
                </View>
                <View style={styles.auditBadgeGreen}>
                  <Text style={styles.auditBadgeGreenText}>Checked Today</Text>
                </View>
              </View>

              <View style={styles.auditDivider} />

              {/* Audit Item 2 */}
              <View style={styles.auditRow}>
                <View style={[styles.auditCheckIconWrap, { backgroundColor: '#4B5D3A' }]}>
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.auditTitleText}>Floor & Counters Ozone Sanitization</Text>
                  <Text style={styles.auditTimeText}>Audit: Today, 11:00 AM</Text>
                </View>
                <View style={styles.auditBadgeGreen}>
                  <Text style={styles.auditBadgeGreenText}>Checked Today</Text>
                </View>
              </View>

              <View style={styles.auditDivider} />

              {/* Audit Item 3 */}
              <View style={styles.auditRow}>
                <View style={[styles.auditCheckIconWrap, { backgroundColor: '#C96B3C' }]}>
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.auditTitleText}>Staff Temp & Wellness Audit</Text>
                  <Text style={styles.auditTimeText}>Audit: Next shift, 02:00 PM</Text>
                </View>
                <View style={styles.auditBadgeOrange}>
                  <Text style={styles.auditBadgeOrangeText}>Due Soon</Text>
                </View>
              </View>

              <View style={styles.auditDivider} />

              {/* Audit Item 4 */}
              <View style={styles.auditRow}>
                <View style={[styles.auditCheckIconWrap, { backgroundColor: '#3182CE' }]}>
                  <Check size={14} color="#FFFFFF" strokeWidth={3} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.auditTitleText}>Stainless-Steel Steam Cleaning</Text>
                  <Text style={styles.auditTimeText}>Audit: Tonight, 11:00 PM</Text>
                </View>
                <View style={styles.auditBadgeBlue}>
                  <Text style={styles.auditBadgeBlueText}>Scheduled</Text>
                </View>
              </View>

            </View>
          </Card>
        </View>

        {/* 10. KNOW YOUR KITCHEN (INFRASTRUCTURE & SCALE) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Know Your Kitchen</Text>

          <Card style={styles.infraCard}>
            <View style={styles.infraHeaderRow}>
              <Building size={18} color="#4B5D3A" />
              <Text style={styles.infraTitle}>Infrastructure & Scale</Text>
            </View>

            <View style={styles.infraGrid}>
              
              <View style={styles.infraItem}>
                <Text style={styles.infraVal}>2026</Text>
                <Text style={styles.infraSub}>Established</Text>
              </View>

              <View style={styles.infraItem}>
                <Text style={styles.infraVal}>4,500 sq.ft</Text>
                <Text style={styles.infraSub}>Kitchen Area</Text>
              </View>

              <View style={styles.infraItem}>
                <Text style={styles.infraVal}>1,000+</Text>
                <Text style={styles.infraSub}>Meals Daily</Text>
              </View>

              <View style={styles.infraItem}>
                <Text style={styles.infraVal}>100%</Text>
                <Text style={styles.infraSub}>Steel Containers</Text>
              </View>

              <View style={styles.infraItem}>
                <Text style={styles.infraVal}>0%</Text>
                <Text style={styles.infraSub}>Plastic Usage</Text>
              </View>

            </View>
          </Card>
        </View>

        {/* 11. OFFICIAL GOVERNMENT LICENSE */}
        <View style={styles.sectionContainer}>
          <Card style={styles.licenseFullCard}>
            <View style={styles.licenseHeaderRow}>
              <View style={styles.licenseGoldIconWrap}>
                <Award size={22} color="#D9B65A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.licenseLabelSmall}>OFFICIAL GOVERNMENT LICENSE</Text>
                <Text style={styles.licenseHeaderTitle}>FSSAI Validated Certificate</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Check size={12} color="#1F1F1F" strokeWidth={3} />
                <Text style={styles.verifiedBadgeText}>VERIFIED</Text>
              </View>
            </View>

            {/* License Box */}
            <View style={styles.licenseCodeBox}>
              <Text style={styles.licenseCodeLabel}>LICENSE NO.</Text>
              <Text style={styles.licenseCodeValue}>10024010004561</Text>
            </View>

            <Text style={styles.licenseValidityText}>
              Valid Until: <Text style={{ fontWeight: '700', color: '#1F1F1F' }}>Dec 2027</Text> • Under Food Safety Standard Act
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.pdfButton}
              onPress={() => setShowCertModal(true)}
            >
              <FileText size={16} color="#1F1F1F" />
              <Text style={styles.pdfButtonText}>View Certificate PDF →</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* 12. OPEN INVITATION TOUR (BOOK KITCHEN VISIT) */}
        <View style={styles.sectionContainer}>
          <Card style={styles.darkTourCard}>
            
            {/* Header badges */}
            <View style={styles.tourHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Calendar size={14} color="#D9B65A" />
                <Text style={styles.tourTagText}>OPEN INVITATION TOUR</Text>
              </View>
              <View style={styles.freeBadge}>
                <Text style={styles.freeBadgeText}>FREE</Text>
              </View>
            </View>

            <Text style={styles.tourTitleText}>Book a Kitchen Visit</Text>
            <Text style={styles.tourDescText}>
              Nothing is hidden. Walk through our preparation stations, verify our stone-milling, and taste raw ingredients with our chefs.
            </Text>

            {/* Tags row */}
            <View style={styles.tourChipsRow}>
              <View style={styles.tourChip}>
                <Clock size={11} color="#FCFAF6" />
                <Text style={styles.tourChipText}>15 Minutes</Text>
              </View>
              <View style={styles.tourChip}>
                <Award size={11} color="#FCFAF6" />
                <Text style={styles.tourChipText}>Free</Text>
              </View>
              <View style={styles.tourChip}>
                <Calendar size={11} color="#FCFAF6" />
                <Text style={styles.tourChipText}>Mon – Sat</Text>
              </View>
            </View>

            <Button
              title="Request Tour Booking →"
              variant="primary"
              size="medium"
              style={styles.tourBookingBtn}
              textStyle={styles.tourBookingBtnText}
              onPress={() => go('tour_booking')}
            />
          </Card>
        </View>

      </ScrollView>

      {/* STATION WALKTHROUGH MODAL */}
      <RNModal
        visible={!!selectedStation}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedStation(null)}
      >
        <View style={styles.modalBackdrop}>
          {selectedStation && (
            <View style={styles.modalContentCard}>
              
              <View style={styles.modalImageWrap}>
                <Image source={{ uri: selectedStation.image }} style={styles.modalHeaderImage} />
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setSelectedStation(null)}
                >
                  <X size={18} color="#1F1F1F" />
                </TouchableOpacity>
                <View style={styles.modalImageBadge}>
                  <Text style={styles.modalImageBadgeText}>STATION {selectedStation.num} • {selectedStation.status.toUpperCase()}</Text>
                </View>
              </View>

              <View style={styles.modalBody}>
                <Text style={styles.modalTitle}>{selectedStation.title}</Text>
                <Text style={styles.modalSubtitle}>{selectedStation.subtitle}</Text>
                <Text style={styles.modalDesc}>{selectedStation.description}</Text>

                <Text style={styles.modalHighlightsTitle}>STATION PROTOCOLS & STANDARDS</Text>
                <View style={styles.modalHighlightsList}>
                  {selectedStation.highlights.map((h, i) => (
                    <View key={i} style={styles.modalHighlightRow}>
                      <CheckCircle2 size={15} color="#4B5D3A" style={{ marginTop: 2 }} />
                      <Text style={styles.modalHighlightText}>{h}</Text>
                    </View>
                  ))}
                </View>

                <Button
                  title="Close Walkthrough"
                  variant="primary"
                  size="medium"
                  style={{ marginTop: 20 }}
                  onPress={() => setSelectedStation(null)}
                />
              </View>

            </View>
          )}
        </View>
      </RNModal>

      {/* DOCUMENTARY VIDEO MODAL */}
      <RNModal
        visible={showDocModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDocModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContentCard, { maxWidth: 360 }]}>
            
            <View style={[styles.modalImageWrap, { height: 180 }]}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600' }}
                style={styles.modalHeaderImage}
              />
              <View style={styles.docModalPlayOverlay}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setToast('▶ Playing 3-min Vedic Cooking Documentary...')}
                  style={styles.docModalPlayBtn}
                >
                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: 3 }} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowDocModal(false)}
              >
                <X size={18} color="#1F1F1F" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.docTagTextModal}>DOCUMENTARY TOUR • 3 MIN</Text>
              <Text style={styles.modalTitle}>Vedic Cooking Documentary</Text>
              <Text style={styles.modalDesc}>
                Take a deep-dive behind the scenes into our organic grain sourcing, stone spice milling, and zero-contamination sterile dabba packaging process.
              </Text>

              <Button
                title="Play Documentary Video"
                variant="primary"
                size="medium"
                iconLeft={<Play size={16} color="#FFFFFF" fill="#FFFFFF" />}
                style={{ marginTop: 16 }}
                onPress={() => {
                  setToast('▶ Playing Vedic Cooking Documentary...');
                  setShowDocModal(false);
                }}
              />
            </View>

          </View>
        </View>
      </RNModal>

      {/* FSSAI CERTIFICATE PDF MODAL */}
      <RNModal
        visible={showCertModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCertModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContentCard, { maxWidth: 360 }]}>
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Award size={48} color="#D9B65A" style={{ marginBottom: 12 }} />
              <Text style={styles.modalTitle}>FSSAI Validated Certificate</Text>
              <Text style={styles.licenseCodeValue}>10024010004561</Text>
              <Text style={{ textAlign: 'center', color: '#8A857B', marginTop: 10, fontSize: 12, lineHeight: 17 }}>
                Official Government Food Safety Certificate issued under Food Safety Standard Act 2006. Valid for commercial food processing and distribution until December 2027.
              </Text>
              <Button
                title="Close Certificate"
                variant="outline"
                size="medium"
                style={{ marginTop: 20, width: '100%' }}
                onPress={() => setShowCertModal(false)}
              />
            </View>
          </View>
        </View>
      </RNModal>

      {/* BOTTOM NAVIGATION TAB BAR */}
      <BottomTabNav active="kitchen" />

    </PageLayout>
  );
}

const styles = StyleSheet.create({
  // Top Header Bar
  headerBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#E8E2D8',
    backgroundColor: '#FCFAF6',
  },
  headerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 17,
    color: '#1F1F1F',
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  headerIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F4EFE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },

  // Main Scroll
  scrollContent: {
    paddingBottom: 110,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  sectionHeading: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 19,
    color: '#1F1F1F',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionSubtext: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    marginTop: 2,
  },

  // 1. Hero Card
  heroCardLight: {
    backgroundColor: '#F4EFE6',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  livePillLight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE3E3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E53E3E',
  },
  livePillTextLight: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#C53030',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTimeText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 11,
    color: '#8A857B',
  },
  heroTitleDark: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  heroStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    marginBottom: 14,
  },
  heroWatchingText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#C96B3C',
    fontWeight: '600',
  },
  heroDotSep: {
    color: '#8A857B',
  },
  heroStatusLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
  },
  heroVideoFrame: {
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  heroVideoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroVideoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camsBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  camsBadgeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroPlayCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#C96B3C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  heroPrimaryButton: {
    backgroundColor: '#C96B3C',
    height: 50,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heroPrimaryButtonText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // 2. Metrics Card
  metricsCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metricCol: {
    alignItems: 'center',
  },
  metricNum: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 20,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  metricLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E8E2D8',
  },

  // 3. Today's Kitchen Status
  statusCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  statusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  greenDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4B5D3A',
  },
  statusChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  statusProgressPercent: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  progressTrackBg: {
    height: 6,
    backgroundColor: '#E8E2D8',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressTrackFill: {
    height: '100%',
    backgroundColor: '#4B5D3A',
    borderRadius: 3,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E8E2D8',
    marginBottom: 6,
  },
  stepDotActive: {
    backgroundColor: '#4B5D3A',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  stepTime: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 9.5,
    color: '#8A857B',
    marginTop: 2,
  },
  timelineConnector: {
    flex: 0.5,
    height: 1,
    backgroundColor: '#E8E2D8',
    marginTop: -16,
  },

  // 4. Today's Menu
  estTimeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4EFE6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  estTimeText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 10.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  menuCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  menu2ColRow: {
    flexDirection: 'row',
  },
  menuCol: {
    flex: 1,
  },
  menuColHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  menuDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  menuColTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  menuColDivider: {
    width: 1,
    backgroundColor: '#E8E2D8',
    marginHorizontal: 12,
  },
  menuColList: {
    gap: 8,
  },
  menuBulletItem: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#1F1F1F',
    lineHeight: 18,
  },

  // 5. Ingredients
  ingCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  ingCategoryLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#8A857B',
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  ingChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingChip: {
    backgroundColor: '#FCFAF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  ingChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '600',
  },

  // 6. Documentary Banner
  docBannerContainer: {
    height: 200,
    position: 'relative',
    backgroundColor: '#1F1F1F',
  },
  docBannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  docBannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  docDurationChip: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  docDurationText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  docBigPlayCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#C96B3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  docBottomInfo: {
    position: 'absolute',
    bottom: 12,
    left: 14,
  },
  docCategoryText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 8.5,
    color: '#D9B65A',
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  docBannerTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  docBannerSub: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  docFooterRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: '#F4EFE6',
  },
  docFooterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCFAF6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  docFooterChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#1F1F1F',
    fontWeight: '600',
  },

  // 7. Gallery Grid 8
  galleryGuideText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#8A857B',
    marginTop: 4,
    marginBottom: 12,
    lineHeight: 16,
  },
  galleryGrid8: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  stationCardWrapper: {
    width: '48%',
  },
  stationCard: {
    height: 150,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F4EFE6',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  stationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  stationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  stationTopRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stationNumBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stationNumText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 9.5,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  stationStatusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stationStatusText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  stationBottomBox: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  stationSubtitleText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#D9B65A',
    fontWeight: '600',
  },
  stationTitleText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 1,
  },

  // 8. Chef Cards
  chefFullCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  chefTopRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  chefPortrait: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FCFAF6',
    borderWidth: 2,
    borderColor: '#E8E2D8',
  },
  chefNameText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  expBadge: {
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  expBadgeText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  chefRoleText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#C96B3C',
    fontWeight: '700',
    marginTop: 1,
  },
  chefSubText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#8A857B',
    marginTop: 1,
  },
  chefStatsBox: {
    backgroundColor: '#FCFAF6',
    borderRadius: 12,
    flexDirection: 'row',
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  chefStatCol: {
    flex: 1,
    alignItems: 'center',
  },
  chefStatLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 8.5,
    color: '#8A857B',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  chefStatValue: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '700',
    marginTop: 2,
  },
  chefStatSep: {
    width: 1,
    height: 20,
    backgroundColor: '#E8E2D8',
    alignSelf: 'center',
  },
  chefQuoteText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    fontStyle: 'italic',
    lineHeight: 16,
  },

  // 9. Strict Standards
  standardsCardFull: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  auditList: {
    gap: 12,
  },
  auditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  auditCheckIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  auditTitleText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  auditTimeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10.5,
    color: '#8A857B',
    marginTop: 1,
  },
  auditBadgeGreen: {
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  auditBadgeGreenText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#137333',
    fontWeight: '700',
  },
  auditBadgeOrange: {
    backgroundColor: '#FCE8E6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  auditBadgeOrangeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#C5221F',
    fontWeight: '700',
  },
  auditBadgeBlue: {
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  auditBadgeBlueText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#1A73E8',
    fontWeight: '700',
  },
  auditDivider: {
    height: 1,
    backgroundColor: '#E8E2D8',
  },

  // 10. Infrastructure
  infraCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  infraHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  infraTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  infraGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infraItem: {
    backgroundColor: '#FCFAF6',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    minWidth: '29%',
    flex: 1,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  infraVal: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  infraSub: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#8A857B',
    marginTop: 2,
  },

  // 11. License Full Card
  licenseFullCard: {
    backgroundColor: '#F4EFE6',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  licenseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  licenseGoldIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FCFAF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9B65A',
  },
  licenseLabelSmall: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9,
    color: '#8A857B',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  licenseHeaderTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 15,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9B65A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  verifiedBadgeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#1F1F1F',
    fontWeight: '800',
  },
  licenseCodeBox: {
    backgroundColor: '#FCFAF6',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E8E2D8',
    marginBottom: 10,
  },
  licenseCodeLabel: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 8.5,
    color: '#8A857B',
    fontWeight: '800',
  },
  licenseCodeValue: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: '800',
    marginTop: 2,
  },
  licenseValidityText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11.5,
    color: '#8A857B',
    marginBottom: 12,
  },
  pdfButton: {
    backgroundColor: '#FCFAF6',
    height: 40,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  pdfButtonText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#1F1F1F',
    fontWeight: '700',
  },

  // 12. Dark Tour Card
  darkTourCard: {
    backgroundColor: '#141E12',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#4B5D3A',
  },
  tourHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tourTagText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#D9B65A',
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  freeBadge: {
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  freeBadgeText: {
    fontFamily: theme.typography.monoFamily,
    fontSize: 9,
    color: '#FCFAF6',
    fontWeight: '800',
  },
  tourTitleText: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#FCFAF6',
    fontWeight: '700',
    marginBottom: 6,
  },
  tourDescText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: 'rgba(252,250,246,0.75)',
    lineHeight: 17,
    marginBottom: 14,
  },
  tourChipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tourChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  tourChipText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 11,
    color: '#FCFAF6',
    fontWeight: '600',
  },
  tourBookingBtn: {
    backgroundColor: '#FCFAF6',
    height: 44,
    borderRadius: 14,
  },
  tourBookingBtnText: {
    color: '#1F1F1F',
    fontSize: 13,
    fontWeight: '700',
  },

  // Modals
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContentCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FCFAF6',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E2D8',
  },
  modalImageWrap: {
    height: 190,
    width: '100%',
    position: 'relative',
  },
  modalHeaderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(252, 250, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#4B5D3A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalImageBadgeText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#FCFAF6',
    fontWeight: '800',
  },
  modalBody: {
    padding: 20,
  },
  modalTitle: {
    fontFamily: theme.typography.headingFamily,
    fontSize: 18,
    color: '#1F1F1F',
    fontWeight: '700',
  },
  modalSubtitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12.5,
    color: '#C96B3C',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 8,
  },
  modalDesc: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 13,
    color: '#8A857B',
    lineHeight: 18,
    marginBottom: 16,
  },
  modalHighlightsTitle: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 10,
    color: '#C96B3C',
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  modalHighlightsList: {
    gap: 8,
  },
  modalHighlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  modalHighlightText: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 12,
    color: '#1F1F1F',
    flex: 1,
    lineHeight: 16,
  },
  docTagTextModal: {
    fontFamily: theme.typography.bodyFamily,
    fontSize: 9.5,
    color: '#C96B3C',
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  docModalPlayOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docModalPlayBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#C96B3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
