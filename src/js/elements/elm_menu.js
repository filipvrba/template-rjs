import routesObj from "../../json/routes.json";

export default class ElmMenu extends HTMLElement {
  constructor() {
    super();
    this._priority = this.getAttribute("priority");
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let lLi = () => {
      let aLi = [];

      for (let page of routesObj.pages) {
        if (page.priority !== parseInt(this._priority) && !(this._priority === null && page.priority > 0)) {
          continue
        };

        let hash = page.endpoint.replaceAll("/", "-");
        aLi.push(`${`
        <li>
          <a href='#${hash}'>${page.title}</a>
        </li>
        `}`)
      };

      return aLi.join("")
    };

    let template = `${`\n<ul>\n  ${lLi()}\n</ul>\n    `}`;
    return this.innerHTML = template
  }
}