
var info={
          HotelChain: 'Six Senses',
          HotelResort: 'Six Senses Yao Noi',
          Country: 'Thailand'
}

function change(x)
{
    var y=x.parentNode;
    var txt="<div><p>";
    txt=txt.concat("Ups!It seems like something went wrong.Please try again later."+"<br>Tehnical informations about us:<br>");
    var d=new Date();
    info.lastUserVisit=d;
    for(x in info)
    {
          txt+=x+': '+info[x]+'<br>';
    }
    txt+="</p></div>";
    y.innerHTML=txt;
    console.log("in");
}
function note(msg)
{
    console.log("innote");
   
    var container=msg.parentNode;
    container.style.visibility="visible";
    
}
function unnote(msg)
{
    console.log("inunnote");
    
    var container=msg.parentElement;
    container.style.visibility="hidden";
}
function stopAnimation(AnimateOn,AnimateOff)
{
    console.log("stop");
    clearInterval(AnimateOn);
    clearInterval(AnimateOff);

}

window.onload=function()
{

    var form=document.querySelectorAll("form")[0];
    form.onsubmit=function(event){event.preventDefault();setTimeout(change,200,this);};
    var msg=document.getElementById("message");
    var AnimateOn=this.setInterval(note,10000,msg);
    var AnimateOff=this.setInterval(unnote,13000,msg);
    this.setTimeout(stopAnimation,30000,AnimateOn,AnimateOff);

    var btn=document.getElementById("reqBtn");
    btn.onclick=function(){ var l=document.getElementById("req");l.innerHTML="The code must contain only 8 digits."};
}