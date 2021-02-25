document.addEventListener('DOMContentLoaded', () => {
    let maskedInputs = document.querySelectorAll('.ui-inputmask');
    let maskedNumber = 'XdDmMyY9';
    let maskedLetter = '_';
    
    function setUpMasks(inputs) {
        let i, l = inputs.length;
        for(i = 0; i < l; i++) {
            createShell(inputs[i]);
        }
    }
    
    // replaces each masked input with a shall containing the input and it's mask.
    function createShell(input) {
        const placeholder = input.getAttribute('placeholder');
        input.setAttribute('maxlength', placeholder.length);
        input.setAttribute('data-placeholder', placeholder);
        input.removeAttribute('placeholder');
    
        const text = `<span class="ui-inputmask-shell">
            <span aria-hidden="true" id="${input.id}Mask">
                <i></i>
                ${placeholder}
            </span>
            ${input.outerHTML}
        </span>`;
    
        input.outerHTML = text;
    }
    
    function setValueOfMask(e) {
        const value = e.target.value;
        return `<i>${value}</i>${e.target.getAttribute('data-placeholder').substr(value.length)}`;
    }
    
    // add event listeners
    function activateMasking(inputs) {
        for (let i = 0, l = inputs.length; i < l; i++) {
            maskedInputs[i].addEventListener('keyup', (e) => handleValueChange(e)); 
        }
    }
    
    function handleValueChange(e) {
        const id = e.target.getAttribute('id');
        if ([9, 16, 17, 18, 20, 37, 38, 39, 40].includes(e.keyCode)) return;
        document.getElementById(id).value = handleCurrentValue(e);
        document.getElementById(id + 'Mask').innerHTML = setValueOfMask(e);
    
    };
    
    function handleCurrentValue(e) {
        const isCharsetPresent = e.target.getAttribute('data-charset');
        const placeholder = isCharsetPresent || e.target.getAttribute('data-placeholder');
        const value = e.target.value;
        const l = placeholder.length;
        let newValue = '';
    
        // strip special characters
        const strippedValue = value.replace(isCharsetPresent ? /\W/g : /\D/g, "");
    
        for (let i = 0, j = 0; i < l; i++) {
            const isInt = !isNaN(parseInt(strippedValue[j]));
            const isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
            const matchesNumber = maskedNumber.indexOf(placeholder[i]) >= 0;
            const matchesLetter = maskedLetter.indexOf(placeholder[i]) >= 0;
    
            if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
                newValue += strippedValue[j++];
            } else if ((!isCharsetPresent && !isInt && matchesNumber) 
                || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {
                    return newValue; 
            } else {
                newValue += placeholder[i];
            } 
            // break if no characters left and the pattern is non-special character
            if (strippedValue[j] == undefined) { 
                break;
            }
        }
        if (e.target.getAttribute('data-valid-example')) return validateProgress(e, newValue);
        return newValue;
    }
    
    function validateProgress(e, value) {
        const l = value.length;
    
        //convert to months
        if (l == 1 && e.target.getAttribute('data-placeholder').toUpperCase().substr(0,2) == 'MM') {
            if(value > 1 && value < 10) {
                value = `0${value}`;
            }
            return value;
        }
        // test the value, removing the last character, until what you have is a submatch
        for (let i = l; i >= 0; i--) {
            const testValue = value + e.target.getAttribute('data-valid-example').substr(value.length);
            if (new RegExp(e.target.getAttribute('pattern')).test(testValue)) return value;
            value = value.slice(0, -1);
        }
        return value;
    }
      
    setUpMasks(maskedInputs);
    maskedInputs = document.querySelectorAll('.ui-inputmask');
    activateMasking(maskedInputs);
});