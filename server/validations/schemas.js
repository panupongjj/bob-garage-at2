const Joi = require("joi");

// Common validation schemas
const idParam = Joi.object({
  id: Joi.number().integer().positive().required(),
});

// Auth validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must not exceed 100 characters",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

// Service validation schemas
const createServiceSchema = Joi.object({
  name: Joi.string().min(2).max(200).trim().required().messages({
    "string.empty": "Service name is required",
    "string.min": "Service name must be at least 2 characters",
    "string.max": "Service name must not exceed 200 characters",
  }),
  description: Joi.string().min(10).max(1000).trim().required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must not exceed 1000 characters",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
});

const updateServiceSchema = Joi.object({
  name: Joi.string().min(2).max(200).trim().optional().messages({
    "string.min": "Service name must be at least 2 characters",
    "string.max": "Service name must not exceed 200 characters",
  }),
  description: Joi.string().min(10).max(1000).trim().optional().messages({
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must not exceed 1000 characters",
  }),
  price: Joi.number().positive().precision(2).optional().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
  }),
}).min(0); // Allow empty object for image-only updates

// Staff validation schemas
const createStaffSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required().messages({
    "string.empty": "Staff name is required",
    "string.min": "Staff name must be at least 2 characters",
    "string.max": "Staff name must not exceed 100 characters",
  }),
  role: Joi.string().min(2).max(100).trim().required().messages({
    "string.empty": "Role is required",
    "string.min": "Role must be at least 2 characters",
    "string.max": "Role must not exceed 100 characters",
  }),
  bio: Joi.string().min(10).max(500).trim().required().messages({
    "string.empty": "Bio is required",
    "string.min": "Bio must be at least 10 characters",
    "string.max": "Bio must not exceed 500 characters",
  }),
});

const updateStaffSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().optional().messages({
    "string.min": "Staff name must be at least 2 characters",
    "string.max": "Staff name must not exceed 100 characters",
  }),
  role: Joi.string().min(2).max(100).trim().optional().messages({
    "string.min": "Role must be at least 2 characters",
    "string.max": "Role must not exceed 100 characters",
  }),
  bio: Joi.string().min(10).max(500).trim().optional().messages({
    "string.min": "Bio must be at least 10 characters",
    "string.max": "Bio must not exceed 500 characters",
  }),
}).min(0); // Allow empty object for image-only updates

// SavedItem validation schemas
const createSavedItemSchema = Joi.object({
  serviceId: Joi.number().integer().positive().required().messages({
    "number.base": "Service ID must be a number",
    "number.positive": "Service ID must be a positive number",
    "any.required": "Service ID is required",
  }),
});

module.exports = {
  idParam,
  registerSchema,
  loginSchema,
  createServiceSchema,
  updateServiceSchema,
  createStaffSchema,
  updateStaffSchema,
  createSavedItemSchema,
};
