import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  // rootNotionPageId: '7875426197cf461698809def95960ebf',
  rootNotionPageId: '65fec5b4a3c640d0bbc5e01e2e9daef5',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Kashtalyan Dima Portfolio',
  domain: 'https://kashtalyan.com/',
  author: 'Dima Kashtalyan',

  // open graph metadata (optional)
  description: 'Kashtalyan artist porfolio',

  // social usernames (optional)
  social: {
    instagram: 'https://instagram.com/dkashtalyan/',
    behance: 'https://www.behance.net/Kashtalyan',
    twitter: 'https://twitter.com/dkashtalyan',
    facebook: 'https://www.facebook.com/dkashtalyan'
  },

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/statement': '8df73a9a04fe4653968568ca1d865fcf',
    '/shop': '81f87e49cb3a46dabc7f6b0e50210a2c',
    '/contacts': '7488c030502143648e0d501c1c8dae28',
    '/': 'a3f2ddd94a1d4a59ad83ad12fc2c9a41'
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Statement',
      pageId: '8df73a9a04fe4653968568ca1d865fcf'
    },
    {
      title: 'Portfolio',
      pageId: 'a3f2ddd94a1d4a59ad83ad12fc2c9a41'
    },
    {
      title: 'Shop',
      pageId: '81f87e49cb3a46dabc7f6b0e50210a2c'
    },
    {
      title: 'Contacts',
      pageId: '7488c030502143648e0d501c1c8dae28'
    }
  ]
})
