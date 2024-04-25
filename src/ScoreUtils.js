/*
 * Scoring Utilities
 */

const rankingPercentages = [0, 2, 5, 8, 15, 25, 40, 50, 70, 100]
const rankingTitles = ["Beginner", "Good Start", "Moving Up", "Good", "Solid", "Nice", "Great", "Amazing", "Genius", "Queen Bee"]

const getMaximumScore = (words) => words.map(word => getWordScore(word)).reduce((agg, score) => agg + score, 0)

const getWordScore = (word) => {
  if (new Set(word.split("")).size === 7) {
    return 14
  } else if (word.length === 4) {
    return 1
  } else {
    return word.length
  }
}

const getRanking = (score, maximumScore) => {
  const progress = Math.round((score / maximumScore) * 100)
  return 10 - rankingPercentages.toReversed().findIndex((level) => level <= progress)
}

const getRankingTitle = (score, maximumScore) => rankingTitles[getRanking(score, maximumScore) - 1]

const getPointsToNextRank = (score, maximumScore) => {
  const ranking = getRanking(score, maximumScore)
  return Math.floor((maximumScore * (rankingPercentages[ranking] / 100.0)) - score)
}

const getNextRank = (score, maximumScore) => {
  const ranking = getRanking(score, maximumScore)
  return rankingTitles[ranking]
}

export { getMaximumScore, getWordScore, getRanking, getRankingTitle, getPointsToNextRank, getNextRank }