window.onload = () => {
  const circle = document.createElement("div");
  circle.id = "central-circle";
  circle.innerText = "Skills";
  document.body.appendChild(circle);

  circle.addEventListener("click", () => {
    if (document.getElementById("skill-left")) return; // evita duplicar

    createSkillBranch("left", [
      "Invocar Esqueleto",
      "Toque Sombrio",
      "Proteção da Morte"
    ]);

    createSkillBranch("right", [
      "Explosão Cadavérica",
      "Aura Negra",
      "Correntes Espirituais"
    ]);
  });
};

function createSkillBranch(side, skills) {
  const container = document.createElement("div");
  container.className = `skill-branch ${side}`;
  container.id = `skill-${side}`;

  skills.forEach(name => {
    const skill = document.createElement("div");
    skill.className = "skill-node";
    skill.innerText = name;
    container.appendChild(skill);
  });

  document.body.appendChild(container);
}
