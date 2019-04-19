Element.prototype.has = function(cn) {
  let reg = new RegExp(`\\b${cn.trim()}\\b`)
  return reg.test(this.className)
}

Element.prototype.add = function(...cns) {
  cns.forEach(cn => {
    if (!this.has(cn)) {
      this.className += ` ${cn.trim()}`
    }
  })
  return this
}

Element.prototype.remove = function(...cns) {
  cns.forEach(cn => {
    let reg = new RegExp(`\\b${cn.trim()}\\b`)
    this.className = this.className.replace(reg, '')
  })
  return this
}

Element.prototype.toggle = function (cn) {
  this.has(cn) ? this.remove(cn) : this.add(cn)
  return this
}

Element.prototype.toggles = function (...cns) {
  cns.forEach(cn => this.toggle(cn))
  return this
}