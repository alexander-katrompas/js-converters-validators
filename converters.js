"use strict";

function replaceWordChars(text) {
    var s = text;
    // smart single quotes and apostrophe
    s = s.replace(/[\u2018\u2019\u201A]/g, "\'");
    // smart double quotes
    s = s.replace(/[\u201C\u201D\u201E]/g, "\"");
    // ellipsis
    s = s.replace(/\u2026/g, "...");
    // dashes
    s = s.replace(/[\u2013\u2014]/g, "-");
    // circumflex
    s = s.replace(/\u02C6/g, "^");
    // open angle bracket
    s = s.replace(/\u2039/g, "<");
    // close angle bracket
    s = s.replace(/\u203A/g, ">");
    // right arrow
    s = s.replace(/\u2192/g, "-->");
    // left arrow
    s = s.replace(/\u2190/g, "<--");
    // spaces
    s = s.replace(/[\u02DC\u00A0]/g, " ");
    //tick marks
    s = s.replace(/`/g, "\'");
    return s;
}

function replaceBrackets(text) {
    return text.replace(/[\<\[\{]/g, '(').replace(/[\>\]\}]/g, ')');
}

function cleanWord(string) {
    /*
     * removed double spaces
     * removes all but 0-9, a-z, A-Z, _-.
     */
    return string.trim().replace(/\s\s+/g, ' ').replace(/[^ \w-.]/g, '');
}

function cleanStrictWord(string) {
    /*
     * removed double spaces
     * removes all but 0-9 a-z A-Z _ and space
     */
    return string.trim().replace(/\s\s+/g, ' ').replace(/[^ \w]/g, '');
}

function cleanText(string) {
    /*
     * removed double spaces
     * converts all brackets to parens
     * replaced word characters
     * relace 2 or more \n with \n
     */
    return this.replaceBrackets(this.replaceWordChars(string.trim())).replace(/ +/g, ' ').replace(/\n\n+/g, "\n\n");
}

function cleanDigit(string) {
    /*
     * removeds all but whole numbers
     * and removes leading zeros
     */
    return string.trim().replace(/[^0-9]/g, '').replace(/^0+/, '');
}

function cleanFloat(string) {
    /*
     * removeds all but whole numbers and decimal point
     */
    return string.replace(/[^0-9.]/g, '');
}

function cleanMoney(string) {
    /*
     * removeds all but whole numbers and decimal point
     * and removes leading zeros
     * returns string, not float
     */
    var clean_money = '0.00';
    var money = string.trim().replace(/[^0-9.]/g, '').replace(/^0+/, '');
    //converts to exactly 2 decimal points
    money = parseFloat(money) * 100;
    Math.round(money);
    money = money / 100;
    money = money.toFixed(2);
    //tests for $0.00
    if (/^[0-9]+\.[0-9]{0,2}$/.test(money)) {
        clean_final = money;
    }
    return clean_final;
}

function removeQueryURLParameters(url) {
    var urlparts = url.split('?');
    if (urlparts.length === 2) {
        url = urlparts[0];
    } else if (urlparts.length > 2) {
        url = '';
    }

    return url;
}
