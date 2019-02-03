// @flow
const mongoose = require('mongoose');
const Joi = require('joi');

export type Link = {
  title: string,
  url: string,
  description: string,
  tags: Array<string>,
};
const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  shortLink: {
    type: String,
    required: true,
    unique: true,
  },
  passage: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
});

function validateLink(link: Link) {
  const schema = {
    title: Joi.string()
      .max(100)
      .required(),
    url: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .required(),
    description: Joi.string().required(),
    tags: Joi.array(),
  };

  return Joi.validate(link, schema);
}
const linkModel = mongoose.model('Link', linkSchema);

exports.Link = linkModel;
exports.validate = validateLink;