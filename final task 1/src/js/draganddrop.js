document.addEventListener('DOMContentLoaded', () => {
    [...document.getElementsByTagName('ui-draganddrop')].forEach(mainElement => {
        mainElement.classList.add('ui-draganddrop');

        const data = JSON.parse(mainElement.getAttribute('data'));
        const tableProps = JSON.parse(mainElement.getAttribute('table'));

        const drag = document.createElement('div');
        drag.classList.add('ui-draganddrop-drag');
        const show = JSON.parse(mainElement.getAttribute('show'));
        data.forEach((dataObject, idx) => {
            const dragElement = document.createElement('div');
            dragElement.setAttribute('draggable', 'true');

            dragElement.addEventListener('dragstart', (ev) => {
                ev.dataTransfer.effectAllowed='move';
                ev.dataTransfer.setData("idx", idx);
                return true;
            });

            const image = dataObject.img;
            if (image) {
                const imgElement = document.createElement('img');
                imgElement.src = image;
                dragElement.appendChild(imgElement);
            }
            dragElement.append(show.reduce((acc, cur) => `${acc} ${dataObject[cur]}`, ''));
            const dragIconWrapper = document.createElement('div');
            const dragIcon = document.createElement('i');
            dragIcon.className = 'fas fa-arrows-alt ui-draganddrop-drag-icon';
            dragIconWrapper.appendChild(dragIcon);
            dragElement.appendChild(dragIconWrapper);

            drag.appendChild(dragElement);
        });
        mainElement.appendChild(drag);

        const drop = document.createElement('table');
        drop.classList.add('ui-draganddrop-drop');

        drop.addEventListener('drop', (ev) => {
            ev.preventDefault();
            const idx = ev.dataTransfer.getData("idx");
            drag.childNodes[idx].style.display = "none";
            
            const row = document.createElement('tr');
            tableProps.forEach(prop => {
                const cell = document.createElement('td');
                cell.innerHTML = data[idx][prop];
                row.appendChild(cell);
            });
            drop.appendChild(row);
        });
        drop.ondragenter = (ev) => {
            ev.preventDefault();
            return true;
        }
        drop.ondragover = (ev) => {
            ev.preventDefault();
        }
    
        const header = document.createElement('tr');
        tableProps.forEach(cellName => {
            const cell = document.createElement('th');
            cell.innerHTML = cellName;
            header.appendChild(cell);
        });
        drop.appendChild(header);
        mainElement.appendChild(drop);
    });
});