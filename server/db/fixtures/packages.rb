seeds = [
  { name: "flutter_calendar" },
  { name: "flutter_shimmer" },
  { name: "flutter_infinite_listview" },
  { name: "page-transformer" }, 
]

seeds.map! do |seed|
  filename = seed[:name]
  { name: seed[:name], image: File.open("#{Rails.root}/db/fixtures/files/#{filename}/#{filename}.png"), video: File.open("#{Rails.root}/db/fixtures/files/#{filename}/#{filename}.mp4")  }
end

packages = Package.seed(:name, *seeds)
