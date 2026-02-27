/**
 * MoneyCheck - Google Apps Script Backend
 *
 * セットアップ手順:
 * 1. Google Spreadsheet を開く
 * 2. 拡張機能 → Apps Script
 * 3. このコードを貼り付け
 * 4. デプロイ → 新しいデプロイ → ウェブアプリ
 *    - 次のユーザーとして実行: 自分
 *    - アクセスできるユーザー: 全員
 * 5. デプロイURLをコピーして、アプリの初回セットアップで入力
 */

// === Sheet Names ===
var SHEET_TRANSACTIONS = "取引";

// === GET Handler ===
function doGet(e) {
  var action = e.parameter.action;

  try {
    if (action === "getTransactions") {
      return jsonResponse(getTransactions(e.parameter.month));
    }
    if (action === "ping") {
      return jsonResponse({ status: "ok" });
    }
    return jsonResponse({ error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// === POST Handler ===
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;

    if (action === "addTransaction") {
      return jsonResponse(addTransaction(body));
    }
    return jsonResponse({ error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

// === Functions ===

/**
 * 取引を追加
 */
function addTransaction(data) {
  var sheet = getOrCreateSheet(SHEET_TRANSACTIONS);
  var id = new Date().getTime().toString();

  sheet.appendRow([
    id,
    data.date,
    data.amount,
    data.type,
    data.category,
    data.user,
    data.memo || ""
  ]);

  return { success: true, id: id };
}

/**
 * 月別の取引を取得
 * @param {string} month - "YYYY-MM" format
 */
function getTransactions(month) {
  var sheet = getSheet(SHEET_TRANSACTIONS);
  if (!sheet) {
    return { transactions: [] };
  }

  var data = sheet.getDataRange().getValues();
  var transactions = [];

  // Skip header row (row 0)
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var date = String(row[1]);

    // Filter by month (YYYY-MM)
    if (date.substring(0, 7) === month) {
      transactions.push({
        id: String(row[0]),
        date: date,
        amount: row[2],
        type: row[3],
        category: row[4],
        user: row[5],
        memo: row[6] || ""
      });
    }
  }

  return { transactions: transactions };
}

// === Helpers ===

function getSheet(name) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

function getOrCreateSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    // Add header row
    sheet.appendRow(["ID", "日付", "金額", "種別", "カテゴリ", "入力者", "メモ"]);
    sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
