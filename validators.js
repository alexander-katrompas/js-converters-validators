"use strict";

function charIsDigit(charCode) {
    charCode = parseInt(charCode);
    if (charCode >= 48 && charCode <= 57) {
        return true;
    } else {
        return false;
    }
}

function charIsAlpha(charCode) {
    charCode = parseInt(charCode);
    if ((charCode >= 65 && charCode <= 90) ||
            charCode >= 97 && charCode <= 122) {
        return true;
    } else {
        return false;
    }
}

function specialKey(keyCode, crlf) {
    keyCode = parseInt(keyCode);
    var ctrlChars = [
        8, /*backspace*/
        9, /*tab*/
        16, /*shift*/
        17, /*ctrl*/
        18, /*alt*/
        19, /*pause/break*/
        20, /*caps*/
        27, /*escape*/
        33, /*page up*/
        34, /*page down*/
        35, /*end*/
        36, /*home*/
        37, /*left*/
        38, /*up*/
        39, /*right*/
        40, /*down*/
        45, /*insert*/
        46  /*delete*/
    ];

    if (crlf) {
        ctrlChars.push([
            10, /*line feed*/
            12, /*form feed*/
            13/*carriage return*/]);
    }

    //console.log('special char: ' + keyCode);
    //console.log(ctrlChars.indexOf(keyCode));
    var ret = ctrlChars.indexOf(keyCode);
    if (ret === -1) {
        //console.log('did not find special');
        return false;
    } else {
        //console.log('found special');
        return true;
    }
}

function charIsBracket(charCode) {
    charCode = parseInt(charCode);
    if (charCode === 60 || charCode === 62 ||
            charCode === 91 || charCode === 93 ||
            charCode === 123 || charCode === 125) {
        return true;
    } else {
        return false;
    }
}

function equalStringNocaseNoempty(str1, str2) {
    if ((str1 !== str2) || (str1.length + str2.length === 0)) {
        return false;
    } else {
        return true;
    }
}

function validMoney(str) {
    return /^[\d]+(\.\d*)?$/.test(str);
}

function validAlphaSpaceDash(str) {
    var re = /^[a-zA-Z0-9\s_-]+$/;
    return re.test(str);
}

function validAlphaNum(str) {
    var re = /^[a-zA-Z0-9]+$/;
    return re.test(str);
}

function validAlpha(str) {
    var re = /^[a-zA-Z]+$/;
    return re.test(str);
}

function validNum(num) {
    return !isNaN(num);
}

function validNumStr(str) {
    var re = /^[0-9]+$/;
    return re.test(str);
}

function validNumSpace(str) {
    var re = /^[\s0-9]+$/;
    return re.test(str);
}

function validAlphaNumSpace(str) {
    var re = /^[\sa-zA-Z0-9]+$/;
    return re.test(str);
}

function validAlphaSpace(str) {
    var re = /^[\sa-zA-Z]+$/;
    return re.test(str);
}

function validAlphaNumDash(str) {
    var re = /^[a-zA-Z0-9-_]+$/;
    return re.test(str);
}

function validAlphaNumDashDot(str) {
    var re = /^[\w-.]+$/;
    return re.test(str);
}

function validAlphaNumDashDotSpace(str) {
    var re = /^[\s\w-.]+$/;
    return re.test(str);
}

function validAlphaNumDashSpace(str) {
    var re = /^[\sa-zA-Z0-9-_]+$/;
    return re.test(str);
}

function validAlphaNumSpacePunc(str) {
    var re = /^[a-zA-Z0-9\s-_\'"~.@%^&=*+,\/():;#$?!]+$/;
    return re.test(str);
}

function validDollarAmount(str) {
    var re = /^[0-9]*[.]\d\d$/;
    return re.test(str);
}

function numBetween(num, n1, n2, inclusive) {
    if (inclusive) {
        if ((num >= n1 && num <= n2) || (num >= n2 && num <= n1)) {
            return true;
        }
    } else {
        if ((num > n1 && num < n2) || (num > n2 && num < n1)) {
            return true;
        }
        return false;
    }
}

function validDateTime(dateTime) {
    var validDateTime = new Date(dateTime);

    //console.log(validDateTime.getTime());
    if (validDateTime.getTime()) {
        return true;
    } else {
        return false;
    }
}

function isFutureDateTime(futureDateTime, offsetDays) {
    var now = new Date();
    now.setDate(now.getDate() + offsetDays);

    var futureDateTime = new Date(futureDateTime);

    //console.log(validDateTime.getTime());
    if (futureDateTime.getTime() > now.getTime()) {
        return true;
    } else {
        return false;
    }
}

function isPastDateTime(pastDateTime) {
    var now = new Date();
    var pastDateTime = new Date(pastDateTime);

    //console.log(validDateTime.getTime());
    if (pastDateTime.getTime() < now.getTime()) {
        return true;
    } else {
        return false;
    }
}

function validDateFormat(date) {
    /*
     * TODO add other delimeters like - and .
     * Note, does not check valid numbers
     * use valid date for that
     */
    var regexp = /^\d{1,2}[/]\d{1,2}[/]\d{4}$/;
    return date.search(regexp);
}

function validDate(mo, da, yr) {
    //alert(mo + "/" + da + "/" + yr);

    switch (mo) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            //alert("31 days " + mo);
            if (!numBetween(da, 1, 31, 1))
                return false;
            break;

        case 4:
        case 6:
        case 9:
        case 11:
            //alert("30 days " + mo);
            if (!numBetween(da, 1, 30, 1))
                return false;
            break;

        case 2:
            var feb = 0;
            //alert("28 " + mo);
            if (yr % 4 !== 0)
                feb = 28;
            else if (yr % 400 === 0)
                feb = 29;
            else if (yr % 100 === 0)
                feb = 28;
            else
                feb = 29;
            if (!numBetween(da, 1, feb, 1))
                return false;
            break;
        default:
            return false;
    }
    return true;
}

function validName(name) {
    /*
     * assume a proper human name or a username
     * where - _ . are allowed, but not more than one in a row
     * must start and end with alphanum
     * must be at least 2 characters long
     * no spaces allowed. this is for usernames or single name
     */
    var result = false;
    if (name.length >= 2 && name.length <= 32) {
        var re = /^([a-z0-9]+[-_.])*[a-z0-9]+$/i;
        result = re.test(name);
    }
    return result;
}

function validToken(name) {
    /*
     * assume a token where -is allowed,
     * but not more than one in a row
     * must start and end with alphanum
     * must be at least 2 characters long
     * max of 32 chars. no spaces allowed.
     */
    var result = false;
    if (name.length >= 2 && name.length <= 32) {
        var re = /^([a-z0-9]+[-])*[a-z0-9]+$/i;
        result = re.test(name);
    }
    return result;
}

function validTokenStr(string) {

    var result = false;

    if (string.length >= 2) {
        var i;
        var re = /^([a-z0-9]+[-])*[a-z0-9]+$/i;
        var tokenArray = string.split(":");

        for (i = 0; i < tokenArray.length; ++i) {
            result = re.test(tokenArray[i]);
            //console.log(tokenArray[i] + ' : ' + result);
            if (!result) {
                break;
            }
        }
    }

    return result;
}

function validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validUrl(w) {
    var re = /^(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    return re.test(w);
}



