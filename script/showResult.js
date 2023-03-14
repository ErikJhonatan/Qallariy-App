import { partnersSection, inputActivityName, inputCapitalInitial, inputCapitalFinal, selectAmountPartners } from './main.js';
import {saveResults, getResults} from './resultsApp.js';
import { renderResultsPrevious } from './resultsPrevious.js';


const listColours = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
]
const body = document.querySelector('body');



function showResult(objResult) {
    // redireccionar y dirigir al inicio
    window.location.href = "#form";
    const partnersSection = document.querySelector('#partners');
    partnersSection.innerHTML = "";
    const { nameActivity, totalInvestmentCapital, capitalFinal, listPartners } = objResult;
    const listColoursUse = listColours.slice(0, listPartners.length);
    const dataName = listPartners.map(partner => partner.name);
    const dataNetProfit = listPartners.map(partner => partner.netProfitPartner);
    let netProfit = capitalFinal - totalInvestmentCapital;
    body.style.overflow = 'hidden';
    // Selecciono la section chartResult-section
    const chartResultSection = document.querySelector('.chartResult-section');
    chartResultSection.classList.add('show');
    chartResultSection.innerHTML = "";
    chartResultSection.innerHTML = `
    <div class="chartResult-section-container">
      <span class="close-icon_result"></span>
      <div class="chartResult-section-contain">
      <h1>Resultados</h1>
      <p>Nombre de la actividad: <span id="nameActivity">${nameActivity}</span></p>
      <p>Capital inicial: <span id="capitalInitial">S/. ${totalInvestmentCapital}</span></p>
      <p>Capital final: <span id="capitalFinal">S/. ${capitalFinal}</span></p>
      <p>La utilidad neta de la inversión es de: <span id="utilidadNeta">S/. ${netProfit}</span></p>
      </div>
      <div class="chartResult">
      <canvas id="myChart"></canvas>
      </div>
  </div>`
    const chartResultSectionContainer = document.querySelector('.chartResult-section-container');
    const table = document.createElement('table');
    chartResultSectionContainer.appendChild(table);
    table.innerHTML = `
  <!--columnas-->
  <thead id="table-columns">
    <tr>
      <th>Socio</th>
      <th>Inv. inicial</th>
      <th>% de utilidad</th>
      <th>Util. neta</th>
    </tr>
    <!--filas-->
    <tbody id="table-partners">
  </thead>
</table>`;
    const tablePartners = document.querySelector('#table-partners');
    listPartners.forEach(partner => {
        const tr = document.createElement('tr');
        tablePartners.appendChild(tr);
        tr.innerHTML = `
        <!--filas-->
        <tbody id="table-partners">
          <tr>
            <td>${partner.name}</td>
            <td>S/. ${partner.investmentCapital}</td>
            <td>${partner.percentageProfit}%</td>
            <td>S/. ${partner.netProfitPartner}</td>
          </tr>
        `});
        
    window.addEventListener('resize', () => {
        myChart.resize();
    });
    const closeIconResult = document.querySelector('.close-icon_result');
    closeIconResult.addEventListener('click', () => {
        chartResultSection.classList.remove('show');
        body.style.overflow = 'auto';
        // Guardo los resultados en el historial
        saveResults(objResult);

        swal ( "¡Gracias por usar nuestra aplicación web!" ,  "Sus resultados se han guardado en su historial" ,  "success" );
        
        renderResultsPrevious();
        // Reseteo los inputs del formulario principal
        inputActivityName.value = '';
        inputCapitalInitial.value = '';
        inputCapitalFinal.value = '';
        selectAmountPartners.value = '--';
        inputActivityName.disabled = false;
        inputCapitalInitial.disabled = false;
        inputCapitalFinal.disabled =  false;
        selectAmountPartners.disabled = false;
        const btnForm = document.querySelector('.main-form-btns-submit');
        btnForm.disabled = false;

    });
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        labels: dataName,
        datasets: [{
            label: 'Mi utilidad Neta',
            data: dataNetProfit,
            backgroundColor: listColoursUse,
            hoverOffset: 4,
        }]
    };

    const myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff',
                    },
                },
                title: {
                    display: true,
                    text: 'Distribución de las ganancias',
                    font: {
                        size: 20,
                    },
                    color: '#fff',
                },
                subtitle: {
                    display: true,
                    text: 'Mi utilidad Neta',
                    font: {
                        size: 15,
                    },
                    color: '#fff',
                },
            }
        }
        ,
    });
}


