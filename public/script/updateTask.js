
const updateTask =  async (element,id)=>{
    event.preventDefault();
    console.log(element.checked)
    try {
        let headers = new Headers ({ "Content-Type" : 'application/json'})
        let body = JSON.stringify({task : {done : element.checked}})
        let response = await fetch(`/task/${id}?_method=put`,{headers : headers,body:body,method : "PUT"})
        let data = await response.json();
        console.log(data)
    const parent = element.parentNode
    if(data.done){
        console.log("primeiro if")
        parent.classList.add("has-text-success")
        parent.classList.add("is-italic")
        // element.checked = true
    }else if(!(data.done)){
        console.log("toaqui no else")
        parent.classList.remove("has-text-success")
        parent.classList.remove("is-italic")
        // element.checked = false
    }
    } catch (error) {
        alert(error)
    }
    

}