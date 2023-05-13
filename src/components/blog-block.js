/**
 * A Blog widget that displays blog posts pulled from 
 * an API
 * 
 * <blog-block></blog-block>
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class BlockBlock extends LitElement {
  static properties = {
    _posts: { state: true }
  }

  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');

  :host {
    max-width: 100vw;
    font-family: "Libre Baskerville"
  }
  .blogpost {
    margin-left: 15vw;
    margin-right: 14.4vw;
    text-align: left;
  }
  .blogpost:nth-child(even) {
    background: #3250509c;
    border-bottom: 2px dotted gainsboro;
    border-top: 2px dotted gainsboro;
  }
  .blogpost:nth-child(odd) {
    background: gainsboro;
    border-bottom: 2px dotted #3250509c;
    border-top: 2px dotted #3250509c;
  }
  .blogpost h2 {
    padding-left: 3%;
    text-transform: capitalize;
    margin-bottom: 1%;
    font-family: "Julius Sans One"
  }
  .blogpost h3 {
    margin: unset;
    padding: 0 0 0 5%;
    font-size: 80%;
    text-decoration: overline;
  }
  .blogpost p {
    margin: 2% 0 2% 2%;
  }
  .blogpost p, .blogpost h2, .blogpost h3{
    margin-right: 1%;
    word-wrap: break-word;
  }

  #Content {
    font-size: 90%;
    width: 1300px;
    height: 200px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    text-align: left;
  }
  `;

  constructor() {
    super();

    const url = `${BASE_URL}blog`;
    fetch(url)
        .then(response => response.json())
        .then(posts => {
            this._posts = posts.posts; 
        });
  }

  // A simple formatter that just splits text into paragraphs and 
  // wraps each in a <p> tag
  // a fancier version could use markdown and a third party markdown
  // formatting library
  static formatBody(text) {
    const paragraphs = text.split('\r\n')
    return paragraphs.map(paragraph => html`<p>${paragraph}</p>`)
  }
  
  render() {
    if (!this._posts)
      return html`Loading...`
    
    return html`
    <div class="title"> 
      Blog Posts
    </div>
      ${this._posts.map(post => html`<div class="blogpost">
        <h2>${post.title}</h2>
        <h3>By ${post.name}</h3>
        ${BlockBlock.formatBody(post.content)}
      </div>`)}
      <form id="PostBlog">
          <label for"Content"> Create Blog Post </label>
          <textarea id = "Content" type="text" placeholder="Enter text here..." maxlength="2000"></textarea>
          <button id="SubmitBlog"> Submit </button>
      </form>
      `;

  }
}

customElements.define('blog-block', BlockBlock);


