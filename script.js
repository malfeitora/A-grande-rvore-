// Skill tree configuration
const skillTreeData = {
  nodes: [
    { id: 1, name: "Start", x: 100, y: 300 },
    { id: 2, name: "Attack", x: 300, y: 200 },
    { id: 3, name: "Defense", x: 300, y: 400 },
    { id: 4, name: "Critical", x: 500, y: 200 },
    { id: 5, name: "Speed", x: 500, y: 400 }
  ],
  connections: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 }
  ]
};

// Render the skill tree
function renderSkillTree() {
  const container = document.getElementById('skill-tree');
  
  // Create connections
  skillTreeData.connections.forEach(connection => {
    const fromNode = skillTreeData.nodes.find(node => node.id === connection.from);
    const toNode = skillTreeData.nodes.find(node => node.id === connection.to);
    
    const line = document.createElement('div');
    line.classList.add('connection');
    
    const deltaX = toNode.x - fromNode.x;
    const deltaY = toNode.y - fromNode.y;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.top = `${fromNode.y + 25}px`;
    line.style.left = `${fromNode.x + 25}px`;
    container.appendChild(line);
  });

  // Create nodes
  skillTreeData.nodes.forEach(node => {
    const nodeElement = document.createElement('div');
    nodeElement.classList.add('node');
    nodeElement.style.top = `${node.y}px`;
    nodeElement.style.left = `${node.x}px`;
    nodeElement.textContent = node.name;
    nodeElement.dataset.id = node.id;

    nodeElement.addEventListener('click', () => toggleNode(node.id, nodeElement));
    container.appendChild(nodeElement);
  });
}

// Toggle node activation
function toggleNode(id, element) {
  const isActive = element.classList.toggle('active');
  
  // Allow activating connected nodes if the current node is active
  if (isActive) {
    skillTreeData.connections
      .filter(connection => connection.from === id)
      .forEach(connection => {
        const connectedNode = document.querySelector(`.node[data-id='${connection.to}']`);
        connectedNode.classList.add('active');
      });
  }
}

// Initialize the skill tree
renderSkillTree();