function showResultPrevious (objResult) {
    const { nameActivity, totalInvestmentCapital, capitalFinal, listPartners } = objResult;
    const listColoursUse = listColours.slice(0, listPartners.length);
    const dataName = listPartners.map(partner => partner.name);
    const dataNetProfit = listPartners.map(partner => partner.netProfitPartner);
    let netProfit = capitalFinal - totalInvestmentCapital;
    body.style.overflow = 'hidden';
    // Selecciono la section chartResult-section
    const chartResultSection = document.querySelector('.chartResult-section');
    chartResultSection.classList.add('show');
    chartResultSection.innerHTML = "";
    chartResultSection.innerHTML = `
    <div class="chartResult-section-container">
      <span class="close-icon_result"></span>
      <div class="chartResult-section-contain">
      <h1>Resultados</h1>
      <p>Nombre de la actividad: <span id="nameActivity">${nameActivity}</span></p>
      <p>Capital inicial: <span id="capitalInitial">S/. ${totalInvestmentCapital}</span></p>
      <p>Capital final: <span id="capitalFinal">S/. ${capitalFinal}</span></p>
      <p>La utilidad neta de la inversión es de: <span id="utilidadNeta">S/. ${netProfit}</span></p>
      </div>
      <div class="chartResult">
      <canvas id="myChart"></canvas>
      </div>
  </div>`
    const chartResultSectionContainer = document.querySelector('.chartResult-section-container');
    const table = document.createElement('table');
    chartResultSectionContainer.appendChild(table);
    table.innerHTML = `
  <!--columnas-->
  <thead id="table-columns">
    <tr>
      <th>Socio</th>
      <th>Inv. inicial</th>
      <th>% de utilidad</th>
      <th>Util. neta</th>
    </tr>
    <!--filas-->
    <tbody id="table-partners">
  </thead>
</table>`;
    const tablePartners = document.querySelector('#table-partners');
    listPartners.forEach(partner => {
        const tr = document.createElement('tr');
        tablePartners.appendChild(tr);
        tr.innerHTML = `
        <!--filas-->
        <tbody id="table-partners">
          <tr>
            <td>${partner.name}</td>
            <td>S/. ${partner.investmentCapital}</td>
            <td>${partner.percentageProfit}%</td>
            <td>S/. ${partner.netProfitPartner}</td>
          </tr>
        `});
        
    window.addEventListener('resize', () => {
        myChart.resize();
    });
    const closeIconResult = document.querySelector('.close-icon_result');
    closeIconResult.addEventListener('click', () => {
        chartResultSection.classList.remove('show');
        body.style.overflow = 'auto';

    });
    const ctx = document.getElementById('myChart').getContext('2d');

    const data = {
        labels: dataName,
        datasets: [{
            label: 'Mi utilidad Neta',
            data: dataNetProfit,
            backgroundColor: listColoursUse,
            hoverOffset: 4,
        }]
    };

    const myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff',
                    },
                },
                title: {
                    display: true,
                    text: 'Distribución de las ganancias',
                    font: {
                        size: 20,
                    },
                    color: '#fff',
                },
                subtitle: {
                    display: true,
                    text: 'Mi utilidad Neta',
                    font: {
                        size: 15,
                    },
                    color: '#fff',
                },
            }
        }
        ,
    });
}
export { showResult, showResultPrevious }