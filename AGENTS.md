# 个人主页工作说明

本文件供在此仓库工作的编码助手复用。以下结构与约定依据 2026-10-14 的仓库内容整理；涉及当前任职、项目进度、依赖及部署设置时，以实际页面、配置和用户最新说明为准。

## 项目与内容背景

这是李亦凡（Yifan LEE）的个人主页，仓库为 `LUNARKN1GHT/LUNARKN1GHT.github.io`，站点地址为 <https://LUNARKN1GHT.github.io>。

- 使用 Jekyll + Minimal Mistakes，配置为 `remote_theme: mmistakes/minimal-mistakes`、skin `air`；仓库也保留了本地主题布局、includes、Sass 与 JavaScript，已有多处定制，修改前应查看本地实现。
- 默认中文（`language: zh`、`locale: zh-CN`），另有英文页面。双语由 front matter、Liquid 模板和导航数据共同维护，不会自动翻译内容。
- 站长自 2024.09 起就读于中国科学技术大学管理学院统计系，主修统计学，关注统计学与计算机科学交叉方向、人工智能与量化研究。
- 当前页面还记录了第三十届学生会委员会、知之道极客中心量化交易任务小组，以及《人工智能数学原理与算法基础A》课程助教经历。更新个人介绍时，核对首页、关于页、项目页及其英文版本，避免任职时间与项目状态互相矛盾；不要自行推断新经历或成果。

## 文件与入口速查

| 内容           | 源文件 / 目录                                               | 发布入口与说明                                              |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 首页与新闻     | `index.md`、`en/index.md`                                   | `/`、`/en/`；新闻按时间倒序                                 |
| 关于           | `_pages/about.md`、`en/about.md`                            | `/about/`、`/en/about/`；教育、教学、兴趣与技术背景         |
| 简历           | `_pages/cv.md`、`en/cv.md`                                  | `/cv/`、`/en/cv/`；链接到 `assets/` 下的 PDF                |
| 项目           | `_pages/projects.md`、`en/projects.md`                      | `/projects/`、`/en/projects/`；大创、极客中心等经历         |
| 代码           | `_pages/code.md`、`en/code.md`                              | `/code/`、`/en/code/`；个人代码仓库展示                     |
| 工具           | `_pages/tools.md`                                           | `/tools/`；当前无 `en/tools.md`，两种语言导航共用此入口     |
| 笔记总目录     | `_pages/notes.md`、`en/notes.md`                            | `/notes/`、`/en/notes/`；链接到独立构建的课程笔记           |
| 博客列表       | `_pages/blog.md`、`en/blog.md`                              | `/blogs/`、`/en/blogs/`；共用 `_includes/blog-list.html`    |
| 博文           | `_posts/`                                                   | 默认 `/blogs/:title/`；英文文章显式指定 `/en/blogs/<slug>/` |
| 链接分享       | `_pages/links.md`、`en/links.md`                            | `/links/`、`/en/links/`                                     |
| 助教课程主页   | `ta/index.html`、`ta/style.css`、`ta/files/`                | `/ta/`；独立静态 HTML/CSS，无 Jekyll front matter           |
| 站点与作者设置 | `_config.yml`                                               | 标题、作者、社交链接、搜索、统计、插件、默认值等            |
| 顶部导航       | `_data/navigation.yml`                                      | `main` 各项包含 `title`、`url`、`en_title`、`en_url`        |
| 界面文案       | `_data/ui-text.yml`                                         | 模板使用的多语言标签                                        |
| 样式与模板     | `assets/css/main.scss`、`_sass/`、`_layouts/`、`_includes/` | 优先沿用已有定制位置                                        |
| 部署           | `.github/workflows/build.yml`                               | Jekyll 主站与 MkDocs 课程笔记合并发布                       |

`docs/` 是保留的 Minimal Mistakes 主题文档与示例，`_config.yml` 已排除 `/docs` 和 `/test`，不要把它们当作个人主页内容入口。`README.md` 另有本站部署简介。

