
const confirmDelete = async(showAlert) => {
    return (await new Promise((resolve) => {
        showAlert(
            "Delete Assessments",
            "This assessment will be deleted permanently. Are you sure you want to continue?",
            () => resolve(true), // Continue
            () => resolve(false))
    }))
}

export default confirmDelete;