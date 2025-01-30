const toggleExecutiveSelection = (executive) => {
  const exists = selectedTechExecutives.value.includes(executive);

  if (exists) {
    // Case: Unselecting the Tech Executive
    selectedTechExecutives.value = selectedTechExecutives.value.filter((e) => e !== executive);

    // Remove AITs associated with the unselected Tech Executive
    aits.value = aits.value.filter((aitGroup) => aitGroup.techExec !== executive.Name);

    // Also remove any selected AITs from the unselected executive
    selectedAITs.value = selectedAITs.value.filter(
      (ait) => !aits.value.some((group) => group.ids.includes(ait))
    );
  } else {
    // Case: Selecting the Tech Executive
    selectedTechExecutives.value.push(executive);
    fetchAIT(selectedTechExecutives.value); // Fetch AITs for all selected executives
  }

  // If no Tech Executives are selected, clear the AITs and selected AITs
  if (selectedTechExecutives.value.length === 0) {
    aits.value = []; // Clear all AITs
    selectedAITs.value = []; // Clear selected AITs
  }
};

const toggleAITSelection = (ait) => {
  const exists = selectedAITs.value.some((a) => a.ait === ait.ait);

  if (exists) {
    selectedAITs.value = selectedAITs.value.filter((a) => a.ait !== ait.ait);
  } else {
    selectedAITs.value.push(ait);
  }
};



const selectSearchedTech = () => {
  const matchingExecutives = filteredExecutives.value;

  if (matchingExecutives.length > 0) {
    const selectedExecutive = matchingExecutives[0];
    if (!selectedTechExecutives.value.includes(selectedExecutive)) {
      toggleExecutiveSelection(selectedExecutive);
    }
    searchExecutives.value = ""; // Clear search
  }
};

const selectSearchedAIT = () => {
  const matchingAITs = filteredExecutivesWithAITs.value
    .flatMap((group) => group.ids)
    .filter((ait) =>
      `${ait.ait} - ${ait.aitShortName}`.toLowerCase().includes(searchAITs.value.toLowerCase())
    );

  if (matchingAITs.length > 0) {
    const selectedAIT = matchingAITs[0];
    if (!selectedAITs.value.some((a) => a.ait === selectedAIT.ait)) {
      toggleAITSelection(selectedAIT);
    }
    searchAITs.value = ""; // Clear search
  }
};