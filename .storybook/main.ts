import type { StorybookConfig } from '@storybook/react-webpack5';
const path = require('node:path');

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links', // global.scss
    '@storybook/addon-themes', // module.scss
    {
      name: '@storybook/preset-scss',
      options: {
        rule: {
          test: /(?<!\.module).scss$/,
        },
      },
    },
    {
      name: '@storybook/preset-scss',
      options: {
        rule: {
          test: /\.module\.scss$/,
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]_[local]__[hash:base64:5]',
          },
        },
      },
    },
    'storybook-css-modules',
    '@storybook/addon-webpack5-compiler-swc',
    '@chromatic-com/storybook',
    'storybook-i18n',
    '@storybook/addon-vitest',
    '@storybook/addon-docs',
    '@storybook/addon-designs',
  ],
  webpackFinal: (config) => {
    if (config.resolve?.alias) {
      config.resolve.alias['@'] = path.resolve(__dirname, '../src');
      // Mock Next.js Image component for Storybook
      config.resolve.alias['next/image'] = path.resolve(__dirname, 'next-image.mock.tsx');
      // Mock Next.js Link component for Storybook
      config.resolve.alias['next/link'] = path.resolve(__dirname, 'next-link.mock.tsx');
    }

    config.resolve = {
      ...config.resolve,
      roots: [
        path.resolve(__dirname, '../public'),
        'node_modules',
      ],
    };

    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test;

      if (!test) {
        return false;
      }

      return test.test('.svg');
    }) as { [key: string]: any };

    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['node_modules/**', '.next/**', 'storybook-static/**', 'storybook-build/**'],
    };

    config.module?.rules?.push(
      {
        test: /\.svg$/,
        issuer: /\.mdx?$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.mov$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'static/media/',
            },
          },
        ],
      },
    );
    imageRule.exclude = /\.svg$/;
    return config;
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {},
    },
  },

  docs: {
    defaultName: 'Docs',
  },

  swc: (config, options) => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),

  managerHead: (head, { configType }) => {
    if (configType === 'PRODUCTION') {
      return `
        <meta name="robots" content="noindex" />
        <base href="/" />
        ${head}
      `;
    }
    return head;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
