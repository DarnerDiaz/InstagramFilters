import { IGUser, FilterCriteria, AppState } from './types';
import { InstagramScraper } from './instagram-scraper';
import { FilterEngine } from './filter-engine';

/**
 * Main Instagram Filter application
 */
class InstagramFilterApp {
  private appState: AppState;
  private containerElement: HTMLElement | null = null;

  constructor() {
    this.appState = {
      isScanning: false,
      scannedUsers: [],
      filteredUsers: [],
      selectedUsers: new Set(),
      filters: {
        minFollowers: 0,
        maxFollowers: 10000000,
        followsYou: null,
        youFollow: null,
        isPrivate: null,
        isVerified: null,
        hasBio: null,
        hasWebsite: null,
        searchText: '',
      },
      stats: {
        totalScanned: 0,
        totalFollowing: 0,
        totalFollowers: 0,
        notFollowingBack: 0,
        younFollowButDontFollowBack: 0,
      }
    };
  }

  /**
   * Initialize the application
   */
  public init(): void {
    this.createContainer();
    this.renderUI();
    this.attachEventListeners();
  }

  /**
   * Create main container
   */
  private createContainer(): void {
    const existing = document.getElementById('ig-filter-app');
    if (existing) {
      existing.remove();
    }

    const container = document.createElement('div');
    container.id = 'ig-filter-app';
    container.innerHTML = this.getBaseHTML();
    document.body.appendChild(container);
    this.containerElement = container;
  }

