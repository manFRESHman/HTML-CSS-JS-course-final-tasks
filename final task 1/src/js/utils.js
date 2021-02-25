function changeTagName(original, tag) {
    const replacement = document.createElement(tag);
    for(let i = 0; i < original.attributes.length; ++i){
        replacement.setAttribute(original.attributes.item(i).nodeName, 
            original.attributes.item(i).nodeValue);
    }
    replacement.innerHTML = original.innerHTML;
    return replacement;
}

export {
    changeTagName,
}