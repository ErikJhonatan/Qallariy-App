// impotar la funcion getResults
import {getResults, deleteByCreatedAt } from './resultsApp.js';

import { showResultPrevious } from './showResult.js';
function renderResultsPrevious() {
    const tableResultsContainer = document.querySelector('.table-results-previous-contain');

const results = getResults() ? getResults() : [];

if (results.length === 0) {
    tableResultsContainer.innerHTML = `
    <div class="table-results-previous_empty">
    <p>No hay resultados anteriores, crea un nuevo resultado</p>
    <button class="btn-results_add"></button>
    </div>`;

    const btnAddResult = document.querySelector('.btn-results_add');
    btnAddResult.addEventListener('click', () => {
        window.location.href = '#form';
    });
} else {
    results.forEach(result => {
        result.createdAt = new Date(result.createdAt);
    });
    
    tableResultsContainer.innerHTML = `<table>
    <!--columnas-->
   <thead>
     <tr>
       <th>Nombre del empredimiento</th>
       <th>Fecha</th>
       <th>Acciones</th>
   </tr>
 </thead>
 <!--filas-->
   <tbody>
   </tbody>
 </table>`;
    const tableBody = document.querySelector('.table-results-previous-contain tbody');
    
    results.forEach(result => {
        console.log(result);
        const now = new Date(result.createdAt);
        // date 3 => 03
        const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
        // month 3 => 03
        const month = now.getMonth() < 10 ? `0${now.getMonth()+ 1}` : now.getMonth() + 1;
        const year = now.getFullYear();
        const fecha = `${date}/${month}/${year}`;
        // fecha con formato dd/mm/yyyy
    
        tableBody.innerHTML += `
            <tr>
                <td>${result.nameActivity}</td>
                <td>${fecha}</td>
                <td>
                    <button title="Ver" class="btn-result_view"></button>
                    <button title="Eliminar" class="btn-results_delete"></button>
                </td>
            </tr>
        `;
    });
    const btnViewResult = tableBody.querySelectorAll('.btn-result_view');
    const btnDeleteResult = tableBody.querySelectorAll('.btn-results_delete');

    btnViewResult.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = Array.from(btnViewResult).indexOf(btn);
            showResultPrevious(results[index]);
        });
    });

    btnDeleteResult.forEach(btn => {
        btn.addEventListener('click', () => {
            swal({
                title: "¿Estás seguro?",
                text: "Una vez eliminado, no podrás recuperar este resultado",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    swal("El resultado ha sido eliminado", {
                        icon: "success",
                    });
                    const index = Array.from(btnDeleteResult).indexOf(btn);
                    deleteByCreatedAt(results[index].createdAt);
                    renderResultsPrevious();
                } else {
                    swal("El resultado no ha sido eliminado");
                }
            });
        });
    });
}
}
export { renderResultsPrevious };