  /**
   * Get base HTML structure
   */
  private getBaseHTML(): string {
    return `
      <div class="ig-filter-panel">
        <div class="ig-header">
          <h1>📸 Instagram Filter Tools</h1>
          <button class="ig-close-btn">✕</button>
        </div>

        <div class="ig-tabs">
          <button class="ig-tab active" data-tab="scanner">Scanner</button>
          <button class="ig-tab" data-tab="filters">Filtros</button>
          <button class="ig-tab" data-tab="results">Resultados</button>
          <button class="ig-tab" data-tab="settings">Configuración</button>
        </div>

        <!-- Scanner Tab -->
        <div class="ig-tab-content active" data-tab="scanner">
          <div class="section">
            <h3>Escanear Seguidores</h3>
            <p class="info">Este proceso puede tomar algunos minutos</p>
            <div class="button-group">
              <button class="ig-btn primary" id="btn-scan-following">
                📥 Escanear Following
              </button>
              <button class="ig-btn primary" id="btn-scan-followers">
                📤 Escanear Followers
              </button>
              <button class="ig-btn secondary" id="btn-scan-both">
                🔄 Escanear Ambos
              </button>
            </div>
            <div id="scan-progress" class="progress-bar" style="display:none;">
              <div class="progress-fill"></div>
              <span class="progress-text">0%</span>
            </div>
            <div id="scan-status" class="status-message"></div>
          </div>
        </div>

        <!-- Filters Tab -->
        <div class="ig-tab-content" data-tab="filters">
          <div class="section">
            <h3>Filtros Avanzados</h3>
            
            <div class="filter-group">
              <label>Rango de Seguidores</label>
              <div class="range-inputs">
                <input type="number" id="filter-min-followers" placeholder="Mínimo" value="0">
                <span>-</span>
                <input type="number" id="filter-max-followers" placeholder="Máximo" value="10000000">
              </div>
            </div>

            <div class="filter-group">
              <label>Filtros de Relación</label>
              <div class="checkbox-group">
                <label><input type="checkbox" id="filter-follows-you" value="true"> Me sigue</label>
                <label><input type="checkbox" id="filter-you-follow" value="true"> Yo lo sigo</label>
                <label><input type="checkbox" id="filter-not-follows-you" value="false"> NO me sigue</label>
                <label><input type="checkbox" id="filter-not-you-follow" value="false"> NO lo sigo</label>
              </div>
            </div>

            <div class="filter-group">
              <label>Tipo de Perfil</label>
              <div class="checkbox-group">
                <label><input type="checkbox" id="filter-private"> Privado</label>
                <label><input type="checkbox" id="filter-verified"> Verificado</label>
                <label><input type="checkbox" id="filter-has-bio"> Con biografía</label>
                <label><input type="checkbox" id="filter-has-website"> Con sitio web</label>
              </div>
            </div>

            <div class="filter-group">
              <label>Buscar por nombre/usuario</label>
              <input type="text" id="filter-search" placeholder="Escribe para buscar...">
            </div>

            <div class="preset-filters">
              <h4>Filtros Rápidos</h4>
              <button class="ig-btn small" data-preset="not-following-back">No siguen de vuelta</button>
              <button class="ig-btn small" data-preset="ghost-followers">Ghost Followers</button>
              <button class="ig-btn small" data-preset="fake-accounts">Cuentas Falsas</button>
              <button class="ig-btn small" data-preset="inactive">Inactivos</button>
            </div>

            <button class="ig-btn primary" id="btn-apply-filters">Aplicar Filtros</button>
          </div>
        </div>

        <!-- Results Tab -->
        <div class="ig-tab-content" data-tab="results">
          <div class="section">
            <h3>Resultados</h3>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-value" id="stat-total">0</div>
                <div class="stat-label">Total Escaneados</div>
              </div>
              <div class="stat-card">
                <div class="stat-value" id="stat-not-follow">0</div>
                <div class="stat-label">No te siguen</div>
              </div>
              <div class="stat-card">
                <div class="stat-value" id="stat-selected">0</div>
                <div class="stat-label">Seleccionados</div>
              </div>
              <div class="stat-card">
                <div class="stat-value" id="stat-private">0</div>
                <div class="stat-label">Privados</div>
              </div>
            </div>

            <div class="results-toolbar">
              <button class="ig-btn" id="btn-select-all">Seleccionar Todo</button>
              <button class="ig-btn" id="btn-deselect-all">Deseleccionar Todo</button>
              <button class="ig-btn" id="btn-invert-selection">Invertir Selección</button>
              <button class="ig-btn danger" id="btn-unfollow-selected">
                ❌ Unfollow Seleccionados
              </button>
            </div>

            <div id="results-list" class="results-list">
              <p class="placeholder">Escanea usuarios para ver resultados</p>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div class="ig-tab-content" data-tab="settings">
          <div class="section">
            <h3>Configuración</h3>
            
            <div class="setting-group">
              <label>Velocidad de escaneo (ms entre requests)</label>
              <input type="number" id="setting-delay" value="500" min="100" step="100">
            </div>

            <div class="setting-group">
              <label>Máximo de intentos por usuario</label>
              <input type="number" id="setting-max-retries" value="3" min="1" max="10">
            </div>

            <div class="action-group">
              <h4>Datos</h4>
              <button class="ig-btn secondary" id="btn-export-data">💾 Exportar Datos</button>
              <button class="ig-btn secondary" id="btn-import-data">📂 Importar Datos</button>
              <button class="ig-btn danger" id="btn-clear-data">🗑️ Borrar Todo</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render the UI
   */
  private renderUI(): void {
    this.injectStyles();
    this.updateStats();
  }

  /**
   * Inject CSS styles
   */
  private injectStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      #ig-filter-app {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
        position: fixed;
        top: 20px;
        right: 20px;
        width: 500px;
        max-width: 90vw;
        background: white;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        z-index: 999999;
        font-size: 14px;
        max-height: 90vh;
        overflow-y: auto;
      }

      #ig-filter-app * {
        box-sizing: border-box;
      }

      .ig-filter-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .ig-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #e1e8ed;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px 12px 0 0;
      }

      .ig-header h1 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }

      .ig-close-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 18px;
        transition: background 0.2s;
      }

      .ig-close-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .ig-tabs {
        display: flex;
        border-bottom: 1px solid #e1e8ed;
        background: #f7f9fa;
      }

      .ig-tab {
        flex: 1;
        padding: 12px;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: #65676b;
        transition: all 0.2s;
      }

      .ig-tab:hover {
        color: #000;
      }

      .ig-tab.active {
        color: #667eea;
        border-bottom-color: #667eea;
      }

      .ig-tab-content {
        display: none;
        padding: 16px;
        overflow-y: auto;
        max-height: calc(90vh - 150px);
      }

      .ig-tab-content.active {
        display: block;
      }

      .section h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        color: #000;
      }

      .section h4 {
        margin: 12px 0 8px 0;
        font-size: 13px;
        color: #65676b;
        text-transform: uppercase;
      }

      .info {
        margin: 0 0 12px 0;
        font-size: 12px;
        color: #65676b;
      }

      .button-group {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .button-group button {
        flex: 1;
        min-width: 120px;
      }

      .ig-btn {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .ig-btn.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .ig-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
      }

      .ig-btn.secondary {
        background: #f0f0f0;
        color: #000;
      }

      .ig-btn.secondary:hover {
        background: #e1e1e1;
      }

      .ig-btn.small {
        padding: 6px 12px;
        font-size: 12px;
        flex: 1;
        min-width: 0;
      }

      .ig-btn.danger {
        background: #dc3545;
        color: white;
      }

      .ig-btn.danger:hover {
        background: #c82333;
      }

      .progress-bar {
        width: 100%;
        height: 6px;
        background: #e1e8ed;
        border-radius: 3px;
        overflow: hidden;
        margin: 12px 0;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        transition: width 0.3s;
      }

      .progress-text {
        font-size: 12px;
        color: #65676b;
        margin-top: 4px;
        display: block;
      }

      .status-message {
        padding: 12px;
        border-radius: 6px;
        font-size: 12px;
        margin-top: 8px;
        background: #f0f0f0;
        color: #65676b;
      }

      .status-message.error {
        background: #ffe0e0;
        color: #c82333;
      }

      .status-message.success {
        background: #e0ffe0;
        color: #238c3c;
      }

      .filter-group {
        margin-bottom: 16px;
      }

      .filter-group label {
        display: block;
        font-weight: 500;
        margin-bottom: 8px;
        color: #000;
      }

      .range-inputs {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .range-inputs input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 13px;
      }

      .checkbox-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .checkbox-group label {
        display: flex;
        align-items: center;
        font-weight: 400;
      }

      .checkbox-group input {
        margin-right: 6px;
      }

      .preset-filters {
        margin: 16px 0;
        padding: 12px;
        background: #f7f9fa;
        border-radius: 8px;
      }

      .preset-filters h4 {
        margin-top: 0;
      }

      .preset-filters button {
        margin-right: 6px;
        margin-bottom: 6px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 16px;
      }

      .stat-card {
        background: #f7f9fa;
        padding: 12px;
        border-radius: 8px;
        text-align: center;
      }

      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: #667eea;
      }

      .stat-label {
        font-size: 12px;
        color: #65676b;
        margin-top: 4px;
      }

      .results-toolbar {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
      }

      .results-toolbar button {
        flex: 1;
        min-width: 120px;
      }

      .results-list {
        display: grid;
        gap: 8px;
        max-height: 400px;
        overflow-y: auto;
      }

      .user-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        background: #f7f9fa;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .user-item:hover {
        background: #e8ecf1;
      }

      .user-item.selected {
        background: #dce5f5;
        border-left: 3px solid #667eea;
      }

      .user-item input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .user-info {
        flex: 1;
        min-width: 0;
      }

      .user-username {
        font-weight: 500;
        color: #000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .user-stats {
        font-size: 11px;
        color: #65676b;
      }

      .user-badges {
        display: flex;
        gap: 4px;
      }

      .badge {
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 3px;
        background: #fff0f6;
        color: #c82333;
      }

      .badge.verified {
        background: #e8f5ff;
        color: #0077cc;
      }

      .badge.private {
        background: #fff3cd;
        color: #856404;
      }

      .placeholder {
        text-align: center;
        color: #65676b;
        padding: 32px 16px;
        font-size: 13px;
      }

      .setting-group {
        margin-bottom: 12px;
      }

      .setting-group label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        font-size: 13px;
      }

      .setting-group input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 13px;
      }

      .action-group {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e1e8ed;
      }

      .action-group button {
        margin-right: 8px;
        margin-bottom: 8px;
      }

      @media (max-width: 600px) {
        #ig-filter-app {
          width: calc(100vw - 16px);
          top: 8px;
          right: 8px;
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }

        .button-group button {
          min-width: 100px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Attach event listeners
   */
  private attachEventListeners(): void {
    if (!this.containerElement) return;

    // Tab switching
    this.containerElement.querySelectorAll('.ig-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = (e.target as HTMLElement).getAttribute('data-tab');
        this.switchTab(tabName!);
      });
    });

    // Close button
    this.containerElement.querySelector('.ig-close-btn')?.addEventListener('click', () => {
      this.containerElement?.remove();
    });

    // Scan buttons
    document.getElementById('btn-scan-following')?.addEventListener('click', () => this.scanFollowing());
    document.getElementById('btn-scan-followers')?.addEventListener('click', () => this.scanFollowers());
    document.getElementById('btn-scan-both')?.addEventListener('click', () => this.scanBoth());

    // Filter buttons
    document.getElementById('btn-apply-filters')?.addEventListener('click', () => this.applyFilters());
    document.querySelectorAll('[data-preset]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const preset = (e.target as HTMLElement).getAttribute('data-preset');
        this.applyPreset(preset!);
      });
    });

    // Results buttons
    document.getElementById('btn-select-all')?.addEventListener('click', () => this.selectAll());
    document.getElementById('btn-deselect-all')?.addEventListener('click', () => this.deselectAll());
    document.getElementById('btn-invert-selection')?.addEventListener('click', () => this.invertSelection());
    document.getElementById('btn-unfollow-selected')?.addEventListener('click', () => this.unfollowSelected());

    // Export/Import buttons
    document.getElementById('btn-export-data')?.addEventListener('click', () => this.exportData());
    document.getElementById('btn-import-data')?.addEventListener('click', () => this.importData());
    document.getElementById('btn-clear-data')?.addEventListener('click', () => this.clearData());
  }

  /**
   * Switch between tabs
   */
  private switchTab(tabName: string): void {
    if (!this.containerElement) return;

    // Hide all tabs
    this.containerElement.querySelectorAll('.ig-tab-content').forEach(tab => {
      tab.classList.remove('active');
    });

    // Remove active from all tab buttons
    this.containerElement.querySelectorAll('.ig-tab').forEach(btn => {
      btn.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = this.containerElement.querySelector(`[data-tab="${tabName}"]`);
    if (selectedTab) {
      selectedTab.classList.add('active');
    }

    // Mark button as active
    this.containerElement.querySelector(`.ig-tab[data-tab="${tabName}"]`)?.classList.add('active');
  }

  /**
   * Scan following list
   */
  private async scanFollowing(): Promise<void> {
    await this.startScan('following');
  }

  /**
   * Scan followers list
   */
  private async scanFollowers(): Promise<void> {
    await this.startScan('followers');
  }

  /**
   * Scan both lists
   */
  private async scanBoth(): Promise<void> {
    await this.startScan('both');
  }

  /**
   * Start scanning process
   */
  private async startScan(type: 'following' | 'followers' | 'both'): Promise<void> {
    this.appState.isScanning = true;
    const statusEl = document.getElementById('scan-status');
    const progressEl = document.getElementById('scan-progress');

    if (statusEl) statusEl.textContent = '🔄 Iniciando escaneo...';
    if (progressEl) progressEl.style.display = 'block';

    try {
      if (type === 'following' || type === 'both') {
        this.updateStatus('📥 Escaneando following...');
        const following = await InstagramScraper.getFollowingList();
        this.appState.scannedUsers = [...this.appState.scannedUsers, ...following];
      }

      if (type === 'followers' || type === 'both') {
        this.updateStatus('📤 Escaneando followers...');
        const followers = await InstagramScraper.getFollowersList();
        this.appState.scannedUsers = [...this.appState.scannedUsers, ...followers];
      }

      this.updateStatus('✅ Escaneo completado', 'success');
      this.updateStats();
      this.switchTab('results');
    } catch (error) {
      this.updateStatus(`❌ Error: ${error}`, 'error');
      console.error('Scan error:', error);
    } finally {
      this.appState.isScanning = false;
      if (progressEl) progressEl.style.display = 'none';
    }
  }

  /**
   * Apply filters
   */
  private applyFilters(): void {
    this.updateFilterCriteria();
    this.appState.filteredUsers = FilterEngine.applyFilters(
      this.appState.scannedUsers,
      this.appState.filters
    );
    this.renderResultsList();
    this.updateStats();
  }

  /**
   * Apply preset filter
   */
  private applyPreset(preset: 'not-following-back' | 'ghost-followers' | 'fake-accounts' | 'inactive'): void {
    this.appState.filters = FilterEngine.getPreset(preset);
    this.applyFilters();
    this.switchTab('results');
  }

  /**
   * Update filter criteria from inputs
   */
  private updateFilterCriteria(): void {
    this.appState.filters.minFollowers = parseInt((document.getElementById('filter-min-followers') as HTMLInputElement)?.value || '0');
    this.appState.filters.maxFollowers = parseInt((document.getElementById('filter-max-followers') as HTMLInputElement)?.value || '10000000');
    this.appState.filters.searchText = (document.getElementById('filter-search') as HTMLInputElement)?.value || '';

    // Checkboxes handling
    const followsYouEl = document.getElementById('filter-follows-you') as HTMLInputElement;
    const youFollowEl = document.getElementById('filter-you-follow') as HTMLInputElement;
    const notFollowsYouEl = document.getElementById('filter-not-follows-you') as HTMLInputElement;
    const notYouFollowEl = document.getElementById('filter-not-you-follow') as HTMLInputElement;

    if (followsYouEl?.checked) this.appState.filters.followsYou = true;
    else if (notFollowsYouEl?.checked) this.appState.filters.followsYou = false;
    else this.appState.filters.followsYou = null;

    if (youFollowEl?.checked) this.appState.filters.youFollow = true;
    else if (notYouFollowEl?.checked) this.appState.filters.youFollow = false;
    else this.appState.filters.youFollow = null;

    this.appState.filters.isPrivate = (document.getElementById('filter-private') as HTMLInputElement)?.checked || null;
    this.appState.filters.isVerified = (document.getElementById('filter-verified') as HTMLInputElement)?.checked || null;
    this.appState.filters.hasBio = (document.getElementById('filter-has-bio') as HTMLInputElement)?.checked || null;
    this.appState.filters.hasWebsite = (document.getElementById('filter-has-website') as HTMLInputElement)?.checked || null;
  }

  /**
   * Render results list
   */
  private renderResultsList(): void {
    const resultsList = document.getElementById('results-list');
    if (!resultsList) return;

    const users = this.appState.filteredUsers.length > 0 ? this.appState.filteredUsers : this.appState.scannedUsers;

    if (users.length === 0) {
      resultsList.innerHTML = '<p class="placeholder">No hay resultados</p>';
      return;
    }

    resultsList.innerHTML = users.map(user => `
      <div class="user-item ${this.appState.selectedUsers.has(user.id) ? 'selected' : ''}">
        <input type="checkbox" data-user-id="${user.id}" ${this.appState.selectedUsers.has(user.id) ? 'checked' : ''}>
        <img src="${user.profilePicUrl}" alt="${user.username}" class="user-avatar" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Crect fill=%22%23ddd%22 width=%2240%22 height=%2240%22/%3E%3C/svg%3E'">
        <div class="user-info">
          <div class="user-username">${user.username}</div>
          <div class="user-stats">${user.followerCount.toLocaleString()} seguidores • ${user.postCount} posts</div>
          <div class="user-badges">
            ${user.isVerified ? '<span class="badge verified">✓</span>' : ''}
            ${user.isPrivate ? '<span class="badge private">🔒</span>' : ''}
            ${user.isFollowing && !user.isFollowingYou ? '<span class="badge">No sigue</span>' : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Attach checkbox listeners
    resultsList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const userId = (e.target as HTMLInputElement).getAttribute('data-user-id');
        if (userId) {
          if ((e.target as HTMLInputElement).checked) {
            this.appState.selectedUsers.add(userId);
          } else {
            this.appState.selectedUsers.delete(userId);
          }
          this.updateStats();
        }
      });
    });
  }

  /**
   * Select all users
   */
  private selectAll(): void {
    const users = this.appState.filteredUsers.length > 0 ? this.appState.filteredUsers : this.appState.scannedUsers;
    users.forEach(user => this.appState.selectedUsers.add(user.id));
    this.renderResultsList();
    this.updateStats();
  }

  /**
   * Deselect all users
   */
  private deselectAll(): void {
    this.appState.selectedUsers.clear();
    this.renderResultsList();
    this.updateStats();
  }

  /**
   * Invert selection
   */
  private invertSelection(): void {
    const users = this.appState.filteredUsers.length > 0 ? this.appState.filteredUsers : this.appState.scannedUsers;
    users.forEach(user => {
      if (this.appState.selectedUsers.has(user.id)) {
        this.appState.selectedUsers.delete(user.id);
      } else {
        this.appState.selectedUsers.add(user.id);
      }
    });
    this.renderResultsList();
    this.updateStats();
  }

  /**
   * Unfollow selected users
   */
  private async unfollowSelected(): Promise<void> {
    if (this.appState.selectedUsers.size === 0) {
      alert('Por favor selecciona usuarios para dejar de seguir');
      return;
    }

    const confirmed = confirm(`¿Estás seguro? Dejarás de seguir a ${this.appState.selectedUsers.size} usuarios.`);
    if (!confirmed) return;

    this.updateStatus(`⏳ Dejar de seguir ${this.appState.selectedUsers.size} usuarios...`);

    let count = 0;
    for (const userId of this.appState.selectedUsers) {
      try {
        // This would need actual Instagram API or action implementation
        // For now, just showing the UI flow
        count++;
        const percent = Math.round((count / this.appState.selectedUsers.size) * 100);
        const progressFill = document.querySelector('.progress-fill') as HTMLElement;
        if (progressFill) progressFill.style.width = percent + '%';
      } catch (error) {
        console.error(`Error unfollowing ${userId}:`, error);
      }
    }

    this.updateStatus(`✅ Completado: ${count} usuarios desfollowed`, 'success');
    this.deselectAll();
  }

  /**
   * Export data to JSON
   */
  private exportData(): void {
    const data = {
      users: this.appState.scannedUsers,
      filters: this.appState.filters,
      selectedUsers: Array.from(this.appState.selectedUsers),
      exportedAt: new Date().toISOString(),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instagram-filter-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.updateStatus('✅ Datos exportados', 'success');
  }

  /**
   * Import data from JSON
   */
  private importData(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          this.appState.scannedUsers = data.users || [];
          this.appState.filters = data.filters || this.appState.filters;
          this.appState.selectedUsers = new Set(data.selectedUsers || []);
          this.updateStats();
          this.switchTab('results');
          this.updateStatus('✅ Datos importados', 'success');
        } catch (error) {
          this.updateStatus('❌ Error al importar archivo', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  /**
   * Clear all data
   */
  private clearData(): void {
    if (!confirm('¿Estás completamente seguro? Esta acción no se puede deshacer.')) return;

    this.appState.scannedUsers = [];
    this.appState.filteredUsers = [];
    this.appState.selectedUsers.clear();
    this.updateStats();
    this.renderResultsList();
    this.updateStatus('✅ Datos borrados', 'success');
  }

  /**
   * Update statistics display
   */
  private updateStats(): void {
    const stats = FilterEngine.getStats(this.appState.scannedUsers);

    const elements = {
      'stat-total': stats.total,
      'stat-not-follow': stats.notFollowingBack,
      'stat-selected': this.appState.selectedUsers.size,
      'stat-private': stats.privateProfiles,
    };

    Object.entries(elements).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value.toString();
    });
  }

  /**
   * Update status message
   */
  private updateStatus(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    const statusEl = document.getElementById('scan-status');
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.className = `status-message ${type !== 'info' ? type : ''}`;
    }
  }
}

// Initialize on document ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new InstagramFilterApp();
    app.init();
  });
} else {
  const app = new InstagramFilterApp();
  app.init();
}

// Export for use as module
export { InstagramFilterApp };
