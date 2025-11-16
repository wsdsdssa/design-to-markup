import Head from 'next/head';

import HomePage from '../components/HomePage/HomePage';

export default function Home() {
  return (
    <>
      <Head>
        <title>테스트용 전용 랜딩 페이지</title>
        <meta
          name='description'
          content='디자인 시안과 동일한 구조로 제작된 테스트용 랜딩 페이지입니다.'
        />
      </Head>
      <HomePage />
    </>
  );
}
