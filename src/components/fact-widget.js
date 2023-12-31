import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class fact extends LitElement {
  static properties = {
    header: { type: String },
    _data: {state: true}
  }

  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');

  :host {
    display: block;
    background-color: #cee1fd;
  }

  .title {
    font-size: 100%;
    font-weight: bold;
    padding-top: 5%;
    text-align: center;
    font-family: 'Julius Sans One' !important;
  }

  div {
    font-family: 'Libre Baskerville';
  }
  .date {
    font-size: 80%;
    margin-bottom: 1%;
    text-align: center;
  }

  .fact {
    box-sizing: border-block;
    font-size: 80%;
    text-align: center;
    overflow-y: auto;
    height: 57%;
    margin-top: 1%;
  }

  hr {
    width: 80%;
    border-width: 2px;
    border-radius: 2px;
  }
  `;

  constructor() {
    super();
    this.header = 'Widget';
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    //setting the url to use when fetching data from API
    const apiUrl = `http://numbersapi.com/${month}/${day}/date`;


    //FETCHing the fun fact of the day from the API
    fetch(apiUrl)
      .then(response => response.text())
      .then(data => {
        //The fun fact recieved is set 
        this._data = data;
      })
      .catch(error => console.error(error));
  }


  render() {
    if (this._data){
      return html`
          <div class="title">Today's Date</div>
          <div class="date">${new Date().toDateString()}</div>
          <hr>
          <div class="title">Fun fact about today</div>
          <div class="fact">${this._data}</div>
    `;
    }else{
      return html`
          <div class="title">Today's Date</div>
          <div class="date">${new Date().toDateString()}</div>
          <hr><p>Loading...</p>
      `
    }
  }
}

customElements.define('fact-widget', fact);