## 双语与链接约定

- 新增或修改普通内容页时，同步维护对应英文页面；首页单独对应 `index.md` ↔ `en/index.md`。工具页与课程主页目前是共用中文入口，不应假设 `/en/tools/` 或 `/en/ta/` 已存在。
- 对应页面使用相同 `ref` 和各自的 `lang: zh` / `lang: en`；`ref` 是内容对应标识，不代表模板一定会自动生成切换链接。
- 普通页面通常使用 `layout: single`、`author_profile: true`；需要右侧目录时沿用 `toc: true`、`toc_sticky: true`。博客列表使用 `layout: archive`。
- 页面 URL 由 `permalink` 决定，不等于源文件路径。例如 `_pages/blog.md` 发布到 `/blogs/`。尽量保留已有 URL，避免破坏站内链接和外部引用。
- 内部链接优先使用站点根路径或 `{{ '/path/' | relative_url }}`，不要按 Markdown 源文件位置拼相对路径。新增导航时同步设置中英文标题与 URL。
- 顶部导航由 `_includes/masthead.html` 读取数据；`_includes/head/custom.html` 还有一份浏览器端导航映射。改导航时检查两处是否冲突，避免页面加载后文字或链接被再次改写。
- `_includes/language-switch.html` 目前按 `permalink` 做字符串替换，不能假设它能正确处理任意多层路径、首页或缺失翻译。需要语言切换时核对实际输出；现有双语博文采用正文显式互链。
- 如本次工作无法同步翻译，应明确告知哪些页面或文章未同步。仓库已有中文独有博文，不应假设所有历史文章都有英文版。

## 博客与新闻维护

- 博文文件名沿用 `_posts/YYYY-MM-DD-<slug>.md`；对应英文版为同日期、同 slug 加 `-en.md`。双语文章应使用相同 `ref`、一致的日期及各自的显式 `permalink`，避免英文文件名中的 `-en` 意外进入公开 URL。
- front matter 沿用现有文章的 `title`、`date`、`lang`、`ref`、`categories`、`tags`、`excerpt` 等字段；标题、摘要、分类、标签与目录标签按语言维护。可参考新生交流会或 reading-list 双语文章。
- 两个博客入口均只包含 `{% include blog-list.html %}`，语言在 include 内通过 `page.lang` 判断。此设计用于规避 PaginateV2 生成页面共享 Liquid 模板缓存键的问题，修改时保留这一约束。
- 列表按 `pagination.filter_field: lang` 和对应 `filter_value` 分开分页；全局每页 10 篇、日期倒序。改动列表或分页后同时核对中英文结果及翻页链接。
- 阅读时长由 `_includes/page__meta.html` 和 `_includes/reading-units-zh.html` 处理：中文按汉字及混入的英文单词计量，默认每分钟 400 单位；英文默认每分钟 200 词。速率在 `_config.yml`，文章可覆盖。保持现有 Liquid 兼容写法，避免未经验证地改用不同版本才支持的过滤器参数。
- 博文目录在 `_layouts/single.html` 中使用 `toc--minimal`，样式在 `assets/css/main.scss`；调整目录时检查长标题、当前章节高亮及移动端表现。
- 首页新闻按时间倒序，中文沿用 `- **YYYY年M月**：描述`，英文沿用 `- **Month YYYY**: ...`。新经历若同时出现在首页、关于或项目页，要同步日期、名称与链接。

## 资源、工具与课程内容

