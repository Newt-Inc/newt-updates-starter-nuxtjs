<template>
  <main class="Container">
    <article v-if="article" class="Article">
      <div class="Article_Header">
        <h1 class="Article_Title">{{article.title}}</h1>
        <div class="Article_Data">
          <div class="Article_Avatar">
            <template v-if="this.article.author && this.article.author.profileImage">
              <img :src="this.article.author.profileImage.src" alt="" width="32" height="32" />
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </template>
          </div>
          <div class="Article_AuthorName">{{authorName}}</div>
          <time :datetime="publishDateForAttr" class="Article_Date">{{publishDate}}</time>
        </div>
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="Article_Body" v-html="article.body"></div>
      <aside class="Author">
        <div class="Author_Avatar">
          <template v-if="this.article.author && this.article.author.profileImage">
            <img :src="this.article.author.profileImage.src" alt="" width="48" height="48" />
          </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </template>
        </div>
        <div class="Author_Text">
          <div class="Author_Name">{{authorName}}</div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="Author_Description" v-html="authorSelfIntroduction"></div>
        </div>
      </aside>
    </article>
  </main>
</template>

<script>
import { getArticleBySlug } from 'api/article'
import { formatDate } from 'utils/date'

export default {
  layout: 'sub',
  async asyncData({ $config, params }) {
    const article = await getArticleBySlug($config, params.slug)
    return {
      article
    }
  },
  computed: {
    publishDate() {
      return this.article._sys.createdAt ? formatDate(this.article._sys.createdAt) : ''
    },
    publishDateForAttr() {
      return this.publishDate.replace(/\//g, '-')
    },
    authorName() {
      return (this.article.author && this.article.author.fullName) || 'NO NAME'
    },
    authorSelfIntroduction() {
      return (this.article.author && this.article.author.introduction && this.article.author.introduction.html) || ''
    }
  }
}
</script>

<style scoped>
.Article {
  padding: 24px;
  margin: 0 auto;
}
.Article_Header {
  margin: 0 0 24px 0;  
}
.Article_Title {
  font-size: 2.4rem;
  line-height: 1.5;
  font-weight: bold;
  margin: 0 0 16px 0;
  padding: 0;
}
.Article_Data {
  display: flex;
  align-items: center;
}
.Article_Avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 12px 0 0;
  flex-shrink: 0;
  background: rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}
.Article_Avatar img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
}
.Article_AuthorName {
  font-weight: bold;
  margin: 0 8px 0 0;
}
.Article_Date {
  color: #888;
}
.Article_Body {
  padding: 0 0 28px 0;
}
.Article_Body >>> p {
  margin: 0 0 24px 0;
}
.Article_Body >>> img {
  max-width: 100%;
  height: auto;
  margin: 32px auto;
  display: block;
}
.Fav {
  display: flex;
  align-items: center;
}
.Fav_Button {
  border: none;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.06), 0 3px 10px -8px rgba(0,0,0,1);
  position: relative;
  cursor: pointer;
}
.Fav_Button:focus {
  outline: none;
}
.Fav_Button:focus::after {
  content: "";
  border: 2px solid #005FCC;
  position: absolute;
  left: 0;
  top: 0;
  width: 36px;
  height: 36px;
  border-radius: 20px;
  z-index: 0;  
}
.Fav._on .Fav_Button:focus::after {
  border: 2px solid #E0245E;
}
.Fav_Button:hover > svg {
  fill: #888;
}
.Fav_Button:active {
  transform: scale(.96);
}
.Fav_Button > svg {
  position: absolute;
  left: 12px;
  top: 12px;
  height: 18px;
  width: 16px;
  display: block;
  fill: #CCC;
  transition: fill .2s;
}
.Fav > em {
  font-style: normal;
  font-weight: bold;
  color: #888;
  margin: 0 0 0 12px;
}
.Fav._on .Fav_Button > svg {
  fill: #E0245E;
  transition: none;
}
.Fav._on > em {
  color: #E0245E;
}
.Author {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 24px;
  display: flex;
  margin: 0 0 40px 0;
}
.Author_Avatar {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  margin: 0 16px 0 0;
  flex-shrink: 0;
  background: rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}
.Author_Avatar img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  font-family: 'object-fit: cover'; /* IE11 */
}
.Author_Name {
  margin: 0 0 4px 0;
  padding: 0;
  font-weight: bold;
  line-height: 1.5;
}
.Author_Description {
  margin: 0;
  padding: 0;
  line-height: 1.5;
  font-size: 1.2rem;
}
.Author_Description >>> p {
  margin: 0;
  padding: 0;
}
@media (min-width: 600px) {
  .Article {
    max-width: 700px;
    padding: 60px;
  }
  .Article_Header {
    margin: 0 0 48px 0;  
  }
}
</style>