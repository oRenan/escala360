async function carregarSelects() {
  const plantaoSelect = document.getElementById('plantao');
  const profissionalSelect = document.getElementById('profissional');

  const [plantoesRes, profissionaisRes] = await Promise.all([
    fetch('http://localhost:3000/api/plantoes/disponiveis'),
    fetch('http://localhost:3000/api/profissionais/ativos')
  ]);

  const plantoes = await plantoesRes.json();
  const profissionais = await profissionaisRes.json();

  plantoes.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.data} - ${p.hora_inicio} às ${p.hora_fim}`;
    plantaoSelect.appendChild(opt);
  });

  profissionais.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.nome;
    profissionalSelect.appendChild(opt);
  });
}

document.getElementById('alocacao-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const plantao = document.getElementById('plantao').value;
  const profissional = document.getElementById('profissional').value;

  const res = await fetch('http://localhost:3000/api/escalas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_plantao: plantao, id_profissional: profissional })
  });

  const result = await res.json();
  document.getElementById('resultado-alocacao').textContent = result.message || 'Alocação realizada!';
});

carregarSelects();