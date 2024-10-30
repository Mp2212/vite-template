<template>
    <div>
      <multiselect
        v-model="selectedUsers"
        :options="userOptions"
        :multiple="true"
        :close-on-select="false"
        placeholder="Select user(s)"
        label="username"
        track-by="username"
        @update:model-value="handleSelection"
        @change="onChange"
      >
        <template #option="props">
          <input
            type="checkbox"
            :checked="isSelected(props.option)"
            :disabled="shouldDisableOption(props.option)"
          />
          <span>
            {{ props.option.username }}
          </span>
        </template>
      </multiselect>
    </div>
    <div class="d-flex justify-content-center mt-5">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Open Description Popup
    </button>
  </div>

    <!-- Modal Structure -->
 <!-- Modal Structure -->
 <!-- Modal Structure -->
 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Important Descriptions</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Here are some essential details you should know:</p>
          <div class="list-group">
            <div class="list-group-item">Description 1: Quick overview of the first point.</div>
            <div class="list-group-item">Description 2: Brief explanation of the second point.</div>
            <div class="list-group-item">Description 3: Details about the third important item.</div>
            <div class="list-group-item">Description 4: Insight into the fourth point.</div>
            <div class="list-group-item">Description 5: Final description to wrap things up.</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import Multiselect from "vue-multiselect";
  import "vue-multiselect/dist/vue-multiselect.min.css";
  
  export default {
    components: { Multiselect },
    setup() {
      const selectedUsers = ref([]);
      const userOptions = ref([{ id: 0, username: "ALL" }]);
      const isAllSelected = ref(false);
  
      // Fetch user data and update userOptions
      onMounted(async () => {
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/users");
          const data = await response.json();
          userOptions.value = [
            { id: 0, username: "ALL" },
            ...data.map(user => ({ id: user.id, username: user.username })),
          ];
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      });
  
      // Check if an option is selected
      const isSelected = (option) => selectedUsers.value.includes(option);
  
      // Determine if an option should be disabled
      const shouldDisableOption = (option) => {
        return isAllSelected.value && option.username !== "ALL";
      };
  
      // Handle selection logic
      const handleSelection = (selected) => {
        console.log("handleSelection triggered with selected:", selected);
        if (Array.isArray(selected) && selected.some(option => option.username === "ALL")) {
          // If "ALL" is selected, clear others and only select "ALL"
          selectedUsers.value = [userOptions.value.find(user => user.username === "ALL")];
          isAllSelected.value = true;
          console.log("ALL selected"); // Print message when "ALL" is selected
        } else if (Array.isArray(selected)) {
          // If "ALL" is not selected, update normally and unselect "ALL" if previously selected
          selectedUsers.value = selected.filter(user => user.username !== "ALL");
          isAllSelected.value = false;
          console.log("ALL unselected"); // Print message when "ALL" is unselected
        }
        console.log("Selected options:", selected); // Debugging line
        console.log("isAllSelected:", isAllSelected.value); // Debugging line
      };
  
      // Additional function to check change events
      const onChange = (value) => {
        console.log("onChange event triggered:", value);
      };
  
      return {
        selectedUsers,
        userOptions,
        isSelected,
        handleSelection,
        shouldDisableOption,
        isAllSelected,
        onChange,
      };
    },
  };
  </script>

<style>
    /* Custom Modal Styling */
    .modal-content {
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
      border: none;
    }
    .modal-header {
      border-bottom: none;
      background-color: #007bff; /* Primary color */
      color: white;
      border-radius: 15px 15px 0 0; /* Rounded top corners */
    }
    .modal-body {
      background-color: #f8f9fa; /* Light background */
      padding: 20px;
      border-radius: 0 0 15px 15px; /* Rounded bottom corners */
    }
    .modal-footer {
      border-top: none;
    }
    /* Enhanced List Styling */
    .list-group {
      margin-top: 10px;
    }
    .list-group-item {
      background-color: #e9ecef; /* Light background for items */
      border: none;
      border-radius: 8px;
      margin-bottom: 10px;
      padding: 15px;
      transition: background-color 0.3s;
    }
    .list-group-item:hover {
      background-color: #d1e7dd; /* Light green on hover */
    }
  </style>
  