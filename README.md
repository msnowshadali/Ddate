# DDate - Dynamic DatePicker

This date picker provides an easy way of creating both single and multi-viewed calendars capable of accepting single, range, and multiple selected dates.  Easy to style, with two example styles provided: an attractive 'dark' style, and a Google Analytics-like 'clean' style.


## Quick start

Download and include the files [ddate.css](https://msnowshadali.github.io/Ddate/ddate.css), [ddate.js](https://msnowshadali.github.io/Ddate/ddate.js).

    <script type="text/javascript" src="ddate.js"></script>
    <link rel="stylesheet" media="screen" type="text/css" href="ddate.css" />
    
    Add the container in HTML Document
    <input type="text" id="datepicker" />
    
    Add in your script file to initate on page load
    <script type="text/javascript">
      DDate("datepicker").datePicker({
        dateFormat:"DD/m/YYYY",
        weekTitleLength:3,
        selectCurrentDate:false,
        multiSelect:true, // Pending
        success:function(data){
            console.log(data);
        },
        exclude:[{
            month:12,
            date:31,
            year:2018
        },
        {
            month:01,
            date:01,
            year:2019
        }],
        showPreviousMonth:true,
        disableEndDates:false,
        disableFutureDates:true
    });
    </script>

<img src="https://github.com/msnowshadali/Ddate/blob/master/sample/images/calendar.png" width="250" />

Take a look at the [sample implimentation](https://codepen.io/uSoftwares/pen/OZewNK) for live, and additional examples.  Then visit the [API reference page](https://msnowshadali.github.io/Ddate/reference.html).

## Props
| Prop | Type | Description |
:------------ |:---------------| :-----|
| **`dateFormat`** | `String` | Required. Ex. "DD/m/YYYY" |
| **`weekTitleLength`** | `Number` | optional. its used to set the week length  |
| **`selectCurrentDate`** | `Boolean` | sets default date on initilize  |
| **`success`** | `Function` | Optional. Success callback|
| **`exclude`** | `Object` | Optional. disable few dates, its not clickable  |
| **`disableEndDates`** | `Boolean` | Optional. Disable all previous ended dates comparing to the current date |
| **`disableFutureDates`** | `Boolean` | Optional. Disable all future ended dates comparing to the current date |

## Bug tracker

Have a bug? Please create an issue here on GitHub!

https://github.com/msnowshadali/Ddate/issues

## Changelog

#### 1.0.0 - 05/23/2018 ####
* Initial Release

## License/Credits

