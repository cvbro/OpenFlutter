require "action_controller/log_subscriber"

class GraphqlLogSubscriber < ActionController::LogSubscriber
  INTERNAL_PARAMS = %w(controller action format _method only_path)
  def start_processing(event)
    return unless logger.info?

    payload = event.payload
    params  = payload[:params].except(*INTERNAL_PARAMS)
    format  = payload[:format]
    format  = format.to_s.upcase if format.is_a?(Symbol)

    info "Processing by #{payload[:controller]}##{payload[:action]} as #{format}"
    return if params.empty?
    if payload[:controller] == 'GraphqlController' and payload[:action] == 'execute'
      info color("Graphql: --->", MAGENTA, false)
      info color("#{params[:query]}#{params[:variables]}", MAGENTA, true)
      info color("<---", MAGENTA, false)
    else
      info "  Parameters: #{params.inspect}"
    end
  end
end


ActiveSupport::Notifications.notifier.unsubscribe "start_processing.action_controller"
GraphqlLogSubscriber.attach_to :action_controller
