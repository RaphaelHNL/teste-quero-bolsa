var rows = [];
var valuePay = 10000;
var bolsas = [];
var semestreSelected = 'all';
document.getElementById('allSemestre').className += ' btnSelected';


function iniciaModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        document.getElementById("btnAddBolsa").disabled = true;
        modal.classList.add('mostrar');
        listaBolsas().then(res => {
            rows = res;
            const cities = [];
            const courses = [];
            var coursesSelect = document.getElementById('courses');
            var citySelect = document.getElementById('cities');
            res.map(v => {
                cities.push(v.campus.city);
                courses.push(v.course.name);
            });
            cities.filter((v, i) => cities.indexOf(v) === i).map(city => {
                citySelect.appendChild(new Option(city));
            });
            courses.filter((v, i) => courses.indexOf(v) === i).map(b => {
                coursesSelect.appendChild(new Option(b));
            });
            insertRowsTable();
        })

        modal.addEventListener('click', (evento) => {
            if (evento.target.id == modalId || evento.target.className == 'fechar') {
                modal.classList.remove('mostrar');
            }
        });
    }

}

const addBolsa = document.querySelector('.btnOpenModal');
addBolsa.addEventListener('click', () => iniciaModal('modal-bolsa'))

document.getElementById("valBox").innerHTML = `R$${(10000).toLocaleString('pt-BR')}`;

function showVal(newVal) {
    valuePay = newVal;
    document.getElementById("valBox").innerHTML = `R$${parseInt(newVal).toLocaleString('pt-BR')}`;


}



function insertRowsTable() {
    var tableRef = document.getElementById('bolsasTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";
    var scrollTop = document.getElementsByClassName('tabelaCurso')[0];
    scrollTop.scrollTop = 0;
    var j = 0;
    var cityValue = document.getElementById("cities").value;
    var courseValue = document.getElementById("courses").value;
    var presencialValue = document.getElementById('presencial').checked;
    var distanciaValue = document.getElementById('distancia').checked;


    for (let index = 0; index < rows.length; index++) {
        const element = rows[index];


        if (
            element.price_with_discount <= valuePay
            && (!cityValue || cityValue == element.campus.city)
            && (!courseValue || courseValue == element.course.name)
            && ((presencialValue && distanciaValue) || (presencialValue && element.course.kind == "Presencial") || (distanciaValue && element.course.kind == "EaD"))
        ) {

            // Insert a row in the table at row index 0
            var newRow = tableRef.insertRow(j);

            // Insert a cell in the row at index 0
            var newCell1 = newRow.insertCell(0);
            var newCell2 = newRow.insertCell(1);
            var newCell3 = newRow.insertCell(2);
            var newCell4 = newRow.insertCell(3);

            var checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.value = index;
            checkBox.onclick = enableDisableButton;
            checkBox.name = 'checkboxBolsa'
            checkBox.className = 'checkbox'


            var img = document.createElement('img');
            img.src = element.university.logo_url;
            img.className = 'imgBolsa';

            var paragaphCourseName = document.createElement('p');
            paragaphCourseName.className = 'courseName';
            paragaphCourseName.innerHTML = element.course.name;

            var paragaphCourseLevel = document.createElement('p');
            paragaphCourseLevel.className = 'courseLevel';
            paragaphCourseLevel.innerHTML = element.course.level;

            var paragaphDiscout = document.createElement('p');
            paragaphDiscout.className = 'discount';
            paragaphDiscout.innerHTML = `<span>Bolsa de </span>${Math.trunc(element.discount_percentage)}%`;

            var paragaphDiscoutPrice = document.createElement('p');
            paragaphDiscoutPrice.className = 'discount';
            paragaphDiscoutPrice.innerHTML = `R$ ${Math.trunc(element.price_with_discount)}/mês`;
            // Append a text node to the cell
            newCell1.appendChild(checkBox);

            newCell2.appendChild(img);
            newCell2.className = 'tdImg'

            newCell3.appendChild(paragaphCourseName);
            newCell3.appendChild(paragaphCourseLevel);

            newCell4.appendChild(paragaphDiscout);
            newCell4.appendChild(paragaphDiscoutPrice);

            j++;

        }


    }
}


function enableDisableButton() {
    var checkboxes = document.getElementsByName("checkboxBolsa");
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(true);
        }
    }
    // Return the array if it is non-empty, or null

    document.getElementById("btnAddBolsa").disabled = checkboxesChecked.length == 0 ? true : false;
}

function adicionaBolsa() {
    var checkboxes = document.getElementsByName("checkboxBolsa");
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(rows[checkboxes[i].value]);
        }
    }
    // Return the array if it is non-empty, or null

    bolsas = checkboxesChecked;
    document.getElementById('modal-bolsa').classList.remove('mostrar');
    cards();
}

