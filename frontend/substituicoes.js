fetch('http://localhost:3000/api/substituicoes/pendentes')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('substituicoes-container');
    container.innerHTML = '';
    data.forEach(item => {
      const bloco = document.createElement('div');
      bloco.innerHTML = `
        <p><strong>Solicitante:</strong> ${item.solicitante}</p>
        <p><strong>Substituto:</strong> ${item.substituto}</p>
        <p><strong>Data da Solicitação:</strong> ${new Date(item.data_solicitacao).toLocaleString()}</p>
        <hr>
      `;
      container.appendChild(bloco);
    });
  })
  .catch(err => {
    document.getElementById('substituicoes-container').innerHTML = '<p>Erro ao carregar substituições.</p>';
    console.error(err);
  });