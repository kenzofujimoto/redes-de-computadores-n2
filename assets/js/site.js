(function(){
  const data = window.NETWORK_SITE_DATA;
  if(!data) return;

  const $ = (selector, root=document) => root.querySelector(selector);
  let railController = null;

  function el(tag, attrs={}, children=[]){
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if(key === 'class') node.className = value;
      else node.setAttribute(key, value);
    });
    children.forEach(child => node.append(child));
    return node;
  }

  function text(tag, value, attrs={}){
    const node = el(tag, attrs);
    node.textContent = value;
    return node;
  }

  function basePrefix(){
    const path = location.pathname.replace(/\\/g, '/');
    return path.includes('/teoria/') || path.includes('/exercicios/') || path.includes('/pratica/') ? '../' : '';
  }

  function initRailToggle(){
    const layout = $('[data-sidebar-layout]');
    const toggle = $('[data-sidebar-toggle]');
    if(!layout || !toggle) return;
    const rail = document.getElementById(toggle.getAttribute('aria-controls'));
    if(!rail) return;
    const storageKey = `${document.body.dataset.view || 'site'}-rail-collapsed`;
    const isMobileRail = () => window.matchMedia('(max-width: 920px)').matches;
    const setCollapsed = collapsed => {
      layout.classList.toggle('rail-collapsed', collapsed);
      rail.classList.toggle('is-collapsed', collapsed);
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.setAttribute('title', collapsed ? 'Expandir menu' : 'Recolher menu');
      try { localStorage.setItem(storageKey, collapsed ? '1' : '0'); } catch(error) { console.warn('Rail preference could not be saved.', error); }
    };
    let stored = null;
    try { stored = localStorage.getItem(storageKey); } catch(error) { console.warn('Rail preference could not be read.', error); }
    const initial = stored === null ? isMobileRail() : stored === '1';
    setCollapsed(initial);
    toggle.addEventListener('click', () => setCollapsed(!rail.classList.contains('is-collapsed')));
    railController = {setCollapsed, isMobileRail};
  }

  function collapseRailOnMobile(){
    if(railController && railController.isMobileRail()) railController.setCollapsed(true);
  }

  function renderHome(){
    const stats = $('#homeStats');
    const prefix = basePrefix();
    if(stats){
      stats.replaceChildren(
        stat(data.theoryTopics.length, 'tópicos'),
        stat(data.exercises.length, 'exercícios'),
        stat(data.tools.length, 'calculadoras')
      );
    }

    const topicGrid = $('#homeTopicGrid');
    if(topicGrid){
      topicGrid.replaceChildren(...data.theoryTopics.slice(0, 6).map(topic => {
        const card = el('a', {class:'topic-card', href:`${prefix}teoria/index.html#${topic.slug}`});
        card.append(text('small', topic.sourceHtml), text('h3', topic.title), text('p', topic.summary));
        return card;
      }));
    }

    const materialGrid = $('#homeMaterialGrid');
    if(materialGrid){
      materialGrid.replaceChildren(...data.materials.map(material => {
        const card = el('a', {class:'material-card', href:`${prefix}${material.file}`});
        card.append(text('small', 'HTML original'), text('h3', material.title), text('p', material.summary));
        return card;
      }));
    }
  }

  function stat(value, label){
    const node = el('div', {class:'stat'});
    node.append(text('strong', String(value)), text('span', label));
    return node;
  }

  function renderDiagram(items){
    if(!items || !items.length) return null;
    const panel = el('div', {class:'diagram-panel'});
    const flow = el('div', {class:'diagram-flow'});
    items.forEach((item, index) => {
      flow.append(text('span', item, {class:'diagram-node'}));
      if(index < items.length - 1) flow.append(text('span', '->', {class:'diagram-arrow'}));
    });
    panel.append(flow);
    return panel;
  }

  function renderTheory(){
    const tabs = $('#theoryTabs');
    const content = $('#theoryContent');
    if(!tabs || !content) return;

    const select = slug => {
      const topic = data.theoryTopics.find(item => item.slug === slug) || data.theoryTopics[0];
      if(location.hash.replace('#','') !== topic.slug) location.hash = topic.slug;
      [...tabs.children].forEach(button => button.classList.toggle('active', button.dataset.slug === topic.slug));

      const card = el('article', {class:'content-card'});
      card.append(text('span', `Fonte: ${topic.sourceHtml}`, {class:'source'}));
      card.append(text('h2', topic.title));
      card.append(text('p', topic.summary));
      const diagram = renderDiagram(topic.diagram);
      if(diagram) card.append(diagram);
      topic.sections.forEach(section => {
        card.append(text('h3', section.heading));
        card.append(text('p', section.body));
      });
      content.replaceChildren(card);
      collapseRailOnMobile();
    };

    tabs.replaceChildren(...data.theoryTopics.map(topic => {
      const button = text('button', topic.title, {type:'button', 'data-slug':topic.slug});
      button.addEventListener('click', () => select(topic.slug));
      return button;
    }));

    select((location.hash || '').replace('#','') || data.theoryTopics[0].slug);
    window.addEventListener('hashchange', () => select((location.hash || '').replace('#','')));
  }

  function renderExercises(){
    const filters = $('#exerciseFilters');
    const list = $('#exerciseList');
    if(!filters || !list) return;
    const categories = ['Todos', ...new Set(data.exercises.map(exercise => exercise.category))];

    const select = category => {
      [...filters.children].forEach(button => button.classList.toggle('active', button.dataset.category === category));
      const selected = category === 'Todos' ? data.exercises : data.exercises.filter(exercise => exercise.category === category);
      list.replaceChildren(...selected.map(renderExerciseCard));
      collapseRailOnMobile();
    };

    filters.replaceChildren(...categories.map(category => {
      const button = text('button', category, {type:'button', 'data-category':category});
      button.addEventListener('click', () => select(category));
      return button;
    }));

    select('Todos');
  }

  function renderExerciseCard(exercise){
    const card = el('article', {class:'exercise-card', 'data-exercise-id':exercise.id});
    const head = el('div', {class:'exercise-head'});
    const headCopy = el('div');
    headCopy.append(text('span', exercise.category, {class:'tag'}), text('h3', exercise.title));
    head.append(headCopy);

    const body = el('div', {class:'exercise-body'});
    body.append(text('p', exercise.prompt, {class:'prompt'}));
    const toggle = text('button', 'Mostrar resolução', {type:'button', class:'solution-toggle', 'aria-expanded':'false'});
    const solution = el('div', {class:'solution'});
    solution.hidden = true;
    solution.append(text('div', `Resposta: ${exercise.answer}`, {class:'answer-box'}));
    solution.append(text('p', exercise.solution));
    toggle.addEventListener('click', () => {
      solution.hidden = !solution.hidden;
      toggle.textContent = solution.hidden ? 'Mostrar resolução' : 'Ocultar resolução';
      toggle.setAttribute('aria-expanded', String(!solution.hidden));
    });
    body.append(toggle, solution);
    card.append(head, body);
    return card;
  }

  function renderPractice(){
    const tabs = $('#practiceTabs');
    const content = $('#practiceContent');
    if(!tabs || !content) return;
    const items = [...data.practiceGuides.map(guide => ({type:'guide', id:guide.id, label:guide.title})), {type:'tools', id:'calculadoras', label:'Calculadoras'}];

    const select = id => {
      [...tabs.children].forEach(button => button.classList.toggle('active', button.dataset.id === id));
      const guide = data.practiceGuides.find(item => item.id === id);
      if(guide) content.replaceChildren(renderPracticeGuide(guide));
      else content.replaceChildren(renderTools());
      collapseRailOnMobile();
    };

    tabs.replaceChildren(...items.map(item => {
      const button = text('button', item.label, {type:'button', 'data-id':item.id});
      button.addEventListener('click', () => select(item.id));
      return button;
    }));

    select((location.hash || '').replace('#','') || items[0].id);
  }

  function renderPracticeGuide(guide){
    const wrap = el('div', {class:'practice-grid'});
    const card = el('article', {class:'content-card'});
    card.append(text('span', `Fonte: ${guide.sourceHtml}`, {class:'source'}), text('h2', guide.title), text('p', guide.summary));
    const steps = el('div', {class:'step-list'});
    guide.steps.forEach((step, index) => {
      const row = el('div', {class:'step-row'});
      row.append(text('div', String(index + 1), {class:'step-number'}));
      const copy = el('div');
      copy.append(text('h3', step.title), text('p', step.body));
      row.append(copy);
      steps.append(row);
    });
    card.append(steps);
    if(guide.commands){
      card.append(text('h3', 'Comandos de referência'));
      card.append(text('pre', guide.commands, {class:'command-block'}));
    }
    wrap.append(card);
    return wrap;
  }

  function renderTools(){
    const wrap = el('div', {class:'practice-grid'});
    const intro = el('article', {class:'content-card'});
    intro.append(text('h2', 'Calculadoras de prova'), text('p', 'Use os campos abaixo para conferir rapidamente cálculo IPv4 e escolha de prefixo VLSM.'));
    wrap.append(intro, renderIPv4Calculator(), renderVlsmCalculator());
    return wrap;
  }

  function parseIp(ip){
    const parts = String(ip).trim().split('.').map(Number);
    if(parts.length !== 4 || parts.some(part => !Number.isInteger(part) || part < 0 || part > 255)) return null;
    return parts;
  }

  function ipToInt(parts){
    return (((parts[0] * 256 + parts[1]) * 256 + parts[2]) * 256 + parts[3]) >>> 0;
  }

  function intToIp(value){
    const n = Number(value) >>> 0;
    return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  }

  function maskFromPrefix(prefix){
    if(prefix <= 0) return 0;
    return (0xffffffff << (32 - prefix)) >>> 0;
  }

  function networkAddress(ip, prefix){
    const parts = parseIp(ip);
    if(!parts) return null;
    const mask = maskFromPrefix(prefix);
    return intToIp((ipToInt(parts) & mask) >>> 0);
  }

  function broadcastAddress(ip, prefix){
    const parts = parseIp(ip);
    if(!parts) return null;
    const mask = maskFromPrefix(prefix);
    const network = (ipToInt(parts) & mask) >>> 0;
    return intToIp((network | (~mask >>> 0)) >>> 0);
  }

  function calculateSubnet(ip, prefix){
    const numericPrefix = Number(prefix);
    const parts = parseIp(ip);
    if(!parts || !Number.isInteger(numericPrefix) || numericPrefix < 1 || numericPrefix > 30){
      return {error:'Informe um IPv4 válido e prefixo entre 1 e 30.'};
    }
    const network = networkAddress(ip, numericPrefix);
    const broadcast = broadcastAddress(ip, numericPrefix);
    const networkInt = ipToInt(parseIp(network));
    const broadcastInt = ipToInt(parseIp(broadcast));
    const hostBits = 32 - numericPrefix;
    const total = 2 ** hostBits;
    return {
      networkAddress: network,
      broadcastAddress: broadcast,
      firstHost: intToIp(networkInt + 1),
      lastHost: intToIp(broadcastInt - 1),
      mask: intToIp(maskFromPrefix(numericPrefix)),
      totalAddresses: total,
      usableHosts: total - 2
    };
  }

  function calculatePrefixForHosts(hosts){
    const needed = Number(hosts);
    if(!Number.isInteger(needed) || needed < 1) return {error:'Informe uma quantidade positiva de hosts.'};
    let hostBits = 1;
    while((2 ** hostBits) - 2 < needed) hostBits += 1;
    const prefix = 32 - hostBits;
    return {
      prefix,
      mask: intToIp(maskFromPrefix(prefix)),
      totalAddresses: 2 ** hostBits,
      usableHosts: (2 ** hostBits) - 2,
      blockSize: 2 ** hostBits
    };
  }

  function renderIPv4Calculator(){
    const card = el('article', {class:'tool-card'});
    card.append(text('span', 'Calculadora', {class:'tag'}), text('h3', 'IPv4 subnet calculator'), text('p', data.tools.find(tool => tool.id === 'ipv4-subnet-calculator').summary));
    const form = el('div', {class:'tool-form'});
    const ipInput = el('input', {type:'text', value:'209.98.85.145', inputmode:'decimal'});
    const prefixInput = el('input', {type:'number', value:'28', min:'1', max:'30'});
    const result = el('div', {class:'tool-result'});
    form.append(label('IP', ipInput), label('Prefixo', prefixInput));
    const update = () => renderResult(result, calculateSubnet(ipInput.value, Number(prefixInput.value)));
    ipInput.addEventListener('input', update);
    prefixInput.addEventListener('input', update);
    card.append(form, result);
    update();
    return card;
  }

  function renderVlsmCalculator(){
    const card = el('article', {class:'tool-card'});
    card.append(text('span', 'Calculadora', {class:'tag'}), text('h3', 'Prefixo VLSM por hosts'), text('p', data.tools.find(tool => tool.id === 'vlsm-prefix-calculator').summary));
    const form = el('div', {class:'tool-form'});
    const hostsInput = el('input', {type:'number', value:'1000', min:'1', max:'65534'});
    const result = el('div', {class:'tool-result'});
    form.append(label('Hosts necessários', hostsInput));
    const update = () => renderResult(result, calculatePrefixForHosts(Number(hostsInput.value)));
    hostsInput.addEventListener('input', update);
    card.append(form, result);
    update();
    return card;
  }

  function label(name, input){
    const node = text('label', name);
    node.append(input);
    return node;
  }

  function renderResult(container, result){
    container.replaceChildren();
    if(result.error){
      container.append(text('p', result.error, {class:'answer-box'}));
      return;
    }
    const grid = el('div', {class:'result-grid'});
    Object.entries(result).forEach(([key, value]) => {
      const item = el('div', {class:'result-item'});
      item.append(text('span', labelForResult(key)), text('strong', String(value)));
      grid.append(item);
    });
    container.append(grid);
  }

  function labelForResult(key){
    const labels = {
      networkAddress:'Rede',
      broadcastAddress:'Broadcast',
      firstHost:'Primeiro host',
      lastHost:'Último host',
      mask:'Máscara',
      totalAddresses:'Endereços totais',
      usableHosts:'Hosts úteis',
      prefix:'Prefixo',
      blockSize:'Tamanho do bloco'
    };
    return labels[key] || key;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initRailToggle();
    const view = document.body.dataset.view;
    if(view === 'home') renderHome();
    if(view === 'theory') renderTheory();
    if(view === 'exercises') renderExercises();
    if(view === 'practice') renderPractice();
  });
})();
