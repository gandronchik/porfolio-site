import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  // rootNotionPageId: '7875426197cf461698809def95960ebf',
  rootNotionPageId: '1af5f692dda147c5a9d4cf890c473658',

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
    '/statement': 'd54aac1e934b4935aaa0eb9b3542d798',
    '/shop': '02d5876e5e924b7d8fb66fde00c41ca7',
    '/contacts': '3073dcb5850946429f9ecdf201f9ddc2',
    '/': '1af5f692dda147c5a9d4cf890c473658'
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Statement',
      pageId: 'd54aac1e934b4935aaa0eb9b3542d798'
    },
    {
      title: 'Portfolio',
      pageId: '1af5f692dda147c5a9d4cf890c473658'
    },
    {
      title: 'Shop',
      pageId: '02d5876e5e924b7d8fb66fde00c41ca7'
    },
    {
      title: 'Contacts',
      pageId: '3073dcb5850946429f9ecdf201f9ddc2'
    }
  ]
})
