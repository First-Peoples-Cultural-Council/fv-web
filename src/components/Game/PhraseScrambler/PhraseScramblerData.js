import { useState, useEffect } from 'react'

function shuffleWords(array) {
  const shuffledArray = array.slice()
  for (let current = shuffledArray.length - 1; current > 0; current -= 1) {
    const randomIndex = Math.floor(Math.random() * (current + 1))
    const temp = shuffledArray[current]
    shuffledArray[current] = shuffledArray[randomIndex]
    shuffledArray[randomIndex] = temp
  }
  return shuffledArray
}

function PhraseScramblerData() {
  // Mock data
  const inputData = {
    translation: 'A B C D',
    title: 'A B C D',
  }

  const [jumbledWords, setJumbledWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [gameCompleted, setGameCompleted] = useState(false)
  const [validAnswer, setValidAnswer] = useState(false)

  useEffect(() => {
    const correctAnswer = inputData?.title.split(' ')
    setJumbledWords(shuffleWords([...correctAnswer]))
  }, [inputData?.title])

  const wordClicked = (word) => {
    if (gameCompleted && !validAnswer) {
      setGameCompleted(false)
    }

    if (selectedWords.includes(word)) {
      // Removing word from selected words list
      setSelectedWords(
        selectedWords.filter((selectedWord) => selectedWord !== word),
      )
    } else {
      // Adding word to the selected words list
      setSelectedWords([...selectedWords, word])
    }
  }

  const checkAnswer = () => {
    const selectedAnswer = selectedWords.join(' ')

    if (selectedAnswer === inputData?.title) {
      setValidAnswer(true)
    }
    setGameCompleted(true)
  }

  const resetGame = () => {
    // Reset game state
    setSelectedWords([])

    // Should we also reset the jumbled words here ?
    const correctAnswer = inputData?.title.split(' ')
    setJumbledWords(shuffleWords([...correctAnswer]))

    setValidAnswer(false)
    setGameCompleted(false)
  }

  return {
    translation: inputData?.translation,
    jumbledWords,
    selectedWords,
    gameCompleted,
    validAnswer,
    wordClicked,
    checkAnswer,
    resetGame,
  }
}

export default PhraseScramblerData