function cards() {
    var sectionCard = document.getElementById('sectionCards');
    sectionCard.innerHTML = "";


    var divCard = document.createElement('div');
    divCard.className = 'card';
    var divItems = document.createElement('div');
    divItems.className = 'itemsCard';
    var containerImg = document.createElement('div');
    containerImg.className = 'containerImg';
    var containerAddBolsa = document.createElement('div');
    containerAddBolsa.className = 'containerAddBolsa';


    var imgPlus = document.createElement('img');
    imgPlus.src = 'img/icons/mais.svg';
    imgPlus.className = 'imgAddBolsa'
    imgPlus.addEventListener('click', () => iniciaModal('modal-bolsa'));



    var titleAddBolsa = document.createElement('strong');
    titleAddBolsa.innerHTML = 'Adicionar bolsa';

    var textAddBolsa = document.createElement('p');
    textAddBolsa.innerHTML = 'Clique para adicionar bolsas de';

    var textAddBolsaTwo = document.createElement('p');
    textAddBolsaTwo.innerHTML = 'cursos do seu interesse';

    sectionCard.appendChild(divCard);
    divCard.appendChild(divItems);
    divItems.appendChild(containerImg);
    divItems.appendChild(containerAddBolsa);
    containerImg.appendChild(imgPlus);
    containerAddBolsa.appendChild(titleAddBolsa);
    containerAddBolsa.appendChild(textAddBolsa);
    containerAddBolsa.appendChild(textAddBolsaTwo);




    for (let index = 0; index < bolsas.length; index++) {
        const element = bolsas[index];

        if (semestreSelected == 'all' || element.enrollment_semester.includes(semestreSelected)) {



            const rating = element.university.score;

            // total number of stars
            const starTotal = 5;

            const starPercentage = (rating / starTotal) * 100;
            const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;


            var divCard = document.createElement('div');
            divCard.className = 'card';
            var divItems = document.createElement('div');
            divItems.className = 'itemsCard';

            var containerLogoFacul = document.createElement('div');
            containerLogoFacul.className = 'containerLogoFacul';
            var containerNameCourse = document.createElement('div');
            containerNameCourse.className = 'containerNameCourse';
            var hrcontainer = document.createElement('div');
            hrcontainer.className = 'containerhr';
            var containerTipo = document.createElement('div');
            containerTipo.className = 'containerTipo';
            var mensalidadePrice = document.createElement('div');
            mensalidadePrice.className = 'containerMensalidade';



            var imgCard = document.createElement('img');
            imgCard.className = 'logoFacul';
            imgCard.src = element.university.logo_url;

            var nameFacul = document.createElement('strong');
            nameFacul.className = 'nomeFacul';
            nameFacul.innerHTML = element.university.name;

            var nameCourse = document.createElement('p');
            nameCourse.className = 'nomeCourseCard';
            nameCourse.innerHTML = element.course.name;

            var starDiv = document.createElement('div');
            starDiv.className = 'starDiv';
            var spanRate = document.createElement('span');
            spanRate.className = 'spanRate';
            spanRate.innerHTML = element.university.score;

            var starOuter = document.createElement('div');
            starOuter.className = 'stars-outer';
            var starInner = document.createElement('div');
            starInner.className = 'stars-inner';
            starInner.style.width = starPercentageRounded;
            starOuter.appendChild(starInner);

            var horizontal = document.createElement('hr');
            horizontal.className = 'hdeitado';

            var horizontalTwo = document.createElement('hr');
            horizontalTwo.className = 'hdeitado';

            var presencialEad = document.createElement('strong');
            presencialEad.className = 'presencialEad';
            presencialEad.innerHTML = `${element.course.kind == 'Presencial' ? element.course.kind : 'ENSINO A DISTÂNCIA'} - ${element.course.shift}`

            var inicioAula = document.createElement('p');
            inicioAula.className = 'inicioAula';
            inicioAula.innerHTML = `Início das aulas em: ${element.start_date}`;

            var mensalidade = document.createElement('strong');
            mensalidade.className = 'mensalidadeCurso';
            mensalidade.innerHTML = `${element.enabled ? 'Mensalidade com o Quero Bolsa:' : 'Bolsa indisponível.'}`;


            var fullPrice = document.createElement('p');
            fullPrice.className = 'fullPrice';
            fullPrice.innerHTML = `R$ ${(element.full_price).toLocaleString('pt-br')}`;

            var priceDiscount = document.createElement('p');
            priceDiscount.className = 'priceDiscount';
            priceDiscount.innerHTML = `R$ ${(element.price_with_discount).toLocaleString('pt-br')} <span>/mês</span>`;


            var textEntreContato = document.createElement('p');
            textEntreContato.className = 'textEntreContato';
            textEntreContato.innerHTML = 'Entre em contato com nosso';
            var textEntreContatoTwo = document.createElement('p');
            textEntreContatoTwo.className = 'textEntreContatoTwo';
            textEntreContatoTwo.innerHTML = 'atendimento para saber mais.';


            var divBtnsCard = document.createElement('div');
            divBtnsCard.className = 'btnsCard';

            var btnExcluir = document.createElement('button');
            btnExcluir.className = 'btnExcluir';
            btnExcluir.innerHTML = 'Excluir'
            btnExcluir.onclick = removeBolsa;
            btnExcluir.name = index;

            var btnDispoIndispo = document.createElement('button');
            btnDispoIndispo.className = 'btnDispoIndispo';
            btnDispoIndispo.innerHTML = `${element.enabled ? 'Ver oferta' : 'Indisponível'}`
            btnDispoIndispo.disabled = !element.enabled;







            sectionCard.appendChild(divCard);
            divCard.appendChild(divItems);
            divItems.appendChild(containerLogoFacul);
            divItems.appendChild(containerNameCourse);
            divItems.appendChild(horizontal);
            divItems.appendChild(containerTipo);
            divItems.appendChild(horizontalTwo);

            divItems.appendChild(mensalidadePrice);

            containerLogoFacul.appendChild(imgCard);


            containerNameCourse.appendChild(nameFacul);
            containerNameCourse.appendChild(nameCourse);
            starOuter.appendChild(starInner);
            starDiv.appendChild(spanRate);
            starDiv.appendChild(starOuter);
            containerNameCourse.appendChild(starDiv);

            containerTipo.appendChild(presencialEad);
            containerTipo.appendChild(inicioAula);

            mensalidadePrice.appendChild(mensalidade);
            if (element.enabled) {
                mensalidadePrice.appendChild(fullPrice);
                mensalidadePrice.appendChild(priceDiscount);
            } else {
                mensalidadePrice.appendChild(textEntreContato);
                mensalidadePrice.appendChild(textEntreContatoTwo);
            }






            divBtnsCard.appendChild(btnExcluir);
            divBtnsCard.appendChild(btnDispoIndispo);


            divItems.appendChild(divBtnsCard);






        }

    }

}

