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
      left: 0;
      top: 0;
      bottom: 0;

      /* FIX DEFINITIVO */
      z-index: 999999;
      transform: translateZ(0);
      will-change: transform;

      transition: transform 0.3s ease;
      overflow-y: auto;
      scrollbar-width: none;
    }

    .sidebar-admin::-webkit-scrollbar {
      display: none;
    }

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

    .sidebar-admin-nav {
      padding: 8px 0;
      flex: 1;
    }

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

    .sidebar-nav-item:hover {
      background: rgba(255,255,255,0.07);
      color: white;
    }

    .sidebar-nav-item.ativo {
      background: rgba(255,255,255,0.1);
      color: white;
      border-left-color: #7a9ec4;
    }

    .sidebar-nav-icon {
      font-size: 15px;
      flex-shrink: 0;
      width: 18px;
      text-align: center;
    }

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

    .sidebar-group-toggle:hover {
      background: rgba(255,255,255,0.07);
      color: white;
    }

    .sidebar-group-toggle .sg-left {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .sidebar-group-toggle .sg-arrow {
      font-size: 9px;
      color: #5a7a9a;
      transition: transform 0.2s;
    }

    .sidebar-group-toggle.aberto .sg-arrow {
      transform: rotate(90deg);
    }

    .sidebar-sub-group {
      display: none;
    }

    .sidebar-sub-group.aberto {
      display: block;
    }

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

    .sidebar-nav-sub:hover {
      background: rgba(255,255,255,0.05);
      color: white;
    }

    .sidebar-nav-sub.ativo {
      color: white;
      border-left-color: #7a9ec4;
    }

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

    .sidebar-btn-sair:hover {
      color: #ff6b6b;
      background: none;
    }

    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);

      /* FIX */
      z-index: 999998;
      transform: translateZ(0);
      will-change: transform;
    }

    .sidebar-overlay.ativo {
      display: block;
    }

    .sidebar-topbar {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 52px;
      background: #1a2e4a;
      align-items: center;
      padding: 0 14px;

      /* FIX */
      z-index: 999999;
      transform: translateZ(0);
      will-change: transform;

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
  `;

})();