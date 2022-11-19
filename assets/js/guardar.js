const endpoint = "http://localhost:8080/api/Client"


$(document).ready(function() {

    $("#guardar").click(function(){
        guardarClient()
    })
})

function guardarClient() {

    let cliente = {
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    }
    //console.log(cliente)
    if (cliente.email.length == 0 || cliente.password.length == 0 || 
        cliente.name.length == 0  || cliente.age.length == 0) {
            alert("Campo(s) Vacío(s)")
    }
    //console.log(cliente)
    if (cliente.email.length > 45) {
        alert("Campo Email no puede ser mayor a 45 caracteres")
    }    
    if(cliente.password.length >= 1 && cliente.password.length <=4) {
         alert("El password tiene que ser Mayor a 4 caracteres")
    }
    if (cliente.email.length <= 45 && cliente.password.length > 4 &&
        cliente.name.length > 0 && cliente.age.length > 0) {
        let dataJson = JSON.stringify(cliente)
        console.log(dataJson) 
        $.ajax({
            url: endpoint + "/save",
            type: "POST",
            data: dataJson,
            contentType: "application/json",
            complete: function(data) {
                 if (data.status == "201"){
                    alert("Guardo Registro Cliente con Exito!!")
                    } else {
                    alert("Problemas al Insertar, Consulta al Administrador!!")
                }
            }   
        })
    }
}