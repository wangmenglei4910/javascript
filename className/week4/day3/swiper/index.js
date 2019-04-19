const { css } = window._utils
const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

const outer = $('#outer')
const inner = $('#inner')
const left = $('#left')
const right = $('#right')
const len = $$('#inner>div').length - 1


const imgWid = outer.clientWidth

outer.ind = 0
outer.timer = null

function switchNext(step) {
  outer.ind = !isNaN(step) ? step : ++outer.ind;

  if (outer.ind > len) {
    css(inner, 'left', 0)
    outer.ind = 1
  }
  $animate({
    ele: inner,
    target: {
      left: outer.ind * -imgWid
    },
    duration: 300
  })
}

function autoMove() {
  outer.timer = setInterval(switchNext, 3000)
}

outer.onmouseover = function() {
  clearInterval(this.timer)
}

outer.onmouseout = function() {
  autoMove()
}

right.onclick = function () {
  switchNext()
}

left.onclick = function () {
  let step = outer.ind - 1
  if (step <= -1) {
    css(inner, 'left', len * -imgWid)
    step = len - 1
  }
  switchNext(step)
}

autoMove()
