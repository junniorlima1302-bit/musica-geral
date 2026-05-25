// ── SIDEBAR ADMIN ──
(function() {

  const CSS = `
    .sidebar-admin {
      width: 220px;
      min-height: 100vh;
      background: #1a2e4a;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0; top: 0; bottom: 0;
      z-index: 200;
      transition: transform 0.3s ease;
      overflow-y: auto;
      scrollbar-width: none;
    }
    .sidebar-admin::-webkit-scrollbar { display: none; }
    .sidebar-admin-header {
      padding: 14px 16px 10px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .sidebar-admin-header h2 {
      color: white;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1px;
      line-height: 1.4;
      font-family: 'Nunito', sans-serif;
    }
    .sidebar-admin-nav { padding: 8px 0; flex: 1; }
    .sidebar-group-label {
      padding: 8px 16px 2px;
      color: #5a7a9a;
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      font-family: 'Nunito', sans-serif;
    }
    .sidebar-nav-item {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 8px 16px;
      color: #c4d4e8;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      text-decoration: none;
      border-left: 3px solid transparent;
      font-family: 'Nunito', sans-serif;
    }
    .sidebar-nav-item:hover { background: rgba(255,255,255,0.07); color: white; }
    .sidebar-nav-item.ativo { background: rgba(255,255,255,0.1); color: white; border-left-color: #7a9ec4; }
    .sidebar-nav-icon { font-size: 15px; flex-shrink: 0; width: 18px; text-align: center; }
    .sidebar-group-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      color: #c4d4e8;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      border-left: 3px solid transparent;
      font-family: 'Nunito', sans-serif;
    }
    .sidebar-group-toggle:hover { background: rgba(255,255,255,0.07); color: white; }
    .sidebar-group-toggle .sg-left { display: flex; align-items: center; gap: 9px; }
    .sidebar-group-toggle .sg-arrow { font-size: 9px; color: #5a7a9a; transition: transform 0.2s; }
    .sidebar-group-toggle.aberto .sg-arrow { transform: rotate(90deg); }
    .sidebar-sub-group { display: none; }
    .sidebar-sub-group.aberto { display: block; }
    .sidebar-nav-sub {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 6px 16px 6px 32px;
      color: #a0b8d0;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      text-decoration: none;
      border-left: 3px solid transparent;
      font-family: 'Nunito', sans-serif;
    }
    .sidebar-nav-sub:hover { background: rgba(255,255,255,0.05); color: white; }
    .sidebar-nav-sub.ativo { color: white; border-left-color: #7a9ec4; }
    .sidebar-admin-footer {
      padding: 8px 16px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .sidebar-btn-sair {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #7a9ec4;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      background: none;
      border: none;
      font-family: 'Nunito', sans-serif;
      padding: 0;
      width: 100%;
      transition: color 0.2s;
      min-height: 0;
      margin: 0;
    }
    .sidebar-btn-sair:hover { color: #ff6b6b; background: none; }
    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 199;
    }
    .sidebar-overlay.ativo { display: block; }

    .sidebar-topbar {
      display: none;
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 52px;
      background: #1a2e4a;
      align-items: center;
      padding: 0 14px;
      z-index: 198;
      gap: 10px;
    }
    .sidebar-topbar-title {
      color: white;
      font-size: 13px;
      font-weight: 800;
      flex: 1;
      font-family: 'Nunito', sans-serif;
    }
    .sidebar-btn-menu {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: auto;
      margin: 0;
      min-height: 0;
    }
    .sidebar-btn-menu span {
      display: block;
      width: 20px;
      height: 2px;
      background: white;
      border-radius: 2px;
    }

    /* sb-wrapper: tamanho zero para não interferir no flex do body */
    .sb-wrapper {
      position: fixed !important;
      top: 0; left: 0;
      width: 0 !important;
      height: 0 !important;
      overflow: visible;
      padding: 0 !important;
      margin: 0 !important;
      border: none !important;
      background: none !important;
      flex: none !important;
      display: block !important;
    }

    /* Espaçador que empurra o conteúdo abaixo do topbar fixo */
    .sb-spacer {
      display: none;
      height: 52px;
      flex-shrink: 0;
      width: 100%;
    }

    /* ── DESKTOP ── */
    body.sb-desktop .sidebar-topbar { display: none !important; }
    body.sb-desktop .sidebar-admin  { transform: none !important; }
    body.sb-desktop .sb-spacer      { display: none !important; }

    /* ── MOBILE ── */
    body.sb-mobile .sidebar-topbar           { display: flex; }
    body.sb-mobile .sidebar-admin            { transform: translateX(-100%); }
    body.sb-mobile .sidebar-admin.aberta     { transform: translateX(0); }
    body.sb-mobile .sb-spacer               { display: block; }

    /* admin-page em mobile: padding lateral normal, sem padding-top
       (o sb-spacer cuida do espaço do topbar como primeiro filho do flex) */
    body.sb-mobile.admin-page {
      padding: 12px !important;
      padding-top: 0 !important;
      justify-content: flex-start !important;
      align-items: flex-start !important;
      display: flex !important;
      flex-direction: column !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    body.sb-mobile.admin-page .admin-box {
      width: 100% !important;
      max-width: 100% !important;
    }
  `;

  function injetarCSS() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function paginaAtual() {
    return window.location.pathname.split('/').pop() || 'dashboard.html';
  }

  function isMobile() {
    const ehTouch = /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent || '');
    return ehTouch || window.innerWidth < 1024;
  }

  function navItem(icon, label, href, sub) {
    const pg = paginaAtual();
    const ativo = pg === href ? ' ativo' : '';
    if (sub) {
      return `<a class="sidebar-nav-sub${ativo}" onclick="irPara('${href}')">${icon} ${label}</a>`;
    }
    return `<a class="sidebar-nav-item${ativo}" onclick="irPara('${href}')">
      <span class="sidebar-nav-icon">${icon}</span> ${label}
    </a>`;
  }

  function criarSidebar() {
    const pg = paginaAtual();
    const gerenciarPags = ['usuarios-lista.html','membros.html','usuarios-cadastro.html','minha-conta.html','usuarios.html'];
    const gerenciarAberto = gerenciarPags.includes(pg) ? ' aberto' : '';

    const html = `
      <div class="sidebar-overlay" id="sb-overlay" onclick="sidebarFechar()"></div>
      <div class="sidebar-topbar">
        <button class="sidebar-btn-menu" onclick="sidebarToggle()">
          <span></span><span></span><span></span>
        </button>
        <span class="sidebar-topbar-title">MÚSICA GERAL</span>
      </div>
      <aside class="sidebar-admin" id="sidebar-admin">
        <div class="sidebar-admin-header">
          <h2>MÚSICA GERAL<br>FORTALEZA</h2>
        </div>
        <nav class="sidebar-admin-nav">
          <div class="sidebar-group-label">MINISTÉRIO</div>
          ${navItem('📋', 'Disponibilidades', 'disponibilidades.html')}
          ${navItem('📝', 'Justificativas', 'justificativas.html')}
          ${navItem('📅', 'Compromissos', 'compromissos.html')}
          <div class="sidebar-group-label">CONFIGURAÇÕES</div>
          <div class="sidebar-group-toggle${gerenciarAberto}" id="sb-toggle-ger" onclick="sidebarToggleGrupo('ger')">
            <div class="sg-left"><span class="sidebar-nav-icon">⚙️</span> Gerenciar</div>
            <span class="sg-arrow">▶</span>
          </div>
          <div class="sidebar-sub-group${gerenciarAberto}" id="sb-grupo-ger">
            ${navItem('👥', 'Usuários', 'usuarios-lista.html', true)}
            ${navItem('🎵', 'Membros', 'membros.html', true)}
            ${navItem('➕', 'Cadastrar Usuário', 'usuarios-cadastro.html', true)}
            ${navItem('🔑', 'Minha Conta', 'minha-conta.html', true)}
          </div>
          ${navItem('🎛️', 'Visibilidade', 'visibilidade.html')}
          ${navItem('🔔', 'Notificações', 'notificacoes.html')}
        </nav>
        <div class="sidebar-admin-footer">
          ${navItem('🏠', 'Início', 'index.html')}
          <button class="sidebar-btn-sair" onclick="fazerLogout()">→ Sair</button>
        </div>
      </aside>
    `;

    // wrapper de tamanho zero — não interfere no layout
    const wrapper = document.createElement('div');
    wrapper.className = 'sb-wrapper';
    wrapper.innerHTML = html;
    document.body.insertBefore(wrapper, document.body.firstChild);

    // Espaçador inserido como primeiro filho REAL do body (não dentro do wrapper)
    // Em admin-page (display:flex), ele empurra o admin-box para baixo do topbar
    const spacer = document.createElement('div');
    spacer.className = 'sb-spacer';
    document.body.insertBefore(spacer, document.body.children[1]);

    ajustarLayout();
    window.addEventListener('resize', ajustarLayout);
    window.addEventListener('orientationchange', function() {
      setTimeout(ajustarLayout, 150);
    });
  }

  function ajustarLayout() {
    const mobile = isMobile();
    if (mobile) {
      document.body.classList.add('sb-mobile');
      document.body.classList.remove('sb-desktop');
      document.body.style.removeProperty('padding-left');
    } else {
      document.body.classList.add('sb-desktop');
      document.body.classList.remove('sb-mobile');
      document.body.style.setProperty('padding-left', '220px', 'important');
    }
  }

  window.sidebarToggle = function() {
    document.getElementById('sidebar-admin').classList.toggle('aberta');
    document.getElementById('sb-overlay').classList.toggle('ativo');
  };

  window.sidebarFechar = function() {
    document.getElementById('sidebar-admin').classList.remove('aberta');
    document.getElementById('sb-overlay').classList.remove('ativo');
  };

  window.sidebarToggleGrupo = function(id) {
    document.getElementById('sb-grupo-' + id).classList.toggle('aberto');
    document.getElementById('sb-toggle-' + id).classList.toggle('aberto');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injetarCSS();
      criarSidebar();
    });
  } else {
    injetarCSS();
    criarSidebar();
  }

})();