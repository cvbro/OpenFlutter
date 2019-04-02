packages = Package.seed(:name,
  { name: "flutter_calendar" },
  { name: "flutter_shimmer" },
  { name: "flutter_infinite_listview" },
  { name: "page-transformer" }, 
)

packages.each do |package|
  filename = package.name
  package.image.attach(io: File.open("#{Rails.root}/db/fixtures/files/#{filename}/#{filename}.png"), filename: "#{filename}.png")
  package.video.attach(io: File.open("#{Rails.root}/db/fixtures/files/#{filename}/#{filename}.mp4"), filename: "#{filename}.mp4")
end
