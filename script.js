const championsContainer = document.getElementById('champions-container');
const searchInput = document.getElementById('search');
const filterRole = document.getElementById('filter-role');
const siteTitle = document.getElementById('site-title');
const footerText = document.getElementById('footer-text');

const baseURL = "http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/";

// Traduções
const texts = {
    pt: {
        title: "Guia de Campeões Wild Rift",
        search: "Buscar campeão...",
        allRoles: "Todos os papéis",
        footer: "Todas as imagens de campeões são propriedade da Riot Games. Projeto para fins educativos/portfólio.",
        roles: {
            Fighter: "Lutador",
            Mage: "Mago",
            Marksman: "Atirador",
            Tank: "Tanque",
            Support: "Suporte",
            Assassin: "Assassino"
        },
        difficulty: "Dificuldade"
    },
    en: {
        title: "Wild Rift Champion Guide - Demonstration",
        search: "Search champion...",
        allRoles: "All roles",
        footer: "All champion images are property of Riot Games. Educational/portfolio project.",
        roles: {
            Fighter: "Fighter",
            Mage: "Mage",
            Marksman: "Marksman",
            Tank: "Tank",
            Support: "Support",
            Assassin: "Assassin"
        },
        difficulty: "Difficulty"
    }
};

let currentLang = "pt";

// Campeões bilíngues
const champions = [
    {
        id: "Aatrox",
        name: { pt: "Aatrox", en: "Aatrox" },
        tags: ["Fighter"],
        info: { difficulty: 4 },
        abilities: {
            pt: ["Q - Lâmina das Trevas", "W - Correntes Infernais", "E - Investida Sombria", "R - Fim do Mundo"],
            en: ["Q - The Darkin Blade", "W - Infernal Chains", "E - Umbral Dash", "R - World Ender"]
        },
        build: {
            pt: ["Stridebreaker", "Dança da Morte", "Black Cleaver"],
            en: ["Stridebreaker", "Death's Dance", "Black Cleaver"]
        },
        runes: {
            pt: ["Conquistador", "Triunfo", "Lenda: Tenacidade", "Último Esforço"],
            en: ["Conqueror", "Triumph", "Legend: Tenacity", "Last Stand"]
        }
    },
    {
        id: "Ahri",
        name: { pt: "Ahri", en: "Ahri" },
        tags: ["Mage"],
        info: { difficulty: 3 },
        abilities: {
            pt: ["Q - Orbe da Enganação", "W - Fogo-Fátuo", "E - Encanto", "R - Investida Espiritual"],
            en: ["Q - Orb of Deception", "W - Fox-Fire", "E - Charm", "R - Spirit Rush"]
        },
        build: {
            pt: ["Tempestade de Luden", "Botas do Feiticeiro", "Morellonomicon"],
            en: ["Luden's Tempest", "Sorcerer's Shoes", "Morellonomicon"]
        },
        runes: {
            pt: ["Eletrocutar", "Gosto de Sangue", "Coleção de Olhos", "Caçador Supremo"],
            en: ["Electrocute", "Taste of Blood", "Eyeball Collection", "Ultimate Hunter"]
        }
    },
    {
        id: "Akali",
        name: { pt: "Akali", en: "Akali" },
        tags: ["Assassin"],
        info: { difficulty: 5 },
        abilities: {
            pt: ["Q - Golpe das Cinco Pontas", "W - Névoa Crepuscular", "E - Shuriken Giratória", "R - Execução Perfeita"],
            en: ["Q - Five Point Strike", "W - Twilight Shroud", "E - Shuriken Flip", "R - Perfect Execution"]
        },
        build: {
            pt: ["Cinturão Hextech", "Chama Sombria", "Ampulheta de Zhonya"],
            en: ["Hextech Rocketbelt", "Shadowflame", "Zhonya's Hourglass"]
        },
        runes: {
            pt: ["Eletrocutar", "Impacto Repentino", "Coleção de Olhos", "Caçador Supremo"],
            en: ["Electrocute", "Sudden Impact", "Eyeball Collection", "Ultimate Hunter"]
        }
    },
    {
        id: "Alistar",
        name: { pt: "Alistar", en: "Alistar" },
        tags: ["Tank", "Support"],
        info: { difficulty: 2 },
        abilities: {
            pt: ["Q - Pulverizar", "W - Investida", "E - Pisoteio", "R - Vontade Inabalável"],
            en: ["Q - Pulverize", "W - Headbutt", "E - Trample", "R - Unbreakable Will"]
        },
        build: {
            pt: ["Broche do Solari", "Voto do Cavaleiro", "Botas da Mercúrio"],
            en: ["Locket of the Iron Solari", "Knight's Vow", "Mercury's Treads"]
        },
        runes: {
            pt: ["Ressalto", "Fonte da Vida", "Placas Ósseas", "Revitalizar"],
            en: ["Aftershock", "Font of Life", "Bone Plating", "Revitalize"]
        }
    },
    {
        id: "Ashe",
        name: { pt: "Ashe", en: "Ashe" },
        tags: ["Marksman"],
        info: { difficulty: 2 },
        abilities: {
            pt: ["Q - Foco do Ranger", "W - Salva", "E - Falcão", "R - Flecha de Cristal Encantada"],
            en: ["Q - Ranger's Focus", "W - Volley", "E - Hawkshot", "R - Enchanted Crystal Arrow"]
        },
        build: {
            pt: ["Matador de Kraken", "Furacão de Runaan", "Gume do Infinito"],
            en: ["Kraken Slayer", "Runaan's Hurricane", "Infinity Edge"]
        },
        runes: {
            pt: ["Ritmo Letal", "Presença de Espírito", "Lenda: Agilidade", "Golpe de Misericórdia"],
            en: ["Lethal Tempo", "Presence of Mind", "Legend: Alacrity", "Coup de Grace"]
        }
    }
];

