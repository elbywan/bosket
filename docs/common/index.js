import "./index.css"
import "./libs/prismjs/themes/prism-tomorrow.css"
import "./polyfills"

window.onload = () => {
    const styleTags = document.getElementsByTagName("style")
    // Mark initial styles
    for(let i = 0; i < styleTags.length; i++)
        styleTags[i].setAttribute("class", "initial")
}

window.bosketDemo = {
    load: framework => {
        const styleTags = document.getElementsByTagName("style")
        for(let i = 0; i < styleTags.length; i++) {
            const tag = styleTags[i]
            if(!tag.getAttribute("class") || tag.getAttribute("class").indexOf("initial") < 0)
                tag.remove()
        }
        let scriptTag = document.getElementById("framework-script")
        if(scriptTag) scriptTag.remove()
        scriptTag = document.createElement("script")
        scriptTag.setAttribute("id", "framework-script")
        document.head.appendChild(scriptTag)
        scriptTag.src = `./${framework}/${framework}.js`
    }
}