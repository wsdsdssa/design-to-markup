import type { AppProps } from 'next/app';
import '../styles/globals.scss';

type AppPropsWithExtra = AppProps & {
  pageProps: AppProps['pageProps'] & { isMobile?: boolean };
};

export default function App({ Component, pageProps }: AppPropsWithExtra) {
  return <Component {...pageProps} />;
}
