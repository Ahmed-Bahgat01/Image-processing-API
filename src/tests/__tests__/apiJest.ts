import request from 'supertest'
import app from '../../index'

describe('happy scenarios', () => {
  it('happy scenario should return (image), with src= (url) and status code (200)', async () => {
    const res = await request(app).get(
      '/resized/?filename=a&width=100&height=100'
    )
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('image/jpeg')
  })
})
describe('bad scenarios', () => {
  it('missing height parameter value', async () => {
    const res = await request(app).get('/resized/?filename=a&width=100&height=')
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('text/html')
    expect(res.text).toEqual('height parameter is empty')
  })
  it('missing width parameter value', async () => {
    const res = await request(app).get('/resized/?filename=a&width=&height=100')
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('text/html')
    expect(res.text).toEqual('width parameter is empty')
  })
  it('missing filename parameter value', async () => {
    const res = await request(app).get(
      '/resized/?filename=&width=100&height=100'
    )
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('text/html')
    expect(res.text).toEqual('filename parameter is empty')
  })
  it('requesting not exist image', async () => {
    const res = await request(app).get(
      '/resized/?filename=zzzz&width=100&height=100'
    )
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('text/html')
    expect(res.text).toEqual('Image not found')
  })
  it('requesting wrong path', async () => {
    const res = await request(app).get(
      '/wrong/?filename=a&width=100&height=100'
    )
    expect(res.statusCode).toEqual(404)
  })
})
