
    let DDate = function(selectorId){
            let _element=selectorId;
            const config={};
            let now = new Date();
            let currentDate = new Date();
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
            
            let _renderCal = function(selectorId,cb,config){
                config.weekTitleLength = config && config.weekTitleLength ? config.weekTitleLength: 10;
                config.selectCurrentDate = config && config.selectCurrentDate ? config.selectCurrentDate: false;
                config.exclude = config.exclude ? config.exclude : false;
                config.disableEndDates = config && config.disableEndDates ? config.disableEndDates : false;
                config.disableFutureDates = config && config.disableFutureDates ? config.disableFutureDates : false;
                
                let data = _fullMonthCalendar();
                let currentSelectedMonth = data.month;
                let currentSelectedYear = data.year;
                let counter=0, weekLength=7;
                let row;
                let selector = "#"+selectorId;
                let isCurrentDate = false;

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
                        if(currentSelectedMonth<2){
                            currentSelectedMonth=12;
                            currentSelectedYear--;
                        }else{
                            currentSelectedMonth--;
                        }
                        container.innerHTML="";
                        _setDate(01,currentSelectedMonth,currentSelectedYear);
                        _renderCal(selectorId,cb,config);
                    });
                })();

                 
                (function next(){
                    //Previous Month Click Functionality
                    nextMonth.innerHTML=">";
                    nextMonth.setAttribute("class","nextMonth");
                    nextMonth.addEventListener("click",function(data){
                        currentSelectedMonth++
                        if(currentSelectedMonth>12){
                            currentSelectedMonth=1;
                            currentSelectedYear++;
                        }
                        container.innerHTML="";
                        _setDate(01,currentSelectedMonth,currentSelectedYear);
                        _renderCal(selectorId,cb,config);
                    });
                })();
                
                controlRow.appendChild(nextMonth);
                tableBody.appendChild(controlRow);

                var initialrow = document.createElement("tr");
                let sunday = document.createElement("td");
                sunday.innerHTML="Sunday".slice(0,config.weekTitleLength);
                initialrow.appendChild(sunday);
                let monday = document.createElement("td");
                monday.innerHTML="Monday".slice(0,config.weekTitleLength);
                initialrow.appendChild(monday);
                let tuesday = document.createElement("td");
                tuesday.innerHTML="Tuesday".slice(0,config.weekTitleLength);
                initialrow.appendChild(tuesday);
                let wednesday = document.createElement("td");
                wednesday.innerHTML="Wednesday".slice(0,config.weekTitleLength);
                initialrow.appendChild(wednesday);
                let thursday = document.createElement("td");
                thursday.innerHTML="Thursday".slice(0,config.weekTitleLength);
                initialrow.appendChild(thursday);
                let friday = document.createElement("td");
                friday.innerHTML="Friday".slice(0,config.weekTitleLength);
                initialrow.appendChild(friday);
                let saturday = document.createElement("td");
                saturday.innerHTML="Saturday".slice(0,config.weekTitleLength);
                initialrow.appendChild(saturday);
                tableBody.appendChild(initialrow);

                table.appendChild(tableBody);
                container.appendChild(table);    
                
                
                 row = document.createElement("tr");

                // for (let j = 0; j < 7; j++) {
                //     var cell = document.createElement("td");
                //     var cellText = document.createTextNode(" ");
                //     cell.appendChild(cellText);
                //     row.appendChild(cell);
                //     //counter=j;
                // }


                tableBody.appendChild(row);
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
                        if(config.selectCurrentDate){
                            if(value.date===currentDate.getDate() && data.month===currentDate.getMonth()+1 && data.year===currentDate.getFullYear()){
                                cell.setAttribute("class", "defaultSelect"); 
                                document.getElementById(_element).value = _currentDate(config, new Date(data.year, value.month-1, value.date));
                            }
                        }

                        if(value.date===currentDate.getDate() && data.month===currentDate.getMonth()+1 && data.year===currentDate.getFullYear()){
                            isCurrentDate = true;
                        }

                        let cbb = function(){
                            cb(_currentDate(config,new Date(value.year,value.month-1,value.date)));
                        };

                        cell.addEventListener("click",cbb);

                        if(config.disableEndDates && !isCurrentDate){
                            cell.setAttribute("class", "mute");
                            cell.removeEventListener("click",cbb);
                        }

                        if(config.exclude){
                            config.exclude.forEach(function(val, index){
                                if(data.month===val.month && value.date===val.date && data.year===val.year){
                                    cell.setAttribute("class", "mute");
                                    cell.removeEventListener("click",cbb);
                                }
                            })
                        }

                        if(config.disableFutureDates && isCurrentDate && value.date!==currentDate.getDate()){
                            cell.setAttribute("class", "mute");
                            cell.removeEventListener("click",cbb);
                        }

                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        tableBody.appendChild(row);
                        counter++;
                });

                let lastRow = document.querySelector("#"+selectorId+" table tr:last-child");
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
                _currentMonth.date = now.getDate();
        
                 if(now.getMonth()===1){
                    month = calendar.month[now.getMonth()].days();
                 }else{
                    month = calendar.month[now.getMonth()].days;
                 }
        
                for(i=1;i<=month;i++){
                    _fullMonthCalendarData.push({"date":i,"day":calendar.weekdays[_getSetDay(i)],"month":now.getMonth()+1,"year":now.getFullYear()});
                }
                _currentMonth.isLeapYear = month===29?true:false;
                _currentMonth.year = now.getFullYear();
                _currentMonth.fullMonth = calendar.month[now.getMonth()].month;
                _currentMonth.month = now.getMonth()+1;
                _currentMonth.calander = _fullMonthCalendarData;
                return _currentMonth;
             },
        
            _currentDate = function(obj, dateObj){
                //obj is a date format
                //dateObj is date object
                let now = new Date();
                dateObj = dateObj ? dateObj : now;
                if(obj && obj.dateFormat){
                    dateFormat= obj.dateFormat
                }else{
                    return dateObj;
                }
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

            _datePicker = function(config){
                let s = document.getElementById(_element);
                let top = s.offsetHeight+s.offsetTop;
                let left = s.offsetLeft;
                let container = document.createElement("div");
                container.setAttribute("id",selectorId+"datePickerContainer");
                container.setAttribute("style","display:none");
                document.body.appendChild(container);
                _renderCal(selectorId+"datePickerContainer",function(data){
                    document.querySelector("#"+selectorId).value=data;
                    let a = document.querySelector("#"+selectorId+"datePickerContainer");
                    a.setAttribute("style","display:none");
                    let success = config.success ? config.success : ()=>{};
                    document.getElementById(_element)
                    success(data);
                },config);
                let field = document.querySelector("#"+selectorId);
                let sd = document.querySelector("#"+selectorId+"datePickerContainer");
                field.addEventListener("focus",function(){
                    sd.setAttribute("style","display:block; top:"+top+"px");
                });
                field.addEventListener("blur",function(){
                });
            },
            
            _subDate = function(subDays, selectedDate){
                subDays = subDays * -1;
                return _addDays(subDays, selectedDate);
            }
            
            _renderCalander = function(config){
                console.log(config);
                config = config ? config : {};
                let cb = config && config.actionCallback ? config.actionCallback : function(data){console.log(data)};
                _renderCal(selectorId,cb,config);

            };

            (function eventsTriggering(){
                document.addEventListener("click",function(event){
                if(event.target.type!=="text" &&
                event.target.className !== "nextMonth" &&
                event.target.className !== "previousMonth" &&
                event.target.className !=="monthHeading" &&
                event.target.className !== "mute"){
                        let containerVisibility = document.querySelector("#datePickerdatePickerContainer").style.display;
                        if(event.target.id!=="datePickerdatePickerContainer"){
                            if(containerVisibility==="block"){
                            document.querySelector("#datePickerdatePickerContainer").style.display = "none";   
                            }
                        }  
                }
                });
            })();

            return {
                now : _currentDate,
                diff:_differenceDate,
                add:_addDays,
                sub:_subDate,
                fullMonthCalendar:_fullMonthCalendar, // Remove later
                renderCalander:_renderCalander,
                datePicker:_datePicker
            }
            
        };
        
        

        console.log(DDate().now({dateFormat:"m, DD YYYY"}));
        console.log(DDate().now({dateFormat:"DD m YYYY"}));
        console.log(DDate().now({dateFormat:"MM/DD/YYYY hh:mm:ss ap"}));
        console.log(DDate().now({dateFormat:"d MM/DD/YYYY hh:mm:ss ap"}));
        console.log(DDate().now({dateFormat:"hh:mm:ss ap"}));
        console.log(DDate().fullMonthCalendar());
        
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
