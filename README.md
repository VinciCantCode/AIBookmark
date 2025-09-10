# 上下文书签 Chrome 扩展

<div align="center">

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)](https://github.com/yourusername/AIBookmark/releases)

<br>

[![GitHub stars](https://img.shields.io/github/stars/yourusername/AIBookmark?style=for-the-badge&logo=github)](https://github.com/yourusername/AIBookmark)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/AIBookmark?style=for-the-badge&logo=github)](https://github.com/yourusername/AIBookmark)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/AIBookmark?style=for-the-badge&logo=github)](https://github.com/yourusername/AIBookmark/issues)
[![GitHub Actions](https://github.com/yourusername/AIBookmark/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/AIBookmark/actions)
[![Codecov](https://codecov.io/gh/yourusername/AIBookmark/graph/badge.svg?token=YOUR_TOKEN)](https://codecov.io/gh/yourusername/AIBookmark)

</div>

一个为AI聊天对话添加书签功能的Chrome扩展，支持ChatGPT、Claude、Gemini等主流AI聊天平台。

> 🚀 **快速定位长对话中的关键内容，告别手动滚动的烦恼！**

## 功能特点

- 📖 **快速书签**: 为对话中的任意内容添加书签
- 🎯 **精确定位**: 一键跳转到书签位置
- ⌨️ **快捷键支持**: Ctrl+B 快速添加书签
- 💾 **本地存储**: 书签数据保存在本地，保护隐私
- 🎨 **美观界面**: 现代化的UI设计，支持暗色主题
- 📱 **响应式**: 适配不同屏幕尺寸

## 支持的平台

- ChatGPT (chat.openai.com)
- Claude (claude.ai)
- Google Gemini (gemini.google.com)
- Microsoft Bing Chat (bing.com)
- Google Bard (bard.google.com)

## 安装方法

### 开发者模式安装

1. 下载或克隆此项目到本地
2. 打开Chrome浏览器，进入 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目文件夹
6. 扩展安装完成！

## 使用方法

### 添加书签

1. **选中文本添加**: 选中要添加书签的文本，按 `⌘+B` (Mac) 或 `Ctrl+B` (Windows) 或点击 ➕ 按钮
2. **当前位置添加**: 不选中任何文本时，会为当前视口中心的内容添加书签

### 管理书签

- 点击 📖 按钮显示/隐藏书签列表
- 点击 📍 按钮跳转到对应书签位置
- 点击 🗑️ 按钮删除单个书签
- 在扩展弹窗中可以清空所有书签

### 快捷键

- `⌘ + B` (Mac) / `Ctrl + B` (Windows): 添加书签
- `Esc`: 关闭书签列表

## 技术特性

- **Manifest V3**: 使用最新的Chrome扩展标准
- **内容脚本注入**: 在目标页面注入书签功能
- **本地存储**: 使用Chrome Storage API保存数据
- **元素定位**: 智能定位书签对应的页面元素
- **滚动定位**: 支持滚动位置记录和恢复

## 开发说明

### 项目结构

```
AIBookmark/
├── manifest.json          # 扩展配置文件
├── content.js            # 内容脚本（主要功能）
├── styles.css            # 样式文件
├── popup.html            # 扩展弹窗页面
├── popup.js              # 弹窗脚本
├── icons/                # 图标文件夹
└── README.md             # 说明文档
```

### 核心功能

1. **ContextBookmark类**: 主要功能类，负责书签的增删改查
2. **元素定位**: 通过生成唯一ID来定位页面元素
3. **存储管理**: 使用Chrome Storage API进行数据持久化
4. **UI交互**: 响应式的书签管理界面

## 隐私说明

- 所有书签数据仅保存在本地浏览器中
- 不会上传任何数据到外部服务器
- 不会收集用户隐私信息

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基本的书签添加、删除、跳转功能
- 支持多个AI聊天平台
- 提供快捷键和UI操作方式

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

### 如何贡献

1. Fork 这个项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fyourusername%2FAIBookmark.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fyourusername%2FAIBookmark)

</div>

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐️！**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/AIBookmark?style=social&logo=github)](https://github.com/yourusername/AIBookmark)

</div>
