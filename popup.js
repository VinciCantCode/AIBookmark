// 上下文书签 - 弹窗脚本

document.addEventListener('DOMContentLoaded', function() {
  const currentBookmarksEl = document.getElementById('current-bookmarks');
  const totalBookmarksEl = document.getElementById('total-bookmarks');
  const openPageBtn = document.getElementById('open-page');
  const clearAllBtn = document.getElementById('clear-all');

  // 加载书签统计
  loadBookmarkStats();

  // 打开当前页面
  openPageBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        window.close();
      }
    });
  });

  // 清空所有书签
  clearAllBtn.addEventListener('click', function() {
    if (confirm('确定要清空所有书签吗？此操作不可恢复！')) {
      chrome.storage.local.clear(function() {
        loadBookmarkStats();
        // 通知内容脚本更新
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'clearAllBookmarks'});
          }
        });
      });
    }
  });

  function loadBookmarkStats() {
    chrome.storage.local.get(['bookmarks'], function(result) {
      const allBookmarks = result.bookmarks || [];
      
      // 获取当前页面的书签
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          const currentUrl = tabs[0].url;
          const currentBookmarks = allBookmarks.filter(bookmark => 
            bookmark.url === currentUrl
          );
          
          currentBookmarksEl.textContent = currentBookmarks.length;
        }
      });
      
      totalBookmarksEl.textContent = allBookmarks.length;
    });
  }
});
