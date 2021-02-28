
function sendRequest(event)
{

    event.preventDefault();

    var x=new XMLHttpRequest();
    ///cream un obiect JSON prin care sa transmitem datele
    var data={
        name: 0,
        password: 0
    }
    var currentForm=document.getElementById("formReg");
    var i=0;
    for(var v of currentForm.children)
    {
        if(v.tagName=="LABEL")
        {
            switch(i)
            {
                case 0:
                    {
                        data.name=v.children[0].value;
                        break;
                    }
                case 1:
                    {
                        data.password=v.children[0].value;
                        break;
                    }
                default:
                    break;
            }
            i++;
           
         }

    }
    var JSONData=JSON.stringify(data);

    x.open("POST","http://localhost:7000/cale2");
    x.onreadystatechange=function()
    {
          if(x.status==200 && x.readyState==4)
          {
               alert(this.responseText);
               currentForm.parentNode.innerHTML='<h2>'+this.responseText+'</h2>';
          }

    }
    x.send(JSONData);

}

window.onload=function()
{
  var btn=document.getElementsByClassName("center-input")[1];
  btn.addEventListener("click",sendRequest);

}