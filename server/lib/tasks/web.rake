namespace :web do
  desc "generate graphql schema"
  task schema: :environment do
    File.open(Rails.root.join('../web/schema.graphql'), 'w') {|f| f<< OpenFlutterSchema.to_definition }
  end
end
