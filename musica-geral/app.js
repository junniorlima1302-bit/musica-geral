//////////////////////////////////////////////////////
// NORMALIZAR TEXTO
//////////////////////////////////////////////////////

function normalizar(texto) {
  return texto
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

//////////////////////////////////////////////////////
// NAVEGAÇÃO
//////////////////////////////////////////////////////

let historico = JSON.parse(localStorage.getItem("historico")) || [];

function irPara(pagina) {
  historico.push(window.location.pathname);
  localStorage.setItem("historico", JSON.stringify(historico));
  window.location.href = pagina;
}

function voltarSistema() {
  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  const ultima = historico.pop();
  localStorage.setItem("historico", JSON.stringify(historico));
  window.location.href = ultima || "index.html";
}

function voltarPagina() {
  voltarSistema();
}

//////////////////////////////////////////////////////
// IDENTIFICAÇÃO
//////////////////////////////////////////////////////

function continuar() {
  const nome = document.getElementById("nome")?.value;
  const ministerioSelecionado = document.querySelector('input[name="ministerio"]:checked');
  const tipoSelecionado = document.querySelector('input[name="tipo"]:checked');
  const instrumento = document.getElementById("instrumento")?.value;

  if (!nome || !ministerioSelecionado) {
    alert("Preencha seu nome e selecione o ministério.");
    return;
  }

  if (!tipoSelecionado) {
    alert("Selecione se você canta ou toca.");
    return;
  }

  if (tipoSelecionado.value === "toco" && !instrumento) {
    alert("Digite o instrumento que você toca.");
    return;
  }

  localStorage.setItem("nome", nome);
  localStorage.setItem("ministerio", ministerioSelecionado.value);
  localStorage.setItem("tipo", tipoSelecionado.value);
  localStorage.setItem("instrumento", instrumento || "");

  window.location.href = "disponibilidade.html";
}

//////////////////////////////////////////////////////
// CARREGAR DISPONIBILIDADES
//////////////////////////////////////////////////////

async function carregarDisponibilidades() {

  const { data, error } = await supabase
    .from("compromissos")
    .select("*")
    .order("nome");

  if (error) {
    console.error(error);
    return;
  }

  const lista = document.getElementById("lista-disponibilidade");
  if (!lista) return;

  lista.innerHTML = "";

  let grupos = {};

  data.forEach(item => {
    if (!grupos[item.nome]) grupos[item.nome] = [];
    grupos[item.nome].push(item.turno);
  });

  Object.keys(grupos).forEach(nome => {

    const divGrupo = document.createElement("div");
    divGrupo.className = "grupo";

    const titulo = document.createElement("h3");
    titulo.innerText = nome;

    const container = document.createElement("div");
    container.className = "botoes";

    grupos[nome].forEach(turno => {

      const btn = document.createElement("button");
      btn.innerText = turno;
      btn.className = "btn-disponibilidade";

      btn.dataset.valor = `${nome} | ${turno}`;

      btn.onclick = () => btn.classList.toggle("ativo");

      container.appendChild(btn);
    });

    divGrupo.appendChild(titulo);
    divGrupo.appendChild(container);
    lista.appendChild(divGrupo);
  });
}

//////////////////////////////////////////////////////
// ENVIAR DISPONIBILIDADE
//////////////////////////////////////////////////////

async function enviarDisponibilidade() {

  const nome = localStorage.getItem("nome");
  const ministerio = localStorage.getItem("ministerio");

  if (!nome || !ministerio) {
    alert("Volte e preencha seus dados.");
    return;
  }

  const selecionados = document.querySelectorAll(".btn-disponibilidade.ativo");

  if (selecionados.length === 0) {
    alert("Selecione pelo menos uma opção.");
    return;
  }

  let dados = [];

  selecionados.forEach(btn => {
    const partes = btn.dataset.valor.split("|");

    const tipo = localStorage.getItem("tipo");
    const instrumento = localStorage.getItem("instrumento");

    dados.push({
      nome_pessoa: nome,
      ministerio: ministerio,
      evento: partes[0].trim(),
      turno: partes[1].trim(),
      tipo: tipo,
      instrumento: instrumento
    });
  });

  const { error } = await supabase
    .from("disponibilidades")
    .insert(dados);

  if (error) {
    console.error(error);
    alert("Erro ao enviar.");
    return;
  }

  window.location.href = "index.html";
}

//////////////////////////////////////////////////////
// COMPROMISSOS
//////////////////////////////////////////////////////

async function carregarCompromissos() {

  const { data, error } = await supabase
    .from("compromissos")
    .select("*")
    .order("nome");

  if (error) {
    console.error(error);
    return;
  }

  const lista = document.getElementById("lista-compromissos");
  if (!lista) return;

  lista.innerHTML = "";

  let grupos = {};

  data.forEach(item => {
    if (!grupos[item.nome]) grupos[item.nome] = [];
    grupos[item.nome].push(item);
  });

  Object.keys(grupos).forEach(nome => {

    const divGrupo = document.createElement("div");
    divGrupo.className = "grupo";

    const titulo = document.createElement("h3");
    titulo.innerText = nome;

    const container = document.createElement("div");
    container.className = "lista-itens";

    grupos[nome].forEach(item => {

      const div = document.createElement("div");
      div.className = "item-compromisso";

      div.innerHTML = `
        <label class="linha-compromisso">
          <input type="checkbox" value="${item.id}">
          <span>${item.turno}</span>
        </label>
      `;

      container.appendChild(div);
    });

    divGrupo.appendChild(titulo);
    divGrupo.appendChild(container);
    lista.appendChild(divGrupo);
  });
}

//////////////////////////////////////////////////////
// CADASTRAR COMPROMISSOS
//////////////////////////////////////////////////////

async function cadastrarTudo() {

  const texto = document.getElementById("entrada").value;

  if (!texto.trim()) {
    alert("Digite os compromissos.");
    return;
  }

  const linhas = texto.split("\n").filter(l => l.trim() !== "");

  let grupoAtual = "OUTROS COMPROMISSOS";
  let dados = [];

  linhas.forEach(linha => {

    if (linha.startsWith("#")) {
      grupoAtual = linha.replace("#", "").trim().toUpperCase();
    } else {
      dados.push({
        nome: grupoAtual,
        turno: linha
      });
    }

  });

  const { error } = await supabase
    .from("compromissos")
    .insert(dados);

  if (error) {
    console.error(error);
    alert("Erro ao cadastrar.");
    return;
  }

  document.getElementById("entrada").value = "";

  carregarCompromissos();
}

//////////////////////////////////////////////////////
// TOGGLE INSTRUMENTO
//////////////////////////////////////////////////////

function toggleInstrumento() {
  const selecionado = document.querySelector('input[name="tipo"]:checked');
  const campo = document.getElementById("campo-instrumento");

  if (selecionado && selecionado.value === "toco") {
    campo.style.display = "block";
  } else {
    campo.style.display = "none";
  }
}
//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////

async function fazerLogin() {

  const email = document.getElementById("email")?.value;
  const senha = document.getElementById("senha")?.value;

  if (!email || !senha) {
    alert("Preencha email e senha.");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) {
    alert("Email ou senha inválidos.");
    return;
  }

  window.location.href = "dashboard.html";
}
//////////////////////////////////////////////////////
// RESPOSTAS (VISUALIZAÇÃO)
//////////////////////////////////////////////////////

let respostasGlobais = [];

async function carregarRespostas() {

  const { data, error } = await supabase
    .from("disponibilidades")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  respostasGlobais = data;

  popularFiltroEventos(data);
  renderizarRespostas(data);
}

function popularFiltroEventos(data) {

  const select = document.getElementById("filtroEvento");
  if (!select) return;

  const eventosUnicos = [...new Set(data.map(item => item.evento))];

  select.innerHTML = `<option value="todos">Todos</option>`;

  eventosUnicos.forEach(evento => {
    const option = document.createElement("option");
    option.value = evento;
    option.textContent = evento;
    select.appendChild(option);
  });
}

function aplicarBusca() {

  const nomeBusca = normalizar(document.getElementById("buscaNome")?.value || "");
  const filtroMinisterio = document.getElementById("filtroMinisterio")?.value;
  const filtroEvento = document.getElementById("filtroEvento")?.value;

  let filtrado = respostasGlobais.filter(pessoa => {

    const nomeOk = normalizar(pessoa.nome_pessoa).includes(nomeBusca);

    const ministerioOk =
      filtroMinisterio === "todos" ||
      pessoa.ministerio === filtroMinisterio;

    const eventoOk =
      filtroEvento === "todos" ||
      pessoa.evento === filtroEvento;

    return nomeOk && ministerioOk && eventoOk;
  });

  renderizarRespostas(filtrado);
}

function renderizarRespostas(data) {

  const container = document.getElementById("lista-respostas");
  if (!container) return;

  container.innerHTML = "";

  let agrupado = {};

  data.forEach(item => {
    const chave = `${item.evento}|||${item.turno}`;
    if (!agrupado[chave]) agrupado[chave] = [];
    agrupado[chave].push(item);
  });

  Object.keys(agrupado).forEach(chave => {

    const [evento, turno] = chave.split("|||");

    const divGrupo = document.createElement("div");
    divGrupo.className = "grupo-evento";

    const titulo = document.createElement("h3");
    titulo.innerText = `${evento} - ${turno}`;

    const lista = document.createElement("div");
    lista.className = "lista-pessoas";

    agrupado[chave].forEach(pessoa => {

      const item = document.createElement("div");
      item.className = "item-pessoa";

      item.innerHTML = `
        <strong>${pessoa.nome_pessoa}</strong>
        <span>${pessoa.ministerio}</span>
        <span>${pessoa.tipo || ""} ${pessoa.instrumento ? "- " + pessoa.instrumento : ""}</span>
      `;

      lista.appendChild(item);
    });

    divGrupo.appendChild(titulo);
    divGrupo.appendChild(lista);
    container.appendChild(divGrupo);
  });
}