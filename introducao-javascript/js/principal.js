var titulo =  document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista"; // pego o texto do elemento


var pacientes   = document.querySelectorAll(".paciente");
var inc = pacientes.length;



for(var i = 0; i < inc; i++){
   
    var paciente = pacientes[i];

    
    var tdpeso = paciente.querySelector(".info-peso");
    var peso = tdpeso.textContent;

    var tdaltura = paciente.querySelector(".info-altura");
    var altura  = tdaltura.textContent;
    calcularImc(peso,altura);
   
}



var eventBtn = document.querySelector("#adicionar-paciente");

eventBtn.addEventListener("click",function(event){
    event.preventDefault();
            // pego os valores do meu input
        var form = document.querySelector("#form-add");        
        var dados  = new dadosInput(form);
        calcularImc(dados.InputPeso,dados.InputAltura);
        validaFormulario(dados);
        

    
})


function dadosInput(form){
     
    var dados  = {
        InputName: form.nome.value,
        InputPeso: form.peso.value,
        InputAltura: form.altura.value,
        InputGordura: form.gordura.value,
        imc: calcularImc(form.peso.value,form.altura.value)
        
    }

    return dados;
}




function calcularImc(peso,altura){

    var imc = peso / (altura * altura);
  
    
    var resultpeso = true;
    var resultaltura = true;
    if(peso < 0 ){
        peso = tdpeso.textContent = "peso inválido";
        resultpeso = false;
        
    }

    if(altura < 0){
        altura = tdaltura.textContent="altura inválida";
        resultaltura = false;
    }

    if(resultpeso ==  false || resultaltura==false){
        
        paciente.querySelector(".info-imc").textContent = "Impossível calcular imc";
        paciente.classList.add(".paciente-invalido");
        
    } else {
        var tdimc = paciente.querySelector(".info-imc");
        return tdimc.textContent = imc.toFixed(2);
        
        
        
    }
    

}

function CriaELemento(dados){
    // aqui eu crio tr e td
            var newPaciente  = document.createElement("tr");

            newPaciente.classList.add("paciente");

            


            var nomeTd = document.createElement("td");
            var alturaTd = document.createElement("td");
            var pesoTd = document.createElement("td");
            var gorduraTd = document.createElement("td");
            var imcTd = document.createElement("td");
            


            // pego as td e atribuo um valor, que é pego no input
            nomeTd.textContent = dados.InputName;
            alturaTd.textContent = dados.InputAltura;
            pesoTd.textContent = dados.InputPeso;
            gorduraTd.textContent = dados.InputGordura;
            imcTd.textContent = dados.imc;

            // adiciona as tr na td
            newPaciente.appendChild(nomeTd); // add as td a
            newPaciente.appendChild(alturaTd);
            newPaciente.appendChild(pesoTd);
            newPaciente.appendChild(gorduraTd);
            newPaciente.appendChild(imcTd);
            

            var tabela = document.querySelector("#tabela-pacientes");

             tabela.appendChild(newPaciente);

            
}



function validaFormulario(values){
   
    var error  = [];
    var ol = document.createElement("ol");
    var mensagens = document.querySelector("#mensagens-error");
    mensagens.appendChild(ol);
    
    
    if(values.InputPeso > 700 || values.InputPeso==''){
           var peso = document.querySelector("#peso");
           peso.classList.add("border-error");           
           error[0] = "Peso inválido";
           var li = document.createElement("li");
           li.textContent = error[0];
           ol.appendChild(li);
          
    }

    if(values.InputAltura < 0 || values.InputAltura == ''){
        document.querySelector("#altura").classList.add("border-error");
        error[1] = "Altura inválida";
        var li1 = document.createElement("li");
           li1.textContent = error[1];
           ol.appendChild(li1);
          
    }
    if(values.InputName == ""){
        document.querySelector("#nome").classList.add("border-error");
         error[2] = "O nome é requerido";
         var li2 = document.createElement("li");
           li2.textContent = error[2];
           ol.appendChild(li2);
          
    }

    if(values.InputGordura == ""){
        document.querySelector("#gordura").classList.add("border-error");
        error[3] = "O percentual de gordura é requerido";
        var li3 = document.createElement("li");
           li3.textContent = error[3];
           ol.appendChild(li3);
          
    } else{
        return CriaELemento(values);
    }
     
}



var tabela = document.querySelector("table");

tabela.addEventListener("dblclick",function(event){
    var alvo =  event.target;
    var paiAlvo = alvo.parentNode; // pegando o pai do elemento que chamoi o evento doubleclick, que no caso o pai é a tr
    paiAlvo.remove();
    
    
})


// filtro 

var campoFiltro = document.querySelector("#filtrar-tabela");
var pacientes = document.querySelectorAll(".paciente");

campoFiltro.addEventListener("input", function(){ // escutando o que esta sendo digitado no input
   
    
   
    for(var i = 0;i<pacientes.length;i++){
        var paciente  = pacientes[i];
        var nome = paciente.querySelector(".info-nome").textContent;
        var expressao = new RegExp(campoFiltro.value, "i"); // utilizado em pesquisa e buscas
        // RegExp retira a opção case sensive da nossa busca
            if (!expressao.test(nome)) { // esse test realizar um teste no regexp
                paciente.classList.add("invisible");
            } else {
                paciente.classList.remove("invisible");
            }

         if(this.value == ''){
            paciente.classList.remove("invisible");
        }
        
    }
    

    
});

