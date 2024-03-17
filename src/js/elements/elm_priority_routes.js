import ElmRoutes from "./elm_routes";
import routesObj from "../../json/routes.json";

export default class ElmPriorityRoutes extends ElmRoutes {
  constructor() {
    super()
  };

  changePage() {
    this.initElm("<elm-spinner />");
    return super.changePage()
  };

  findCurrentPage() {
    let page = super.findCurrentPage();
    if (page) return page;
    let pageError = null;
    let pagePriority = {title: null, priority: 0};

    for (let page of routesObj.pages) {
      if (page.endpoint === ElmPriorityRoutes.ERROR && page.priority === 0) {
        pageError = page
      };

      if (page.priority > pagePriority.priority) pagePriority = page
    };

    if (location.hash.replace("#", "") === "") {
      if (pagePriority.title === null) {
        return null
      } else {
        return pagePriority
      }
    } else {
      return pageError
    }
  };

  initElm(content) {
    return super.initElm(content)
  }
};

ElmPriorityRoutes.ERROR = "error"