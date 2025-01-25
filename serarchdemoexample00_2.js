const toggleExecutiveSelection = (executive) => {
  const exists = selectedTechExecutives.value.includes(executive);

  if (exists) {
    // Remove the executive if already selected
    selectedTechExecutives.value = selectedTechExecutives.value.filter((e) => e !== executive);
  } else {
    // Add the executive if not already selected
    selectedTechExecutives.value.push(executive);
  }

  // Sync AITs if no executives are selected
  if (selectedTechExecutives.value.length === 0) {
    aits.value = []; // Clear AITs when no executives are selected
  } else {
    fetchAIT(selectedTechExecutives.value); // Fetch AITs for remaining executives
  }
};

const toggleAITSelection = (ait) => {
  const exists = selectedAITs.value.some((a) => a.ait === ait.ait);

  if (exists) {
    // Remove the AIT if already selected
    selectedAITs.value = selectedAITs.value.filter((a) => a.ait !== ait.ait);
  } else {
    // Add the AIT if not already selected
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
    searchExecutives.value = ""; // Clear the search input
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
    searchAITs.value = ""; // Clear the search input
  }
};



<div class="filters-section">
  <h6 class="filters-title">
    <i class="fas fa-users"></i> Tech Executives
  </h6>
  <input
    v-model="searchExecutives"
    class="form-control search-bar"
    type="text"
    placeholder="Search Tech Executives"
    @keydown.enter="selectSearchedTech"
  />
  <ul class="executives-list">
    <li
      v-for="executive in filteredExecutives"
      :key="executive.Name"
      @click="toggleExecutiveSelection(executive)"
      :class="{ selected: selectedTechExecutives.includes(executive) }"
    >
      <input
        type="checkbox"
        :checked="selectedTechExecutives.includes(executive)"
        @change="toggleExecutiveSelection(executive)"
      />
      {{ executive.DisplayName }}
    </li>
  </ul>
</div>



<div class="filters-section">
  <h6 class="filters-title">
    <i class="fas fa-filter"></i> AITs
  </h6>
  <input
    v-model="searchAITs"
    class="form-control search-bar"
    type="text"
    placeholder="Search AITs"
    @keydown.enter="selectSearchedAIT"
  />
  <div class="aits-container">
    <div
      v-for="group in filteredExecutivesWithAITs"
      :key="group.techExec"
      class="ait-group"
    >
      <strong>{{ group.techExec }}</strong>
      <ul>
        <li
          v-for="ait in group.ids"
          :key="ait.ait"
          @click="toggleAITSelection(ait)"
          :class="{ selected: selectedAITs.includes(ait) }"
        >
          <input
            type="checkbox"
            :checked="selectedAITs.includes(ait)"
            @change="toggleAITSelection(ait)"
          />
          {{ ait.ait }} - {{ ait.aitShortName }}
        </li>
      </ul>
    </div>
  </div>
</div>



.executives-list li,
.aits-container li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #f1f1f1;
  transition: background 0.2s;
}

.executives-list li:hover,
.aits-container li:hover {
  background: #e9ecef;
}

.executives-list li.selected,
.aits-container li.selected {
  background: #007bff;
  color: #ffffff;
}

input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}