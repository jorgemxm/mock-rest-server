class Randomizer {
  static get (type) {
    if (type === Number) {
      return Randomizer.number()
    }
    if (type === String) {
      return Randomizer.string()
    }
    if (type === Date) {
      return Randomizer.date()
    }
    if (type === Boolean) {
      return Randomizer.boolean()
    }
  }

  static number () {
    return Math.floor(1000 * Math.random())
  }

  static string () {
    return [...new Array(4)].map(() => (Math.random()).toString(16).replace(/[^a-z]/gi, '')).join('')
  }

  static date () {
    const date = new Date(Date.now() + (Math.random() < 0.5 ? -1 : 1) * Math.floor(20e10 * Math.random()))
    return date.toISOString().slice(0, 10) + ' ' + date.toISOString().slice(11, 19)
  }

  static boolean () {
    return Math.random() > 0.5
  }
}

module.exports = Randomizer