// Função para exibir campeões
function displayChampions(list) {
    championsContainer.innerHTML = '';
    list.forEach(champ => {
        const card = document.createElement('div');
        card.classList.add('champion-card');

        const translatedTags = champ.tags.map(tag => texts[currentLang].roles[tag]).join(', ');

        card.innerHTML = `
      <img src="${baseURL}${champ.id}.png" alt="${champ.name[currentLang]}">
      <h2>${champ.name[currentLang]}</h2>
      <p>Papel: ${translatedTags}</p>
      <p>${texts[currentLang].difficulty}: ${champ.info.difficulty}</p>

      <h3>Habilidades:</h3>
      <ul>
        ${champ.abilities[currentLang].map(a => `<li>${a}</li>`).join('')}
      </ul>

      <h3>Build recomendada:</h3>
      <ul>
        ${champ.build[currentLang].map(b => `<li>${b}</li>`).join('')}
      </ul>

      <h3>Runas:</h3>
      <ul>
        ${champ.runes[currentLang].map(r => `<li>${r}</li>`).join('')}
      </ul>
    `;
        championsContainer.appendChild(card);
    });
}

// Inicial
displayChampions(champions);

// Filtro por nome
searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = champions.filter(c => c.name[currentLang].toLowerCase().includes(term));
    displayChampions(filtered);
});

// Filtro por papel
filterRole.addEventListener('change', () => {
    const role = filterRole.value;
    const filtered = champions.filter(c => !role || c.tags.includes(role));
    displayChampions(filtered);
});

// Troca de idioma
document.getElementById('btn-pt').addEventListener('click', () => setLanguage('pt'));
document.getElementById('btn-en').addEventListener('click', () => setLanguage('en'));

function setLanguage(lang) {
    currentLang = lang;
    siteTitle.textContent = texts[lang].title;
    searchInput.placeholder = texts[lang].search;
    footerText.textContent = texts[lang].footer;

    // Atualiza opções do filtro
    const options = filterRole.querySelectorAll('option');
    options.forEach(opt => {
        if (opt.value === "") {
            opt.textContent = texts[lang].allRoles;
        } else {
            opt.textContent = texts[lang].roles[opt.value];
        }
    });

    // Atualiza os cards
    displayChampions(champions);
}