const filteredExecutivesWithAITs = computed(() => {
  if (!searchAITs.value) {
    return Object.entries(aits.value).map(([techExec, aitsArray]) => ({
      techExec: techExec || "Unknown Executive", // Prevent undefined
      options: aitsArray.map((ait) => ({
        ...ait,
        displayName: `${ait.ait} - ${ait.aitShortName}`,
      })),
    }));
  }

  return Object.entries(aits.value)
    .map(([techExec, aitsArray]) => ({
      techExec: techExec || "Unknown Executive", // Prevent undefined
      options: aitsArray
        .filter((ait) =>
          `${ait.ait} - ${ait.aitShortName}`
            .toLowerCase()
            .includes(searchAITs.value.toLowerCase())
        )
        .map((ait) => ({
          ...ait,
          displayName: `${ait.ait} - ${ait.aitShortName}`,
        })),
    }))
    .filter((group) => group.options.length > 0);
});



<multiselect
  v-model="selectedAits"
  :options="filteredExecutivesWithAITs"
  :group-values="'ids'"
  :group-label="'techExec'"
  :multiple="true"
  :close-on-select="false"
  label="displayName"
  track-by="displayName" <!-- Ensure correct tracking -->
  placeholder="Select AIT"
>
  <template #group-label="{ group }">
    <strong>{{ group.techExec || "Unknown Executive" }}</strong>
  </template>

  <template #option="{ props }">
    <input type="checkbox" 
           :checked="isAitSelected(props.option)" 
           :disabled="shouldDisableAitOption(props.option)">
    <span>{{ props.option.ait }} - {{ props.option.aitShortName || "N/A" }}</span>
  </template>
</multiselect>