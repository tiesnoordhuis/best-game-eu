new Vue({
  el: '#app',
  data: {
    playerHP: 100,
    monsterHP: 100,
    gameRunning: false,
    minDamage: 1,
    maxDamage: 10,
    minHeal: 5,
    maxHeal: 12,
    logs: [],
  },
  computed: {},
  methods: {
    startGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.gameRunning = true;
      this.logs = [];
    },
    stopGame() {
      this.gameRunning = false;
    },
    checkState() {
      if (this.playerHP < 0) {
        alert('you lost, this is like easy mode game noob, how u even lose')
      }

      if (this.monsterHP < 0) {
        alert('you fucking won');
        alert('best game in eu  pls support indiegame devs')
        this.gameRunning = false;
      }
    },
    attack() {
      if (!this.gameRunning) return;

      const playerDamage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;
      const monsterDamage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage + 6;

      this.logs.push({
        entity: 'Player',
        action: 'attack',
        damage: playerDamage,
        to: 'monster'
      })

      this.logs.push({
        entity: 'Monster',
        action: 'attack',
        damage: monsterDamage,
        to: 'player'
      })

      this.monsterHP -= playerDamage;
      this.playerHP -= monsterDamage;
      this.checkState()
    },
    specialAttack() {
      if (!this.gameRunning) return;

      const playerDamage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + 10;
      const monsterDamage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;

      this.logs.push({
        entity: 'Player',
        action: 'special',
        damage: playerDamage,
        to: 'monster'
      })

      this.logs.push({
        entity: 'Monster',
        action: 'attack',
        damage: monsterDamage,
        to: 'player'
      })

      this.monsterHP -= playerDamage;
      this.playerHP -= monsterDamage;
      this.checkState()
    },
    heal() {
      if (!this.gameRunning) return;

      const playerHeal = Math.floor(Math.random() * (this.maxHeal - this.minHeal + 1)) + this.minHeal
      const monsterDamage = Math.floor(Math.random() * (this.maxDamage - this.minDamage + 1)) + this.minDamage;


      this.logs.push({
        entity: 'Player',
        action: 'heal',
        damage: playerHeal,
        to: 'monster'
      })

      this.logs.push({
        entity: 'Monster',
        action: 'attack',
        damage: monsterDamage,
        to: 'player'
      })

      this.playerHP = this.playerHP - monsterDamage + playerHeal;
      this.checkState()
    },
    calculateHealthStyle(entity) {
      let hitpoints = entity === 'monster' ? this.monsterHP : this.playerHP;
      return {
        backgroundColor: hitpoints < 50 ? 'red' : 'green',
        width: hitpoints + '%'
      }
    },
    calculateLogStyle(entity) {
      return {
        backgroundColor: entity === 'Player' ? 'green' : 'red'
      }
    }

  }
})
