document.addEventListener('DOMContentLoaded', () => {
    document.forms.SignUp.onsubmit = validaForm;
});

function validaForm(e){
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
        e.preventDefault();
    }
}