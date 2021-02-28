function stop(myWindow)
{
    myWindow.close();
}
function change(x)
{
    var y=x.parentNode;
    var Evaluation=JSON.parse(localStorage.getItem('surveyEvaluation'));
    var score=Evaluation.evalScore;
    var m=m2-m1;
    var txt="<div><p>";
    txt=txt.concat("Thank you for your feedback. We really appreciate your time."+"<br>"
    +"So far, your gave us a score of "+score+" /18"+"<br> That's great!"+"<br>"+
    "And,this time, it only took you almost "+m+" minutes"+" to finish our survey."+"</p></div>");
    y.innerHTML=txt;
}

var m1, m2;

///Luand informatii din local Storage, vom calcula scorul care se obtine la survey, raportat
/// la toate completarii acelui user

function calculateScore(event)
{
      event.preventDefault(); ///previne pagina sa se reincarce
      var score=0;
      var d=new Date();
      m2=d.getMinutes();
      console.log(m2);
      ///prima oara calculam scorul propriu-zis
      for(x of this.elements)
      {
          if(x.type=="radio")
                 if(x.checked && x.getAttribute("name")!="period")
                    score+=parseInt(x.value);
      }
     
      ///daca au mai fost si alte completari ale formularului, inseamna ca
      /// aveam deja in local storage un obiect JSON; verificam asadar
      ///aceasta conditie de existenta
      if(localStorage.getItem("surveyEvaluation")==null)
      {
         
        ///vom crea un obiect JS care sa retina scorul nostru 
          var evaluation=Object.create({});
          evaluation.evalScore=score;
          evaluation.nrResponses=1;
          var jEvaluation=JSON.stringify(evaluation);
          localStorage.setItem('surveyEvaluation',jEvaluation);

      }
      else
      {
          
          var oldEvaluation=JSON.parse(localStorage.getItem('surveyEvaluation'));

        
          oldEvaluation.nrResponses++;
          oldEvaluation.evalScore=Math.trunc((oldEvaluation.evalScore*(oldEvaluation.nrResponses-1)+score)/oldEvaluation.nrResponses);
          var newEvaluation=JSON.stringify(oldEvaluation);
          localStorage.setItem('surveyEvaluation',newEvaluation);


      }
      alert("Your submission was successfully saved.");



     
      setTimeout(change,200,this);

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
function displayMessagetxtBox()
{
    var review="";
    var exclude=["Shift","Backspace"];
    var textarea=document.getElementsByTagName("textarea")[0];
    textarea.addEventListener("keydown",(event)=>{if(!(exclude.indexOf(event.key) > -1))review+=event.key;});
    textarea.addEventListener("change",function(){alert("Thank you for you review. Last session you wrote: "+review);review=""},true);

}

function removeNode(elem)
{
   document.body.removeChild(elem);
}

///Functii utilizate pentru ilustrearea conceptelor de bubbling, capturing, eventPropagation
///De asemenea, introducem si conceptul de getComputedStyle (care e doar read-only, in cazul
///de fata folosit pentru a verifica o conditie)
function sizeOnParent(event)
{
    if(event.target!=this)
       alert("Hm...It seems that you clicked on a child dot. However, we're going to open a page with pandemic info. Stay safe!");
       
    var newsWindow=window.open("https://www.nytimes.com/news-event/coronavirus?action=click&module=Spotlight&pgtype=Homepage");
    setTimeout(closeW,10000,newsWindow);
    console.log("parent");
    const Style=getComputedStyle(this);
    if(Style.getPropertyValue('width')=='120px')
        {this.style.width='140px';
        this.style.height='140px';}
    else
    {   this.style.width='120px';
        this.style.height='120px';}
}
function closeW(myWindow)
{
    myWindow.close();
}
function redirect(url)
{
    var myWindow=window.open(url);
    setTimeout(closeW,30000,myWindow);
}
var message="You  pressed a child redirect button!\nYou'll be redirected just in a few seconds to our social media page..."
function redirectInsta(event)
{
    var newMessage=message.replace("social media","instagram");
  
    console.log(newMessage);
    redirect("https://www.instagram.com/sixsensesyaonoi/?hl=ro");
}
function redirectFb(event)
{    
    var newMessage=message.replace("social media","facebook");
    console.log(newMessage);
    redirect("https://www.facebook.com/sixsensesyaonoi/");
}
function redirectTwitter(event)
{
    var newMessage=message.replace("social media","twitter");

    event.stopPropagation();
    console.log(newMessage);
    redirect("https://twitter.com/Six_Senses_?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor");
}
function RedirectButtonAnimation()
{
   var ParentBtn1=document.getElementsByClassName("dot-container")[0].children[0];
   var ParentBtn3=ParentBtn1.nextElementSibling.nextElementSibling;
   var it=ParentBtn3;
   do
   {
       ///trece si peste nodurile text
       it=it.previousSibling;
       console.log(it);

   }while(it.className!="dotParent");
   var ParentBtn2=it;

   console.log(ParentBtn2);
   ///Bubbling
   ParentBtn1.addEventListener("click",sizeOnParent,true);
   ParentBtn1.children[0].addEventListener("click",redirectInsta,false);

   ///Capturing
   ParentBtn2.addEventListener("click",sizeOnParent,false);
   ParentBtn2.children[0].addEventListener("click",redirectFb,false);

   ///Stop Propagation
   ParentBtn3.addEventListener("click",sizeOnParent,false);
   ParentBtn3.children[0].addEventListener("click",redirectTwitter,true);
   
  

}
window.onload=function(){


    

   d=new Date();

   var form=document.getElementById("survey");
   ///luam un variabila care sa memoreze minutul la care user-ul a inceput completarea survey-ului
   var txtInp=document.getElementsByTagName("input")[0];
   txtInp.oninput=function(){

       m1=d.getMinutes();
       console.log(m1);
 
   }
   RedirectButtonAnimation();
   displayMessagetxtBox();
   ///in momentul in care am dat sumbit -> calculam scorul obtinut de review-ul actual (se declanseaza
   ///un eveniment)
   form.addEventListener("submit",calculateScore,true);

   ///Vom afisa o data la 10000 de milisecunde (pana la un anumit timp) un mesaj de informare pentru user
   var msg=document.getElementById("message");
      var AnimateOn=setInterval(note,10000,msg);
   var AnimateOff=setInterval(unnote,13000,msg);
   setTimeout(stopAnimation,30000,AnimateOn,AnimateOff);


   ///event handler
   /// cream acele "particule" care sa apara in momentul in care se misca mouse-ul
   function trail(event)
{
    var durationRange= [1, 0.9,0.8, 0.7, 0.6, 0.5, 0.1]
    durationRange.forEach(function(i){
     
      var j = (1 - i) * 40;
      ///vrem ca particulele care dureaza cel mai mult sa aiba un range de pozitia
      ///fata de mouse proportional mai mica

      ///cream un nou element
      ///la fiecare miscare a mousului, vom crea 7 noi elemente de tip div,
      ///care vor fi la distanta maxima de 40 px fata de pozitia actuala a mouse-ului
      var elem = document.createElement('div');
    
      elem.style.top = event.pageY + Math.ceil(Math.random() * j) + 'px';
      elem.style.left = event.pageX + Math.ceil(Math.random() * j) + 'px';

      elem.className="particle";
      document.body.appendChild(elem);     
      setTimeout(removeNode,Math.ceil(Math.random() * i * 400),elem);
     
    });
}

 window.addEventListener('mousemove',trail,event,false);
//  window.onscroll=function()
//     {
//         window.removeEventListener("mousemove", trail, event, false);
//     }

}