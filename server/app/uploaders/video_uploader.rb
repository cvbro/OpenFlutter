class VideoUploader < FileUploader
  include CarrierWave::Video

  DEFAULTS = {
    watermark: {
      path: Rails.root.join('vendor', 'watermark.png'),
      position: :bottom_right,
      margin_width: 40,
      margin_height: 34
    },
    callbacks: {
      before_transcode: :begin,
      after_transcode: :finish
    }
  }

  process :encode

  def encode
    encode_video(:mp4, DEFAULTS)
  end

end

module FixWatermarkParams
  def watermark_params
    return [] unless watermark?

    @watermark_params ||= begin
                            path = @format_options[:watermark][:path]
                            position = @format_options[:watermark][:position].to_s || :bottom_right
                            margin = @format_options[:watermark][:pixels_from_edge] || @format_options[:watermark][:margin]
                            margin_width = margin || @format_options[:watermark][:margin_width] || 10
                            margin_height = margin || @format_options[:watermark][:margin_height] || 10
                            positioning = case position
                                          when 'bottom_left'
                                            "#{margin_width}:main_h-overlay_h-#{margin_height}"
                                          when 'bottom_right'
                                            "main_w-overlay_w-#{margin_width}:main_h-overlay_h-#{margin_height}"
                                          when 'top_left'
                                            "#{margin_width}:#{margin_height}"
                                          when 'top_right'
                                            "main_w-overlay_w-#{margin_width}:#{margin_height}"
                                          end

                            ["-vf", "movie=#{path} [logo]; [in][logo] overlay=#{positioning} [out]"]
                          end
  end
end

CarrierWave::Video::FfmpegOptions.prepend(FixWatermarkParams)
