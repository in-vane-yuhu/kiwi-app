import Decimal from 'decimal.js'

function sub(amount, deal) {
  let a = new Decimal(Number(amount)).sub(new Decimal(Number(deal)))
  return a.valueOf()
}
function div(money, stock) {
  if (Number(stock) === 0) {
    return 0
  }
  let a = new Decimal(Number(money)).div(new Decimal(Number(stock)))
  return a.valueOf()
}

function fmtHomeList(open, close) {
  if (Number(open) === 0) {
    return 0
  }
  let a = new Decimal(Number(open))
    .sub(new Decimal(Number(close)))
    .div(new Decimal(Number(open)))
    .mul(new Decimal(100))
  return Number(a.valueOf()).toFixed(2)
}

export { sub, div, fmtHomeList }
