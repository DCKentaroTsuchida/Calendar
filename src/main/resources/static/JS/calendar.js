document.addEventListener("DOMContentLoaded", function() {
    var calendarDiv = document.getElementById("calendar");
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var counters = {};

    renderCalendar(year, month);

    function renderCalendar(year, month) {
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var firstDayOfWeek = new Date(year, month, 1).getDay();
        var calendarHtml = "<table class='calendar'>";
        calendarHtml += "<tr><th colspan='7'>" + getMonthName(month) + " " + year + "</th></tr>";
        calendarHtml += "<tr>";
        calendarHtml += "<th class='prev' id='prev'>&#10094;</th>";
        calendarHtml += "<th colspan='5'><button id='today'>Back to the Today</button></th>";
        calendarHtml += "<th class='next' id='next'>&#10095;</th>";
        calendarHtml += "</tr>";
        calendarHtml += "<tr>";
        calendarHtml += "<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>";
        calendarHtml += "</tr>";

        var dayCounter = 1;
        // カレンダーに必要な6週分(曜日も含まれる)のセルは7×6の42コであるため
        for (var i = 0; i < 42; i++) {
            if (i >= firstDayOfWeek && dayCounter <= daysInMonth) {
                var highlightClass = "";
                if (dayCounter === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    highlightClass = "highlight";
                }
                var dateKey = `${year}-${month + 1}-${dayCounter}`;
                counters[dateKey] = counters[dateKey] || { counter1: 0, counter2: 0 };
                //数あるカウンターキーの中で今日編集するカウンターキーを表している
                calendarHtml += `<td class='${highlightClass}'>
                                    ${dayCounter}
                                    <span class='counter1' id='counter1-${dateKey}'>${counters[dateKey].counter1}</span>
                                    <span class='counter2' id='counter2-${dateKey}'>${counters[dateKey].counter2}</span>
                                </td>`;
                dayCounter++;
            } else {
                calendarHtml += "<td></td>";
            }
            if ((i + 1) % 7 === 0) {
                calendarHtml += "</tr>";
                if (dayCounter > daysInMonth) break;
                calendarHtml += "<tr>";
            }
        }

        calendarHtml += "</table>";
        calendarDiv.innerHTML = calendarHtml;

        document.getElementById("prev").addEventListener("click", function() {
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            renderCalendar(year, month);
        });

        document.getElementById("next").addEventListener("click", function() {
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
            renderCalendar(year, month);
        });

        document.getElementById("today").addEventListener("click", function() {
            year = today.getFullYear();
            month = today.getMonth();
            renderCalendar(year, month);
        });

        document.getElementById("button1").addEventListener("click", function() {
            var dateKey = `${year}-${month + 1}-${today.getDate()}`;
            // カウンターの値を増やす
            counters[dateKey].counter1++;
            document.getElementById(`counter1-${dateKey}`).innerText = counters[dateKey].counter1;
        });

        document.getElementById("button2").addEventListener("click", function() {
            var dateKey = `${year}-${month + 1}-${today.getDate()}`;
            // カウンターの値を増やす
            counters[dateKey].counter2++;
            document.getElementById(`counter2-${dateKey}`).innerText = counters[dateKey].counter2;
        });
        
        document.getElementById("delButton1").addEventListener("click", function() {
            var dateKey = `${year}-${month + 1}-${today.getDate()}`;
            // カウンターの値を減らす
            if(counters[dateKey].counter1 > 0){
				counters[dateKey].counter1--;
	            document.getElementById(`counter1-${dateKey}`).innerText = counters[dateKey].counter1;
			}
        });
        
        document.getElementById("delButton2").addEventListener("click", function() {
            var dateKey = `${year}-${month + 1}-${today.getDate()}`;
            // カウンターの値を減らす
            if(counters[dateKey].counter2 > 0){
				counters[dateKey].counter2--;
	            document.getElementById(`counter2-${dateKey}`).innerText = counters[dateKey].counter2;
			}
        });
    }

    function getMonthName(month) {
        var months = ["1 . ", "2 . ", "3 . ", "4 . ", "5 . ", "6 . ", "7 . ", "8 . ", "9 . ", "10 . ", "11 . ", "12 . "];
        return months[month];
    }
});

