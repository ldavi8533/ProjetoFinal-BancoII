function salvar(){

    const obj = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        filme: document.getElementById('filme').value,
        comentario: document.getElementById('comentario').value
    };

    if(obj.nome == "" || obj.email == "" || obj.filme == ""  || obj.comentario == ""){
      alert("Todos os campos devem ser preenchidos")
    }

    else{
    fetch("http://localhost:3000/pessoas",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Salvo com sucesso')})
    .catch(error => alert('Falha ao salvar!'));
  }
}