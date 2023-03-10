import {showChartJs} from './chart.js';
// Selecciono el btn del formulario principal para generar la sección partners dinámicamente
const btnForm = document.querySelector('.main-form-btns-submit');
// Agrego un escuchador de eventos al btn
btnForm.addEventListener('click', generatePartnersFieldSet);

// Selecciona la lista desplegable del main-form
const selectAmountPartners = document.querySelector('.main-form-select');

// Función que genera la sección partners dinámicamente
function generatePartnersFieldSet() {
    // Selecciono el input del nombre de la actividad
    const inputActivityName = document.querySelector('#name-activity_input');
    // Selecciono el input del monto de la capital inicial
    const inputCapitalInitial = document.querySelector('#capital-initial_input');
    // Selecciono el input del monto de la capital final
    const inputCapitalFinal = document.querySelector('#capital-final_input');

    function validateForm(inputActivityName, inputCapitalInitial, inputCapitalFinal, selectAmountPartners){
    // Verifico si ingresaron el nombre de la actividad
        if(inputActivityName.value === ''){
            swal({
                title: "Error",
                text: "Por favor, ingresa el nombre de la actividad",
                icon: "error",
                button: "Aceptar",
            });
            return false;
        }

        // Verifico si ingresaron el monto de la capital inicial
        if(inputCapitalInitial.value === ''){
            swal({
                title: "Error",
                text: "Por favor, ingresa el monto de la capital inicial",
                icon: "error",
                button: "Aceptar",
            });
            return false;
        }
        
        // Función que valida el monto de la capital final
        function validateCapitalFinal(inputCapitalFinal, inputCapitalInitial){
            // Verifico si ingresaron el monto de la capital final
            if(inputCapitalFinal.value === ''){
                swal({
                    title: "Error",
                    text: "Por favor, ingresa el monto de la capital final",
                    icon: "error",
                    button: "Aceptar",
                });
                return false;
            }
            if (inputCapitalFinal.value <= inputCapitalInitial.value){
                swal({
                    title: "Error",
                    text: "El monto de la capital final debe ser mayor al monto de la capital inicial",
                    icon: "error",
                    button: "Aceptar",
                });
                return false;
            } 
            return true;
        }
        // Verifico si ingresaron correctamente el monto de la capital final
        if(!validateCapitalFinal(inputCapitalFinal, inputCapitalInitial)){
            return;
        }

        // Verifico si seleccionaron la cantidad de socios
        if(selectAmountPartners.value === '--'){
            swal({
                title: "Error",
                text: "Por favor, selecciona la cantidad de socios",
                icon: "error",
                button: "Aceptar",
            });
            return false;
        }
        return true;
    }
    // Utilizo un if para validar el formulario esta lleno
        if(!validateForm(inputActivityName, inputCapitalInitial, inputCapitalFinal, selectAmountPartners)){
            return;
        }
    // El usuario al hacer click en el btnForm, se le debe redirigir a la sección partners
    window.location.href = '#partners';


    // Selecciona la sección partners
    const partnersSection = document.querySelector('#partners');
    partnersSection.innerHTML = '';
    const amountPartners = selectAmountPartners.value;
    // Agrego un h1 a la sección partners
    partnersSection.appendChild(document.createElement('h1')).textContent = 'Ingresa los datos de los socios';
    const partnersFieldSetContainer = partnersSection.appendChild(document.createElement('div'));
    partnersFieldSetContainer.classList.add('form-partners_fieldset');
    for(let i = 0; i<amountPartners; i++){
        partnersFieldSetContainer.innerHTML += `
            <fieldset class="partners_container">
            <legend>Socio ${i+1}</legend>
            <label for="name-partner">
            <h2>Nombre del socio</h2>
            <input type="text" placeholder="Ej. Juan Pérez">
            </label>
            <label for="capital-partner">
            <h2>Capital del socio</h2>
            <div class="capital-partner">
                <span>S/. </span>
                <input type="number" placeholder="Ej. 5000">
            </div>
            </label>
        </fieldset>
        `
    }
    partnersSection.innerHTML += `
    <button class="btn_partners" onClick="showChartJs()" type="button">Calcular</button>   
    `
}

// Selecciono el btn reset del formulario principal
const btnReset = document.querySelector('.main-form-btns-reset');
// Agrego un escuchador de eventos al btn reset
btnReset.addEventListener('click', resetForm);

// Función que resetea el formulario principal
function resetForm(){
    btnReset.disabled = true;
    // Selecciono el input del nombre de la actividad
    const inputActivityName = document.querySelector('#name-activity_input');
    // Selecciono el input del monto de la capital inicial
    const inputCapitalInitial = document.querySelector('#capital-initial_input');
    // Selecciono el input del monto de la capital final
    const inputCapitalFinal = document.querySelector('#capital-final_input');
    // Selecciona la lista desplegable del main-form
    const selectAmountPartners = document.querySelector('.main-form-select');
     // Selecciona la sección partners
    const partnersSection = document.querySelector('#partners');
    // Agrego un alert con sweetalert

    const arrayInputs = [inputActivityName, inputCapitalInitial, inputCapitalFinal];
    const arrayInputsEmpty = arrayInputs.every(input => input.value ==='' && selectAmountPartners.value == '--');
    console.log(arrayInputsEmpty);
    if(!arrayInputsEmpty){
        swal({
            title: "¿Estás seguro?",
            text: "Se borrarán todos los datos ingresados",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("¡Los datos han sido borrados!", {
                    icon: "success",
                });
                    partnersSection.innerHTML = '';
                    // Reseteo los inputs del formulario principal
                    inputActivityName.value = '';
                    inputCapitalInitial.value = '';
                    inputCapitalFinal.value = '';
                    selectAmountPartners.value = '--';
            };
        })
    }
};
// Selecciono el input del nombre de la actividad
const inputActivityName = document.querySelector('#name-activity_input');
// Selecciono el input del monto de la capital inicial
const inputCapitalInitial = document.querySelector('#capital-initial_input');
// Selecciono el input del monto de la capital final
const inputCapitalFinal = document.querySelector('#capital-final_input');
// Selecciona la sección partners
const partnersSection = document.querySelector('#partners');
// Agrego un alert con sweetalert
const arrayInputs = [inputActivityName, inputCapitalInitial, inputCapitalFinal, selectAmountPartners];
arrayInputs.forEach(input => input.addEventListener('change', () => {
        btnReset.disabled = false;
}
));



