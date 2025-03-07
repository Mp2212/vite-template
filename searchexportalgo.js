const exportToExcel = async () => {
    isExported.value = true; // Temporarily mark export mode
    await nextTick(); // Ensure computed property updates before exporting

    // Get selected (paginated) records
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
        ansiblePlaybook: record.ansiblePlaybook ? record.ansiblePlaybook : ""
    }));

    if (exportRecords.length === 0) {
        alert("No records available for export!");
        isExported.value = false;
        return;
    }

    // Convert selected records to Excel sheet
    const ws = XLSX.utils.json_to_sheet(exportRecords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Records');

    // ✅ Apply Hyperlink Formula Correctly
    exportRecords.forEach((row, rowIndex) => {
        const url = row.ansiblePlaybook;
        if (url) {
            const cellRef = `K${rowIndex + 2}`; // Adjust for correct row positioning
            ws[cellRef] = {
                t: 'n',  // ✅ Ensures Excel recognizes it as a formula
                f: `HYPERLINK("${url}", "Open Link")` // ✅ Displays "Open Link" instead of raw URL
            };
        }
    });

    // ✅ Force Excel to interpret formulas correctly
    ws['!ref'] = XLSX.utils.encode_range({
        s: { r: 0, c: 0 },
        e: { r: exportRecords.length, c: Object.keys(exportRecords[0]).length }
    });

    // Generate and save the Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelBuffer], { type: 'application/octet-stream' });
    await saveAs(excelFile, 'Deployment_Metrics.xlsx');

    isExported.value = false; // Reset export mode
};
