FactoryBot.define do
  sequence :category_seq

  factory :category, class: Category do
    name { "categoty #{generate :category_seq}"}
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
