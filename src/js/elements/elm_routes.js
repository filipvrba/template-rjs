import routesObj from "../../json/routes.json";

export default class ElmRoutes extends HTMLElement {
  constructor() {
    super();

    this._lHashchange = () => {
      return this.changePage()
    };

    this.changePage()
  };

  connectedCallback() {
    return window.addEventListener("hashchange", this._lHashchange)
  };

  disconnectedCallback() {
    return window.removeEventListener("hashchange", this._lHashchange)
  };

  changePage() {
    let currentPage = this.findCurrentPage();
    if (currentPage) return this.initPage(currentPage)
  };

  findCurrentPage() {
    for (let page of routesObj.pages) {
      if (page.endpoint !== location.hash.replace("#", "").replaceAll(
        "-",
        "/"
      )) continue;

      return page
    };

    return null
  };

  initPage(page) {
    document.title = page.title;
    let fileName = page.endpoint.replaceAll("-", "_");

    return Net.curl(
      `./html/${fileName}.html`,
      content => this.initElm(content)
    )
  };

  initElm(content) {
    let template = `${`\n    ${content}\n    `}`;
    return this.innerHTML = template
  }
}