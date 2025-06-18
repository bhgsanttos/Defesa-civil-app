function carregarAlertas(uf) {
  listaAlertas.innerHTML = "<li>🔄 Carregando alertas...</li>";

  fetch('alertas.json') // API simulada
    .then(res => {
      if (!res.ok) throw new Error("Falha no fetch");
      return res.json();
    })
    .then(all => {
      const data = all[uf] || [];
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
