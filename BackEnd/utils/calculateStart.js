function calculateStart(paging) {
  return 5 * Number(paging - 1);
}

module.exports = calculateStart;
