import axios from '@/libs/api.request'

// 获取图形验证码
export const getImgCode = ({ isPublicApi = true, randomStr = '' } = {}) => {
  return axios.request({
    url: `/login/getverifycode/${randomStr}`,
    data: {
      isPublicApi: isPublicApi
    },
    method: 'post'
  })
}
