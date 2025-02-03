const filteredExecutivesWithAITs = computed(() => {
  if (!searchAITs.value) {
    return aits.value.map((group) => ({
      techExec: group.techExec || "Unknown Executive", // Ensure non-empty techExec
      ids: group.ids.map((ait) => ({
        ...ait,
        aitShortName: ait.aitShortName || "N/A", // Prevent undefined
        displayName: `${ait.ait} - ${ait.aitShortName || "N/A"}`, // Avoid empty names
      })),
    }));
  }

  return aits.value
    .map((group) => ({
      techExec: group.techExec || "Unknown Executive",
      ids: group.ids
        .filter((ait) =>
          `${ait.ait} - ${ait.aitShortName || "N/A"}`
            .toLowerCase()
            .includes(searchAITs.value.toLowerCase())
        )
        .map((ait) => ({
          ...ait,
          aitShortName: ait.aitShortName || "N/A",
          displayName: `${ait.ait} - ${ait.aitShortName || "N/A"}`,
        })),
    }))
    .filter((group) => group.ids.length > 0);
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