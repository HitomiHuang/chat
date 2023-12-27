import moment from 'moment'
moment.locale('zh-tw'); 

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      if (!datetime) return '-'
      return moment(datetime).fromNow()
    },
    date(datetime) {
      if(!datetime) return '-'
      return moment(datetime).format('LLLL')
    },
    sendTime(datetime){
      if (!datetime) return '-'
      return moment(datetime).format('LT')
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg'
    },
    emptyCover(src) {
      return src || 'https://via.placeholder.com/1000x1000/DFDFDF?text=No+Image'
    }
  }
}