import { createClient } from 'newt-client-js'
const ARTICLE_MODEL_NAME = 'article'

export const getArticles = async (config, options={ search: '', category: '', page: 1, query: {} }) => {
  try {
    const client = createClient({
      projectUid: config.projectUid,
      token: config.token,
      apiType: 'cdn',
    })
    const _options = {
      search: '',
      category: '',
      page: 1,
      query: {},
      ...options,
    }
    const query = {
      ...(_options.query || {})
    }
    if (_options.search) {
      query.or = [
        {
          title: {
            match: _options.search
          }
        },
        {
          body: {
            match: _options.search
          }
        }
      ]
    }
    if (_options.category) {
      query.categories = _options.category
    }
    const page = _options.page || 1
    const limit = config.pageLimit || 10
    const skip = (page - 1) * limit
    const result = await client.getContents({
      appUid:config.appUid,
      modelUid: ARTICLE_MODEL_NAME,
      query: {
        depth: 2,
        limit,
        skip,
        ...query
      }
    })
    return {
      ...result,
      articles: result.items,
    }
  } catch (err) {
    return {
      articles: [],
      total: 0,
    }
  }
}

export const getArticleBySlug = async (config, slug) => {
  try {
    const client = createClient({
      projectUid: config.projectUid,
      token: config.token,
      apiType: 'cdn',
    })
    const result = await client.getContents({
      appUid:config.appUid,
      modelUid: ARTICLE_MODEL_NAME,
      query: {
        depth: 2,
        limit: 1,
        slug,
      }
    })
    return result.items.length === 1 ? result.items[0] : null
  } catch (err) {
    return null
  }
}