export default class Pokemon {
    constructor(data, healthElement, attackSelect, addLog) {
        this.name = data.name;
        this.health = data.hp;
        this.maxHealth = data.hp;
        this.healthElement = healthElement;
        this.attackSelect = attackSelect;
        this.addLog = addLog;
        this.attacks = data.attacks;
        this.enemy = null;

        // Добавление опций атак в select
        this.attacks.forEach(attack => {
            const option = document.createElement('option');
            option.value = attack.name;
            option.textContent = `${attack.name} (Max ${attack.maxDamage} / Min ${attack.minDamage})`;
            this.attackSelect.appendChild(option);
        });
    }

    getAttack(attackName) {
        return this.attacks.find(attack => attack.name === attackName);
    }

    updateHealthBar() {
        const healthPercentage = (this.health / this.maxHealth) * 100;
        this.healthElement.style.width = healthPercentage + '%';
        if (this.health <= 0) {
            alert(`${this.name} has fainted!`);
        }
    }

    showPokeball() {
        const pokeball = document.getElementById('pokeball');
        pokeball.style.visibility = 'visible';

        const { top: attackerTop, left: attackerLeft } = this.attackSelect.parentElement.getBoundingClientRect();
        const { top: targetTop, left: targetLeft } = this.enemy.attackSelect.parentElement.getBoundingClientRect();

        pokeball.style.top = `${attackerTop}px`;
        pokeball.style.left = `${attackerLeft}px`;

        setTimeout(() => {
            pokeball.style.top = `${targetTop}px`;
            pokeball.style.left = `${targetLeft}px`;
        }, 50);

        setTimeout(() => {
            pokeball.style.visibility = 'hidden';
        }, 800);
    }

    battle(attackName) {
        const attack = this.getAttack(attackName);
        if (!attack || attack.maxCount <= 0) return;

        // Случайный урон в пределах minDamage и maxDamage
        const damage = Math.floor(Math.random() * (attack.maxDamage - attack.minDamage + 1)) + attack.minDamage;
        this.showPokeball();

        // Применение урона к врагу
        this.enemy.health -= damage;
        if (this.enemy.health < 0) this.enemy.health = 0;

        // Обновление здоровья и логов
        this.enemy.updateHealthBar();
        this.addLog(`${this.name} used ${attackName} on ${this.enemy.name}. Damage: ${damage}. ${this.enemy.name} has ${this.enemy.health} HP left.`);

        // Уменьшение оставшегося количества атак
        attack.maxCount--;

        setTimeout(() => window.isAttacking = false, 800);
    }
}
