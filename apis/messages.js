import { apiHelper } from '.././src/utility/helpers'

export default {
  deleteMessages(){
    return apiHelper.delete('/api/messages/all')
  }
}