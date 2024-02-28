console.log("Welcome to the Pokemon World!");

// Trainer object
const trainer = {
    name: prompt("What is the name of our adventurer?"),
    pokemons: [],
    addPokemon(pokemon) {
        this.pokemons.push(pokemon);
    },
    choosePokemon() {
        let pokemonList = this.pokemons.map((pokemon, index) => `${index + 1}. ${pokemon.name}`).join("\n");
        let choice = parseInt(prompt(`Choose your Pokemon:\n${pokemonList}`), 10);
        let chosenPokemon = this.pokemons[choice - 1];
        console.log(`You chose ${chosenPokemon.name}!`); // Announce chosen Pokemon
        return chosenPokemon;
    }
};

// Pokemon constructor function
function Pokemon(name, type, hp, attack) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.attack = attack;
}

// Extend Pokemon prototype with tackle and heal methods
Pokemon.prototype.tackle = function (opponent) {
    console.log(`${this.name} attacked ${opponent.name}!`);
    opponent.hp -= this.attack;
    console.log(`${opponent.name}'s health is now reduced to ${opponent.hp}`);
};

Pokemon.prototype.heal = function () {
    let healAmount = 20;
    this.hp += healAmount;
    console.log(`${this.name} healed for ${healAmount} points!`);
    console.log(`${this.name}'s health increases to ${this.hp}`);
};

// Function to start the battle
function startBattle(playerPokemon, wildPokemon) {
    while (playerPokemon.hp > 0 && wildPokemon.hp > 0) {
        let action = prompt(`What will ${trainer.name} do?\n1. Fight\n2. Heal\n3. Run`);
        switch (action) {
            case "1":
                playerPokemon.tackle(wildPokemon);
                break;
            case "2":
                playerPokemon.heal();
                break;
            case "3":
                console.log(`${trainer.name} ran away!`);
                return; // Exit the battle
            default:
                console.log("Invalid action! Choose 1, 2, or 3.");
                continue;
        }

        // Wild Pokemon's turn (simple AI: always attacks)
        if (wildPokemon.hp > 0) {
            wildPokemon.tackle(playerPokemon);
        }
    }

    if (playerPokemon.hp <= 0) {
        console.log(`${trainer.name}'s Pokemon fainted!`);
    } else if (wildPokemon.hp <= 0) {
        console.log(`Wild ${wildPokemon.name} fainted!`);
        console.log(`${trainer.name} wins the battle!`);
    }
}

// Sample Pokemon
trainer.addPokemon(new Pokemon("Dragonite", "Dragon", 100, 25));
trainer.addPokemon(new Pokemon("Dynamax Charizard", "Fire", 120, 30));
trainer.addPokemon(new Pokemon("Arceus", "Normal", 150, 35));
trainer.addPokemon(new Pokemon("Mega Mewtwo Y", "Psychic", 110, 45));
trainer.addPokemon(new Pokemon("Sceptile", "Grass", 90, 20));
trainer.addPokemon(new Pokemon("Greninja", "Water", 85, 40));

// Choosing Pokemon and starting the battle
const chosenPokemon = trainer.choosePokemon();
const wildPokemon = new Pokemon("Rattata", "Normal", 80, 5); // Example wild Pokemon
console.log(`A wild ${wildPokemon.name} appeared!`);
startBattle(chosenPokemon, wildPokemon);
