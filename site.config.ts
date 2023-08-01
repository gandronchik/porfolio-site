import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  // rootNotionPageId: '7875426197cf461698809def95960ebf',
  rootNotionPageId: 'fa60067fa95b481f90a22fc5828cdc92',

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
    '/statement': '16e8d9eef7584b9a935ccf676e4d7b8d',
    '/shop': 'fd2c12b843684506bc25bd15356728e3',
    '/contacts': 'beca9c28b1544e89a3f8e32977398d35'
  },

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Statement',
      pageId: '16e8d9eef7584b9a935ccf676e4d7b8d'
    },
    {
      title: 'Shop',
      pageId: 'fd2c12b843684506bc25bd15356728e3'
    },
    {
      title: 'Contacts',
      pageId: 'beca9c28b1544e89a3f8e32977398d35'
    }
  ]
})
