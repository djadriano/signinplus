# ---------------------------------
# Paths
# ---------------------------------
set :css_dir   , "stylesheets"
set :js_dir    , "javascripts"
set :images_dir, "images"

# ---------------------------------
# Livereload
# ---------------------------------
activate :livereload

# ---------------------------------
# Helpers
# ---------------------------------
helpers do
  # method for get stylesheets and javascripts of template
  def path_assets
    arr_classes = page_classes.split( ' ' )

    if arr_classes.length < 2
      arr_classes[ 0 ]
    else

      arr_section = arr_classes[ ( arr_classes.length - 1 ) ].split( '_' )
      asset_path  = ''

      arr_section.each_with_index do |lista, i|
        if i == ( arr_section.length - 1 )
          asset_path = asset_path + lista
        else
          asset_path = asset_path + lista + '/'
        end
      end

      asset_path

    end
  end
end

# ---------------------------------
# Build-specific configuration
# ---------------------------------
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end