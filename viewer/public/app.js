'use strict';

// ── Helpers ───────────────────────────────────────────────────────────────────

function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'cls') el.className = v;
    else if (k === 'on') Object.entries(v).forEach(([ev, fn]) => el.addEventListener(ev, fn));
    else el.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    el.append(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return el;
}

const basename = p => p.split('/').pop();

function makeCopyBtn(getText, extraCls) {
  const btn = h('button', { cls: 'copy-btn' + (extraCls ? ' ' + extraCls : '') }, 'Copy');
  btn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(getText());
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
  });
  return btn;
}

// Extension → syntax highlight language
const EXT_LANG = {
  js: 'javascript', ts: 'typescript', py: 'python', go: 'go',
  cs: 'csharp', java: 'java', sh: 'bash', yml: 'yaml', yaml: 'yaml',
  json: 'json', md: 'markdown', html: 'html', css: 'css', sql: 'sql',
  dockerfile: 'dockerfile', toml: 'toml', mod: 'go',
  csproj: 'xml', xml: 'xml', txt: 'plaintext',
};
function extToLang(ext) { return EXT_LANG[ext.toLowerCase()] || 'plaintext'; }

// Build a colored extension badge element
function extBadge(filePath) {
  const name = basename(filePath).toLowerCase();
  let ext = name === 'dockerfile' ? 'dockerfile' : (name.includes('.') ? name.split('.').pop() : '');
  const label = ext ? `.${ext}` : '—';
  const cls   = `ext ext-${ext || 'default'}`;
  return h('span', { cls }, label);
}

// ── State ─────────────────────────────────────────────────────────────────────

let activeLinkEl = null;