function removeBolsa() {

    bolsas.splice(this.name, 1);

    cards();
}




function chooseSemestre(semestre) {
    switch (semestre) {
        case 'allSemestre':
            document.getElementById('allSemestre').className += ' btnSelected';
            document.getElementById('secondSemestre').classList.remove("btnSelected");
            document.getElementById('firstSemestre').classList.remove("btnSelected");
            semestreSelected = 'all';
            break;
        case 'secondSemestre':
            document.getElementById('secondSemestre').className += ' btnSelected';
            document.getElementById('allSemestre').classList.remove("btnSelected");
            document.getElementById('firstSemestre').classList.remove("btnSelected");
            semestreSelected = '2019';
            break;
        case 'firstSemestre':
            document.getElementById('firstSemestre').className += ' btnSelected';
            document.getElementById('allSemestre').classList.remove("btnSelected");
            document.getElementById('secondSemestre').classList.remove("btnSelected");
            semestreSelected = '2020';
            break;

        default:
            break;
    }

    cards();
}

function limpaFiltro() {
    document.getElementById('modal-bolsa').classList.remove('mostrar');
}

var sort = true;

function ordenarNome() {
    // rows.sort(function (a, b) {
    //     if (sort && a.university.name < b.university.name) {
    //         return -1;
    //     }
    //     if (sort && a.university.name > b.university.name) {
    //         return 1;
    //     }
    //     if (!sort && b.university.name > a.university.name) {
    //         return -1;
    //     }
    //     if (!sort && b.university.name < a.university.name) {
    //         return 1;
    //     }
    //     // a must be equal to b
    //     sort = !sort;
    //     return 0;
    // });
    if (sort) {
        document.getElementsByClassName('setaCimaBaixo').src = "img/icons/seta-para-baixo.svg";
        rows.sort((a, b) => {

            if (a.university.name < b.university.name) {
                return -1;
            }
            if (a.university.name > b.university.name) {
                return 1;
            }

            sort = !sort;

            return 0;

        });

    } else {
        document.getElementsByClassName('setaCimaBaixo').src = "img/icons/seta-para-cima.svg";
        rows.sort((a, b) => {

            if (a.university.name > b.university.name) {
                return -1;
            }
            if (a.university.name < b.university.name) {
                return 1;
            }

            sort = !sort;

            return 0;


        });

    }
    insertRowsTable();
}