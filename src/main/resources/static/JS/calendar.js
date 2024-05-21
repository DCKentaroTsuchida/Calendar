// DOMが読み込まれた時に実行される関数
document.addEventListener("DOMContentLoaded", function() {
    // カレンダーを表示するためのdiv要素を取得
    var calendarDiv = document.getElementById("calendar");
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();

    // カレンダーを描画する関数を呼び出す
    renderCalendar(year, month);

    // カレンダーを描画する関数
    function renderCalendar(year, month) {
        // 月の日数を取得
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        // 月の最初の曜日を取得
        var firstDayOfWeek = new Date(year, month, 1).getDay();

        // カレンダーのHTMLを初期化
        var calendarHtml = "<table class='calendar'>";
        // カレンダーのヘッダーを追加
        calendarHtml += "<tr><th colspan='7'>" + getMonthName(month) + " " + year + "</th></tr>";
        calendarHtml += "<tr>";
        calendarHtml += "<th class='prev' id='prev'>&#10094;</th>"; // 前月ボタン
        calendarHtml += "<th colspan='5'></th>"; // 空のセル
        calendarHtml += "<th class='next' id='next'>&#10095;</th>"; // 次月ボタン
        calendarHtml += "</tr>";
        // 曜日のヘッダーを追加、ヘッダーは<th>
        calendarHtml += "<tr>";
        calendarHtml += "<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>";
        calendarHtml += "</tr>";

        var dayCounter = 1;
        for (var i = 0; i < 42; i++) { // 6 weeks * 7 days
            if (i >= firstDayOfWeek && dayCounter <= daysInMonth) {
                var highlightClass = "";
                // 今日の日付のセルにhighlightクラスを追加
                if (dayCounter === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    // このハイライトがcssで呼び出され当日の色を変えている
                    highlightClass = "highlight";
                }
                // 日付のセルを追加
                calendarHtml += "<td class='" + highlightClass + "'>" + dayCounter + "</td>";
                dayCounter++;
            } else {
                // 空のセルを追加
                calendarHtml += "<td></td>";
            }
            if ((i + 1) % 7 === 0) {
                calendarHtml += "</tr>";
                if (dayCounter > daysInMonth) break;
                calendarHtml += "<tr>";
            }
        }

        calendarHtml += "</table>";
        // カレンダーを更新
        calendarDiv.innerHTML = calendarHtml;

        // 前月ボタンのクリックイベントリスナー
        document.getElementById("prev").addEventListener("click", function() {
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            // カレンダーを再描画する
            renderCalendar(year, month);
        });

        // 次月ボタンのクリックイベントリスナー
        document.getElementById("next").addEventListener("click", function() {
            month++;
            if (month > 11) {
                // 1月を超えた場合、年を増やす
                month = 0;
                year++;
            }
            // カレンダーを再描画する
            renderCalendar(year, month);
        });
        
        document.getElementById("today").addEventListener("click",function(){
			year = today.getFullYear();
			month = today.getMonth();
			
			renderCalendar(year, month);
		})
    }

    // 月の名前を取得する関数
    function getMonthName(month) {
        var months = ["1 . ", "2 . ", "3 . ", "4 . ", "5 . ", "6　. ", "7 . ", "8 . ", "9 . ", "10 . ", "11 . ", "12 . "];
        return months[month];
    }

});




