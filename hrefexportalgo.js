const exportToExcel = async () => {
    isExported.value = true; // Temporarily mark export mode
    await nextTick(); // Ensure computed property updates before exporting

    // ✅ Keep ansiblePlaybook in the header and ensure it's not blank
    const exportRecords = filteredRecordsComputed.value.map(record => ({
        techExec: record.techExec,
        ansibleJobName: record.ansibleJobName,
        ait: record.ait,
        spk: record.spk,
        deploymentEnvironment: record.deploymentEnvironment,
        repository: record.repository,
        scmBranch: record.scmBranch,
        deployedDate: record.deployedDate,
        deploymentStatus: record.deploymentStatus,
        ansiblePlaybook: record.ansiblePlaybook || "" // ✅ Ensures the column exists in the header
    }));

    if (exportRecords.length === 0) {
        alert("No records available for export!");
        isExported.value = false;
        return;
    }

    // Convert records to an Excel sheet
    let ws = XLSX.utils.json_to_sheet(exportRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Records');

    // ✅ Apply Hyperlink Formula Directly in the ansiblePlaybook Column
    filteredRecordsComputed.value.forEach((record, rowIndex) => {
        const url = record.ansiblePlaybook;
        if (url) {
            const cellRef = `J${rowIndex + 2}`; // ✅ Modify this if column order changes
            ws[cellRef] = {
                t: 's', // ✅ Ensures Excel treats it as a formula
                f: `HYPERLINK("${url}", "${url}")` // ✅ Hyperlink with actual URL as text
            };
        }
    });

    // ✅ Adjust the Range to Remove Second Last Column (Not Last)
    let totalColumns = Object.keys(exportRecords[0]).length;
    ws['!cols'] = Array(totalColumns).fill({ hidden: false }); // Show all columns
    ws['!cols'][totalColumns - 2] = { hidden: true }; // ✅ Hide only second last column

    // Generate and save the Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelBuffer], { type: 'application/octet-stream' });
    await saveAs(excelFile, 'Deployment_Metrics.xlsx');

    isExported.value = false; // Reset export mode
};
