let carrinho = JSON.parse(localStorage.getItem('ray_carrinho') || '[]');
let total = parseFloat(localStorage.getItem('ray_total') || 0);

function salvar() {
  localStorage.setItem('ray_carrinho', JSON.stringify(carrinho));
  localStorage.setItem('ray_total', total);
}

function selecionarTam(botao) {
  let grupo = botao.parentElement;
  grupo.querySelectorAll('button').forEach(b => b.classList.remove('selecionado'));
  botao.classList.add('selecionado');
}

function adicionarCarrinho(botao, nome, preco) {
  let produto = botao.closest('.produto');
  let tam = produto.querySelector('.tamanhos button.selecionado');
  let tamanho = tam ? tam.innerText : 'M';
  carrinho.push({ nome: nome + ' - Tam: ' + tamanho, preco });
  total += preco;
  salvar();
  atualizarCarrinho();
  alert(nome + ' - Tam ' + tamanho + ' adicionado! ✨');
}

function atualizarCarrinho() {
  let cont = document.getElementById('contador');
  let tot = document.getElementById('total');
  let lista = document.getElementById('lista-carrinho');
  if (!cont) return;
  cont.innerText = `🛒 Carrinho: ${carrinho.length} item(ns) - R$ ${total.toFixed(2).replace('.', ',')}`;
  if (tot) tot.innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  if (lista) {
    lista.innerHTML = '';
    carrinho.forEach((item, i) => {
      let li = document.createElement('li');
      li.style = 'padding:8px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;';
      li.innerHTML = `<span>${item.nome}</span> <span>R$ ${item.preco.toFixed(2).replace('.', ',')} <button onclick="remover(${i})" style="background:red;color:white;border:none;padding:2px 8px;border-radius:5px;cursor:pointer;">X</button></span>`;
      lista.appendChild(li);
    });
  }
}

function remover(i) {
  total -= carrinho[i].preco;
  carrinho.splice(i, 1);
  salvar();
  atualizarCarrinho();
}

function pesquisar() {
  let termo = document.getElementById('pesquisa').value.toLowerCase();
  let achou = 0;
  document.querySelectorAll('.produto').forEach(p => {
    if (p.dataset.nome.includes(termo)) { p.style.display = 'block'; achou++; }
    else p.style.display = 'none';
  });
  let n = document.getElementById('nenhum');
  if (n) n.style.display = achou === 0 ? 'block' : 'none';
}

function finalizarCompra() {
  if (carrinho.length === 0) { alert('Seu carrinho está vazio!'); return; }
  window.location.href = 'checkout.html';
}

// Quando abre a página, mostra o carrinho que já tinha
atualizarCarrinho();