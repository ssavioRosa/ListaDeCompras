class Itens {
    constructor() {
        this.arrayItens = [];
        this.editar = null;
    }

 
    Save(nome, quantidade, medida) {
       
        let item = this.Ler(nome, quantidade, medida);
        this.arrayItens.push(item);
        this.Listar();

        document.getElementById('nomeItem').value = '';
        document.getElementById('quantidade').value = '';
        document.getElementById('medida').value = '';

        
        this.editar = null
    }

    Ler(nome, quantidade, medida) {
        let item = {
            nomeItem: nome,
            quantidadeItem: quantidade,
            medidaItem: medida
        };
        return item;
    }


    Listar(){
        let tbody  = document.getElementById('tbody');
        tbody.innerHTML = "";

        for (let i = 0; i < this.arrayItens.length; i++) {

            let tr = tbody.insertRow();


            let td_nome = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_medida = tr.insertCell();
            let td_acao = tr.insertCell();

            td_nome.innerText = this.arrayItens[i].nomeItem;
            td_quantidade.innerText = this.arrayItens[i].quantidadeItem;
            td_medida.innerText = this.arrayItens[i].medidaItem;

            let imgEdit = document.createElement('icon');
            let imgDelete = document.createElement('icon');
            
            imgEdit.setAttribute('onclick', 'itens.Edite('+JSON.stringify(this.arrayItens[i]) +')')


            imgDelete.setAttribute('onclick', 'itens.Delete('+i+')')
            imgEdit.innerHTML = '<i class="bi bi-pencil-square"></i>';
            imgDelete.innerHTML ='<i class="bi bi-trash3"></i>';

            td_acao.appendChild(imgEdit);
            td_acao.appendChild(imgDelete);

            console.log(this.arrayItens);
            let button = document.getElementById('botao');
             button.textContent = 'Adicionar';

           
            
        }

    }
    Delete(array) {
        
        if (confirm('Deseja realmente apagar esse item?')) {
             this.arrayItens.splice(array, 1);
            itens.Listar();
        }

           
    }
    Edite(itens){
        if (confirm("Deseja realmente editar esse item ?")) {
            
      
        const elemento = document.querySelector(".adicionar");
        const posicaoTopo = elemento.offsetTop;
        window.scrollTo({ top: posicaoTopo, behavior: "smooth" });

        this.editar = itens.nomeItem;
        console.log(this.editar)
        document.getElementById('nomeItem').value = itens.nomeItem;
        document.getElementById('quantidade').value = itens.quantidadeItem;
        document.getElementById('medida').value = itens.medidaItem;
        let button = document.getElementById('botao');
        button.textContent = 'Editar';
      }
    }
    EfetuarEdit(nome, quantidade, medida){
        

        this.arrayItens.forEach(element => {
            if (element.nomeItem === this.editar) {
                element.nomeItem = nome;
                element.quantidadeItem = quantidade;
                element.medidaItem = medida;
                this.editar = null;
                this.Listar();
                
            }
            
        });
       

    }

 
}

let itens = new Itens();

const formulario = document.querySelector('#formulario');


formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    console.log("previnido");
    console.log(itens.editar)

    
    const nome = evento.target.querySelector("#nomeItem").value;
    const quantidade = evento.target.querySelector("#quantidade").value;
    const medida = evento.target.querySelector("#medida").value;

    if (!nome) {
        setResposta("Nome incorreto");
        return;
    }
    if (!quantidade) {
        setResposta("Quantidade incorreta");
        return;
    }
    if (!nome && !quantidade) {
        setResposta("Nome e quantidade incorretos");
        return;
    }
    if (itens.editar === null) {
        itens.Save(nome, quantidade, medida);
        setResposta(`Item ${nome}, ${quantidade} ${medida}(s) adicionados com sucesso!`);
    }
    else {
            itens.EfetuarEdit(nome, quantidade, medida);
            setResposta(`Item editado com sucesso!`);
            itens.editar = null
        }
 

});


    


function setResposta(msg) {
    const resposta = document.querySelector("#resposta");
    resposta.innerHTML = msg;
}