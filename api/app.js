import { createClient } from 'newt-client-js'

export const getApp = async (config, slug) => {
  try {
    const client = createClient({
      projectUid: config.projectUid,
      token: config.token,
      apiType: config.apiType,
    })
    const app = await client.getApp({
      appUid: config.appUid,
    })
    return app || null
  } catch (err) {
    return null
  }
}
