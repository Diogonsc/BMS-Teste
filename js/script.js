
// LocalStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// Crud 

// CREATE ----------------------------------------------------------------
const createClient = (client) => {
    const dbClient = getLocalStorage() // buscando os dados
    dbClient.push (client)
    setLocalStorage(dbClient) // enviando os dados
}

//  READ -----------------------------------------------------------------
const readClient = () => {
    return getLocalStorage()
}

// UPDATE -----------------------------------------------------------------
const updateClient = (i, client) => {
    const dbClient =readClient()
    dbClient[i] = client
    setLocalStorage(dbClient)
}

// DELETE ------------------------------------------------------------------
const deleteClient = (i) => {
    const dbClient = readClient()
    dbClient.splice(i, 1)
    setLocalStorage(dbClient)
}

// verificando se os campos estão preenchidos
const isValidFields = () => {
   return document.getElementById('form').reportValidity() // verificando se os campos do formulário estão preenchidos
}

// linpando os dados do formulário
const clearFields = () => {
    const client = {
        id: '',
        nome: document.getElementById('nome').value ='',
        email: document.getElementById('email').value = '',
        endereco: document.getElementById('endereco').value = '',
        bairro: document.getElementById('bairro').value = '',
        cidade: document.getElementById('cidade').value = '',
        cep: document.getElementById('cep').value = '',
        uf: document.getElementById('uf').value = '',
        telefoneResidencial: document.getElementById('telefoneResidencial').value = '',
        telefoneCelular: document.getElementById('telefoneCelular').value = '',
    }
}

// layout
const saveClient = () => {
    if (isValidFields()) {
      // construindo um JSON com os dados do formulário
      const client = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        cep: document.getElementById("cep").value,
        uf: document.getElementById("uf").value,
        telefoneResidencial: document.getElementById("telefoneResidencial").value,
        telefoneCelular: document.getElementById("telefoneCelular").value,
      }
      const i = document.getElementById("editarNome").dataset.i;
      if (i == "new") {
        createClient(client);
        updateTable();
        clearFields(client);
      } else {
        updateClient(i, client);
        updateTable();
      }
    }
  };

// criando as linhas da tabea
const createRow = (client, i) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.cidade}</td>
    <td>${client.telefoneCelular}</td>
    <td>
        <button type="button" class="btn btn-primary me-2" id="edit-${i}" data-bs-toggle="modal" data-bs-target="#exampleModal">EDITAR</buttony>
        <button type="button" class="btn btn-danger" id="delete-${i}">EXCLUIR</button>
    </td>
    `
    document.querySelector('#table-client>tbody').appendChild(newRow)
}

//  limpando os dados da tabela
const clearTable = () => {
    const rows = document.querySelectorAll('#table-client> tr')
    rows.forEach((row) => row.parentNode.removeChild(row))
}

// carregando a tabela
const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

updateTable()

// chamando os dados para o formulário
const fillFields = (client) => {
    document.getElementById('editarNome').value = client.nome,
    document.getElementById('editarEmail').value = client.email,
    document.getElementById('editarEndereco').value = client.endereco,
    document.getElementById('editarBairro').value = client.bairro,
    document.getElementById('editarCidade').value = client.cidade,
    document.getElementById('editarCep').value = client.cep,
    document.getElementById('editarUf').value = client.uf,
    document.getElementById('editarTelefoneResidencial').value = client.telefoneResidencial,
    document.getElementById('editarTelefoneCelular').value = client.telefoneCelular,
    document.getElementById('nome').dataset.i = client.i // para atualizar os dados
}

const editeClient = (i) => {
    const client = readClient()[i]
    client.i = i
    fillFields(client)
}

// editando o cliente no modal
const editDelete = (e) => {
    if(e.target.type === 'button'){
        const [action, i] = e.target.id.split('-')

        if(action == 'edit') {
            editeClient(i)
        }else {
            deleteClient(i)
            updateTable()
        }
    }
    
}

document.getElementById("editModal").addEventListener('click', function() {

    document.getElementById('editarNome').removeAttribute("disabled")
    document.getElementById('editarEmail').removeAttribute("disabled")
    document.getElementById('editarEndereco').removeAttribute("disabled")
    document.getElementById('editarBairro').removeAttribute("disabled")
    document.getElementById('editarCidade').removeAttribute("disabled")
    document.getElementById('editarCep').removeAttribute("disabled")
    document.getElementById('editarUf').removeAttribute("disabled")
    document.getElementById('editarTelefoneResidencial').removeAttribute("disabled")
    document.getElementById('editarTelefoneCelular').removeAttribute("disabled")

    this.style.display = 'none'
    document.getElementById("saveModal").style.display = 'block'
})

// Eventos
document.getElementById('salvar').addEventListener('click', saveClient)

document.querySelector('#table-client>tbody')
.addEventListener('click', editDelete)

// Alert message 
const mostraAlerta = () => {
    if(isValidFields()){
        let alerta = document.getElementById('alerta')
        alerta.classList.toggle('d-none')
    }
}

mostraAlerta()