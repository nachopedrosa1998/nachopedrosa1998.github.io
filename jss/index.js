var recordatorios = []

var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
var dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


var currentDate = new Date();
var currentDay = currentDate.getDate();
var monthNumber = currentDate.getMonth() + 1;

var dates = document.getElementById("date");
var mesActual = currentDate.getMonth() + 1;
var month = document.getElementById("month");

var prevMonth = document.getElementById("prev");
var nextMonth = document.getElementById("post");

var diaSeleccionado = 0;


$("#prev").click(function () {
    if (monthNumber == 1) {
        monthNumber = 12;
    } else {
        monthNumber -= 1;
    }
    calcularDias();
    calcularMes();
    actualRecord();
    diaActual();
    borrarRecor();

});
$("#post").click(function () {
    if (monthNumber == 12) {
        monthNumber = 1;
    } else {
        monthNumber += 1;
    }
    calcularDias();
    calcularMes();
    actualRecord();
    diaActual();
    borrarRecor();

});

function calcularDias() {
    var data;
    var maxSemanas = dias[monthNumber - 1] / 7;
    maxSemanas = Math.ceil(maxSemanas);
    $("#semana5").html("");
    var contadorDias = 0;
    for (var i = 1; i <= maxSemanas; i++) {
        //j dias de la semana
        for (var j = 1; j <= 7; j++) {
            if (contadorDias < dias[monthNumber - 1]) {
                data = data + "<td><button onclick=\"abrirModal(" + (contadorDias + 1) + ")\" class=\"botonDia boton-" + (contadorDias + 1) + "\"  type=\"button\">" + (contadorDias + 1) + "</button></td>";
                contadorDias++;
            }
        }
        $("#semana" + i).html(data);
        data = "";
    }
}

function calcularMes() {
    $("#month").html(meses[monthNumber - 1]);
}

function start(){
    calcularMes();
    calcularDias();
    diaActual();
    /**
    recordatorios = JSON.parse(localStorage.getItem("recordatorio"))||[]
     */
    if(typeof localStorage.getItem("recordatorio") != "null"){
        recordatorios = JSON.parse(localStorage.getItem("recordatorio"))
    }
    mostrarRecordatorios();
    actualRecord();
}


$("#guardarCamb").click(function () {
    var data = $("#recordatorio").val();
    if (data == "") {
        alert("No ha ingresado ningun recordatorio")
    } else {
        recordatorios.push({ dia: diaSeleccionado, mes: monthNumber, recordatorio: data });
    }
    localStorage.setItem("recordatorio",JSON.stringify(recordatorios));
    $(".modal").toggle();
    actualRecord();
})

$("#cerrar").click(function () {
    $(".modal").toggle();
})
function abrirModal(dia) {
    $("#recordatorio").val("");
    diaSeleccionado = dia;
    mostrarRecordatorios();
    $(".modal").toggle();
}

function mostrarRecordatorios() {
    var mostRecor = ""
    for (i = 0; i < recordatorios.length; i++) {
        if (recordatorios[i].dia == diaSeleccionado && recordatorios[i].mes == monthNumber) {
            mostRecor = mostRecor + "<li>" + recordatorios[i].recordatorio + "</li>";
        }
    }
    $("#listaRecordatorios").html(mostRecor);
}

function actualRecord() {
    for (var i = 0; i < recordatorios.length; i++) {
        var dia = recordatorios[i].dia;
        var mes = recordatorios[i].mes;
        if (mes == monthNumber) {
            $(".boton-" + dia).addClass("subrayado");
        }

    }
}
function diaActual() {
    for (var i = 1; i <= dias[mesActual - 1]; i++) {
        if(currentDay == i && mesActual == monthNumber){
            $(".boton-" + i).css("color", "white");
            $(".boton-" + i).css("background", "red");
            $(".boton-" + i).css("border-radius", "20px");
            $(".boton-" + i).css("padding-left", "0.35em");
            $(".boton-" + i).css("padding-right", "0.35em");
            $(".boton-" + i).css("font-weight", "bolder");
        }
    }
}

function borrarRecor(){
    for(var i = 0; i < recordatorios.length; i++){
        var dia = recordatorios[i].dia
        if(recordatorios[i].dia == diaSeleccionado && recordatorios[i].mes == monthNumber){
            recordatorios.splice(i, 1);
            $(".boton-" + dia).removeClass("subrayado");
            localStorage.removeItem("recordatorio",JSON.stringify(recordatorios));

        }
    }
}
$("#borrar").click(function(){
    borrarRecor();
    $(".modal").toggle();
})

