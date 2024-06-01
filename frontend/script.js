async function validateForm(e){
    e.preventDefault();
    var userName = document.getElementById('username').value;
    var passWord = document.getElementById('password').value;
    const formData = JSON.stringify({
    username: userName,
    password: passWord,
    });
    var res= await fetch("http://localhost:3001/login",{
        method:'POST',
        body:formData,
        headers:{'Content-Type':'application/json'}})

        if(res.ok){
            //console.log(res.json());
            var resData=await res.json();
            console.log(resData);
            if(resData.login==false){
                alert(resData.message);
            }else if(resData.login==true){
                window.location.href='/'
            }
        }
    }

function logout(){
    fetch("http://localhost:3001/logout",{
        method:'GET',
        redirect:'manual'
    })
    window.location.href='/login.html';
}