const filteredExecutivesWithAITs = computed(() => {
    if (!searchAITs.value) {
        return aits.value; // Return all AITs if no search input
    }
    return aits.value.map((group) => ({
        techExec: group.techExec,
        ids: group.ids.filter((id) =>
            id.toLowerCase().includes(searchAITs.value.toLowerCase())
        ),
    })).filter((group) => group.ids.length > 0); // Only include groups with matching AITs
});

const filteredExecutives = computed(() => {
    if (!searchExecutives.value) {
        return tech.value; // Return all executives if no search input
    }
    return tech.value.filter((executive) =>
        executive.DisplayName.toLowerCase().includes(searchExecutives.value.toLowerCase())
    );
});