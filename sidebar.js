// ── SIDEBAR ADMIN ──
(function() {

  const CSS = `
    .sidebar-admin {
      width: 220px; min-height: 100vh; background: #1a2e4a;
      display: flex; flex-direction: column;
      position: fixed; left: 0; top: 0; bottom: 0;
      z-index: 99998; transition: transform 0.3s ease;
      overflow-y: auto; scrollbar-width: none;
    }
    .sidebar-admin::-webkit-scrollbar { display: none; }
    .sidebar-admin-header { padding: 14px 16px 10px; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .sidebar-admin-header h2 { color: white; font-size: 12px; font-weight: 800; letter-spacing: 1px; line-height: 1.4; font-family: 'Nunito', sans-serif; }
    .sidebar-admin-nav { padding: 8px 0; flex: 1; }
    .sidebar-group-label { padding: 8px 16px 2px; color: #5a7a9a; font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; font-family: 'Nunito', sans-serif; }
    .sidebar-nav-item { display: flex; align-items: center; gap: 9px; padding: 8px 16px; color: #c4d4e8; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; text-decoration: none; border-left: 3px solid transparent; font-family: 'Nunito', sans-serif; }
    .sidebar-nav-item:hover { background: rgba(255,255,255,0.07); color: white; }
    .sidebar-nav-item.ativo { background: rgba(255,255,255,0.1); color: white; border-left-color: #7a9ec4; }
    .sidebar-nav-icon { font-size: 15px; flex-shrink: 0; width: 18px; text-align: center; }
    .sidebar-group-toggle { display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; color: #c4d4e8; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; border-left: 3px solid transparent; font-family: 'Nunito', sans-serif; }
    .sidebar-group-toggle:hover { background: rgba(255,255,255,0.07); color: white; }
    .sidebar-group-toggle .sg-left { display: flex; align-items: center; gap: 9px; }
    .sidebar-group-toggle .sg-arrow { font-size: 9px; color: #5a7a9a; transition: transform 0.2s; }
    .sidebar-group-toggle.aberto .sg-arrow { transform: rotate(90deg); }
    .sidebar-sub-group { display: none; }
    .sidebar-sub-group.aberto { display: block; }
    .sidebar-nav-sub { display: flex; align-items: center; gap: 9px; padding: 6px 16px 6px 32px; color: #a0b8d0; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.15s; text-decoration: none; border-left: 3px solid transparent; font-family: 'Nunito', sans-serif; }
    .sidebar-nav-sub:hover { background: rgba(255,255,255,0.05); color: white; }
    .sidebar-nav-sub.ativo { color: white; border-left-color: #7a9ec4; }
    .sidebar-admin-footer { padding: 8px 16px; border-top: 1px solid rgba(255,255,255,0.1); }
    .sidebar-btn-sair { display: flex; align-items: center; gap: 8px; color: #7a9ec4; font-size: 11px; font-weight: 600; cursor: pointer; background: none; border: none; font-family: 'Nunito', sans-serif; padding: 0; width: 100%; transition: color 0.2s; min-height: 0; margin: 0; }
    .sidebar-btn-sair:hover { color: #ff6b6b; background: none; }

    .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99997; }
    .sidebar-overlay.ativo { display: block; }

    .sidebar-topbar { display: none; position: fixed; top: 0; left: 0; right: 0; height: 52px; background: #1a2e4a; align-items: center; justify-content: space-between; padding: 0 14px; z-index: 99999; gap: 10px; }
    .sidebar-topbar-title { color: white; font-size: 13px; font-weight: 800; flex: 1; font-family: 'Nunito', sans-serif; text-align: center; }
    .sidebar-btn-menu { background: none; border: none; cursor: pointer; padding: 6px; display: flex; flex-direction: column; gap: 4px; width: auto; margin: 0; min-height: 0; }
    .sidebar-btn-menu span { display: block; width: 20px; height: 2px; background: white; border-radius: 2px; }

    .sb-spacer { display: none; height: 52px; width: 100%; flex-shrink: 0; }

    /* Controlado por classes diretas nos elementos, não no body */

    /* DESKTOP: sidebar visível, topbar escondido */
    .sidebar-admin.sb-desktop-mode { transform: none !important; }
    .sidebar-topbar.sb-desktop-mode { display: none !important; }
    .sb-spacer.sb-desktop-mode { display: none !important; }

    /* MOBILE: sidebar escondido, topbar visível */
    .sidebar-admin.sb-mobile-mode { transform: translateX(-100%); }
    .sidebar-admin.sb-mobile-mode.aberta { transform: translateX(0); }
    .sidebar-topbar.sb-mobile-mode { display: flex; }
    .sb-spacer.sb-mobile-mode { display: block; }

    /* Quando sidebar aberta: bloqueia cliques no body inteiro */
    body.sb-aberta > * { pointer-events: none !important; }
    /* Mas sidebar, overlay e topbar continuam funcionando */
    .sidebar-admin { pointer-events: auto !important; }
    .sidebar-overlay { pointer-events: auto !important; }
    .sidebar-topbar { pointer-events: auto !important; }

    /* MOBILE: body display:block para scroll nativo correto */
    body.sb-mobile.admin-page {
      display: block !important;
      padding: 0 !important;
    }
    body.sb-mobile.admin-page .admin-box {
      width: calc(100% - 24px) !important;
      max-width: 100% !important;
      margin: 0 auto 20px auto !important;
      padding-top: 16px !important;
      box-sizing: border-box !important;
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
    if (sub) return `<a class="sidebar-nav-sub${ativo}" onclick="irPara('${href}')">${icon} ${label}</a>`;
    return `<a class="sidebar-nav-item${ativo}" onclick="irPara('${href}')"><span class="sidebar-nav-icon">${icon}</span> ${label}</a>`;
  }

  function criarSidebar() {
    const pg = paginaAtual();
    const gerenciarPags = ['usuarios-lista.html','membros.html','usuarios-cadastro.html','minha-conta.html','usuarios.html'];
    const gerenciarAberto = gerenciarPags.includes(pg) ? ' aberto' : '';

    // Cria cada elemento separadamente e anexa ao <html>
    // Assim ficam completamente fora do body e de qualquer stacking context

    const overlayEl = document.createElement('div');
    overlayEl.className = 'sidebar-overlay';
    overlayEl.id = 'sb-overlay';
    overlayEl.addEventListener('click', () => sidebarFechar());

    const topbarEl = document.createElement('div');
    topbarEl.className = 'sidebar-topbar';
    topbarEl.innerHTML = `
      <button class="sidebar-btn-menu" onclick="sidebarToggle()">
        <span></span><span></span><span></span>
      </button>
      <span class="sidebar-topbar-title">MÚSICA GERAL FORTALEZA</span>
      <div style="width:32px;flex-shrink:0;"></div>
    `;

    const sidebarEl = document.createElement('aside');
    sidebarEl.className = 'sidebar-admin';
    sidebarEl.id = 'sidebar-admin';
    sidebarEl.innerHTML = `
      <div class="sidebar-admin-header"><h2>MÚSICA GERAL<br>FORTALEZA</h2></div>
      <nav class="sidebar-admin-nav">
        <div class="sidebar-group-label">MINISTÉRIO</div>
        ${navItem('📋','Disponibilidades','disponibilidades.html')}
        ${navItem('📝','Justificativas','justificativas.html')}
        ${navItem('📅','Compromissos','compromissos.html')}
        <div class="sidebar-group-label">CONFIGURAÇÕES</div>
        <div class="sidebar-group-toggle${gerenciarAberto}" id="sb-toggle-ger" onclick="sidebarToggleGrupo('ger')">
          <div class="sg-left"><span class="sidebar-nav-icon">⚙️</span> Gerenciar</div>
          <span class="sg-arrow">▶</span>
        </div>
        <div class="sidebar-sub-group${gerenciarAberto}" id="sb-grupo-ger">
          ${navItem('👥','Usuários','usuarios-lista.html',true)}
          ${navItem('🎵','Membros','membros.html',true)}
          ${navItem('➕','Cadastrar Usuário','usuarios-cadastro.html',true)}
          ${navItem('🔑','Minha Conta','minha-conta.html',true)}
        </div>
        ${navItem('🎛️','Visibilidade','visibilidade.html')}
        ${navItem('🔔','Notificações','notificacoes.html')}
      </nav>
      <div class="sidebar-admin-footer">
        ${navItem('🏠','Início','index.html')}
        <button class="sidebar-btn-sair" onclick="fazerLogout()">→ Sair</button>
      </div>
    `;

    // Anexa ao <html> — fora do body, fora de qualquer stacking context
    document.documentElement.appendChild(overlayEl);
    document.documentElement.appendChild(topbarEl);
    document.documentElement.appendChild(sidebarEl);

    // Spacer fica no body para empurrar conteúdo abaixo do topbar
    const spacer = document.createElement('div');
    spacer.className = 'sb-spacer';
    spacer.id = 'sb-spacer';
    document.body.insertBefore(spacer, document.body.firstChild);

    ajustarLayout();
    window.addEventListener('resize', ajustarLayout);
    window.addEventListener('orientationchange', () => setTimeout(ajustarLayout, 150));

    // Esconde itens de admin para agentes
    ocultarItensAdmin();
  }

  async function ocultarItensAdmin() {
    // Aguarda supabase estar disponível
    if (!window.supabase) return;
    try {
      const { data: sessao } = await window.supabase.auth.getSession();
      if (!sessao?.session) return;
      const { data: eu } = await window.supabase
        .from("usuarios").select("papel").eq("id", sessao.session.user.id).single();
      if (!eu || eu.papel === "admin") return;

      // Agente: esconde apenas "Cadastrar Usuário"
      document.querySelectorAll(".sidebar-nav-sub").forEach(el => {
        const onclick = el.getAttribute("onclick") || "";
        if (onclick.includes("usuarios-cadastro")) {
          el.style.display = "none";
        }
      });
    } catch(e) {}
  }

  function ajustarLayout() {
    const mobile = isMobile();
    const sidebar = document.getElementById('sidebar-admin');
    const topbar = document.querySelector('.sidebar-topbar');
    const spacer = document.getElementById('sb-spacer');
    const overlay = document.getElementById('sb-overlay');

    if (mobile) {
      // Mobile: classes diretas nos elementos (não dependem do body)
      sidebar.classList.add('sb-mobile-mode');
      sidebar.classList.remove('sb-desktop-mode');
      topbar.classList.add('sb-mobile-mode');
      topbar.classList.remove('sb-desktop-mode');
      spacer.classList.add('sb-mobile-mode');
      spacer.classList.remove('sb-desktop-mode');

      document.body.classList.add('sb-mobile');
      document.body.classList.remove('sb-desktop');
      document.body.style.removeProperty('padding-left');
    } else {
      // Desktop
      sidebar.classList.add('sb-desktop-mode');
      sidebar.classList.remove('sb-mobile-mode', 'aberta');
      topbar.classList.add('sb-desktop-mode');
      topbar.classList.remove('sb-mobile-mode');
      spacer.classList.add('sb-desktop-mode');
      spacer.classList.remove('sb-mobile-mode');
      overlay.classList.remove('ativo');

      document.body.classList.add('sb-desktop');
      document.body.classList.remove('sb-mobile', 'sb-aberta');
      document.body.style.setProperty('padding-left', '220px', 'important');
    }
  }

  window.sidebarToggle = function() {
    const sidebar = document.getElementById('sidebar-admin');
    const overlay = document.getElementById('sb-overlay');
    const aberta = sidebar.classList.toggle('aberta');
    overlay.classList.toggle('ativo', aberta);
    document.body.classList.toggle('sb-aberta', aberta);
  };

  window.sidebarFechar = function() {
    document.getElementById('sidebar-admin').classList.remove('aberta');
    document.getElementById('sb-overlay').classList.remove('ativo');
    document.body.classList.remove('sb-aberta');
  };

  window.sidebarToggleGrupo = function(id) {
    document.getElementById('sb-grupo-' + id).classList.toggle('aberto');
    document.getElementById('sb-toggle-' + id).classList.toggle('aberto');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { injetarCSS(); criarSidebar(); });
  } else {
    injetarCSS();
    criarSidebar();
  }

})();