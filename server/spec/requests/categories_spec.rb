require 'rails_helper'

RSpec.describe OpenFlutterSchema, type: :request do
  let(:context) { {} }
  let(:variables) { {} }
  let(:ignore_errors) { false }
  let(:executed) {
    res = described_class.execute(
      query_string,
      context: context,
      variables: variables
    )
    if res["errors"] and not ignore_errors
      pp res.to_h
    end
    res
  }

  describe "#categories" do
    let(:query_string) do %|
    query{
      viewer{
        categories{
          edges{
            node{
              id
              name
            }
          }
        }
      }
    }|
    end

    context "when there's no categories" do
      it "is blank" do
        expect(executed["data"]["viewer"]["categories"]["edges"].size).to eq(0)
      end
    end

    context "when there's some categories" do
      before(:example) do
        build(:category).save!
      end

      it "is present" do
        expect(executed["data"]["viewer"]["categories"]["edges"].size).to be > 0
      end
    end
  end

  describe "#createCategory" do
    let(:name) { build(:category).name }
    let(:variables) { {name: name} }
    let(:query_string) do %|
    mutation($name: String!, $parent_id: Int){
      createCategory(input: {name: $name, parentId: $parent_id}) {
        category {
          id
          name
          level
        }
      }
    }|
    end

    context "when create a category as root node" do
      it "has level 0" do
        expect(executed["data"]["createCategory"]["category"]["level"]).to eq(0)
        expect(executed["data"]["createCategory"]["category"]["name"]).to eq(name)
      end
    end

    context "when create a category as child node" do
      let(:parent) { create(:category) }
      let(:variables) { {name: name, parent_id: parent.id } }

      it "has level 1" do
        expect(executed["data"]["createCategory"]["category"]["level"]).to eq(1)
        expect(executed["data"]["createCategory"]["category"]["name"]).to eq(name)
      end
    end
  end

  describe "#updateCategory" do
    let(:parent) { create(:category_with_children) }
    let(:other) { create(:category_with_children) }
    let(:current) { parent.children.first }
    let(:variables) { {id: current.id, parent_id: other.id } }
    let(:query_string) do %|
    mutation($id: ID!, $parent_id: Int){
      updateCategory(input: {id: $id, parentId: $parent_id}) {
        category {
          id
          name
          level
          parent {
            id
          }
        }
      }
    }|
    end

    context "when move to other parent node" do
      it "has change parent" do
        expect { executed }.to change { current.reload.parent_id }
                                 .from(parent.id)
                                 .to(other.id)
      end
    end
  end

  describe "#deleteCategory" do
    let(:query_string) do %|
    mutation($id: ID!){
      deleteCategory(input: {id: $id}) {
        category {
          id
        }
      }
    }|
    end

    context "when delete a category which has no child" do
      let(:category) { create(:category) }
      let(:variables) { {id: category.id } }
      it "can delete" do
        expect(executed["errors"]).to be_nil 
      end
    end

    context "when delete a category which has some children" do
      let(:category) { create(:category_with_children) }
      let(:ignore_errors) { true }
      it "can't delete" do
        expect(executed["errors"]).to_not be_nil 
      end
    end
  end

end
