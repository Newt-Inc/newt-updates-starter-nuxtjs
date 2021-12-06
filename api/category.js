import { createClient } from 'newt-client-js'
const CATEGORY_MODEL_NAME = 'category'

export const getCategories = async (config) => {
  try {
    const client = createClient({
      projectUid: config.projectUid,
      token: config.token,
      apiType: 'cdn',
    })
    const result = await client.getContents({
      appUid:config.appUid,
      modelUid: CATEGORY_MODEL_NAME,
      query: {
        depth: 1
      }
    })
    return {
      ...result,
      categories: result.items,
    }
  } catch (err) {
    return {
      categories: [],
      total: 0,
    }
  }
}