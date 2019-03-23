require 'rails_helper'

RSpec.describe OpenFlutterSchema, type: :request do
  let(:context) { {} }
  let(:variables) { {} }
  let(:result) {
    res = OpenFlutterSchema.execute(
      query_string,
      context: context,
      variables: variables
    )
    pp(res) if res["errors"]
    res
  }

  describe "query#packages" do
    context "simple query" do
      let(:query_string) { %|{ packages { name } }| }
      it "success" do
        expect(result["data"]["packages"]).to_not be_nil
      end
    end
  end

end