- 简历实际存放在 `assets/`，不是 `_data/`；当前页面引用 `李亦凡_260730.pdf` 与 `Yifan-Li_260730.pdf`。替换简历时同步两种语言的下载页，保留文件名与链接一致。
- 宣讲 PDF 放在 `assets/pdf/`，文章图片可放在 `assets/images/<slug>/`，由双语文章共用。英文引用中文材料时应说明材料语言。
- `/ta/` 为独立课程站，样式和资料通过 `./style.css`、`./files/...` 引用。课程简介、答疑安排等仍有待补充内容，未经用户提供不要编造；更新课程安排或资料时核对页面底部的“最近更新”日期。
- 工具页链接到 `/tools/decision-helper/`，但当前仓库没有对应 `tools/` 实现目录。涉及该工具时先确认源码与部署来源，不能把展示入口当作已存在的本地应用。
- 工具介绍包含 `localStorage` 以及可选 DeepSeek / OpenAI 兼容 API 功能。修改说明时应区分本地存储与调用外部 API 时发送的数据，不能将“数据不上传”泛化到 AI 请求。
- `/notes/USTC-AI-Notes/` 内容来自独立仓库 `LUNARKN1GHT/USTC-AI-Notes`，不是本仓库 `_pages/notes.md` 的正文。修改笔记内容应到上游仓库，本站负责入口和部署集成。

## 构建与发布

实际部署流程以 `.github/workflows/build.yml` 为准：

1. 推送到 `master`、手动触发、`notes-updated` repository dispatch 或每日北京时间 04:17 的定时任务启动构建。
2. 使用 Ruby 3.2 构建 Jekyll 主站：`JEKYLL_ENV=production bundle exec jekyll build --destination _site`。
3. 检出笔记仓库 `main` 分支到 `.build/notes`，使用 Python 3.12 安装其 `requirements-docs.txt`，运行 `scripts/prepare_docs.py` 与 MkDocs，把输出写入 `_site/notes/USTC-AI-Notes`。
4. 上传合并后的 `_site`，通过 GitHub Actions 部署 Pages；Pages 的 Source 应为 GitHub Actions。

本地常用命令（在仓库根目录执行，依赖未安装时先运行 `bundle install`）：

```sh
bundle exec jekyll build
bundle exec jekyll serve
```

- 修改 `_config.yml` 后重启本地预览服务。只运行 Jekyll 不会生成独立课程笔记子站，要验证该部分须复现工作流中的笔记构建步骤。
- `Gemfile` 通过本地 gemspec 引入 Jekyll 与主题依赖，并额外声明 `jekyll-paginate-v2`；排查版本问题时一起查看 `Gemfile`、gemspec 与实际安装环境，不要只依据 `remote_theme` 判断。
- `package.json` 是主题遗留的 JavaScript 压缩依赖配置，没有 `npm test` 或 `npm run build` 脚本；不要当作 Node 应用处理。
- 若修改 `assets/js/_main.js` 或 `assets/js/plugins/`，需生成实际加载的 `assets/js/main.min.js`。现有任务为 `bundle exec rake js`，依赖本地 uglify-js；执行前确认 Ruby/Node 依赖齐全。不要为构建本站直接运行默认 `rake`，它还会更新主题版权、历史和版本文件。

## 修改与验证原则

- 开始前检查 `git status`，保留用户已有改动；围绕请求修改源文件，避免顺手重排主题、升级依赖或改写无关页面。
- `_site/`、`.jekyll-cache/`、`.jekyll-metadata` 等为构建输出，不手动维护；课程笔记生成目录也不作为内容源。
- 仅修改本说明等工作文档时，检查路径、命令与仓库实现是否一致即可；内容、模板或样式变更应运行相应构建，并检查受影响页面。
- 页面验证重点：中英文内容与入口一致、front matter 正确、没有 URL 冲突、下载资源存在、博客语言过滤与分页正确。样式变更再查看桌面端和窄屏的导航、侧栏与目录。
- 发现既有问题时说明现状与影响，按本次任务范围决定是否修复；例如英文简历页当前使用 `../assets/...`，应按发布后的 `/en/cv/` 路径核验，不能直接视为正确链接。
- 构建因本地依赖或网络受限而无法运行时，明确记录阻碍及未验证部分，不声称构建通过。
