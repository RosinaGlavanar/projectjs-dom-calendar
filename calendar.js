// On Load of the window
window.onload = function(){
  
// Start calendar
  var c = new Calendar({
    ParentID:"divcalendartable",
    DaysOfWeek: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    Months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    Format:'dd/mm/yyyy'
  });
  c.showCurrent();
  
// Next and previous button clicks
  getId('btnPrev').onclick = function(){
    c.previousMonth();
  };

  getId('btnNext').onclick = function(){
    c.nextMonth();
  };


  getId('btnPrevYr').onclick = function(){
    c.previousYear();
  };

  getId('btnNextYr').onclick = function(){
    c.nextYear();
  }; 
}


// Get element by id
function getId(id) {
  return document.getElementById(id);
}

var Calendar = function(el){
  //Store div id
  this.divId = el.ParentID;

  // Days of week, starting on Monday
  this.DaysOfWeek = el.DaysOfWeek;

  // Months, starting on January
  this.Months = el.Months;

  // Set the current month, year
  var d = new Date();
  this.CurrentDay = d.getDay();
  this.CurrentMonth = d.getMonth();
  this.CurrentYear = d.getFullYear();

  var f = el.Format;

  if(typeof(f) == 'string'){
    this.f = f.charAt(0).toUpperCase();
  }else{
    this.f = 'M';
  }
};


// Goes to next month
Calendar.prototype.nextMonth = function(){
  if(this.CurrentMonth == 11){
    this.CurrentMonth = 0;
    this.CurrentYear = this.CurrentYear + 1;
  }else{
    this.CurrentMonth = this.CurrentMonth + 1;
  }
  this.showCurrent();
};

// Goes to previous month
Calendar.prototype.previousMonth = function(){
  if(this.CurrentMonth == 0){
    this.CurrentMonth = 11;
    this.CurrentYear = this.CurrentYear - 1;
  }else{
    this.CurrentMonth = this.CurrentMonth - 1;
  }
  this.showCurrent();
};


// Goes to next year 
Calendar.prototype.nextYear = function(){
  this.CurrentYear = this.CurrentYear + 1;
  this.showCurrent();
} 

// Goes to previous year 
Calendar.prototype.previousYear = function(){
  this.CurrentYear = this.CurrentYear - 1;
  this.showCurrent();
}             


// Show current day
Calendar.prototype.showCurrent = function(){
  this.Calendar(this.CurrentYear, this.CurrentMonth, this.CurrentDay);
};

// Show current month
Calendar.prototype.showCurrent = function(){
  this.Calendar(this.CurrentYear, this.CurrentMonth);
};

// Show year, month, day
Calendar.prototype.Calendar = function(year, month, day){
  typeof(year) == 'number' ? this.CurrentYear = year : null;
  typeof(year) == 'number' ? this.CurrentMonth = month : null;
  typeof(year) == 'number' ? this.CurrentDay = day : null;


  // 1st day of the selected month
  var firstDayOfCurrentMonth = new Date(year, month, 1).getDay();

  // Last date of the selected month
  var lastDateOfCurrentMonth = new Date(year, month+1, 0).getDate();

  // Last day of the previous month
  var lastDateOfLastMonth = month == 0 ? new Date(year-1, 11, 0).getDate() : new Date(year, month, 0).getDate();

  // Write selected month and year. This HTML goes into <div id="month"></div>
  var monthandyearhtml = '<span id="monthandyearspan">' + this.Months[month] + ' - ' + year + '</span>';

  var html = '<table class="table table-bordered">';


  // Write the header of the days of the week
  html += '<tr>';
  var style = "";
  for(var i=0; i < 7; i++) {
    html += '<th class="daysheader">' + this.DaysOfWeek[i] + '</th>';
  }
  html += '</tr>';

  var prev = dm = this.f == 'M' ? 1 : firstDayOfCurrentMonth == 0 ? -5 : 2;

  var cellvalue;

  for(var date, i=0, j=0; j<6; j++){
    html += '<tr>';

    for(var ja = 0; ja < 7; ja++){
      date = i + dm - firstDayOfCurrentMonth;

      // Dates from prev month
      if(date < 1){
        cellvalue = lastDateOfLastMonth - firstDayOfCurrentMonth + prev++;
        html += '<td style="opacity: 0.3;" id="prevmonthdates">' + '<span id="cellvaluespan">'
        + (cellvalue) + '</span><br/>' + '</td>';

      // Dates from next month
      }else if(date > lastDateOfCurrentMonth){
        html += '<td style="opacity: 0.3;" id="nextmonthdates">' + (prev++) + '</td>';

      // Current month dates
      }else{
          if(date ==  new Date().getUTCDate()
          && month == new Date().getUTCMonth()
          && year == new Date().getUTCFullYear()){
          style = "style='color:blue;'"
          }
        html += '<td id="currentmonthdates" ' + style + ' >' + (date) + '</td>';
        style = ""
        prev = 1;
      }
      
      if(i % 7 == 6 && date >= lastDateOfCurrentMonth){
        j = 10; // no more rows
      }
      i++;
    }
    html += '</tr>';
  }

  // Closes table
  html += '</table>';

  document.getElementById("monthandyear").innerHTML = monthandyearhtml;
  document.getElementById(this.divId).innerHTML = html;
};