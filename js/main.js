document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const yearSpan = document.getElementById('current-year');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    if (themeToggle) {
      themeToggle.textContent = '☾';
      themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-theme');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      themeToggle.textContent = isLight ? '☾' : '☼';
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeToggle.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    });
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      body.classList.remove('menu-open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      projectCards.forEach((card) => {
        const matches = selected === 'all' || card.dataset.category === selected;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function addTerminalLine(message, className = '') {
    const line = document.createElement('p');
    if (className) {
      line.className = className;
    }
    line.innerHTML = message;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  const commands = {
    help: () => [
      'Available commands:',
      '<span class="code-cyan">help</span> — show this list',
      '<span class="code-cyan">about</span> — learn about me',
      '<span class="code-cyan">projects</span> — view my work',
      '<span class="code-cyan">skills</span> — see technologies I am learning',
      '<span class="code-cyan">contact</span> — get connection details',
      '<span class="code-cyan">theme</span> — toggle light/dark mode',
      '<span class="code-cyan">clear</span> — clear the terminal',
      '<span class="code-cyan">date</span> — print today\'s date'
    ],
    about: () => [
      'I am Ashiq Umar, a Computer Science student exploring software development, data structures, Linux, and cybersecurity.',
      'I enjoy learning by building projects and turning ideas into working solutions.'
    ],
    projects: () => [
      'Selected work includes:',
      '• Patient Registration System',
      '• CalcChat',
      '• Data Structures Lab'
    ],
    skills: () => [
      'Current toolkit:',
      '• C',
      '• Python (learning)',
      '• HTML, CSS, JavaScript (learning)',
      '• Linux, Git, VS Code',
      '• Data structures, algorithms, networking (learning)'
    ],
    contact: () => [
      'Use the contact section on this page to reach out.',
      'You can also connect through GitHub and LinkedIn from the links above.'
    ],
    theme: () => {
      const isLight = body.classList.toggle('light-theme');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      if (themeToggle) {
        themeToggle.textContent = isLight ? '☾' : '☼';
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      }
      return ['Theme switched to ' + (isLight ? 'light' : 'dark') + ' mode.'];
    },
    date: () => [new Date().toString()],
    clear: () => {
      terminalOutput.innerHTML = '';
      return [];
    },
    ls: () => [
      'portfolio/',
      'about/',
      'projects/',
      'skills/',
      'contact/'
    ],
    whoami: () => ['visitor@portfolio:~$ Ashiq Umar'],
    hello: () => ['Hello, world!']
  };

  if (terminalForm && terminalInput && terminalOutput) {
    terminalForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputValue = terminalInput.value.trim();
      if (!inputValue) {
        return;
      }

      addTerminalLine('<span class="code-cyan">visitor@portfolio:~$</span> ' + escapeHtml(inputValue));
      const command = inputValue.toLowerCase();

      if (command in commands) {
        const result = commands[command]();
        result.forEach((line) => addTerminalLine(line));
      } else {
        addTerminalLine('Command not found. Type <span class="code-cyan">help</span> to see available commands.');
      }

      terminalInput.value = '';
    });
  }
});
