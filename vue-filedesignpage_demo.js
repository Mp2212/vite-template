<multiselect
  v-model="selectedAITs"
  :options="filteredExecutivesWithAITs"
  :group-values="'ids'"
  :group-label="'techExec'"
  :group-select="true"
  :show-labels="false"
  :multiple="true"
  :close-on-select="false"
  label="displayName"
  track-by="ait"
  placeholder="Select AIT"
  style="flex: 1; max-width: 350px; margin-left: 5px; flex-grow: 1;"
>
  <!-- Custom group label with checkbox -->
  <template #group-label="{ group, isSelected, toggleGroup }">
    <label>
      <input
        type="checkbox"
        :checked="isSelected(group)"
        @change="toggleGroup(group)"
      />
      {{ group.techExec || 'Unknown Executive' }}
    </label>
  </template>

  <!-- Custom option template -->
  <template #option="{ props }">
    <label v-if="props && props.option">
      <input
        type="checkbox"
        :checked="isAITSelected(props.option)"
        :disabled="shouldDisableAITOption(props.option)"
      />
      <span>{{ props.option.ait }} - {{ props.option.aitShortName || 'N/A' }}</span>
    </label>
  </template>
</multiselect>


<script setup>
import { ref } from "vue";

const selectedAITs = ref([]); // Selected options
const filteredExecutivesWithAITs = ref([
  ]);

// Function to check if an AIT is selected
const isAITSelected = (option) => selectedAITs.value.includes(option);

// Function to disable an AIT option (custom logic)
const shouldDisableAITOption = (option) => false; // Customize as needed
</script>