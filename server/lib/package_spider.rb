require 'net/http'
class PackageSpider < Kimurai::Base
  @name = "package_spider"
  @start_urls = ["https://pub.flutter-io.cn/flutter/packages"]
  @config = {
    user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36",
  }

  def parse(response, url:, data: {})
    response.css('ul.package-list h3.title a').map do |a|
      item = request_to :pub_dartlang, url: absolute_url(a[:href], base: url)
      record = ::Package.find_or_initialize_by name: item[:name]
      record.update!(item)
    end
  end

  def pub_dartlang(response, url:, data: {})
    item = {}
    item[:pub_url] = url

    if response.css('aside.sidebar').blank? or response.css('div.package-header').blank?
      raise NotFound
    end

    item[:name] = url.gsub('https://pub.flutter-io.cn/packages/', '').strip

    if response.css('.package-header h2').text =~ /^#{item[:name]}(.+)$/
      item[:version] = $1.strip
    end

    children = response.css('aside.sidebar').children
    children.select{ |t| t.name.in? ["p", "h3"] }.each_slice(2) do |h3, p|
      case h3.text
      when 'About' then item[:about] = p.to_s.strip
      when 'License' then item[:license] = p.to_s.strip
      end
    end

    response.css('aside.sidebar a').each do |tag|
      case tag.text
      when 'Homepage' then item[:homepage] = tag.attribute('href').to_s.strip
      when /^Repository.*/ then item[:repository_url] = tag.attribute('href').to_s.strip
      end
    end

    item[:published] = response.css('div.package-header div.metadata span').text.strip

    raise NotFound if item.blank?
    item
  end

  class NotFound < StandardError
  end
end
