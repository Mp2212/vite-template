const exportToCopy = async () => {
    isExported.value = true;

    const csvData = filteredRecordsComputed.value.map(record => ({
        techExec: record.techExec,
        ansibleJobName: record.ansibleJobName,
        ait: record.ait,
        spk: record.spk,
        deploymentEnvironment: record.deploymentEnvironment,
        repository: record.repository,
        scmBranch: record.scmBranch,
        deployedDate: record.deployedDate,
        deploymentStatus: record.deploymentStatus,
        ansiblePlaybook: record.ansiblePlaybook
    }));

    // Convert JSON data to CSV format
    const csvContent = [
        ['techExecutive', 'ansibleJobName', 'ait', 'spk', 'deploymentEnvironment', 'repository', 'scmBranch', 'deployedDate', 'deploymentStatus', 'ansiblePlaybook']
        .join(','),
        ...csvData.map(record => [
            record.techExec, record.ansibleJobName, record.ait, record.spk,
            record.deploymentEnvironment, record.repository, record.scmBranch,
            record.deployedDate, record.deploymentStatus, record.ansiblePlaybook
        ].join(','))
    ].join('\n');

    // ✅ Copy to Clipboard
    try {
        await navigator.clipboard.writeText(csvContent);
        alert('CSV copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy CSV:', err);
        alert('Failed to copy CSV!');
    }

    isExported.value = false;
};
