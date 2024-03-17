import 'routesObj', '../../json/routes.json'

export default class ElmRoutes < HTMLElement
  def initialize
    super

    @l_hashchange = lambda { change_page() }

    change_page()
  end

  def connectedCallback()
    window.add_event_listener('hashchange', @l_hashchange)
  end

  def disconnectedCallback()
    window.remove_event_listener('hashchange', @l_hashchange)
  end

  def change_page()
    current_page = find_current_page()
    init_page(current_page) if current_page
  end

  def find_current_page()
    routes_obj.pages.each do |page|
      unless page.endpoint == location.hash.sub('#', '')
                              .gsub('-', '/')
        next
      end

      return page
    end

    return nil
  end

  def init_page(page)
    document.title = page.title
    
    file_name = page.endpoint.gsub('-', '_')
    Net.curl("./html/#{file_name}.html") do |content|
      init_elm(content)
    end
  end

  def init_elm(content)
    template = """
    #{content}
    """

    self.innerHTML = template
  end
end