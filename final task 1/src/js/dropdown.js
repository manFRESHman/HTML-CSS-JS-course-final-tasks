import { changeTagName } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    [...document.getElementsByTagName('ui-dropdown')].forEach(dropDownElement => {
        const newDropDown = changeTagName(dropDownElement, 'div');
        newDropDown.innerHTML = '';
        newDropDown.classList.add('ui-dropdown');
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes" && mutation.attributeName === 'value') {
                    selected.innerHTML = mutation.target.getAttribute(mutation.attributeName) || newDropDown.getAttribute('placeholder');
                }
            });
        });
        observer.observe(newDropDown, {
            attributes: true
        });

        const selectedContainer = document.createElement('div');
        selectedContainer.classList.add('ui-dropdown-selected')

        const selected = document.createElement('div');
        if (newDropDown.hasAttribute('multi')) {
            selected.classList.add('ui-dropdown-selected-option');
        }
        selected.innerHTML = dropDownElement.getAttribute('placeholder');
        
        const angle = document.createElement('i');
        angle.className = 'fas fa-angle-down ui-dropdown-angle';
        selectedContainer.appendChild(selected);
        selectedContainer.appendChild(angle);
        newDropDown.appendChild(selectedContainer);

        const optionsContainer = document.createElement('div');
        
        [...dropDownElement.getElementsByTagName('ui-dropdown-option')].forEach(selectElement => {
            const option = changeTagName(selectElement, 'div');
            option.classList.add('ui-dropdown-option');
            if (newDropDown.hasAttribute('multi')) {
                const id = Math.random().toString(36).substring(7);
                const checkbox = document.createElement('input');
                checkbox.setAttribute('disabled', '');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.className = 'ui-checkbox';
                checkbox.id = id;
                const label = document.createElement('label');
                label.setAttribute('for', id);
                option.insertBefore(label, option.firstChild);
                option.insertBefore(checkbox, option.firstChild);
            }
            option.addEventListener('click', () => {
                if (newDropDown.hasAttribute('multi')) {
                    if (option.hasAttribute('selected')) {
                        option.removeAttribute('selected');
                        option.firstChild.removeAttribute('checked');
                    }
                    else {
                        option.setAttribute('selected', '');
                        option.firstChild.setAttribute('checked', '');
                    }
                    newDropDown.setAttribute('value', '');
                    [...optionsContainer.querySelectorAll('[selected]')].forEach((selectedOption) => {
                        const newSelectedOption = document.createElement('div');
                        newSelectedOption.innerHTML = selectedOption.innerHTML;
                        newSelectedOption.removeChild(newSelectedOption.firstChild);
                        const newValue = newDropDown.getAttribute('value') + 
                            (selectedOption.getAttribute('value') || `<div>${newSelectedOption.innerHTML}</div>`);
                        newDropDown.setAttribute('value', newValue);
                    });
                }
                else {
                    optionsContainerWrapper.style.display = 'none';
                    [...dropDownElement.getElementsByTagName('ui-dropdown-option')]
                        .forEach(selectElement => selectElement.removeAttribute('selected'));
                    option.setAttribute('selected', '');
                    newDropDown.setAttribute('value', option.getAttribute('value') || option.innerHTML);
                }
            });
            optionsContainer.appendChild(option);
        });
       
        const optionsContainerWrapper = document.createElement('div');
        optionsContainerWrapper.classList.add('ui-dropdown-options-container');
        selectedContainer.addEventListener('click', () => {
            if (optionsContainerWrapper.style.display === 'none'){
                optionsContainerWrapper.style.display = 'block';
            }
            else {
                optionsContainerWrapper.style.display = 'none';
            }
        });
        if (newDropDown.hasAttribute('filter')) {
            const filterElement = document.createElement('div');
            filterElement.className = 'ui-inputgroup ui-dropdown-filter';
            const filterInput = document.createElement('input');
            const optionList = [...optionsContainer.getElementsByClassName('ui-dropdown-option')];
            filterInput.oninput = () => {
                function appendChildren(parent, children) {
                    parent.innerHTML = '';
                    children.forEach((c) => parent.appendChild(c));
                    return parent;
                }

                if (filterInput.value) {
                    appendChildren(optionsContainer, optionList.filter((c) => {
                        return c.innerText.trim().toUpperCase().startsWith(filterInput.value.trim().toUpperCase());
                    }));
                } else {
                    appendChildren(optionsContainer, optionList);
                }
            };
            filterInput.className = 'ui-dropdown-filter-input';
            const filterLogoWrapper = document.createElement('span');
            filterLogoWrapper.className = 'ui-inputgroup-addon ui-dropdown-filter-logo';
            const filterLogo = document.createElement('i');
            filterLogo.className = 'fas fa-search';
            filterLogoWrapper.appendChild(filterLogo);
            filterElement.appendChild(filterInput);
            filterElement.appendChild(filterLogoWrapper);
            optionsContainerWrapper.appendChild(filterElement);
        }
        optionsContainerWrapper.appendChild(optionsContainer);
        newDropDown.appendChild(optionsContainerWrapper);
        dropDownElement.replaceWith(newDropDown);
        newDropDown.style.position = 'relative';
        optionsContainerWrapper.style.display = 'none';
    });
});