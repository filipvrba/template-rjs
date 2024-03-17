import 'ElmRoutes', './elm_routes'
import 'routesObj', '../../json/routes.json'

export default class ElmPriorityRoutes < ElmRoutes
  ERROR = 'error'

  def initialize
    super
  end

  def change_page()
    init_elm("<elm-spinner />")
    super
  end

  def find_current_page()
    page = super
    if page
      return page
    end

    page_error = nil
    page_priority = { title: nil, priority: 0 }
    routes_obj.pages.each do |page|
      if page.endpoint == ERROR && page.priority == 0
        page_error = page
      end
      if page.priority > page_priority.priority
        page_priority = page
      end
    end

    if location.hash.sub('#', '') == ""
      unless page_priority.title == nil
        return page_priority
      else
        return nil
      end
    else
      return page_error
    end
  end

  def init_elm(content)
    super content
  end
end