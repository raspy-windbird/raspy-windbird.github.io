class dom {
create (ele,origin_id,attribute) {
    // ele: 作りたい要素のタグ「h1」など
    // origin_id: 親となる要素のid
    // attribute: 変更したい要素を「value,hellow」のようなペアで入れる
    
    const element = document.createElement(ele);
    
    for (let key in attribute){
        element.setAttribute(key,attribute[key]);
    }

    document.getElementById(origin_id).appendChild(element);
}

clicked (dom,dothing,One){
    document.addEventListener("DOMContentLoaded",() => {
    if (dom) {
        dom.addEventListener("click", () => {
            dothing();
        }, { once: One})
    }
    })
}

}

export default dom;
