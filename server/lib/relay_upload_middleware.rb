class RelayUploadMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)

    if multi_form?(env) and graphql_path?(env)
      request = ActionDispatch::Request.new(env)
      params = request.params
      if params[:variables] && params[:uploadables]
        variables = ensure_hash params[:variables]
        variables["input"].update params[:uploadables]
        request.update_param("variables", variables)
      end
    end

    @app.call(env)
  end

  private

  def multi_form? env
    env['CONTENT_TYPE'].to_s.include?('multipart/form-data')
  end

  def graphql_path? env
    env['REQUEST_PATH'].ends_with?("/graphql")
  end

  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end

end
