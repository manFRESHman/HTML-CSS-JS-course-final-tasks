import { changeTagName } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    [...document.getElementsByTagName('ui-inputswitch')].forEach(switchElement => {
        const checkbox = changeTagName(switchElement, 'input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('checkbox');
        
        const knobs = document.createElement('div');
        knobs.classList.add('knobs');

        const layer = document.createElement('div');
        layer.classList.add('layer');

        const button = document.createElement('div');
        button.classList.add('button');

        button.appendChild(checkbox);
        button.appendChild(knobs);
        button.appendChild(layer);
        switchElement.replaceWith(button);
    });
});