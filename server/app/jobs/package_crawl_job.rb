class PackageCrawlJob < ApplicationJob

  rescue_from(PackageSpider::NotFound) do |exception|
    package = Package.find arguments.first
    package.error_messages << exception.to_s
    package.wrong!
  end

  def perform(id)
    package = Package.find id
    url = package.pub_url || "https://pub.flutter-io.cn/packages/#{package.name}"
    result = PackageSpider.parse!(:pub_dartlang, url: url)
    package.assign_attributes result
    package.process_finish!
  end
end
