class PackageCrawlJob < ApplicationJob
  queue_as :default

  def perform(package)
    url = package.pub_url || "https://pub.flutter-io.cn/packages/#{package.name}"
    result = PackageSpider.parse!(:pub_dartlang, url: url)
    package.assign_attributes result
    package.process_finish!
  end

end
