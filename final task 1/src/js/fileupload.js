document.addEventListener('DOMContentLoaded', () => {
    [...document.getElementsByTagName('ui-fileupload')].forEach(fileElement => {
        fileElement.classList.add('ui-fileupload')
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        fileElement.appendChild(input);

        const header = document.createElement('div');
        header.classList.add('ui-fileupload-header');

        const chooseButton = document.createElement('button');
        chooseButton.className = 'ui-button ui-button--primary';
        const chooseIcon = document.createElement('i');
        chooseIcon.className = 'fas fa-plus';
        const chooseText = document.createElement('span');
        chooseText.innerText = 'Choose';
        chooseButton.appendChild(chooseIcon);
        chooseButton.appendChild(chooseText);
        header.append(chooseButton);

        const uploadButton = document.createElement('button');
        uploadButton.className = 'ui-button ui-button--primary';
        const uploadIcon = document.createElement('i');
        uploadIcon.className = 'fas fa-upload';
        const uploadText = document.createElement('span');
        uploadText.innerText = 'Upload';
        uploadButton.appendChild(uploadIcon);
        uploadButton.appendChild(uploadText);
        header.append(uploadButton);

        const cancelButton = document.createElement('button');
        cancelButton.addEventListener('click', () => {
            filesList.innerHTML = '';
        });
        cancelButton.className = 'ui-button ui-button--primary';
        const cancelIcon = document.createElement('i');
        cancelIcon.className = 'fas fa-times';
        const cancelText = document.createElement('span');
        cancelText.innerText = 'Cancel';
        cancelButton.appendChild(cancelIcon);
        cancelButton.appendChild(cancelText);
        header.append(cancelButton);

        fileElement.append(header)

        const filesList = document.createElement('div');
        filesList.classList.add('ui-fileupload-files-list');
        fileElement.appendChild(filesList);


        function appendFile (preview, file) {
            const fileContainer = document.createElement('div');
            fileContainer.classList.add('ui-fileupload-file-container');
            const name = document.createElement('div');
            name.innerText = file.name;
            const size = document.createElement('div');
            size.innerText = `${Math.ceil(file.size / 1024)} KB`;
            const remove = document.createElement('button');
            remove.addEventListener('click', () => {
                const container = remove.parentNode;
                container.parentNode.removeChild(container);
            });
            remove.className = 'ui-button ui-button--primary';
            const removeIcon = document.createElement('i');
            removeIcon.className = 'fas fa-times';
            remove.appendChild(removeIcon);
                
            fileContainer.appendChild(preview);
            fileContainer.appendChild(name);
            fileContainer.appendChild(size);
            fileContainer.appendChild(remove);
            filesList.appendChild(fileContainer);
        }

        let file;
        
        chooseButton.addEventListener("click", () => {
            input.click();
            input.onchange = () => {
        
            file = input.files[0];
        
            handleFile(file);
            };
        });
        
        const handleFile = (file) => {      
            if (
            file.type === "text/html" ||
            file.type === "text/css" ||
            file.type === "text/javascript"
            )
            return;
        
            if (file.type === "application/pdf") {
            createIframe(file);
            return;
            }
        
            const type = file.type.replace(/\/.+/, "");       
            switch (type) {
            case "image":
                createImage(file);
                break;
            case "audio":
                createAudio(file);
                break;
            case "video":
                createVideo(file);
                break;
            case "text":
                createText(file);
                break;
            default:
                createLogo(file);
                break;
            }
        };
        
        const createImage = (image) => {
            const imageEl = document.createElement("img");
            imageEl.src = URL.createObjectURL(image);
            appendFile(imageEl, image);
            URL.revokeObjectURL(image);
        };
        
        const createAudio = (audio) => {
            const audioEl = document.createElement("audio");
            audioEl.setAttribute("controls", "");
            audioEl.src = URL.createObjectURL(audio);
            appendFile(audioEl, audio);
            audioEl.play();
            URL.revokeObjectURL(audio);
        };
        
        const createVideo = (video) => {
            const videoEl = document.createElement("video");
            videoEl.setAttribute("controls", "");
            videoEl.setAttribute("loop", "true");
            videoEl.src = URL.createObjectURL(video);
            appendFile(videoEl);
            videoEl.play();
            URL.revokeObjectURL(video);
        };
        
        const createText = (text) => {
            const reader = new FileReader();
            reader.readAsText(text, "windows-1251");
            const result = document.createElement('span');
            reader.onload = () => { result.innerHTML = reader.result; appendFile(result, text) };
        };
        
        const createIframe = (pdf) => {
            const iframe = document.createElement("iframe");
            iframe.src = URL.createObjectURL(pdf);
            iframe.width = innerWidth;
            iframe.height = innerHeight;
            appendFile(iframe, pdf);
            URL.revokeObjectURL(pdf);
        };

        const createLogo = (file) => {
            const fileLogoWrapper = document.createElement('div');
            const fileLogo = document.createElement('i');
            fileLogo.className = 'fas fa-file';
            fileLogoWrapper.appendChild(fileLogo);
            fileLogoWrapper.src = URL.createObjectURL(file);
            appendFile(fileLogoWrapper, file);
            URL.revokeObjectURL(file);
        }
    });
});