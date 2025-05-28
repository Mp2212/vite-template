async handleselectClick(selectedValues) {
  console.log('selectedValues →', selectedValues);

  // Step 1: Convert all selected values (string or object) to just values
  const selectedValueArray = selectedValues.map(item =>
    typeof item === 'object' ? item.value : item
  );

  // Step 2: Filter RepoList to get matched full objects (with label/value)
  const matchedObjects = branchCutStore.RepoList.filter(repo =>
    selectedValueArray.includes(repo.value)
  );

  // Step 3: Set selectedRepos (used for multiselect UI binding)
  branchCutStore.selectedRepos = matchedObjects;
  console.log('✔ bound to multiselect:', branchCutStore.selectedRepos);

  // Step 4: Extract clean values only for backend logic
  const cleaned = matchedObjects.map(i => i.value);
  branchCutStore.repo = cleaned;
  console.log('✔ repo cleaned list for fetch:', cleaned);

  // Step 5: Reset and fetch
  branchCutStore.releaseBranchName = '';
  await branchCutStore.fetchBranches();
}
