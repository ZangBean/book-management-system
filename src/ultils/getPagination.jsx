const maxPageButtons = 5
const getPaginationButtons = (currentPage, totalPages) => {
  const half = Math.floor(maxPageButtons / 2)
  let startPage = Math.max(1, currentPage - half)
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1)
  }

  const buttons = []
  for (let i = startPage; i <= endPage; i++) buttons.push(i)

  return {
    buttons,
    showLeftDots: startPage > 1,
    showRightDots: endPage < totalPages,
  }
}
export default getPaginationButtons
