export function uiConfirm (message, okCallback, cancelCallback) {
    function closeDialog (fn, ...args) {
        document.removeEventListener('click', outsideClickListener)
        document.body.removeChild(dialogWrapper);
        document.body.style.overflow = 'visible';
        return fn(...args);
    }

    function outsideClickListener (event, ...args) {
        if (!dialog.contains(event.target) || crossWrapper.contains(event.target)) {
            closeDialog(cancelCallback, event, ...args)
        }
    }

    const header = document.createElement('div');
    header.classList.add('ui-confirm-header');
    header.innerText = 'Confirmation';
    const crossWrapper = document.createElement('div');
    const cross = document.createElement('i');
    cross.className = 'fas fa-times';
    crossWrapper.appendChild(cross);
    header.appendChild(crossWrapper);

    const questionContainer = document.createElement('div');
    questionContainer.classList.add('ui-confirm-question-container');
    const question = document.createElement('i');
    question.className = 'fas fa-exclamation-triangle';
    questionContainer.appendChild(question);
    questionContainer.append(message);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('ui-confirm-buttons-container');
    const okButton = document.createElement('button');
    okButton.className = 'ui-button ui-button--primary';
    const okIcon = document.createElement('i');
    okIcon.className = 'fas fa-check';
    const okText = document.createElement('span');
    okText.innerText = 'Yes';
    okButton.appendChild(okIcon);
    okButton.appendChild(okText);
    okButton.addEventListener('click', (...args) => closeDialog(okCallback, ...args));
    buttonsContainer.appendChild(okButton);

    const cancelButton = document.createElement('button');
    cancelButton.className = 'ui-button ui-button--primary';
    const cancelIcon = document.createElement('i');
    cancelIcon.className = 'fas fa-times';
    const cancelText = document.createElement('span');
    cancelText.innerText = 'No';
    cancelButton.appendChild(cancelIcon);
    cancelButton.appendChild(cancelText);
    cancelButton.addEventListener('click', (...args) => closeDialog(cancelCallback, ...args));
    buttonsContainer.appendChild(cancelButton);

    const dialog = document.createElement('div');
    dialog.classList.add('ui-confirm');
    dialog.appendChild(header);
    dialog.appendChild(questionContainer);
    dialog.appendChild(buttonsContainer);

    const dialogWrapper = document.createElement('div');
    dialogWrapper.classList.add('ui-confirm-wrapper');
    dialogWrapper.appendChild(dialog);
    document.body.appendChild(dialogWrapper);

    setTimeout(() => {
        document.addEventListener('click', outsideClickListener)
    }, 0);
    document.body.style.overflow = 'hidden';
};