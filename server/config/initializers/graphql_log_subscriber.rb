require "action_controller/log_subscriber"

module GraphqlLogSubscriber
  def start_processing(event=nil)
    return unless logger.info?

    payload = event.payload
    params  = payload[:params].except(*ActionController::LogSubscriber::INTERNAL_PARAMS)
    format  = payload[:format]
    format  = format.to_s.upcase if format.is_a?(Symbol)

    info "Processing by #{payload[:controller]}##{payload[:action]} as #{format}"
    return if params.empty?
    if payload[:controller] == 'GraphqlController' and payload[:action] == 'execute'
      info color("Graphql: ", ActiveSupport::LogSubscriber::MAGENTA, false)
      info color("#{params[:query]}\n#{params[:variables]}", ActiveSupport::LogSubscriber::MAGENTA, true)
    else
      info "  Parameters: #{params.inspect}"
    end
  end
end

ActionController::LogSubscriber.prepend GraphqlLogSubscriber
