import 'routesObj', '../../json/routes.json'

export default class ElmMenu < HTMLElement
  def initialize
    super
    
    @priority = self.get_attribute('priority')

    init_elm()
  end

  def connectedCallback()
  end

  def disconnectedCallback()
  end

  def init_elm()
    l_li = lambda do
      a_li = []
      routes_obj.pages.each do |page|
        unless page.priority == @priority.to_i ||
               (@priority == nil && page.priority > 0)
          next
        end

        hash = page.endpoint.gsub('/', '-')
        a_li << """
        <li>
          <a href='\##{hash}'>#{page.title}</a>
        </li>
        """
      end
      return a_li.join('')
    end

    template = """
<ul>
  #{l_li()}
</ul>
    """

    self.innerHTML = template
  end
end