/**
 * load-script is designed to load script dynamically. 
 * 
 * Made by Eldar Gabdullin (eldargab).
 * Github: https://github.com/eldargab/load-script
 * 
 * Thank you for your awesome work!
 * 
 * ---
 * 
 * And this is the promise-style version of load-script.
 * Edited By LancerComet. # Carry Your World #
 * 
 * @author: Eldar Gabdullin (Original), LancerComet (Revision)
 * @license: MIT
 */

module.exports = function load (src, opts) {
  return new Promise(function (resolve, reject) {
    var head = document.head || document.getElementsByTagName('head')[0]
    var script = document.createElement('script')

    opts = opts || {}

    script.type = opts.type || 'text/javascript'
    script.charset = opts.charset || 'utf8'
    script.async = 'async' in opts ? !!opts.async : true
    script.src = src

    if (opts.attrs) {
      setAttributes(script, opts.attrs)
    }

    if (opts.text) {
      script.text = '' + opts.text
    }

    script.onload = function () {
      resolve(script)
      this.onerror = this.onload = null      
    }

    script.onerror = function () {
      reject(script)
      this.onerror = this.onload = null            
    }

    head.appendChild(script)
  })
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr])
  }
}
