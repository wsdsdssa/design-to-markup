import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useRef, useState } from 'react';

import heroDevice from '../../assets/Ipad.png';
import tabImage1 from '../../assets/Image_tab1.png';
import tabImage2 from '../../assets/Image_tab2.png';
import tabImage3 from '../../assets/Image_tab3.png';
import slideImage from '../../assets/slide-image.png';
import videoPoster from '../../assets/video_poster.png';
import videoPlayButton from '../../assets/video_play_button.png';
import styles from './HomePage.module.scss';

const NAV_LINKS = [
  { label: 'Service menu1', target: 'intro' },
  { label: 'Service menu2', target: 'media' },
  { label: 'Service menu3', target: 'tabs' },
  { label: 'Service menu4', target: 'cards' },
] as const;

const TAB_CONTENT = [
  {
    label: '탭 영역1',
    image: tabImage1,
  },
  {
    label: '탭 영역2',
    image: tabImage2,
  },
  {
    label: '탭 영역3',
    image: tabImage3,
  }
];

const CARD_ITEMS = [
  {
    title: '카드 타이틀 01',
    description: '테스트용 카드입니다. 동일한 스타일과 간격으로 제작된 예시 문장입니다.'
  },
  {
    title: '카드 타이틀 02',
    description: '이미지와 텍스트가 조화를 이루도록 구성된 섹션으로 디자인 시안을 반영합니다.'
  },
  {
    title: '카드 타이틀 03',
    description: '반복되는 카드 역시 동일한 규격을 유지하여 리스트 구조를 확인할 수 있습니다.'
  }
];

export const HomePage: React.FC = () => {
  const sectionRefs = {
    intro: useRef<HTMLElement | null>(null),
    media: useRef<HTMLElement | null>(null),
    tabs: useRef<HTMLElement | null>(null),
    cards: useRef<HTMLElement | null>(null),
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeTab = useMemo(() => TAB_CONTENT[activeTabIndex], [activeTabIndex]);

  const handleNavigate = (target: keyof typeof sectionRefs) => {
    const ref = sectionRefs[target].current;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTab = (index: number) => {
    setActiveTabIndex(index);
  };

  const handleVideoToggle = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused) {
      setIsVideoPlaying(true);
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (error) {
        setIsVideoPlaying(false);
        console.error('비디오 재생 실패', error);
      }
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className={styles.root}>
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src='/images/logo.png' alt='브랜드 로고' width={120} height={28} priority />
            <nav>
              <ul className={styles.navList}>
                {NAV_LINKS.map(({ label, target }) => (
                  <li key={label} className={styles.navItem}>
                    <button
                      type='button'
                      className={styles.navButton}
                      onClick={() => handleNavigate(target)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={styles.actions}>
            <button className={styles.loginLink} type='button'>
              한국어
            </button>
            <button className={styles.ctaButton} type='button'>
              Login
            </button>
          </div>
        </header>
        <div className={styles.content}>
          <section ref={sectionRefs.intro} id='intro-section' className={styles.hero}>
            <span className={styles.badge} role='presentation'>Syntekabio</span>
            <h1 className={styles.heroTitle}>이 페이지는 테스트 중입니다</h1>
            <p className={styles.heroDescription}>
            면접 과제용으로 제작된 샘플 페이지입니다.
            </p>
            <div className={styles.figurePrimary}>
              <Image src={heroDevice} alt='테스트용 태블릿 이미지' priority />
            </div>
          </section>

          <section ref={sectionRefs.media} id='media-section' className={styles.mediaSection}>
            <h2 className={styles.sectionTitle}>테스트용 영상 단락</h2>
            <p className={styles.sectionSubtitle}>면접 과제용으로 제작된 샘플 영상 단락입니다.<br />사용자가 해당 단락이 화면에 보일 경우 영상이 재생되게 구현하세요.</p>
            <div className={styles.videoWrapper}>
              <button
                type='button'
                className={clsx(styles.videoOverlay, isVideoPlaying && styles.videoOverlayHidden)}
                onClick={handleVideoToggle}
                aria-label={isVideoPlaying ? '영상 일시정지' : '영상 재생'}
              >
                <div className={styles.videoOverlayInner}>
                  <Image src={videoPlayButton} alt='video play button' className={styles.videoOverlayIcon} aria-hidden />
                </div>
              </button>
              <video
                ref={videoRef}
                className={styles.video}
                poster={videoPoster.src}
                preload='metadata'
                playsInline
                onClick={handleVideoToggle}
                onEnded={() => setIsVideoPlaying(false)}
                onPause={() => setIsVideoPlaying(false)}
                onPlay={() => setIsVideoPlaying(true)}
              >
                <source src='/video/main.mp4' type='video/mp4' />
                동영상 재생을 지원하지 않는 브라우저입니다.
              </video>
            </div>
          </section>

          <section ref={sectionRefs.tabs} id='tabs-section' className={styles.tabsSection}>
            <h2 className={styles.sectionTitle}>테스트용 탭 영역 단락입니다</h2>
            <p className={styles.sectionSubtitle}>면접 과제용으로 제작된 샘플 탭 단락입니다.<br />인터렉션, 코드 구조등을 자유롭게 구현하세요.</p>
            <div className={styles.tabList} role='tablist' aria-label='테스트용 탭 메뉴'>
              {TAB_CONTENT.map((tab, index) => (
                <button
                  key={tab.label}
                  type='button'
                  role='tab'
                  aria-selected={activeTabIndex === index}
                  className={clsx(styles.tabButton, activeTabIndex === index && styles.tabButtonActive)}
                  onClick={() => handleSelectTab(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className={styles.progressBar}>
              <span
                className={styles.progressFill}
                style={{ width: `${((activeTabIndex + 1) / TAB_CONTENT.length) * 100}%` }}
              />
            </div>
            <p className={styles.tabsDescription}>{activeTab.description}</p>
            <div className={styles.figureSecondary} role='tabpanel' aria-live='polite'>
              <Image src={activeTab.image} alt={`${activeTab.label} 탭 콘텐츠 이미지`} />
            </div>
          </section>

          <section ref={sectionRefs.cards} id='cards-section' className={styles.cardsSection}>
            <div className={styles.cardsContainer}>
              <h2 className={styles.cardsTitle}>테스트용 이미지 카드 단락입니다</h2>
              <p className={styles.sectionSubtitle}>면접 과제용으로 제작된 샘플 탭 단락입니다.<br />인터렉션, 코드 구조등을 자유롭게 구현하세요.</p>

              <div className={styles.cardsGrid}>
                {CARD_ITEMS.map((card, index) => (
                  <article key={card.title} className={styles.card}>
                    <div className={styles.cardImage}>
                      <Image src={slideImage} alt={`${card.title} 미리보기 이미지`} />
                    </div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                    <span className={styles.cardIndex}>{`0${index + 1}`}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className={styles.footerSpacing} />
    </div>
  );
};

export default HomePage;
