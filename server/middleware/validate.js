const validate = (schema, source = "body") => {
  return (req, res, next) => {
    const data = source === "params" ? req.params : req.body;

    // Convert empty strings to undefined for optional fields
    const sanitizedData = {};
    // Ensure data is an object before iterating
    if (data && typeof data === "object") {
      for (const [key, val] of Object.entries(data)) {
        sanitizedData[key] = val === "" ? undefined : val;
      }
    }

    const { error, value } = schema.validate(sanitizedData, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    // Replace req.body or req.params with validated and sanitized value
    if (source === "params") {
      req.params = value;
    } else {
      req.body = value;
    }

    next();
  };
};

module.exports = validate;
