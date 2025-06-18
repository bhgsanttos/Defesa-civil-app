const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const containerEstados = document.getElementById("estados-container");
const listaAlertas = document.getElementById("lista-alertas");

// Cria botões para cada estado
estados.forEach(uf => {
  const btn = document.createElement("button");
  btn.classList.add("estado-btn");
  btn.textContent = uf;
  btn.onclick = () => carregarAlertas(uf);
  containerEstados.appendChild(btn);
});

// Função que carrega os alertas da Defesa Civil para o estado selecionado
function carregarAlertas(uf) {
  listaAlertas.innerHTML = "<li>🔄 Carregando alertas...</li>";

  fetch(`https://apicdc.saude.gov.br/alertas?uf=${uf}`)
    .then(res => res.json())
    .then(data => {
      listaAlertas.innerHTML = "";
      if (data.length === 0) {
        listaAlertas.innerHTML = "<li>✅ Nenhum alerta ativo no momento.</li>";
        return;
      }

      data.forEach(alerta => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${alerta.titulo}</strong><br>
          <em>${alerta.descricao}</em><br>
          <small>${new Date(alerta.inicio).toLocaleString()} até ${new Date(alerta.fim).toLocaleString()}</small>
        `;
        listaAlertas.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      listaAlertas.innerHTML = "<li>❌ Erro ao carregar alertas.</li>";
    });
}
