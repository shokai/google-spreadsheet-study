import GoogleSpreadsheetAsPromised from 'google-spreadsheet-as-promised'

const CREDS = require('./credentials.json')
const SHEET_ID = '1Q9qh3rvFkkmrjeVvKCM4GtRNdd5QHNWkC2g4LlqmE4I'; // id from sheet URL

// シート末尾を探す
async function getTailRowIndex (worksheet) {
  const cells = (await worksheet.getCells('A1:A1500')).getAllValues()
  console.log(cells.length)
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === '') return i
  }
}

(async function () {
  const sheet = new GoogleSpreadsheetAsPromised()
  await sheet.load(SHEET_ID, CREDS)
  const worksheet = await sheet.getWorksheetByName('sheet1') // 事前にsheet1というシートを作っておく必要がある
  const tailRowIndex = await getTailRowIndex(worksheet)

  const cell = await worksheet.getCell(`A${tailRowIndex + 1}`)
  await cell.setValue(new Date().toString()) // 現在の日付を追記
  console.log('done')
})().catch(err => console.error(err.stack || err))
