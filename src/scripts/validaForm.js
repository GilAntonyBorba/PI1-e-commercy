document.addEventListener('DOMContentLoaded', function() {
    function resetForm() {
        // Limpa os campos
        document.forms.SignUp.InputName.value = '';
        document.forms.SignUp.InputEmail.value = '';
        document.forms.SignUp.InputPassword.value = '';
        document.querySelector('input[name="conheceu"]').checked = false;
        document.querySelector('input[name="conheciaAntes"]').checked = false;

        // Habilita os campos para edição
        document.forms.SignUp.InputName.disabled = false;
        document.forms.SignUp.InputEmail.disabled = false;
        document.forms.SignUp.InputPassword.disabled = false;
        document.querySelector('input[name="conheceu"]').disabled = false;
        document.querySelector('input[name="conheciaAntes"]').disabled = false;

        // Fecha o modal
        $('#meuModal').modal('hide');
    }

    document.getElementById('btnAlterar').addEventListener('click', function() {
        // Habilita os campos para edição
        document.forms.SignUp.InputName.disabled = false;
        document.forms.SignUp.InputEmail.disabled = false;
        document.forms.SignUp.InputPassword.disabled = false;
        document.querySelector('input[name="conheceu"]').disabled = false;
        document.querySelector('input[name="conheciaAntes"]').disabled = false;

        resetForm();
    });

    // Botão "Limpar dados"
    document.getElementById('btnLimpar').addEventListener('click', resetForm);

    // Atribuir a função validaForm ao evento onsubmit do formulário
    document.forms.SignUp.onsubmit = validaForm;

    // Botão "Enviar"
    document.getElementById('btnEnviarFormulario').addEventListener('click', function(e) {
        if (!formValido) {
            // Mostra a modal apenas se !formValido
            $('#meuModal').modal('show');
        } else {
            // Trate o caso em que o formulário seja válido (adicione aqui o código para o envio do formulário, se necessário)
        }
    });

     // Evento que abre a janela modal
     $('#meuModal').on('shown.bs.modal', function () {
        $('#meuInput').trigger('focus');
        displayFormData();
    });

    function displayFormData() {
        const name = document.forms.SignUp.InputName.value;
        const email = document.forms.SignUp.InputEmail.value;
        const password = document.forms.SignUp.InputPassword.value;
        const conheceu = document.querySelector('input[name="conheceu"]:checked');
        const conheciaAntes = document.querySelector('input[name="conheciaAntes"]:checked');

        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Senha:</strong> ${password}</p>
            <p><strong>Por onde nos conheceu:</strong> ${conheceu ? conheceu.nextSibling.textContent : 'Não selecionado'}</p>
            <p><strong>Já nos conhecia anteriormente:</strong> ${conheciaAntes ? conheciaAntes.nextSibling.textContent : 'Não selecionado'}</p>
        `;
    }

});

function validaForm(e){
    e.preventDefault();
    let form = e.target;//target é o formulário que gerou essa submissão
    let formValido = true;
    console.log("início da função validaForm!");
    const spanNome = form.InputName.nextElementSibling;//pega do name do input
    const spanEmail = form.InputEmail.nextElementSibling;
    const spanPassword = form.InputPassword.nextElementSibling;
    const spanCheckbox = document.getElementById('checkboxError');
    const spanRadiobox = document.getElementById('RadioError');
    const pCheckbox = document.getElementById('pCheck');
    const pRadio = document.getElementById('pRadio');

    spanNome.textContent = "";//para não manter as mensagens de erro mesmoq ue eelas estejam certas (quando vc submeter o formulário de novo)
    spanEmail.textContent = "";
    spanPassword.textContent = "";
    spanCheckbox.textContent = "";

    if (form.InputName.value === "" || form.InputName.value.indexOf(' ')<= 0) {
        if(form.InputName.value === ""){
            spanNome.textContent = 'Usuário deve ser preenchido';
        }
        else if(form.InputName.value.indexOf(' ')<= 0){
            spanNome.textContent = 'Usuário deve conter pelo menos dois termos (nome e sobrenome, separados por um espaço em branco)';
        }   
        formValido = false;
        form.InputName.classList.add("inputDestacado");
    }
    else{
        form.InputName.classList.remove("inputDestacado");
    }

    // EMAIL-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=
        if(form.InputEmail.value === ""){
            spanEmail.textContent = 'O E-mail deve ser preenchido';
            formValido = false;
            form.InputEmail.classList.add("inputDestacado");
        }else if(form.InputEmail.value.indexOf('@')<2){
            spanEmail.textContent = 'O E-mail deve conter o @ a partir da segunda posição';
            formValido = false;
            form.InputEmail.classList.add("inputDestacado");
        }else{
            form.InputEmail.classList.remove("inputDestacado");
        }
    
    // Senha-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=
    if(form.InputPassword.value === ""){
        spanPassword.textContent = 'Uma senha deve ser fornecida';
        formValido = false;
        form.InputPassword.classList.add("inputDestacado");
    }else if(form.InputPassword.value.indexOf(' ')>=0){
        spanPassword.textContent = 'A senha não deve ter espaços em branco';
        formValido = false;
        form.InputPassword.classList.add("inputDestacado");
    }else if(form.InputPassword.value.length < 8){
        spanPassword.textContent = 'A senha deve conter pelo menos 8 caracteres';
        formValido = false;
        form.InputPassword.classList.add("inputDestacado");
    }else{
        form.InputPassword.classList.remove("inputDestacado");
    }
    

    //Checkboxes-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=
    let cont=0;
    const checkboxes = document.querySelectorAll('input[name="conheceu"]')
    for(let checks of checkboxes){
        if (checks.checked) {
            cont++;
        }
    }
    if(cont==0){
        formValido = false;
        spanCheckbox.textContent = 'Por favor, selecione pelo menos uma opção';
        // alert('Por favor, selecione uma opção');
        
    }
    if (cont == 0) {
        formValido = false;
        spanCheckbox.textContent = 'Por favor, selecione pelo menos uma opção em "Por onde nos conheceu"';
        spanCheckbox.style.display = 'block'; // Exibe a mensagem de erro
        pCheckbox.classList.add("pDestacado");
    } else {
        spanCheckbox.textContent = ''; // Limpa a mensagem de erro
        spanCheckbox.style.display = 'none'; // Oculta a mensagem de erro
        pCheckbox.classList.remove("pDestacado");
    }


    //Radio-=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=-=-=-=-=--=-=

    const radioOptions = document.querySelectorAll('input[name="conheciaAntes"]');
    let radioChecked = false;

    for (let radio of radioOptions) {
        if (radio.checked) {
            radioChecked = true;
            break;
        }
    }

    if (!radioChecked) {
        formValido = false;
        spanRadiobox.textContent = 'Por favor, selecione pelo menos uma opção em "Já nos conhecia anteriormente"';
        spanRadiobox.style.display = 'block'; // Exibe a mensagem de erro
        pRadio.classList.add('pDestacado');
    }else{
        spanRadiobox.textContent = ''; // Limpa a mensagem de erro
        spanRadiobox.style.display = 'none'; // Oculta a mensagem de erro
        pRadio.classList.remove("pDestacado");
    }
    
    if (!formValido){
        
        
    }
}