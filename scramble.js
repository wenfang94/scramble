/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
const words = ['hello', 'world', 'can', 'butterfly', 'letter', 'food', 'metro', 'wood', 'fish', 'potato']

const app = new Vue({
  el:'#app',
  data:{
    // I found that watcher won't look into the nested items if not add handler() and deep:true within it
    game: {
      words:shuffle(words),
      points:0,
      strikes:0,
      maxStrikes:3,
      passes:3,
      guess:'',
      hideMessage1:true,
      hideMessage2:true,
      hideMessage3:true,
      hideMessage4:true,
      hideMessage5:true,
      hideMessage6:true,
      hideMessage7:true,
      hideMessage8:true,
      gameOver:false
    }
  },
  mounted: function () {
    if (localStorage.getItem('game')) {
      this.game = JSON.parse(localStorage.getItem('game'))
    }
  },
  computed:{
    word:function(){
      return this.game.words[0]
    },
    scrambledWord:function(){
      return shuffle(this.word)
    }
  },
  methods:{
    check: function(){
      this.game.hideMessage1 = true
      this.game.hideMessage2 = true
      this.game.hideMessage3 = true
      this.game.hideMessage4 = true
      this.game.hideMessage5 = true
      this.game.hideMessage6 = true
      this.game.hideMessage7 = true
      this.game.hideMessage8 = true
      this.game.gameOver = false
      
        if(this.game.strikes < this.game.maxStrikes) {
            if (this.game.guess.toLowerCase() === this.word) {
              this.game.points++
              if( this.game.words.length > 1) { 
                this.game.words.shift()
                this.game.hideMessage1 = false
              } else {
                console.log('game over, full points')
                this.game.gameOver = true
                if(this.game.strikes === 0){
                  this.game.hideMessage5 = false
                } else {
                  this.game.hideMessage6 = false
                }
              }
              console.log('correct')
              this.game.guess = ''
            } else {
              this.game.strikes++
              console.log('incorrect')
              this.game.guess = ''
              if( this.game.words.length > 1){
                if (this.game.strikes === this.game.maxStrikes){
                  this.game.hideMessage3 = false 
                  this.game.gameOver = true
                  console.log('max strike reached, gome over')
              } else {
                  this.game.hideMessage2 = false  
                  console.log('Wrong answer, 1 strike, guess again')
                } 
              } else if (this.game.words.length > 0) {
                console.log('no more words left, gome over')
                this.game.hideMessage6 = false
                this.game.gameOver = true
              }
              }
          }
                 
    },
    pass: function(){
      this.game.hideMessage4 = true
      if(this.game.strikes < this.game.maxStrikes) {
        if(this.game.passes > 1){ 
          this.game.passes--
          this.game.hideMessage7 = false
          console.log('used 1 pass')
          this.game.words.shift()
        } else if (this.game.passes === 1){
          this.game.passes--
          this.game.hideMessage7 = true
          this.game.hideMessage8 = false
          console.log('used the last pass')
          this.game.words.shift()
        }
      }
    },
    playAgain: function() {
      localStorage.clear()
      this.game = {
        words:shuffle(words),
        points:0,
        strikes:0,
        maxStrikes:3,
        passes:3,
        guess:'',
        hideMessage1:true,
        hideMessage2:true,
        hideMessage3:true,
        hideMessage4:true,
        hideMessage5:true,
        hideMessage6:true,
        hideMessage7:true,
        hideMessage8:true,
        gameOver:false
      }
    } 
  },
  watch: {
    game: {
        // watcher won't look into the nested items if not add handler and deep:true
        handler(){
          localStorage.setItem('game',JSON.stringify(this.game))
        },
        deep:true
    }
  } 
})