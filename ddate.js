

        let DDate = function(){
            let now = new Date();
            let calendar = {
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
            },
        
             _setDate = function(dd,mm,yyyy){
                now.setDate(dd);
                now.setMonth(mm-1);
                now.setFullYear(yyyy);
            };
        
            //_setDate(01,04,1985);

            let _renderCalander = function(){

                let data = _fullMonthCalendar();
                let currentSelectedMonth = data.month;
                let currentSelectedYear = data.year;
                let counter=0, weekLength=7;
                let row;
                let selector = "#cala";

                let container = document.querySelector(selector);
                let table = document.createElement("table");
                let tableBody = document.createElement("tbody");
                let monthYear = document.createElement("th");
                let controlRow = document.createElement("tr");
                let previousMonth = document.createElement("th");
                let nextMonth = document.createElement("th");

                monthYear.innerHTML=data.fullMonth+", "+data.year;
                monthYear.setAttribute("colspan", "5");
                monthYear.setAttribute("class","monthHeading");
                controlRow.appendChild(previousMonth);
                controlRow.appendChild(monthYear);

                
                (function previous(){
                    //Previous Month Click Functionality
                    previousMonth.innerHTML="<";
                    previousMonth.setAttribute("class","previousMonth");
                    previousMonth.addEventListener("click",function(){
                        if(currentSelectedMonth<1){
                            currentSelectedMonth=11;
                            currentSelectedYear--;
                            
                        }else{
                            currentSelectedMonth--;
                        }
                        container.innerHTML="";
                        _setDate(01,currentSelectedMonth+1,currentSelectedYear);
                        _renderCalander();
                    });
                })();

                 
                (function next(){
                    //Previous Month Click Functionality
                    nextMonth.innerHTML=">";
                    nextMonth.setAttribute("class","nextMonth");
                    nextMonth.addEventListener("click",function(data){
                        if(currentSelectedMonth>10){
                            currentSelectedMonth=0;
                            currentSelectedYear++;
                        }else{
                            currentSelectedMonth++;
                        }

                        container.innerHTML="";
                        _setDate(01,currentSelectedMonth+1,currentSelectedYear);
                        _renderCalander();
                    });
                })();
                
                controlRow.appendChild(nextMonth);
                tableBody.appendChild(controlRow);

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
                tableBody.appendChild(initialrow);

                table.appendChild(tableBody);
                container.appendChild(table);    
                
                row = document.createElement("tr");
                for (let j = 1; j < calendar.weekdays.indexOf(data.calander[0].day)+1; j++) {
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(" ");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    counter=j;
                }
                tableBody.appendChild(row);
                table.setAttribute("class", "ddate");

                data.calander.forEach(function(value, index){
                    if(counter==weekLength){
                        counter=0;
                        row = document.createElement("tr");
                    }
                    var cell = document.createElement("td");
                        var cellText = document.createTextNode(value.date);
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        tableBody.appendChild(row);
                        counter++;
                });

                let lastRow = document.querySelector("#cala table tr:last-child");
                while(weekLength-lastRow.cells.length){
                        let cell = document.createElement("td");
                        let cellText = document.createTextNode(" ");
                        cell.appendChild(cellText);
                        lastRow.appendChild(cell);
                }
            },
            
            _getSetDay = function(date){
                now.setDate(date);
                return  now.getDay();
            },
           
            _nowDate = function(now){
                return now.getDate();
            },
        
            _nowMonth = function(now){
                let month = now.getMonth()+1;
                return month<10 ? month = "0"+month.toString() : month;
            },
        
            _nowFullMonth = function(now){
                return calendar.month[now.getMonth()].month;
            },
        
            _nowDay = function(now){
                return calendar.weekdays[now.getDay()];
            },
        
            _nowYear = function(now){
                return now.getFullYear();
            },
        
            _getFullHours = function(now){
                return now.getHours();
            },
        
            _getHours = function(now){
                return now.getHours()<12?now.getHours():now.getHours()-12;
            },
        
            _getMinutes = function(now){
                return now.getMinutes();
            },
        
            _getSeconds = function(now){
                let seconds = now.getSeconds();
                return seconds<10 ? seconds = "0"+seconds.toString() : seconds;
            },
        
            _getMeridiem = function(now){
                return (_getFullHours(now) > 11) ? "PM" : "AM";
            },
        
             _fullMonthCalendar = function(){
                let _fullMonthCalendarData = [];
                let _currentMonth = {};
                let month;
        
                 if(now.getMonth()===1){
                    month = calendar.month[now.getMonth()].days();
                 }else{
                    month = calendar.month[now.getMonth()].days;
                 }
        
                for(i=1;i<=month;i++){
                    _fullMonthCalendarData.push({"date":i,"day":calendar.weekdays[_getSetDay(i)]});
                }
                _currentMonth.isLeapYear = month===29?true:false;
                _currentMonth.year = now.getFullYear();
                _currentMonth.fullMonth = calendar.month[now.getMonth()].month;
                _currentMonth.month = now.getMonth();
                _currentMonth.calander = _fullMonthCalendarData;
                return _currentMonth;
             },
        
            _currentDate = function(obj, dateObj){
                let now = new Date();
                dateObj = dateObj ? dateObj : now;
                dateFormat=obj.dateFormat;
                dateFormat = dateFormat.replace("DD",_nowDate(dateObj).toString());
                dateFormat = dateFormat.replace("MM",_nowMonth(dateObj).toString());
                dateFormat = dateFormat.replace("YYYY",_nowYear(dateObj).toString());
                dateFormat = dateFormat.replace("yy",_nowYear(dateObj).toString().slice(2,4));
                dateFormat = dateFormat.replace("hh",_getHours(dateObj).toString());
                dateFormat = dateFormat.replace("HH",_getFullHours(dateObj).toString());
                dateFormat = dateFormat.replace("mm",_getMinutes(dateObj).toString());
                dateFormat = dateFormat.replace("ss",_getSeconds(dateObj).toString());
                dateFormat = dateFormat.replace("ss",_getSeconds(dateObj).toString());
                dateFormat = dateFormat.replace("ap",_getMeridiem(dateObj).toString());
                dateFormat = dateFormat.replace("m",_nowFullMonth(dateObj).toString());
                dateFormat = dateFormat.replace("d",_nowDay(dateObj).toString());
                return dateFormat;
            },

            _addDays = function(addDays, selectedDate){
                selectedDate = selectedDate ? selectedDate : _currentDate({dateFormat:"YYYY/MM/DD"});
                selectedDate = selectedDate.split("/");
                let startDate = new Date(parseInt(selectedDate[0]),parseInt(selectedDate[1])-1,selectedDate[2]);
                startDate.setDate(startDate.getDate()+addDays);
                return _currentDate({dateFormat:"MM/DD/YYYY"},startDate);
            },
            
            _differenceDate = function(startDate, endDate){
                
            },
            
            _subDate = function(subDays, selectedDate){
                subDays = subDays * -1;
                return _addDays(subDays, selectedDate);
            };

            return {
                now : _currentDate,
                diff:_differenceDate,
                add:_addDays,
                sub:_subDate,
                fullMonthCalendar:_fullMonthCalendar,
                renderCalander:_renderCalander
            }
            
        };
        
        DDate = DDate();
        DDate.renderCalander();

        console.log(DDate.now({dateFormat:"m, DD YYYY"}));
        console.log(DDate.now({dateFormat:"DD m YYYY"}));
        console.log(DDate.now({dateFormat:"MM/DD/YYYY hh:mm:ss ap"}));
        console.log(DDate.now({dateFormat:"d MM/DD/YYYY hh:mm:ss ap"}));
        console.log(DDate.now({dateFormat:"hh:mm:ss ap"}));
        console.log(DDate.fullMonthCalendar());

        // setInterval(function(){
        //     let liveTimeDate = DDate.now({dateFormat:"d MM/DD/YYYY hh:mm:ss ap"});
        //     document.querySelector("#liveDate").innerHTML = liveTimeDate;
        // },1000);
        
        
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
        */
