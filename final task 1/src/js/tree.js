let observer = new MutationObserver((mutations) => {
    mutations.forEach(function(mutation) {
        if (mutation.type === "attributes") {
            if (mutation.attributeName === 'data') {
                drawTree(mutation.target, JSON.parse(mutation.target.getAttribute('data') || {}));
            }
            else if (mutation.attributeName === 'checked') {
                const tree = mutation.target.closest('ui-tree');
                console.log('new value:', [...tree.querySelectorAll('[checked]')]
                    .map(element => { console.log(element); return element.closest('.row1')}));

                tree.setAttribute('value', [...tree.querySelectorAll('[checked]')]
                    .map(element => element.closest('.row1').querySelector('.name').innerHTML).join(', '));
                const row1 = mutation.target.parentNode.parentNode;
                if (row1.hasAttribute('folder')) {
                    if (mutation.target.hasAttribute('checked')) {
                        [...row1.nextSibling.getElementsByTagName('input')]
                            .forEach(element => element.setAttribute('checked', ''));
                    }
                    else {
                        [...row1.nextSibling.getElementsByTagName('input')]
                            .forEach(element => element.removeAttribute('checked'));
                    }
                }
                mutation.target.checked = mutation.target.hasAttribute('checked');
            }
            else if (mutation.attributeName === 'expanded') {
                const row1 = mutation.target.parentElement;
                const row2 = row1.nextSibling;
                if (mutation.target.hasAttribute('expanded')) {
                    row2.style.display = 'block';
                    const openedFolder = document.createElement('i');
                    openedFolder.className = 'fas fa-folder-open';
                    row1.children[2].replaceWith(openedFolder);
                }
                else {
                    row2.style.display = 'none';
                    const closedFolder = document.createElement('i');
                    closedFolder.className = 'fas fa-folder';
                    row1.children[2].replaceWith(closedFolder);
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    [...document.getElementsByTagName('ui-tree')].forEach(treeElement => {
        treeElement.classList.add('ui-tree');
        drawTree(treeElement, JSON.parse(treeElement.getAttribute('data') || {}));
        observer.observe(treeElement, {
            attributes: true
        });
    });
});

function drawTree(element, dataArray) {
    element.innerHTML = '';
    element.classList.add('ui-tree-row');
    dataArray.forEach(data => {
        const arrowWrapper = document.createElement('div');
        const arrow = document.createElement('i');
        arrowWrapper.addEventListener('click', () => {
            if (arrowWrapper.hasAttribute('expanded')) {
                arrowWrapper.removeAttribute('expanded');
                arrowWrapper.style.transform = 'rotate(0deg)';
            }
            else {
                arrowWrapper.setAttribute('expanded', '');
                arrowWrapper.style.transform = 'rotate(90deg)';
            }
        });
        observer.observe(arrowWrapper, {
            attributes: true
        });
        arrowWrapper.appendChild(arrow);

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('ui-tree-checkbox-container')
        const id = Math.random().toString(36).substring(7);
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', data.name);
        checkbox.addEventListener('click', function (e) {
            e.target.hasAttribute('checked') 
                ? e.target.removeAttribute('checked')
                : e.target.setAttribute('checked', ''); 
        });
        observer.observe(checkbox, {
            attributes: true
        });
        checkbox.className = 'ui-checkbox';
        checkbox.id = id;
        const label = document.createElement('label');
        label.setAttribute('for', id);
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);


        const logo = document.createElement('i');
        const name = document.createElement('div');
        name.classList.add('name');
        name.innerHTML = data.name;

        const rows = document.createElement('div');
        const row1 = document.createElement('div');
        row1.classList.add('row1');
        const row2 = document.createElement('div');
        row2.classList.add('row2');
        row2.style.display = 'none';
        row1.appendChild(arrowWrapper);
        row1.appendChild(checkboxContainer);
        row1.appendChild(logo);
        row1.appendChild(name);
        rows.appendChild(row1);
        if (data.children && data.children.length) {
            row1.setAttribute('folder', '');
            logo.className = "fas fa-folder";
            row2.appendChild(drawTree(document.createElement('div'), data.children));
            arrow.className = 'fas fa-caret-right';
        }
        else {
            logo.className = "fas fa-file";
        }
        rows.appendChild(row2);
        element.appendChild(rows);
    });
    return element;
}