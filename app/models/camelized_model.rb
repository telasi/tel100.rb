module CamelizedModel
  def as_json(opts)
    json = super(opts)
    json.transform_keys{|key| key.to_s.camelize(:lower) }
  end
end
