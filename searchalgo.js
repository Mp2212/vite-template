const filteredRecordsComputed = computed(() => {
    let filteredRecords = records.value;

    if (newSearchTerm.value.length > 0) {
        const searchLower = newSearchTerm.value.toLowerCase();

        // ✅ Define searchable fields to avoid unintended matches
        const searchableFields = [
            "techExec",
            "ait",
            "spk",
            "environment",
            "ansibleJobName",
            "repository",
            "scmBranch",
            "deployedDate",
            "deploymentStatus"
        ];

        filteredRecords = filteredRecords.filter((record) => {
            if (['running', 'failed', 'successful', 'success'].includes(searchLower)) {
                return (
                    record.deploymentStatus.toLowerCase() === searchLower ||
                    (searchLower === 'success' && record.deploymentStatus === 'successful')
                );
            }

            // ✅ Search only in defined fields
            return searchableFields.some((key) => {
                const value = record[key];
                return value && String(value).toLowerCase().includes(searchLower);
            });
        });
    }

    if (searchTags.value.length > 0) {
        filteredRecords = filteredRecords.filter((record) =>
            searchTags.value.every((tag) => {
                const tagLower = tag.toLowerCase();

                if (['running', 'failed', 'successful', 'success'].includes(tagLower)) {
                    return (
                        record.deploymentStatus.toLowerCase() === tagLower ||
                        (tagLower === 'success' && record.deploymentStatus === 'successful')
                    );
                }

                // ✅ Apply filtering only on specific fields to avoid unintended matches
                return searchableFields.some((key) => {
                    const value = record[key];
                    return value && String(value).toLowerCase().includes(tagLower);
                });
            })
        );
    }

    return filteredRecords;
});
