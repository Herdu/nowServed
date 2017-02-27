/**
 * Created by mateusz on 27.02.17.
 */



var Controller = function(){


    this.sendMyCommand = function (name,value){
        sendCommand("eris.signage.me", "biuro@lokalmedia.pl", "lokalmedia14378", "608", name, value);
    }

    this.served = [];


    this.update = function(){
        console.log("update");
        this.served = [];
        var children = document.getElementById("ready").children;

        console.log("ile dziecki: " + children.length);
        for (i=0; i<children.length; i++)
        {
            this.served.push(children[i].getAttribute("number"));
        }
        console.log(this.served);
        this.setValue();
    }



    this.changeToQueue = function(){
        this.sendMyCommand("ev2","");
    }

    this.changeToCampaign = function(){
        this.sendMyCommand("ev1","");
    }


    this.setValue = function(){

        if (this.served.length> 0) this.changeToQueue();
        else
            this.changeToCampaign();

        console.log(this.served);
        var string = "Gotowe: ";

        for (i=0; i<this.served.length; i++)
        {
            string+= this.served[i] + ', ';
        }

        string = string.slice(0, string.length-2);

        $('#gotowe').html(string);

        this.sendMyCommand("setValue",string);
    }

}



var sendMyCommand = function (name,value){
    sendCommand("eris.signage.me", "biuro@lokalmedia.pl", "lokalmedia14378", "608", name, value);
}


var controller = new Controller();



$(document).ready(function()
{

    $("#btn4").click(
        function()
        {
            controller.addServed();
        });

    $("#btn5").click(
        function()
        {
            controller.removeServed();
        });

    controller.changeToCampaign();

});






function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    if (ev.target.id !== "div1" && ev.target.id !== "ready")
        return;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    controller.update();
}










