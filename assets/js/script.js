const endpoint = "http://localhost:8080/api/Client"

$(document).ready(function() {
    getClient()
})

function getClient(){
    let tam = 0;
    $.ajax({
        url: endpoint + "/all",
        type: 'GET',
        dataType:  'JSON',
        success: function(data) {
            let tam = data.length
            if(tam == 0) {
                $("#contenedor").hide()
                $("#mensaje").show()
            }
            else{
                $("#contenedor").show()
                $("#mensaje").hide()
                $("#numregistro").html("Numero de Registros: " + tam)
                console.log(data)
                let registro = ""
                $.each(data, function(index, client){
                    registro += "<tr>"+
                                "<td>" + client.idClient +"</td>" +
                                "<td>" + client.email + "</td>" +
                                "<td>" + client.password + "</td>" +
                                "<td>" + client.name + "</td>" +
                                "<td>" + client.age + "</td>" +
                                "<td><button data-bs-toggle='modal'data-bs-target='#modalactualizar' class='btn btn-warning'" +
                                "onclick=\"enviar('"+ client.idClient +"','"+ 
                                client.email +"','"+ client.password +"','"+ 
                                client.name +"','"+ client.age +"')\"" +
                                ">Editar</button>&nbsp" +
                                "<td><button class='btn btn-danger'onclick=\"eliminar(\'" + 
                                client.idClient +
                                "\')\">Eliminar</button></td>"
                                "</tr>"
                })
                console.log(registro)
                $("#tbody").html(registro)
            }   
        }
    })
}

function enviar(idClient, email, password, name, age){
    console.log(idClient)
    console.log(email)
    console.log(password)
    console.log(name)
    console.log(age)

}

function eliminar(idClient) {
    if (confirm("Desea Eliminar el Registro con id client " + idClient + "?")) {
        
        $.ajax({
            url: endpoint + "/" + idClient,
            type: "DELETE",
            dataType: "JSON",
            contentType: "applicaation/json",
            complete: function(){
                getClient()
            }
        
        })
    }
}