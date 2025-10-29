function create (ele,origin_id,attribute) {
    // ele: 作りたい要素のタグ「h1」など
    // origin_id: 親となる要素のid
    // attribute: 変更したい要素を「value,hellow」のようなペアで入れる
    const element = document.createElement(ele);

    for (let key in attribute){
        element.setAttribute(key,JSON.stringify(attribute));
    }

    document.getElementById(origin_id).appendChild(element);
}

export default create;
