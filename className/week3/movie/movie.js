const url =
  'https://www.easy-mock.com/mock/5cac8a52f1e8921b5809e141/move/movierating'

const movieRating = document.querySelector('#movieRating')
const headerTime = document.querySelector('#header-time')
const movieRatingBtn = document.querySelectorAll('#movieRatingHeader>.btn-sort')

const sortAttr = [
  'boxInfo',
  'boxRate',
  'showInfo',
  'showRate',
  'avgShowView',
  'avgSeatView'
]

let movieData = []

let xhr = new XMLHttpRequest()

xhr.open('GET', url, true)

xhr.onreadystatechange = function() {
  if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
    let result = JSON.parse(this.responseText)
    if (result && result.errno === 0) {
      let {
        data: { list, serverTime }
      } = result

      movieData = list
      headerTime.innerHTML = formatterTime(serverTime)
      renderRating(list)
    }
  }
}
xhr.send()

function renderRating(list) {
  let str = ''
  list.forEach((item, idx) => {
    const {
      boxRate, // 票房占比
      showInfo, // 排片场次
      showRate, // 排片占比
      avgSeatView, // 上座率
      avgShowView, // 场均人次
      boxInfo, // 综合票房
      movieName, // 电影名称
      movieId, // 电影ID
      releaseInfo, // 上映6天
      sumBoxInfo // 总票房
    } = item

    str += `
    <li>
    <span>${movieName}</span>
    <span class="realtime">${boxInfo}</span>
    <span>${boxRate}</span>
    <span>${showInfo}</span>
    <span>${showRate}</span>
    <span>${avgShowView}</span>
    <span>${avgSeatView}</span>
   </li>
    `
  })
  movieRating.innerHTML = str
}

for (let i = 0; i < movieRatingBtn.length; i++) {
  movieRatingBtn[i].flag = -1
  movieRatingBtn[i].onclick = function() {
    const sortId = this.getAttribute('sort-id')
    this.flag *= -1
    sortList(sortAttr[sortId], this.flag)
  }
}

function sortList(attr, flag) {
  movieData.sort((a, b) => {
    let s1 = parseFloat(a[attr])
    let s2 = parseFloat(b[attr])
    isNaN(s1) && (s1 = 0)
    isNaN(s2) && (s2 = 0)
    return (s1 - s2) * flag
  })
  renderRating(movieData)
}

function formatterTime(timeStr) {
  let reg = /(\d+)-(\d+)-(\d+) (\w+)/
  return timeStr.replace(reg, '$1年$2月$3日 $4')
}
