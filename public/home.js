const button = document.getElementById('button')

button.addEventListener('click',()=>{
    const input = document.getElementById("name")
    const a = document.getElementById('link')
    const value = input.value
    if(value){
        a.href = `${value}`
    }else{
        a.href='/'
    }
})