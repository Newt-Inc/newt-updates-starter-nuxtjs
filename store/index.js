import { createClient } from 'newt-client-js'

export const state = () => ({
  app: null,
  articles: [],
  total: 0,
  categories: [],
  currentArticle: null,
})

export const getters = {
  app: (state) => state.app,
  articles: (state) => state.articles,
  total: (state) => state.total,
  categories: (state) => state.categories,
  currentArticle: (state) => state.currentArticle,
}

export const mutations = {
  setApp(state, app) {
    state.app = app
  },
  setArticles(state, articles) {
    state.articles = articles
  },
  setTotal(state, total) {
    state.total = total
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setCurrentArticle(state, currentArticle) {
    state.currentArticle = currentArticle
  },
}

export const actions = {
  async fetchApp({ commit }, { spaceUid, token, apiType, appUid }) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const app = await client.getApp({
        appUid,
      })
      commit('setApp', app)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchArticles(
    { commit },
    {
      spaceUid,
      articleModelUid,
      token,
      apiType,
      appUid,
      pageLimit,
      search,
      category,
      page,
      query,
    }
  ) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const _query = {
        ...(query || {}),
      }
      if (search) {
        _query.or = [
          {
            title: {
              match: search,
            },
          },
          {
            body: {
              match: search,
            },
          },
        ]
      }
      if (category) {
        _query.categories = category
      }
      const _page = page || 1
      const _limit = pageLimit || 10
      const _skip = (_page - 1) * _limit

      const { items, total } = await client.getContents({
        appUid,
        modelUid: articleModelUid,
        query: {
          depth: 2,
          limit: _limit,
          skip: _skip,
          ..._query,
        },
      })
      commit('setArticles', items)
      commit('setTotal', total)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchCategories(
    { commit },
    { spaceUid, categoryModelUid, token, apiType, appUid }
  ) {
    try {
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: categoryModelUid,
        query: {
          depth: 1,
        },
      })
      commit('setCategories', items)
    } catch (err) {
      // console.error(err)
    }
  },
  async fetchCurrentArticle(
    { commit },
    { spaceUid, articleModelUid, token, apiType, appUid, slug }
  ) {
    try {
      if (!slug) return commit('setCurrentArticle', null)
      const client = createClient({
        spaceUid,
        token,
        apiType,
      })
      const { items } = await client.getContents({
        appUid,
        modelUid: articleModelUid,
        query: {
          depth: 2,
          limit: 1,
          slug,
        },
      })
      commit('setCurrentArticle', items.length === 1 ? items[0] : null)
    } catch (err) {
      return null
    }
  },
}
