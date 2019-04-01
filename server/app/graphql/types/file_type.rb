module Types
  class FileType < Types::BaseScalar
    def self.coerce_input(file, context)
      return nil if file.nil?

      ActionDispatch::Http::UploadedFile.new(
        filename: file.original_filename,
        type: file.content_type,
        head: file.headers,
        tempfile: file.tempfile
      )
    end

    def self.coerce_result(ruby_value, context)
      # Override this to serialize a Ruby value for the GraphQL response
      ruby_value.service_url if ruby_value.attachment
    end
  end
end
