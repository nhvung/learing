'use strict';

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3333;
const ROOT = path.resolve(__dirname, '..');

app.use(express.static(path.join(__dirname, 'public')));

// ── Course definitions ────────────────────────────────────────────────────────

const COURSES = [
  { id: 'java',   label: 'Java',      dir: 'java/courses', doc: 'docs/java-base.md' },
  { id: 'go',     label: 'Go',        dir: 'go',           doc: 'docs/go.md'        },
  { id: 'nodejs', label: 'Node.js',   dir: 'nodejs',       doc: 'docs/nodejs.md'   },
  { id: 'dotnet', label: '.NET / C#', dir: 'dotnet',       doc: 'docs/dotnet.md'   },
  { id: 'python', label: 'Python',    dir: 'python',       doc: 'docs/python.md'   },
];

const SKIP_DIRS  = new Set(['obj', 'bin', 'node_modules', '__pycache__', '.venv', 'venv', '.git', 'dist', 'migrations', '.idea', '.vs']);
const SKIP_EXTS  = new Set(['.cache', '.nuget', '.props', '.targets', '.map', '.pyc', '.pyo', '.suo', '.user']);
const SKIP_NAMES = new Set(['project.assets.json', 'project.nuget.cache', 'launchSettings.json', 'AssemblyInfo.cs', '.NETCoreApp,Version=v8.0.AssemblyAttributes.cs']);

// ── Helpers ───────────────────────────────────────────────────────────────────

function rel(absPath) {
  return path.relative(ROOT, absPath).replace(/\\/g, '/');
}

function listFiles(dir, maxDepth = 3) {
  if (maxDepth < 0 || !fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir)) {
    if (SKIP_NAMES.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      results.push(...listFiles(full, maxDepth - 1));
    } else {
      if (SKIP_EXTS.has(path.extname(entry).toLowerCase())) continue;
      results.push(rel(full));
    }
  }
  return results;
}

function sortFiles(files) {
  const priority = ['main.py', 'main.go', 'Program.cs', 'main.js', 'index.js', 'app.js', 'Main.java'];
  return files.sort((a, b) => {
    const na = path.basename(a), nb = path.basename(b);
    const pa = priority.indexOf(na), pb = priority.indexOf(nb);
    if (pa !== -1 && pb !== -1) return pa - pb;
    if (pa !== -1) return -1;
    if (pb !== -1) return 1;
    return a.localeCompare(b);
  });
}

// ── API: course tree ──────────────────────────────────────────────────────────

app.get('/api/tree', (_req, res) => {
  const tree = COURSES.map(course => {
    const courseDir = path.join(ROOT, course.dir);
    if (!fs.existsSync(courseDir)) return null;

    const lessonDirs = fs.readdirSync(courseDir)
      .filter(d => /^lesson-\d+/.test(d))
      .sort();

    const lessons = lessonDirs.map(name => {
      const dir    = path.join(courseDir, name);
      const readme = path.join(dir, 'README.md');
      const srcDir = path.join(dir, 'src');
      const exDir  = path.join(dir, 'exercises');

      // Format label: "lesson-01-introduction" → "01 — Introduction"
      const label = name
        .replace(/^lesson-(\d+)-?/, (_, n) => `${n} — `)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim();

      return {
        id:        name,
        label,
        readme:    fs.existsSync(readme) ? rel(readme) : null,
        src:       sortFiles(listFiles(srcDir)),
        exercises: sortFiles(listFiles(exDir)),
      };
    });

    return {
      id:      course.id,
      label:   course.label,
      doc:     fs.existsSync(path.join(ROOT, course.doc)) ? course.doc : null,
      lessons,
    };
  }).filter(Boolean);

  res.json(tree);
});

// ── API: projects tree ────────────────────────────────────────────────────────

const LANG_ORDER  = ['nodejs', 'go', 'java', 'dotnet', 'python'];
const LANG_LABELS = { nodejs: 'Node.js', go: 'Go', java: 'Java', dotnet: '.NET / C#', python: 'Python' };

app.get('/api/projects', (_req, res) => {
  const projectsDir = path.join(ROOT, 'projects');
  if (!fs.existsSync(projectsDir)) return res.json([]);

  const projects = fs.readdirSync(projectsDir)
    .filter(d => {
      const full = path.join(projectsDir, d);
      return fs.statSync(full).isDirectory() && !SKIP_DIRS.has(d);
    })
    .sort()
    .map(projectName => {
      const projectDir = path.join(projectsDir, projectName);
      const readmePath = path.join(projectDir, 'README.md');

      const langDirs = fs.readdirSync(projectDir)
        .filter(d => {
          const full = path.join(projectDir, d);
          return fs.statSync(full).isDirectory() && !SKIP_DIRS.has(d);
        })
        .sort((a, b) => {
          const ai = LANG_ORDER.indexOf(a), bi = LANG_ORDER.indexOf(b);
          if (ai !== -1 && bi !== -1) return ai - bi;
          if (ai !== -1) return -1;
          if (bi !== -1) return 1;
          return a.localeCompare(b);
        });

      const implementations = langDirs.map(lang => {
        const langDir    = path.join(projectDir, lang);
        const langReadme = path.join(langDir, 'README.md');
        const allFiles   = sortFiles(listFiles(langDir, 5));
        const files      = allFiles.filter(f => path.basename(f) !== 'README.md');

        return {
          id:     lang,
          label:  LANG_LABELS[lang] || lang,
          readme: fs.existsSync(langReadme) ? rel(langReadme) : null,
          files,
        };
      });

      const label = projectName
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      // Prefer a matching docs/<name>.md reference doc; fall back to root README
      const refDoc  = path.join(ROOT, 'docs', `${projectName}.md`);
      const docPath = fs.existsSync(refDoc)
        ? rel(refDoc)
        : fs.existsSync(readmePath) ? rel(readmePath) : null;

      return {
        id:    projectName,
        label,
        doc:   docPath,
        implementations,
      };
    });

  res.json(projects);
});

// ── API: file content ─────────────────────────────────────────────────────────

app.get('/api/file', (req, res) => {
  const relFilePath = req.query.path;
  if (!relFilePath) return res.status(400).json({ error: 'path required' });

  const abs = path.resolve(ROOT, relFilePath);
  if (!abs.startsWith(ROOT)) return res.status(403).json({ error: 'forbidden' });

  if (!fs.existsSync(abs)) return res.status(404).json({ error: 'not found' });

  const content = fs.readFileSync(abs, 'utf8');
  const ext     = path.extname(abs).replace('.', '').toLowerCase();
  res.json({ content, ext, path: relFilePath });
});

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n  Viewer → http://localhost:${PORT}\n`);
});
