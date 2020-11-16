let list = []
function getLocal(){
    let str = localStorage.getItem("cardGame")
    if (str) {
        list = JSON.parse(str)
        return list
    }
}

function setLocal(obj){
    let str = localStorage.getItem("cardGame");
    if (str){
        list = JSON.parse(str);
    };
    list.push(obj);
    localStorage.setItem(("cardGame"),JSON.stringify(list));
}

function updateLocal(obj){
    console.log(obj.cuid)
    let str = localStorage.getItem("cardGame");
    if (str){
        list = JSON.parse(str);
    };
    list.forEach((item,i)=>{
        if (item.cuid === obj.cuid){
            // console.log(item)
            list[i] = obj
        }
    })
    localStorage.setItem(("cardGame"),JSON.stringify(list));
}

function deleteLocal(filteredList){
    localStorage.setItem(("cardGame"),JSON.stringify(filteredList));
}

export {getLocal,setLocal,updateLocal,deleteLocal}