function setActive(el) {
  if (activeLinkEl) activeLinkEl.classList.remove('active');
  activeLinkEl = el;
  if (el) el.classList.add('active');
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function sectionHeader(title) {
  return h('div', { cls: 'section-header' }, title);
}

function buildTree(tree) {
  const nav = document.getElementById('tree');
  nav.innerHTML = '';
  nav.appendChild(sectionHeader('Courses'));
  for (const course of tree) nav.appendChild(buildCourse(course));
}

function buildProjectsTree(projects) {
  if (!projects.length) return;
  const nav = document.getElementById('tree');
  nav.appendChild(sectionHeader('Projects'));
  for (const project of projects) nav.appendChild(buildProject(project));
}

function buildProject(project) {
  const wrapper = h('div', { cls: 'course', 'data-lang': project.id });

  const header = h('div', { cls: 'course-header',
    on: { click: () => wrapper.classList.toggle('open') }},
    h('span', { cls: 'lang-dot project-dot' }),
    project.label,
    h('span', { cls: 'chevron' }, '▶')
  );

  const body = h('div', { cls: 'course-body' });

  if (project.doc) {
    const link = h('div', { cls: 'doc-link',
      on: { click: (e) => { setActive(e.currentTarget); loadFile(project.doc); }}},
      h('span', { cls: 'doc-badge' }, 'README'),
      'Overview'
    );
    body.appendChild(link);
  }

  for (const impl of project.implementations) {
    body.appendChild(buildImplementation(impl));
  }

  wrapper.append(header, body);
  return wrapper;
}

function buildImplementation(impl) {
  const wrapper = h('div', { cls: 'lesson', 'data-lang': impl.id });

  const header = h('div', { cls: 'lesson-header',
    on: { click: () => {
      wrapper.classList.toggle('open');
      if (wrapper.classList.contains('open') && impl.readme) {
        const first = wrapper.querySelector('.file-link');
        if (first) { setActive(first); loadFile(impl.readme); }
      }
    }}},
    impl.label,
    h('span', { cls: 'chevron' }, '▶')
  );

  const files = h('div', { cls: 'lesson-files' });

  if (impl.readme) files.appendChild(fileLink(impl.readme, 'README.md'));
  for (const f of impl.files) files.appendChild(fileLink(f));

  wrapper.append(header, files);
  return wrapper;
}

function buildCourse(course) {
  const wrapper = h('div', { cls: 'course', 'data-lang': course.id });

  const header = h('div', { cls: 'course-header',
    on: { click: () => wrapper.classList.toggle('open') }},
    h('span', { cls: 'lang-dot' }),
    course.label,
    h('span', { cls: 'chevron' }, '▶')
  );

  const body = h('div', { cls: 'course-body' });

  if (course.doc) {
    const link = h('div', { cls: 'doc-link',
      on: { click: (e) => { setActive(e.currentTarget); loadFile(course.doc); }}},
      h('span', { cls: 'doc-badge' }, 'REF'),
      'Reference doc'
    );
    body.appendChild(link);
  }

  for (const lesson of course.lessons) {
    body.appendChild(buildLesson(lesson, course.id));
  }

  wrapper.append(header, body);
  return wrapper;
}

function buildLesson(lesson, langId) {
  const wrapper = h('div', { cls: 'lesson', 'data-lang': langId });

  const header = h('div', { cls: 'lesson-header',
    on: { click: () => {
      wrapper.classList.toggle('open');
      if (wrapper.classList.contains('open') && lesson.readme) {
        const first = wrapper.querySelector('.file-link');
        if (first) { setActive(first); loadFile(lesson.readme); }
      }
    }}},
    lesson.label,
    h('span', { cls: 'chevron' }, '▶')
  );

  const files = h('div', { cls: 'lesson-files' });

  if (lesson.readme) {
    files.appendChild(fileLink(lesson.readme, 'README.md'));
  }
  if (lesson.src.length) {
    files.appendChild(h('div', { cls: 'file-group-label' }, 'src'));
    for (const f of lesson.src) files.appendChild(fileLink(f));
  }
  if (lesson.exercises.length) {
    files.appendChild(h('div', { cls: 'file-group-label' }, 'exercises'));
    for (const f of lesson.exercises) files.appendChild(fileLink(f));
  }

  wrapper.append(header, files);
  return wrapper;
}

function fileLink(filePath, label) {
  const name = label || basename(filePath);
  const link = h('div', { cls: 'file-link', 'data-path': filePath,
    on: { click: (e) => { setActive(e.currentTarget); loadFile(filePath); }}},
    extBadge(filePath),
    h('span', { cls: 'file-name' }, name)
  );
  return link;
}

// ── Content rendering ─────────────────────────────────────────────────────────

async function loadFile(filePath) {
  document.getElementById('breadcrumb').textContent = filePath;

  const area = document.getElementById('content-area');
  area.innerHTML = '';
  area.appendChild(h('div', { style: 'padding:40px;color:#aaa;font-size:13px' }, 'Loading...'));

  let data;
  try {
    const res = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`);
    data = await res.json();
  } catch {
    area.innerHTML = '';
    area.appendChild(h('div', { style: 'padding:40px;color:#c0392b' }, 'Failed to load file.'));
    return;
  }

  if (data.error) {
    area.innerHTML = '';
    area.appendChild(h('div', { style: 'padding:40px;color:#c0392b' }, data.error));
    return;
  }

  area.innerHTML = '';
  if (data.ext === 'md') renderMarkdown(area, data.content);
  else                   renderCode(area, data.content, data.ext, filePath);
  area.scrollTop = 0;
}

function renderMarkdown(container, content) {
  const div = h('div', { cls: 'md' });
  div.innerHTML = marked.parse(content);
  div.querySelectorAll('pre code').forEach(code => {
    hljs.highlightElement(code);
    code.parentElement.appendChild(makeCopyBtn(() => code.textContent, 'copy-btn-pre'));
  });
  container.appendChild(div);
}

function renderCode(container, content, ext, filePath) {
  const lang = extToLang(ext);
  const code = h('code', { cls: `language-${lang}` }, content);
  const pre  = h('pre', {}, code);
  const view = h('div', { cls: 'code-view' },
    h('div', { cls: 'code-view-header' },
      extBadge(filePath),
      h('span', { cls: 'code-view-path' }, filePath),
      makeCopyBtn(() => content)
    ),
    pre
  );
  hljs.highlightElement(code);
  container.appendChild(view);
}

// ── Boot ──────────────────────────────────────────────────────────────────────

async function init() {
  const [tree, projects] = await Promise.all([
    fetch('/api/tree').then(r => r.json()),
    fetch('/api/projects').then(r => r.json()),
  ]);
  buildTree(tree);
  buildProjectsTree(projects);
}

init().catch(console.error);
