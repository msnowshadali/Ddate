

        let DDate = function(){
            let calender = {
                    month:{
                            0:{days:31,month:"January"},
                            1:{days:function(year){
                                return now.getFullYear()%4===0?29:28;
                            },month:"Febuary"},
                            2:{days:31,month:"March"},
                            3:{days:30,month:"April"},
                            4:{days:31,month:"May"},
                            5:{days:30,month:"June"},
                            6:{days:31,month:"July"},
                            7:{days:31,month:"August"},
                            8:{days:30,month:"September"},
                            9:{days:31,month:"October"},
                            10:{days:30,month:"November"},
                            11:{days:31,month:"December"}
                        },
                    weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
            };
        
            let now = new Date();
            
            let _setDate = function(dd,mm,yyyy){
                now.setDate(dd);
                now.setMonth(mm-1);
                now.setFullYear(yyyy);
            }
        
            //_setDate(01,12,2018);


            let _renderCalander = function(){

                let data = _fullMonthCalendar();
                let currentSelectedMonth = data.month;

                let body = document.querySelector("#cala");
                // creates a <table> element and a <tbody> element
                var tbl = document.createElement("table");
                var tblBody = document.createElement("tbody");
                
                var controlRow = document.createElement("tr");
                let previousMonth = document.createElement("td");
                previousMonth.innerHTML="<";
                controlRow.appendChild(previousMonth);
                let monthYear = document.createElement("td");
                monthYear.innerHTML=data.fullMonth+", "+data.year;
                monthYear.setAttribute("colspan", "5");
                controlRow.appendChild(monthYear);
                let nextMonth = document.createElement("td");
                nextMonth.innerHTML=">";

                previousMonth.addEventListener("click",function(){
                    if(currentSelectedMonth<1){
                        currentSelectedMonth=11;
                    }else{
                        currentSelectedMonth--;
                    }
                    body.innerHTML="";
                    _setDate(01,currentSelectedMonth+1,2018);
                    _renderCalander();
                });

                nextMonth.addEventListener("click",function(){
                    if(currentSelectedMonth>11){
                        currentSelectedMonth=1;
                    }else{
                        currentSelectedMonth++;
                    }

                    body.innerHTML="";
                    _setDate(01,currentSelectedMonth+1,2018);
                    _renderCalander();
                    //alert(currentSelectedMonth);
                });

                controlRow.appendChild(nextMonth);
                tblBody.appendChild(controlRow);

                var initialrow = document.createElement("tr");
                let sunday = document.createElement("td");
                sunday.innerHTML="Sunday";
                initialrow.appendChild(sunday);
                let monday = document.createElement("td");
                monday.innerHTML="Monday";
                initialrow.appendChild(monday);
                let tuesday = document.createElement("td");
                tuesday.innerHTML="Tuesday";
                initialrow.appendChild(tuesday);
                let wednesday = document.createElement("td");
                wednesday.innerHTML="Wednesday";
                initialrow.appendChild(wednesday);
                let thursday = document.createElement("td");
                thursday.innerHTML="Thursday";
                initialrow.appendChild(thursday);
                let friday = document.createElement("td");
                friday.innerHTML="Friday";
                initialrow.appendChild(friday);
                let saturday = document.createElement("td");
                saturday.innerHTML="Saturday";
                initialrow.appendChild(saturday);
                tblBody.appendChild(initialrow);

                tbl.appendChild(tblBody);
                body.appendChild(tbl);    
                
                let counter=0;

                let row;
                // creating all cells
                for (let i = 0; i < 1; i++) {
                    // creates a table row
                    row = document.createElement("tr");
                
                    for (let j = 1; j < calender.weekdays.indexOf(data.calander[0].day)+1; j++) {
                        var cell = document.createElement("td");
                        var cellText = document.createTextNode(" ");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        counter=j;
                    }
                
                    // add the row to the end of the table body
                    tblBody.appendChild(row);
                }

                
                

                tbl.setAttribute("border", "2");

                data.calander.forEach(function(value, index){
                    if(counter==7){
                        counter=0;
                        row = document.createElement("tr");
                    }
                    var cell = document.createElement("td");
                        var cellText = document.createTextNode(value.date);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        tblBody.appendChild(row);
                        counter++;
                });
                let lastRow = document.querySelector("#cala table tr:last-child");
                while(7-lastRow.cells.length){
                        let cell = document.createElement("td");
                        let cellText = document.createTextNode(" ");
                        cell.appendChild(cellText);
                        lastRow.appendChild(cell);
                    }
            }
            
            let getSetDay = function(date){
                now.setDate(date);
                return  now.getDay();
            }
           
            let _nowDate = function(){
                return now.getDate();
            }
        
            let _nowMonth = function(){
                let month = now.getMonth()+1;
                return month<10 ? month = "0"+month.toString() : month;
            }
        
            let _nowFullMonth = function(){
                return calender.month[now.getMonth()].month;
            }
        
            let _nowDay = function(){
                return calender.weekdays[now.getDay()];
            }
        
            let _nowYear = function(){
                return now.getFullYear();
            }
        
            let _getFullHours = function(){
                return now.getHours();
            }
        
            let _getHours = function(){
                return now.getHours()<12?now.getHours():now.getHours()-12;
            }
        
            let _getMinutes = function(){
                return now.getMinutes();
            }
        
            let _getSeconds = function(){
                let seconds = now.getSeconds();
                return seconds<10 ? seconds = "0"+seconds.toString() : seconds;
            }
        
            let _getMeridiem = function(){
                return (_getFullHours() > 11) ? "PM" : "AM";
            }
        
             _fullMonthCalendar = function(){
                let _fullMonthCalendarData = [];
                let _currentMonth = {};
                let month;
        
                 if(now.getMonth()===1){
                    month = calender.month[now.getMonth()].days();
                 }else{
                    month = calender.month[now.getMonth()].days;
                 }
        
                for(i=1;i<=month;i++){
                    _fullMonthCalendarData.push({"date":i,"day":calender.weekdays[getSetDay(i)]});
                }
                _currentMonth.isLeapYear = month===29?true:false;
                _currentMonth.year = now.getFullYear();
                _currentMonth.fullMonth = calender.month[now.getMonth()].month;
                _currentMonth.month = now.getMonth();
                _currentMonth.calander = _fullMonthCalendarData;
                return _currentMonth;
             }
        
            let _currentDate = function(obj){
                dateFormat=obj.dateFormat;
                dateFormat = dateFormat.replace("DD",_nowDate().toString());
                dateFormat = dateFormat.replace("MM",_nowMonth().toString());
                dateFormat = dateFormat.replace("YYYY",_nowYear().toString());
                dateFormat = dateFormat.replace("yy",_nowYear().toString().slice(2,4));
                dateFormat = dateFormat.replace("hh",_getHours().toString());
                dateFormat = dateFormat.replace("HH",_getFullHours().toString());
                dateFormat = dateFormat.replace("mm",_getMinutes().toString());
                dateFormat = dateFormat.replace("ss",_getSeconds().toString());
                dateFormat = dateFormat.replace("ss",_getSeconds().toString());
                dateFormat = dateFormat.replace("ap",_getMeridiem().toString());
                dateFormat = dateFormat.replace("m",_nowFullMonth().toString());
                dateFormat = dateFormat.replace("d",_nowDay().toString());
                return dateFormat;
            };

            _renderCalander();
        
            return {
                currentDate : _currentDate,
                now:now,
                fullMonthCalendar:_fullMonthCalendar
            }
            
        };
        
        DDate = new DDate();
        
        console.log(DDate.currentDate({dateFormat:"m, DD YYYY"}));
        console.log(DDate.currentDate({dateFormat:"DD m YYYY"}));
        console.log(DDate.currentDate({dateFormat:"MM/DD/YYYY hh:mm:ss ap"}));
        console.log(DDate.currentDate({dateFormat:"d MM/DD/YYYY hh:mm:ss ap"}));
        console.log(DDate.currentDate({dateFormat:"hh:mm:ss ap"}));
        
        console.log(DDate.fullMonthCalendar());
        
        /* Available Format
        m = January
        d = Wednesday
        yy = 18
        YYYY = 2018
        MM = 05
        DD = 16
        hh = 01
        HH = 13
        mm = 24
        ss = 05
        ap = AM/PM
        
        
        {
            month:"January",
            isLeapYear:false,
            calander:{
                1:"Sunday",
                2:"Monday"
            }
        }
        
        
        
        
        */