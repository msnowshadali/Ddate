# DDate - Dynamic DatePicker

This date picker provides an easy way of creating both single and multi-viewed calendars capable of accepting single, range, and multiple selected dates.  Easy to style, with two example styles provided: an attractive 'dark' style, and a Google Analytics-like 'clean' style.


## Quick start

Download and include the files [ddate.css](https://msnowshadali.github.io/Ddate/ddate.css), [ddate.js](https://msnowshadali.github.io/Ddate/ddate.js).

    <script type="text/javascript" src="ddate.js"></script>
    <link rel="stylesheet" media="screen" type="text/css" href="ddate.css" />
    
    Add the container in HTML Document
    <div id="simple-calendar"></div>
    
    Add in your script file to initate on page load
    <script type="text/javascript">
      DDate("datePicker").datePicker({
        dateFormat:"DD/m/YYYY",
        weekTitleLength:3,
        selectCurrentDate:true,
        success:function(data){
            console.log(data);
        },
        exclude:[{
            month:05,
            date:01,
            year:2018
        },
        {
            month:05,
            date:05,
            year:2018
        }],
        showPreviousMonth:true
    });
    </script>

<img src="https://github.com/msnowshadali/Ddate/blob/master/sample/images/calendar.png" width="250" />

Take a look at the [sample implimentation](https://codepen.io/uSoftwares/pen/OZewNK) for live, and additional examples.  Then visit the [API reference page](https://msnowshadali.github.io/Ddate/reference.html).

## Bug tracker

Have a bug? Please create an issue here on GitHub!

https://github.com/msnowshadali/Ddate/issues

## Changelog

#### 1.0.0 - 05/23/2018 ####
* Initial Release

## License/Credits

