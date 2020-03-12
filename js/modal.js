

function iniciaModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('mostrar');
        modal.addEventListener('click', (evento) => {
            if (evento.target.id == modalId || evento.target.className == 'fechar') {
                modal.classList.remove('mostrar');
            }
        });
    }

}

const addBolsa = document.querySelector('.adiocionaBolsa');
addBolsa.addEventListener('click', () => iniciaModal('modal-bolsa'))






