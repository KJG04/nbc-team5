import $ from 'jquery'

export default function update() {
  $('span').text(new Date().toISOString())
  setTimeout(update, 1000)
}
