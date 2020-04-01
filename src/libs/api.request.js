import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const publicUrl = process.env.NODE_ENV === 'development' ? config.publicUrl.dev : config.publicUrl.pro

const option = {
  baseUrl: baseUrl,
  publicUrl: publicUrl
}

const axios = new HttpRequest(option)
export default axios
