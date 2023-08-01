//import { NotionAPI } from 'notion-client'
import { Client } from '@notionhq/client'
import { NotionCompatAPI } from 'notion-compat'

// export const notion = new NotionAPI({
//   apiBaseUrl: process.env.NOTION_API_BASE_URL
// })
export const notionhq = new NotionCompatAPI(new Client({ auth: "secret_5wIMoRfaVjNUKTObeZrfx1HA92F4s0Et1tUgxXGjnrh" }))

