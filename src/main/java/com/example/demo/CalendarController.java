// CalendarController.java

package com.example.demo;

import java.time.LocalDate;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CalendarController {

    @GetMapping("/")
    public String showCalendar(Model model) {
        // 今日の日付を取得PCから取得
    	// LocalDate型　today変数 = LocalDate.now();
        LocalDate today = LocalDate.now();

        // カレンダーのHTMLを生成
        StringBuilder calendarHtml = new StringBuilder();
        calendarHtml.append("<table>");
        calendarHtml.append("<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>");
        
        // 月初めの日付を取得
        LocalDate firstDayOfMonth = today.withDayOfMonth(1);
        int daysInMonth = firstDayOfMonth.lengthOfMonth();
        int dayOfWeek = firstDayOfMonth.getDayOfWeek().getValue(); // 1 (Monday) to 7 (Sunday)

        // 空のセルを追加
        calendarHtml.append("<tr>");
        for (int i = 1; i < dayOfWeek; i++) {
            calendarHtml.append("<td></td>");
        }

        // 日付を追加
        for (int day = 1; day <= daysInMonth; day++) {
            calendarHtml.append("<td>").append(day).append("</td>");
            if (dayOfWeek == 7) {
                calendarHtml.append("</tr><tr>");
                dayOfWeek = 1;
            } else {
                dayOfWeek++;
            }
        }

        // 空のセルを追加
        for (int i = dayOfWeek; i <= 7; i++) {
            calendarHtml.append("<td></td>");
        }
        calendarHtml.append("</tr>");
        calendarHtml.append("</table>");

        model.addAttribute("calendar", calendarHtml.toString());

        return "calendar";
    }
}

