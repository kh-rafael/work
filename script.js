var usd_field = document.getElementById("usd_field");
var usd_slider = document.getElementById("usd_slider");
var result = document.getElementById("result");
var income = document.getElementById("income");
var rubl = document.getElementById("rubl");

var duration=3;
var year_income=0.02;
var today_usd_value=0;

$.getJSON('https://www.cbr-xml-daily.ru/daily_json.js', function(data) {
    today_usd_value = data.Valute.USD.Previous;
    console.log(data);
});

//usd_toggle = document.getElementById("");

function slider_change(usd)
{
  usd = usd.replace(/[^0-9]/g, '');
  usd_field.value = usd.toLocaleString()+" $";

  var result_c;
  var income_c;

  income_c = Math.floor(usd*duration*year_income/12);
  result_c = parseInt(usd)+income_c;

  result.innerHTML = result_c.toLocaleString()+" $";
  income.innerHTML = "+ " + income_c + " $ (+" + duration*year_income*100/12 + "%)";
  rubl.innerHTML = "~"+Math.floor(usd*today_usd_value,-1).toLocaleString()+" ₽";
}

function input_change(usd)
{
  usd = usd.replace(/[^0-9]/g, '');
  var result_c;
  var income_c;
  usd_slider.value = usd;
  
  if (usd<1000)
    {
      result.style.color = "red";
      result.innerHTML = "Минимальный взнос 1000$";
      income.innerHTML = "";
      rubl.innerHTML = "~"+Math.floor(usd*today_usd_value,-1).toLocaleString()+" ₽";
    }
     else if (usd>40000)
  {
    result.style.color = "red";
      result.innerHTML = "Максимум 40 000$";
      income.innerHTML = "";
      rubl.innerHTML = "~"+Math.floor(usd*today_usd_value,-1).toLocaleString()+" ₽";
  }
  else
    {
      result.style.color = "#28323C";

      income_c = Math.floor(usd*duration*year_income/12,-1);
      result_c = parseInt(usd)+income_c;

      result.innerHTML = result_c.toLocaleString()+" $";
      income.innerHTML = "+ " + income_c + " $ (+" + duration*year_income*100/12 + "%)";
      rubl.innerHTML = "~"+Math.floor(usd*today_usd_value,-1).toLocaleString()+" ₽";
    }
}

function input_blur(usd)
{
  if (usd<1000)
    {
      usd=1000;
      income_c = Math.floor(usd*duration*year_income/12,-1);
      result_c = usd+income_c;

      result.innerHTML = result_c.toLocaleString()+" $";
      income.innerHTML = "+ " + income_c + " $ (+" + duration*year_income*100/12 + "%)";
      rubl.innerHTML = "~"+Math.floor(usd*today_usd_value,-1).toLocaleString()+" ₽";
      
      usd_field.value = usd.toLocaleString()+" $";
      usd_slider.value = usd;
    }
  else if (usd>40000)
  {
    usd=40000;
      income_c = Math.round(usd*duration*year_income/12,-1);
      result_c = usd+income_c;

      result.innerHTML = result_c.toLocaleString()+" $";
      income.innerHTML = "+ " + income_c + " $ (+" + duration*year_income*100/12 + "%)";
      rubl.innerHTML = "~"+Math.floor(usd*today_usd_value,-1).toLocaleString()+" ₽";
      
      usd_field.value = usd.toLocaleString()+" $";
      usd_slider.value = usd;
  }
  else
    {
       usd_field.value = parseInt(usd).toLocaleString()+" $";
    }
      result.style.color = "#28323C";
}

function input_onfocus(usd)
{
usd_field.value = usd.replace(/[^0-9]/g, '');
}

function toggle_change(dur)
{
  var usd = (usd_field.value).replace(/[^0-9]/g, '');
  usd = parseInt(usd);

  duration=dur;
  
  income_c = usd*dur*year_income/12;
  result_c = usd + income_c;
  
  result.innerHTML = Math.floor(result_c).toLocaleString()+" $";
  income.innerHTML = "+ " + Math.floor(income_c).toLocaleString() + " $ (+" + dur*year_income*100/12 + "%)";
}

function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

}


/*
let getXMLFile = function(path, callback){
  let request = new XMLHttpRequest();
  request.open("GET", path);
  request.setRequestHeader("Content-Type","text/xml");
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.statys === 200){
      callback(request.responseXML);
    }
  };
  request.send();
};*/