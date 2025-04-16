// Skill Node Constructor
class SkillNode {
  constructor(id, name, description, fameRequired, connectedNodes = [], unlocked = false) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.fameRequired = fameRequired;
    this.connectedNodes = connectedNodes; // IDs of connected skill nodes
    this.unlocked = unlocked;
  }
}

// Necromancer Skill Tree Example
const necromancerSkillTree = {
  nodes: [
    new SkillNode(
      0,
      "Iniciação Sombria",
      "Desbloqueia acesso às magias necromânticas básicas.",
      0,
      [1, 2],
      true
    ),
    new SkillNode(
      1,
      "Esqueletos de Guerra",
      "Permite invocar dois esqueletos com dano físico moderado.",
      100,
      [3]
    ),
    new SkillNode(
      2,
      "Toque Espectral",
      "Ataque de energia sombria que reduz defesa inimiga.",
      100,
      [4]
    ),
    new SkillNode(
      3,
      "Legião dos Mortos",
      "Aumenta o número máximo de esqueletos invocados.",
      250,
      []
    ),
    new SkillNode(
      4,
      "Explosão Cadavérica",
      "Explode cadáveres próximos causando dano em área.",
      250,
      []
    ),
  ],

  fame: 0,

  gainFame(amount) {
    this.fame += amount;
    console.log(`Ganhou ${amount} de Fama. Total: ${this.fame}`);
    this.checkUnlocks();
  },

  checkUnlocks() {
    for (let node of this.nodes) {
      if (!node.unlocked && this.fame >= node.fameRequired) {
        // Verifica se algum dos pré-requisitos está desbloqueado
        const connectedUnlocked = node.connectedNodes.some(id => this.nodes[id]?.unlocked);
        if (connectedUnlocked || node.fameRequired === 0) {
          node.unlocked = true;
          console.log(`Nova habilidade desbloqueada: ${node.name}`);
        }
      }
    }
  },

  getUnlockedSkills() {
    return this.nodes.filter(node => node.unlocked);
  },

  getAvailableSkills() {
    return this.nodes.filter(node => !node.unlocked && this.fame >= node.fameRequired);
  }
};

// Simulação
necromancerSkillTree.gainFame(100); // desbloqueia habilidades de 100
necromancerSkillTree.gainFame(200); // desbloqueia habilidades de 250

console.log("Habilidades desbloqueadas:");
console.log(necromancerSkillTree.getUnlockedSkills().map(n => n.name));
