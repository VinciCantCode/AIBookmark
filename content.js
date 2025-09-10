// 上下文书签 - 内容脚本
class ContextBookmark {
  constructor() {
    this.bookmarks = [];
    this.currentUrl = window.location.href;
    this.bookmarkContainer = null;
    this.bookmarkList = null;
    this.isVisible = false;
    
    this.init();
  }

  init() {
    // 等待页面加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupBookmarkSystem());
    } else {
      this.setupBookmarkSystem();
    }
  }

  setupBookmarkSystem() {
    // 检测是否在支持的AI聊天页面
    if (!this.isSupportedPage()) {
      return;
    }

    // 加载已保存的书签
    this.loadBookmarks();
    
    // 创建书签UI
    this.createBookmarkUI();
    
    // 监听页面变化（用于动态内容）
    this.observePageChanges();
    
    // 添加键盘快捷键
    this.setupKeyboardShortcuts();
  }

  isSupportedPage() {
    const hostname = window.location.hostname;
    return hostname.includes('openai.com') || 
           hostname.includes('claude.ai') || 
           hostname.includes('gemini.google.com') ||
           hostname.includes('bing.com') ||
           hostname.includes('bard.google.com');
  }

  createBookmarkUI() {
    // 创建书签容器
    this.bookmarkContainer = document.createElement('div');
    this.bookmarkContainer.id = 'context-bookmark-container';
    this.bookmarkContainer.innerHTML = `
      <div class="bookmark-header">
        <button id="bookmark-toggle" class="bookmark-toggle" title="显示/隐藏书签">
          📖
        </button>
        <button id="add-bookmark" class="add-bookmark-btn" title="添加书签 (Ctrl+B)">
          ➕
        </button>
      </div>
      <div id="bookmark-list" class="bookmark-list" style="display: none;">
        <div class="bookmark-list-header">
          <span>书签列表</span>
          <button id="clear-all-bookmarks" class="clear-btn" title="清空所有书签">🗑️</button>
        </div>
        <div class="bookmark-items"></div>
      </div>
    `;

    // 添加到页面
    document.body.appendChild(this.bookmarkContainer);

    // 绑定事件
    this.bindEvents();
    
    // 更新书签列表显示
    this.updateBookmarkList();
  }

  bindEvents() {
    // 切换书签面板显示/隐藏
    document.getElementById('bookmark-toggle').addEventListener('click', () => {
      this.toggleBookmarkList();
    });

    // 添加书签
    document.getElementById('add-bookmark').addEventListener('click', () => {
      this.addBookmark();
    });

    // 清空所有书签
    document.getElementById('clear-all-bookmarks').addEventListener('click', () => {
      this.clearAllBookmarks();
    });

    // 点击页面其他地方关闭书签列表
    document.addEventListener('click', (e) => {
      if (!this.bookmarkContainer.contains(e.target)) {
        this.hideBookmarkList();
      }
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd+B (Mac) 或 Ctrl+B (Windows/Linux) 添加书签
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        this.addBookmark();
      }
      
      // Esc 关闭书签列表
      if (e.key === 'Escape') {
        this.hideBookmarkList();
      }
    });
  }

  addBookmark() {
    const selection = window.getSelection();
    let text = '';
    let element = null;

    if (selection.toString().trim()) {
      // 如果有选中文本，使用选中文本
      text = selection.toString().trim();
      element = selection.anchorNode.parentElement;
    } else {
      // 否则使用当前视口中心的内容
      const viewportCenter = window.innerHeight / 2;
      const elements = document.querySelectorAll('p, div, span, li, h1, h2, h3, h4, h5, h6');
      
      for (let el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          element = el;
          text = el.textContent.trim().substring(0, 100) + (el.textContent.length > 100 ? '...' : '');
          break;
        }
      }
    }

    if (!element || !text) {
      alert('请先选中要添加书签的内容，或确保页面有可添加书签的内容');
      return;
    }

    // 生成书签ID
    const bookmarkId = 'bookmark_' + Date.now();
    
    // 创建书签对象
    const bookmark = {
      id: bookmarkId,
      text: text,
      timestamp: new Date().toLocaleString(),
      url: this.currentUrl,
      elementId: this.generateElementId(element),
      scrollPosition: window.pageYOffset
    };

    // 添加到书签列表
    this.bookmarks.push(bookmark);
    
    // 保存到存储
    this.saveBookmarks();
    
    // 更新UI
    this.updateBookmarkList();
    
    // 显示成功提示
    this.showNotification('书签添加成功！');
  }

  generateElementId(element) {
    // 为元素生成唯一ID，用于后续定位
    if (!element.id) {
      element.id = 'bookmark_element_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    return element.id;
  }

  jumpToBookmark(bookmarkId) {
    const bookmark = this.bookmarks.find(b => b.id === bookmarkId);
    if (!bookmark) return;

    // 尝试通过元素ID定位
    const element = document.getElementById(bookmark.elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // 高亮显示
      element.style.backgroundColor = '#ffeb3b';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 2000);
    } else {
      // 如果元素不存在，使用滚动位置
      window.scrollTo({
        top: bookmark.scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  deleteBookmark(bookmarkId) {
    this.bookmarks = this.bookmarks.filter(b => b.id !== bookmarkId);
    this.saveBookmarks();
    this.updateBookmarkList();
    this.showNotification('书签已删除');
  }

  clearAllBookmarks() {
    if (confirm('确定要清空所有书签吗？')) {
      this.bookmarks = [];
      this.saveBookmarks();
      this.updateBookmarkList();
      this.showNotification('所有书签已清空');
    }
  }

  updateBookmarkList() {
    const bookmarkItems = document.querySelector('.bookmark-items');
    if (!bookmarkItems) return;

    bookmarkItems.innerHTML = '';

    if (this.bookmarks.length === 0) {
      bookmarkItems.innerHTML = '<div class="no-bookmarks">暂无书签</div>';
      return;
    }

    this.bookmarks.forEach(bookmark => {
      const bookmarkItem = document.createElement('div');
      bookmarkItem.className = 'bookmark-item';
      bookmarkItem.innerHTML = `
        <div class="bookmark-content">
          <div class="bookmark-text" title="${bookmark.text}">${bookmark.text}</div>
          <div class="bookmark-meta">${bookmark.timestamp}</div>
        </div>
        <div class="bookmark-actions">
          <button class="jump-btn" title="跳转到书签">📍</button>
          <button class="delete-btn" title="删除书签">🗑️</button>
        </div>
      `;

      // 绑定事件
      bookmarkItem.querySelector('.jump-btn').addEventListener('click', () => {
        this.jumpToBookmark(bookmark.id);
        this.hideBookmarkList();
      });

      bookmarkItem.querySelector('.delete-btn').addEventListener('click', () => {
        this.deleteBookmark(bookmark.id);
      });

      bookmarkItems.appendChild(bookmarkItem);
    });
  }

  toggleBookmarkList() {
    const bookmarkList = document.getElementById('bookmark-list');
    if (this.isVisible) {
      this.hideBookmarkList();
    } else {
      this.showBookmarkList();
    }
  }

  showBookmarkList() {
    const bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.style.display = 'block';
    this.isVisible = true;
  }

  hideBookmarkList() {
    const bookmarkList = document.getElementById('bookmark-list');
    bookmarkList.style.display = 'none';
    this.isVisible = false;
  }

  loadBookmarks() {
    chrome.storage.local.get(['bookmarks'], (result) => {
      if (result.bookmarks) {
        this.bookmarks = result.bookmarks.filter(bookmark => 
          bookmark.url === this.currentUrl
        );
      }
    });
  }

  saveBookmarks() {
    // 获取所有书签
    chrome.storage.local.get(['bookmarks'], (result) => {
      let allBookmarks = result.bookmarks || [];
      
      // 移除当前页面的旧书签
      allBookmarks = allBookmarks.filter(bookmark => bookmark.url !== this.currentUrl);
      
      // 添加当前页面的书签
      allBookmarks = allBookmarks.concat(this.bookmarks);
      
      // 保存
      chrome.storage.local.set({ bookmarks: allBookmarks });
    });
  }

  showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'bookmark-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // 显示通知
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // 3秒后移除
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  observePageChanges() {
    // 监听页面变化，用于动态内容
    const observer = new MutationObserver((mutations) => {
      // 如果页面结构发生变化，重新检查书签元素
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // 可以在这里添加重新验证书签的逻辑
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// 初始化书签系统
new ContextBookmark();
