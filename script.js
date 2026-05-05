// ================= NAVEGAÇÃO ENTRE PÁGINAS =================
function goToPage(pageId) {
  // Esconde todas as seções
  document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
  // Mostra a página desejada
  document.getElementById(pageId).classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ================= CADASTRO MÉDICO =================
function toggleCadastro(show) {
  const cadastroFields = document.getElementById('cadastro-fields');
  cadastroFields.classList.toggle('hidden', !show);
}

// ================= TRIAGEM / FORMULÁRIO =================
function selecionarIntensidade(valor) {
  alert("Intensidade selecionada: " + valor);
}

// ================= FILA DE PACIENTES =================
let pacientes = [
  { nome: "Sophia S.", intensidade: "Intensa", prioridade: "Emergência" },
  { nome: "Hfirwgfluwh H.", intensidade: "Intensa", prioridade: "Emergência" },
  { nome: "Yhtu7y5fiu Y.", intensidade: "Forte", prioridade: "Alta" },
  { nome: "Nvjyfyfyg", intensidade: "Forte", prioridade: "Alta" },
  { nome: "Nicolly N.", intensidade: "Moderada", prioridade: "Média" },
  { nome: "Smms S.", intensidade: "Moderada", prioridade: "Média" }
];

// Adiciona paciente a fila
function entrarNaFila() {
  const nomePaciente = document.getElementById('nome-paciente').value || "Paciente X";
  const novoPaciente = { nome: nomePaciente, intensidade: "Moderada", prioridade: "Média" };
  pacientes.push(novoPaciente);
  atualizarFila();
  goToPage('page-fila');
}

// Atualiza lista de pacientes na página de fila
function atualizarFila() {
  const lista = document.getElementById('lista-pacientes');
  lista.innerHTML = '';

  pacientes.forEach((p, i) => {
    const li = document.createElement('li');
    li.className = "flex justify-between p-2 bg-emerald-50 rounded-xl";
    li.innerHTML = `${i + 1}. ${p.nome} <span class="${p.prioridade === 'Emergência' ? 'text-red-500' : p.prioridade === 'Alta' ? 'text-orange-400' : 'text-yellow-400'}">${p.prioridade}</span>`;
    lista.appendChild(li);
  });

  // Atualiza posição do paciente recém-adicionado
  const posicao = pacientes.length;
  document.getElementById('posicao-fila').innerText = posicao + "º";
}

// ================= ÁREA MÉDICA =================
function logarMedico() {
  const nomeMedico = document.getElementById('nome-medico').value || "Dr(a). User";
  document.getElementById('medico-logado').innerText = nomeMedico;
  popularDashboard();
  goToPage('page-dashboard');
}

// Mostra pacientes no dashboard médico
function popularDashboard() {
  const ul = document.getElementById('lista-dashboard');
  ul.innerHTML = '';
  let totalEmergencias = 0;

  pacientes.forEach((p, i) => {
    if (p.prioridade === 'Emergência') totalEmergencias++;

    const li = document.createElement('li');
    li.className = "fila-item flex justify-between p-2 rounded cursor-pointer hover:bg-blue-600";
    li.innerHTML = `<span>${i + 1}. ${p.nome} - ${p.intensidade}</span> <span class="${p.prioridade === 'Emergência' ? 'text-red-500' : p.prioridade === 'Alta' ? 'text-orange-400' : 'text-yellow-300'}">${p.prioridade}</span>`;
    li.onclick = () => mostrarDetalhesPaciente(p);
    ul.appendChild(li);
  });

  document.getElementById('total-pacientes').innerText = pacientes.length;
  document.getElementById('total-emergencias').innerText = totalEmergencias;
}

// Mostra detalhes do paciente selecionado
function mostrarDetalhesPaciente(paciente) {
  const detalhes = document.getElementById('detalhes-paciente');
  detalhes.innerHTML = `
    <h3 class="font-bold mb-2">${paciente.nome}</h3>
    <p>Intensidade: ${paciente.intensidade}</p>
    <p>Prioridade: ${paciente.prioridade}</p>
    <p>Observações adicionais: --</p>
  `;
}

// Logout da área médica
function logout() {
  goToPage('page-login');
}
