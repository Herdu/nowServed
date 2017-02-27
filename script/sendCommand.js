/**
 * Created by mateusz on 27.02.17.
 */

function includeJS(incFile)
{
    document.write('<script type="text/javascript" src="' + incFile+ '"></scr' + 'ipt>');
}

includeJS("https://secure.dynawebs.net/_msportal/_js/_mobile/jquery-1.9.1.js");
includeJS("https://secure.dynawebs.net/_msportal/_js/jquery.base64.js");

var userMap = {};
var userpass64 = "";

function sendCommand(i_domain, i_user, i_password, i_stationId, i_senderName, i_param)
{
    console.log("send command");
    if (i_param==undefined)
    {
        i_param = "";
    }
    //alert(i_param);
    var userDomain = userMap[i_user];
    if (userDomain==null)
    {
        var userPass = i_user+","+i_password;
        var param = $.base64.encode(userPass);
        param = param.replace(/=/g, ".");
        param = param.replace(/[+]/g, "_");
        userpass64 = param.replace(/[/]/g, "-");


        var url1= 'https://galaxy.signage.me/WebService/getUserDomain.ashx?i_userpass='+userpass64+'&callback=?';

        //var url1 = 'https://' + i_domain + '/WebService/getUserDomain.ashx?i_user=' + i_user + '&i_password=' + i_password + '&callback=?';
        //alert(url1);
        $.getJSON(url1, onUserDomain);
    }
    else
    {
        send();
    }

    function onUserDomain(myData)
    {
        userDomain = myData.domain;
        userMap[i_user] = userDomain;
        //alert(userDomain);
        send();
    }

    function send()
    {
        var url2= 'http://' + userDomain + '/WebService/sendCommand.ashx?i_userpass=' + userpass64 + '&i_stationId=' + i_stationId + '&i_command=event' + '&i_param1=' + i_senderName + '&i_param2=' + i_param + '&callback=?';
        //alert(url2);
        $.getJSON(url2, onSendCommand);
    }

    function onSendCommand(myData)
    {
        //alert("onSendCommand");
    }
}