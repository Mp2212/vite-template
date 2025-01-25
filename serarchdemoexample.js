const selectSearchedAIT = () => {
  const matchingAITs = filteredExecutivesWithAITs.value
    .flatMap((group) => group.ids) // Combine all AITs from all groups
    .filter((ait) => `${ait.ait} - ${ait.aitShortName}`.toLowerCase().includes(searchAITs.value.toLowerCase()));

  if (matchingAITs.length > 0) {
    const selectedAIT = matchingAITs[0]; // Select the first matching AIT

    // Check if it's already selected
    const exists = selectedAITs.value.some((a) => a.ait === selectedAIT.ait);
    if (!exists) {
      selectedAITs.value.push(selectedAIT); // Add to selected AITs
    }

    searchAITs.value = ""; // Clear the search bar
  }
};

const filteredExecutivesWithAITs = computed(() => {
  if (!searchAITs.value) {
    return aits.value; // Return all AITs if no search query
  }
  return aits.value
    .map((group) => ({
      techExec: group.techExec,
      ids: group.ids.filter((ait) =>
        `${ait.ait} - ${ait.aitShortName}`
          .toLowerCase()
          .includes(searchAITs.value.toLowerCase())
      ),
    }))
    .filter((group) => group.ids.length > 0); // Only include groups with matching AITs
});


onst toggleAITSelection = (ait) => {
  const exists = selectedAITs.value.some((a) => a.ait === ait.ait);

  if (exists) {
    selectedAITs.value = selectedAITs.value.filter((a) => a.ait !== ait.ait); // Remove if exists
  } else {
    selectedAITs.value.push(ait); // Add if not exists
  }
};