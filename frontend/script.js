fetch('http://localhost:3000/api/escalas')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('escalas-container');
    container.innerHTML = '';
    data.forEach(item => {
      const bloco = document.createElement('div');
      bloco.innerHTML = `
        <p><strong>Data:</strong> ${item.data}</p>
        <p><strong>Horário:</strong> ${item.hora_inicio} - ${item.hora_fim}</p>
        <p><strong>Profissional:</strong> ${item.nome}</p>
        <hr>
      `;
      container.appendChild(bloco);
    });
  })
  .catch(err => {
    document.getElementById('escalas-container').innerHTML = '<p>Erro ao carregar escalas.</p>';
    console.error(err);
  });