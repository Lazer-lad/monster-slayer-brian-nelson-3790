/* eslint-disable no-undef */
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
    spatk: [],
    healing: []
  },

  methods: {
    startGame: function () {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turns = []
      this.spatk = ['spk', 'spk', 'spk']
      this.healing = ['heal', 'heal', 'heal']
    },
    attack: function () {
      var damage = this.calculateDamage(2, 10)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: ' Player hits monster for ' + damage
      })

      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
      this.limitPrint()
    },

    specialAttack: function () {
      if (this.spatk.length > 0) {
        var damage = this.calculateDamage(10, 20)
        this.monsterHealth -= damage
        this.turns.unshift({
          isPlayer: true,
          text: ' player hit hard for ' + damage
        })
        if (this.checkWin()) {
          return
        }
        this.monsterAttacks()
        console.log(this.spatk)
        this.spatk.pop()
      } else {
        alert('you have used all your special attacks')
      }
    },

    heal: function () {
      if (this.healing.length > 0) {
        if (this.playerHealth <= 90) {
          this.playerHealth += 10
        } else {
          this.playerHealth = 100
        }
        this.turns.unshift({
          isHeal: true,
          text: 'players heals for 10'
        })
        this.monsterAttacks()
        console.log(this.healing)
        this.healing.pop()
      } else {
        alert('you have used all your healling')
      }
    },

    giveUp: function () {
      this.gameIsRunning = false
    },

    monsterAttacks: function () {
      var damage = this.calculateDamage(5, 13)
      this.playerHealth -= damage
      this.checkWin()
      this.turns.unshift({
        isMonster: true,
        text: ' Monster hits player for ' + damage
      })
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },

    limitPrint: function () {
      if (this.turns.length >= 10) {
        this.turns.splice(10, 13)
        console.log(this.turns.length)
      }
    },

    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('you won new game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      } else if (this.playerHealth <= 0) {
        if (confirm('you lose new game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      }
      return false
    }
  }

})
