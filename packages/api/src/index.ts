import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import BodyParser from 'body-parser'
import { celebrate, Joi, errors, Segments } from 'celebrate'

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Datasources = mongoose.model('Datasources', new mongoose.Schema({
  name: String
}));
const Pages = mongoose.model('Pages', new mongoose.Schema({
  name: String
}));

const server = express()
server.use(cors())
server.use(BodyParser.json());

server.post(
  '/createPage',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  async (req, res) => {
    const page = new Pages({ name: req.body.name })
    await page.save()
    res.json(page)
  }
)

server.get(
  '/getPage',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  async (req, res) => {
    res.json(await Pages.findOne({ _id: req.query.id }))
  }
)

server.get('/pages', async (req, res) => {
  res.json(await Pages.find())
})

server.get('/datasources', async (req, res) => {
  
  res.json(await Datasources.find())
})


server.use(errors());

server.listen(8080, () => {
  console.log('server started')
})