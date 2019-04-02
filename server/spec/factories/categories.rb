FactoryBot.define do
  sequence :random, aliases: [:name] do |n| 
    "categoty #{n}"
  end

  factory :category, class: Category do
    name
    parent { nil }

    factory :category_with_children do

      transient do
        children_count { 3 }
      end

      after(:create) do |category, evaluator|
        create_list(:category, evaluator.children_count, parent: category)
      end
    end
  end
end
